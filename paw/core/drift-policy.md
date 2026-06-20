# Drift Policy

## Definition

Drift is a meaningful mismatch between approved intent, live authority, patch artifacts, implementation, validation, integration evidence, or observed behavior.

Drift is information. It does not authorize an automatic change to scope or authority.

## Categories

| Category | Mismatch |
| --- | --- |
| Scope drift | execution or requested work no longer fits the approved objective, boundaries, or non-goals |
| Contractual drift | live governing documentation and the patch or implementation prescribe different behavior |
| Artifact drift | manifest, definition, plan, tasks, backlogs, decisions, or closure records no longer agree |
| Implementation drift | code, configuration, generated output, or runtime behavior differs from approved intent |
| Validation drift | checks, evidence, expected results, or enforcement no longer verify the approved contract |
| Integration drift | delivery or integration evidence differs from patch readiness, closure, or the approved integration contract |

One finding may belong to more than one category. Record each consequence that affects reconciliation.

Documentation role drift includes a mismatch between the canonical documentation
index and optional local metadata such as frontmatter. The index remains the owning
source unless a governed change updates it.

## Classification

After identifying the category, classify the response:

- `acceptable`: the difference is already allowed by approved scope and only requires accurate artifact updates;
- `decision-required`: the difference changes a structural choice and requires a human gate;
- `contract-update-required`: the owning live source must change through its governed process;
- `revert-or-defer`: the observed implementation must be removed, reverted, or explicitly deferred because it is not approved;
- `blocking`: faithful work cannot continue until the mismatch is resolved.

Local workflows may use additional severity labels, but they must preserve these response distinctions.

## Reconciliation Protocol

1. Stop the affected work from advancing or closing.
2. Record the expected source, observed difference, evidence, and impact.
3. Identify the owning authority for each disputed fact.
4. Classify the drift category and required response.
5. Open a human decision gate when scope, authority, compatibility, validation strategy, or public behavior may change.
6. Update live sources only through their approved ownership path.
7. Reconcile patch artifacts to the approved outcome.
8. Correct, revert, or defer implementation and integration state.
9. Run the validations required by the reconciled contract.
10. Record the resolution and any residual risk before resuming.

## Authority Rule

Observed state never becomes authority automatically.

Code, tests, generated artifacts, runtime output, and integration state may prove that drift exists. They cannot decide which side of the mismatch is desired.

When live authority is incomplete or contradictory, use the applicable decision gate instead of inferring a rule from the implementation.

## Closure

A patch cannot close with unclassified drift.

Accepted or deferred drift must have a recorded disposition, owner when applicable, validation impact, and residual risk. Blocking drift must be resolved before closure.
