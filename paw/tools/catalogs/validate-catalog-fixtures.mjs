import { createValidationResult } from '../validation/validation-result.mjs';
import { validateDocumentationFixtures } from './validate-documentation-fixtures.mjs';
import { validateFamilyFixtures } from './validate-family-fixtures.mjs';
import { validateModifierFixtures } from './validate-modifier-fixtures.mjs';
import { validateImplementationPresetFixtures } from './validate-implementation-preset-fixtures.mjs';

export function validateCatalogFixtures(root) {
  const results = [
    validateFamilyFixtures(root),
    validateDocumentationFixtures(root),
    validateModifierFixtures(root),
    validateImplementationPresetFixtures(root),
  ];
  return createValidationResult({
    schemaVersion: 1,
    diagnostics: results.flatMap(({ diagnostics }) => diagnostics),
    validatedPaths: results.flatMap(({ validatedPaths }) => validatedPaths),
    evidence: Object.assign({}, ...results.map(({ evidence }) => evidence)),
  });
}
