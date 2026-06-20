# PAW Target Layout

## Status

This directory contains the live conceptual core and target PAW surfaces that are
materialized incrementally by their owning governed patches. Their presence does not
activate v2 workspaces, establish portability, or replace the current Spec-Driven
Development v1 runtime.

Until the governed cutover:

- active patch workspaces remain under `sdd/parches/`;
- active Codex skills retain their `sdd-*` names;
- no process may write runtime state to both namespaces;
- no symlink may connect `paw/**` and `sdd/**`.

## Ownership

Repository maintainers own the top-level layout and its alignment with `docs/README.md`, `docs/governance/ARCHITECTURE.md`, and `docs/governance/V1-TRANSITION.md`.

Each child directory is owned by the governed patch that introduces its contracts or implementation.

## Map

- `core/`: live conceptual PAW contracts.
- `catalogs/`: portable family and preset contracts introduced incrementally.
- `adoption/`: portable adoption record, adapter, assessment, and override contracts.
- `parches/`: future fixed patch workspace root.
- `orchestration/`: runtime-neutral workflow, bootstrap, and conformance contracts.
- `tools/`: deterministic PAW schemas and tooling, introduced by owning patches.
- `tests/`: portable fixtures and conformance assets, introduced by owning patches.

The core and registered orchestration documents are authoritative conceptual
contracts. Other surfaces gain implementation or contractual status only through
their owning governed patches.
