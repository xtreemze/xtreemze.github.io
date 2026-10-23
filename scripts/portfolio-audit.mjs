#!/usr/bin/env node
/**
 * Read-only, authenticated inventory of owned repositories.
 * Requires Node 24+ and GH_TOKEN (or GITHUB_TOKEN) with read-only access.
 * Results are local, ignored by git, and MUST NOT be uploaded to public CI.
 */
import { writeFile } from 'node:fs/promises';

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER || 'xtreemze';
if (!token) {
  console.error('GH_TOKEN or GITHUB_TOKEN is required to avoid anonymous API limits.');
  process.exit(2);
}
if (!/^[a-z0-9-]+$/i.test(owner)) throw new Error('Invalid owner');
const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'portfolio-quality-audit',
};
async function get(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (response.status === 404) return { state: 'missing' };
  if (!response.ok) {
    const error = new Error(`GitHub returned HTTP ${response.status} for ${path}`);
    error.status = response.status;
    throw error;
  }
  return { state: 'ok', data: await response.json() };
}
async function listOwned() {
  const all = [];
  for (let page = 1; ; page++) {
    const result = await get(`/user/repos?affiliation=owner&per_page=100&page=${page}`);
    if (!Array.isArray(result.data)) throw new Error('Unexpected GitHub repository response');
    all.push(...result.data.filter((r) => r.owner.login.toLowerCase() === owner.toLowerCase()));
    if (result.data.length < 100) return all;
  }
}

const records = [];
for (const repo of await listOwned()) {
  const record = {
    repository: repo.full_name,
    visibility: repo.private ? 'private' : 'public',
    default_branch: repo.default_branch,
    archived: repo.archived,
    root_status: 'unknown',
    observed_files: [],
    ci_status: 'unknown',
    workflow_files: [],
    build_status: 'unknown',
    security_status: 'unknown',
  };
  try {
    const root = await get(`/repos/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}/contents`);
    if (Array.isArray(root.data)) {
      const paths = root.data.map((entry) => entry.name);
      record.root_status = 'observed';
      record.observed_files = paths.filter((name) => ['README.md', 'LICENSE', 'SECURITY.md', 'CONTRIBUTING.md', 'package.json', 'pnpm-lock.yaml', 'package-lock.json', 'Cargo.toml', 'pyproject.toml', '.github'].includes(name));
      if (paths.includes('.github')) {
        const workflows = await get(`/repos/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}/contents/.github/workflows`);
        if (Array.isArray(workflows.data)) {
          record.workflow_files = workflows.data.filter((entry) => /\.ya?ml$/i.test(entry.name)).map((entry) => entry.name);
          record.ci_status = record.workflow_files.length ? 'configured-unverified' : 'no-workflow-files-observed';
        } else if (workflows.state === 'missing') {
          record.ci_status = 'no-workflow-directory-observed';
        }
      } else {
        record.ci_status = 'no-github-directory-observed';
      }
    }
  } catch (error) {
    record.error = String(error);
    if (error.status === 403 || error.status === 429) throw error;
  }
  records.push(record);
}
const output = process.env.PORTFOLIO_AUDIT_OUTPUT || 'portfolio-private-audit.json';
const report = {
  schema_version: '0.2',
  generated_at: new Date().toISOString(),
  owner,
  scope: 'accessible owned repositories',
  disclaimer: 'Structural evidence only. No build, vulnerability, or workflow execution is certified.',
  count: records.length,
  repositories: records,
};
await writeFile(output, JSON.stringify(report, null, 2) + '\n', { mode: 0o600 });
console.log(`Wrote local report for ${records.length} repositories; do not publish private contents.`);
