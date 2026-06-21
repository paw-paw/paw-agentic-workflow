---
name: paw-conformance
description: Map PAW rules to checks, evidence, dispositions, and accepted gaps without inventing new rules.
---

# paw-conformance

## Status

Candidate Claude Code physical adapter entrypoint. It maps to
`paw/orchestration/conformance.md` and replaces the handoff-local `paw-verify`
name to avoid creating an ungoverned portable operation.

## Load

1. `paw/orchestration/conformance.md`.
2. The governing document or rule set under review.
3. Existing checks, fixtures, validators, and manual evidence for the affected
   rule.
4. `.claude/skills/paw-router/references/validation.md`.

## Do

- Map document, rule, check, enforcement, disposition, owner, and evidence.
- Distinguish automated checks from manual evidence.
- Classify blocked, deferred, generated, manual, and accepted-gap evidence.
- Report missing validation without fabricating coverage.

## Do Not

- Invent rules from tests.
- Treat generated output as authority.
- Replace human review with brittle automation.
- Declare stable runtime support.

## Output

Return conformance chain entries, validation coverage, evidence gaps, and required
follow-up.
