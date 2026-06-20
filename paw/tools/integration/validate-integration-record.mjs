import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

const PROGRAM_ROLES = new Set(['standalone', 'member', 'integration']);
const PROVIDER_STATES = new Set(['absent', 'draft', 'open', 'closed', 'merged']);
const READINESS = new Set(['not_evaluated', 'blocked', 'ready_to_merge']);
const DISPOSITIONS = new Set(['pending', 'integrated', 'closed_unmerged', 'abandoned']);
const CHECK_CLASSIFICATIONS = new Set(['ci-gated', 'informational', 'manual']);
const CHECK_STATUSES = new Set(['pass', 'fail', 'pending', 'skipped', 'unknown']);

const REQUIRED_FIELDS = [
  'schema_version',
  'program_role',
  'governance_source',
  'base_branch',
  'head_branch',
  'primary_integration',
  'promotion_refs',
  'included_patches',
  'provider_snapshot',
  'paw_readiness',
  'delivery_disposition',
  'merged_refs',
];

function diagnostic(code, message, path) {
  return createDiagnostic({ code, message, path });
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function requireString(value, field, diagnostics, sourcePath, { allowEmpty = false } = {}) {
  if (typeof value[field] !== 'string' || (!allowEmpty && value[field] === '')) {
    diagnostics.push(diagnostic('INTEGRATION_FIELD_REQUIRED', `Field must be a ${allowEmpty ? 'string' : 'non-empty string'}: ${field}.`, sourcePath));
  }
}

function requireArray(value, field, diagnostics, sourcePath) {
  if (!Array.isArray(value[field])) {
    diagnostics.push(diagnostic('INTEGRATION_FIELD_REQUIRED', `Field must be an array: ${field}.`, sourcePath));
    return [];
  }
  return value[field];
}

export function validateIntegrationRecord(value, sourcePath = '<memory>') {
  const diagnostics = [];

  if (!isObject(value)) {
    diagnostics.push(diagnostic('INTEGRATION_RECORD_INVALID', 'Integration record must be an object.', sourcePath));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }

  for (const field of REQUIRED_FIELDS) {
    if (value[field] === undefined) {
      diagnostics.push(diagnostic('INTEGRATION_FIELD_REQUIRED', `Required field is missing: ${field}.`, sourcePath));
    }
  }

  if (value.schema_version !== 1) {
    diagnostics.push(diagnostic('INTEGRATION_SCHEMA_VERSION_INVALID', 'Integration record must use schema_version 1.', sourcePath));
  }
  if (!PROGRAM_ROLES.has(value.program_role)) {
    diagnostics.push(diagnostic('INTEGRATION_PROGRAM_ROLE_INVALID', 'program_role must be standalone, member, or integration.', sourcePath));
  }
  if (!READINESS.has(value.paw_readiness)) {
    diagnostics.push(diagnostic('INTEGRATION_READINESS_INVALID', 'paw_readiness is invalid.', sourcePath));
  }
  if (!DISPOSITIONS.has(value.delivery_disposition)) {
    diagnostics.push(diagnostic('INTEGRATION_DELIVERY_DISPOSITION_INVALID', 'delivery_disposition is invalid.', sourcePath));
  }

  requireString(value, 'governance_source', diagnostics, sourcePath);
  requireString(value, 'base_branch', diagnostics, sourcePath, { allowEmpty: true });
  requireString(value, 'head_branch', diagnostics, sourcePath);
  validateStringArray(requireArray(value, 'promotion_refs', diagnostics, sourcePath), 'promotion_refs', diagnostics, sourcePath);
  validateStringArray(requireArray(value, 'included_patches', diagnostics, sourcePath), 'included_patches', diagnostics, sourcePath);
  validateStringArray(requireArray(value, 'merged_refs', diagnostics, sourcePath), 'merged_refs', diagnostics, sourcePath);

  validatePrimaryIntegration(value.primary_integration, diagnostics, sourcePath);
  validateProviderSnapshot(value.provider_snapshot, value, diagnostics, sourcePath);
  validateProgramRole(value, diagnostics, sourcePath);
  validateDisposition(value, diagnostics, sourcePath);

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
  });
}

function validateStringArray(items, field, diagnostics, sourcePath) {
  for (const item of items) {
    if (typeof item !== 'string' || item === '') {
      diagnostics.push(diagnostic('INTEGRATION_ARRAY_ITEM_INVALID', `${field} must contain only non-empty strings.`, sourcePath));
    }
  }
}

function validatePrimaryIntegration(primary, diagnostics, sourcePath) {
  if (!isObject(primary)) {
    diagnostics.push(diagnostic('INTEGRATION_PRIMARY_INVALID', 'primary_integration must be an object.', sourcePath));
    return;
  }
  for (const field of ['provider', 'id', 'url']) {
    if (typeof primary[field] !== 'string') {
      diagnostics.push(diagnostic('INTEGRATION_PRIMARY_FIELD_INVALID', `primary_integration.${field} must be a string.`, sourcePath));
    }
  }
}

