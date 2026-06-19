# Adoption Examples

## Purpose

Examples show how adoption contracts are expected to be represented by fixtures and
documentation. They are non-authoritative unless a governing contract explicitly
promotes a rule.

## Required Example Coverage

The adoption fixture and example set should include:

- exact adoption of a preset;
- supported variant adoption;
- local exception with owner and review;
- rejected preset with reason and evidence;
- greenfield flow;
- brownfield flow;
- invalid unknown catalog references;
- invalid unresolved conflicts;
- invalid override without owner or review.

## Boundary

Examples must not claim that PAW can automatically choose a stack, install itself in a
repository, activate a runtime adapter, or certify portability before the approved
program gates pass.

The executable example matrix is represented under `paw/tests/fixtures/adoption/**`
and validated by `node paw/tools/validate-adoption.mjs --fixtures`.
