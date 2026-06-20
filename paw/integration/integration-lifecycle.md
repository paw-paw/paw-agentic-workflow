# Integration Lifecycle

## Purpose

PAW integration records how a governed patch relates to local VCS state, a
working branch, a primary change request, provider checks, and delivery outcome.
It keeps delivery evidence visible without making any provider, branch, or change
request the source of truth for PAW artifacts.

## Default Model

The default integration shape is:

```text
1 patch = 1 working branch = 1 primary change request
```

`program_id` groups related patches for traceability. It does not create a
program workspace, shared lifecycle, shared branch, or integration branch. A
shared integration branch requires an explicit governing decision and a controlled
promotion path.

## `integration.yaml`

`integration.yaml` is the optional governed delivery artifact for one patch. It
records integration state and evidence; it does not own intent, scope, plans,
tasks, validation details, decisions, or closure.

Required top-level fields for the initial portable schema are:

```yaml
schema_version: 1
program_role:
governance_source:
base_branch:
head_branch:
primary_integration:
promotion_refs:
included_patches:
provider_snapshot:
paw_readiness:
delivery_disposition:
merged_refs:
```

Allowed values:

- `program_role`: `standalone`, `member`, `integration`
- provider state in `provider_snapshot`: `absent`, `draft`, `open`, `closed`, `merged`
- `paw_readiness`: `not_evaluated`, `blocked`, `ready_to_merge`
- `delivery_disposition`: `pending`, `integrated`, `closed_unmerged`, `abandoned`

`provider_snapshot` must include the observed provider name, state, head SHA when
known, check conclusions when known, and the observation timestamp when a provider
is present. With provider state `absent`, local validation remains possible and
remote fields may be empty.

## State Separation

Provider state answers what the remote provider currently reports.

PAW readiness answers whether PAW evidence for the current head is sufficient for
human merge consideration.

Delivery disposition answers what happened to the patch delivery attempt.

These states must not be inferred from each other. A draft or open change request
does not make a patch ready. A merged provider state does not rewrite PAW closure.
A closed provider state may be `closed_unmerged`, `abandoned`, or historical
evidence depending on recorded disposition.

## Freshness

Remote checks only count as current evidence when they are tied to the exact
`head_branch` head SHA recorded in `integration.yaml`. A result from another SHA,
an unknown SHA, or an older provider snapshot is stale and cannot satisfy
readiness.

Only checks explicitly classified as `ci-gated` by the local adapter block
`ready_to_merge`. Other checks may be recorded as evidence but do not define PAW
readiness.

## Commit Cadence

PAW does not require one commit per patch. The review unit is the patch and its
primary change request, while commits preserve intent and traceability.

Each commit should:

- express one legible intent;
- remain traceable to the active patch;
- keep unrelated surfaces separate unless coupling is explicitly approved;
- leave PAW artifacts truthful for the committed state;
- use Conventional Commits or the local structured equivalent.

For governed SDD execution, the expected cadence is:

1. create a baseline commit after definition, plan, and tasks are ready;
2. create one or more coherent commits for each closed phase;
3. create a separate closure commit after formal close;
4. avoid WIP publication, history rewrite, force-push, destructive cleanup, or
   merge without explicit human approval.

## Change Request Description

A primary change request description may be generated from PAW artifacts using
managed sections. It is a communication surface only. It must not replace
`definicion.md`, `plan.md`, `tasks.md`, phase backlogs, `decision.log`,
validation evidence, `integration.yaml`, or `cierre.md`.

## Permissions

Adapters must separate permissions for:

- local VCS read;
- branch creation or switch;
- commit creation;
- remote push;
- primary change-request creation or update;
- remote check reading;
- merge.

Merge remains a human action. Remote operations require available credentials and
explicit user consent in the runtime that performs them.

## Closure Order

The expected order is:

```text
implement
-> review and record attestations
-> run validations
-> close the patch
-> commit closure
-> confirm final remote checks for current head
-> mark PAW readiness as ready_to_merge when evidence supports it
-> human merge
```

No artificial post-merge commit is required solely to record a merge reference.

