import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import {
  FAMILY_IDS,
  validateFamilyCatalog,
  validateProductClassification,
} from '../../tools/catalogs/validate-family-catalog.mjs';
import { validateCanonicalFamilies } from '../../tools/catalogs/validate-family-files.mjs';
import { validateFamilyFixtures } from '../../tools/catalogs/validate-family-fixtures.mjs';

const root = process.cwd();

test('canonical family catalog defines the approved eight semantic IDs', () => {
  const catalog = JSON.parse(
    readFileSync(join(root, 'paw/catalogs/families/catalog.json'), 'utf8'),
  );
  const result = validateFamilyCatalog(catalog);

  assert.equal(result.valid, true);
  assert.deepEqual(catalog.families.map(({ family_id: familyId }) => familyId), FAMILY_IDS);
  assert.deepEqual(
    catalog.families.flatMap(({ provenance_aliases: aliases }) => aliases),
    ['SF-01', 'SF-02', 'SF-03', 'SF-04', 'SF-05', 'SF-06', 'SF-07', 'SF-08'],
  );
});

test('canonical files and family fixture matrix validate', () => {
  const canonical = validateCanonicalFamilies(root);
  const fixtures = validateFamilyFixtures(root);

  assert.equal(canonical.valid, true);
  assert.equal(canonical.evidence.family_count, 8);
  assert.equal(fixtures.valid, true);
  assert.equal(fixtures.evidence.fixture_count, 15);
});

test('product classification requires exactly one known primary family', () => {
  assert.equal(
    validateProductClassification(
      { product_id: 'docs', primary_families: ['content-knowledge'] },
      FAMILY_IDS,
    ).valid,
    true,
  );

  const multiple = validateProductClassification(
    { product_id: 'hybrid', primary_families: ['content-knowledge', 'service-api'] },
    FAMILY_IDS,
  );
  assert.deepEqual(multiple.diagnostics.map(({ code }) => code), [
    'PRODUCT_PRIMARY_FAMILY_COUNT',
  ]);

  const unknown = validateProductClassification(
    { product_id: 'unknown', primary_families: ['website'] },
    FAMILY_IDS,
  );
  assert.deepEqual(unknown.diagnostics.map(({ code }) => code), [
    'PRODUCT_FAMILY_UNKNOWN',
  ]);
});
