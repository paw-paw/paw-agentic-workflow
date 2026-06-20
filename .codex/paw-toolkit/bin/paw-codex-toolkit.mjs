#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateIntegrationRecord } from '../../../paw/tools/integration/validate-integration-record.mjs';
import { validateDistributionContracts } from '../../../paw/tools/distribution/validate-distribution-contracts.mjs';
import { normalizeGithubSnapshot } from '../providers/github.mjs';

const VERSION = 'paw-codex-toolkit 0.1.0';
const HELP = `Usage: node .codex/paw-toolkit/bin/paw-codex-toolkit.mjs <command> [options]

Commands:
  discover-root      Find the repository root.
  inspect-patch      Inspect one SDD patch workspace.
  check-mutation     Validate a mutation envelope.
  plan-write         Plan or perform a mechanical file write.
  inspect-integration  Inspect a local integration record.
  inspect-distribution  Inspect the candidate manual distribution manifest.
  github-snapshot    Normalize an experimental GitHub provider snapshot.

Options:
  --help                  Show this help.
  --version               Show toolkit version.
  --json                  Emit compact JSON.
  --root <path>           Repository root or search start.
  --change-id <id>        Patch id for inspect-patch.
  --level <level>         Mutation level: level-1, level-2, or level-3.
  --approval-token <tok>  Required for level-2 mutations.
  --plan-path <path>      Required for level-2 mutations.
  --target <path>         Target path for plan-write.
  --content <text>        Mechanical content for plan-write.
  --integration-path <path>  Integration record JSON path.
  --manifest-path <path>     Distribution manifest JSON path.
  --snapshot-path <path>  Provider snapshot JSON path.
  --dry-run               Do not write during plan-write.

Exit codes:
  0  Success, help, or version output.
  1  Validation or freshness failure.
  2  Invalid usage or internal execution failure.
`;

const ROOT_MARKERS = ['AGENTS.md', 'docs/README.md', '.codex/config.toml'];
const LEVELS = new Set(['level-1', 'level-2', 'level-3']);

function write(stream, content) {
  if (content) stream.write(content);
}

function result({ status = 'pass', command, root = null, data = {}, errors = [] }) {
  return {
    status,
    contract_version: 'paw-codex-toolkit/0.1.0',
    command,
    root,
    errors,
    data,
  };
}

function parseArgs(argv) {
  const options = {
    command: null,
    help: false,
    version: false,
    json: false,
    root: null,
    changeId: null,
    level: null,
    approvalToken: null,
    planPath: null,
    target: null,
    content: null,
    integrationPath: null,
    manifestPath: null,
    snapshotPath: null,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--') && options.command === null) {
      options.command = arg;
    } else if (arg === '--help') {
      options.help = true;
    } else if (arg === '--version') {
      options.version = true;
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--root') {
      options.root = argv[index + 1];
      index += 1;
    } else if (arg === '--change-id') {
      options.changeId = argv[index + 1];
      index += 1;
    } else if (arg === '--level') {
      options.level = argv[index + 1];
      index += 1;
    } else if (arg === '--approval-token') {
      options.approvalToken = argv[index + 1];
      index += 1;
    } else if (arg === '--plan-path') {
      options.planPath = argv[index + 1];
      index += 1;
    } else if (arg === '--target') {
      options.target = argv[index + 1];
      index += 1;
    } else if (arg === '--content') {
      options.content = argv[index + 1];
      index += 1;
    } else if (arg === '--integration-path') {
      options.integrationPath = argv[index + 1];
      index += 1;
    } else if (arg === '--manifest-path') {
      options.manifestPath = argv[index + 1];
      index += 1;
    } else if (arg === '--snapshot-path') {
      options.snapshotPath = argv[index + 1];
      index += 1;
    } else {
      return { ok: false, message: `Unknown argument: ${arg}` };
    }
  }

  return { ok: true, options };
}

