import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { localeDefinitions, sourcePagePaths } from "./localization.mjs";

const root = process.cwd();
const htmlFiles = await sourcePagePaths(root);
const failures = [];
const es = localeDefinitions.es;
const sv = localeDefinitions.sv;

const projectContentDirectory = resolve(root, "src/content/projects");
const projectContentFiles = (await readdir(projectContentDirectory))
  .filter((file) => file.endsWith(".json"))
  .sort();
const projectRecords = await Promise.all(
  projectContentFiles.map(async (file) =>
    JSON.parse(await readFile(resolve(projectContentDirectory, file), "utf8")),
  ),
);

const sourceProjectFiles = htmlFiles.filter((file) => file.startsWith("projects/")).sort();
const registeredProjectFiles = projectRecords.map((record) => record.sourcePath).sort();

if (JSON.stringify(sourceProjectFiles) !== JSON.stringify(registeredProjectFiles)) {
  failures.push(
    "typed project content must register exactly the published project source documents",
  );
}

const projectSlugs = new Set();
const projectSourcePaths = new Set();
const projectSortOrders = new Set();
for (const record of projectRecords) {
  const expectedSourcePath = `projects/${record.slug}.html`;
  if (record.sourcePath !== expectedSourcePath) {
    failures.push(
      `project ${record.slug}: sourcePath must be ${expectedSourcePath}, received ${record.sourcePath}`,
    );
  }
  if (!record.title?.trim()) failures.push(`project ${record.slug}: missing title`);
  if (!record.summary?.trim()) failures.push(`project ${record.slug}: missing summary`);
  if (!Array.isArray(record.stack) || record.stack.length === 0) {
    failures.push(`project ${record.slug}: stack must contain at least one entry`);
  }
  if (projectSlugs.has(record.slug)) failures.push(`duplicate project slug: ${record.slug}`);
  if (projectSourcePaths.has(record.sourcePath)) {
    failures.push(`duplicate project sourcePath: ${record.sourcePath}`);
  }
  if (projectSortOrders.has(record.sortOrder)) {
    failures.push(`duplicate project sortOrder: ${record.sortOrder}`);
  }
  projectSlugs.add(record.slug);
  projectSourcePaths.add(record.sourcePath);
  projectSortOrders.add(record.sortOrder);
}

for (const file of htmlFiles) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html\b[^>]*\blang="en"/.test(html)) failures.push(`${file}: missing lang=en`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${file}: missing document title`);
  if (!/<h1\b/.test(html)) failures.push(`${file}: missing h1`);
  if (!/<main\b/.test(html)) failures.push(`${file}: missing main landmark`);

  const keyedSources = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]);
  for (const key of keyedSources) {
    for (const locale of [es, sv]) {
      if (!locale.keyed?.[key]?.trim())
        failures.push(`${locale.code}/${file}: missing keyed translation ${key}`);
    }
  }
}

for (const file of ["README.md", "README_DEV.md", "SITE_AUDIT.md", ...htmlFiles]) {
  const source = await readFile(resolve(root, file), "utf8");
  if (/skills\s*cv/i.test(source)) {
    failures.push(`${file}: contains retired pre-portfolio branding`);
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
    `Verified ${htmlFiles.length} English source documents, ${projectRecords.length} typed project records and ${Object.keys(es.meta).length * 2} localized page definitions.`,
  );
}
