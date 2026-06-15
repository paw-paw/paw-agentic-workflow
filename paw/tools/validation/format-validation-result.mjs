import { isAbsolute, relative, resolve } from 'node:path';

function portablePath(path, root) {
  if (!root || !isAbsolute(path)) return path.replaceAll('\\', '/');
  const relativePath = relative(resolve(root), resolve(path));
  if (relativePath === '') return '.';
  if (!relativePath.startsWith('..') && !isAbsolute(relativePath)) {
    return relativePath.replaceAll('\\', '/');
  }
  return path.replaceAll('\\', '/');
}

function portableDiagnostic(diagnostic, root) {
  return {
    ...diagnostic,
    path: portablePath(diagnostic.path, root),
  };
}

export function toStructuredResult(result, { root } = {}) {
  const warnings = result.diagnostics
    .filter((diagnostic) => diagnostic.severity === 'warning')
    .map((diagnostic) => portableDiagnostic(diagnostic, root));
  const errors = result.diagnostics
    .filter((diagnostic) => diagnostic.severity === 'error')
    .map((diagnostic) => portableDiagnostic(diagnostic, root));
  const compatibility = result.diagnostics
    .filter((diagnostic) => diagnostic.severity === 'compatibility')
    .map((diagnostic) => portableDiagnostic(diagnostic, root));

  return {
    status: result.valid ? 'pass' : 'fail',
    schema_version: result.schemaVersion,
    validated_paths: result.validatedPaths.map((path) => portablePath(path, root)),
    warnings,
    errors,
    evidence: {
      ...result.evidence,
      compatibility,
    },
  };
}

function humanDiagnostic(diagnostic) {
  const location =
    diagnostic.line === null ? diagnostic.path : `${diagnostic.path}:${diagnostic.line}`;
  return `[${diagnostic.severity}] ${diagnostic.code} ${location} - ${diagnostic.message}`;
}

export function formatHumanResult(result, { root } = {}) {
  const structured = toStructuredResult(result, { root });
  const schema = structured.schema_version ?? 'none';
  const summary =
    `PAW validation ${structured.status} ` +
    `(schema=${schema}, paths=${structured.validated_paths.length}, ` +
    `warnings=${structured.warnings.length}, errors=${structured.errors.length})`;
  const diagnostics = [
    ...structured.errors,
    ...structured.warnings,
    ...structured.evidence.compatibility,
  ].map(humanDiagnostic);

  return {
    stdout: `${summary}\n`,
    stderr: diagnostics.length > 0 ? `${diagnostics.join('\n')}\n` : '',
  };
}
