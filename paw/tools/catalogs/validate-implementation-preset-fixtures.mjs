import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import { loadJson } from './load-json.mjs';
import { validateImplementationPresetCatalog } from './validate-implementation-presets.mjs';

export function validateImplementationPresetFixtures(root) {
  const fixtureRoot = resolve(root, 'paw/tests/fixtures/catalogs/implementation-presets');
  const catalogPath = resolve(root, 'paw/catalogs/implementation-presets/catalog.json');
  const familyPath = resolve(root, 'paw/catalogs/families/catalog.json');
  const modifierPath = resolve(root, 'paw/catalogs/modifiers/catalog.json');
  const catalog = loadJson(catalogPath);
  const families = loadJson(familyPath);
  const modifiers = loadJson(modifierPath);
  const loadResults = [catalog.result, families.result, modifiers.result];
  if (!catalog.value || !families.value || !modifiers.value) {
    return createValidationResult({
      diagnostics: loadResults.flatMap(({ diagnostics }) => diagnostics),
      validatedPaths: loadResults.flatMap(({ validatedPaths }) => validatedPaths),
    });
  }
  const diagnostics = [];
  const validatedPaths = [catalogPath, familyPath, modifierPath];
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
    const candidate = structuredClone(catalog.value);
    if (input.mutation === 'floating-version') candidate.presets[0].fixed_decisions[0] = 'Astro latest';
    if (input.mutation === 'stale-review') candidate.presets[0].review_by = '2026-12-13';
    if (input.mutation === 'unknown-reference') candidate.presets[0].supported_profiles[0] = 'unknown-profile';
    if (input.mutation === 'free-composition') candidate.presets[0].variants[0].combinable_with = ['nextjs-restricted'];
    if (input.mutation === 'runtime-activation') candidate.presets[0].runtime_agentic = 'bound';
    const result = validateImplementationPresetCatalog(candidate, {
      familyIds: families.value.families.map(({ family_id: id }) => id),
      modifierIds: modifiers.value.modifiers.map(({ modifier_id: id }) => id),
      sourcePath: casePath,
    });
    const errorCodes = result.diagnostics.map(({ code }) => code);
    const inventoryMatches = !input.preset_ids ||
      JSON.stringify(candidate.presets.map(({ preset_id: id }) => id)) === JSON.stringify(input.preset_ids);
    const valid = result.valid && inventoryMatches;
    if (
      valid !== expected.valid ||
      JSON.stringify(errorCodes) !== JSON.stringify(expected.errorCodes ?? [])
    ) {
      diagnostics.push(createDiagnostic({
        code: 'IMPLEMENTATION_PRESET_FIXTURE_EXPECTATION_MISMATCH',
        message: `Observed valid=${valid}, errors=${errorCodes.join(',')}.`,
        path: expectedPath,
      }));
    }
  }
  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: { implementation_preset_fixture_count: fixtureCount },
  });
}
