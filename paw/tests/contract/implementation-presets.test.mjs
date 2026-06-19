import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateCanonicalCatalogs } from '../../tools/catalogs/validate-canonical-catalogs.mjs';
import { validateCatalogFixtures } from '../../tools/catalogs/validate-catalog-fixtures.mjs';
import {
  PRESET_IDS,
  VARIANT_IDS,
  validateImplementationPresetCatalog,
} from '../../tools/catalogs/validate-implementation-presets.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

function validate(catalog) {
  const families = readJson('paw/catalogs/families/catalog.json');
  const modifiers = readJson('paw/catalogs/modifiers/catalog.json');
  return validateImplementationPresetCatalog(catalog, {
    familyIds: families.families.map(({ family_id: id }) => id),
    modifierIds: modifiers.modifiers.map(({ modifier_id: id }) => id),
  });
}

test('canonical implementation preset inventory and evidence validate', () => {
  const result = validateCanonicalCatalogs(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.implementation_preset_count, 11);
  assert.equal(result.evidence.implementation_variant_count, 17);
  assert.equal(result.evidence.implementation_source_count, 31);
  assert.deepEqual(readJson('paw/catalogs/implementation-presets/catalog.json').presets.map(({ preset_id: id }) => id), PRESET_IDS);
});

test('approved variants remain subordinate complete-envelope replacements', () => {
  const catalog = readJson('paw/catalogs/implementation-presets/catalog.json');
  const variants = catalog.presets.flatMap(({ variants }) => variants);
  assert.deepEqual(variants.map(({ variant_id: id }) => id), VARIANT_IDS);
  assert.ok(variants.every(({ envelope_replacement: envelope, use_when: useWhen }) => envelope && useWhen));
  assert.ok(variants.every((variant) => !Object.hasOwn(variant, 'combinable_with')));
});

test('implementation preset fixture matrix covers all envelopes and guards', () => {
  const result = validateCatalogFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.implementation_preset_fixture_count, 6);
});

test('floating versions, stale review and activation fields are rejected', () => {
  const source = readJson('paw/catalogs/implementation-presets/catalog.json');

  const floating = structuredClone(source);
  floating.presets[0].fixed_decisions[0] = 'Astro latest';
  assert.ok(validate(floating).diagnostics.some(({ code }) => code === 'PRESET_FLOATING_VERSION'));

  const stale = structuredClone(source);
  stale.presets[0].review_by = '2026-12-13';
  assert.ok(validate(stale).diagnostics.some(({ code }) => code === 'PRESET_REVIEW_WINDOW'));

  const activated = structuredClone(source);
  activated.presets[0].runtime_adapter = 'codex';
  assert.ok(validate(activated).diagnostics.some(({ code }) => code === 'PRESET_FORBIDDEN_FIELD'));
});

test('unknown references and free variant composition are rejected', () => {
  const source = readJson('paw/catalogs/implementation-presets/catalog.json');

  const unknown = structuredClone(source);
  unknown.presets[0].supported_profiles[0] = 'unknown-profile';
  assert.ok(validate(unknown).diagnostics.some(({ code }) => code === 'PRESET_MODIFIER_REF'));

  const free = structuredClone(source);
  free.presets[0].variants[0].combinable_with = ['nextjs-restricted'];
  assert.ok(validate(free).diagnostics.some(({ code }) => code === 'PRESET_VARIANT_COMPOSITION'));
});
