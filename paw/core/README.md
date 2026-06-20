# PAW Core

## Status

This directory contains the live conceptual contracts for the PAW patch model. The contracts are runtime-neutral and intentionally smaller than any schema, workflow, adapter, or repository policy that implements them.

The core is active as documentation. It does not activate v2 patch workspaces, schemas, validators, orchestration, tooling, or runtime adapters.

## Contract Map

- `patch-model.md`: patch identity, modes, status, and manifest concepts.
- `artifact-lifecycle.md`: artifact responsibilities, transitions, promotion, and historical memory.
- `authority-and-evidence.md`: live authority, precedence, evidence, and promotion.
- `decision-gates.md`: decisions that require explicit human approval.
- `drift-policy.md`: drift categories and reconciliation protocol.
- `compatibility-policy.md`: v1 history, transition behavior, and v2 cutover boundaries.

Delivery and change-request integration semantics live outside core under
`paw/integration/**`. Core owns artifact responsibility boundaries; integration
owns provider-neutral delivery lifecycle rules.

## Ownership

The PAW core owns semantics that must remain consistent across repositories and agent runtimes. Schemas, workflows, tools, and adapters may encode or translate these contracts, but they must not redefine them.

Repository-local governance owns local authority maps, paths, commands, validation bindings, and deployment policy. Runtime adapters own runtime-specific interaction and capability bindings.

## Boundaries

The core must not contain:

- provider-specific prompts, permissions, hooks, or agent profiles;
- repository-specific paths, commands, branch names, or deployment policy;
- stack-specific requirements;
- catalogs, presets, or implementation profiles;
- executable schemas, validators, or workflow state;
- claims of portability that have not passed the approved portability gates.

The active v1 transition workflow remains in effect until the governed cutover.
