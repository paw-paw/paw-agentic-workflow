import { resolve } from 'node:path';

import {
  formatHumanResult,
  toStructuredResult,
} from '../validation/format-validation-result.mjs';
import { validateFixtureMatrix } from '../validation/validate-fixtures.mjs';
import { validateRepository } from '../validation/validate-repository.mjs';
import { parseValidatorArgs } from './parse-validator-args.mjs';

export const CLI_VERSION = 'paw-validator 0.1.0';
export const SUPPORTED_SCHEMAS = [1, 2];

export const HELP_TEXT = `Usage: node paw/tools/validate-patches.mjs [options]

Options:
  --help          Show this help.
  --version       Show validator and supported schema versions.
  --json          Emit the structured result as JSON.
  --root <path>   Validate a repository root (default: current directory).
  --fixtures      Validate the PAW compatibility fixture matrix.

Exit codes:
  0  Validation passed, or help/version was shown.
  1  Validation completed with errors.
  2  Invalid usage or an internal execution error.
`;

function write(stream, content) {
  if (content) stream.write(content);
}

export function runValidatorCli(
  args,
  {
    cwd = process.cwd(),
    stdout = process.stdout,
    stderr = process.stderr,
  } = {},
) {
  const parsed = parseValidatorArgs(args);
  if (!parsed.ok) {
    write(stderr, `PAW validator usage error: ${parsed.message}\n`);
    write(stderr, 'Run with --help for usage.\n');
    return 2;
  }

  const { options } = parsed;
  if (options.help) {
    write(stdout, HELP_TEXT);
    return 0;
  }
  if (options.version) {
    write(stdout, `${CLI_VERSION} (schemas ${SUPPORTED_SCHEMAS.join(',')})\n`);
    return 0;
  }

  const root = resolve(cwd, options.root ?? '.');
  try {
    const result = options.fixtures
      ? validateFixtureMatrix(resolve(root, 'paw', 'tests', 'fixtures'))
      : validateRepository(root);

    if (options.json) {
      write(stdout, `${JSON.stringify(toStructuredResult(result, { root }), null, 2)}\n`);
    } else {
      const formatted = formatHumanResult(result, { root });
      write(stdout, formatted.stdout);
      write(stderr, formatted.stderr);
    }
    return result.valid ? 0 : 1;
  } catch (error) {
    write(stderr, `PAW validator internal error: ${error.message}\n`);
    return 2;
  }
}
