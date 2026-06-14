# Spec-Driven Development V1 Core

## Status

This directory contains shared rules for the active Spec-Driven Development v1 runtime. It is supporting transition material, not the future PAW core and not a portability claim.

It does not replace `docs/README.md`, authoritative live documents, `AGENTS.md`, local skills, or active patch artifacts.

## Responsibility

The v1 core defines:

- what a v1 patch is;
- how a formal patch starts and closes;
- the responsibilities of definitions, plans, tasks, backlogs, decisions, assumptions, blockers, findings, and drift;
- how active patch scope relates to live repository authority.

## Authority

Use the precedence declared in `docs/README.md`.

- Authoritative live documents govern their registered subjects.
- `AGENTS.md` governs repository-local operation within that policy.
- This v1 core supports the active patch workflow.
- Active patch artifacts govern only their approved scope and cannot override live authority.
- Implementation state does not become policy when it contradicts governing documents.

## Layer Boundaries

| Surface | Responsibility | Must not do |
| --- | --- | --- |
| `docs/**` | Live repository governance and subject contracts | Hide runtime procedure |
| `AGENTS.md` | Repository-local agent operation | Duplicate the full doctrine |
| `sdd/core/**` | Shared v1 patch and artifact rules | Present itself as the PAW target core |
| `sdd/orchestration/**` | v1 runtime coordination | Replace live authority |
| `.codex/skills/**` | Procedures for individual transitions | Redefine global contracts |
| `.codex/agents/**` | Advisory profiles and controlled writers | Take final ownership of a change |
| `sdd/parches/<change-id>/**` | Traceable change memory | Remain hidden permanent authority after closure |

## Documents

- `patch-model.md`: v1 patch and manifest model.
- `artifact-lifecycle.md`: v1 artifact sequence and closure responsibilities.
- `decision-drift-policy.md`: v1 decisions, assumptions, blockers, findings, tasks, and drift.

## Limits

This directory does not implement:

- PAW v2 contracts or schemas;
- `paw-*` skills or agents;
- runtime adapters;
- repository-specific delivery or deployment policy;
- the patch 14 cutover.

The target PAW layers are documented in `docs/governance/ARCHITECTURE.md`.
