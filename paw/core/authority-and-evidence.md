# Authority and Evidence

## Live Authority

Live documentation is the current approved source that governs a subject. Each repository declares its own authority map and precedence policy; PAW does not impose one universal directory layout.

A patch may propose, modify, or reconcile authority, but patch artifacts do not become permanent authority merely because the patch is active or closed.

## Precedence

When sources disagree:

1. use the repository's declared authority and precedence policy;
2. identify the live source responsible for the affected subject;
3. treat patch artifacts as bounded change contracts within their approved scope;
4. treat code, configuration, tests, generated output, and runtime behavior as implementation evidence unless explicitly promoted.

Adapters translate this rule into repository-specific paths and runtime behavior. They must not redefine the authority relationship.

## Evidence

Evidence is observable material used to understand or verify a change. It may include:

- code and configuration;
- tests and validation results;
- runtime behavior;
- generated artifacts;
- historical patches;
- imported or recovered documentation;
- external standards or research.

Evidence can contradict authority and reveal drift. It cannot silently replace authority.

Brownfield implementation is especially important evidence, but observed behavior is not automatically desired behavior.

## Promotion

Promotion is the explicit act of moving an approved durable rule, decision, check, or binding into its live owning source.

Promotion requires:

- an identified destination with appropriate ownership;
- a recorded reason and approval;
- reconciliation with existing authority;
- validation appropriate to the destination;
- removal of any implication that the patch artifact remains hidden authority.

Durable rules, checks, and bindings introduced by a patch must be promoted before closure. If no valid destination exists, closure is blocked or the work is explicitly deferred through a decision gate.

## Closed Patches

A closed patch is historical memory. It preserves intent, decisions, execution evidence, drift, validation, and residual risk.

Later work may cite that history, but must use live sources for current rules. Historical artifacts are not rewritten solely to match later terminology or structure.

## Prohibited Inference

The following transitions are never automatic:

- implementation state to desired behavior;
- passing tests to policy;
- generated output to source of truth;
- repeated local practice to portable doctrine;
- adapter behavior to core semantics;
- historical compatibility to current activation.

Each transition requires explicit promotion or a recorded decision by the owning authority.
