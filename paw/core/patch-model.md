# Patch Model

## Purpose

A PAW patch is the bounded, traceable record of one governed change. It carries intent through planning, execution, validation, reconciliation, and closure without becoming permanent authority by default.

A patch is not a sprint, an open task bucket, or a substitute for live documentation.

## Identity

Every formal patch has a stable `change_id`.

`program_id` is `string | null`. It groups related patches for traceability but does not create a program workspace, shared lifecycle, shared branch, or additional authority.

The conceptual manifest fields are:

```yaml
schema_version: 2
change_id:
program_id:
patch_mode:
status:
created_at:
closed_at:
related_docs:
creates_docs:
bootstrap_context:
```

This document defines semantics, not the physical schema or serialization rules. Schema v2 and its validator belong to the schema and compatibility layer.

## Patch Modes

`patch_mode` is the single classification axis:

| Mode | Use | Required relationship |
| --- | --- | --- |
| `docs-bootstrap` | Create initial live documentation when no sufficient governance exists | non-empty `creates_docs` and a non-null `bootstrap_context` |
| `intention-first` | Govern an intention not directly controlled by existing live documentation | `related_docs` may be empty |
| `doc-anchored` | Modify or reconcile against governing live documentation | non-empty `related_docs` |

Modes are mutually exclusive. A mode change is a structural decision and requires a decision gate.

## Greenfield and Brownfield

Greenfield means that no live documentation exists with enough authority and coverage to govern the intended change. It does not mean that no code, configuration, repository, or prior implementation exists.

Brownfield code is evidence of observed behavior, not automatic authority.

Partial documentation that can govern the change makes the patch `doc-anchored`, even when the documentation needs improvement. Degraded documentation with recoverable intent uses `intention-first` and records the mismatch as drift.

For `docs-bootstrap`, `bootstrap_context` is:

```text
pure-greenfield
undocumented-brownfield
```

It is `null` for the other modes.

## Documentation Fields

`related_docs` names existing live documents that govern or constrain the patch.

`creates_docs` names live documents the patch is approved to create. The two fields remain separate because existing authority and intended authority have different lifecycle and approval requirements.

## Status

Patch status is one of:

```text
active
blocked
closed
abandoned
```

Status describes the whole patch, not an individual phase or task.

## Batch Work

`batch` is not a manifest mode or value.

A plan may contain a closed batch of related items when it defines:

- a finite item list;
- closure criteria for every item;
- a global closure criterion;
- a split check when dependencies, risk, or decision complexity increase.

Batch structure does not weaken patch ownership, decision gates, validation, or closure.

## Structural Decisions

Changes to patch mode, authority, scope, or live sources are structural. They must be recorded, reconciled with governing sources, and approved through the applicable human gate.
