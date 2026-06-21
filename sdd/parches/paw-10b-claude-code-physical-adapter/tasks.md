# Tasks: paw-10b-claude-code-physical-adapter

---

## Estado

- Change id: `paw-10b-claude-code-physical-adapter`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-21
- Owner: sesion Codex activa

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-10b-claude-code-physical-adapter/patch.yaml`
- `sdd/parches/paw-10b-claude-code-physical-adapter/definicion.md`
- `sdd/parches/paw-10b-claude-code-physical-adapter/plan.md`
- `sdd/parches/paw-10b-claude-code-physical-adapter/decision.log`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

- resumen: create a conservative `.claude/**` physical adapter candidate,
  reconcile docs/manifest if needed, validate, and close with the truthful
  physical state.

---

## 4. Fases

### Fase 1 - Materializar `.claude/**`

- Objetivo: create candidate Claude Code project skills and advisory subagents.
- Origen en `plan.md`: Bloques 1 y 2.
- Precondiciones: baseline SDD committed.
- Tareas:
  - create `.claude/skills/paw-*` operation skills.
  - create minimal references for workflow, activation boundary, and validation.
  - create advisory `.claude/agents/*.md` reviewers.
  - omit `.claude/settings.json` unless a safe shared setting is required.
- Archivos o areas probables: `.claude/**`.
- Validaciones: structural inspection of skill and agent frontmatter.
- Criterio de cierre: all required physical files exist, remain candidate-only,
  and do not activate PAW v2.

### Fase 2 - Reconciliar adapter declarativo y docs

- Objetivo: update live docs/data so the new physical files are represented
  without overclaiming support.
- Origen en `plan.md`: Bloque 3.
- Precondiciones: Fase 1 closed.
- Tareas:
  - update `paw/adoption/adapters/runtime/claude-code.json` if physical evidence
    changed.
  - update distribution/adoption docs only where the new files create drift.
  - update `paw/distribution/distribution-manifest.json` if `.claude/**` belongs
    to the candidate distribution inventory.
- Archivos o areas probables: `paw/adoption/**`, `paw/distribution/**`,
  governance status docs if needed.
- Validaciones: adoption and distribution validators as applicable.
- Criterio de cierre: docs and manifests truthfully describe physical files as
  candidate-only.

### Fase 3 - Validar y cerrar

- Objetivo: run deterministic checks, classify manual Claude runtime evidence,
  and close the patch.
- Origen en `plan.md`: Bloque 4.
- Precondiciones: Fases 1-2 closed and committed.
- Tareas:
  - run relevant validators and `git diff --check`.
  - record manual validation as executed or unavailable.
  - create `cierre.md`.
  - set `patch.yaml` to `closed`.
- Archivos o areas probables: SDD backlogs, `cierre.md`, `patch.yaml`.
- Validaciones: relevant AGENTS checks and closure review.
- Criterio de cierre: patch closed as `physical-files-candidate` or
  `physical-adapter-candidate` with evidence.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2.
- Fase 2 bloquea: Fase 3.
- Fase 3 bloquea: `paw-10e` unless the result is `physical-adapter-candidate`.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: none.
- decisiones abiertas no bloqueantes: none.

---

## 7. Validaciones globales

- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-distribution.mjs --json`
- [ ] `node --test paw/tests/contract/adoption-adapters.test.mjs`
- [ ] `git diff --check`

---

## 8. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio
  de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales

---

## 9. Registro de cambios

- Fecha: 2026-06-21
  - cambio: tasks inicial creado.
  - razon: habilitar backlogs de fase.
