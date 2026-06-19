import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { loadJson } from '../catalogs/load-json.mjs';
import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

function fixtureDirectories(root) {
  const base = resolve(root, 'paw/tests/fixtures/workflow');
  try {
    return readdirSync(base, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => resolve(base, entry.name));
  } catch (error) {
    return [];
  }
}

export function validateWorkflowFixtures(root) {
  const directories = fixtureDirectories(root);
  const diagnostics = [];
  const validatedPaths = [];
  let validCount = 0;
  let invalidCount = 0;

  for (const directory of directories) {
    const casePath = join(directory, 'case.json');
    const expectedPath = join(directory, 'expected.json');
    const loadedCase = loadJson(casePath);
    const loadedExpected = loadJson(expectedPath);
    diagnostics.push(...loadedCase.result.diagnostics, ...loadedExpected.result.diagnostics);
    validatedPaths.push(...loadedCase.result.validatedPaths, ...loadedExpected.result.validatedPaths);
    if (!loadedCase.value || !loadedExpected.value) continue;

    const result = validateWorkflowCase(loadedCase.value, casePath);
    validatedPaths.push(...result.validatedPaths);
    const actualCodes = result.diagnostics.filter(({ severity }) => severity === 'error').map(({ code }) => code);
    const expectedCodes = loadedExpected.value.error_codes ?? [];
    const expectedValid = loadedExpected.value.valid === true;
    if (expectedValid) validCount += 1;
    else invalidCount += 1;

    if (result.valid !== expectedValid || !sameCodes(actualCodes, expectedCodes)) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_FIXTURE_EXPECTATION_MISMATCH',
        message: `Fixture expectation mismatch. Expected valid=${expectedValid} codes=${expectedCodes.join(',')}; got valid=${result.valid} codes=${actualCodes.join(',')}.`,
        path: expectedPath,
      }));
    }
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: {
      fixture_count: directories.length,
      valid_count: validCount,
      invalid_count: invalidCount,
    },
  });
}

function sameCodes(actual, expected) {
  return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
}

function requireArray(value, field, diagnostics, sourcePath) {
  if (!Array.isArray(value[field])) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_FIELD_REQUIRED',
      message: `Field must be an array: ${field}.`,
      path: sourcePath,
    }));
    return [];
  }
  return value[field];
}

export function validateWorkflowCase(value, sourcePath = '<memory>') {
  const diagnostics = [];

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_CASE_INVALID',
      message: 'Workflow fixture case must be an object.',
      path: sourcePath,
    }));
    return createValidationResult({ schemaVersion: 1, diagnostics, validatedPaths: [sourcePath] });
  }

  if (value.schema_version !== 1) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_SCHEMA_VERSION_INVALID',
      message: 'Workflow fixture case must use schema_version 1.',
      path: sourcePath,
    }));
  }

  switch (value.kind) {
    case 'workflow':
      validateWorkflow(value, diagnostics, sourcePath);
      break;
    case 'bootstrap':
      validateBootstrap(value, diagnostics, sourcePath);
      break;
    case 'conformance':
      validateConformance(value, diagnostics, sourcePath);
      break;
    case 'manual-evidence':
      validateManualEvidence(value, diagnostics, sourcePath);
      break;
    default:
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_KIND_INVALID',
        message: 'Workflow fixture kind must be workflow, bootstrap, conformance, or manual-evidence.',
        path: sourcePath,
      }));
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths: [sourcePath],
  });
}

