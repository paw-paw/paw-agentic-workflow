# PAW Orchestration

## Status

Inactive orientation only for runtime activation and default workflow behavior.

This directory contains runtime-neutral workflow, bootstrap, and conformance
contracts. These contracts are active as documentation, but they do not activate v2
patch workspaces, writers, skills, agents, or runtime adapters.

The active transition workflow remains under `sdd/orchestration/` and
`.codex/skills/sdd-*` until the governed cutover.

## Contract Map

- `workflow.md`: portable lifecycle operations, state routing, readiness, invalid
  transitions, loop handling, and missing-artifact handling.
- `bootstrap.md`: discover, define, and write contracts for documentation
  bootstrap, including approval gates and write reports.
- `conformance.md`: document roles, conformance rules, checks, enforcement,
  dispositions, and manual evidence semantics.

## Ownership

The workflow-conformance patch and repository maintainers own this surface. Runtime
adapters may implement or translate these contracts, but they may not redefine them.

## Boundaries

This directory must not contain:

- active Codex skills, prompts, hooks, or agent profiles;
- repository-specific deployment logic or branch policy;
- hidden doctrine that is not registered in the repository authority map;
- a second writer for patch artifacts;
- runtime state under `paw/parches/**` before cutover.

Tools and tests may validate these contracts as evidence. They do not become
authority without the owning documents.
