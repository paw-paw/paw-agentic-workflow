import { createValidationResult } from '../validation/validation-result.mjs';
import { validateDocumentationFixtures } from './validate-documentation-fixtures.mjs';
import { validateFamilyFixtures } from './validate-family-fixtures.mjs';

export function validateCatalogFixtures(root) {
  const results = [
    validateFamilyFixtures(root),
    validateDocumentationFixtures(root),
  ];
  return createValidationResult({
    schemaVersion: 1,
    diagnostics: results.flatMap(({ diagnostics }) => diagnostics),
    validatedPaths: results.flatMap(({ validatedPaths }) => validatedPaths),
    evidence: Object.assign({}, ...results.map(({ evidence }) => evidence)),
  });
}
