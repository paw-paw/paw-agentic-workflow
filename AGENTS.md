# AGENTS.md

## Status

This repository is a PAW `pre-alpha` bootstrap. It is not yet portable and must not be represented as a stable methodology implementation or distribution.

## Authority

- Read `docs/README.md` before changing repository behavior or governance.
- During `paw-foundation`, treat the final handoff for the active patch in ignored `_inbox/final/` as binding intent for that patch.
- Use `_inbox/decision_ledger.md` only when the active handoff and live governed artifacts do not resolve a question.
- Do not use private legacy research as default context or as authority over a final handoff.
- Do not treat inherited v1 implementation details as new PAW doctrine.

## Bootstrap boundaries

- Keep `_inbox/` ignored and outside Git history.
- Keep Pages, Actions, releases, packaging, and deployment disabled unless a later governed patch explicitly changes that rule.
- Do not rename `sdd/**`, `sdd-*` skills, schemas, or manifests before the patch that owns that transformation.
- Do not claim portability before the approved multi-repository and multi-runtime gates pass.
- Preserve provenance for imported v1 files and explain any divergence.

## Validation

Run only commands that exist in the repository. The initial deterministic checks are:

```bash
node sdd/tools/validate-sdd.mjs --fixtures
node --test tests/sdd-validation.test.mjs
```

Report files changed, validations, assumptions, drift, pending work, and risks.
