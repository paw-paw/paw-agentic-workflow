import { createValidationResult } from './validation-result.mjs';

function mergeEvidence(results, extraEvidence) {
  const aggregate = {};
  for (const result of results) {
    for (const [key, value] of Object.entries(result.evidence ?? {})) {
      if (typeof value === 'number') {
        aggregate[key] = (aggregate[key] ?? 0) + value;
      } else if (Array.isArray(value)) {
        aggregate[key] = [...(aggregate[key] ?? []), ...value];
      } else {
        aggregate[key] = value;
      }
    }
  }
  return { ...aggregate, ...extraEvidence };
}

export function mergeValidationResults(results, { evidence = {} } = {}) {
  const diagnostics = results.flatMap((result) => result.diagnostics);
  const validatedPaths = results.flatMap((result) => result.validatedPaths);
  const schemaVersions = [
    ...new Set(
      results
        .map((result) => result.schemaVersion)
        .filter((version) => version !== null),
    ),
  ].sort();

  return createValidationResult({
    schemaVersion:
      schemaVersions.length === 0
        ? null
        : schemaVersions.length === 1
          ? schemaVersions[0]
          : 'mixed',
    diagnostics,
    validatedPaths,
    evidence: mergeEvidence(results, evidence),
  });
}
