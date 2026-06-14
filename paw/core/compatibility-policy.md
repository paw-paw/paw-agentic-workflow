# Compatibility Policy

## Purpose

PAW preserves historical traceability while allowing a governed transition from the Spec-Driven Development v1 implementation to PAW v2 contracts.

Compatibility means that history remains readable and that transition tooling can interpret approved versions. It does not require rewriting history or keeping two active writers.

## v1 History

- Closed v1 patches remain valid historical records.
- Historical manifests, artifacts, identifiers, and terminology are not migrated by default.
- `sdd/parches/legacy/**` retains its documented exemptions.
- A later validator may read or validate v1 without converting it to v2.
- Compatibility fixes must preserve provenance and explain governed divergence.

## Foundation Program

The `paw-foundation` transformation program continues to use the active v1 workflow and workspaces under `sdd/parches/**`.

Conceptual v2 contracts may be implemented before cutover. Their presence does not change the default writer, manifest version, routing, or patch workspace.

## No Dual-Write

Only one patch namespace is writable as the active workflow at a time.

Before cutover:

- new program patches use `sdd/parches/<change-id>/`;
- `paw/parches/**` remains inactive;
- adapters and tools must not mirror state between namespaces;
- symlinks and dual-write mechanisms are prohibited.

After cutover:

- new patches use `paw/parches/<change-id>/`;
- writing to `sdd/**` ends;
- `sdd/**` remains readable v1 history;
- historical workspaces are not moved or rewritten.

## Cutover Gate

Only the approved patch 14 cutover may switch the active namespace and default workflow.

Cutover requires the approved schemas, validators, workflows, adapters, pilots, portability evidence, freeze, and reconciliation gates. A conceptual contract, partial implementation, or successful single-repository pilot cannot activate v2 globally.

## Version Boundaries

Schema and manifest versions describe data compatibility. They do not rename the product or imply a repository release version.

Implementations must:

- identify the version they read and write;
- reject unsupported writes without mutating history;
- preserve unknown historical material when operating in read-only compatibility mode;
- avoid translating v1 fields into v2 authority without an explicit governed migration.

## Reopening History

Closed history is not reopened solely to append later integration references, terminology, or schema shape.

Reopening is justified only when a governed correction must change that patch's substantive record. The patch then returns to active validation and closure rather than being edited silently.