function validateProviderSnapshot(snapshot, record, diagnostics, sourcePath) {
  if (!isObject(snapshot)) {
    diagnostics.push(diagnostic('INTEGRATION_PROVIDER_SNAPSHOT_INVALID', 'provider_snapshot must be an object.', sourcePath));
    return;
  }
  if (typeof snapshot.provider !== 'string') {
    diagnostics.push(diagnostic('INTEGRATION_PROVIDER_INVALID', 'provider_snapshot.provider must be a string.', sourcePath));
  }
  if (!PROVIDER_STATES.has(snapshot.state)) {
    diagnostics.push(diagnostic('INTEGRATION_PROVIDER_STATE_INVALID', 'provider_snapshot.state is invalid.', sourcePath));
  }
  if (typeof snapshot.head_sha !== 'string') {
    diagnostics.push(diagnostic('INTEGRATION_PROVIDER_HEAD_INVALID', 'provider_snapshot.head_sha must be a string.', sourcePath));
  }
  if (typeof snapshot.observed_at !== 'string') {
    diagnostics.push(diagnostic('INTEGRATION_PROVIDER_OBSERVED_AT_INVALID', 'provider_snapshot.observed_at must be a string.', sourcePath));
  }
  const checks = requireArray(snapshot, 'checks', diagnostics, sourcePath);
  for (const check of checks) {
    validateCheck(check, snapshot.head_sha, diagnostics, sourcePath);
  }
  if (snapshot.state === 'absent' && (snapshot.provider !== 'absent' || snapshot.head_sha !== '' || checks.length !== 0)) {
    diagnostics.push(diagnostic('INTEGRATION_ABSENT_PROVIDER_DIRTY', 'Absent provider snapshots must not include provider evidence.', sourcePath));
  }
  if (record.paw_readiness === 'ready_to_merge') {
    const gatedChecks = checks.filter((check) => check.classification === 'ci-gated');
    const failing = gatedChecks.filter((check) => check.status !== 'pass' || check.head_sha !== snapshot.head_sha);
    if (snapshot.state === 'absent' || failing.length > 0) {
      diagnostics.push(diagnostic('INTEGRATION_READINESS_EVIDENCE_STALE', 'ready_to_merge requires current passing ci-gated checks for provider evidence.', sourcePath));
    }
  }
}

function validateCheck(check, expectedHead, diagnostics, sourcePath) {
  if (!isObject(check)) {
    diagnostics.push(diagnostic('INTEGRATION_CHECK_INVALID', 'Provider check must be an object.', sourcePath));
    return;
  }
  for (const field of ['name', 'head_sha']) {
    if (typeof check[field] !== 'string' || check[field] === '') {
      diagnostics.push(diagnostic('INTEGRATION_CHECK_FIELD_INVALID', `Check field must be a non-empty string: ${field}.`, sourcePath));
    }
  }
  if (!CHECK_CLASSIFICATIONS.has(check.classification)) {
    diagnostics.push(diagnostic('INTEGRATION_CHECK_CLASSIFICATION_INVALID', 'Check classification is invalid.', sourcePath));
  }
  if (!CHECK_STATUSES.has(check.status)) {
    diagnostics.push(diagnostic('INTEGRATION_CHECK_STATUS_INVALID', 'Check status is invalid.', sourcePath));
  }
  if (check.classification === 'ci-gated' && check.head_sha !== expectedHead) {
    diagnostics.push(diagnostic('INTEGRATION_CHECK_STALE', 'ci-gated check head_sha must match provider snapshot head_sha.', sourcePath));
  }
}

function validateProgramRole(record, diagnostics, sourcePath) {
  if (record.program_role === 'member' && record.included_patches.length !== 1) {
    diagnostics.push(diagnostic('INTEGRATION_MEMBER_PATCH_COUNT_INVALID', 'A member integration record must include exactly one patch.', sourcePath));
  }
  if (record.program_role === 'integration' && record.included_patches.length < 2) {
    diagnostics.push(diagnostic('INTEGRATION_BRANCH_PATCH_COUNT_INVALID', 'An integration branch record must include at least two patches.', sourcePath));
  }
}

function validateDisposition(record, diagnostics, sourcePath) {
  if (record.delivery_disposition === 'integrated' && record.merged_refs.length === 0) {
    diagnostics.push(diagnostic('INTEGRATION_MERGED_REFS_REQUIRED', 'Integrated disposition requires merged_refs.', sourcePath));
  }
  if (record.delivery_disposition === 'abandoned' && record.paw_readiness === 'ready_to_merge') {
    diagnostics.push(diagnostic('INTEGRATION_ABANDONED_READY_INVALID', 'Abandoned delivery cannot be ready_to_merge.', sourcePath));
  }
}

