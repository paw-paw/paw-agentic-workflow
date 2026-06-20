# Codex Runtime Surface

## Status

`.codex/**` is the real Codex runtime binding for this repository.

The active transformation workflow remains the v1 `sdd-*` skill set until the
approved cutover. PAW `paw-*` skills and agents introduced by this patch are
candidate runtime bindings. They may be inspected and tested, but they do not
activate `paw/parches/**`, replace `sdd-*`, or make PAW portable.

## Candidate PAW Runtime

The candidate Codex runtime is described by:

- `.codex/paw-runtime-map.json`: portable operation to Codex implementation map.
- `.codex/paw-toolkit/**`: shared deterministic helper toolkit for Codex skills.
- `.codex/skills/paw-*`: candidate PAW skills, added by this patch.
- `.codex/agents/paw-*.toml`: bounded candidate agent profiles, added by this patch.
- `.codex/skills/paw-integrate`: candidate integration binding for local delivery
  evidence and provider snapshot inspection, added by patch 08.
- `.codex/skills/paw-distribute`: candidate distribution binding for local
  manifest inspection, added by patch 09.

The runtime map is evidence for this adapter. Portable workflow authority remains
under `paw/orchestration/**`.

Manual distribution authority lives under `paw/distribution/**`. Codex runtime
files may be distributed only when declared by the manifest, and installed use
must not depend on absolute paths from the source repository.

## Boundaries

This surface must not:

- redefine portable PAW contracts;
- write `paw/parches/**` before cutover;
- present `.agents/**` as an alternative runtime location;
- replace active `sdd-*` skills during `paw-foundation`;
- perform remote integration operations without explicit user permission;
- hide decisions in scripts or generated output;
- broaden permissions beyond the owning skill and approval gate.

## Progressive Disclosure

Candidate skills should load:

1. their immediate portable contract;
2. the current patch state needed for the operation;
3. specific references required by the current finding or error;
4. extended diagnostics only when requested or when a failure requires them.

Default outputs should be compact, actionable, and structured.
