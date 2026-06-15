import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import { loadJson } from './load-json.mjs';
import {
  mergeContributions,
  slotKey,
  validateModifierInstance,
} from './validate-modifier-catalog.mjs';

export function validateModifierFixtures(root) {
  const fixtureRoot = resolve(root, 'paw/tests/fixtures/catalogs/modifiers');
  const catalogPath = resolve(root, 'paw/catalogs/modifiers/catalog.json');
  const loaded = loadJson(catalogPath);
  if (!loaded.value) return loaded.result;
  const modifiers = new Map(loaded.value.modifiers.map((modifier) => [modifier.modifier_id, modifier]));
  const diagnostics = [];
  const validatedPaths = [catalogPath];
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
    let valid = true;
    let errorCodes = [];

    if (input.kind === 'instance') {
      const result = validateModifierInstance(
        input.instance,
        modifiers.get(input.instance.modifier_ref),
        { sourcePath: casePath },
      );
      valid = result.valid;
      errorCodes = result.diagnostics.map(({ code }) => code);
    } else if (input.kind === 'merge') {
      const result = mergeContributions(input.strategy, input.values);
      valid = result.ok;
      if (!result.ok) errorCodes = ['MODIFIER_MANUAL_CONFLICT'];
    } else if (input.kind === 'slot-key') {
      valid = slotKey(input.capability_id, input.scope_ref) === input.expected;
      if (!valid) errorCodes = ['MODIFIER_SLOT_KEY_MISMATCH'];
    }

    if (
      valid !== expected.valid ||
      JSON.stringify(errorCodes) !== JSON.stringify(expected.errorCodes ?? [])
    ) {
      diagnostics.push(
        createDiagnostic({
          code: 'MODIFIER_FIXTURE_EXPECTATION_MISMATCH',
          message: `Observed valid=${valid}, errors=${errorCodes.join(',')}.`,
          path: expectedPath,
        }),
      );
    }
  }
  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: { modifier_fixture_count: fixtureCount },
  });
}
