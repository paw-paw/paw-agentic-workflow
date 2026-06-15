# Modifiers

Modifiers add or strengthen documentation obligations without changing a product's
primary family. The two kinds are component profiles and concerns.

Component profiles describe sustained architectural responsibilities. Concerns
describe transversal conditions that affect existing scopes. Neither kind selects a
technology stack or agent runtime.

Applied instances use stable scope references with one of five kinds: `system`,
`component`, `interface`, `data`, or `operational`. A documentation slot is identified
only by `capability_id + scope_ref`; evidence, reviewers, applicability, and
provenance are facets of that slot.

Merge behavior is declared by the capability. `manual-conflict` is never resolved
automatically. Modifiers cannot remove requirements, weaken active applicability,
change repository authority, or reassign accountable ownership.