function validateWorkflow(value, diagnostics, sourcePath) {
  const operations = requireArray(value, 'operations', diagnostics, sourcePath);
  const states = requireArray(value, 'states', diagnostics, sourcePath);
  const transitions = requireArray(value, 'transitions', diagnostics, sourcePath);
  const operationIds = new Set(operations.map((operation) => operation.id));
  for (const required of ['paw-triage', 'paw-intake', 'paw-plan', 'paw-close']) {
    if (!operationIds.has(required)) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_OPERATION_MISSING',
        message: `Required operation is missing: ${required}.`,
        path: sourcePath,
      }));
    }
  }

  const stateIds = new Set(states);
  for (const transition of transitions) {
    if (!stateIds.has(transition.from) || !stateIds.has(transition.to)) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_TRANSITION_UNKNOWN_STATE',
        message: 'Transition references an unknown state.',
        path: sourcePath,
      }));
    }
    if (transition.from === transition.to && transition.requires_drift_record !== true) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_LOOP_WITHOUT_DRIFT_RECORD',
        message: 'Loop transitions require a drift record.',
        path: sourcePath,
      }));
    }
    if (transition.requires_artifact && transition.artifact_present === false) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_REQUIRED_ARTIFACT_MISSING',
        message: `Required artifact is missing: ${transition.requires_artifact}.`,
        path: sourcePath,
      }));
    }
  }
}

function validateBootstrap(value, diagnostics, sourcePath) {
  if (value.write?.approval_gate !== true) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_BOOTSTRAP_WRITE_GATE_MISSING',
      message: 'Bootstrap write requires an approval gate.',
      path: sourcePath,
    }));
  }
  const createsDocs = value.write?.creates_docs;
  const writes = value.write?.writes;
  if (!Array.isArray(createsDocs) || createsDocs.length === 0) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_BOOTSTRAP_CREATES_DOCS_MISSING',
      message: 'Bootstrap write requires a non-empty creates_docs list.',
      path: sourcePath,
    }));
  }
  if (Array.isArray(writes) && Array.isArray(createsDocs)) {
    for (const target of writes) {
      if (!createsDocs.includes(target)) {
        diagnostics.push(createDiagnostic({
          code: 'WORKFLOW_BOOTSTRAP_WRITE_OUTSIDE_CREATES_DOCS',
          message: `Bootstrap write target is not approved in creates_docs: ${target}.`,
          path: sourcePath,
        }));
      }
    }
  }
}

function validateConformance(value, diagnostics, sourcePath) {
  const rule = value.rule ?? {};
  const allowedRoles = new Set(['strategic', 'contract', 'verifiable', 'operational']);
  const allowedDispositions = new Set(['existing-check', 'new-automated-check', 'manual-with-evidence', 'generated', 'deferred', 'accepted-gap', 'blocked']);
  const allowedEnforcement = new Set(['manual', 'automated', 'ci-gated']);
  if (!allowedRoles.has(rule.role)) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_CONFORMANCE_ROLE_INVALID',
      message: 'Conformance rule role is invalid.',
      path: sourcePath,
    }));
  }
  if (!allowedDispositions.has(rule.disposition)) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_CONFORMANCE_DISPOSITION_INVALID',
      message: 'Conformance rule disposition is invalid.',
      path: sourcePath,
    }));
  }
  if (!allowedEnforcement.has(rule.enforcement)) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_CONFORMANCE_ENFORCEMENT_INVALID',
      message: 'Conformance rule enforcement is invalid.',
      path: sourcePath,
    }));
  }
  if (rule.disposition === 'generated' && !rule.generation_method) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_GENERATED_CHECK_METHOD_MISSING',
      message: 'Generated checks must declare generation_method.',
      path: sourcePath,
    }));
  }
  if (rule.disposition === 'accepted-gap' && (!rule.owner || !rule.residual_risk)) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_ACCEPTED_GAP_DETAIL_MISSING',
      message: 'Accepted gaps require owner and residual_risk.',
      path: sourcePath,
    }));
  }
}

function validateManualEvidence(value, diagnostics, sourcePath) {
  const evidence = value.evidence ?? {};
  for (const field of ['reviewer', 'date', 'reviewed_object', 'criterion', 'result', 'references']) {
    if (evidence[field] === undefined || evidence[field] === '' || (Array.isArray(evidence[field]) && evidence[field].length === 0)) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_MANUAL_EVIDENCE_FIELD_MISSING',
        message: `Manual evidence field is missing: ${field}.`,
        path: sourcePath,
      }));
    }
  }
}
