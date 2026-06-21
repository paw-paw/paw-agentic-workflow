# Distribution Manifest

## Purpose

The distribution manifest is the auditable inventory for the candidate manual
PAW distribution. It declares exactly which files belong to the distribution and
how an installer or verifier can prove integrity before and after copying.

The manifest is evidence for the distribution unit. It does not override the
live authority registered in `docs/README.md`.

## Required Metadata

A valid distribution manifest must declare:

- schema version for the manifest itself;
- distribution identifier;
- candidate version or development version;
- status, with this patch limited to `candidate`;
- compatible PAW schema versions;
- compatible Codex runtime adapter version or identifier;
- compatible toolkit version or identifier;
- minimum runtime requirements;
- generated-at timestamp or reproducible generation input;
- license default and notice policy.

The first stable public target remains `0.1.0`, but this patch must not declare
that release as published.

## File Entries

Every shipped file must be listed explicitly. Each entry must include:

- repository-relative source path;
- destination-relative path;
- file kind, such as contract, schema, tool, test, template, runtime binding, or
  notice;
- SHA-256 checksum of the source content;
- license or inherited license rule;
- whether the file is required for Codex installation;
- whether uninstall may remove it when unchanged from the manifest.

The manifest must be deterministic: stable input must produce the same ordered
entries and checksums.

## Included Surfaces

The candidate Codex distribution may include only declared files from these
surfaces when required by the manifest:

- `README.md`, `LICENSE`, `LICENSES/**`, and `NOTICES.md`;
- registered public governance and licensing docs;
- `paw/core/**`;
- `paw/catalogs/**`;
- `paw/adoption/**`;
- `paw/orchestration/**`;
- `paw/integration/**`;
- `paw/distribution/**`;
- `paw/tools/**`;
- `paw/tests/**` when needed as verification evidence;
- `.codex/README.md`, `.codex/paw-runtime-map.json`,
  `.codex/paw-toolkit/**`, `.codex/skills/paw-*`, and
  `.codex/agents/paw-*`;
- `.claude/README.md`, `.claude/skills/paw-*`, and `.claude/agents/paw-*`
  when a governed Claude Code physical adapter patch includes them as candidate
  runtime binding files.
- `.agents/README.md`, `.agents/skills/paw-*`, `.agents/rules/paw-*`, and
  `.agents/workflows/paw-*` when a governed Antigravity physical adapter patch
  includes them as candidate runtime binding files.

Runtime adapter evidence under `paw/adoption/adapters/runtime/**` may be
included as contract data for candidate evaluation. Including `.claude/**` or
`.agents/**` physical adapter files does not make the manual distribution a
Claude plugin, Antigravity bundle, marketplace package, stable release, or
multi-runtime installer.

## Exclusions

The distribution must exclude:

- `_inbox/**`;
- `sdd/parches/**` patch workspaces except where a future explicit compatibility
  decision allows historical evidence;
- private research or legacy evidence outside the public repo;
- portfolio product code, editorial tooling, deployment config, and Pages
  material;
- generated local backups, installer plans, or target-machine state;
- files not declared in the manifest.

## License and Notices

PAW source files are MPL 2.0 unless a file states otherwise. Covered source
files must retain applicable notices.

Using PAW does not automatically place independent user outputs under MPL 2.0.
Templates and reusable assets must declare whether materialized copies contain
PAW Covered Software or are delivered as independent output. The distribution
must not add MPL Exhibit B unless a future governed decision explicitly does so.

## Integrity Rules

A verifier must fail when:

- a required manifest field is missing;
- a declared file is absent;
- a checksum does not match;
- a source or destination path escapes the allowed root;
- an excluded surface is present;
- a file is copied but not declared;
- compatibility declarations are missing.

Warnings may be used for non-blocking metadata that does not affect integrity or
install safety.
