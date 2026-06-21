import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateAdoptionFixtures } from '../../tools/adoption/validate-adoption-fixtures.mjs';
import {
  validateRepoAdapter,
  validateRuntimeAdapter,
  validateStackAdapter,
} from '../../tools/adoption/validate-adapters.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

test('adapter fixture matrix validates repo stack and runtime boundaries', () => {
  const result = validateAdoptionFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.adapter_fixture_count, 11);
  assert.equal(result.evidence.adapter_fixture_valid_count, 6);
  assert.equal(result.evidence.adapter_fixture_invalid_count, 5);
});

test('repo adapter rejects universal doctrine fields', () => {
  const repo = readJson('paw/tests/fixtures/adoption/adapters/valid-repo-adapter/case.json');
  repo.universal_rules = ['portable rule'];
  const result = validateRepoAdapter(repo);
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADAPTER_FORBIDDEN_FIELD'));
});

test('stack adapter records realization without creating presets', () => {
  const stack = readJson('paw/tests/fixtures/adoption/adapters/valid-stack-adapter/case.json');
  stack.differences.push({ field: 'framework', actual: 'custom', creates_reusable_preset: true });
  const result = validateStackAdapter(stack);
  assert.ok(result.diagnostics.some(({ code }) => code === 'STACK_ADAPTER_PRESET_CREATION'));
});

test('runtime adapter cannot choose stack or documentation policy', () => {
  const runtime = readJson('paw/tests/fixtures/adoption/adapters/valid-runtime-adapter/case.json');
  runtime.stack_selection = 'rails';
  runtime.documentation_preset = 'docs-service-api';
  const result = validateRuntimeAdapter(runtime);
  assert.equal(result.diagnostics.filter(({ code }) => code === 'ADAPTER_FORBIDDEN_FIELD').length, 2);
});

test('runtime adapter cannot silently activate candidate workflow by default', () => {
  const runtime = readJson('paw/tests/fixtures/adoption/adapters/valid-runtime-codex-adapter/case.json');
  runtime.activation = { state: 'default-active', default_workflow: true, requires_opt_in: false };
  const result = validateRuntimeAdapter(runtime);
  assert.ok(result.diagnostics.some(({ code }) => code === 'RUNTIME_ADAPTER_DEFAULT_ACTIVATION'));
});

test('runtime adapter must explain blocked gaps', () => {
  const runtime = readJson('paw/tests/fixtures/adoption/adapters/valid-runtime-antigravity-adapter/case.json');
  runtime.gap_disposition = [{ gap_id: 'antigravity-local-skill-path', status: 'blocked', required_for_candidate: true }];
  const result = validateRuntimeAdapter(runtime);
  assert.ok(result.diagnostics.some(({ code }) => code === 'RUNTIME_ADAPTER_BLOCKED_GAP_UNEXPLAINED'));
});
