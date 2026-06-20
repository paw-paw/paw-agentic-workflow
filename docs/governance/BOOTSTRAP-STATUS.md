# Bootstrap Status

## State

- Public status: `pre-alpha`.
- Active transformation program: `paw-foundation`.
- Current workflow: inherited Spec-Driven Development v1.
- PAW core: live conceptual contracts.
- Target PAW surfaces: materialized incrementally by their owning patches without activating the v2 workflow.
- Portability claim: none.
- Release claim: none.
- Packaging claim: none.

## Implemented

- PAW identity, naming, documentation authority, and repository layer boundaries.
- MPL-2.0 project license, notices, provenance, and output policy.
- Sanitized v1 core, orchestration, validator, fixtures, selected Codex skills, and agents.
- Deterministic local validation using Node.js standard-library modules.
- Target `paw/**` directory ownership and transition boundaries.
- Runtime-neutral patch model, artifact lifecycle, authority, decision gate, drift, and compatibility contracts under `paw/core/**`.
- Physical patch schema v2 and dual-read v1/v2 manifest validation under `paw/tools/**`.
- Portable compatibility fixtures and validator contract tests under `paw/tests/**`.
- A compatibility-preserving `sdd/tools/validate-sdd.mjs` bridge for active v1 consumers.
- Portable catalogs for software families, documentation capabilities and presets,
  modifiers, and implementation presets under `paw/catalogs/**`.
- Deterministic catalog validation, schemas, fixtures, and conformance tests.
- Portable adoption contracts for repo, stack, and runtime adapters, adoption
  records, assessments, and controlled overrides under `paw/adoption/**`.
- Deterministic adoption validation, schemas, fixtures, and contract tests.
- Runtime-neutral workflow, documentation bootstrap, and conformance contracts under
  `paw/orchestration/**`.
- Deterministic workflow validation, schemas, fixtures, and contract tests.
- Candidate Codex runtime map and shared toolkit contract under `.codex/**`.

## Not Implemented

- Active `paw/parches/` workspaces.
- v2 manifest writers or a v2 default workflow.
- Executable `paw-*` skills or agents.
- Fully tested runtime bindings for the `paw-*` workflow operations.
- Concrete runtime adapters for Codex, Claude Code, or Antigravity.
- Adoption automation in a consumer repository.
- Multi-runtime and multi-repository portability.
- Packaging, installation automation, release automation, Pages, Actions, or deployment.

## Provenance Boundary

The seed was extracted from a private portfolio source, but source-repository product contracts, runtime, personal content, deployment configuration, and editorial tooling are not PAW behavior.

Import-time hashes remain in `docs/provenance/public-seed-imports.tsv`. Later governed changes may update imported files without altering those provenance records.

Private transformation handoffs and the decision ledger remain local under ignored `_inbox/**` paths and are not part of the public repository.
