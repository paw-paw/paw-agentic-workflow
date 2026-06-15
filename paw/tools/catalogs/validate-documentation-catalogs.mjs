import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

export const UNIVERSAL_CAPABILITY_IDS = [
  'intent-outcomes',
  'scope-assumptions-constraints',
  'stakeholders-users',
  'domain-vocabulary-rules',
  'context-boundaries-dependencies',
  'validation-acceptance-evidence',
  'decisions-ownership-freshness',
  'authority-precedence-conformance',
];

export const TRANSVERSAL_CAPABILITY_IDS = [
  'security',
  'privacy',
  'operations-support',
  'continuity-recovery',
  'accessibility',
  'internationalization',
  'seo-discoverability',
  'integration-examples',
  'distribution-integrity',
  'model-development-evaluation',
  'model-operations',
  'data-evolution-reprocessing',
  'agent-traceability-audit',
  'agent-containment-recovery',
];

export const CAPABILITY_IDS = [
  ...UNIVERSAL_CAPABILITY_IDS,
  ...TRANSVERSAL_CAPABILITY_IDS,
];

export const DECLARED_APPLICABILITY = [
  'required',
  'conditional',
  'optional',
  'not_in_base',
];
export const EFFECTIVE_APPLICABILITY = [
  'required',
  'conditional_inactive',
  'optional',
  'not_applicable',
];

const MERGE_STRATEGIES = [
  'union',
  'maximum',
  'minimum',
  'intersection',
  'manual-conflict',
];
const ROLES = ['strategic', 'contract', 'verifiable', 'operational'];
const EXCEPTION_FIELDS = [
  'exception_id',
  'affected_requirements',
  'reason',
  'approved_by',
  'owner',
  'created_at',
  'expires_at',
  'risk',
  'compensating_controls',
  'reopen_trigger',
];

function error(code, message, path) {
  return createDiagnostic({ code, message, path });
}

function strings(value, minimum = 1) {
  return (
    Array.isArray(value) &&
    value.length >= minimum &&
    value.every((item) => typeof item === 'string' && item.length > 0)
  );
}

function sameMembers(actual, expected) {
  return (
    Array.isArray(actual) &&
    actual.length === expected.length &&
    expected.every((value) => actual.includes(value))
  );
}

export function validateCapabilityCatalog(
  catalog,
  { sourcePath = 'capabilities/catalog.json' } = {},
) {
  const diagnostics = [];
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) {
    return createValidationResult({
      diagnostics: [
        error('CAPABILITY_CATALOG_TYPE', 'Capability catalog must be an object.', sourcePath),
      ],
    });
  }
  if (catalog.schema_version !== 1) {
    diagnostics.push(error('CAPABILITY_SCHEMA_VERSION', 'schema_version must be 1.', sourcePath));
  }
  if (catalog.catalog_id !== 'documentation-capabilities') {
    diagnostics.push(error('CAPABILITY_CATALOG_ID', 'catalog_id must be documentation-capabilities.', sourcePath));
  }
  if (!Array.isArray(catalog.capabilities)) {
    diagnostics.push(error('CAPABILITY_LIST_TYPE', 'capabilities must be an array.', sourcePath));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }
  if (catalog.capabilities.length !== CAPABILITY_IDS.length) {
    diagnostics.push(error('CAPABILITY_COUNT', `capabilities must contain exactly ${CAPABILITY_IDS.length} entries.`, sourcePath));
  }

  const ids = [];
  for (const [index, capability] of catalog.capabilities.entries()) {
    const path = `${sourcePath}#capabilities/${index}`;
    if (!CAPABILITY_IDS.includes(capability.capability_id)) {
      diagnostics.push(error('CAPABILITY_ID_UNKNOWN', `Unknown capability_id: ${capability.capability_id}.`, path));
    }
    if (ids.includes(capability.capability_id)) {
      diagnostics.push(error('CAPABILITY_ID_DUPLICATE', `Duplicate capability_id: ${capability.capability_id}.`, path));
    }
    ids.push(capability.capability_id);
    const expectedCategory = UNIVERSAL_CAPABILITY_IDS.includes(capability.capability_id)
      ? 'universal'
      : 'transversal';
    if (capability.category !== expectedCategory) {
      diagnostics.push(error('CAPABILITY_CATEGORY_INVALID', `${capability.capability_id} must be ${expectedCategory}.`, path));
    }
    if (!MERGE_STRATEGIES.includes(capability.merge_strategy)) {
      diagnostics.push(error('CAPABILITY_MERGE_STRATEGY_INVALID', 'merge_strategy is missing or unsupported.', path));
    }
    if (!strings(capability.allowed_roles) || capability.allowed_roles.some((role) => !ROLES.includes(role))) {
      diagnostics.push(error('CAPABILITY_ROLES_INVALID', 'allowed_roles must use documented role identifiers.', path));
    }
    if (!strings(capability.expected_evidence)) {
      diagnostics.push(error('CAPABILITY_EVIDENCE_REQUIRED', 'expected_evidence must not be empty.', path));
    }
    if (!strings(capability.reopen_triggers)) {
      diagnostics.push(error('CAPABILITY_REOPEN_TRIGGER_REQUIRED', 'reopen_triggers must not be empty.', path));
    }
  }
  for (const id of CAPABILITY_IDS) {
    if (!ids.includes(id)) {
      diagnostics.push(error('CAPABILITY_ID_REQUIRED', `Required capability is missing: ${id}.`, sourcePath));
    }
  }
  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: { capability_count: catalog.capabilities.length },
  });
}

