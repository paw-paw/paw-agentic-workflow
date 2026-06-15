import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { createDiagnostic } from './diagnostics.mjs';
import { mergeValidationResults } from './aggregate-validation.mjs';
import { validatePatchDirectory } from './validate-patch-directory.mjs';
import { createValidationResult } from './validation-result.mjs';

function listDirectories(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .sort()
    .map((name) => join(path, name))
    .filter((entry) => statSync(entry).isDirectory());
}

export function validateRepository(rootPath) {
  const root = resolve(rootPath);
  if (!existsSync(root)) {
    return createValidationResult({
      diagnostics: [
        createDiagnostic({
          code: 'VALIDATION_ROOT_NOT_FOUND',
          message: 'Validation root does not exist.',
          path: root,
        }),
      ],
    });
  }

  const patchesRoot = join(root, 'sdd', 'parches');
  if (!existsSync(patchesRoot)) {
    return createValidationResult({
      diagnostics: [
        createDiagnostic({
          code: 'PATCH_ROOT_NOT_FOUND',
          message: 'Validation root must contain sdd/parches.',
          path: patchesRoot,
        }),
      ],
      validatedPaths: [root],
    });
  }

  const legacyRoot = join(patchesRoot, 'legacy');
  const results = [];
  let patchCount = 0;
  let legacyCount = 0;

  for (const patchDirectory of listDirectories(patchesRoot)) {
    if (resolve(patchDirectory) === resolve(legacyRoot)) continue;
    patchCount += 1;
    results.push(
      validatePatchDirectory(patchDirectory, {
        allowedRoots: [patchesRoot],
      }),
    );
  }

  for (const legacyDirectory of listDirectories(legacyRoot)) {
    legacyCount += 1;
    results.push(
      validatePatchDirectory(legacyDirectory, {
        allowedRoots: [patchesRoot],
        legacyRoots: [legacyRoot],
      }),
    );
  }

  return mergeValidationResults(results, {
    evidence: {
      patch_count: patchCount,
      legacy_count: legacyCount,
    },
  });
}
