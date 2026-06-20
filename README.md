# PAW (Paw's Agentic Workflow)

PAW (Paw's Agentic Workflow) implements a custom software development methodology designed to help vibe coders become capable vibe developers and build serious, maintainable software with agentic tools.

PAW gives humans and coding agents a shared way to define intent, preserve decisions, control scope, validate changes, and keep software understandable beyond one chat session. It does not claim to have invented a new formal methodology.

PAW is influenced by Spec-Driven Development, behavior-driven development, test-driven development, documentation-driven development, design by contract, DevOps, software product-line engineering, progressive disclosure, evidence-based engineering, and human-in-the-loop AI governance. These are influences, not alternate names for PAW or external authorities over this repository.

## Current Status

PAW is a `pre-alpha` bootstrap under active construction.

- It is not a stable distribution.
- `paw/distribution/**` defines a candidate manual distribution contract; it
  does not publish `0.1.0`, enable packaging, or create release automation.
- Portability is neither implemented nor guaranteed.
- `paw/core/**` contains live conceptual contracts; `paw/integration/**` contains
  portable delivery and change-request contracts; `paw/distribution/**` contains
  candidate manual distribution contracts; `paw/catalogs/**` contains portable
  family and preset catalogs; `paw/adoption/**` contains portable adoption
  contracts; `paw/orchestration/**` contains runtime-neutral workflow contracts;
  `paw/tools/**` and `paw/tests/**` contain the materialized validators, schemas,
  fixtures, and contract tests; `.codex/**` contains the candidate Codex runtime
  adapter.
- The inherited Spec-Driven Development v1 runtime under `sdd/**` and the `sdd-*` Codex skills remain the only active patch workflow until the governed cutover.
- There are no v2 writers or active v2 workspaces, package, release automation,
  Pages site, or deployment workflow.
- Pages, Actions, releases, packaging, and deployment remain disabled.

## Repository Map

- `docs/**`: canonical repository governance, architecture, naming, licensing, provenance, and transition documentation.
- `paw/core/**`: live runtime-neutral PAW contracts.
- `paw/integration/**`: portable integration, delivery, checks, and change-request contracts.
- `paw/distribution/**`: candidate manual distribution, manifest, installation,
  rollback, uninstall, verification, licensing, notices, and progressive loading
  contracts.
- `paw/adoption/**`: portable adoption records, adapter, assessment, and override contracts.
- Other `paw/**` surfaces: target layout materialized incrementally by their owning governed patches; this does not activate the v2 workflow.
- `sdd/**`: active v1 Spec-Driven Development runtime and patch workspaces during the transition.
- `.codex/**`: the real Codex runtime surface, containing active v1 `sdd-*` skills
  and agents plus inactive candidate `paw-*` runtime bindings.
- `tests/**`: deterministic repository checks.

The canonical documentation map and authority policy live in `docs/README.md`. Repository-wide operational instructions live in `AGENTS.md`.

## Transition Rule

The transformation is deliberately one-way and gated:

1. New program patches continue to use `sdd/parches/<change-id>/`.
2. `paw/parches/<change-id>/` is the fixed future path, but it is not active yet.
3. There are no symlinks, dual-write mechanisms, or two active namespaces.
4. The v1 runtime remains writable until the patch 14 cutover.
5. After cutover, `paw/**` becomes active and `sdd/**` becomes read-only v1 history.

See `docs/governance/V1-TRANSITION.md` for the active surface inventory and cutover boundaries.

## Validation

The repository has no runtime dependencies. With a supported Node.js installation:

```bash
node sdd/tools/validate-sdd.mjs
node sdd/tools/validate-sdd.mjs --fixtures
node paw/tools/validate-patches.mjs --json
node paw/tools/validate-patches.mjs --fixtures --json
node paw/tools/validate-catalogs.mjs --json
node paw/tools/validate-catalogs.mjs --fixtures --json
node paw/tools/validate-adoption.mjs --fixtures --json
node paw/tools/validate-workflow.mjs --json
node paw/tools/validate-workflow.mjs --fixtures --json
node paw/tools/validate-integration.mjs --json
node paw/tools/validate-integration.mjs --fixtures --json
node --test paw/tests/contract/patch-parsing.test.mjs
node --test paw/tests/contract/patch-validation.test.mjs
node --test paw/tests/contract/validator-cli.test.mjs
node --test paw/tests/contract/adoption-adapters.test.mjs
node --test paw/tests/contract/adoption-records.test.mjs
node --test paw/tests/contract/adoption-assessments.test.mjs
node --test paw/tests/contract/workflow-validation.test.mjs
node --test paw/tests/contract/workflow-cli.test.mjs
node --test paw/tests/contract/integration-validation.test.mjs
node --test paw/tests/contract/integration-cli.test.mjs
node --test paw/tests/contract/codex-runtime-toolkit.test.mjs
node --test paw/tests/contract/codex-runtime-skills.test.mjs
node --test paw/tests/contract/codex-runtime-agents.test.mjs
node --test tests/sdd-validation.test.mjs
node --test tests/foundation-governance.test.mjs
node --test tests/core-contracts.test.mjs
node --test tests/schema-validator-conformance.test.mjs
```

## Contributing

Read `CONTRIBUTING.md`, `docs/README.md`, and `AGENTS.md` before changing repository behavior or governance.

## License

Unless a file states otherwise, PAW is distributed under the Mozilla Public License 2.0 (`MPL-2.0`). See `LICENSE`, `LICENSES/README.md`, and `NOTICES.md`.

Using PAW does not automatically license a user's independent code, documents, decisions, plans, or generated artifacts under MPL 2.0. See `docs/licensing/OUTPUT-POLICY.md`.
