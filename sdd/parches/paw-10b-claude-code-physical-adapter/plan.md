# Plan: paw-10b-claude-code-physical-adapter

---

## Estado

- Change id: `paw-10b-claude-code-physical-adapter`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa
- Depende de: `paw-10-multiruntime-adapters` closed on `main`
- Desbloquea: `paw-10e-claude-code-distribution-adapter`, only if runtime
  validation supports `physical-adapter-candidate`

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-10b-claude-code-physical-adapter/patch.yaml`
- `sdd/parches/paw-10b-claude-code-physical-adapter/definicion.md`
- `sdd/parches/paw-10b-claude-code-physical-adapter/decision.log`
- `paw/adoption/adapters/runtime/claude-code.json`
- `paw/orchestration/**`
- `paw/distribution/**`
- `.codex/skills/paw-*`
- `_inbox/final/10-handoff-expansion/01_claude.md`

---

## 2. Lectura brownfield

- estructura existente: `paw-10` already created a declarative
  `claude-code.json` adapter, but the repo has no `.claude/**` physical surface.
- patrones existentes: candidate runtime skills under `.codex/skills/paw-*`
  provide compact `SKILL.md` files with status, load, do, do-not, and output
  sections.
- deuda o drift relevante: distribution docs currently enumerate `.codex/**`
  files; adding `.claude/**` may require manifest reconciliation if those files
  are distributed.
- restricciones tecnicas: active workflow remains `sdd-*`; `.claude/**` is a
  candidate adapter, not a workflow cutover.

---

## 3. Assumptions

- No critical assumptions beyond `definicion.md`.

---

## 4. Zonas afectadas

### Docs

- `paw/adoption/adapters/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/progressive-loading.md`
- `docs/governance/BOOTSTRAP-STATUS.md`

### Codigo

- `.claude/skills/paw-*/SKILL.md`
- `.claude/skills/paw-*/references/*.md`
- `.claude/agents/*.md`
- `paw/adoption/adapters/runtime/claude-code.json`

### Configuracion, tests o build

- `paw/distribution/distribution-manifest.json`, if `.claude/**` becomes part
  of the candidate package.
- `paw/tests/fixtures/adoption/adapters/**`, only if adapter evidence changes
  require new fixtures.

---

## 5. Bloques de implementacion

### Bloque 1 - Physical Claude skill layout

- Objetivo: create `.claude/skills/paw-*` for the PAW candidate operations.
- Superficies afectadas: `.claude/skills/**`.
- Cambios esperados: each skill has frontmatter `description`, candidate status,
  required load order, do/do-not rules, and output expectations.
- Dependencias: existing `.codex/skills/paw-*` patterns and PAW orchestration docs.
- Riesgos: implying active v2 behavior.
- Validaciones asociadas: structural file checks and markdown review.

### Bloque 2 - Advisory project subagents

- Objetivo: create a minimal advisory reviewer set under `.claude/agents/**`.
- Superficies afectadas: `.claude/agents/*.md`.
- Cambios esperados: read-only subagents with frontmatter and explicit no-decision
  rules.
- Dependencias: repo subagent policy and handoff constraints.
- Riesgos: hidden human decision delegation.
- Validaciones asociadas: frontmatter/manual structure review.

### Bloque 3 - Candidate docs and manifest reconciliation

- Objetivo: align live docs and candidate manifest if `.claude/**` is part of
  the distributable candidate file set.
- Superficies afectadas: distribution/adoption docs and manifest.
- Cambios esperados: candidate wording, no stable support, no default activation.
- Dependencias: finalized physical file list.
- Riesgos: distribution patch overlap with `paw-10e`.
- Validaciones asociadas: distribution validators if manifest changes.

### Bloque 4 - Validation and closure

- Objetivo: run relevant deterministic checks, classify manual Claude Code
  evidence, and close with the truthful physical state.
- Superficies afectadas: phase backlogs, `cierre.md`, `patch.yaml`.
- Cambios esperados: close as `physical-files-candidate` unless Claude runtime
  discovery is actually validated.
- Dependencias: Bloques 1-3 complete.
- Riesgos: blocked downstream distribution patch if runtime validation is absent.
- Validaciones asociadas: relevant AGENTS checks plus `git diff --check`.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados: adoption runtime adapter docs and
  distribution candidate inventory.
- Datos o contenido afectados: Claude declarative adapter may gain a
  `physical_adapter` evidence section.
- Schemas o modelos afectados: none expected.
- Compatibilidad esperada: existing adoption and distribution validators remain
  valid.

---

## 7. Validaciones previstas

### Documentales

- [x] verificar alineacion con `docs/README.md`
- [ ] verify no activation of `paw/parches/**`, `.agents/**`, Gemini CLI,
  releases, Pages, Actions, or deployment.

### Tecnicas

- [ ] structural inspection of `.claude/skills/*/SKILL.md`
- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-distribution.mjs --json`
- [ ] `node --test paw/tests/contract/adoption-adapters.test.mjs`
- [ ] `git diff --check`

### Manuales

- [ ] Claude Code runtime discovery and invocation, if available.

---

## 8. Riesgos y mitigaciones

- riesgo: no runtime validation.
  - impacto: downstream distribution patch remains gated.
  - mitigacion: close as `physical-files-candidate`, not
    `physical-adapter-candidate`.
- riesgo: file inventory drift.
  - impacto: distribution manifest may become stale.
  - mitigacion: reconcile only after final file list.

---

## 9. Decisiones humanas abiertas

- Estado: `none`

---

## 10. Criterio de cierre tecnico

- [x] el alcance respeta `definicion.md`
- [x] las zonas afectadas estan identificadas
- [x] los bloques de implementacion son secuenciables
- [x] las validaciones son reales y proporcionales
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] no hay decisiones abiertas que bloqueen la division en fases

---

## 11. Registro de cambios

- Fecha: 2026-06-21
  - cambio: plan tecnico brownfield creado.
  - razon: habilitar `sdd-tasks`.
