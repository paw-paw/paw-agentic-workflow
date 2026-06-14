# Spec-Driven Development V1 Patch Workspaces

## Status

This directory is the only active patch workspace root during the `paw-foundation` transition program.

New governed patches continue to use:

```text
sdd/parches/<change-id>/
```

The target `paw/parches/<change-id>/` path remains inactive until the patch 14 cutover.

## Rules

- Each non-legacy child directory represents one formal v1 change.
- Every formal non-legacy patch starts with `patch.yaml` during `sdd-intake`.
- Patch artifacts control the approved scope of that change but do not replace authoritative live documents.
- A closed patch is historical memory by default.
- Durable rules introduced by a patch must be reconciled into the registered live source before closure.
- Do not create symlinks or dual-write between this directory and `paw/parches/`.

## Legacy

`legacy/` contains artifacts migrated from earlier Spec-Driven Development layouts.

Legacy remains readable for traceability. It is not the pattern for new work and does not gain authority through age or implementation history.
