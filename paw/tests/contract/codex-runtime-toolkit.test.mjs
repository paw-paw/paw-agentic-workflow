import assert from 'node:assert/strict';
import { existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const cliPath = join(repoRoot, '.codex', 'paw-toolkit', 'bin', 'paw-codex-toolkit.mjs');

function run(args) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
}

test('toolkit supports help and version', () => {
  const help = run(['--help']);
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage: node \.codex\/paw-toolkit\/bin\/paw-codex-toolkit\.mjs/);
  assert.equal(help.stderr, '');

  const version = run(['--version']);
  assert.equal(version.status, 0);
  assert.equal(version.stdout, 'paw-codex-toolkit 0.1.0\n');
  assert.equal(version.stderr, '');
});

test('toolkit discovers repository root as compact JSON', () => {
  const result = run(['discover-root', '--json']);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  const output = JSON.parse(result.stdout);
  assert.equal(output.status, 'pass');
  assert.equal(output.contract_version, 'paw-codex-toolkit/0.1.0');
  assert.equal(output.root.replaceAll('\\', '/'), repoRoot.replaceAll('\\', '/'));
});

test('toolkit inspects patch state without semantic drafting', () => {
  const result = run(['inspect-patch', '--change-id', 'paw-07-codex-runtime-tooling', '--json']);
  assert.equal(result.status, 0);
  const output = JSON.parse(result.stdout);
  assert.equal(output.data.status, 'closed');
  assert.equal(output.data.lifecycle, 'spec-anchored');
});

test('toolkit rejects level 2 mutations without approval material', () => {
  const result = run(['check-mutation', '--level', 'level-2', '--json']);
  assert.equal(result.status, 1);
  const output = JSON.parse(result.stdout);
  assert.equal(output.status, 'fail');
  assert.ok(output.errors.includes('Level 2 mutation requires --approval-token.'));
  assert.ok(output.errors.includes('Level 2 mutation requires --plan-path.'));
});

test('toolkit rejects level 3 automatic mutations', () => {
  const result = run(['check-mutation', '--level', 'level-3', '--json']);
  assert.equal(result.status, 1);
  const output = JSON.parse(result.stdout);
  assert.equal(output.status, 'fail');
  assert.ok(output.errors.includes('Level 3 mutations are prohibited for automatic execution.'));
});

test('toolkit dry-run plan-write does not mutate target', () => {
  const target = join(tmpdir(), `paw-codex-toolkit-${process.pid}.txt`);
  rmSync(target, { force: true });
  const result = run([
    'plan-write',
    '--level',
    'level-1',
    '--target',
    target,
    '--content',
    'mechanical output',
    '--dry-run',
    '--json',
  ]);
  assert.equal(result.status, 0);
  assert.equal(existsSync(target), false);
  const output = JSON.parse(result.stdout);
  assert.equal(output.data.dry_run, true);
});

test('toolkit inspects local integration records', () => {
  const result = run([
    'inspect-integration',
    '--integration-path',
    'paw/tests/fixtures/integration/valid-ready-current-checks/case.json',
    '--json',
  ]);
  assert.equal(result.status, 0);
  const output = JSON.parse(result.stdout);
  assert.equal(output.data.provider_state, 'open');
  assert.equal(output.data.paw_readiness, 'ready_to_merge');
  assert.equal(output.data.delivery_disposition, 'pending');
});

test('toolkit inspects candidate distribution manifest without installation', () => {
  const result = run([
    'inspect-distribution',
    '--json',
  ]);
  assert.equal(result.status, 0);
  const output = JSON.parse(result.stdout);
  assert.equal(output.data.distribution_id, 'paw-codex-manual');
  assert.equal(output.data.distribution_status, 'candidate');
  assert.equal(output.data.candidate_inactive, true);
  assert.ok(output.data.file_count > 0);
});

test('toolkit normalizes provided GitHub snapshots without network access', () => {
  const result = run([
    'github-snapshot',
    '--snapshot-path',
    'paw/tests/fixtures/integration/valid-ready-current-checks/case.json',
    '--json',
  ]);
  assert.equal(result.status, 0);
  const output = JSON.parse(result.stdout);
  assert.equal(output.data.provider, 'absent');
  assert.equal(output.data.check_count, 0);
});
