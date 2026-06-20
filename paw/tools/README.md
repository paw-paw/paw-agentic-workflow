# PAW Tools

## Status

Approved target surface for incremental materialization. Patch
`paw-03-schema-validator-compatibility` owns the first PAW schemas and validator
implementation here. Later governed patches add their own validation modules under
the same inactive target-surface boundary.

The active program workflow and v1 compatibility entrypoints remain under `sdd/**`
until cutover. Implementing tools here does not activate v2 writers or workspaces.

## Intended Responsibility

This directory is reserved for future deterministic tools that validate or operate on approved PAW contracts.

## Materialized Surface

- `schemas/patch-v2.schema.json` defines the physical v2 manifest shape.
- `validation/parse-patch-yaml.mjs` parses the constrained manifest YAML subset.
- `validation/detect-schema-version.mjs` rejects missing, unsupported, or hybrid
  version axes before semantic validation.
- `validation/validate-patch-manifest.mjs` dispatches to separate v1/v2 semantic
  validators.
- `validation/validate-patch-directory.mjs` adds read-only root, legacy, closure, and
  batch evidence handling.
- `validate-patches.mjs` exposes repository and fixture validation through a
  deterministic CLI.
- `schemas/catalogs/**` define the shape of materialized catalog manifests.
- `catalogs/**` validates family, capability, documentation preset, modifier, and
  implementation preset catalogs plus their fixture matrices.
- `validate-catalogs.mjs` exposes canonical and fixture catalog validation through a
  deterministic CLI.
- `schemas/adoption/**` define materialized adoption adapter, record, and assessment
  shapes.
- `adoption/**` validates adapter boundaries, adoption records, overrides,
  assessments, catalog references, and adoption fixture matrices.
- `validate-adoption.mjs` exposes adoption fixture validation through a deterministic
  CLI.
- `schemas/workflow/**` define materialized workflow, bootstrap, conformance, and
  manual evidence shapes.
- `workflow/**` validates the canonical workflow contracts and workflow fixture
  matrix.
- `validate-workflow.mjs` exposes workflow contract and fixture validation through a
  deterministic CLI.
- `schemas/integration/**` define the materialized integration record shape.
- `integration/**` validates integration contracts, provider snapshots, check
  freshness, readiness, delivery disposition, and fixture expectations.
- `validate-integration.mjs` exposes integration contract and fixture validation
  through a deterministic CLI.

The parser supports top-level mappings, simple string/integer/null scalars, empty
arrays, block arrays of simple scalars, comments, and blank lines. It rejects nested
objects or arrays, flow collections, anchors, aliases, tags, multiline scalars, tabs,
and unsupported indentation with structured diagnostics.

Validation results expose `valid`, `schemaVersion`, `diagnostics`, and
`validatedPaths`. Diagnostics use `error`, `warning`, or `compatibility`; only errors
make a result invalid.

## Validator CLI

```bash
node paw/tools/validate-patches.mjs
node paw/tools/validate-patches.mjs --json
node paw/tools/validate-patches.mjs --root <path>
node paw/tools/validate-patches.mjs --fixtures
node paw/tools/validate-patches.mjs --help
node paw/tools/validate-patches.mjs --version
node paw/tools/validate-catalogs.mjs --json
node paw/tools/validate-catalogs.mjs --fixtures --json
node paw/tools/validate-adoption.mjs --fixtures --json
node paw/tools/validate-workflow.mjs --json
node paw/tools/validate-workflow.mjs --fixtures --json
node paw/tools/validate-integration.mjs --json
node paw/tools/validate-integration.mjs --fixtures --json
```

Exit code `0` means success, `1` means validation errors, and `2` means invalid usage
or an internal execution failure. The structured output contains `status`,
`schema_version`, `validated_paths`, `warnings`, `errors`, and `evidence`.

## Ownership

The patch that introduces each tool owns its behavior, tests, compatibility, and documentation. Repository maintainers own cross-tool consistency.

## Boundaries

Tools provide enforcement and evidence. They do not become policy by implementation alone, and they must not introduce a second active namespace before cutover.

Do not duplicate the canonical PAW implementation under `sdd/tools/**`. Any v1
entrypoint retained there must remain a compatibility bridge with explicit ownership.
