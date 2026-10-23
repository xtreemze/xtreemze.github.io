import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

test('portfolio auditor remains strictly public and read-only', () => {
  const source = readFileSync(new URL('../scripts/portfolio-audit.mjs', import.meta.url), 'utf8');
  assert.match(source, /api\.github\.com\/users\/\$\{owner\}\/repos/);
  assert.match(source, /type=owner/);
  assert.doesNotMatch(source, /\/user\/repos/);
  assert.doesNotMatch(source, /method:\s*['"](?:POST|PATCH|PUT|DELETE)['"]/);
  assert.match(source, /ci_status:\s*'unknown'/);
  assert.match(source, /build_status:\s*'unknown'/);
  assert.match(source, /security_status:\s*'unknown'/);
});

test('generated report is ignored', () => {
  const gitignore = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8');
  assert.match(gitignore, /^portfolio-public-audit\.json$/m);
});
