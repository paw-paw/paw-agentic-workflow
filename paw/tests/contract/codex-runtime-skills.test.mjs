import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

const lifecycleSkills = [
  'paw-triage',
  'paw-intake',
  'paw-router',
  'paw-plan',
  'paw-tasks',
  'paw-phase-backlog',
  'paw-execute-phase',
  'paw-sync-drift',
  'paw-close',
];

function readSkill(name) {
  const path = join(repoRoot, '.codex', 'skills', name, 'SKILL.md');
  assert.equal(existsSync(path), true, `${name} must exist`);
  return readFileSync(path, 'utf8');
}

test('core lifecycle candidate skills exist with required metadata', () => {
  for (const name of lifecycleSkills) {
    const content = readSkill(name);
    assert.match(content, new RegExp(`name: ${name}`));
    assert.match(content, /runtime: codex/);
    assert.match(content, /contract: paw\/orchestration\/workflow\.md/);
    assert.match(content, /toolkit: \.codex\/paw-toolkit/);
  }
});

test('core lifecycle skills preserve inactive candidate boundary', () => {
  for (const name of lifecycleSkills) {
    const content = readSkill(name);
    assert.match(content, /Candidate/);
    assert.match(content, /sdd-/);
    assert.match(content, /\.agents\/\*\*/);
  }
});

test('core lifecycle skills use progressive disclosure sections', () => {
  for (const name of lifecycleSkills) {
    const content = readSkill(name);
    assert.match(content, /## Load/);
    assert.match(content, /## Do/);
    assert.match(content, /## Do Not/);
    assert.match(content, /## Output/);
  }
});

test('integration candidate skill is bounded by integration contract', () => {
  const content = readSkill('paw-integrate');
  assert.match(content, /name: paw-integrate/);
  assert.match(content, /runtime: codex/);
  assert.match(content, /contract: paw\/integration\/integration-lifecycle\.md/);
  assert.match(content, /Candidate/);
  assert.match(content, /provider state, PAW readiness, and delivery disposition/);
  assert.match(content, /Do not merge/);
  assert.match(content, /\.agents\/\*\*/);
});
