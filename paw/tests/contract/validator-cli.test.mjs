import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const cliPath = join(repoRoot, 'paw', 'tools', 'validate-patches.mjs');

function run(args, options = {}) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    ...options,
  });
}

test('help and version are reportable with exit code 0', () => {
  const help = run(['--help']);
  assert.equal(help.status, 0);
  assert.match(help.stdout, /Usage: node paw\/tools\/validate-patches\.mjs/);
  assert.match(help.stdout, /Exit codes:/);
  assert.equal(help.stderr, '');

  const version = run(['--version']);
  assert.equal(version.status, 0);
  assert.equal(version.stdout, 'paw-validator 0.1.0 (schemas 1,2)\n');
  assert.equal(version.stderr, '');
});

test('repository validation supports human and structured output', () => {
  const human = run([]);
  assert.equal(human.status, 0);
  assert.match(human.stdout, /^PAW validation pass /);
  assert.match(human.stderr, /PATCH_SCHEMA_V1_TRANSITIONAL/);

  const json = run(['--json']);
  assert.equal(json.status, 0);
  assert.equal(json.stderr, '');
  const result = JSON.parse(json.stdout);
  assert.deepEqual(Object.keys(result), [
    'status',
    'schema_version',
    'validated_paths',
    'warnings',
    'errors',
    'evidence',
  ]);
  assert.equal(result.status, 'pass');
  assert.equal(result.schema_version, 1);
  assert.ok(result.validated_paths.includes('sdd/parches/paw-03-schema-validator-compatibility'));
  assert.equal(result.errors.length, 0);
  assert.ok(result.warnings.length >= 1);
});

test('fixture validation passes in human and JSON modes', () => {
  const human = run(['--fixtures']);
  assert.equal(human.status, 0);
  assert.match(human.stdout, /PAW validation pass/);
  assert.equal(human.stderr, '');

  const json = run(['--fixtures', '--json']);
  assert.equal(json.status, 0);
  assert.equal(json.stderr, '');
  const result = JSON.parse(json.stdout);
  assert.equal(result.status, 'pass');
  assert.equal(result.schema_version, 'mixed');
  assert.equal(result.evidence.fixture_count, 20);
  assert.equal(result.evidence.expected_valid_count, 8);
  assert.equal(result.evidence.expected_invalid_count, 12);
});

test('explicit roots work and missing roots are validation failures', () => {
  const explicit = run(['--root', repoRoot, '--json']);
  assert.equal(explicit.status, 0);
  assert.equal(JSON.parse(explicit.stdout).status, 'pass');

  const missing = run(['--root', join(repoRoot, 'does-not-exist'), '--json']);
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');
  const result = JSON.parse(missing.stdout);
  assert.equal(result.status, 'fail');
  assert.deepEqual(result.errors.map(({ code }) => code), [
    'VALIDATION_ROOT_NOT_FOUND',
  ]);
});

test('usage errors use stderr and exit code 2', () => {
  for (const args of [['--unknown'], ['--root'], ['--root', '.', '--root', '.']]) {
    const result = run(args);
    assert.equal(result.status, 2, args.join(' '));
    assert.equal(result.stdout, '', args.join(' '));
    assert.match(result.stderr, /PAW validator usage error:/, args.join(' '));
  }
});

test('JSON validation failures remain parseable on stdout', () => {
  const root = mkdtempSync(join(tmpdir(), 'paw-validator-'));
  try {
    const patchDirectory = join(root, 'sdd', 'parches', 'invalid');
    mkdirSync(patchDirectory, { recursive: true });
    writeFileSync(
      join(patchDirectory, 'patch.yaml'),
      'schema_version: 2\npatch_mode: intention-first\n',
      'utf8',
    );

    const result = run(['--root', root, '--json']);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');
    const structured = JSON.parse(result.stdout);
    assert.equal(structured.status, 'fail');
    assert.ok(structured.errors.length > 0);
    assert.ok(structured.errors.every(({ path }) => !path.startsWith(root)));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('help and version reject ambiguous execution combinations', () => {
  for (const args of [['--help', '--json'], ['--version', '--fixtures']]) {
    const result = run(args);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /cannot be combined/);
  }
});
