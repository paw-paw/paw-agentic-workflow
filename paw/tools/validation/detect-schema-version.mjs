import { createDiagnostic } from './diagnostics.mjs';

const V1_AXIS_FIELDS = ['patch_kind', 'lifecycle'];
const V2_AXIS_FIELDS = ['patch_mode', 'creates_docs', 'bootstrap_context'];

function firstPresentField(value, fields) {
  return fields.find((field) => Object.hasOwn(value, field));
}

function diagnostic(code, message, sourcePath, locations, field) {
  return createDiagnostic({
    code,
    message,
    path: sourcePath,
    line: locations[field]?.line ?? null,
  });
}

export function detectSchemaVersion(
  value,
  { sourcePath = 'patch.yaml', locations = {} } = {},
) {
  const diagnostics = [];

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    diagnostics.push(
      diagnostic(
        'PATCH_SCHEMA_INPUT_TYPE',
        'Schema detection requires a parsed patch manifest object.',
        sourcePath,
        locations,
        'schema_version',
      ),
    );
    return { ok: false, schemaVersion: null, diagnostics };
  }

  if (!Object.hasOwn(value, 'schema_version')) {
    diagnostics.push(
      diagnostic(
        'PATCH_SCHEMA_VERSION_MISSING',
        'Patch manifest must declare schema_version before versioned rules can run.',
        sourcePath,
        locations,
        'schema_version',
      ),
    );
    return { ok: false, schemaVersion: null, diagnostics };
  }

  if (value.schema_version !== 1 && value.schema_version !== 2) {
    diagnostics.push(
      diagnostic(
        'PATCH_SCHEMA_VERSION_UNSUPPORTED',
        `Unsupported schema_version "${value.schema_version}"; supported versions are 1 and 2.`,
        sourcePath,
        locations,
        'schema_version',
      ),
    );
    return { ok: false, schemaVersion: null, diagnostics };
  }

  const v1Field = firstPresentField(value, V1_AXIS_FIELDS);
  const v2Field = firstPresentField(value, V2_AXIS_FIELDS);

  if (v1Field && v2Field) {
    diagnostics.push(
      diagnostic(
        'PATCH_SCHEMA_AXES_HYBRID',
        `Manifest mixes v1 field "${v1Field}" with v2 field "${v2Field}".`,
        sourcePath,
        locations,
        v2Field,
      ),
    );
  } else if (value.schema_version === 1 && v2Field) {
    diagnostics.push(
      diagnostic(
        'PATCH_SCHEMA_V1_HAS_V2_FIELDS',
        `Schema v1 manifest cannot declare v2 field "${v2Field}".`,
        sourcePath,
        locations,
        v2Field,
      ),
    );
  } else if (value.schema_version === 2 && v1Field) {
    diagnostics.push(
      diagnostic(
        'PATCH_SCHEMA_V2_HAS_V1_FIELDS',
        `Schema v2 manifest cannot declare v1 field "${v1Field}".`,
        sourcePath,
        locations,
        v1Field,
      ),
    );
  }

  return {
    ok: diagnostics.length === 0,
    schemaVersion: diagnostics.length === 0 ? value.schema_version : null,
    diagnostics,
  };
}
