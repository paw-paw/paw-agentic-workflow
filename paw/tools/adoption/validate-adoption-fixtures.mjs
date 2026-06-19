import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { loadJson } from '../catalogs/load-json.mjs';
import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import { createAdoptionCatalogContext, validateAssessment } from './validate-assessments.mjs';
import { validateAdapter } from './validate-adapters.mjs';
import { createImplementationPresetContext, validateAdoptionRecord } from './validate-records.mjs';

function fixtureDirectories(root, relativeRoot) {
  const base = resolve(root, relativeRoot);
  try {
    return readdirSync(base, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join(base, entry.name));
  } catch (error) {
    return [];
  }
}

function sameCodes(actual, expected) {
  return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
}

function validateFixtureGroup(root, relativeRoot, validateCase) {
  const directories = fixtureDirectories(root, relativeRoot);
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

    const result = validateCase(loadedCase.value, casePath);
    validatedPaths.push(...result.validatedPaths);
    const actualCodes = result.diagnostics.filter(({ severity }) => severity === 'error').map(({ code }) => code);
    const expectedCodes = loadedExpected.value.error_codes ?? [];
    const expectedValid = loadedExpected.value.valid === true;
    if (expectedValid) validCount += 1;
    else invalidCount += 1;

    if (result.valid !== expectedValid || !sameCodes(actualCodes, expectedCodes)) {
      diagnostics.push(createDiagnostic({
        code: 'ADOPTION_FIXTURE_EXPECTATION_MISMATCH',
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

export function validateAdoptionFixtures(root) {
  const loadedCatalogs = {
    families: loadJson(resolve(root, 'paw/catalogs/families/catalog.json')),
    documentationPresets: loadJson(resolve(root, 'paw/catalogs/documentation-presets/catalog.json')),
    modifiers: loadJson(resolve(root, 'paw/catalogs/modifiers/catalog.json')),
    implementationPresets: loadJson(resolve(root, 'paw/catalogs/implementation-presets/catalog.json')),
  };
  const catalogContext = createAdoptionCatalogContext({
    families: loadedCatalogs.families.value,
    documentationPresets: loadedCatalogs.documentationPresets.value,
    modifiers: loadedCatalogs.modifiers.value,
    implementationPresets: loadedCatalogs.implementationPresets.value,
  });
  const recordCatalogContext = createImplementationPresetContext(loadedCatalogs.implementationPresets.value);
  const adapterResult = validateFixtureGroup(
    root,
    'paw/tests/fixtures/adoption/adapters',
    (value, sourcePath) => validateAdapter(value, { sourcePath }),
  );
  const recordResult = validateFixtureGroup(
    root,
    'paw/tests/fixtures/adoption/records',
    (value, sourcePath) => validateAdoptionRecord(value, { sourcePath, catalogContext: recordCatalogContext }),
  );
  const assessmentResult = validateFixtureGroup(
    root,
    'paw/tests/fixtures/adoption/assessments',
    (value, sourcePath) => validateAssessment(value, { sourcePath, catalogContext }),
  );

  return createValidationResult({
    schemaVersion: 1,
    diagnostics: [
      ...Object.values(loadedCatalogs).flatMap(({ result }) => result.diagnostics),
      ...adapterResult.diagnostics,
      ...recordResult.diagnostics,
      ...assessmentResult.diagnostics,
    ],
    validatedPaths: [
      ...Object.values(loadedCatalogs).flatMap(({ result }) => result.validatedPaths),
      ...adapterResult.validatedPaths,
      ...recordResult.validatedPaths,
      ...assessmentResult.validatedPaths,
    ],
    evidence: {
      adapter_fixture_count: adapterResult.evidence.fixture_count,
      adapter_fixture_valid_count: adapterResult.evidence.valid_count,
      adapter_fixture_invalid_count: adapterResult.evidence.invalid_count,
      record_fixture_count: recordResult.evidence.fixture_count,
      record_fixture_valid_count: recordResult.evidence.valid_count,
      record_fixture_invalid_count: recordResult.evidence.invalid_count,
      assessment_fixture_count: assessmentResult.evidence.fixture_count,
      assessment_fixture_valid_count: assessmentResult.evidence.valid_count,
      assessment_fixture_invalid_count: assessmentResult.evidence.invalid_count,
    },
  });
}
