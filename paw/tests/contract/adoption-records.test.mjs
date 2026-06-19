import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { loadJson } from '../../tools/catalogs/load-json.mjs';
import { validateAdoptionFixtures } from '../../tools/adoption/validate-adoption-fixtures.mjs';
import {
  createImplementationPresetContext,
  validateAdoptionRecord,
} from '../../tools/adoption/validate-records.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));
const catalog = loadJson(join(root, 'paw/catalogs/implementation-presets/catalog.json')).value;
const catalogContext = createImplementationPresetContext(catalog);

test('record fixture matrix covers exact variant exception and rejection', () => {
  const result = validateAdoptionFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.record_fixture_count, 6);
  assert.equal(result.evidence.record_fixture_valid_count, 4);
  assert.equal(result.evidence.record_fixture_invalid_count, 2);
});

test('supported variants must belong to the referenced preset', () => {
  const record = readJson('paw/tests/fixtures/adoption/records/valid-supported-variant/case.json');
  record.variant_ref = 'hono-edge';
  const result = validateAdoptionRecord(record, { catalogContext });
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADOPTION_RECORD_UNKNOWN_VARIANT'));
});

test('exceptions require ready_with_exceptions and exception detail', () => {
  const record = readJson('paw/tests/fixtures/adoption/records/valid-local-exception/case.json');
  record.resolution_status = 'resolved';
  record.exceptions = [];
  const result = validateAdoptionRecord(record, { catalogContext });
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADOPTION_RECORD_EXCEPTION_STATUS'));
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADOPTION_RECORD_EXCEPTION_REQUIRED'));
});

test('overrides require approval scope impact and review path', () => {
  const record = readJson('paw/tests/fixtures/adoption/records/valid-local-exception/case.json');
  delete record.overrides[0].approved_by;
  delete record.overrides[0].review_condition;
  const result = validateAdoptionRecord(record, { catalogContext });
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADOPTION_OVERRIDE_REQUIRED_FIELD_MISSING'));
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADOPTION_OVERRIDE_REVIEW_REQUIRED'));
});
