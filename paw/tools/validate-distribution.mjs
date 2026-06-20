#!/usr/bin/env node
import { resolve } from 'node:path';

import { validateDistributionContracts } from './distribution/validate-distribution-contracts.mjs';
import { validateDistributionFixtures } from './distribution/validate-distribution-fixtures.mjs';

const VERSION = 'paw-distribution-validator 0.1.0';
const HELP = `Usage: node paw/tools/validate-distribution.mjs [--json] [--fixtures] [--help] [--version]
`;

const args = process.argv.slice(2);
const json = args.includes('--json');
const fixtures = args.includes('--fixtures');
const unsupported = args.filter((arg) => !['--json', '--fixtures', '--help', '--version'].includes(arg));

if (args.includes('--help')) {
  process.stdout.write(HELP);
  process.exitCode = 0;
} else if (args.includes('--version')) {
  process.stdout.write(`${VERSION}\n`);
  process.exitCode = 0;
} else if (unsupported.length > 0) {
  process.stderr.write(`PAW distribution validator usage error: unsupported option ${unsupported[0]}\n`);
  process.exitCode = 2;
} else {
  const root = resolve('.');
  const result = fixtures ? validateDistributionFixtures(root) : validateDistributionContracts(root);
  const output = {
    status: result.valid ? 'pass' : 'fail',
    schema_version: result.schemaVersion,
    validated_paths: result.validatedPaths.map((path) => path.replaceAll('\\', '/')),
    errors: result.diagnostics.filter(({ severity }) => severity === 'error'),
    evidence: result.evidence,
  };

  if (json) {
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  } else {
    process.stdout.write(`PAW distribution validation ${output.status} (paths=${output.validated_paths.length}, errors=${output.errors.length})\n`);
    for (const error of output.errors) {
      process.stderr.write(`[error] ${error.code} ${error.path} - ${error.message}\n`);
    }
  }
  process.exitCode = result.valid ? 0 : 1;
}

