# Handover: paw-09-manual-distribution

Source: `_inbox/final/09-manual-distribution-handoff.md`

This file preserves the actionable handoff as governed input for the SDD patch.
The private source remains outside public history and does not become a live
contract by itself.

## Identity

- `change_id`: `paw-09-manual-distribution`
- `program_id`: `paw-foundation`
- Order: 09 of 14
- Depends on: `paw-08-vcs-pr-integration`
- Execution governance: active SDD v1 under `sdd/parches/`
- Expected classification: `spec` and `spec-anchored`

## Objective

Create a manual, versioned, reproducible, validable, and reversible PAW
distribution for Codex without advancing packaging or marketplaces.

## Distribution Unit

The candidate distribution must include:

- portable core;
- catalogs;
- templates;
- schemas;
- toolkit;
- Codex adapter;
- file manifest;
- checksums;
- version and compatibility;
- requirements;
- license and notices;
- installation, upgrade, verification, uninstall, and rollback instructions.

It must not include portfolio artifacts or private research documents.

## Installation Rules

The manual process must:

1. inspect the destination;
2. detect conflicts;
3. show a plan or diff;
4. require approval for overwrites;
5. preserve backup or rollback evidence;
6. copy only files declared in the manifest;
7. run post-install verification.

It must not silently overwrite existing installations or local customizations.

## Versioning

- The first public target version is `0.1.0`.
- During these patches, candidate or development identifiers may be used without
  declaring a stable release.
- `v1` and `v2` remain reserved for schema and history, not product branding.
- The manifest must declare schema, toolkit, and runtime adapter compatibility.

## Context Loading

Usage documentation must prescribe progressive loading:

1. entrypoint and repository index;
2. relevant core;
3. patch artifacts;
4. applicable preset;
5. required adapters;
6. references only on demand.

PAW must not be loaded indiscriminately in every execution.

## Licensing and Outputs

PAW is distributed under MPL 2.0.

The distribution must clarify:

- covered source files keep their notices;
- output produced by using PAW is not automatically MPL 2.0;
- templates and assets must explicitly state whether materialized files remain
  covered or are delivered as reusable output;
- Exhibit B is not added unless a future decision expressly does so.

## Deliverables

- Release layout.
- Manifest and checksums.
- Manual installation procedure.
- Upgrade procedure.
- Rollback and uninstall procedure.
- Installation verifier.
- Progressive loading guide.
- Tests in clean repositories and repositories with conflicts.

## Out of Scope

- Package manager.
- Plugin marketplace.
- Auto-update.
- Declaring multiruntime portability.
- Publishing `0.1.0`.

## Acceptance Criteria

- Two installs from the same unit produce the same surface.
- A local conflict is detected before writing.
- Uninstall does not delete unrelated files.
- The manifest supports integrity and license audit.
- Codex installation works without absolute paths from the source repo.
- The guide avoids indiscriminate context loading.

## Stop Conditions

Stop and record a decision if:

- the distribution depends on the portfolio;
- the installer needs to edit files not declared in the manifest;
- it cannot distinguish owned files from customizations;
- MPL notices cannot be preserved;
- the patch attempts to declare portability before patch 10 and the pilots.

## Next Patch

`paw-10-multiruntime-adapters`.
