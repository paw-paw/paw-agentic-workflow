import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateCanonicalCatalogs } from '../../tools/catalogs/validate-canonical-catalogs.mjs';
import { validateCatalogFixtures } from '../../tools/catalogs/validate-catalog-fixtures.mjs';
import {
  CAPABILITY_IDS,
  resolveEffectiveApplicability,
  validateCapabilityCatalog,
  validateDocumentationPresetCatalog,
  validateExceptionRecord,
} from '../../tools/catalogs/validate-documentation-catalogs.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));
const clone = (value) => structuredClone(value);

test('canonical capability and documentation preset catalogs validate together', () => {
  const result = validateCanonicalCatalogs(root);
  assert.equal(result.valid, true);
  assert.deepEqual(result.evidence, {
    family_count: 8,
    capability_count: 22,
    documentation_preset_count: 8,
    component_count: 11,
    concern_count: 10,
    implementation_preset_count: 11,
    implementation_variant_count: 17,
    implementation_source_count: 31,
  });
});

test('documentation fixture matrix covers applicability and exceptions', () => {
  const result = validateCatalogFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.fixture_count, 15);
  assert.equal(result.evidence.documentation_fixture_count, 4);
});

test('unknown capability references and baseline drift are rejected', () => {
  const families = readJson('paw/catalogs/families/catalog.json');
  const capabilities = readJson('paw/catalogs/capabilities/catalog.json');
  const presets = readJson('paw/catalogs/documentation-presets/catalog.json');

  const unknown = clone(presets);
  unknown.presets[0].requirements[0].capability_id = 'unknown-capability';
  const unknownResult = validateDocumentationPresetCatalog(unknown, {
    familyIds: families.families.map(({ family_id: id }) => id),
    capabilityIds: CAPABILITY_IDS,
  });
  assert.ok(unknownResult.diagnostics.some(({ code }) => code === 'DOC_PRESET_CAPABILITY_UNKNOWN'));

  const drift = clone(presets);
  drift.presets.find(({ family_id: id }) => id === 'service-api')
    .requirements.find(({ capability_id: id }) => id === 'security').applicability = 'conditional';
  const driftResult = validateDocumentationPresetCatalog(drift, {
    familyIds: families.families.map(({ family_id: id }) => id),
    capabilityIds: capabilities.capabilities.map(({ capability_id: id }) => id),
  });
  assert.ok(driftResult.diagnostics.some(({ code }) => code === 'DOC_PRESET_SECURITY_BASELINE'));
});

test('missing merge strategies and incomplete exceptions are rejected', () => {
  const capabilities = readJson('paw/catalogs/capabilities/catalog.json');
  const invalid = clone(capabilities);
  invalid.capabilities[0].merge_strategy = null;
  assert.ok(
    validateCapabilityCatalog(invalid).diagnostics.some(
      ({ code }) => code === 'CAPABILITY_MERGE_STRATEGY_INVALID',
    ),
  );

  const exception = validateExceptionRecord({ exception_id: 'EX-1' });
  assert.equal(exception.valid, false);
  assert.ok(exception.diagnostics.length > 0);
});

test('effective applicability cannot weaken active obligations', () => {
  assert.deepEqual(
    resolveEffectiveApplicability({ declared: 'conditional', triggerActive: false }),
    { ok: true, state: 'conditional_inactive' },
  );
  assert.deepEqual(
    resolveEffectiveApplicability({
      declared: 'conditional',
      triggerActive: true,
      notApplicable: true,
    }),
    { ok: false, code: 'EFFECTIVE_NOT_APPLICABLE_FORBIDDEN' },
  );
});