function findRoot(start) {
  let current = resolve(start ?? '.');
  while (true) {
    if (ROOT_MARKERS.every((marker) => existsSync(resolve(current, marker)))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function readPatchStatus(root, changeId) {
  const patchDir = resolve(root, 'sdd', 'parches', changeId);
  const manifestPath = resolve(patchDir, 'patch.yaml');
  if (!existsSync(manifestPath)) {
    return { ok: false, patchDir, message: `Patch manifest not found for ${changeId}.` };
  }
  const content = readFileSync(manifestPath, 'utf8');
  const status = content.match(/^status:\s*(.+)$/m)?.[1]?.trim() ?? 'unknown';
  const lifecycle = content.match(/^lifecycle:\s*(.+)$/m)?.[1]?.trim() ?? 'unknown';
  return { ok: true, patchDir, manifestPath, status, lifecycle };
}

function validateMutation({ level, approvalToken, planPath, root }) {
  const errors = [];
  if (!LEVELS.has(level)) {
    errors.push(`Unsupported mutation level: ${level ?? '<missing>'}.`);
  }
  if (level === 'level-2') {
    if (!approvalToken) errors.push('Level 2 mutation requires --approval-token.');
    if (!planPath) {
      errors.push('Level 2 mutation requires --plan-path.');
    } else if (!existsSync(resolve(root, planPath))) {
      errors.push(`Level 2 plan path does not exist: ${planPath}.`);
    }
  }
  if (level === 'level-3') {
    errors.push('Level 3 mutations are prohibited for automatic execution.');
  }
  return errors;
}

function emit(outcome, { json, stdout, stderr }) {
  if (json) {
    write(stdout, `${JSON.stringify(outcome, null, 2)}\n`);
  } else if (outcome.status === 'pass') {
    write(stdout, `${outcome.command} ${outcome.status}\n`);
  } else {
    for (const error of outcome.errors) write(stderr, `PAW Codex toolkit error: ${error}\n`);
  }
  return outcome.status === 'pass' ? 0 : 1;
}

export function runToolkitCli(
  argv,
  { cwd = process.cwd(), stdout = process.stdout, stderr = process.stderr } = {},
) {
  const parsed = parseArgs(argv);
  if (!parsed.ok) {
    write(stderr, `PAW Codex toolkit usage error: ${parsed.message}\n`);
    write(stderr, 'Run with --help for usage.\n');
    return 2;
  }
  const { options } = parsed;
  if (options.help) {
    write(stdout, HELP);
    return 0;
  }
  if (options.version) {
    write(stdout, `${VERSION}\n`);
    return 0;
  }
  if (!options.command) {
    write(stderr, 'PAW Codex toolkit usage error: missing command.\n');
    return 2;
  }

  const root = findRoot(options.root ? resolve(cwd, options.root) : cwd);
  if (!root) {
    return emit(result({
      status: 'fail',
      command: options.command,
      errors: ['Repository root could not be discovered.'],
    }), { json: options.json, stdout, stderr });
  }

  try {
    if (options.command === 'discover-root') {
      return emit(result({ command: options.command, root }), { json: options.json, stdout, stderr });
    }

    if (options.command === 'inspect-patch') {
      if (!options.changeId) {
        write(stderr, 'PAW Codex toolkit usage error: inspect-patch requires --change-id.\n');
        return 2;
      }
      const patch = readPatchStatus(root, options.changeId);
      if (!patch.ok) {
        return emit(result({
          status: 'fail',
          command: options.command,
          root,
          errors: [patch.message],
          data: { patch_dir: patch.patchDir },
        }), { json: options.json, stdout, stderr });
      }
      return emit(result({
        command: options.command,
        root,
        data: {
          patch_dir: patch.patchDir,
          manifest_path: patch.manifestPath,
          status: patch.status,
          lifecycle: patch.lifecycle,
        },
      }), { json: options.json, stdout, stderr });
    }

    if (options.command === 'check-mutation') {
      const errors = validateMutation({
        level: options.level,
        approvalToken: options.approvalToken,
        planPath: options.planPath,
        root,
      });
      return emit(result({
        status: errors.length === 0 ? 'pass' : 'fail',
        command: options.command,
        root,
        errors,
        data: { level: options.level },
      }), { json: options.json, stdout, stderr });
    }

    if (options.command === 'plan-write') {
      if (!options.target || options.content === null) {
        write(stderr, 'PAW Codex toolkit usage error: plan-write requires --target and --content.\n');
        return 2;
      }
      const errors = validateMutation({
        level: options.level,
        approvalToken: options.approvalToken,
        planPath: options.planPath,
        root,
      });
      const target = resolve(root, options.target);
      if (errors.length === 0 && !options.dryRun) {
        writeFileSync(target, options.content);
      }
      return emit(result({
        status: errors.length === 0 ? 'pass' : 'fail',
        command: options.command,
        root,
        errors,
        data: {
          target,
          dry_run: options.dryRun,
          repeated_execution: existsSync(target),
          mutation_level: options.level,
        },
      }), { json: options.json, stdout, stderr });
    }

    if (options.command === 'inspect-integration') {
      if (!options.integrationPath) {
        write(stderr, 'PAW Codex toolkit usage error: inspect-integration requires --integration-path.\n');
        return 2;
      }
      const integrationPath = resolve(root, options.integrationPath);
      const record = JSON.parse(readFileSync(integrationPath, 'utf8'));
      const validation = validateIntegrationRecord(record, integrationPath);
      return emit(result({
        status: validation.valid ? 'pass' : 'fail',
        command: options.command,
        root,
        errors: validation.diagnostics.filter(({ severity }) => severity === 'error').map(({ code }) => code),
        data: {
          integration_path: integrationPath,
          provider_state: record.provider_snapshot?.state ?? null,
          paw_readiness: record.paw_readiness ?? null,
          delivery_disposition: record.delivery_disposition ?? null,
        },
      }), { json: options.json, stdout, stderr });
    }

    if (options.command === 'inspect-distribution') {
      const manifestPath = options.manifestPath ?? 'paw/distribution/distribution-manifest.json';
      const validation = validateDistributionContracts(root);
      const manifest = JSON.parse(readFileSync(resolve(root, manifestPath), 'utf8'));
      return emit(result({
        status: validation.valid ? 'pass' : 'fail',
        command: options.command,
        root,
        errors: validation.diagnostics.filter(({ severity }) => severity === 'error').map(({ code }) => code),
        data: {
          manifest_path: resolve(root, manifestPath),
          distribution_id: manifest.distribution_id ?? null,
          distribution_status: manifest.status ?? null,
          version: manifest.version ?? null,
          file_count: manifest.files?.length ?? 0,
          compatibility: manifest.compatibility ?? null,
          candidate_inactive: true,
        },
      }), { json: options.json, stdout, stderr });
    }

    if (options.command === 'github-snapshot') {
      if (!options.snapshotPath) {
        write(stderr, 'PAW Codex toolkit usage error: github-snapshot requires --snapshot-path.\n');
        return 2;
      }
      const snapshotPath = resolve(root, options.snapshotPath);
      const snapshot = normalizeGithubSnapshot(JSON.parse(readFileSync(snapshotPath, 'utf8')));
      return emit(result({
        command: options.command,
        root,
        data: {
          provider: snapshot.provider,
          state: snapshot.state,
          head_sha: snapshot.head_sha,
          check_count: snapshot.checks.length,
        },
      }), { json: options.json, stdout, stderr });
    }

    write(stderr, `PAW Codex toolkit usage error: unknown command ${options.command}.\n`);
    return 2;
  } catch (error) {
    write(stderr, `PAW Codex toolkit internal error: ${error.message}\n`);
    return 2;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  process.exitCode = runToolkitCli(process.argv.slice(2));
}
