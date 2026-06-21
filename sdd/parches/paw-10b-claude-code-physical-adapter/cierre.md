# Cierre: paw-10b-claude-code-physical-adapter

---

## Estado final

- Change id: `paw-10b-claude-code-physical-adapter`
- Status final: `closed`
- Resultado del adapter: `physical-files-candidate`
- Fecha de cierre: 2026-06-21
- Owner: sesion Codex activa

---

## 1. Resumen

El patch materializo un adapter fisico candidate para Claude Code bajo
`.claude/**`. La superficie incluye project skills PAW, supporting files de
routing/validacion, y project subagents read-only/advisory.

El patch no ejecuto Claude Code localmente para confirmar discovery o invocacion.
Por eso no se declara `physical-adapter-candidate`; el estado correcto es
`physical-files-candidate`.

---

## 2. Entregables

- SDD workspace completo en `sdd/parches/paw-10b-claude-code-physical-adapter/`.
- `.claude/README.md`.
- `.claude/skills/paw-router/SKILL.md`.
- `.claude/skills/paw-intake/SKILL.md`.
- `.claude/skills/paw-plan/SKILL.md`.
- `.claude/skills/paw-tasks/SKILL.md`.
- `.claude/skills/paw-phase-backlog/SKILL.md`.
- `.claude/skills/paw-execute-phase/SKILL.md`.
- `.claude/skills/paw-sync-drift/SKILL.md`.
- `.claude/skills/paw-conformance/SKILL.md`.
- `.claude/skills/paw-router/references/*.md`.
- `.claude/agents/paw-docs-checker.md`.
- `.claude/agents/paw-risk-reviewer.md`.
- `.claude/agents/paw-test-reviewer.md`.
- `paw/adoption/adapters/runtime/claude-code.json` updated.
- Distribution docs and manifest reconciled for `.claude/**` candidate files.

---

## 3. Decisions

- Execute on `main` without a branch, per human instruction.
- Omit executable hooks and shared `.claude/settings.json` for this physical
  candidate.
- Materialize only read-only/advisory project subagents.
- Replace private-handoff `paw-verify` with governed `paw-conformance` to avoid
  introducing a new portable operation by example.
- Include `.claude/**` in the manual candidate distribution manifest with
  `required_for_codex: false`.

---

## 4. Validation

Automated:

- `node paw/tools/validate-adoption.mjs --fixtures --json` - pass.
- `node paw/tools/validate-distribution.mjs --json` - pass.
- `node paw/tools/validate-patches.mjs --json` - pass with transitional schema
  v1 warnings only.
- `node --test paw/tests/contract/adoption-adapters.test.mjs` - pass, 6 tests.
- `git diff --check` - pass with Git autocrlf warnings only.

Manual:

- Structural review confirmed `.claude/skills/*/SKILL.md` frontmatter,
  candidate status, do-not boundaries, and no default activation language.
- Structural review confirmed `.claude/agents/*.md` frontmatter and read-only
  advisory limits.
- Claude Code runtime discovery and invocation were not executed.

---

## 5. Drift and Reconciliation

- The private handoff listed `paw-verify`, but the live workflow contract does
  not define it. The patch reconciled this by materializing `paw-conformance`.
- Existing distribution docs said `.claude/**` was not materialized by the
  distribution. The patch updated that boundary: `.claude/**` files may now be
  included as candidate runtime bindings, but not as a Claude plugin, stable
  support claim, or multi-runtime installer.

---

## 6. Residual Risk

- `paw-10e-claude-code-distribution-adapter` remains gated because this patch did
  not close as `physical-adapter-candidate`.
- A future governed validation must run Claude Code in the repo and verify skill
  discovery/invocation before promoting the Claude physical adapter state.
- The active workflow remains `sdd-*`; `.claude/**` does not activate PAW v2 or
  `paw/parches/**`.

---

## 7. Pending Work

- Do not execute `paw-10e` until `paw-10b` has runtime validation evidence or a
  human explicitly changes the gate.
- Continue with Antigravity only after resolving its `.agents/**` official
  surface ambiguity.
