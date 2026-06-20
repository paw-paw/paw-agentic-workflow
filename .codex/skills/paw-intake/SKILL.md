---
name: paw-intake
description: >
  Candidate PAW Codex skill for opening a governed PAW patch workspace after
  approved triage. Inactive until cutover; use `sdd-intake` for paw-foundation.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-intake

## Status

Candidate only. It does not authorize `paw/parches/**` writes before cutover and
does not replace active `sdd-intake`.

## Load

1. `paw/orchestration/workflow.md`, `paw-intake` readiness and invalid transitions.
2. Approved triage result.
3. The source handoff or brief.
4. Authority documents listed by the triage.

## Do

- Preserve source input when traceability is required.
- Create or update only the approved intake artifacts after the active workflow
  allows the target namespace.
- Use toolkit root and mutation checks before mechanical writes.
- Record assumptions, open decisions, blockers, and risks.

## Do Not

- Plan phases or create tasks.
- Bypass workspace root activation gates.
- Write `paw/parches/**` during `paw-foundation`.
- Use `.agents/**`.

## Output

Report created artifacts, assumptions, blockers, open decisions, and next operation.
