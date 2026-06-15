import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { validateFixtures, validateMarkdownLinks, validateRepo } from '../sdd/tools/validate-sdd.mjs';

test('SDD repo validation passes', () => {
  assert.deepEqual([...validateRepo(), ...validateMarkdownLinks(process.cwd())], []);
});

test('SDD fixture validation passes', () => {
  assert.deepEqual(validateFixtures(), []);
});

test('legacy SDD commands preserve their exact success output', () => {
  const entrypoint = 'sdd/tools/validate-sdd.mjs';
  const repo = spawnSync(process.execPath, [entrypoint], {
    encoding: 'utf8',
  });
  assert.equal(repo.status, 0);
  assert.equal(repo.stdout, 'SDD repo validation passed\n');
  assert.equal(repo.stderr, '');

  const fixtures = spawnSync(process.execPath, [entrypoint, '--fixtures'], {
    encoding: 'utf8',
  });
  assert.equal(fixtures.status, 0);
  assert.equal(fixtures.stdout, 'SDD fixture validation passed\n');
  assert.equal(fixtures.stderr, '');
});

test('legacy SDD entrypoint delegates manifest parsing and rules to PAW', () => {
  const source = readFileSync('sdd/tools/validate-sdd.mjs', 'utf8');
  assert.match(source, /paw\/tools\/validation\/parse-patch-yaml\.mjs/);
  assert.match(source, /paw\/tools\/validation\/validate-patch-directory\.mjs/);
  assert.doesNotMatch(source, /function parseScalar|const PATCH_KINDS|const LIFECYCLES/);
});
