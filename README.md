# PAW (Paw's Agentic Workflow)

PAW is an experimental workflow for building software with AI coding agents without giving up engineering discipline.

It is for people who like the speed of vibe coding, but want to move toward something more reliable: clearer specs, better decisions, testable changes, documented intent, and software that can survive beyond one chat session.

## Why PAW exists

AI coding tools make it easy to move fast. They also make it easy to lose track of why something was built, which assumptions changed, what still needs validation, and whether the generated code is actually maintainable.

PAW tries to solve that gap.

The goal is not to replace engineering judgment with agents. The goal is to give humans and agents a shared workflow: define intent, preserve context, make decisions explicit, validate changes, and keep the project understandable as it grows.

PAW does not claim to have invented a new formal methodology. It borrows from specification-driven development, behavior-driven development, test-driven development, documentation-driven development, design by contract, DevOps, software product-line engineering, progressive disclosure, evidence-based engineering, and human-in-the-loop AI governance.

## Current state: pre-alpha bootstrap

PAW is under active construction.

This repository currently contains a sanitized v1 bootstrap extracted from the private portfolio where the workflow was developed. It also includes the minimum governance needed to begin the `paw-foundation` transformation program.

This is not yet a polished, portable PAW distribution.

At the moment:

* Status: `pre-alpha`.
* Portability is not implemented or guaranteed.
* The active bootstrap still uses the historical `sdd/**` namespace and `sdd-*` skill names.
* There is no active `paw/**` namespace yet.
* There is no v2 schema, package, release automation, Pages site, or deployment workflow yet.
* Portfolio-specific runtime, content, assets, deployment configuration, and editorial skills are not included.
* Some inherited v1 files still contain source-repo-bound references. These will be addressed through governed patches instead of being rewritten during extraction.

## What is in this repository

This bootstrap includes enough of the old system to transform it safely.

* `sdd/**`
  Historical v1 core, orchestration support, validator, schema, and fixtures.

* `.codex/**`
  Selected v1 SDD skills and agents needed to execute the governed patch sequence.

* `docs/**`
  Minimal bootstrap governance, provenance, and licensing policy.

* `tests/sdd-validation.test.mjs`
  Deterministic validation coverage for the v1 bootstrap.

## What is intentionally not here

The private `paw-foundation` handoffs and consolidated decision ledger are not part of this public repository.

They live locally under ignored `_inbox/` paths and are intentionally absent from Git history, branches, pull requests, releases, and clean clones.

That means a clean clone does not contain the private program inputs needed to run transformation patches. An authorized operator must restore the matching private files before executing those patches:

* `_inbox/final/**`
* `_inbox/decision_ledger.md`

An optional `_inbox/legacy/**` historical archive may also be present. Consult it only when the active handoff, live artifacts, and ledger do not resolve a question.

This separation is intentional. The public repo contains the bootstrap and governance surface. The private inbox contains transformation inputs that should not be published.

## Validation

The bootstrap has no runtime dependencies.

With a supported Node.js installation, run:

```bash
node sdd/tools/validate-sdd.mjs --fixtures
node --test tests/sdd-validation.test.mjs
```

## Roadmap

The next phase is the `paw-foundation` transformation program.

Its purpose is to turn the inherited v1 SDD bootstrap into a cleaner PAW foundation, including:

* a dedicated `paw/**` namespace;
* updated schema and validation rules;
* clearer documentation structure;
* portable packaging expectations;
* release and deployment foundations;
* removal or replacement of source-repo-bound references.

Until that work lands, treat this repository as a governed bootstrap, not as a ready-to-use framework.

## License

Unless a file or directory states otherwise, PAW is distributed under the Mozilla Public License 2.0 (`MPL-2.0`).

The bundled Codex skills are distributed under the same `MPL-2.0` project license. See `LICENSES/README.md` and `NOTICES.md`.

Using PAW does not automatically license a user's independent code, documents, or generated artifacts under MPL 2.0. See `docs/licensing/OUTPUT-POLICY.md`.
