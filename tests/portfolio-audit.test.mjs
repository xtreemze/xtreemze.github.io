import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../scripts/portfolio-audit.mjs', import.meta.url), 'utf8');

test('portfolio auditor requires authentication and inventories owned repositories', () => {
  assert.match(source, /GH_TOKEN/);
  assert.match(source, /\/user\/repos\?affiliation=owner/);
  assert.match(source, /r\.owner\.login\.toLowerCase\(\) === owner\.toLowerCase\(\)/);
});

test('auditor uses only read requests and does not assert unverified quality', () => {
  assert.doesNotMatch(source, /method:\s*['"](?:POST|PATCH|PUT|DELETE)['"]/);
  assert.match(source, /ci_status: 'unknown'/);
  assert.match(source, /build_status: 'unknown'/);
  assert.match(source, /security_status: 'unknown'/);
  assert.match(source, /configured-unverified/);
});

test('reports default to private, ignored local files', () => {
  const gitignore = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8');
  assert.match(gitignore, /^portfolio-private-audit\.json$/m);
  assert.match(source, /mode: 0o600/);
});
