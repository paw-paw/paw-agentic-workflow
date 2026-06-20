import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { loadJson } from '../catalogs/load-json.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import { validateDistributionManifest } from './validate-distribution-manifest.mjs';

export function validateDistributionContracts(root) {
  const manifestPath = resolve(root, 'paw/distribution/distribution-manifest.json');
  const schemaPath = resolve(root, 'paw/tools/schemas/distribution/distribution-manifest.schema.json');
  const loadedManifest = loadJson(manifestPath);
  const loadedSchema = loadJson(schemaPath);
  const diagnostics = [
    ...loadedManifest.result.diagnostics,
    ...loadedSchema.result.diagnostics,
  ];
  const validatedPaths = [
    ...loadedManifest.result.validatedPaths,
    ...loadedSchema.result.validatedPaths,
  ];

  if (loadedManifest.value) {
    const result = validateDistributionManifest(loadedManifest.value, manifestPath, {
      fileResolver(sourcePath) {
        return readFileSync(join(root, sourcePath));
      },
    });
    diagnostics.push(...result.diagnostics);
    validatedPaths.push(...result.validatedPaths);
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: {
      contract_count: 1,
      schema_count: loadedSchema.value ? 1 : 0,
      file_count: loadedManifest.value?.files?.length ?? 0,
    },
  });
}
