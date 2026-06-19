import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

export const COMPONENT_IDS = [
  'content-delivery-surface', 'interactive-web-surface', 'native-client-surface',
  'synchronous-service', 'asynchronous-processor', 'persistent-store',
  'reusable-package', 'cli-surface', 'data-pipeline', 'model-lifecycle',
  'agentic-orchestrator',
];
export const CONCERN_IDS = [
  'public-exposure', 'personal-data', 'regulated-data', 'multi-tenancy',
  'offline-operation', 'high-availability', 'public-compatibility-commitment',
  'third-party-extensibility', 'privileged-execution', 'human-impacting-automation',
];
export const MODIFIER_IDS = [...COMPONENT_IDS, ...CONCERN_IDS];
export const SCOPE_KINDS = ['system', 'component', 'interface', 'data', 'operational'];
export const MERGE_STRATEGIES = ['union', 'maximum', 'minimum', 'intersection', 'manual-conflict'];

const FORBIDDEN_FIELDS = ['authority', 'authority_level', 'accountable_owner', 'stack', 'technology', 'runtime_agentic'];

function error(code, message, path) {
  return createDiagnostic({ code, message, path });
}

function nonEmptyStrings(value) {
  return Array.isArray(value) && value.length > 0 &&
    value.every((item) => typeof item === 'string' && item.length > 0);
}

export function validateModifierCatalog(
  catalog,
  { familyIds, capabilityIds, sourcePath = 'modifiers/catalog.json' },
) {
  const diagnostics = [];
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) {
    return createValidationResult({
      diagnostics: [error('MODIFIER_CATALOG_TYPE', 'Modifier catalog must be an object.', sourcePath)],
    });
  }
  if (catalog.schema_version !== 1) diagnostics.push(error('MODIFIER_SCHEMA_VERSION', 'schema_version must be 1.', sourcePath));
  if (catalog.catalog_id !== 'documentation-modifiers') diagnostics.push(error('MODIFIER_CATALOG_ID', 'catalog_id must be documentation-modifiers.', sourcePath));
  if (JSON.stringify(catalog.scope_kinds) !== JSON.stringify(SCOPE_KINDS)) diagnostics.push(error('MODIFIER_SCOPE_KINDS_INVALID', 'scope_kinds must declare the approved five kinds.', sourcePath));
  if (JSON.stringify(catalog.merge_strategies) !== JSON.stringify(MERGE_STRATEGIES)) diagnostics.push(error('MODIFIER_MERGE_STRATEGIES_INVALID', 'merge_strategies must declare the approved five strategies.', sourcePath));
  if (!Array.isArray(catalog.modifiers) || catalog.modifiers.length !== MODIFIER_IDS.length) {
    diagnostics.push(error('MODIFIER_COUNT', 'Modifier catalog must contain 11 components and 10 concerns.', sourcePath));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }

  const ids = [];
  for (const [index, modifier] of catalog.modifiers.entries()) {
    const path = `${sourcePath}#modifiers/${index}`;
    const expectedKind = COMPONENT_IDS.includes(modifier.modifier_id) ? 'component' :
      CONCERN_IDS.includes(modifier.modifier_id) ? 'concern' : null;
    if (!expectedKind) diagnostics.push(error('MODIFIER_ID_UNKNOWN', `Unknown modifier_id: ${modifier.modifier_id}.`, path));
    if (ids.includes(modifier.modifier_id)) diagnostics.push(error('MODIFIER_ID_DUPLICATE', `Duplicate modifier_id: ${modifier.modifier_id}.`, path));
    ids.push(modifier.modifier_id);
    if (modifier.modifier_kind !== expectedKind) diagnostics.push(error('MODIFIER_KIND_INVALID', `${modifier.modifier_id} must use kind ${expectedKind}.`, path));
    for (const field of FORBIDDEN_FIELDS) {
      if (Object.hasOwn(modifier, field)) diagnostics.push(error('MODIFIER_FORBIDDEN_FIELD', `Modifier cannot define ${field}.`, path));
    }
    for (const field of ['name', 'purpose', 'selection_rule']) {
      if (typeof modifier[field] !== 'string' || modifier[field].length === 0) diagnostics.push(error('MODIFIER_TEXT_REQUIRED', `${field} is required.`, path));
    }
    if (!nonEmptyStrings(modifier.non_activation_signals)) diagnostics.push(error('MODIFIER_NON_ACTIVATION_REQUIRED', 'non_activation_signals must not be empty.', path));
    if (!nonEmptyStrings(modifier.compatible_families) || modifier.compatible_families.some((id) => !familyIds.includes(id))) diagnostics.push(error('MODIFIER_FAMILY_REF_INVALID', 'compatible_families contains an unknown family.', path));
    if (!nonEmptyStrings(modifier.scope_kinds) || modifier.scope_kinds.some((kind) => !SCOPE_KINDS.includes(kind))) diagnostics.push(error('MODIFIER_SCOPE_KIND_INVALID', 'scope_kinds contains an unsupported kind.', path));
    if (!nonEmptyStrings(modifier.capability_demands) || modifier.capability_demands.some((id) => !capabilityIds.includes(id))) diagnostics.push(error('MODIFIER_CAPABILITY_REF_INVALID', 'capability_demands contains an unknown capability.', path));
    for (const field of ['dependencies', 'conflicts_with']) {
      if (!Array.isArray(modifier[field])) diagnostics.push(error('MODIFIER_RELATION_TYPE', `${field} must be an array.`, path));
      else {
        for (const ref of modifier[field]) {
          if (!MODIFIER_IDS.includes(ref)) diagnostics.push(error('MODIFIER_RELATION_UNKNOWN', `Unknown ${field} reference: ${ref}.`, path));
          if (ref === modifier.modifier_id) diagnostics.push(error('MODIFIER_SELF_REFERENCE', `${field} cannot reference itself.`, path));
        }
      }
    }
    if (expectedKind === 'concern' && typeof modifier.requires_named_basis !== 'boolean') diagnostics.push(error('CONCERN_NAMED_BASIS_TYPE', 'Concerns must declare requires_named_basis.', path));
    if (modifier.modifier_id === 'regulated-data' && modifier.requires_named_basis !== true) diagnostics.push(error('REGULATED_DATA_BASIS_POLICY', 'regulated-data must require a named basis.', path));
  }
  for (const id of MODIFIER_IDS) {
    if (!ids.includes(id)) diagnostics.push(error('MODIFIER_ID_REQUIRED', `Required modifier is missing: ${id}.`, sourcePath));
  }
  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: {
      component_count: catalog.modifiers.filter(({ modifier_kind: kind }) => kind === 'component').length,
      concern_count: catalog.modifiers.filter(({ modifier_kind: kind }) => kind === 'concern').length,
    },
  });
}

