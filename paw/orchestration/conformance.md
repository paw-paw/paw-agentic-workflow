# Conformance Contract

## Purpose

Conformance connects live documentation to verification without requiring every rule
to become an automated test. It defines how documents, roles, rules, checks,
enforcement, and evidence relate.

## Document Roles

Canonical document roles are:

- `strategic`: intent, outcomes, context, trade-offs, and direction.
- `contract`: rules, boundaries, policies, and required behavior.
- `verifiable`: acceptance criteria, examples, and checkable evidence.
- `operational`: execution, support, maintenance, and repository operation.

Role and authority are separate dimensions. A document may have multiple roles and
must identify one `primary_doc_role` when role metadata is represented locally.

The repository documentation index is the canonical registry. Local frontmatter or
metadata is optional. If local metadata and the index disagree, the mismatch is
drift, not an automatic override.

## Conformance Chain

The minimum chain is:

```text
document -> role -> rule -> check -> enforcement
```

Each rule must identify:

- owning document;
- relevant role;
- requirement or criterion;
- check disposition;
- enforcement level;
- evidence requirement;
- owner or reviewer when manual judgment is required.

## Rule Dispositions

Allowed dispositions are:

- `existing-check`: an existing validation already covers the rule.
- `new-automated-check`: the patch adds an automated check.
- `manual-with-evidence`: review is manual and must produce structured evidence.
- `generated`: an artifact is generated and must identify origin, method, and gate.
- `deferred`: validation is intentionally postponed with owner and reason.
- `accepted-gap`: the gap is accepted with rationale, owner, and residual risk.
- `blocked`: the rule cannot be resolved until a blocker is removed.

`generated` describes artifact origin. It is not an enforcement level.

## Enforcement

Allowed enforcement levels are:

- `manual`: verified by human review with evidence.
- `automated`: verified by a deterministic local check.
- `ci-gated`: verified by a stable automated check that blocks integration in the
  owning environment.

CI-gated enforcement is valid only for checks that are stable, critical, and
reproducible in the target integration environment.

## Manual Evidence

Manual evidence must record:

- reviewer;
- date;
- reviewed object;
- criterion;
- result;
- references.

Manual evidence may accept, reject, defer, or block a rule. It must not be replaced
by an empty assertion that a review happened.

## Validation Strategy

Validation should be proportional:

- use BDD-lite examples for important business or workflow behavior;
- use browser checks only when a rule requires real browser behavior;
- avoid automation when the rule requires judgment that would make the check
  brittle or misleading;
- justify new tests by risk, repeatability, regression value, and maintenance cost.

Passing tests are evidence that a check passed. They are not authority unless the
owning document defines the rule they enforce.

## Closure

A patch cannot close with unclassified conformance gaps. Each gap must be resolved,
accepted, deferred, or blocked with owner, evidence, validation impact, and residual
risk.
