import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { loadJson } from '../catalogs/load-json.mjs';
import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import { validateIntegrationRecord } from './validate-integration-record.mjs';

function fixtureDirectories(root) {
  const base = resolve(root, 'paw/tests/fixtures/integration');
  try {
    return readdirSync(base, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => resolve(base, entry.name));
  } catch (error) {
    return [];
  }
}

function sameCodes(actual, expected) {
  return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
}

export function validateIntegrationFixtures(root) {
  const directories = fixtureDirectories(root);
  const diagnostics = [];
  const validatedPaths = [];
  let validCount = 0;
  let invalidCount = 0;

  for (const directory of directories) {
    const casePath = join(directory, 'case.json');
    const expectedPath = join(directory, 'expected.json');
    const loadedCase = loadJson(casePath);
    const loadedExpected = loadJson(expectedPath);
    diagnostics.push(...loadedCase.result.diagnostics, ...loadedExpected.result.diagnostics);
    validatedPaths.push(...loadedCase.result.validatedPaths, ...loadedExpected.result.validatedPaths);
    if (!loadedCase.value || !loadedExpected.value) continue;

    const result = validateIntegrationRecord(loadedCase.value, casePath);
    validatedPaths.push(...result.validatedPaths);
    const actualCodes = result.diagnostics.filter(({ severity }) => severity === 'error').map(({ code }) => code);
    const expectedCodes = loadedExpected.value.error_codes ?? [];
    const expectedValid = loadedExpected.value.valid === true;
    if (expectedValid) validCount += 1;
    else invalidCount += 1;

    if (result.valid !== expectedValid || !sameCodes(actualCodes, expectedCodes)) {
      diagnostics.push(createDiagnostic({
        code: 'INTEGRATION_FIXTURE_EXPECTATION_MISMATCH',
        message: `Fixture expectation mismatch. Expected valid=${expectedValid} codes=${expectedCodes.join(',')}; got valid=${result.valid} codes=${actualCodes.join(',')}.`,
        path: expectedPath,
      }));
    }
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: {
      fixture_count: directories.length,
      valid_count: validCount,
      invalid_count: invalidCount,
    },
  });
}

