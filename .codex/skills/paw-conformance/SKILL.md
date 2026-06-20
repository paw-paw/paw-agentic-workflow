---
name: paw-conformance
description: >
  Candidate PAW Codex skill for mapping live documentation rules to checks,
  enforcement, dispositions, and evidence. Inactive until cutover.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/conformance.md
  toolkit: .codex/paw-toolkit
---

# paw-conformance

## Status

Candidate runtime integration for the conformance contract. It is evidence support,
not a source of authority.

## Load

1. `paw/orchestration/conformance.md`.
2. The governing document or rule set under review.
3. Existing checks and evidence only for the affected rule.

## Do

- Map document, role, rule, check, enforcement, disposition, owner, and evidence.
- Distinguish automated checks from manual evidence.
- Classify accepted gaps, deferred checks, blocked rules, and generated artifacts.

## Do Not

- Invent rules from tests.
- Treat generated output as enforcement.
- Replace human judgment with brittle automation.
- Use `.agents/**`.

## Output

Return conformance chain entries, validation coverage, evidence gaps, and required
follow-up.
