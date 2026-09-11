import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const projectDir = resolve(root, "projects");
const projectFiles = (await readdir(projectDir)).filter((file) => file.endsWith(".html"));
const htmlFiles = [
  "index.html",
  "experience.html",
  ...projectFiles.map((file) => `projects/${file}`),
];

const failures = [];
for (const file of htmlFiles) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html\b[^>]*\blang="en"/.test(html)) failures.push(`${file}: missing lang=en`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${file}: missing document title`);
  if (!/<h1\b/.test(html)) failures.push(`${file}: missing h1`);
  if (!/<main\b/.test(html)) failures.push(`${file}: missing main landmark`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${htmlFiles.length} HTML source documents.`);
}
