import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import { createDiagnostic } from './diagnostics.mjs';
import { mergeValidationResults } from './aggregate-validation.mjs';
import { validatePatchDirectory } from './validate-patch-directory.mjs';
import { createValidationResult } from './validation-result.mjs';

function listFiles(path) {
  const files = [];
  for (const name of readdirSync(path).sort()) {
    const entry = join(path, name);
    if (statSync(entry).isDirectory()) {
      files.push(...listFiles(entry));
    } else {
      files.push(entry);
    }
  }
  return files;
}

function diagnosticCodes(result, severity) {
  return result.diagnostics
    .filter((diagnostic) => diagnostic.severity === severity)
    .map((diagnostic) => diagnostic.code);
}

function sameArray(actual, expected = []) {
  return (
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

export function validateFixtureMatrix(fixturesPath) {
  const fixturesRoot = resolve(fixturesPath);
  if (!existsSync(fixturesRoot)) {
    return createValidationResult({
      diagnostics: [
        createDiagnostic({
          code: 'FIXTURE_ROOT_NOT_FOUND',
          message: 'Fixture root does not exist.',
          path: fixturesRoot,
        }),
      ],
    });
  }
  const expectedPaths = listFiles(fixturesRoot).filter(
    (path) =>
      path.endsWith('expected.json') &&
      !path.replaceAll('\\', '/').includes('/catalogs/') &&
      !path.replaceAll('\\', '/').includes('/adoption/'),
  );
  const harnessDiagnostics = [];
  const observedResults = [];

  for (const expectedPath of expectedPaths) {
    const fixtureDirectory = dirname(expectedPath);
    const expected = JSON.parse(readFileSync(expectedPath, 'utf8'));
    const result = validatePatchDirectory(fixtureDirectory, {
      allowedRoots: expected.outsideRoot
        ? [join(fixtureDirectory, 'allowed-root')]
        : [fixturesRoot],
      legacyRoots: expected.legacy ? [fixtureDirectory] : [],
    });
    observedResults.push(result);

    const mismatches = [];
    if (result.valid !== expected.valid) mismatches.push('valid');
    if (result.schemaVersion !== expected.schemaVersion) {
      mismatches.push('schemaVersion');
    }
    if (!sameArray(diagnosticCodes(result, 'error'), expected.errorCodes)) {
      mismatches.push('errorCodes');
    }
    if (!sameArray(diagnosticCodes(result, 'warning'), expected.warningCodes)) {
      mismatches.push('warningCodes');
    }
    if (
      !sameArray(
        diagnosticCodes(result, 'compatibility'),
        expected.compatibilityCodes,
      )
    ) {
      mismatches.push('compatibilityCodes');
    }

    if (mismatches.length > 0) {
      harnessDiagnostics.push(
        createDiagnostic({
          code: 'FIXTURE_EXPECTATION_MISMATCH',
          message: `Fixture result differs from expected fields: ${mismatches.join(', ')}.`,
          path: expectedPath,
        }),
      );
    }
  }

  const observed = mergeValidationResults(observedResults);
  return createValidationResult({
    schemaVersion: observed.schemaVersion,
    diagnostics: harnessDiagnostics,
    validatedPaths: observed.validatedPaths,
    evidence: {
      fixture_count: expectedPaths.length,
      expected_valid_count: observedResults.filter((result) => result.valid).length,
      expected_invalid_count: observedResults.filter((result) => !result.valid).length,
    },
  });
}
