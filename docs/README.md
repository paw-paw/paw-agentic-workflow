# Documentation Index and Authority Policy

This file is the canonical repository documentation index. It defines the local documentation map, authority levels, precedence, ownership, and default verification expectations.

No other document may define a competing repository-wide precedence order. Topic documents explain their assigned subject; they do not override this index.

## Document Classification

Document purpose and authority are separate dimensions.

The allowed document roles are:

- `strategic`: intent, outcomes, context, trade-offs, and direction.
- `contract`: rules, boundaries, policies, and required behavior.
- `verifiable`: acceptance criteria, examples, and checkable evidence.
- `operational`: execution, support, maintenance, and repository operation.

The allowed authority levels are:

- `authoritative`: a live source that governs its registered subject.
- `supporting`: guidance or evidence that explains an authoritative source.
- `non_authoritative`: history, proposals, generated output, or patch memory.

A multi-role document has one primary role. Roles never determine authority by themselves.

## Precedence

When sources conflict, use this order:

1. This index for the repository map, document authority, and precedence.
2. The registered authoritative live document for the affected subject.
3. `AGENTS.md` for repository-local operating instructions, within the limits set here.
4. The active patch definition, plan, tasks, decision log, and backlog for that patch's approved scope.
5. Code, tests, schemas, fixtures, and generated output as implementation evidence unless this index explicitly registers them as authoritative.
6. Closed patch artifacts and the inherited v1 surface as historical or transitional evidence.

During the private `paw-foundation` transformation program, the final handoff for the active patch is binding input for that patch. It is not a public live contract and must be promoted into the registered live documents before closure. `_inbox/decision_ledger.md` is exceptional clarification; `_inbox/legacy/**` is historical evidence of last resort.

An active patch cannot silently override an authoritative live document. A mismatch is drift and must be reconciled or escalated.

## Canonical Registry

| Path | Roles | Primary role | Authority | Precedence within subject | Owner | Verification default |
| --- | --- | --- | --- | --- | --- | --- |
| `docs/README.md` | contract, operational | contract | authoritative | repository documentation map and precedence | repository maintainers | automated |
| `README.md` | strategic, operational | strategic | authoritative | public identity and current status | repository maintainers | manual |
| `docs/governance/ARCHITECTURE.md` | strategic, contract | contract | authoritative | layer ownership and boundaries | repository maintainers | manual |
| `docs/governance/NAMING.md` | contract, verifiable | contract | authoritative | PAW naming and historical compatibility | repository maintainers | automated |
| `docs/governance/V1-TRANSITION.md` | contract, operational | contract | authoritative | transition state and namespace activation | repository maintainers | automated |
| `docs/governance/BOOTSTRAP-STATUS.md` | strategic, verifiable | verifiable | authoritative | current bootstrap capability claims | repository maintainers | manual |
| `docs/governance/PROVENANCE.md` | strategic, verifiable | verifiable | authoritative | public seed origin and extraction record | repository maintainers | manual |
| `docs/licensing/OUTPUT-POLICY.md` | contract | contract | authoritative | PAW outputs, templates, and assets | repository maintainers | manual |
| `docs/provenance/public-seed-imports.tsv` | verifiable | verifiable | authoritative | import-time hashes and classifications | repository maintainers | automated |
| `docs/provenance/public-seed-exclusions.tsv` | verifiable | verifiable | authoritative | import-time exclusions and reasons | repository maintainers | manual |
| `CONTRIBUTING.md` | operational | operational | supporting | contribution workflow | repository maintainers | manual |
| `AGENTS.md` | operational | operational | authoritative | repository-local agent operation | repository maintainers | manual |
| `paw/README.md` | strategic, operational | operational | supporting | target layout orientation and activation boundaries | repository maintainers | automated |
| `paw/core/README.md` | contract, operational | contract | authoritative | portable core map and ownership boundaries | core contract owner | automated |
| `paw/core/patch-model.md` | contract | contract | authoritative | conceptual PAW patch identity, modes, and status | core contract owner | automated |
| `paw/core/artifact-lifecycle.md` | contract, operational | contract | authoritative | portable artifact responsibilities and lifecycle | core contract owner | automated |
| `paw/core/authority-and-evidence.md` | contract | contract | authoritative | portable authority, evidence, and promotion semantics | core contract owner | automated |
| `paw/core/decision-gates.md` | contract | contract | authoritative | portable human decision gates | core contract owner | automated |
| `paw/core/drift-policy.md` | contract, operational | contract | authoritative | portable drift classification and reconciliation | core contract owner | automated |
| `paw/core/compatibility-policy.md` | contract, operational | contract | authoritative | v1/v2 compatibility and cutover boundaries | core contract owner | automated |
| `paw/parches/README.md` | strategic, operational | operational | supporting | inactive future workspace orientation | future owning patch | automated |
| `paw/orchestration/README.md` | strategic, operational | operational | supporting | inactive orchestration orientation | future owning patch | automated |
| `paw/tools/README.md` | strategic, operational | operational | supporting | PAW schema and validator inventory plus incremental activation boundary | owning governed patch | automated |
| `paw/tests/README.md` | strategic, operational | operational | supporting | PAW compatibility fixtures, conformance inventory, and activation boundary | owning governed patch | automated |
| `sdd/**` | operational, verifiable | operational | supporting | active v1 runtime until cutover | v1 transition owner | automated |
| `.codex/**` | operational | operational | supporting | Codex runtime binding | v1 transition owner | manual |
| `sdd/parches/<change-id>/**` | strategic, contract, operational, verifiable | operational | non_authoritative | active change scope, then historical memory | patch owner | automated |

Files not listed individually inherit the classification of the nearest registered parent only when that row uses a path pattern. If local metadata and this index disagree, treat the mismatch as drift.

## Documents

### Governance

- `governance/ARCHITECTURE.md`: layer ownership and boundaries.
- `governance/NAMING.md`: brand, identifiers, prohibited names, and historical compatibility.
- `governance/V1-TRANSITION.md`: active v1 inventory and cutover rules.
- `governance/BOOTSTRAP-STATUS.md`: current capabilities and limitations.
- `governance/PROVENANCE.md`: source repository and extraction record.

### Licensing

- `licensing/OUTPUT-POLICY.md`: policy for user outputs, templates, and assets.

### Provenance

- `provenance/public-seed-imports.tsv`: import-time source hashes and classifications.
- `provenance/public-seed-exclusions.tsv`: excluded source surfaces and reasons.

## Conflict and Update Rules

- Update this index when adding, removing, renaming, or changing the authority of a governed document.
- Preserve original names and provenance for historical v1 material.
- Do not promote generated output, implementation state, fixtures, or closed patch artifacts to authority by implication.
- Record durable decisions in the appropriate live document before closing the patch that introduced them.
- Keep private `_inbox/**` material ignored and outside public history.
