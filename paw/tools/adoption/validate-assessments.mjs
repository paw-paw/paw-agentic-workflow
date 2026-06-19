import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';
import { validateAdoptionRecord } from './validate-records.mjs';

const REQUIRED = [
  'assessment_id',
  'flow',
  'family_ref',
  'documentation_preset_ref',
  'modifier_refs',
  'implementation_preset_ref',
  'adoption_record',
  'stack_realization',
  'comparison',
  'evidence',
];

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

export function createAdoptionCatalogContext(catalogs) {
  return {
    familyIds: new Set((catalogs.families?.families ?? []).map(({ family_id: id }) => id)),
    documentationPresetIds: new Set((catalogs.documentationPresets?.presets ?? []).map(({ preset_id: id }) => id)),
    modifierIds: new Set((catalogs.modifiers?.modifiers ?? []).map(({ modifier_id: id }) => id)),
    implementationPresetIds: new Set((catalogs.implementationPresets?.presets ?? []).map(({ preset_id: id }) => id)),
    implementationPresets: catalogs.implementationPresets?.presets ?? [],
  };
}

export function validateAssessment(value, {
  sourcePath = 'assessment',
  catalogContext = {},
} = {}) {
  const diagnostics = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_NOT_OBJECT', 'Assessment must be an object', sourcePath));
    return createValidationResult({ diagnostics, validatedPaths: [sourcePath] });
  }

  for (const field of REQUIRED) {
    if (!(field in value)) {
      diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_REQUIRED_FIELD_MISSING', 'Required assessment field is missing', sourcePath, field));
    }
  }

  if (value.flow && !['greenfield', 'brownfield'].includes(value.flow)) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_FLOW_INVALID', 'Assessment flow must be greenfield or brownfield', sourcePath, 'flow'));
  }
  if (value.family_ref && !catalogContext.familyIds?.has(value.family_ref)) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_UNKNOWN_FAMILY', 'Family reference is not in family catalog', sourcePath, 'family_ref'));
  }
  if (value.documentation_preset_ref && !catalogContext.documentationPresetIds?.has(value.documentation_preset_ref)) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_UNKNOWN_DOCUMENTATION_PRESET', 'Documentation preset reference is not in catalog', sourcePath, 'documentation_preset_ref'));
  }
  for (const [index, modifierRef] of (value.modifier_refs ?? []).entries()) {
    if (!catalogContext.modifierIds?.has(modifierRef)) {
      diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_UNKNOWN_MODIFIER', 'Modifier reference is not in catalog', sourcePath, `modifier_refs[${index}]`));
    }
  }
  if (value.implementation_preset_ref && !catalogContext.implementationPresetIds?.has(value.implementation_preset_ref)) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_UNKNOWN_IMPLEMENTATION_PRESET', 'Implementation preset reference is not in catalog', sourcePath, 'implementation_preset_ref'));
  }
  if (value.variant_ref && !variantIdsForPreset(catalogContext, value.implementation_preset_ref).has(value.variant_ref)) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_UNKNOWN_VARIANT', 'Variant reference is not declared by implementation preset', sourcePath, 'variant_ref'));
  }
  if (!Array.isArray(value.evidence) || value.evidence.length === 0) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_EVIDENCE_REQUIRED', 'Assessment evidence must be a non-empty array', sourcePath, 'evidence'));
  }

  if (value.flow === 'greenfield' && value.stack_realization?.observed_before_adoption === true) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_GREENFIELD_ORDER', 'Greenfield assessment must record adoption before observed stack reality', sourcePath, 'stack_realization.observed_before_adoption'));
  }
  if (value.flow === 'brownfield' && value.stack_realization?.observed_before_adoption !== true) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_BROWNFIELD_OBSERVATION_REQUIRED', 'Brownfield assessment must start from observed repo and stack reality', sourcePath, 'stack_realization.observed_before_adoption'));
  }
  if (value.auto_selected_stack === true || value.comparison?.auto_selected_stack === true) {
    diagnostics.push(diagnostic('ADOPTION_ASSESSMENT_AUTO_SELECTION_FORBIDDEN', 'Assessment cannot automatically select a stack', sourcePath, 'auto_selected_stack'));
  }

  if (value.adoption_record) {
    const recordResult = validateAdoptionRecord(value.adoption_record, { sourcePath, catalogContext });
    diagnostics.push(...recordResult.diagnostics);
  }

  return createValidationResult({
    diagnostics,
    validatedPaths: [sourcePath],
    evidence: { assessment_id: value.assessment_id ?? null },
  });
}
