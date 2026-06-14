import assert from 'node:assert/strict';
import { existsSync, lstatSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8').replace(/^\uFEFF/, '');
}

function normalizePath(path) {
  return path.replaceAll('\\', '/');
}

function listFiles(path) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return [];

  const files = [];
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    const child = normalizePath(join(path, entry.name));
    if (entry.isDirectory()) {
      files.push(...listFiles(child));
    } else {
      files.push(child);
    }
  }
  return files;
}

function listSymlinks(path = '.') {
  const absolute = join(root, path);
  const symlinks = [];

  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    const child = normalizePath(path === '.' ? entry.name : join(path, entry.name));
    if (child === '.git' || child.startsWith('.git/') || child === '_inbox' || child.startsWith('_inbox/')) {
      continue;
    }

    const childStat = lstatSync(join(root, child));
    if (childStat.isSymbolicLink()) {
      symlinks.push(child);
    } else if (childStat.isDirectory()) {
      symlinks.push(...listSymlinks(child));
    }
  }
  return symlinks;
}

test('public identity and authority are canonical', () => {
  const readme = read('README.md');
  assert.match(readme, /^# PAW \(Paw's Agentic Workflow\)\r?\n/);
  assert.match(
    readme,
    /PAW \(Paw's Agentic Workflow\) implements a custom software development methodology designed to help vibe coders become capable vibe developers and build serious, maintainable software with agentic tools\./,
  );
  assert.match(readme, /pre-alpha/);
  assert.match(readme, /not a stable distribution/);

  const index = read('docs/README.md');
  for (const required of [
    '# Documentation Index and Authority Policy',
    '## Document Classification',
    '## Precedence',
    '## Canonical Registry',
    'authoritative',
    'supporting',
    'non_authoritative',
    'strategic',
    'contract',
    'verifiable',
    'operational',
  ]) {
    assert.ok(index.includes(required), `docs/README.md missing ${required}`);
  }

  const precedenceOwners = [
    'README.md',
    'AGENTS.md',
    'CONTRIBUTING.md',
    ...listFiles('docs').filter((path) => extname(path) === '.md'),
  ].filter((path) => /^## Precedence$/m.test(read(path)));
  assert.deepEqual(precedenceOwners, ['docs/README.md']);
});

test('required foundation documents and governed PAW surfaces exist', () => {
  const requiredDocs = [
    'CONTRIBUTING.md',
    'docs/governance/ARCHITECTURE.md',
    'docs/governance/NAMING.md',
    'docs/governance/V1-TRANSITION.md',
    'docs/licensing/OUTPUT-POLICY.md',
  ];
  for (const path of requiredDocs) {
    assert.equal(existsSync(join(root, path)), true, `${path} is required`);
  }

  const requiredPawFiles = [
    'paw/README.md',
    'paw/core/README.md',
    'paw/core/artifact-lifecycle.md',
    'paw/core/authority-and-evidence.md',
    'paw/core/compatibility-policy.md',
    'paw/core/decision-gates.md',
    'paw/core/drift-policy.md',
    'paw/core/patch-model.md',
    'paw/orchestration/README.md',
    'paw/parches/README.md',
    'paw/tests/README.md',
    'paw/tools/README.md',
  ];
  const pawFiles = listFiles('paw');
  for (const path of requiredPawFiles) {
    assert.ok(pawFiles.includes(path), `${path} is required`);
  }

  assert.match(read('paw/README.md'), /live conceptual core/i);
  assert.match(read('paw/core/README.md'), /live conceptual contracts/i);
  assert.match(read('paw/parches/README.md'), /^Inactive\./m);
  assert.match(read('paw/parches/README.md'), /Do not create patch workspaces/);
  assert.match(read('paw/parches/README.md'), /sdd\/parches\/<change-id>\//);
  assert.match(read('paw/orchestration/README.md'), /Inactive orientation only/);
  assert.match(read('paw/tools/README.md'), /Approved target surface for incremental materialization/);
  assert.match(read('paw/tests/README.md'), /Approved target surface for incremental materialization/);
});

test('only the v1 workflow and workspace namespace are active during transition', () => {
  const transition = read('docs/governance/V1-TRANSITION.md');
  assert.match(transition, /only writable patch namespace before cutover/i);
  assert.match(transition, /Only patch 14 may activate the target workflow and writable workspace namespace/);
  assert.match(transition, /materialized incrementally by their owning patches/i);
  assert.match(transition, /does not make the v2 workflow active/i);

  const v1Patches = read('sdd/parches/README.md');
  assert.match(v1Patches, /only active patch workspace root/i);
  assert.match(v1Patches, /target `paw\/parches\/<change-id>\/` path remains inactive/i);

  const pawSkills = readdirSync(join(root, '.codex/skills')).filter((name) => name.startsWith('paw-'));
  const pawAgents = readdirSync(join(root, '.codex/agents')).filter((name) => name.startsWith('paw-'));
  assert.deepEqual(pawSkills, []);
  assert.deepEqual(pawAgents, []);

  const pawPatchFiles = listFiles('paw/parches');
  assert.deepEqual(pawPatchFiles, ['paw/parches/README.md']);
});

test('workspace, private inputs, and runtime configuration preserve boundaries', () => {
  assert.deepEqual(listSymlinks(), []);

  const ignoreRules = read('.gitignore').split(/\r?\n/);
  assert.ok(ignoreRules.includes('_inbox/'));
  assert.deepEqual(listFiles('.agents'), []);

  const configFiles = [
    ...listFiles('.codex').filter((path) => ['.json', '.toml', '.yaml', '.yml'].includes(extname(path))),
    ...listFiles('sdd').filter((path) => ['.json', '.toml', '.yaml', '.yml'].includes(extname(path))),
    ...listFiles('paw').filter((path) => ['.json', '.toml', '.yaml', '.yml'].includes(extname(path))),
  ];
  const configurableWorkspaceRoot = configFiles.filter((path) => read(path).includes('workspace_root'));
  assert.deepEqual(configurableWorkspaceRoot, []);
});

test('active v1 runtime has no source-repository verification coupling', () => {
  const runtimeFiles = [...listFiles('sdd'), ...listFiles('.codex')].filter(
    (path) => !path.startsWith('sdd/parches/paw-01-foundation/'),
  );
  const forbidden = [
    /Astro portfolio/i,
    /portfolio-facing/i,
    /astro-pages-verify/i,
    /astro-verifier/i,
    /GitHub Pages verification/i,
    /visible portfolio/i,
    /public Astro/i,
    /SDD portable/i,
    /portable SDD/i,
    /sistema SDD/i,
    /SDD system/i,
  ];

  const violations = [];
  for (const path of runtimeFiles) {
    const content = read(path);
    for (const pattern of forbidden) {
      if (pattern.test(content)) violations.push(`${path}: ${pattern}`);
    }
  }
  assert.deepEqual(violations, []);
});

test('MPL-2.0 and output ownership are visible', () => {
  assert.match(read('LICENSE'), /^Mozilla Public License Version 2\.0/);
  assert.match(read('README.md'), /Mozilla Public License 2\.0 \(`MPL-2\.0`\)/);
  assert.match(read('LICENSES/README.md'), /Project default: Mozilla Public License 2\.0/);

  const outputPolicy = read('docs/licensing/OUTPUT-POLICY.md');
  assert.match(outputPolicy, /does not automatically place a user's independent source code/);
  assert.match(outputPolicy, /## Templates/);
  assert.match(outputPolicy, /## Assets/);
});
