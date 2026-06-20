import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

const bootstrapSkills = [
  'paw-bootstrap-discover',
  'paw-bootstrap-define',
  'paw-bootstrap-write',
  'paw-conformance',
];

const agents = [
  { name: 'paw-contract-reader', sandbox: 'read-only' },
  { name: 'paw-artifact-writer', sandbox: 'workspace-write' },
  { name: 'paw-risk-reviewer', sandbox: 'read-only' },
];

function read(path) {
  assert.equal(existsSync(path), true, `${path} must exist`);
  return readFileSync(path, 'utf8');
}

test('bootstrap and conformance skills exist with immediate contracts', () => {
  for (const name of bootstrapSkills) {
    const content = read(join(repoRoot, '.codex', 'skills', name, 'SKILL.md'));
    assert.match(content, new RegExp(`name: ${name}`));
    assert.match(content, /runtime: codex/);
    assert.match(content, /toolkit: \.codex\/paw-toolkit/);
    assert.match(content, /## Load/);
    assert.match(content, /\.agents\/\*\*/);
  }
});

test('bootstrap write preserves approval gate and creates_docs boundary', () => {
  const content = read(join(repoRoot, '.codex', 'skills', 'paw-bootstrap-write', 'SKILL.md'));
  assert.match(content, /approval gate/i);
  assert.match(content, /creates_docs/);
  assert.match(content, /Write only approved documents/);
});

test('candidate PAW agents are bounded and non-authoritative', () => {
  for (const agent of agents) {
    const content = read(join(repoRoot, '.codex', 'agents', `${agent.name}.toml`));
    assert.match(content, new RegExp(`name = "${agent.name}"`));
    assert.match(content, new RegExp(`sandbox_mode = "${agent.sandbox}"`));
    assert.match(content, /Do not spawn agents/);
    assert.match(content, /no contractual authority|Do not claim contractual authority|Do not decide/);
  }
});
