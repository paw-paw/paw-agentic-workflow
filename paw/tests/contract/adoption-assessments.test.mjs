import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { loadJson } from '../../tools/catalogs/load-json.mjs';
import { validateAdoptionFixtures } from '../../tools/adoption/validate-adoption-fixtures.mjs';
import {
  createAdoptionCatalogContext,
  validateAssessment,
} from '../../tools/adoption/validate-assessments.mjs';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));
const catalogContext = createAdoptionCatalogContext({
  families: loadJson(join(root, 'paw/catalogs/families/catalog.json')).value,
  documentationPresets: loadJson(join(root, 'paw/catalogs/documentation-presets/catalog.json')).value,
  modifiers: loadJson(join(root, 'paw/catalogs/modifiers/catalog.json')).value,
  implementationPresets: loadJson(join(root, 'paw/catalogs/implementation-presets/catalog.json')).value,
});

test('assessment fixture matrix covers greenfield brownfield and guard failures', () => {
  const result = validateAdoptionFixtures(root);
  assert.equal(result.valid, true);
  assert.equal(result.evidence.assessment_fixture_count, 5);
  assert.equal(result.evidence.assessment_fixture_valid_count, 2);
  assert.equal(result.evidence.assessment_fixture_invalid_count, 3);
});

test('assessments reject unknown catalog references', () => {
  const assessment = readJson('paw/tests/fixtures/adoption/assessments/valid-greenfield/case.json');
  assessment.modifier_refs.push('unknown-modifier');
  const result = validateAssessment(assessment, { catalogContext });
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADOPTION_ASSESSMENT_UNKNOWN_MODIFIER'));
});

test('greenfield and brownfield flows preserve order', () => {
  const greenfield = readJson('paw/tests/fixtures/adoption/assessments/valid-greenfield/case.json');
  greenfield.stack_realization.observed_before_adoption = true;
  const greenfieldResult = validateAssessment(greenfield, { catalogContext });
  assert.ok(greenfieldResult.diagnostics.some(({ code }) => code === 'ADOPTION_ASSESSMENT_GREENFIELD_ORDER'));

  const brownfield = readJson('paw/tests/fixtures/adoption/assessments/valid-brownfield/case.json');
  brownfield.stack_realization.observed_before_adoption = false;
  const brownfieldResult = validateAssessment(brownfield, { catalogContext });
  assert.ok(brownfieldResult.diagnostics.some(({ code }) => code === 'ADOPTION_ASSESSMENT_BROWNFIELD_OBSERVATION_REQUIRED'));
});

test('assessment cannot auto-select a stack', () => {
  const assessment = readJson('paw/tests/fixtures/adoption/assessments/valid-greenfield/case.json');
  assessment.auto_selected_stack = true;
  const result = validateAssessment(assessment, { catalogContext });
  assert.ok(result.diagnostics.some(({ code }) => code === 'ADOPTION_ASSESSMENT_AUTO_SELECTION_FORBIDDEN'));
});
