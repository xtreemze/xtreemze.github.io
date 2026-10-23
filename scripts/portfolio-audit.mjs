#!/usr/bin/env node
// Read-only public GitHub repository inventory. Requires Node 24+.
import { writeFile } from 'node:fs/promises';

const owner = 'xtreemze';
const records = [];
for (let page = 1; ; page++) {
  const url = `https://api.github.com/users/${owner}/repos?type=owner&per_page=100&page=${page}`;
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-audit' } });
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`);
  const repos = await response.json();
  for (const repo of repos) {
    const rootResponse = await fetch(`https://api.github.com/repos/${owner}/${repo.name}/contents`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-audit' }
    });
    const root = rootResponse.ok ? await rootResponse.json() : null;
    const paths = Array.isArray(root) ? root.map((entry) => entry.name) : null;
    records.push({
      repository: repo.full_name,
      default_branch: repo.default_branch,
      archived: repo.archived,
      root_status: paths ? 'observed' : 'unknown',
      observed_files: paths?.filter((name) => ['README.md', 'LICENSE', 'SECURITY.md', 'CONTRIBUTING.md', 'package.json', 'pnpm-lock.yaml', 'package-lock.json', 'Cargo.toml', 'pyproject.toml', '.github'].includes(name)) ?? [],
      ci_status: 'unknown',
      build_status: 'unknown',
      security_status: 'unknown',
    });
  }
  if (repos.length < 100) break;
}
await writeFile('portfolio-public-audit.json', JSON.stringify({
  schema_version: '0.1',
  scope: 'public repositories only',
  generated_at: new Date().toISOString(),
  disclaimer: 'Structural reconnaissance only; no tests or CI runs verified.',
  repositories: records
}, null, 2) + '\n');
console.log(`Inspected ${records.length} public repositories.`);
