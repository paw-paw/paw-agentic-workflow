PAW (Paw's Agentic Workflow) implements a custom software development methodology designed to help vibe coders become capable vibe developers and build serious, maintainable software with agentic tools.

# Pre-alpha bootstrap

PAW is under active construction. This repository currently contains a sanitized v1 bootstrap extracted from the portfolio where the workflow was developed, plus the minimum governance needed to begin the `paw-foundation` transformation program.

PAW does not claim to have invented a new formal methodology. Its design is influenced by specification-driven development (SDD), behavior-driven development (BDD), test-driven development (TDD), documentation-driven development, design by contract, DevOps, software product-line engineering, progressive disclosure, evidence-based engineering, and human-in-the-loop AI governance.

## Current status

- Status: `pre-alpha`.
- Portability is not implemented or guaranteed.
- The active bootstrap still uses the historical `sdd/**` namespace and `sdd-*` skill names.
- No `paw/**` namespace, v2 schema, packaging, release automation, Pages site, or deployment workflow is active.
- Portfolio-specific runtime, content, assets, deployment configuration, and editorial skills are not part of this repository.
- The inherited v1 bootstrap contains source-repo-bound references that will be addressed by the governed patch sequence, not rewritten during extraction.

## Private transformation inputs

The `paw-foundation` handoffs and consolidated decision ledger live locally under ignored `_inbox/` paths. They are intentionally absent from Git history, branches, pull requests, releases, and clean clones.

A clean clone therefore does not contain the private program inputs. Running a transformation patch requires the authorized operator to restore the matching private `_inbox/final/**` files and `_inbox/decision_ledger.md` outside version control.

## Bootstrap contents

- `sdd/**`: historical v1 core, orchestration support, validator, schema, and fixtures needed to bootstrap the transformation.
- `.codex/**`: selected v1 SDD skills and agents needed to execute the governed patch sequence.
- `docs/**`: minimal bootstrap governance, provenance, and licensing policy.
- `tests/sdd-validation.test.mjs`: deterministic v1 validation coverage.

## Validation

The bootstrap has no runtime dependencies. With a supported Node.js installation:

```bash
node sdd/tools/validate-sdd.mjs --fixtures
node --test tests/sdd-validation.test.mjs
```

## License

Unless a file or directory states otherwise, PAW is distributed under the Mozilla Public License 2.0 (`MPL-2.0`). Selected inherited Codex skill files retain their explicit Apache License 2.0 metadata; see `LICENSES/README.md` and `THIRD_PARTY_NOTICES.md`.

Using PAW does not automatically license a user's independent code, documents, or generated artifacts under MPL 2.0. See `docs/licensing/OUTPUT-POLICY.md`.
