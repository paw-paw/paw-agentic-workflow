import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

const coreFiles = [
  'paw/core/README.md',
  'paw/core/patch-model.md',
  'paw/core/artifact-lifecycle.md',
  'paw/core/authority-and-evidence.md',
  'paw/core/decision-gates.md',
  'paw/core/drift-policy.md',
  'paw/core/compatibility-policy.md',
];

test('patch model defines one conceptual mode axis', () => {
  const model = read('paw/core/patch-model.md');
  const manifest = model.match(/```yaml\n([\s\S]*?)```/)?.[1];
  assert.ok(manifest, 'conceptual manifest block is required');

  for (const mode of ['docs-bootstrap', 'intention-first', 'doc-anchored']) {
    assert.match(model, new RegExp(`\\b${mode}\\b`));
  }
  for (const field of [
    'schema_version',
    'change_id',
    'program_id',
    'patch_mode',
    'status',
    'created_at',
    'closed_at',
    'related_docs',
    'creates_docs',
    'bootstrap_context',
  ]) {
    assert.match(manifest, new RegExp(`^${field}:`, 'm'), `manifest missing ${field}`);
  }

  assert.doesNotMatch(manifest, /patch_kind/);
  assert.doesNotMatch(manifest, /\bbatch\b/);
  assert.match(model, /`program_id` is `string \| null`/);
  assert.match(model, /`related_docs` names existing live documents/);
  assert.match(model, /`creates_docs` names live documents/);

  for (const status of ['active', 'blocked', 'closed', 'abandoned']) {
    assert.match(model, new RegExp(`^${status}$`, 'm'));
  }
});

test('greenfield, brownfield, and batch boundaries are explicit', () => {
  const model = read('paw/core/patch-model.md');
  assert.match(model, /Greenfield means that no live documentation exists/);
  assert.match(model, /It does not mean that no code/);
  assert.match(model, /Brownfield code is evidence/);
  assert.match(model, /Partial documentation that can govern the change makes the patch `doc-anchored`/);
  assert.match(model, /Degraded documentation with recoverable intent uses `intention-first`/);
  assert.match(model, /`batch` is not a manifest mode or value/);
});

test('artifact ownership is complete and integration remains reserved', () => {
  const lifecycle = read('paw/core/artifact-lifecycle.md');
  for (const artifact of [
    'patch.yaml',
    'handover.md',
    'definicion.md',
    'plan.md',
    'tasks.md',
    'backlog/faseN.md',
    'decision.log',
    'cierre.md',
    'integration.yaml',
  ]) {
    assert.match(lifecycle, new RegExp(artifact.replaceAll('.', '\\.').replace('/', '\\/')));
  }

  assert.match(lifecycle, /Responsibilities are exclusive/);
  assert.match(lifecycle, /Durable rule, check, binding, or public behavior/i);
  assert.match(lifecycle, /patch workspace is historical memory/i);
  assert.match(lifecycle, /no portable provider fields/);
});

test('authority and gates reject observed state as automatic truth', () => {
  const authority = read('paw/core/authority-and-evidence.md');
  const gates = read('paw/core/decision-gates.md');

  assert.match(authority, /Evidence can contradict authority and reveal drift/);
  assert.match(authority, /It cannot silently replace authority/);
  assert.match(authority, /Durable rules, checks, and bindings introduced by a patch must be promoted before closure/);

  for (const structural of [
    'patch mode',
    'approved scope',
    'live authority',
    'governing `related_docs`',
    'artifact responsibility',
    'compatibility guarantees',
    'validation strategy',
  ]) {
    assert.match(gates, new RegExp(structural.replaceAll('`', '\\`'), 'i'));
  }
  assert.match(gates, /An unresolved gate is a blocker, not an assumption/);
});

test('drift categories and reconciliation protocol are complete', () => {
  const drift = read('paw/core/drift-policy.md');
  for (const category of [
    'Scope drift',
    'Contractual drift',
    'Artifact drift',
    'Implementation drift',
    'Validation drift',
    'Integration drift',
  ]) {
    assert.match(drift, new RegExp(category));
  }
  assert.match(drift, /Observed state never becomes authority automatically/);
  assert.match(drift, /A patch cannot close with unclassified drift/);
});

test('compatibility preserves v1 history without dual-write', () => {
  const compatibility = read('paw/core/compatibility-policy.md');
  assert.match(compatibility, /Closed v1 patches remain valid historical records/);
  assert.match(compatibility, /`sdd\/parches\/legacy\/\*\*` retains its documented exemptions/);
  assert.match(compatibility, /new program patches use `sdd\/parches\/<change-id>\/`/);
  assert.match(compatibility, /`paw\/parches\/\*\*` remains inactive/);
  assert.match(compatibility, /symlinks and dual-write mechanisms are prohibited/);
  assert.match(compatibility, /Only the approved patch 14 cutover/);
  assert.match(compatibility, /historical workspaces are not moved or rewritten/);
});

test('portable core does not depend on named runtimes, providers, or stacks', () => {
  const forbidden = [
    /Codex/i,
    /Claude Code/i,
    /Antigravity/i,
    /GitHub/i,
    /\bnpm\b/i,
    /\bRails\b/i,
    /\bAstro\b/i,
    /\bmain\/dev\b/i,
  ];

  const violations = [];
  for (const path of coreFiles) {
    const content = read(path);
    for (const pattern of forbidden) {
      if (pattern.test(content)) violations.push(`${path}: ${pattern}`);
    }
  }
  assert.deepEqual(violations, []);
});

test('canonical registry assigns authority to every core contract', () => {
  const index = read('docs/README.md');
  for (const path of coreFiles) {
    assert.match(index, new RegExp(`\\| \`${path.replaceAll('/', '\\/')}\` \\|`));
  }
});
