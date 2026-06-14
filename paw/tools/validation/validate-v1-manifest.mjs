import { createDiagnostic } from './diagnostics.mjs';
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
  'patch_kind',
  'lifecycle',
  'status',
  'created_at',
  'closed_at',
  'related_docs',
];

const PATCH_KINDS = ['spec', 'batch'];
const LIFECYCLES = ['spec-first', 'spec-anchored'];
const STATUSES = ['active', 'blocked', 'closed', 'abandoned'];

function validateBatchDefinition(definition, diagnostics, sourcePath) {
  if (typeof definition !== 'string') {
    diagnostics.push(
      createDiagnostic({
        code: 'PATCH_V1_BATCH_DEFINITION_REQUIRED',
        message: 'Batch patches require definicion.md.',
        path: sourcePath,
      }),
    );
    return;
  }

  for (const section of [
    '## 2. Lista cerrada de items',
    '## 3. Criterio global de cierre',
  ]) {
    if (!definition.includes(section)) {
      diagnostics.push(
        createDiagnostic({
          code: 'PATCH_V1_BATCH_SECTION_REQUIRED',
          message: `Batch definition is missing section "${section}".`,
          path: sourcePath,
        }),
      );
    }
  }

  if (!/- Item .+:\s*[\r\n]+\s+- criterio de cierre:/m.test(definition)) {
    diagnostics.push(
      createDiagnostic({
        code: 'PATCH_V1_BATCH_ITEM_CLOSURE_REQUIRED',
        message: 'Batch definition must include at least one item closure criterion.',
        path: sourcePath,
      }),
    );
  }
}

export function validateV1Manifest(
  value,
  {
    sourcePath = 'patch.yaml',
    locations = {},
    evidence = {},
  } = {},
) {
  const diagnostics = [
    createDiagnostic({
      code: 'PATCH_SCHEMA_V1_TRANSITIONAL',
      severity: 'warning',
      message: 'Schema v1 remains the active transition format and is validated explicitly.',
      path: sourcePath,
      line: locations.schema_version?.line ?? null,
    }),
  ];
  const context = { sourcePath, locations, version: 1 };

  requireFields(value, REQUIRED_FIELDS, diagnostics, context);
  rejectUnknownFields(value, REQUIRED_FIELDS, diagnostics, context);
  validateString(value, 'change_id', diagnostics, {
    ...context,
    code: 'PATCH_V1_CHANGE_ID_TYPE',
  });
  validateString(value, 'program_id', diagnostics, {
    ...context,
    code: 'PATCH_V1_PROGRAM_ID_TYPE',
  });
  validateEnum(value, 'patch_kind', PATCH_KINDS, diagnostics, {
    ...context,
    code: 'PATCH_V1_PATCH_KIND_INVALID',
  });
  validateEnum(value, 'lifecycle', LIFECYCLES, diagnostics, {
    ...context,
    code: 'PATCH_V1_LIFECYCLE_INVALID',
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

  if (value.patch_kind === 'batch' && value.lifecycle === 'spec-anchored') {
    addDiagnostic(diagnostics, {
      code: 'PATCH_V1_BATCH_LIFECYCLE_INVALID',
      message: 'Schema v1 cannot combine batch with spec-anchored.',
      sourcePath,
      locations,
      field: 'lifecycle',
    });
  }

  if (
    value.lifecycle === 'spec-anchored' &&
    Array.isArray(value.related_docs) &&
    value.related_docs.length === 0
  ) {
    addDiagnostic(diagnostics, {
      code: 'PATCH_V1_RELATED_DOCS_REQUIRED',
      message: 'Schema v1 spec-anchored patches require related_docs.',
      sourcePath,
      locations,
      field: 'related_docs',
    });
  }

  if (value.status === 'closed') {
    if (value.closed_at === null) {
      addDiagnostic(diagnostics, {
        code: 'PATCH_CLOSED_AT_REQUIRED',
        message: 'Closed patches require closed_at.',
        sourcePath,
        locations,
        field: 'closed_at',
      });
    }
    if (evidence.hasClosure === false) {
      diagnostics.push(
        createDiagnostic({
          code: 'PATCH_V1_CLOSURE_ARTIFACT_REQUIRED',
          message: 'Closed schema v1 patches require cierre.md.',
          path: evidence.patchDirectory ?? sourcePath,
        }),
      );
    }
  } else if (Object.hasOwn(value, 'closed_at') && value.closed_at !== null) {
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

  if (value.patch_kind === 'batch' && Object.hasOwn(evidence, 'definition')) {
    validateBatchDefinition(
      evidence.definition,
      diagnostics,
      evidence.definitionPath ?? evidence.patchDirectory ?? sourcePath,
    );
  }

  return diagnostics;
}
