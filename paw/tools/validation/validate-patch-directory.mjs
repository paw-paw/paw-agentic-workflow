import { existsSync, readFileSync } from 'node:fs';
import { isAbsolute, join, relative, resolve } from 'node:path';

import { createDiagnostic } from './diagnostics.mjs';
import { validatePatchManifest } from './validate-patch-manifest.mjs';
import { createValidationResult } from './validation-result.mjs';

function isWithin(path, root) {
  const relativePath = relative(resolve(root), resolve(path));
  return (
    relativePath === '' ||
    (!relativePath.startsWith('..') && !isAbsolute(relativePath))
  );
}

function isWithinAny(path, roots) {
  return roots.some((root) => isWithin(path, root));
}

export function validatePatchDirectory(
  patchDirectory,
  { allowedRoots = [], legacyRoots = [] } = {},
) {
  const resolvedDirectory = resolve(patchDirectory);

  if (!isWithinAny(resolvedDirectory, allowedRoots)) {
    return createValidationResult({
      diagnostics: [
        createDiagnostic({
          code: 'PATCH_PATH_OUTSIDE_ROOT',
          message: 'Patch directory is outside the allowed roots.',
          path: resolvedDirectory,
        }),
      ],
    });
  }

  if (isWithinAny(resolvedDirectory, legacyRoots)) {
    return createValidationResult({
      diagnostics: [
        createDiagnostic({
          code: 'PATCH_LEGACY_EXEMPT',
          severity: 'compatibility',
          message: 'Legacy patch history is exempt from manifest migration and validation.',
          path: resolvedDirectory,
        }),
      ],
      validatedPaths: [resolvedDirectory],
    });
  }

  const manifestPath = join(resolvedDirectory, 'patch.yaml');
  if (!existsSync(manifestPath)) {
    return createValidationResult({
      diagnostics: [
        createDiagnostic({
          code: 'PATCH_MANIFEST_REQUIRED',
          message: 'Patch directory requires patch.yaml.',
          path: manifestPath,
        }),
      ],
      validatedPaths: [resolvedDirectory],
    });
  }

  const closurePath = join(resolvedDirectory, 'cierre.md');
  const definitionPath = join(resolvedDirectory, 'definicion.md');
  const hasDefinition = existsSync(definitionPath);
  const validatedPaths = [resolvedDirectory, manifestPath];
  if (existsSync(closurePath)) validatedPaths.push(closurePath);
  if (hasDefinition) validatedPaths.push(definitionPath);

  return validatePatchManifest(readFileSync(manifestPath, 'utf8'), {
    sourcePath: manifestPath,
    validatedPaths,
    evidence: {
      patchDirectory: resolvedDirectory,
      hasClosure: existsSync(closurePath),
      definition: hasDefinition ? readFileSync(definitionPath, 'utf8') : null,
      definitionPath,
    },
  });
}
