import { detectSchemaVersion } from './detect-schema-version.mjs';
import { parsePatchYaml } from './parse-patch-yaml.mjs';
import { createValidationResult } from './validation-result.mjs';
import { validateV1Manifest } from './validate-v1-manifest.mjs';
import { validateV2Manifest } from './validate-v2-manifest.mjs';

export function validatePatchManifest(
  text,
  {
    sourcePath = 'patch.yaml',
    evidence = {},
    validatedPaths = [],
  } = {},
) {
  const parsed = parsePatchYaml(text, { sourcePath });
  if (!parsed.ok) {
    return createValidationResult({
      diagnostics: parsed.diagnostics,
      validatedPaths,
    });
  }

  const detected = detectSchemaVersion(parsed.value, {
    sourcePath,
    locations: parsed.locations,
  });
  if (!detected.ok) {
    return createValidationResult({
      diagnostics: detected.diagnostics,
      validatedPaths,
    });
  }

  const diagnostics =
    detected.schemaVersion === 1
      ? validateV1Manifest(parsed.value, {
          sourcePath,
          locations: parsed.locations,
          evidence,
        })
      : validateV2Manifest(parsed.value, {
          sourcePath,
          locations: parsed.locations,
        });

  return createValidationResult({
    schemaVersion: detected.schemaVersion,
    diagnostics,
    validatedPaths,
  });
}
