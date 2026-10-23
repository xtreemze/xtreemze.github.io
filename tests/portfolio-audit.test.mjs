import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { collectPortfolio } from '../scripts/portfolio-audit-core.mjs';

function mock(routes) {
  const calls = [];
  const request = async (url, options) => {
    const path = new URL(url).pathname + new URL(url).search;
    calls.push({ path, options });
    const result = routes[path] ?? { status: 404 };
    return {
      status: result.status ?? 200,
      ok: !result.status || (result.status >= 200 && result.status < 300),
      json: async () => result.data,
    };
  };
  return { request, calls };
}
const one = {
  full_name: 'xtreemze/example',
  name: 'example',
  owner: { login: 'xtreemze' },
  private: true,
  default_branch: 'main',
  archived: false,
};

test('discovers private owned repositories and reports CI as unverified', async () => {
  const api = mock({
    '/user/repos?affiliation=owner&per_page=100&page=1': {
      data: [one, { ...one, full_name: 'other/example', owner: { login: 'other' } }],
    },
    '/repos/xtreemze/example/contents': { data: [{ name: 'README.md' }, { name: '.github' }] },
    '/repos/xtreemze/example/contents/.github/workflows': { data: [{ name: 'ci.yml' }] },
  });
  const report = await collectPortfolio({ owner: 'xtreemze', token: 'test-token', request: api.request });
  assert.equal(report.length, 1);
  assert.equal(report[0].visibility, 'private');
  assert.equal(report[0].ci_status, 'configured-unverified');
  assert.equal(report[0].build_status, 'unknown');
  assert.equal(report[0].security_status, 'unknown');
  assert.deepEqual(report[0].workflow_files, ['ci.yml']);
  assert.equal(api.calls.every((call) => call.options.method === undefined), true);
});

test('missing content remains unknown without inventing evidence', async () => {
  const api = mock({
    '/user/repos?affiliation=owner&per_page=100&page=1': { data: [one] },
  });
  const [record] = await collectPortfolio({ owner: 'xtreemze', token: 'test-token', request: api.request });
  assert.equal(record.root_status, 'unknown');
  assert.equal(record.ci_status, 'unknown');
});

test('rate-limit errors abort rather than silently truncating results', async () => {
  const api = mock({
    '/user/repos?affiliation=owner&per_page=100&page=1': { data: [one] },
    '/repos/xtreemze/example/contents': { status: 429 },
  });
  await assert.rejects(() => collectPortfolio({ owner: 'xtreemze', token: 'test-token', request: api.request }), /HTTP 429/);
});

test('report output is git-ignored', () => {
  const ignored = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8');
  assert.match(ignored, /^portfolio-private-audit\.json$/m);
});
