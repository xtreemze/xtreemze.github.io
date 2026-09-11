import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import es from "../locales/es.mjs";
import sv from "../locales/sv.mjs";
import { sourcePagePaths } from "./localization.mjs";

const root = process.cwd();
const htmlFiles = await sourcePagePaths(root);
const failures = [];

for (const file of htmlFiles) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html\b[^>]*\blang="en"/.test(html)) failures.push(`${file}: missing lang=en`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${file}: missing document title`);
  if (!/<h1\b/.test(html)) failures.push(`${file}: missing h1`);
  if (!/<main\b/.test(html)) failures.push(`${file}: missing main landmark`);
}

for (const locale of [es, sv]) {
  const metadataFiles = Object.keys(locale.meta).sort();
  const expectedFiles = [...htmlFiles].sort();
  if (JSON.stringify(metadataFiles) !== JSON.stringify(expectedFiles)) {
    failures.push(`${locale.code}: metadata does not cover every source page`);
  }

  for (const [file, metadata] of Object.entries(locale.meta)) {
    if (!metadata.title.trim() || !metadata.description.trim()) {
      failures.push(`${locale.code}/${file}: incomplete metadata`);
    }
  }
}

const esSources = new Set(es.replacements.map(([source]) => source));
const svSources = new Set(sv.replacements.map(([source]) => source));
for (const source of esSources) {
  if (!svSources.has(source)) failures.push(`sv: missing translation source: ${source}`);
}
for (const source of svSources) {
  if (!esSources.has(source)) failures.push(`es: missing translation source: ${source}`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${htmlFiles.length} English source documents and ${Object.keys(es.meta).length * 2} localized page definitions.`,
  );
}
