#!/usr/bin/env node
import { resolve } from 'node:path';

import { validateCanonicalCatalogs } from './catalogs/validate-canonical-catalogs.mjs';
import { validateCatalogFixtures } from './catalogs/validate-catalog-fixtures.mjs';

const args = process.argv.slice(2);
const json = args.includes('--json');
const fixtures = args.includes('--fixtures');
const unsupported = args.filter((arg) => !['--json', '--fixtures', '--help'].includes(arg));

if (args.includes('--help')) {
  process.stdout.write(`Usage: node paw/tools/validate-catalogs.mjs [--json] [--fixtures]\n`);
  process.exitCode = 0;
} else if (unsupported.length > 0) {
  process.stderr.write(`PAW catalog validator usage error: unsupported option ${unsupported[0]}\n`);
  process.exitCode = 2;
} else {
  const root = resolve('.');
  const result = fixtures ? validateCatalogFixtures(root) : validateCanonicalCatalogs(root);
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
    process.stdout.write(`PAW catalog validation ${output.status} (paths=${output.validated_paths.length}, errors=${output.errors.length})\n`);
    for (const error of output.errors) {
      process.stderr.write(`[error] ${error.code} ${error.path} - ${error.message}\n`);
    }
  }
  process.exitCode = result.valid ? 0 : 1;
}
