import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SOURCE_EXTENSIONS = new Set([".css", ".astro", ".html"]);

export const rules = [
  {
    id: "responsive/no-desktop-first-breakpoint",
    message:
      "Use mobile-first min-width breakpoints; max-width and width< queries invert the layout contract.",
    pattern: /@media\s*\([^)]*(?:max-width\s*:|width\s*(?:<|<=))/giu,
  },
  {
    id: "responsive/no-px-breakpoint",
    message: "Express breakpoints in rem/em so text scaling participates in responsive decisions.",
    pattern: /@media\s*\([^)]*(?:min-width|max-width|width\s*(?:<|<=|>|>=))[^)]*\d+(?:\.\d+)?px/giu,
  },
  {
    id: "responsive/no-device-breakpoint",
    message:
      "Do not branch layout on device dimensions; respond to available container or viewport space.",
    pattern: /@media\s*\([^)]*(?:device-width|device-height)/giu,
  },
  {
    id: "responsive/no-orientation-breakpoint",
    message:
      "Do not branch layout on portrait/landscape labels; use space-based breakpoints instead.",
    pattern: /@media\s*\([^)]*orientation\s*:/giu,
  },
  {
    id: "responsive/no-viewport-inline-lock",
    message:
      "Do not size layout containers to 100vw; use percentage/inline-size to avoid scrollbar overflow.",
    pattern:
      /\b(?:width|inline-size|min-width|min-inline-size|max-width|max-inline-size)\s*:\s*100vw\b/giu,
  },
  {
    id: "responsive/no-static-viewport-height",
    message: "Do not use static 100vh for application layout; prefer dynamic/small viewport units.",
    pattern:
      /\b(?:height|min-height|max-height|block-size|min-block-size|max-block-size)\s*:\s*(?:calc\([^;]*\b100vh\b[^;]*\)|100vh)\s*;/giu,
  },
  {
    id: "responsive/no-horizontal-overflow-mask",
    message:
      "Do not hide or clip horizontal overflow to conceal layout defects; fix the overflowing descendant.",
    pattern: /\boverflow-x\s*:\s*(?:hidden|clip)\s*;/giu,
  },
  {
    id: "responsive/no-root-min-width",
    message: "html/body must not impose a minimum inline viewport width.",
    pattern: /(?:^|\})\s*(?:html|body)\s*\{[^}]*\b(?:min-width|min-inline-size)\s*:/gimsu,
  },
  {
    id: "a11y/no-zoom-lock",
    message: "Do not disable user zoom in viewport metadata.",
    pattern: /(?:user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\.0+)?)/giu,
  },
  {
    id: "a11y/no-text-size-adjust-lock",
    message: "Do not disable browser text-size adjustment.",
    pattern: /(?:-webkit-)?text-size-adjust\s*:\s*(?:none|0%?)\s*;/giu,
  },
  {
    id: "a11y/no-hidden-scrollbar",
    message:
      "Do not hide scrollbars on scrollable regions; scrolling affordances must remain visible.",
    pattern:
      /(?:scrollbar-width\s*:\s*none\s*;|::-(?:webkit-)?scrollbar\s*\{[^}]*display\s*:\s*none\s*;[^}]*\})/gimsu,
  },
  {
    id: "a11y/no-px-font-size",
    message: "Use a scalable unit for font-size rather than pixels.",
    pattern: /\bfont-size\s*:\s*\d+(?:\.\d+)?px\b/giu,
  },
  {
    id: "a11y/no-outline-removal",
    message: "Do not remove focus outlines without an explicit accessible replacement.",
    pattern: /\boutline\s*:\s*(?:none|0(?:\s+none)?)\s*;/giu,
  },
  {
    id: "motion/no-transition-all",
    message:
      "Transition explicit properties only; transition: all creates accidental motion and performance regressions.",
    pattern: /\btransition\s*:\s*all\b/giu,
  },
];

function lineForOffset(text, offset) {
  return text.slice(0, offset).split("\n").length;
}

export function inspectText(file, text) {
  const findings = [];
  for (const rule of rules) {
    const pattern = new RegExp(rule.pattern.source, rule.pattern.flags);
    for (const match of text.matchAll(pattern)) {
      findings.push({
        file,
        rule: rule.id,
        line: lineForOffset(text, match.index ?? 0),
        excerpt: match[0].replace(/\s+/gu, " ").trim().slice(0, 140),
        message: rule.message,
      });
    }
  }
  return findings;
}

async function collectFiles(root) {
  const result = [];

  async function visit(entry) {
    let children;
    try {
      children = await readdir(entry, { withFileTypes: true });
    } catch {
      return;
    }

    for (const child of children) {
      if (child.name === "node_modules" || child.name === "dist" || child.name === ".git") continue;
      const target = path.join(entry, child.name);
      if (child.isDirectory()) {
        await visit(target);
      } else if (SOURCE_EXTENSIONS.has(path.extname(child.name))) {
        result.push(target);
      }
    }
  }

  for (const entry of ["public", "src"]) await visit(path.join(root, entry));

  for (const child of await readdir(root, { withFileTypes: true })) {
    if (child.isFile() && SOURCE_EXTENSIONS.has(path.extname(child.name))) {
      result.push(path.join(root, child.name));
    }
  }

  return [...new Set(result)].sort();
}

function countFindings(findings) {
  const counts = new Map();
  for (const finding of findings) {
    const key = `${finding.rule}::${finding.file}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export function compareToBaseline(findings, baseline) {
  const counts = countFindings(findings);
  const problems = [];
  const baselineKeys = new Set();

  for (const [rule, files] of Object.entries(baseline)) {
    for (const [file, expected] of Object.entries(files)) {
      const key = `${rule}::${file}`;
      baselineKeys.add(key);
      const actual = counts.get(key) ?? 0;
      if (actual > expected) {
        problems.push(`${key}: debt increased from ${expected} to ${actual}`);
      } else if (actual < expected) {
        problems.push(
          `${key}: debt decreased from ${expected} to ${actual}; lower the baseline in config/responsive-lint-baseline.json`,
        );
      }
    }
  }

  for (const [key, actual] of counts) {
    if (!baselineKeys.has(key) && actual > 0) {
      problems.push(`${key}: ${actual} new violation(s)`);
    }
  }

  return problems;
}

export async function run(root = process.cwd()) {
  const files = await collectFiles(root);
  const findings = [];

  for (const absolute of files) {
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    findings.push(...inspectText(relative, await readFile(absolute, "utf8")));
  }

  const baselinePath = path.join(root, "config", "responsive-lint-baseline.json");
  const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
  const problems = compareToBaseline(findings, baseline);

  if (problems.length > 0) {
    for (const problem of problems) console.error(`architecture-lint: ${problem}`);
    for (const finding of findings) {
      const key = `${finding.rule}::${finding.file}`;
      if (
        problems.some((problem) => problem.startsWith(key)) ||
        !(baseline[finding.rule] && baseline[finding.rule][finding.file])
      ) {
        console.error(
          `  ${finding.file}:${finding.line} ${finding.rule} — ${finding.message}\n    ${finding.excerpt}`,
        );
      }
    }
    process.exitCode = 1;
    return;
  }

  const debt = findings.length;
  console.log(
    `architecture-lint: passed (${debt} ratcheted legacy finding${debt === 1 ? "" : "s"})`,
  );
}

const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) await run(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
