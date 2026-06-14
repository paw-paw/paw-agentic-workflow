import { createDiagnostic } from './diagnostics.mjs';

export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function addDiagnostic(
  diagnostics,
  { code, message, sourcePath, locations, field, severity = 'error' },
) {
  diagnostics.push(
    createDiagnostic({
      code,
      message,
      path: sourcePath,
      line: field ? (locations[field]?.line ?? null) : null,
      severity,
    }),
  );
}

export function requireFields(
  value,
  fields,
  diagnostics,
  { sourcePath, locations, version },
) {
  for (const field of fields) {
    if (!Object.hasOwn(value, field)) {
      addDiagnostic(diagnostics, {
        code: `PATCH_V${version}_FIELD_REQUIRED`,
        message: `Schema v${version} manifest requires field "${field}".`,
        sourcePath,
        locations,
        field,
      });
    }
  }
}

export function rejectUnknownFields(
  value,
  allowedFields,
  diagnostics,
  { sourcePath, locations, version },
) {
  const allowed = new Set(allowedFields);
  for (const field of Object.keys(value)) {
    if (!allowed.has(field)) {
      addDiagnostic(diagnostics, {
        code: `PATCH_V${version}_FIELD_UNKNOWN`,
        message: `Schema v${version} manifest does not allow field "${field}".`,
        sourcePath,
        locations,
        field,
      });
    }
  }
}

export function validateEnum(
  value,
  field,
  allowedValues,
  diagnostics,
  context,
) {
  if (!Object.hasOwn(value, field)) return;
  if (!allowedValues.includes(value[field])) {
    addDiagnostic(diagnostics, {
      code: context.code,
      message: `${field} must be one of: ${allowedValues.join(', ')}.`,
      ...context,
      field,
    });
  }
}

export function validateString(
  value,
  field,
  diagnostics,
  context,
  { nullable = false } = {},
) {
  if (!Object.hasOwn(value, field)) return;
  const fieldValue = value[field];
  if (nullable && fieldValue === null) return;
  if (typeof fieldValue !== 'string' || fieldValue.length === 0) {
    addDiagnostic(diagnostics, {
      code: context.code,
      message: `${field} must be ${nullable ? 'a non-empty string or null' : 'a non-empty string'}.`,
      ...context,
      field,
    });
  }
}

export function validateDate(
  value,
  field,
  diagnostics,
  context,
  { nullable = false } = {},
) {
  if (!Object.hasOwn(value, field)) return;
  const fieldValue = value[field];
  if (nullable && fieldValue === null) return;
  if (typeof fieldValue !== 'string' || !ISO_DATE.test(fieldValue)) {
    addDiagnostic(diagnostics, {
      code: context.code,
      message: `${field} must be YYYY-MM-DD${nullable ? ' or null' : ''}.`,
      ...context,
      field,
    });
  }
}

export function validateStringArray(
  value,
  field,
  diagnostics,
  context,
) {
  if (!Object.hasOwn(value, field)) return;
  const fieldValue = value[field];
  if (!Array.isArray(fieldValue)) {
    addDiagnostic(diagnostics, {
      code: context.code,
      message: `${field} must be an array of non-empty strings.`,
      ...context,
      field,
    });
    return;
  }

  for (const [index, item] of fieldValue.entries()) {
    if (typeof item !== 'string' || item.length === 0) {
      diagnostics.push(
        createDiagnostic({
          code: context.code,
          message: `${field}[${index}] must be a non-empty string.`,
          path: context.sourcePath,
          line: context.locations[field]?.items?.[index]?.line ?? context.locations[field]?.line ?? null,
        }),
      );
    }
  }
}
