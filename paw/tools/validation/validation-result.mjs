export function createValidationResult({
  schemaVersion = null,
  diagnostics = [],
  validatedPaths = [],
}) {
  return {
    valid: !diagnostics.some((diagnostic) => diagnostic.severity === 'error'),
    schemaVersion,
    diagnostics,
    validatedPaths: [...new Set(validatedPaths)],
  };
}
