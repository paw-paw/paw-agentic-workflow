# Workflow Contract

## Purpose

This contract defines the portable PAW lifecycle operations and routing rules. It is
runtime-neutral: an adapter may expose the operations through prompts, commands, UI,
or other mechanisms, but the adapter must preserve these responsibilities.

The contract does not activate `paw/parches/**` or replace the active v1 transition
workflow before cutover.

## Operations

| Operation | Purpose | Must not do |
| --- | --- | --- |
| `paw-triage` | Classify an intent before a workspace exists. | Write product contracts, create a workspace, or plan implementation. |
| `paw-intake` | Open the workspace, assign identity, preserve source input, and capture the approved definition. | Plan technical sequencing or create phase tasks. |
| `paw-bootstrap-discover` | Explore context, evidence, contradictions, risks, and questions for documentation bootstrap. | Create authoritative documents or promote evidence. |
| `paw-bootstrap-define` | Propose the documentation map, content definitions, authority treatment, and approval gate. | Write final documents or bypass human approval. |
| `paw-bootstrap-write` | Write only the approved documents listed in `creates_docs`. | Write unapproved documents or expand authority by inference. |
| `paw-plan` | Translate the definition into a brownfield technical strategy, affected surfaces, risks, and validation strategy. | Create phase execution state or hide open structural decisions. |
| `paw-tasks` | Split the approved plan into ordered macro phases and phase-level outcomes. | Create live execution checklists or implement changes. |
| `paw-phase-backlog` | Prepare one phase's executable checklist, validations, blockers, and closure criteria. | Execute the phase or redesign the patch. |
| `paw-execute-phase` | Execute one approved phase from its backlog while recording findings, decisions, drift, and validation. | Advance other phases or close the patch. |
| `paw-sync-drift` | Reconcile mismatches between approved artifacts, authority, implementation, and validation. | Treat observed state as desired state without a decision gate. |
| `paw-close` | Reconcile final results, decisions, drift, validation, gaps, risks, and promoted authority. | Introduce new implementation decisions or hide incomplete work. |

## State Model

A patch normally moves through these states:

```text
unclassified
-> triaged
-> defined
-> planned
-> tasked
-> phase-ready
-> phase-active
-> phase-done
-> verifying
-> closed
```

Additional terminal or suspended states are:

- `blocked`: execution cannot continue until a blocker or human gate is resolved.
- `abandoned`: the patch is intentionally stopped without completion.
- `closed-with-accepted-gaps`: the patch completed its approved scope while
  explicitly carrying accepted gaps, owners, and residual risk.

State is owned by the appropriate artifact. Patch status belongs to `patch.yaml`;
phase status belongs to `tasks.md` and the selected `backlog/faseN.md`. Tools must
not invent a hidden current-phase field.

## Readiness Rules

Each operation requires its input artifacts to exist and to have no unresolved
blockers for that transition:

| Operation | Required input | Required readiness |
| --- | --- | --- |
| `paw-triage` | intent, handoff, or brief | enough context to classify scope and blockers |
| `paw-intake` | approved triage | identity, scope source, and workspace root decision |
| `paw-bootstrap-discover` | bootstrap intent | exploration scope and evidence boundaries |
| `paw-bootstrap-define` | discovery synthesis | contradictions and decision questions classified |
| `paw-bootstrap-write` | approved definition and approval gate | explicit human approval and bounded `creates_docs` |
| `paw-plan` | `definicion.md` | no blocking definition decisions |
| `paw-tasks` | `plan.md` | no blocking plan assumptions or structural drift |
| `paw-phase-backlog` | `tasks.md` and selected phase | dependencies for the phase satisfied |
| `paw-execute-phase` | `backlog/faseN.md` | actionable checklist and validation plan |
| `paw-sync-drift` | drift record or mismatch evidence | affected work paused |
| `paw-close` | completed or deferred phases | no unclassified drift or unresolved blockers |

## Invalid Transitions

The workflow must reject or block:

- planning before intake has produced an approved definition;
- task breakdown before the plan is ready;
- phase execution without a phase backlog;
- closing with unclassified drift, unresolved blockers, or missing validation
  disposition;
- bootstrap write without an approval gate;
- bootstrap write for documents outside `creates_docs`;
- promotion of evidence to authority without an explicit decision;
- writing to two active patch namespaces at the same time.

## Loop Handling

Returning to an earlier operation is allowed only when a finding changes the owning
artifact for that operation. The workflow must record:

- why the loop is required;
- which artifact is stale;
- which work is paused;
- whether a human decision gate is required;
- what validation must be rerun after reconciliation.

A loop must not be used to rewrite history silently or to avoid classifying drift.

## Missing Artifacts

When a required artifact is missing, the operation must stop before mutating later
artifacts. The result is either:

- route to the operation that owns the missing artifact;
- record a blocker when the artifact cannot be produced safely;
- classify legacy or read-only history according to the compatibility policy.

Adapters may present recovery commands, but they must not synthesize authoritative
content from implementation state alone.
