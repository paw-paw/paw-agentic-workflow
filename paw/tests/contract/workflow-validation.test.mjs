import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateWorkflowContracts } from '../../tools/workflow/validate-workflow-contracts.mjs';
import {
  validateWorkflowCase,
  validateWorkflowFixtures,
} from '../../tools/workflow/validate-workflow-fixtures.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

test('canonical workflow contracts are valid', () => {
  const result = validateWorkflowContracts(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.contract_count, 3);
  assert.equal(result.evidence.schema_count, 4);
});

test('workflow fixture matrix covers valid and invalid cases', () => {
  const result = validateWorkflowFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.fixture_count, 8);
  assert.equal(result.evidence.valid_count, 3);
  assert.equal(result.evidence.invalid_count, 5);
});

test('loop transitions require drift records', () => {
  const fixture = readJson('paw/tests/fixtures/workflow/invalid-loop-without-drift/case.json');
  const result = validateWorkflowCase(fixture);
  assert.ok(result.diagnostics.some(({ code }) => code === 'WORKFLOW_LOOP_WITHOUT_DRIFT_RECORD'));
});

test('bootstrap write cannot target documents outside creates_docs', () => {
  const fixture = readJson('paw/tests/fixtures/workflow/invalid-write-outside-creates-docs/case.json');
  const result = validateWorkflowCase(fixture);
  assert.ok(result.diagnostics.some(({ code }) => code === 'WORKFLOW_BOOTSTRAP_WRITE_OUTSIDE_CREATES_DOCS'));
});

test('manual evidence requires structured references', () => {
  const fixture = readJson('paw/tests/fixtures/workflow/invalid-manual-evidence/case.json');
  const result = validateWorkflowCase(fixture);
  assert.ok(result.diagnostics.some(({ code }) => code === 'WORKFLOW_MANUAL_EVIDENCE_FIELD_MISSING'));
});