export function validateDocumentationPresetCatalog(
  catalog,
  { familyIds, capabilityIds, sourcePath = 'documentation-presets/catalog.json' },
) {
  const diagnostics = [];
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) {
    return createValidationResult({
      diagnostics: [error('DOC_PRESET_CATALOG_TYPE', 'Documentation preset catalog must be an object.', sourcePath)],
    });
  }
  if (catalog.schema_version !== 1) {
    diagnostics.push(error('DOC_PRESET_SCHEMA_VERSION', 'schema_version must be 1.', sourcePath));
  }
  if (catalog.catalog_id !== 'documentation-presets') {
    diagnostics.push(error('DOC_PRESET_CATALOG_ID', 'catalog_id must be documentation-presets.', sourcePath));
  }
  if (!sameMembers(catalog.declared_applicability, DECLARED_APPLICABILITY)) {
    diagnostics.push(error('DOC_PRESET_DECLARED_STATES_INVALID', 'Declared applicability states are incomplete.', sourcePath));
  }
  if (!sameMembers(catalog.effective_applicability, EFFECTIVE_APPLICABILITY)) {
    diagnostics.push(error('DOC_PRESET_EFFECTIVE_STATES_INVALID', 'Effective applicability states are incomplete.', sourcePath));
  }
  if (!sameMembers(catalog.universal_requirements, UNIVERSAL_CAPABILITY_IDS)) {
    diagnostics.push(error('DOC_PRESET_UNIVERSAL_REQUIREMENTS_INVALID', 'Universal requirements must reference the approved eight capabilities.', sourcePath));
  }
  if (!sameMembers(catalog.exception_contract?.required_fields, EXCEPTION_FIELDS)) {
    diagnostics.push(error('DOC_PRESET_EXCEPTION_CONTRACT_INVALID', 'Exception contract is incomplete.', sourcePath));
  }
  if (!Array.isArray(catalog.presets) || catalog.presets.length !== familyIds.length) {
    diagnostics.push(error('DOC_PRESET_COUNT', 'There must be exactly one documentation preset per family.', sourcePath));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }

  const presetIds = [];
  const coveredFamilies = [];
  for (const [index, preset] of catalog.presets.entries()) {
    const path = `${sourcePath}#presets/${index}`;
    const expectedId = `docs-${preset.family_id}`;
    if (preset.preset_id !== expectedId) {
      diagnostics.push(error('DOC_PRESET_ID_INVALID', `preset_id must be ${expectedId}.`, path));
    }
    if (presetIds.includes(preset.preset_id)) {
      diagnostics.push(error('DOC_PRESET_ID_DUPLICATE', `Duplicate preset_id: ${preset.preset_id}.`, path));
    }
    presetIds.push(preset.preset_id);
    if (!familyIds.includes(preset.family_id)) {
      diagnostics.push(error('DOC_PRESET_FAMILY_UNKNOWN', `Unknown family_id: ${preset.family_id}.`, path));
    }
    if (coveredFamilies.includes(preset.family_id)) {
      diagnostics.push(error('DOC_PRESET_FAMILY_DUPLICATE', `Duplicate family preset: ${preset.family_id}.`, path));
    }
    coveredFamilies.push(preset.family_id);
    if (!Array.isArray(preset.requirements)) {
      diagnostics.push(error('DOC_PRESET_REQUIREMENTS_TYPE', 'requirements must be an array.', path));
      continue;
    }
    const requirementIds = [];
    for (const requirement of preset.requirements) {
      if (!capabilityIds.includes(requirement.capability_id)) {
        diagnostics.push(error('DOC_PRESET_CAPABILITY_UNKNOWN', `Unknown capability_id: ${requirement.capability_id}.`, path));
      }
      if (requirementIds.includes(requirement.capability_id)) {
        diagnostics.push(error('DOC_PRESET_CAPABILITY_DUPLICATE', `Duplicate capability contribution: ${requirement.capability_id}.`, path));
      }
      requirementIds.push(requirement.capability_id);
      if (!DECLARED_APPLICABILITY.includes(requirement.applicability)) {
        diagnostics.push(error('DOC_PRESET_APPLICABILITY_INVALID', `Invalid applicability: ${requirement.applicability}.`, path));
      }
      if (requirement.applicability === 'conditional' && typeof requirement.trigger_ref !== 'string') {
        diagnostics.push(error('DOC_PRESET_TRIGGER_REQUIRED', 'Conditional requirements require trigger_ref.', path));
      }
      if (requirement.applicability !== 'conditional' && requirement.trigger_ref !== null) {
        diagnostics.push(error('DOC_PRESET_TRIGGER_UNEXPECTED', 'Only conditional requirements may declare trigger_ref.', path));
      }
    }
    validateRequiredBaseline(preset, diagnostics, path);
  }
  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: { documentation_preset_count: catalog.presets.length },
  });
}

