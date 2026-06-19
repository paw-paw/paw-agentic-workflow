import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import { loadJson } from './load-json.mjs';
import { validateFamilyCatalog, validateProductClassification } from './validate-family-catalog.mjs';

function codes(result) {
  return result.diagnostics.filter(({ severity }) => severity === 'error').map(({ code }) => code);
}

export function validateFamilyFixtures(root) {
  const fixtureRoot = resolve(root, 'paw', 'tests', 'fixtures', 'catalogs', 'families');
  const canonicalPath = resolve(root, 'paw', 'catalogs', 'families', 'catalog.json');
  if (!existsSync(fixtureRoot)) {
    return createValidationResult({
      diagnostics: [createDiagnostic({ code: 'FAMILY_FIXTURE_ROOT_NOT_FOUND', message: 'Family fixture root does not exist.', path: fixtureRoot })],
    });
  }
  const canonical = loadJson(canonicalPath);
  if (!canonical.value) return canonical.result;
  const familyIds = canonical.value.families.map(({ family_id: familyId }) => familyId);
  const diagnostics = [];
  const validatedPaths = [canonicalPath];
  let fixtureCount = 0;

  for (const name of readdirSync(fixtureRoot).sort()) {
    const directory = join(fixtureRoot, name);
    const expectedPath = join(directory, 'expected.json');
    if (!existsSync(expectedPath)) continue;
    fixtureCount += 1;
    const expected = JSON.parse(readFileSync(expectedPath, 'utf8'));
    const catalogPath = join(directory, 'catalog.json');
    const productPath = join(directory, 'product.json');
    const inputPath = existsSync(catalogPath) ? catalogPath : productPath;
    const loaded = loadJson(inputPath);
    let result = loaded.result;
    if (loaded.value) {
      result = existsSync(catalogPath)
        ? validateFamilyCatalog(loaded.value, { sourcePath: inputPath })
        : validateProductClassification(loaded.value, familyIds, { sourcePath: inputPath });
    }
    validatedPaths.push(expectedPath, ...result.validatedPaths);
    const actualCodes = codes(result);
    const expectedCodes = expected.errorCodes ?? [];
    if (result.valid !== expected.valid || JSON.stringify(actualCodes) !== JSON.stringify(expectedCodes)) {
      diagnostics.push(
        createDiagnostic({
          code: 'FAMILY_FIXTURE_EXPECTATION_MISMATCH',
          message: `Expected valid=${expected.valid} and errors=${expectedCodes.join(',')}; observed valid=${result.valid} and errors=${actualCodes.join(',')}.`,
          path: expectedPath,
        }),
      );
    }
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: { fixture_count: fixtureCount },
  });
}
