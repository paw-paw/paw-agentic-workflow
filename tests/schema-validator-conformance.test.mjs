import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8').replace(/^\uFEFF/, '');
}

function listFiles(path) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return [];

  const files = [];
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(child));
    } else {
      files.push(child.replaceAll('\\', '/'));
    }
  }
  return files;
}

test('handoff fixture categories remain represented by portable evidence', () => {
  const requiredFixtures = [
    'invalid/hybrid',
    'invalid/path-outside-root',
    'invalid/unknown-version',
    'invalid/yaml',
    'patch-v1/legacy-read-only',
    'patch-v1/valid-batch',
    'patch-v1/valid-spec-anchored',
    'patch-v1/valid-spec-first',
    'patch-v2/invalid-closed-missing-date',
    'patch-v2/invalid-doc-anchored-related',
    'patch-v2/invalid-docs-bootstrap-context',
    'patch-v2/invalid-docs-bootstrap-creates',
    'patch-v2/invalid-open-with-date',
    'patch-v2/valid-doc-anchored',
    'patch-v2/valid-docs-bootstrap',
    'patch-v2/valid-intention-first',
  ];

  for (const fixture of requiredFixtures) {
    assert.equal(
      existsSync(join(root, 'paw/tests/fixtures', fixture, 'expected.json')),
      true,
      `${fixture} requires expected.json`,
    );
  }

  assert.match(
    read('paw/tests/fixtures/patch-v2/valid-docs-bootstrap/patch.yaml'),
    /^program_id: fixture-program$/m,
  );
});

test('PAW validator is runtime-neutral and read-only', () => {
  const sourceFiles = listFiles('paw/tools').filter((path) => extname(path) === '.mjs');
  const forbiddenWrites =
    /\b(?:appendFile|copyFile|cp|mkdir|rename|rm|rmdir|truncate|unlink|writeFile)(?:Sync)?\b/;

  for (const path of sourceFiles) {
    const source = read(path);
    assert.doesNotMatch(source, forbiddenWrites, `${path} must remain read-only`);

    for (const match of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const specifier = match[1];
      assert.ok(
        specifier.startsWith('.') || specifier.startsWith('node:'),
        `${path} imports unsupported dependency ${specifier}`,
      );
    }
  }
});

test('materialized validation does not activate v2 writers or workspaces', () => {
  const patchFiles = listFiles('paw/parches');
  assert.deepEqual(patchFiles, ['paw/parches/README.md']);

  const skillFiles = listFiles('.codex/skills').filter((path) => path.endsWith('SKILL.md'));
  assert.ok(skillFiles.some((path) => path.includes('/sdd-intake/')));
  assert.deepEqual(
    skillFiles.filter((path) => /\/paw-[^/]+\/SKILL\.md$/.test(path)),
    [],
  );

  const intake = read('.codex/skills/sdd-intake/SKILL.md');
  assert.match(intake, /sdd\/parches\/<change-id>\//);
  assert.doesNotMatch(intake, /paw\/parches\/<change-id>\//);

  const agents = listFiles('.codex/agents');
  assert.deepEqual(agents.filter((path) => /\/paw-[^/]+/.test(path)), []);
});

test('live status documents distinguish materialization from activation', () => {
  const readme = read('README.md');
  const architecture = read('docs/governance/ARCHITECTURE.md');
  const bootstrap = read('docs/governance/BOOTSTRAP-STATUS.md');
  const transition = read('docs/governance/V1-TRANSITION.md');

  assert.match(readme, /materialized schema v2, dual validator, fixtures, and contract tests/);
  assert.match(readme, /no v2 writers or active v2 workspaces/i);
  assert.match(architecture, /Materialized validation support does not change the active workflow/);
  assert.match(bootstrap, /Physical patch schema v2 and dual-read v1\/v2 manifest validation/);
  assert.doesNotMatch(bootstrap, /Not Implemented[\s\S]*PAW schema v2/);
  assert.match(transition, /Schema v2 and dual-read validator materialized by patch 03/);
});
