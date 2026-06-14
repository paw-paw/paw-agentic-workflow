# V1 Transition

## Current Rule

The existing Spec-Driven Development v1 implementation governs the `paw-foundation` program until the patch 14 cutover.

Target PAW surfaces may be materialized incrementally by their owning patches. That
materialization does not make the v2 workflow active, change the default writer, or
authorize a second writable patch namespace.

## Active V1 Inventory

| Surface | Current responsibility | Transition treatment |
| --- | --- | --- |
| `sdd/core/**` | v1 patch and artifact rules | Active v1 support; preserve names and compatibility |
| `sdd/parches/**` | Active program workspaces | The only writable patch namespace before cutover |
| `sdd/orchestration/**` | v1 routing and decision support | Active until replaced and cut over |
| `sdd/tools/**` | v1 schema and validator tooling | Active v1 entrypoints and compatibility support; do not make this the canonical home of new PAW tooling |
| `sdd/tests/**` | v1 fixtures and link checks | Preserve v1 validation evidence and historical compatibility cases |
| `.codex/skills/sdd-*` | Executable v1 lifecycle skills | Active Codex workflow |
| `.codex/agents/sdd-*` | v1 advisory and controlled writer profiles | Active Codex support |
| `.codex/config.toml` | Local Codex orchestration limits | Active local runtime binding |
| `tests/sdd-validation.test.mjs` | v1 repository validation | Required deterministic check |

## Target Inventory

| Surface | Intended responsibility | Current state |
| --- | --- | --- |
| `paw/core/` | Portable PAW contracts | Live conceptual contracts |
| `paw/parches/` | Future fixed patch workspace root | Inactive; writing is prohibited |
| `paw/orchestration/` | Runtime-neutral orchestration contracts | Inactive orientation only |
| `paw/tools/` | PAW schemas and tooling | Approved for incremental materialization by owning patches; not a workflow activation |
| `paw/tests/` | Portable fixtures and conformance assets | Approved for incremental materialization by owning patches; not a workflow activation |
| `.codex/skills/paw-*` | Future Codex skills | Not created |
| `.codex/agents/paw-*` | Future Codex agents | Not created |

## Invariants Before Cutover

- New governed patches use `sdd/parches/<change-id>/`.
- Materialized `paw/**` surfaces do not change the active writer, manifest default, or workspace root.
- New PAW implementation belongs to its approved target surface; `sdd/**` preserves v1 operation and compatibility.
- `paw/parches/` contains no workspaces or writers.
- There are no symlinks between namespaces.
- There is no dual-write or duplicated active implementation.
- A v2 candidate may not change the default workflow without its approved activation gate.
- Historical v1 names and provenance are preserved.
- Pages, Actions, packaging, releases, and deployment remain disabled.

## Cutover

Only patch 14 may activate the target workflow and writable workspace namespace after
the required schemas, validators, skills, adapters, pilots, portability gates, freeze,
and reconciliation are complete.

At cutover:

- `paw/**` becomes active;
- new patches use the fixed `paw/parches/<change-id>/` path;
- writing to `sdd/**` ends;
- `sdd/**` remains readable as v1 history;
- no historical patches are moved or rewritten.

This document records the transition boundary. It does not authorize cutover.
