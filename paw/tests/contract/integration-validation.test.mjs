import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateIntegrationContracts } from '../../tools/integration/validate-integration-contracts.mjs';
import {
  validateIntegrationFixtures,
} from '../../tools/integration/validate-integration-fixtures.mjs';
import { validateIntegrationRecord } from '../../tools/integration/validate-integration-record.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

test('canonical integration contracts are valid', () => {
  const result = validateIntegrationContracts(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.contract_count, 3);
  assert.equal(result.evidence.schema_count, 1);
});

test('integration fixture matrix covers delivery states', () => {
  const result = validateIntegrationFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.fixture_count, 8);
  assert.equal(result.evidence.valid_count, 5);
  assert.equal(result.evidence.invalid_count, 3);
});

test('ready_to_merge rejects stale gated checks', () => {
  const fixture = readJson('paw/tests/fixtures/integration/invalid-stale-checks/case.json');
  const result = validateIntegrationRecord(fixture);
  const codes = result.diagnostics.map(({ code }) => code);
  assert.ok(codes.includes('INTEGRATION_CHECK_STALE'));
  assert.ok(codes.includes('INTEGRATION_READINESS_EVIDENCE_STALE'));
});

test('program member records remain one patch per primary integration', () => {
  const fixture = readJson('paw/tests/fixtures/integration/invalid-member-patch-count/case.json');
  const result = validateIntegrationRecord(fixture);
  assert.ok(result.diagnostics.some(({ code }) => code === 'INTEGRATION_MEMBER_PATCH_COUNT_INVALID'));
});

test('abandoned delivery cannot be ready to merge', () => {
  const fixture = readJson('paw/tests/fixtures/integration/invalid-abandoned-ready/case.json');
  const result = validateIntegrationRecord(fixture);
  assert.ok(result.diagnostics.some(({ code }) => code === 'INTEGRATION_ABANDONED_READY_INVALID'));
});

