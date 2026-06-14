# PAW (Paw's Agentic Workflow)

PAW (Paw's Agentic Workflow) implements a custom software development methodology designed to help vibe coders become capable vibe developers and build serious, maintainable software with agentic tools.

PAW gives humans and coding agents a shared way to define intent, preserve decisions, control scope, validate changes, and keep software understandable beyond one chat session. It does not claim to have invented a new formal methodology.

PAW is influenced by Spec-Driven Development, behavior-driven development, test-driven development, documentation-driven development, design by contract, DevOps, software product-line engineering, progressive disclosure, evidence-based engineering, and human-in-the-loop AI governance. These are influences, not alternate names for PAW or external authorities over this repository.

## Current Status

PAW is a `pre-alpha` bootstrap under active construction.

- It is not a stable distribution.
- Portability is neither implemented nor guaranteed.
- The target `paw/**` layout is documentation-only and inactive.
- The inherited Spec-Driven Development v1 runtime under `sdd/**` and the `sdd-*` Codex skills remain the only active patch workflow until the governed cutover.
- There is no v2 schema, package, release automation, Pages site, or deployment workflow.
- Pages, Actions, releases, packaging, and deployment remain disabled.

## Repository Map

- `docs/**`: canonical repository governance, architecture, naming, licensing, provenance, and transition documentation.
- `paw/**`: inactive target layout for future PAW contracts and tooling.
- `sdd/**`: active v1 Spec-Driven Development runtime and patch workspaces during the transition.
- `.codex/**`: the real Codex runtime surface, currently containing the v1 `sdd-*` skills and agents.
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
node --test tests/sdd-validation.test.mjs
node --test tests/foundation-governance.test.mjs
```

## Contributing

Read `CONTRIBUTING.md`, `docs/README.md`, and `AGENTS.md` before changing repository behavior or governance.

## License

Unless a file states otherwise, PAW is distributed under the Mozilla Public License 2.0 (`MPL-2.0`). See `LICENSE`, `LICENSES/README.md`, and `NOTICES.md`.

Using PAW does not automatically license a user's independent code, documents, decisions, plans, or generated artifacts under MPL 2.0. See `docs/licensing/OUTPUT-POLICY.md`.
