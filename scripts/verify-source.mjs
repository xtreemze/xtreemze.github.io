import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { localeDefinitions, sourcePagePaths } from "./localization.mjs";

const root = process.cwd();
const htmlFiles = await sourcePagePaths(root);
const failures = [];
const es = localeDefinitions.es;
const sv = localeDefinitions.sv;

for (const file of htmlFiles) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html\b[^>]*\blang="en"/.test(html)) failures.push(`${file}: missing lang=en`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${file}: missing document title`);
  if (!/<h1\b/.test(html)) failures.push(`${file}: missing h1`);
  if (!/<main\b/.test(html)) failures.push(`${file}: missing main landmark`);

  const keyedSources = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]);
  for (const key of keyedSources) {
    for (const locale of [es, sv]) {
      if (!locale.keyed?.[key]?.trim()) failures.push(`${locale.code}/${file}: missing keyed translation ${key}`);
    }
  }
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

const esKeys = new Set(Object.keys(es.keyed ?? {}));
const svKeys = new Set(Object.keys(sv.keyed ?? {}));
for (const key of esKeys) {
  if (!svKeys.has(key)) failures.push(`sv: missing keyed translation: ${key}`);
}
for (const key of svKeys) {
  if (!esKeys.has(key)) failures.push(`es: missing keyed translation: ${key}`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${htmlFiles.length} English source documents and ${Object.keys(es.meta).length * 2} localized page definitions.`,
  );
}
