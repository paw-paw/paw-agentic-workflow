import { resolve } from 'node:path';

import { createValidationResult } from '../validation/validation-result.mjs';
import { loadJson } from './load-json.mjs';
import {
  validateFamilyCatalog,
  validateProductClassification,
} from './validate-family-catalog.mjs';

function merge(results, evidence = {}) {
  return createValidationResult({
    schemaVersion: 1,
    diagnostics: results.flatMap((result) => result.diagnostics),
    validatedPaths: results.flatMap((result) => result.validatedPaths),
    evidence,
  });
}

export function validateCanonicalFamilies(root) {
  const path = resolve(root, 'paw', 'catalogs', 'families', 'catalog.json');
  const loaded = loadJson(path);
  if (!loaded.value) return loaded.result;
  return merge([loaded.result, validateFamilyCatalog(loaded.value, { sourcePath: path })], {
    catalog: 'software-families',
    family_count: loaded.value.families?.length ?? 0,
  });
}

export function validateProductFile(productPath, catalogPath) {
  const catalogLoaded = loadJson(catalogPath);
  const productLoaded = loadJson(productPath);
  const results = [catalogLoaded.result, productLoaded.result];
  if (!catalogLoaded.value || !productLoaded.value) return merge(results);

  const catalogResult = validateFamilyCatalog(catalogLoaded.value, { sourcePath: catalogPath });
  results.push(catalogResult);
  if (catalogResult.valid) {
    results.push(
      validateProductClassification(
        productLoaded.value,
        catalogLoaded.value.families.map(({ family_id: familyId }) => familyId),
        { sourcePath: productPath },
      ),
    );
  }
  return merge(results);
}
