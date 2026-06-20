import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

const REQUIRED_DOCS = [
  {
    path: 'paw/orchestration/workflow.md',
    sections: ['## Operations', '## State Model', '## Readiness Rules', '## Invalid Transitions', '## Loop Handling', '## Missing Artifacts'],
    tokens: ['paw-triage', 'paw-intake', 'paw-bootstrap-discover', 'paw-bootstrap-define', 'paw-bootstrap-write', 'paw-plan', 'paw-tasks', 'paw-phase-backlog', 'paw-execute-phase', 'paw-sync-drift', 'paw-close'],
  },
  {
    path: 'paw/orchestration/bootstrap.md',
    sections: ['## Discover', '## Define', '## Write', '## Approval Gate', '## Write Report', '## Closure'],
    tokens: ['creates_docs', 'approval gate', 'evidence-to-authority.md', 'bootstrap-write-report.md', 'completed-with-accepted-gaps'],
  },
  {
    path: 'paw/orchestration/conformance.md',
    sections: ['## Document Roles', '## Conformance Chain', '## Rule Dispositions', '## Enforcement', '## Manual Evidence', '## Closure'],
    tokens: ['strategic', 'contract', 'verifiable', 'operational', 'manual-with-evidence', 'accepted-gap', 'ci-gated'],
  },
];

const REQUIRED_SCHEMAS = [
  'paw/tools/schemas/workflow/workflow.schema.json',
  'paw/tools/schemas/workflow/bootstrap.schema.json',
  'paw/tools/schemas/workflow/conformance.schema.json',
  'paw/tools/schemas/workflow/manual-evidence.schema.json',
];

function readText(path) {
  return readFileSync(path, 'utf8');
}

function validateDocument(root, spec) {
  const absolutePath = resolve(root, spec.path);
  const diagnostics = [];
  const validatedPaths = [absolutePath];

  if (!existsSync(absolutePath)) {
    diagnostics.push(createDiagnostic({
      code: 'WORKFLOW_CONTRACT_MISSING',
      message: `Required workflow contract is missing: ${spec.path}.`,
      path: absolutePath,
    }));
    return { diagnostics, validatedPaths };
  }

  const content = readText(absolutePath);
  for (const section of spec.sections) {
    if (!content.includes(section)) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_CONTRACT_SECTION_MISSING',
        message: `Required section is missing: ${section}.`,
        path: absolutePath,
      }));
    }
  }
  for (const token of spec.tokens) {
    if (!content.includes(token)) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_CONTRACT_TOKEN_MISSING',
        message: `Required workflow term is missing: ${token}.`,
        path: absolutePath,
      }));
    }
  }

  return { diagnostics, validatedPaths };
}

function validateSchemaFiles(root) {
  const diagnostics = [];
  const validatedPaths = [];

  for (const relativePath of REQUIRED_SCHEMAS) {
    const absolutePath = resolve(root, relativePath);
    validatedPaths.push(absolutePath);
    if (!existsSync(absolutePath)) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_SCHEMA_MISSING',
        message: `Required workflow schema is missing: ${relativePath}.`,
        path: absolutePath,
      }));
      continue;
    }

    try {
      const parsed = JSON.parse(readText(absolutePath));
      if (parsed.type !== 'object') {
        diagnostics.push(createDiagnostic({
          code: 'WORKFLOW_SCHEMA_INVALID_ROOT',
          message: 'Workflow schema root must be a JSON object schema.',
          path: absolutePath,
        }));
      }
    } catch (error) {
      diagnostics.push(createDiagnostic({
        code: 'WORKFLOW_SCHEMA_PARSE_ERROR',
        message: error.message,
        path: absolutePath,
      }));
    }
  }

  return { diagnostics, validatedPaths };
}

export function validateWorkflowContracts(root) {
  const diagnostics = [];
  const validatedPaths = [];

  for (const spec of REQUIRED_DOCS) {
    const result = validateDocument(root, spec);
    diagnostics.push(...result.diagnostics);
    validatedPaths.push(...result.validatedPaths);
  }

  const schemaResult = validateSchemaFiles(root);
  diagnostics.push(...schemaResult.diagnostics);
  validatedPaths.push(...schemaResult.validatedPaths);

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: {
      contract_count: REQUIRED_DOCS.length,
      schema_count: REQUIRED_SCHEMAS.length,
    },
  });
}
