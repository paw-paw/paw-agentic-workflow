---
name: paw-execute-phase
description: Execute one approved PAW candidate phase from its live backlog while recording evidence.
---

# paw-execute-phase

## Status

Candidate Claude Code physical adapter entrypoint. For active `paw-foundation`,
use `sdd-execute-phase`.

## Load

1. Selected `backlog/faseN.md`.
2. `tasks.md`, `plan.md`, `patch.yaml`, and `decision.log` when present.
3. `docs/README.md` and `AGENTS.md`.
4. Files listed by the backlog before editing.

## Do

- Execute exactly one phase in checklist order.
- Update backlog status, findings, drift, blockers, decisions, and validations.
- Keep edits scoped to the backlog.
- Stop for authority, scope, compatibility, or validation-strategy decisions.

## Do Not

- Advance another phase.
- Close the patch.
- Suppress failed validations.
- Use `.agents/**`, `.gemini/**`, or Antigravity surfaces.

## Output

Report checklist items executed, files touched, validation results, drift,
blockers, assumptions, and residual risk.
