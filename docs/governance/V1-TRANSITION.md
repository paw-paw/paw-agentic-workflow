# V1 Transition

## Current Rule

The existing Spec-Driven Development v1 implementation governs the `paw-foundation` program until the patch 14 cutover.

The target `paw/**` namespace may be documented and populated by its owning patches, but it must not become a second active workflow.

## Active V1 Inventory

| Surface | Current responsibility | Transition treatment |
| --- | --- | --- |
| `sdd/core/**` | v1 patch and artifact rules | Active v1 support; preserve names and compatibility |
| `sdd/parches/**` | Active program workspaces | The only writable patch namespace before cutover |
| `sdd/orchestration/**` | v1 routing and decision support | Active until replaced and cut over |
| `sdd/tools/**` | v1 schema and validator tooling | Active until dual-version compatibility and cutover gates exist |
| `sdd/tests/**` | v1 fixtures and link checks | Active validation evidence |
| `.codex/skills/sdd-*` | Executable v1 lifecycle skills | Active Codex workflow |
| `.codex/agents/sdd-*` | v1 advisory and controlled writer profiles | Active Codex support |
| `.codex/config.toml` | Local Codex orchestration limits | Active local runtime binding |
| `tests/sdd-validation.test.mjs` | v1 repository validation | Required deterministic check |

## Target Inventory

| Surface | Intended responsibility | Current state |
| --- | --- | --- |
| `paw/core/` | Portable PAW contracts | Inactive orientation only |
| `paw/parches/` | Future fixed patch workspace root | Inactive; writing is prohibited |
| `paw/orchestration/` | Runtime-neutral orchestration contracts | Inactive orientation only |
| `paw/tools/` | PAW tooling | Inactive orientation only |
| `paw/tests/` | Portable conformance assets | Inactive orientation only |
| `.codex/skills/paw-*` | Future Codex skills | Not created |
| `.codex/agents/paw-*` | Future Codex agents | Not created |

## Invariants Before Cutover

- New governed patches use `sdd/parches/<change-id>/`.
- `paw/parches/` contains no workspaces or writers.
- There are no symlinks between namespaces.
- There is no dual-write.
- A v2 candidate may not change the default workflow without its approved activation gate.
- Historical v1 names and provenance are preserved.
- Pages, Actions, packaging, releases, and deployment remain disabled.

## Cutover

Only patch 14 may activate the target namespace after the required schemas, validators, skills, adapters, pilots, portability gates, freeze, and reconciliation are complete.

At cutover:

- `paw/**` becomes active;
- new patches use the fixed `paw/parches/<change-id>/` path;
- writing to `sdd/**` ends;
- `sdd/**` remains readable as v1 history;
- no historical patches are moved or rewritten.

This document records the transition boundary. It does not authorize cutover.
