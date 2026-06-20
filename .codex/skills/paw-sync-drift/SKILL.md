---
name: paw-sync-drift
description: >
  Candidate PAW Codex skill for reconciling drift between approved artifacts, live
  authority, implementation, and validation evidence. Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/workflow.md
  toolkit: .codex/paw-toolkit
---

# paw-sync-drift

## Status

Candidate only. Use `sdd-sync-drift` for active `paw-foundation` patches.

## Load

1. `paw/orchestration/workflow.md`, loop handling and invalid transitions.
2. Drift evidence and affected artifacts.
3. Live authority documents for the affected subject.

## Do

- Classify drift and identify the owning source to update.
- Pause affected work until reconciliation is complete.
- Record decisions when authority, scope, or validation strategy changes.

## Do Not

- Treat observed implementation as desired state.
- Continue implementation while drift is unresolved.
- Rewrite history silently.
- Use `.agents/**`.

## Output

Report drift classification, affected artifacts, required decisions, updates made,
and validations to rerun.
