import { resolve } from 'node:path';

import { createValidationResult } from '../validation/validation-result.mjs';
import { loadJson } from './load-json.mjs';
import { validateFamilyCatalog } from './validate-family-catalog.mjs';
import {
  validateCapabilityCatalog,
  validateDocumentationPresetCatalog,
} from './validate-documentation-catalogs.mjs';
import { validateModifierCatalog } from './validate-modifier-catalog.mjs';
import { validateImplementationPresetCatalog } from './validate-implementation-presets.mjs';

export function validateCanonicalCatalogs(root) {
  const paths = {
    families: resolve(root, 'paw/catalogs/families/catalog.json'),
    capabilities: resolve(root, 'paw/catalogs/capabilities/catalog.json'),
    documentationPresets: resolve(root, 'paw/catalogs/documentation-presets/catalog.json'),
    modifiers: resolve(root, 'paw/catalogs/modifiers/catalog.json'),
    implementationPresets: resolve(root, 'paw/catalogs/implementation-presets/catalog.json'),
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
  if (loaded.modifiers.value && loaded.families.value && loaded.capabilities.value) {
    results.push(
      validateModifierCatalog(loaded.modifiers.value, {
        familyIds: loaded.families.value.families.map(({ family_id: id }) => id),
        capabilityIds: loaded.capabilities.value.capabilities.map(({ capability_id: id }) => id),
        sourcePath: paths.modifiers,
      }),
    );
  }
  if (loaded.implementationPresets.value && loaded.families.value && loaded.modifiers.value) {
    results.push(
      validateImplementationPresetCatalog(loaded.implementationPresets.value, {
        familyIds: loaded.families.value.families.map(({ family_id: id }) => id),
        modifierIds: loaded.modifiers.value.modifiers.map(({ modifier_id: id }) => id),
        sourcePath: paths.implementationPresets,
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
      component_count: loaded.modifiers.value?.modifiers?.filter(({ modifier_kind: kind }) => kind === 'component').length ?? 0,
      concern_count: loaded.modifiers.value?.modifiers?.filter(({ modifier_kind: kind }) => kind === 'concern').length ?? 0,
      implementation_preset_count: loaded.implementationPresets.value?.presets?.length ?? 0,
      implementation_variant_count: loaded.implementationPresets.value?.presets?.flatMap(({ variants }) => variants).length ?? 0,
      implementation_source_count: loaded.implementationPresets.value?.sources?.length ?? 0,
    },
  });
}
