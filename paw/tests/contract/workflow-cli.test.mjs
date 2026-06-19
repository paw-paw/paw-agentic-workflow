import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const cliPath = join(repoRoot, 'paw', 'tools', 'validate-workflow.mjs');

function run(args) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
}

test('workflow validator supports help and version', () => {
  const help = run(['--help']);
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage: node paw\/tools\/validate-workflow\.mjs/);
  assert.equal(help.stderr, '');

  const version = run(['--version']);
  assert.equal(version.status, 0);
  assert.equal(version.stdout, 'paw-workflow-validator 0.1.0\n');
  assert.equal(version.stderr, '');
});

test('workflow validator emits structured contract output', () => {
  const result = run(['--json']);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  const output = JSON.parse(result.stdout);
  assert.equal(output.status, 'pass');
  assert.equal(output.schema_version, 1);
  assert.equal(output.errors.length, 0);
  assert.equal(output.evidence.contract_count, 3);
});

test('workflow validator emits structured fixture output', () => {
  const result = run(['--fixtures', '--json']);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  const output = JSON.parse(result.stdout);
  assert.equal(output.status, 'pass');
  assert.equal(output.evidence.fixture_count, 8);
  assert.equal(output.evidence.valid_count, 3);
  assert.equal(output.evidence.invalid_count, 5);
});

test('workflow validator reports usage errors', () => {
  const result = run(['--unknown']);
  assert.equal(result.status, 2);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /PAW workflow validator usage error:/);
});
