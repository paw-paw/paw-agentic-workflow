import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { validateCanonicalCatalogs } from '../../tools/catalogs/validate-canonical-catalogs.mjs';
import { validateCatalogFixtures } from '../../tools/catalogs/validate-catalog-fixtures.mjs';
import {
  mergeContributions,
  slotKey,
  validateModifierCatalog,
  validateModifierInstance,
} from '../../tools/catalogs/validate-modifier-catalog.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

test('canonical modifier catalog contains eleven components and ten concerns', () => {
  const result = validateCanonicalCatalogs(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.component_count, 11);
  assert.equal(result.evidence.concern_count, 10);
});

test('modifier fixture matrix covers composition and guards', () => {
  const result = validateCatalogFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.modifier_fixture_count, 8);
});

test('slot identity uses capability and scope only', () => {
  assert.equal(slotKey('security', 'component:api'), 'security::component:api');
  assert.notEqual(slotKey('security', 'component:api'), slotKey('security', 'component:worker'));
});

test('merge strategies are explicit and manual conflicts remain unresolved', () => {
  assert.deepEqual(mergeContributions('union', [['a'], ['b', 'a']]), { ok: true, value: ['a', 'b'] });
  assert.deepEqual(mergeContributions('maximum', [1, 3, 2]), { ok: true, value: 3 });
  assert.deepEqual(mergeContributions('minimum', [10, 5, 8]), { ok: true, value: 5 });
  assert.deepEqual(mergeContributions('intersection', [['a', 'b'], ['b', 'c']]), { ok: true, value: ['b'] });
  assert.deepEqual(
    mergeContributions('manual-conflict', ['a', 'b']),
    { ok: false, conflict: 'manual-resolution-required' },
  );
});

test('catalog and instances reject authority mutation and missing regulatory basis', () => {
  const families = readJson('paw/catalogs/families/catalog.json');
  const capabilities = readJson('paw/catalogs/capabilities/catalog.json');
  const modifiers = readJson('paw/catalogs/modifiers/catalog.json');
  const invalidCatalog = structuredClone(modifiers);
  invalidCatalog.modifiers[0].technology = 'framework';
  assert.ok(
    validateModifierCatalog(invalidCatalog, {
      familyIds: families.families.map(({ family_id: id }) => id),
      capabilityIds: capabilities.capabilities.map(({ capability_id: id }) => id),
    }).diagnostics.some(({ code }) => code === 'MODIFIER_FORBIDDEN_FIELD'),
  );

  const regulated = modifiers.modifiers.find(({ modifier_id: id }) => id === 'regulated-data');
  const instance = validateModifierInstance(
    {
      modifier_ref: 'regulated-data',
      family_id: 'service-api',
      scope_ref: 'data:records',
      activation_inputs: {},
    },
    regulated,
  );
  assert.ok(instance.diagnostics.some(({ code }) => code === 'REGULATED_DATA_BASIS_REQUIRED'));
});
