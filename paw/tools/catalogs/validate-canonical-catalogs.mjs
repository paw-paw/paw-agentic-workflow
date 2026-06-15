import { resolve } from 'node:path';

import { createValidationResult } from '../validation/validation-result.mjs';
import { loadJson } from './load-json.mjs';
import { validateFamilyCatalog } from './validate-family-catalog.mjs';
import {
  validateCapabilityCatalog,
  validateDocumentationPresetCatalog,
} from './validate-documentation-catalogs.mjs';

export function validateCanonicalCatalogs(root) {
  const paths = {
    families: resolve(root, 'paw/catalogs/families/catalog.json'),
    capabilities: resolve(root, 'paw/catalogs/capabilities/catalog.json'),
    documentationPresets: resolve(root, 'paw/catalogs/documentation-presets/catalog.json'),
  };
  const loaded = Object.fromEntries(
    Object.entries(paths).map(([key, path]) => [key, loadJson(path)]),
  );
  const results = Object.values(loaded).map(({ result }) => result);

  if (loaded.families.value) {
    results.push(validateFamilyCatalog(loaded.families.value, { sourcePath: paths.families }));
  }
  if (loaded.capabilities.value) {
    results.push(validateCapabilityCatalog(loaded.capabilities.value, { sourcePath: paths.capabilities }));
  }
  if (loaded.documentationPresets.value && loaded.families.value && loaded.capabilities.value) {
    results.push(
      validateDocumentationPresetCatalog(loaded.documentationPresets.value, {
        familyIds: loaded.families.value.families.map(({ family_id: id }) => id),
        capabilityIds: loaded.capabilities.value.capabilities.map(({ capability_id: id }) => id),
        sourcePath: paths.documentationPresets,
      }),
    );
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics: results.flatMap(({ diagnostics }) => diagnostics),
    validatedPaths: results.flatMap(({ validatedPaths }) => validatedPaths),
    evidence: {
      family_count: loaded.families.value?.families?.length ?? 0,
      capability_count: loaded.capabilities.value?.capabilities?.length ?? 0,
      documentation_preset_count: loaded.documentationPresets.value?.presets?.length ?? 0,
    },
  });
}
