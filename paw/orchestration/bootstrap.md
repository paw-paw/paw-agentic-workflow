# Bootstrap Contract

## Purpose

Documentation bootstrap turns incomplete or brownfield context into approved
documentation changes without treating evidence as automatic authority.

Bootstrap has three separate operations: discover, define, and write.

## Discover

`paw-bootstrap-discover` is divergent exploration. It may produce:

- `bootstrap-discovery/context-and-trigger.md`;
- `bootstrap-discovery/exploration-map.md`;
- `bootstrap-discovery/assumptions-and-risks.md`;
- `bootstrap-discovery/decision-questions.md`;
- `bootstrap-discovery/discovery-synthesis.md`;
- evidence maps, observations, and contradiction records for brownfield work.

Discover must not:

- create authoritative product documents;
- promote evidence to authority;
- decide final document ownership;
- write the final documentation set.

## Define

`paw-bootstrap-define` is convergent. It proposes:

- `bootstrap-definition/document-map.md`;
- `bootstrap-definition/document-content-definitions.md`;
- `bootstrap-definition/evidence-to-authority.md`;
- `bootstrap-definition/approval-gate.md`.

The definition must state each proposed document's role, authority, owner, expected
conformance criteria, and whether it appears in `creates_docs`.

Evidence becomes authority only when `evidence-to-authority.md` records the
destination, rationale, approval requirement, and validation expectation.

## Write

`paw-bootstrap-write` may run only after explicit human approval of the bootstrap
definition.

It must:

- write only documents listed in `creates_docs`;
- preserve the approved granularity and mutation boundaries;
- produce `bootstrap-write-report.md`;
- record skipped, blocked, or deferred documents with reasons;
- leave evidence as evidence unless it was explicitly promoted.

It must stop when:

- the approval gate is missing or unresolved;
- `creates_docs` is absent or ambiguous;
- a requested write is outside the approved list;
- writing would change authority, scope, or validation strategy without a gate.

## Approval Gate

The approval gate records:

- approving human or owning authority;
- approved `creates_docs`;
- rejected or deferred documents;
- authority and role assignments;
- validation expectations;
- residual risks or accepted gaps.

Approval of bootstrap write is not approval to activate a workflow, install runtime
adapters, or publish a release.

## Write Report

`bootstrap-write-report.md` is evidence. It records:

- documents created or changed;
- documents skipped or deferred;
- deviations from the approved plan;
- validation results;
- follow-up risks.

The report does not become the live owner of any durable rule.

## Closure

Bootstrap closure must classify the result as one of:

- `completed`;
- `completed-with-accepted-gaps`;
- `blocked`;
- `abandoned`.

Closure must reconcile artifacts, decisions, created documentation, drift, pending
work, validation evidence, and residual risk. It cannot declare success by hiding
gaps or drift.
