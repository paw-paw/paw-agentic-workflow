# Contributing to PAW

PAW is a pre-alpha bootstrap. Contributions must preserve the current transition boundaries and must not imply that PAW is portable, stable, packaged, or released.

## Before Starting

1. Read `docs/README.md` for the canonical documentation map and authority policy.
2. Read `AGENTS.md` for repository-local operating rules.
3. Read the authoritative document for the subject being changed.
4. Confirm whether the change requires the active v1 SDD workflow.

Substantial changes to governance, contracts, architecture, validation, compatibility, or public behavior require a formal workspace under `sdd/parches/<change-id>/`.

## Change Discipline

- Keep one governed patch per branch.
- Preserve the scope and artifact order of the active SDD workflow.
- Record significant decisions in the patch decision log.
- Reconcile durable rules into live authoritative documents before closing a patch.
- Treat implementation as evidence, not automatic authority.
- Do not mix unrelated cleanup into a governed patch.

## Naming and Transition

- Use `PAW` for the brand and `Paw's Agentic Workflow` for its expansion.
- Use `paw` for new technical identifiers.
- Preserve `sdd/**` and `sdd-*` when referring to the active or historical v1 implementation.
- Do not create `paw-*` runtime integrations or active `paw/parches/` workspaces before their owning patches.

See `docs/governance/NAMING.md` and `docs/governance/V1-TRANSITION.md`.

## Documentation

Distributed documentation is written in English. Patch workspaces and internal deliberation may use Spanish.

When adding or changing a governed document:

- register it in `docs/README.md`;
- declare its role, authority, owner, and verification default in the canonical registry;
- avoid duplicating repository-wide precedence;
- use links to authoritative sources instead of copying doctrine into operational guides.

## Validation

Run the checks listed in `AGENTS.md` and any additional validations named by the active patch. Report failures without weakening checks or reinterpreting the approved scope.

## Licensing and Private Inputs

Contributions use the repository's MPL-2.0 default unless a file states otherwise. Do not commit private `_inbox/**` material, secrets, personal content, generated output, or source-repository-only assets.