function validateRequiredBaseline(preset, diagnostics, path) {
  const requirements = Object.fromEntries(
    preset.requirements.map((item) => [item.capability_id, item.applicability]),
  );
  const securityRequired = new Set([
    'transactional-application',
    'service-api',
    'client-application',
    'agentic-system',
  ]);
  const accessibilityRequired = new Set([
    'content-knowledge',
    'transactional-application',
    'client-application',
  ]);
  const expectedSecurity = securityRequired.has(preset.family_id) ? 'required' : 'conditional';
  if (requirements.security !== expectedSecurity) {
    diagnostics.push(error('DOC_PRESET_SECURITY_BASELINE', `security must be ${expectedSecurity} for ${preset.family_id}.`, path));
  }
  if (
    accessibilityRequired.has(preset.family_id) &&
    requirements.accessibility !== 'required'
  ) {
    diagnostics.push(error('DOC_PRESET_ACCESSIBILITY_BASELINE', `accessibility must be required for ${preset.family_id}.`, path));
  }
}

export function resolveEffectiveApplicability({
  declared,
  triggerActive = false,
  notApplicable = false,
}) {
  if (!DECLARED_APPLICABILITY.includes(declared)) {
    return { ok: false, code: 'EFFECTIVE_DECLARED_STATE_INVALID' };
  }
  if (notApplicable && (declared === 'required' || (declared === 'conditional' && triggerActive))) {
    return { ok: false, code: 'EFFECTIVE_NOT_APPLICABLE_FORBIDDEN' };
  }
  if (notApplicable) return { ok: true, state: 'not_applicable' };
  if (declared === 'required') return { ok: true, state: 'required' };
  if (declared === 'conditional') {
    return { ok: true, state: triggerActive ? 'required' : 'conditional_inactive' };
  }
  if (declared === 'optional') return { ok: true, state: 'optional' };
  return { ok: true, state: 'not_applicable' };
}

export function validateExceptionRecord(record, requiredFields = EXCEPTION_FIELDS) {
  const missing = requiredFields.filter((field) => {
    const value = record?.[field];
    return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
  });
  return createValidationResult({
    schemaVersion: 1,
    diagnostics: missing.map((field) =>
      error('DOCUMENTATION_EXCEPTION_FIELD_REQUIRED', `Exception field is required: ${field}.`, 'exception.json'),
    ),
    validatedPaths: ['exception.json'],
  });
}
