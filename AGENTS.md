# AGENTS.md

## Status

This repository is a PAW `pre-alpha` bootstrap. It is not portable or stable and must not be represented as a finished methodology distribution.

## Start Here

- Read `docs/README.md` before changing repository behavior, governance, or documentation authority.
- Read the authoritative topic document registered there.
- Use `CONTRIBUTING.md` for the contribution workflow.

`AGENTS.md` is the repository-local operational bridge. It does not contain the full PAW doctrine and does not define a second precedence policy.

## Active Workflow

- Use the existing `sdd-*` skills in their documented order for governed changes.
- Keep active program workspaces under `sdd/parches/<change-id>/` until the patch 14 cutover.
- Treat `paw/**` as an inactive target layout. Do not write workspaces, schemas, tooling, or runtime state there.
- Keep `.codex/` as the real Codex runtime surface.

## Bootstrap Boundaries

- Keep `_inbox/` ignored and outside Git history.
- Keep Pages, Actions, releases, packaging, and deployment disabled unless a later governed patch explicitly changes that rule.
- Do not rename `sdd/**`, `sdd-*` skills, schemas, or manifests before the patch that owns the change.
- Do not create symlinks, dual-write, or two active namespaces.
- Do not claim portability before the approved multi-repository and multi-runtime gates pass.
- Preserve provenance for imported v1 files and explain governed divergence.

## Uncertainty Protocol

For a potentially blocking ambiguity or inconsistency during `paw-foundation`:

1. Compare the active final handoff with live governed artifacts and repository reality.
2. Consult `_inbox/decision_ledger.md`.
3. If unresolved, consult only the directly related document under `_inbox/legacy/`.
4. If still unresolved, stop and ask the human.
5. Record the resulting decision and synchronize affected SDD artifacts.

Legacy material is evidence, not authority.

## Validation

Run only commands that exist in the repository. The deterministic checks are:

```bash
node sdd/tools/validate-sdd.mjs
node sdd/tools/validate-sdd.mjs --fixtures
node --test tests/sdd-validation.test.mjs
node --test tests/foundation-governance.test.mjs
node --test tests/core-contracts.test.mjs
```

Report files changed, validations, assumptions, drift, pending work, and risks.
