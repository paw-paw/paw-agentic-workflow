import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { createValidationResult } from '../validation/validation-result.mjs';

function fixtureDirectories(root) {
  const base = resolve(root, 'paw/tests/fixtures/workflow');
  try {
    return readdirSync(base, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => resolve(base, entry.name));
  } catch (error) {
    return [];
  }
}

export function validateWorkflowFixtures(root) {
  const directories = fixtureDirectories(root);
  return createValidationResult({
    schemaVersion: 1,
    diagnostics: [],
    validatedPaths: directories,
    evidence: {
      fixture_count: directories.length,
      valid_count: 0,
      invalid_count: 0,
    },
  });
}
