import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

const REQUIRED = {
  repo: [
    'adapter_type',
    'adapter_id',
    'authority_index',
    'repo_paths',
    'commands',
    'documentation_map',
    'surfaces',
    'vcs_policy',
    'repo_rules',
    'root_detection',
  ],
  stack: [
    'adapter_type',
    'adapter_id',
    'observed_stack',
    'versions',
    'commands',
    'deployment',
    'operability',
    'checks',
    'implementation_preset_ref',
    'differences',
    'brownfield_constraints',
  ],
  runtime: [
    'adapter_type',
    'adapter_id',
    'runtime',
    'paths',
    'packaging',
    'triggers',
    'assets',
    'references',
    'scripts',
    'permissions',
    'approvals',
    'optional_capabilities',
    'operation_mappings',
    'capability_matrix',
    'source_freshness',
    'gap_disposition',
    'activation',
  ],
};

const FORBIDDEN = {
  repo: ['universal_rules', 'catalog_definitions', 'portable_core'],
  stack: ['preset_definition', 'variants', 'family_selection', 'runtime_selection'],
  runtime: ['family_selection', 'documentation_preset', 'implementation_preset', 'stack_selection', 'architecture_decisions'],
};

function diagnostic(code, message, sourcePath, field) {
  return createDiagnostic({
    code,
    message: field ? `${message}: ${field}` : message,
    path: sourcePath,
  });
}

function validateObject(value, adapterType, sourcePath) {
  const diagnostics = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    diagnostics.push(diagnostic('ADAPTER_NOT_OBJECT', 'Adapter case must be an object', sourcePath));
    return diagnostics;
  }

  if (value.adapter_type !== adapterType) {
    diagnostics.push(diagnostic('ADAPTER_TYPE_MISMATCH', `Expected adapter_type ${adapterType}`, sourcePath, 'adapter_type'));
  }

  for (const field of REQUIRED[adapterType]) {
    if (!(field in value)) {
      diagnostics.push(diagnostic('ADAPTER_REQUIRED_FIELD_MISSING', 'Required adapter field is missing', sourcePath, field));
    }
  }

  for (const field of FORBIDDEN[adapterType]) {
    if (field in value) {
      diagnostics.push(diagnostic('ADAPTER_FORBIDDEN_FIELD', 'Adapter field belongs to another responsibility', sourcePath, field));
    }
  }

  if (adapterType === 'runtime' && value.runtime && typeof value.runtime !== 'string') {
    diagnostics.push(diagnostic('RUNTIME_ADAPTER_RUNTIME_INVALID', 'Runtime name must be a string', sourcePath, 'runtime'));
  }

  if (adapterType === 'runtime') {
    const activation = value.activation;
    if (activation && typeof activation === 'object') {
      if (activation.state === 'default-active' || activation.default_workflow === true) {
        diagnostics.push(diagnostic(
          'RUNTIME_ADAPTER_DEFAULT_ACTIVATION',
          'Runtime adapter cannot activate PAW as the default workflow before cutover',
          sourcePath,
          'activation',
        ));
      }
    }

    if (Array.isArray(value.operation_mappings)) {
      for (const [index, mapping] of value.operation_mappings.entries()) {
        if (mapping?.support === 'simulated') {
          diagnostics.push(diagnostic(
            'RUNTIME_ADAPTER_SIMULATED_SUPPORT',
            'Runtime adapter cannot mark simulated support as equivalent capability evidence',
            sourcePath,
            `operation_mappings[${index}].support`,
          ));
        }
      }
    }

    if (Array.isArray(value.gap_disposition)) {
      for (const [index, gap] of value.gap_disposition.entries()) {
        if (gap?.status === 'blocked' && !gap.disposition) {
          diagnostics.push(diagnostic(
            'RUNTIME_ADAPTER_BLOCKED_GAP_UNEXPLAINED',
            'Blocked runtime adapter gaps require an explicit disposition',
            sourcePath,
            `gap_disposition[${index}].disposition`,
          ));
        }
      }
    }
  }

  if (adapterType === 'stack' && Array.isArray(value.differences)) {
    for (const [index, difference] of value.differences.entries()) {
      if (difference?.creates_reusable_preset === true) {
        diagnostics.push(diagnostic(
          'STACK_ADAPTER_PRESET_CREATION',
          'Stack adapter differences cannot create reusable presets',
          sourcePath,
          `differences[${index}].creates_reusable_preset`,
        ));
      }
    }
  }

  return diagnostics;
}

export function validateRepoAdapter(value, { sourcePath = 'repo-adapter' } = {}) {
  return createValidationResult({
    diagnostics: validateObject(value, 'repo', sourcePath),
    validatedPaths: [sourcePath],
    evidence: { adapter_type: 'repo' },
  });
}

export function validateStackAdapter(value, { sourcePath = 'stack-adapter' } = {}) {
  return createValidationResult({
    diagnostics: validateObject(value, 'stack', sourcePath),
    validatedPaths: [sourcePath],
    evidence: { adapter_type: 'stack' },
  });
}

export function validateRuntimeAdapter(value, { sourcePath = 'runtime-adapter' } = {}) {
  return createValidationResult({
    diagnostics: validateObject(value, 'runtime', sourcePath),
    validatedPaths: [sourcePath],
    evidence: { adapter_type: 'runtime' },
  });
}

export function validateAdapter(value, { sourcePath = 'adapter' } = {}) {
  const adapterType = value?.adapter_type;
  if (adapterType === 'repo') return validateRepoAdapter(value, { sourcePath });
  if (adapterType === 'stack') return validateStackAdapter(value, { sourcePath });
  if (adapterType === 'runtime') return validateRuntimeAdapter(value, { sourcePath });
  return createValidationResult({
    diagnostics: [diagnostic('ADAPTER_TYPE_UNKNOWN', 'Adapter type must be repo, stack, or runtime', sourcePath, 'adapter_type')],
    validatedPaths: [sourcePath],
  });
}
