---
name: paw-bootstrap-define
description: >
  Candidate PAW Codex skill for converging bootstrap discovery into a document map,
  content definitions, evidence promotion proposal, and approval gate.
license: MPL-2.0
metadata:
  runtime: codex
  contract: paw/orchestration/bootstrap.md
  toolkit: .codex/paw-toolkit
---

# paw-bootstrap-define

## Status

Candidate only. It does not write final documents or bypass human approval.

## Load

1. `paw/orchestration/bootstrap.md`, Define and Approval Gate sections.
2. Discovery synthesis and contradiction records.
3. Governing authority index for the target repository.

## Do

- Propose document map, document content definitions, evidence-to-authority mapping,
  approval gate, and `creates_docs`.
- Classify unresolved questions before write.
- Use toolkit mutation checks for mechanical artifact writes.

## Do Not

- Write final documents.
- Treat discovery as authority.
- Expand `creates_docs` without approval.
- Use `.agents/**`.

## Output

Return proposed bootstrap definition, approval requirements, blockers, and next
operation.
