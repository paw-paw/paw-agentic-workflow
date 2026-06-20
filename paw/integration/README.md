# PAW Integration

## Status

Approved target surface for governed delivery and change-request integration.
Patch `paw-08-vcs-pr-integration` owns the first portable integration contract,
`integration.yaml` lifecycle, validation fixtures, and candidate Codex binding.

This surface does not activate `paw/parches/**`, replace the active v1 workflow,
or automate merge. Provider adapters are evidence collectors and synchronizers;
they are not sources of PAW authority.

## Contract Map

- `integration-lifecycle.md`: portable delivery, branch, commit, change-request,
  checks, readiness, and disposition rules.
- `commit-pr-policy.md`: short operational prompt for agents applying the local
  commit and primary change-request policy.

## Responsibilities

`paw/integration/**` owns portable integration semantics:

- how `integration.yaml` records delivery metadata;
- the separation between provider state, PAW readiness, and delivery disposition;
- freshness requirements for remote checks and provider snapshots;
- permission boundaries for local VCS, remote publication, checks, and merge;
- the rule that a primary change request is evidence, not authority.

Repository-local adapters own concrete provider bindings, branch names, commands,
credentials, and remote API details. Runtime adapters own how an agent exposes the
operation to a user.

## Boundaries

This surface must not:

- treat provider state as PAW readiness;
- require a remote provider for local conformance;
- resolve review threads automatically;
- merge automatically;
- rewrite history, force-push, stash, reset, or clean a working tree;
- create a shared program branch merely because `program_id` exists;
- become a deployment, release, packaging, or CI activation surface.

