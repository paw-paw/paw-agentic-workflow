export function createDiagnostic({
  code,
  message,
  path,
  line = null,
  severity = 'error',
}) {
  return {
    code,
    severity,
    path,
    line,
    message,
  };
}
