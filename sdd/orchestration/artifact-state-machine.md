# Artifact State Machine

This document defines expected SDD artifact states and transitions for one change workspace.

It is auxiliary. It helps detect where a change is and what should happen next.

---

## Artifact sequence

The normal sequence is:

```text
triage report
  -> patch.yaml + handover.md + definicion.md
  -> plan.md
  -> tasks.md
  -> backlog/faseN.md
  -> execution updates
  -> drift sync if needed
```

Not every change needs every step. Substantial changes should not skip definition, planning, task breakdown, and phase backlog unless the user explicitly narrows scope and the risk is low.

---

## Workspace structure

Expected structure:

```text
sdd/parches/<change-id>/
  patch.yaml
  handover.md
  definicion.md
  plan.md
  tasks.md
  decision.log
  backlog/
    fase1.md
    fase2.md
```

`handover.md` and `decision.log` are optional when the change does not need them, but they are useful when source material or decisions must stay traceable.

---

## Artifact responsibilities

- `patch.yaml`: formal identity, type, lifecycle, timestamps, and live-source anchors.
- `handover.md`: clean preserved input, brief, prompt, or source material.
- `definicion.md`: goal, scope, non-goals, sources of truth, impact, known decisions, open decisions, risks, and closure criteria.
- `plan.md`: brownfield implementation approach for the actual repo, affected areas, risks, dependencies, and validation strategy.
- `tasks.md`: macro phases, dependencies, likely files, validation expectations, deferred work, and selected phase readiness.
- `backlog/faseN.md`: live execution checklist for one phase, including blockers, findings, decisions, validations, and closure status.
- `decision.log`: significant decisions, rationale, impact, and affected artifacts.
- verification report: validation commands, results, manual review status, and residual risk when applicable.

---

## Valid transitions

- new idea or handover -> `sdd-triage`
- triaged SDD input -> `sdd-intake`
- `definicion.md` -> `sdd-plan`
- `plan.md` -> `sdd-tasks`
- `tasks.md` plus selected phase -> `sdd-phase-backlog`
- `backlog/faseN.md` -> `sdd-execute-phase`
- drift detected -> `sdd-sync-drift`

The active Codex session may inspect artifacts at any step to confirm state before choosing a skill.
Additional domain verification may run only when an installed repository skill and the active backlog explicitly require it.

---

## Invalid transitions

Avoid these transitions:

- idea -> execution when the change is substantial
- `definicion.md` -> `tasks.md` without a technical plan, unless the change is trivial and the decision is explicit
- `plan.md` -> execution without a phase backlog, unless the user explicitly narrows the workflow
- execution -> code truth without updating docs when drift exists
- validation pass -> done while required manual review is still pending
- failed validation -> done without recording the failure and next action

---

## State diagnosis

| Artifacts found | Detected state | Next skill or workflow | Typical risk |
| --- | --- | --- | --- |
| new input, no workspace | unclassified | `sdd-triage` | forcing SDD before classification |
| triaged input, no workspace | ready for intake | `sdd-intake` | losing the approved classification |
| `handover.md` only | intake source preserved | `sdd-intake` | source material not normalized |
| `definicion.md` only | definition ready | `sdd-plan` | planning without checking contracts |
| `plan.md` without `tasks.md` | plan ready | `sdd-tasks` | jumping to execution |
| `tasks.md` without selected backlog | phases ready | `sdd-phase-backlog` | checklist missing during execution |
| `backlog/faseN.md` active | phase ready or executing | `sdd-execute-phase` | not updating live backlog |
| execution differs from artifacts | drift | `sdd-sync-drift` | treating implementation as canon |

---

## Completion

A phase is complete only when:

- its backlog checklist is updated
- relevant validations are executed or explicitly justified as not applicable
- drift is resolved or documented
- significant decisions are recorded
- pending work and risks are reported
- the phase status reflects reality

A change is complete only when all selected phases are closed and the final report names validations, assumptions, drift, pending items, and risks.
