# Workflow Map

Use this adapter map without changing the portable contract:

| Claude skill | Portable operation or role | Active repo operation during paw-foundation |
| --- | --- | --- |
| `paw-router` | Runtime-local router helper | `sdd-router` when routing existing SDD state |
| `paw-intake` | `paw-intake` candidate | `sdd-intake` |
| `paw-plan` | `paw-plan` candidate | `sdd-plan` |
| `paw-tasks` | `paw-tasks` candidate | `sdd-tasks` |
| `paw-phase-backlog` | `paw-phase-backlog` candidate | `sdd-phase-backlog` |
| `paw-execute-phase` | `paw-execute-phase` candidate | `sdd-execute-phase` |
| `paw-sync-drift` | `paw-sync-drift` candidate | `sdd-sync-drift` |
| `paw-conformance` | Conformance evidence mapping | active validation and manual review |

`paw-verify` is intentionally not materialized because it is not a live portable
operation in `paw/orchestration/workflow.md`.
