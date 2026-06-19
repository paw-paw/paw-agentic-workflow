import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

const REQUIRED = [
  'record_id',
  'preset_ref',
  'applicability',
  'binding_mode',
  'approval_policy',
  'resolution_status',
  'responsible_owner',
  'evidence',
  'review_date',
];

const APPLICABILITY = new Set(['applicable', 'not_applicable', 'deferred']);
const BINDING_MODES = new Set(['exact', 'variant', 'exception', 'rejected', 'new_preset_needed']);
const RESOLUTION_STATUSES = new Set(['resolved', 'ready_with_exceptions', 'rejected', 'unresolved']);

function diagnostic(code, message, sourcePath, field) {
  return createDiagnostic({
    code,
    message: field ? `${message}: ${field}` : message,
    path: sourcePath,
  });
}

function variantIdsForPreset(catalogContext, presetRef) {
  const preset = catalogContext?.implementationPresets?.find(({ preset_id: id }) => id === presetRef);
  return new Set((preset?.variants ?? []).map(({ variant_id: id }) => id));
}

export function createImplementationPresetContext(catalog) {
  return {
    implementationPresetIds: new Set((catalog?.presets ?? []).map(({ preset_id: id }) => id)),
    implementationPresets: catalog?.presets ?? [],
  };
}

export function validateAdoptionRecord(value, {
  sourcePath = 'adoption-record',
  catalogContext = {},
} = {}) {
  const diagnostics = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_NOT_OBJECT', 'Adoption record must be an object', sourcePath));
    return createValidationResult({ diagnostics, validatedPaths: [sourcePath] });
  }

  for (const field of REQUIRED) {
    if (!(field in value)) {
      diagnostics.push(diagnostic('ADOPTION_RECORD_REQUIRED_FIELD_MISSING', 'Required adoption record field is missing', sourcePath, field));
    }
  }

  if (value.applicability && !APPLICABILITY.has(value.applicability)) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_APPLICABILITY_INVALID', 'Applicability is invalid', sourcePath, 'applicability'));
  }
  if (value.binding_mode && !BINDING_MODES.has(value.binding_mode)) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_BINDING_MODE_INVALID', 'Binding mode is invalid', sourcePath, 'binding_mode'));
  }
  if (value.resolution_status && !RESOLUTION_STATUSES.has(value.resolution_status)) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_RESOLUTION_STATUS_INVALID', 'Resolution status is invalid', sourcePath, 'resolution_status'));
  }
  if (value.preset_ref && catalogContext.implementationPresetIds && !catalogContext.implementationPresetIds.has(value.preset_ref)) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_UNKNOWN_PRESET', 'Preset reference is not in implementation preset catalog', sourcePath, 'preset_ref'));
  }
  if (!Array.isArray(value.evidence) || value.evidence.length === 0) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_EVIDENCE_REQUIRED', 'Evidence must be a non-empty array', sourcePath, 'evidence'));
  }

  if (value.binding_mode === 'exact' && value.variant_ref) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_EXACT_HAS_VARIANT', 'Exact adoption cannot declare variant_ref', sourcePath, 'variant_ref'));
  }

  if (value.binding_mode === 'variant') {
    if (!value.variant_ref) {
      diagnostics.push(diagnostic('ADOPTION_RECORD_VARIANT_REQUIRED', 'Variant adoption requires variant_ref', sourcePath, 'variant_ref'));
    } else if (!variantIdsForPreset(catalogContext, value.preset_ref).has(value.variant_ref)) {
      diagnostics.push(diagnostic('ADOPTION_RECORD_UNKNOWN_VARIANT', 'Variant is not declared by the referenced preset', sourcePath, 'variant_ref'));
    }
  }

  if (value.binding_mode === 'exception') {
    if (!Array.isArray(value.exceptions) || value.exceptions.length === 0) {
      diagnostics.push(diagnostic('ADOPTION_RECORD_EXCEPTION_REQUIRED', 'Exception adoption requires exceptions', sourcePath, 'exceptions'));
    }
    if (value.resolution_status !== 'ready_with_exceptions') {
      diagnostics.push(diagnostic('ADOPTION_RECORD_EXCEPTION_STATUS', 'Exception adoption requires ready_with_exceptions status', sourcePath, 'resolution_status'));
    }
  }

  if (value.binding_mode === 'rejected' && !value.rejection_reason) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_REJECTION_REASON_REQUIRED', 'Rejected adoption requires rejection_reason', sourcePath, 'rejection_reason'));
  }

  if (value.binding_mode === 'new_preset_needed' && !value.new_preset_rationale) {
    diagnostics.push(diagnostic('ADOPTION_RECORD_NEW_PRESET_RATIONALE_REQUIRED', 'New preset need requires rationale', sourcePath, 'new_preset_rationale'));
  }

  for (const [index, override] of (value.overrides ?? []).entries()) {
    for (const field of ['substituted_value', 'reason', 'scope', 'approved_by', 'conformance_impact']) {
      if (!(field in override)) {
        diagnostics.push(diagnostic('ADOPTION_OVERRIDE_REQUIRED_FIELD_MISSING', 'Override required field is missing', sourcePath, `overrides[${index}].${field}`));
      }
    }
    if (!override.expires_at && !override.review_condition) {
      diagnostics.push(diagnostic('ADOPTION_OVERRIDE_REVIEW_REQUIRED', 'Override requires expires_at or review_condition', sourcePath, `overrides[${index}]`));
    }
  }

  return createValidationResult({
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: { record_id: value.record_id ?? null },
  });
}
