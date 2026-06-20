# Decision Gates

## Purpose

Decision gates prevent an implementation, workflow, or agent from resolving structural ambiguity through convenience or observed state.

A gate pauses the affected work until an authorized human approves a recorded option. Independent work may continue only when it cannot prejudice the decision.

## Required Human Gates

Human approval is required when a decision changes:

- patch mode or manifest interpretation;
- approved scope or non-goals;
- live authority, precedence, or ownership;
- governing `related_docs` or approved `creates_docs`;
- artifact responsibility or lifecycle;
- compatibility guarantees or migration treatment;
- validation strategy, required evidence, or closure criteria;
- public behavior or a durable convention;
- permissions, mutation boundaries, or autonomous delivery behavior;
- phase order when the change affects risk or approved outcomes.

Implementations may add stricter local gates. They may not remove these gates.

Bootstrap write requires a human gate when it creates or changes authoritative
documents. The gate must identify the approved document list, authority treatment,
validation expectations, and any accepted gaps.

## Gate Record

A decision gate records:

- the question and why it is structural;
- relevant authority and evidence;
- viable options and their consequences;
- the recommended option, if one exists;
- the approving human or owning authority;
- the decision and its impact on artifacts, validation, and execution.

An unresolved gate is a blocker, not an assumption.

## Non-Gated Work

A decision does not need a human gate when it is mechanical, reversible, already determined by a governing source, and cannot change scope, authority, compatibility, validation, or public behavior.

Routine implementation choices still remain subject to local review and validation.

## Prohibited Substitutions

The following do not resolve a gate:

- choosing whatever the current code already does;
- treating a passing test as approval;
- copying a runtime adapter's behavior into the core;
- selecting the fastest or easiest implementation;
- recording an assumption for a structural question;
- closing the patch while the decision remains unresolved.

## Resumption

After approval:

1. record the decision in the owning decision artifact;
2. reconcile definition, plan, tasks, backlog, manifest, or live sources as affected;
3. update validation and compatibility expectations;
4. resume only from an artifact state that describes the approved decision.
