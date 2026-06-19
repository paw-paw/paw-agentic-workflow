# Documentation Presets

Each software family has one base documentation preset. The preset combines the
shared universal requirements with explicit family contributions from `catalog.json`.
This keeps common doctrine in one place.

Declared applicability uses `required`, `conditional`, `optional`, or `not_in_base`.
When evaluated for a product, the effective state is `required`,
`conditional_inactive`, `optional`, or `not_applicable`.

`not_in_base` means the family does not introduce the capability. A later modifier
may still add it. A required requirement, or a conditional requirement whose trigger
is active, cannot resolve to `not_applicable`.

Exceptions are temporary, justified, approved, owned, expiring, and auditable. They
do not create full conformance and cannot change repository authority or accountable
ownership.

The complete role and readiness semantics remain owned by the workflow and
conformance patch.
