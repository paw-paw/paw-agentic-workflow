# Spec-Driven Development V1

## Status

This directory contains the active Spec-Driven Development v1 runtime used to govern the `paw-foundation` transformation program.

It is not the PAW product name or the target PAW namespace. It remains writable only until the governed patch 14 cutover, after which it becomes read-only v1 history.

## Responsibility

- `core/`: shared v1 patch and artifact rules.
- `parches/`: the only active patch workspace root before cutover.
- `orchestration/`: v1 runtime coordination support.
- `tools/`: v1 schema and deterministic validation.
- `tests/`: v1 fixtures and validation evidence.

`.codex/` contains the active Codex bindings that execute the v1 skills and agents.

## Authority

The canonical documentation map and precedence policy live in `docs/README.md`. This directory provides supporting runtime contracts and evidence; it does not replace repository governance.

For one active change, artifacts under `sdd/parches/<change-id>/` control the approved change scope only while they remain consistent with higher-precedence live documents.

## Workflow Entry

- `sdd-triage` classifies new input before a formal workspace exists.
- `sdd-intake` creates the formal v1 workspace.
- `sdd-router` diagnoses an existing workspace and recommends the next transition.

## Transition Boundary

- New program patches continue to use `sdd/parches/<change-id>/`.
- The target `paw/parches/<change-id>/` path is inactive.
- No symlink or dual-write mechanism may connect the namespaces.
- Existing v1 names, schemas, fixtures, and history remain intact for compatibility.

See `docs/governance/V1-TRANSITION.md`.
