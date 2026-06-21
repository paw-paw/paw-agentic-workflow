# Backlog Fase 1: Materializar `.agents/**`

---

## Estado

* Change id: `paw-10c-antigravity-first-physical-adapter`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 1 - Materializar `.agents/**`
* Estado: `done`
* Ultima actualizacion: 2026-06-21
* Owner: sesion Codex activa
* Depende de: baseline SDD commit `15ee6c8`
* Desbloquea: Fase 2 - Reconciliar evidencia

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-10c-antigravity-first-physical-adapter/patch.yaml`
* `sdd/parches/paw-10c-antigravity-first-physical-adapter/definicion.md`
* `sdd/parches/paw-10c-antigravity-first-physical-adapter/plan.md`
* `sdd/parches/paw-10c-antigravity-first-physical-adapter/tasks.md`
* `sdd/parches/paw-10c-antigravity-first-physical-adapter/decision.log`

---

## 2. Objetivo de la fase

* Resultado esperado: `.agents/**` candidate files exist.
* Razon de la fase: create concrete Antigravity physical files before evidence reconciliation.
* Cambio que queda habilitado al cerrar: adapter JSON and distribution inventory can reference real files.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: candidate runtime files only.
* reconciliacion esperada: close as physical files unless runtime validation exists.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: not applicable.
* criterio global de cierre que esta fase acerca: not applicable.
* criterio de cierre por item: not applicable.
* split check: not applicable.

---

## 4. Assumptions

* Antigravity runtime discovery is unavailable in this session.

---

## 5. Precondiciones

### Documentos

* [x] SDD baseline committed.

### Decisiones previas

* [x] `.agents/**` is candidate Antigravity surface only.
* [x] `paw-conformance` replaces `paw-verify`.

### Estado tecnico

* [x] no tracked `.agents/**` files existed before this phase.

---

## 6. Alcance

### Si entra

* [x] create `.agents/skills/paw-*`.
* [x] create `.agents/rules/paw-*.md`.
* [x] create thin `.agents/workflows/paw-diagnose.md`.

### No entra

* [x] hooks.
* [x] plugin/bundle.
* [x] `.gemini/**`.
* [x] `.antigravity/**`.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `.claude/skills/**`
* `.codex/skills/paw-*`

### Editar

* `.agents/**`
* this backlog

### Validar

* structural inspection.
* `git diff --check`.

### No tocar

* `.gemini/**`
* `.antigravity/**`
* `paw/parches/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] read handoff and existing candidate skill patterns.

### Bloque B - Inspeccion de estado actual

* [x] confirm `.agents/**` had no tracked files.

### Bloque C - Edicion por archivo

* [x] create skills.
* [x] create rules.
* [x] create workflow hint.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] record no blockers for file creation.

### Bloque E - Validacion

* [x] inspect file list.
* [x] run `git diff --check`.

### Bloque F - Cierre

* [x] mark done.

---

## 9. Drift detectado

* None unresolved.

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-21
  * hallazgo: `.agents/**` can be tracked; the preexisting local `.agents` folder was empty.
  * impacto: physical files can be materialized for Antigravity candidate evidence.
  * accion: create candidate files with no default activation claims.

---

## 11. Blockers

* [x] no blockers for file materialization.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-21
  * decision: omit hooks and config files.
  * razon: not required for physical-files-candidate and not runtime validated.
  * documentos o areas afectadas: `.agents/**`.

---

## 13. Validaciones

### Documentales

* [x] candidate wording and no Gemini CLI review.

### Tecnicas

* [x] structural inspection.
* [x] `git diff --check`.

### Manuales

* [x] Antigravity runtime discovery skipped.

### Resultados

* Validacion:
  * comando o revision: `Get-ChildItem -Recurse -File .agents`
  * resultado esperado: candidate skills, rules, and workflow files exist.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: no `.gemini/**` or `.antigravity/**`.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: no whitespace errors.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: line-ending warnings only when present.

---

## 14. Cierre

La fase solo se considera cerrada si:

* [x] checklist completo o pendientes explicitamente diferidos
* [x] assumptions criticas resueltas, aceptadas o escaladas
* [x] decisiones relevantes registradas
* [x] blockers resueltos o diferidos con razon
* [x] drift documentado o resuelto
* [x] validaciones requeridas ejecutadas o justificadas
* [x] resultados de validacion registrados

---

## 15. Riesgos y pendientes

### Riesgos

* risk: `.agents/**` could be mistaken for validated support.
  * mitigacion: docs and closure classify physical files only.

### Pendientes

* reconcile adapter JSON and manifest in Fase 2.
