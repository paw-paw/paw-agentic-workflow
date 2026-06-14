# PAW Target Layout

## Status

This directory is an inactive target layout for PAW. Its presence does not activate a v2 workflow, establish portability, or replace the current Spec-Driven Development v1 runtime.

Until the governed cutover:

- active patch workspaces remain under `sdd/parches/`;
- active Codex skills retain their `sdd-*` names;
- no process may write runtime state to both namespaces;
- no symlink may connect `paw/**` and `sdd/**`.

## Ownership

Repository maintainers own the top-level layout and its alignment with `docs/README.md`, `docs/governance/ARCHITECTURE.md`, and `docs/governance/V1-TRANSITION.md`.

Each child directory is owned by the future governed patch that introduces its contracts or implementation.

## Map

- `core/`: future portable PAW contracts.
- `parches/`: future fixed patch workspace root.
- `orchestration/`: future runtime-neutral orchestration contracts.
- `tools/`: future deterministic PAW tooling.
- `tests/`: future portable conformance assets.

The READMEs in this tree are orientation only. They are not executable contracts.
