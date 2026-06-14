import {
  ISO_DATE,
  addDiagnostic,
  rejectUnknownFields,
  requireFields,
  validateDate,
  validateEnum,
  validateString,
  validateStringArray,
} from './validation-rules.mjs';

const REQUIRED_FIELDS = [
  'schema_version',
  'change_id',
  'program_id',
  'patch_mode',
  'status',
  'created_at',
  'closed_at',
  'related_docs',
  'creates_docs',
  'bootstrap_context',
];

const PATCH_MODES = ['docs-bootstrap', 'intention-first', 'doc-anchored'];
const STATUSES = ['active', 'blocked', 'closed', 'abandoned'];
const BOOTSTRAP_CONTEXTS = [
  'pure-greenfield',
  'undocumented-brownfield',
  null,
];

export function validateV2Manifest(
  value,
  { sourcePath = 'patch.yaml', locations = {} } = {},
) {
  const diagnostics = [];
  const context = { sourcePath, locations, version: 2 };

  requireFields(value, REQUIRED_FIELDS, diagnostics, context);
  rejectUnknownFields(value, REQUIRED_FIELDS, diagnostics, context);
  validateString(value, 'change_id', diagnostics, {
    ...context,
    code: 'PATCH_V2_CHANGE_ID_TYPE',
  });
  validateString(
    value,
    'program_id',
    diagnostics,
    { ...context, code: 'PATCH_V2_PROGRAM_ID_TYPE' },
    { nullable: true },
  );
  validateEnum(value, 'patch_mode', PATCH_MODES, diagnostics, {
    ...context,
    code: 'PATCH_V2_PATCH_MODE_INVALID',
  });
  validateEnum(value, 'status', STATUSES, diagnostics, {
    ...context,
    code: 'PATCH_STATUS_INVALID',
  });
  validateDate(value, 'created_at', diagnostics, {
    ...context,
    code: 'PATCH_CREATED_AT_INVALID',
  });
  validateDate(
    value,
    'closed_at',
    diagnostics,
    { ...context, code: 'PATCH_CLOSED_AT_INVALID' },
    { nullable: true },
  );
  validateStringArray(value, 'related_docs', diagnostics, {
    ...context,
    code: 'PATCH_RELATED_DOCS_INVALID',
  });
  validateStringArray(value, 'creates_docs', diagnostics, {
    ...context,
    code: 'PATCH_CREATES_DOCS_INVALID',
  });
  validateEnum(value, 'bootstrap_context', BOOTSTRAP_CONTEXTS, diagnostics, {
    ...context,
    code: 'PATCH_V2_BOOTSTRAP_CONTEXT_INVALID',
  });

  if (value.patch_mode === 'docs-bootstrap') {
    if (!Array.isArray(value.creates_docs) || value.creates_docs.length === 0) {
      addDiagnostic(diagnostics, {
        code: 'PATCH_V2_CREATES_DOCS_REQUIRED',
        message: 'docs-bootstrap patches require non-empty creates_docs.',
        sourcePath,
        locations,
        field: 'creates_docs',
      });
    }
    if (value.bootstrap_context === null || value.bootstrap_context === undefined) {
      addDiagnostic(diagnostics, {
        code: 'PATCH_V2_BOOTSTRAP_CONTEXT_REQUIRED',
        message: 'docs-bootstrap patches require bootstrap_context.',
        sourcePath,
        locations,
        field: 'bootstrap_context',
      });
    }
  }

  if (
    (value.patch_mode === 'intention-first' || value.patch_mode === 'doc-anchored') &&
    value.bootstrap_context !== null
  ) {
    addDiagnostic(diagnostics, {
      code: 'PATCH_V2_BOOTSTRAP_CONTEXT_MUST_BE_NULL',
      message: `${value.patch_mode} patches require bootstrap_context null.`,
      sourcePath,
      locations,
      field: 'bootstrap_context',
    });
  }

  if (
    value.patch_mode === 'doc-anchored' &&
    (!Array.isArray(value.related_docs) || value.related_docs.length === 0)
  ) {
    addDiagnostic(diagnostics, {
      code: 'PATCH_V2_RELATED_DOCS_REQUIRED',
      message: 'doc-anchored patches require non-empty related_docs.',
      sourcePath,
      locations,
      field: 'related_docs',
    });
  }

  if (value.status === 'closed' && value.closed_at === null) {
    addDiagnostic(diagnostics, {
      code: 'PATCH_CLOSED_AT_REQUIRED',
      message: 'Closed patches require closed_at.',
      sourcePath,
      locations,
      field: 'closed_at',
    });
  } else if (
    value.status !== 'closed' &&
    Object.hasOwn(value, 'closed_at') &&
    value.closed_at !== null
  ) {
    addDiagnostic(diagnostics, {
      code: 'PATCH_CLOSED_AT_MUST_BE_NULL',
      message: 'Patches not marked closed must keep closed_at null.',
      sourcePath,
      locations,
      field: 'closed_at',
    });
  }

  if (
    ISO_DATE.test(value.created_at ?? '') &&
    ISO_DATE.test(value.closed_at ?? '') &&
    value.closed_at < value.created_at
  ) {
    addDiagnostic(diagnostics, {
      code: 'PATCH_CLOSED_AT_BEFORE_CREATED_AT',
      message: 'closed_at cannot be earlier than created_at.',
      sourcePath,
      locations,
      field: 'closed_at',
    });
  }

  return diagnostics;
}
