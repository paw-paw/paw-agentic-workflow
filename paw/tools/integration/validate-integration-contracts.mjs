import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { createDiagnostic } from '../validation/diagnostics.mjs';
import { createValidationResult } from '../validation/validation-result.mjs';

const REQUIRED_PATHS = [
  'paw/integration/README.md',
  'paw/integration/integration-lifecycle.md',
  'paw/integration/commit-pr-policy.md',
  'paw/tools/schemas/integration/integration.schema.json',
];

function diagnostic(code, message, path) {
  return createDiagnostic({ code, message, path });
}

export function validateIntegrationContracts(root) {
  const diagnostics = [];
  const validatedPaths = [];

  for (const path of REQUIRED_PATHS) {
    const absolute = join(root, path);
    validatedPaths.push(absolute);
    if (!existsSync(absolute)) {
      diagnostics.push(diagnostic('INTEGRATION_CONTRACT_MISSING', `Required integration contract file is missing: ${path}.`, absolute));
    }
  }

  const lifecyclePath = join(root, 'paw/integration/integration-lifecycle.md');
  if (existsSync(lifecyclePath)) {
    const lifecycle = readFileSync(lifecyclePath, 'utf8');
    const normalizedLifecycle = lifecycle.toLowerCase();
    for (const text of ['provider state', 'PAW readiness', 'delivery disposition', 'ready_to_merge', 'human merge']) {
      if (!normalizedLifecycle.includes(text.toLowerCase())) {
        diagnostics.push(diagnostic('INTEGRATION_CONTRACT_TEXT_MISSING', `Integration lifecycle must mention: ${text}.`, lifecyclePath));
      }
    }
  }

  const schemaPath = join(root, 'paw/tools/schemas/integration/integration.schema.json');
  if (existsSync(schemaPath)) {
    try {
      const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
      if (schema.title !== 'PAW integration record') {
        diagnostics.push(diagnostic('INTEGRATION_SCHEMA_TITLE_INVALID', 'Integration schema title is invalid.', schemaPath));
      }
    } catch (error) {
      diagnostics.push(diagnostic('INTEGRATION_SCHEMA_JSON_INVALID', `Integration schema is not valid JSON: ${error.message}.`, schemaPath));
    }
  }

  return createValidationResult({
    schemaVersion: 1,
    diagnostics,
    validatedPaths,
    evidence: {
      contract_count: 3,
      schema_count: 1,
    },
  });
}
