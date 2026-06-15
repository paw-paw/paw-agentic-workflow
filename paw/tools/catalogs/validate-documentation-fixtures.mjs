import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import {
  resolveEffectiveApplicability,
  validateExceptionRecord,
} from './validate-documentation-catalogs.mjs';

function codes(result) {
  return result.diagnostics.map(({ code }) => code);
}

export function validateDocumentationFixtures(root) {
  const fixtureRoot = resolve(root, 'paw/tests/fixtures/catalogs/documentation');
  if (!existsSync(fixtureRoot)) {
    return createValidationResult({
      diagnostics: [
        createDiagnostic({
          code: 'DOCUMENTATION_FIXTURE_ROOT_NOT_FOUND',
          message: 'Documentation fixture root does not exist.',
          path: fixtureRoot,
        }),
      ],
    });
  }
  const diagnostics = [];
  const validatedPaths = [];
  let fixtureCount = 0;

  for (const name of readdirSync(fixtureRoot).sort()) {
    const directory = join(fixtureRoot, name);
    const casePath = join(directory, 'case.json');
    const expectedPath = join(directory, 'expected.json');
    if (!existsSync(casePath) || !existsSync(expectedPath)) continue;
    fixtureCount += 1;
    validatedPaths.push(casePath, expectedPath);
    const input = JSON.parse(readFileSync(casePath, 'utf8'));
    const expected = JSON.parse(readFileSync(expectedPath, 'utf8'));

    let valid;
    let actualCodes = [];
    let state;
    if (input.kind === 'applicability') {
      const result = resolveEffectiveApplicability(input);
      valid = result.ok;
      state = result.state;
      actualCodes = result.code ? [result.code] : [];
    } else if (input.kind === 'exception') {
      const result = validateExceptionRecord(input.record);
      valid = result.valid;
      actualCodes = codes(result);
    } else {
      valid = false;
      actualCodes = ['DOCUMENTATION_FIXTURE_KIND_UNKNOWN'];
    }

    if (
      valid !== expected.valid ||
      JSON.stringify(actualCodes) !== JSON.stringify(expected.errorCodes ?? []) ||
      (expected.state !== undefined && state !== expected.state)
    ) {
      diagnostics.push(
        createDiagnostic({
          code: 'DOCUMENTATION_FIXTURE_EXPECTATION_MISMATCH',
          message: `Observed valid=${valid}, state=${state ?? 'none'}, errors=${actualCodes.join(',')}.`,
          path: expectedPath,
        }),
      );
    }
  }
  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: { documentation_fixture_count: fixtureCount },
  });
}
