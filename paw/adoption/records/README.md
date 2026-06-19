# Adoption Records

## Purpose

An adoption record captures a local decision about whether and how a repository uses
a PAW catalog definition. It is local evidence and binding state, not a reusable
preset definition.

## Required Binding Fields

Every adoption decision must be able to express:

- applicability;
- `binding_mode`;
- `approval_policy`;
- `resolution_status`;
- responsible owner;
- evidence;
- review date.

## Resolution Categories

An implementation difference must be classified as one of:

- parameter inside the preset envelope;
- supported variant declared by the preset;
- local exception;
- need to create a new preset.

A supported variant preserves preset invariants and exists because of a material
envelope difference. A local exception is explicit, scoped, approved, and reviewable.
Repeated exceptions do not become global doctrine by accident.

## Overrides

Overrides are explicit local deviations. They must record:

- substituted value;
- reason;
- scope;
- approving authority;
- expiration or review condition;
- conformance impact.

An override must not edit portable core, copy catalog doctrine into the repository,
or persist without an owner and review path.
