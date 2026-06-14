# Handover: paw-02-core-patch-contracts

This artifact preserves the approved input for the patch without copying private `_inbox/**` material into public history.

## Identity

- Change id: `paw-02-core-patch-contracts`
- Program id: `paw-foundation`
- Order: 2 of 14
- Dependency: `paw-01-foundation` closed and integrated
- Governing workflow: active Spec-Driven Development v1

## Objective

Materialize the smallest runtime-neutral PAW core and the conceptual patch v2 contracts so later schemas, workflows, and adapters can share semantics without redefining them.

## Required outcomes

- Define one manifest axis, `patch_mode`, with `docs-bootstrap`, `intention-first`, and `doc-anchored`.
- Define patch identity, status, greenfield and brownfield semantics, authority, evidence, promotion, decision gates, drift, artifact ownership, and v1 compatibility.
- Reserve `integration.yaml` without defining provider-specific integration behavior.
- Promote durable doctrine into `paw/core/**` and register its authority.

## Boundaries

- Do not implement schema v2, validators, catalogs, presets, adapters, skills, bootstrap workflows, or active v2 patches.
- Do not make GitHub, Codex, a stack, deployment model, or branch convention universal doctrine.
- Do not migrate v1 history or activate `paw/parches/**`.
- Keep `sdd/**` and the `sdd-*` skills active until patch 14.

## Acceptance summary

- The core is understandable without portfolio knowledge.
- The conceptual manifest has three modes and no `patch_kind`.
- `batch` is planning structure, not a manifest value.
- Artifact responsibilities do not overlap.
- Durable rules must be promoted before patch closure.
- v1/v2 compatibility and the no-dual-write cutover boundary are explicit.
