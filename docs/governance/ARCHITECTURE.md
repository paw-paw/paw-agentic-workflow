# Repository Architecture

## Purpose

This document defines the ownership and boundaries of PAW repository layers. It describes the target layout without claiming that the target implementation is complete or portable.

## Layers

| Layer | Current or target surface | Responsibility | Must not do |
| --- | --- | --- | --- |
| Portable doctrine | live `paw/core/` contracts | Small, runtime-neutral PAW contracts shared across implementations | Contain repo-specific commands, prompts, or deployment policy |
| Catalogs | `paw/catalogs/` | Portable family, requirement, modifier, and preset definitions | Select a concrete repository adoption or redefine core authority |
| Adoption contracts | `paw/adoption/` | Portable contracts for adoption records, adapters, assessments, and controlled local overrides | Activate adoption automation or let local adapters rewrite catalogs, core, or repository authority |
| Patch workspaces | active `sdd/parches/`; target `paw/parches/` | Traceable memory and execution state for one governed change | Replace live authoritative documents |
| Orchestration | active `sdd/orchestration/`; materialized contracts in `paw/orchestration/` | Define runtime-neutral lifecycle routing, bootstrap, conformance, decision gates, drift handling, and coordination contracts | Activate writers, become runtime adapter behavior, or hide product decisions |
| Tooling | active v1 entrypoints in `sdd/tools/`; materialized PAW validator in `paw/tools/` | Deterministic validation and local utilities | Define policy solely through implementation |
| Tests and conformance | active v1 evidence in `sdd/tests/` and `tests/`; materialized PAW contracts in `paw/tests/` | Fixtures, checks, examples, and evidence | Become authority without a governing rule |
| Runtime adapters | active `.codex/**`; future runtime-specific adapters | Bind PAW capabilities to an agent runtime | Redefine portable contracts or repository authority |
| Repository-local governance | `docs/**`, `AGENTS.md`, `CONTRIBUTING.md` | Define local authority, ownership, constraints, and operation | Claim universal applicability |
| v1 history | `sdd/**`, `sdd-*`, and closed v1 patches after cutover | Preserve provenance and compatibility evidence | Remain writable or active after cutover |

## Ownership Rules

- Repository maintainers own the canonical index and local governance.
- Portable PAW contracts are owned by their introducing governed patch and repository maintainers.
- Each patch owner controls the patch's approved scope but cannot override live authoritative sources.
- Runtime adapters own translation to a specific agent runtime, not portable semantics.
- Tests and schemas provide evidence until an authoritative policy explicitly assigns them a stronger role.

## Boundary Rules

- `AGENTS.md` is an operational bridge, not the doctrine store.
- Patch artifacts are change memory, not permanent hidden authority.
- Code, tests, schemas, and fixtures do not become policy merely because they exist.
- Historical files retain their original names and provenance.
- New PAW identifiers use `paw`; v1 historical identifiers remain `sdd`.
- The target and active namespace must never be writable at the same time.

## Current Activation State

The v1 Spec-Driven Development runtime is active. `paw/core/**` contains live
conceptual contracts. `paw/orchestration/**` contains runtime-neutral workflow,
bootstrap, and conformance contracts. Schema v2, dual validators, domain validators,
compatibility fixtures, and contract tests are materialized under `paw/tools/**` and
`paw/tests/**`. PAW workspaces, writers, and runtime integrations remain inactive.
Materialized validation support does not change the active workflow. Materialized
contracts and validation support do not change the active workflow or default
manifest writer. The exact transition is governed by `V1-TRANSITION.md`.
