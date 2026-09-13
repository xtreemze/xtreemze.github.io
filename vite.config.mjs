import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import {
  absoluteUrl,
  decorateLocalizationChrome,
  localizeHtml,
  sourcePagePaths,
  sourcePathFromTransformContext,
  translatedLocaleCodes,
} from "./scripts/localization.mjs";

const root = process.cwd();
const outDir = resolve(root, "dist");

async function htmlInputs() {
  const pages = await sourcePagePaths(root);
  return Object.fromEntries(
    pages.map((page) => [page === "index.html" ? "index" : page.slice(0, -5), resolve(root, page)]),
  );
}

function accessibilityInvariants() {
  return {
    name: "portfolio-accessibility-invariants",
    enforce: "pre",
    transformIndexHtml(html) {
      let output = html;

      if (!output.includes('class="skip-link"')) {
        output = output.replace(
          "<body>",
          '<body>\n  <a class="skip-link" href="#main">Skip to content</a>',
        );
      }

      if (!/<main[^>]*\bid="main"/.test(output)) {
        output = output.replace(/<main\b/, '<main id="main"');
      }

      if (!output.includes('name="color-scheme"')) {
        output = output.replace("</head>", '  <meta name="color-scheme" content="dark">\n</head>');
      }

      return output;
    },
  };
}

function localizationChrome() {
  return {
    name: "portfolio-localization-chrome",
    transformIndexHtml(html, context) {
      const pagePath = sourcePathFromTransformContext(root, context.filename);
      return pagePath ? decorateLocalizationChrome(html, pagePath, "en") : html;
    },
  };
}

function publicationArtifacts() {
  return {
    name: "portfolio-publication-artifacts",
    async writeBundle() {
      await mkdir(outDir, { recursive: true });
      await writeFile(resolve(outDir, ".nojekyll"), "", "utf8");
      await writeFile(
        resolve(outDir, "robots.txt"),
        "User-agent: *\nAllow: /\nSitemap: https://xtreemze.github.io/sitemap.xml\n",
        "utf8",
      );

      const pages = await sourcePagePaths(root);
      for (const pagePath of pages) {
        const englishHtml = await readFile(resolve(outDir, pagePath), "utf8");
        for (const localeCode of translatedLocaleCodes) {
          const target = resolve(outDir, localeCode, pagePath);
          await mkdir(dirname(target), { recursive: true });
          await writeFile(target, localizeHtml(englishHtml, pagePath, localeCode), "utf8");
        }
      }

      const urls = pages.flatMap((pagePath) => [
        absoluteUrl(pagePath, "en"),
        ...translatedLocaleCodes.map((localeCode) => absoluteUrl(pagePath, localeCode)),
      ]);
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((url) => `  <url><loc>${url}</loc></url>`)
        .join("\n")}\n</urlset>\n`;
      await writeFile(resolve(outDir, "sitemap.xml"), sitemap, "utf8");
    },
  };
}

export default defineConfig(async () => ({
  appType: "mpa",
  publicDir: "public",
  plugins: [accessibilityInvariants(), localizationChrome(), publicationArtifacts()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    sourcemap: false,
    rollupOptions: {
      input: await htmlInputs(),
    },
  },
}));
