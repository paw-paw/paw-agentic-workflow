---
name: paw-sync-drift
description: Reconcile drift between PAW candidate artifacts, live authority, and repo reality.
---

# paw-sync-drift

## Status

Candidate Claude Code physical adapter entrypoint. For active `paw-foundation`,
use `sdd-sync-drift`.

## Load

1. The observed drift record or mismatch evidence.
2. Affected SDD or PAW candidate artifacts.
3. Governing live docs from `docs/README.md`.
4. Current repo files needed to classify the mismatch.

## Do

- Classify drift as source input mismatch, artifact staleness, implementation
  mismatch, validation gap, or accepted residual risk.
- Update only the artifacts owned by the drift decision.
- Record decision log entries when interpretation changes future execution.

## Do Not

- Treat observed state as desired state without a decision gate.
- Rewrite unrelated artifacts.
- Use drift sync to broaden implementation scope.
- Hide conflict with live authority.

## Output

Return drift classification, affected artifacts, required edits, decisions, and
remaining blockers.
