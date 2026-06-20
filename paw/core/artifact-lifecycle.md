# Artifact Lifecycle

## Purpose

PAW artifacts separate identity, intent, planning, execution, decisions, integration evidence, and closure so that no single file becomes an unbounded source of truth.

This contract defines responsibilities and transitions. It does not require one physical template, tool, or runtime workflow.

## Responsibilities

| Artifact | Owns | Must not own |
| --- | --- | --- |
| `patch.yaml` | patch identity, manifest version, mode, status, timestamps, and live-document relationships | narrative intent, plans, task state, or validation evidence |
| `handover.md` | filtered source input, inherited context, and traceable transfer notes | approved scope, implementation planning, or durable policy |
| `definicion.md` | objective, scope, non-goals, applicable sources, assumptions, risks, and closure intent | technical sequencing or operational checklists |
| `plan.md` | brownfield reading, affected surfaces, approach, dependencies, risk treatment, and validation strategy | phase execution state or file-by-file runbooks |
| `tasks.md` | ordered macro phases, dependencies, phase outcomes, and global validations | live execution details or unbounded item intake |
| `backlog/faseN.md` | one phase's executable checklist, findings, blockers, decisions, drift, validation results, and closure state | redesign of the whole patch or unrelated phases |
| `decision.log` | meaningful decisions, context, rationale, approval, and impact | routine progress, mechanical edits, or final summary |
| `cierre.md` | final reconciliation of intent, execution, decisions, drift, validation, residual risk, and promoted authority | new implementation decisions or hidden durable rules |
| `integration.yaml` | governed delivery and integration metadata defined by `paw/integration/**` | patch intent, plan, task state, validation evidence, closure, or provider authority |

Responsibilities are exclusive even when one fact is referenced by several artifacts. References point to the owning artifact instead of copying and independently evolving the fact.

## Conceptual Sequence

A substantial patch normally progresses through:

```text
patch identity
-> source handover when needed
-> definition
-> technical plan
-> macro tasks
-> one live phase backlog
-> phase execution and validation
-> reconciliation
-> closure
```

Tools may expose additional routing or approval steps. They must preserve these ownership boundaries.

An artifact becomes ready for the next transition only when its blocking decisions and critical assumptions are resolved, accepted, or escalated.

The portable workflow contract defines operation-level routing and readiness checks.
Those checks must use the artifact responsibilities in this document instead of
creating hidden ownership in a tool or adapter.

## Patch and Phase State

Patch status belongs to `patch.yaml`.

Phase status belongs to `tasks.md` and the selected `backlog/faseN.md`.

Operational progress must not be encoded by inventing manifest fields such as a current phase, checklist, or task list.

## Decisions and Drift

Meaningful decisions are recorded when they occur. A phase backlog may summarize a decision for execution context, but `decision.log` owns the durable decision record.

Drift is first recorded where it is discovered. When drift affects the approved definition, plan, validation strategy, live authority, or macro sequence, the relevant artifacts must be reconciled before execution continues.

## Promotion Before Closure

Before closure, every durable rule, check, binding, or public behavior introduced by the patch must have one disposition:

- promoted into an identified live source;
- explicitly rejected;
- deferred with an owner and reason;
- retained only as historical evidence because it is not durable.

`cierre.md` records the disposition and evidence. It does not become the live owner of promoted rules.

Closure is blocked when a durable rule has no valid live destination or when required reconciliation is incomplete.

Bootstrap write reports and generated validation output are evidence artifacts. They
do not own durable rules after closure unless the rule is promoted into a live
authoritative source.

## Historical Memory

After closure, the patch workspace is historical memory. Its artifacts remain readable and preserve the terminology, evidence, and decisions that were valid during execution.

Closed artifacts are not rewritten by default when later schemas, workflows, or terminology change. Current behavior is read from live sources, not inferred from historical patch state.

## Integration Extension

`integration.yaml` records governed delivery metadata without overloading the
patch manifest or narrative artifacts. The portable lifecycle, state model,
readiness rules, and provider boundaries are owned by `paw/integration/**`.

Core-level boundaries remain:

- it cannot replace patch intent, planning, decisions, validation evidence, or
  closure;
- provider observations are evidence, not authority;
- delivery metadata cannot silently change patch readiness or closure semantics;
- adapters cannot treat local integration behavior as core doctrine.