export function validateModifierInstance(instance, modifier, { sourcePath = 'instance.json' } = {}) {
  const diagnostics = [];
  if (!instance || typeof instance !== 'object') {
    return createValidationResult({ diagnostics: [error('MODIFIER_INSTANCE_TYPE', 'Modifier instance must be an object.', sourcePath)] });
  }
  for (const field of FORBIDDEN_FIELDS) {
    if (Object.hasOwn(instance, field)) diagnostics.push(error('MODIFIER_INSTANCE_FORBIDDEN_FIELD', `Modifier instance cannot set ${field}.`, sourcePath));
  }
  if (instance.modifier_ref !== modifier?.modifier_id) diagnostics.push(error('MODIFIER_INSTANCE_REF_INVALID', 'modifier_ref does not resolve.', sourcePath));
  if (!modifier?.compatible_families.includes(instance.family_id)) diagnostics.push(error('MODIFIER_FAMILY_INCOMPATIBLE', `Modifier is incompatible with family ${instance.family_id}.`, sourcePath));
  if (!/^([a-z]+):([a-z0-9]+(?:-[a-z0-9]+)*)$/.test(instance.scope_ref ?? '')) diagnostics.push(error('MODIFIER_SCOPE_REF_INVALID', 'scope_ref must use kind:stable-id.', sourcePath));
  else {
    const kind = instance.scope_ref.split(':')[0];
    if (!SCOPE_KINDS.includes(kind) || !modifier.scope_kinds.includes(kind)) diagnostics.push(error('MODIFIER_SCOPE_INCOMPATIBLE', `Scope kind ${kind} is incompatible with modifier.`, sourcePath));
  }
  if (modifier?.requires_named_basis && !(typeof instance.activation_inputs?.regulatory_basis === 'string' && instance.activation_inputs.regulatory_basis.length > 0)) diagnostics.push(error('REGULATED_DATA_BASIS_REQUIRED', 'regulated-data requires activation_inputs.regulatory_basis.', sourcePath));
  return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
}

export function slotKey(capabilityId, scopeRef) {
  return `${capabilityId}::${scopeRef}`;
}

export function mergeContributions(strategy, values) {
  if (!MERGE_STRATEGIES.includes(strategy)) return { ok: false, conflict: 'unknown-strategy' };
  if (strategy === 'manual-conflict') {
    const unique = [...new Set(values.map((value) => JSON.stringify(value)))];
    return unique.length <= 1 ? { ok: true, value: values[0] } : { ok: false, conflict: 'manual-resolution-required' };
  }
  if (strategy === 'union') return { ok: true, value: [...new Set(values.flat())] };
  if (strategy === 'maximum') return { ok: true, value: Math.max(...values) };
  if (strategy === 'minimum') return { ok: true, value: Math.min(...values) };
  const sets = values.map((value) => new Set(value));
  return { ok: true, value: [...sets[0]].filter((item) => sets.every((set) => set.has(item))) };
}
