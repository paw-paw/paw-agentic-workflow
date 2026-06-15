import { readFileSync } from 'node:fs';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

export function loadJson(path) {
  try {
    const value = JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
    return { value, result: createValidationResult({ validatedPaths: [path] }) };
  } catch (error) {
    return {
      value: null,
      result: createValidationResult({
        diagnostics: [
          createDiagnostic({
            code: error.code === 'ENOENT' ? 'CATALOG_FILE_NOT_FOUND' : 'CATALOG_JSON_INVALID',
            message: error.code === 'ENOENT' ? 'Catalog file does not exist.' : error.message,
            path,
          }),
        ],
      }),
    };
  }
}
