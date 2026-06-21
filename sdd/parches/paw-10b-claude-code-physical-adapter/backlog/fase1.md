# Backlog Fase 1: Materializar `.claude/**`

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id: `paw-10b-claude-code-physical-adapter`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 1 - Materializar `.claude/**`
* Estado: `done`
* Ultima actualizacion: 2026-06-21
* Owner: sesion Codex activa
* Depende de: baseline SDD commit `5a87cd6`
* Desbloquea: Fase 2 - Reconciliar adapter declarativo y docs

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/patch.yaml`
* `sdd/parches/paw-10b-claude-code-physical-adapter/definicion.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/plan.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/tasks.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/decision.log`
* `_inbox/final/10-handoff-expansion/01_claude.md`

---

## 2. Objetivo de la fase

* Resultado esperado: `.claude/skills/paw-*` and `.claude/agents/*.md` exist as candidate physical files.
* Razon de la fase: materialize the physical adapter before docs and manifest reconciliation.
* Cambio que queda habilitado al cerrar: Fase 2 can update declarative evidence and distribution inventory against a concrete file list.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: physical candidate adapter files only.
* reconciliacion esperada: record settings/hooks as deferred and keep all files candidate-only.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: not applicable.
* criterio global de cierre que esta fase acerca: not applicable.
* criterio de cierre por item: not applicable.
* split check: not applicable.

---

## 4. Assumptions

* No local Claude Code runtime execution is available in this phase.
* The phase can only establish physical files, not runtime discovery.

---

## 5. Precondiciones

### Documentos

* [x] artifacts vigentes

### Decisiones previas

* [x] baseline committed before execution
* [x] hooks deferred by `decision.log`
* [x] subagents advisory-only by `decision.log`

### Estado tecnico

* [x] `.claude/**` does not currently exist.

---

## 6. Alcance

### Si entra

* [x] create eight `.claude/skills/paw-*` skill files.
* [x] create shared references under `.claude/skills/paw-router/references/`.
* [x] create read-only/advisory Claude project subagents.

### No entra

* [x] create `.claude/settings.local.json`.
* [x] create executable hooks.
* [x] create Claude plugin or distribution package.
* [x] touch `.agents/**`, `.gemini/**`, or `.antigravity/**`.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `.codex/skills/paw-*/SKILL.md`
* `.codex/agents/sdd-*.toml`
* `paw/orchestration/workflow.md`

### Editar

* `.claude/skills/paw-*/SKILL.md`
* `.claude/skills/paw-router/references/*.md`
* `.claude/agents/*.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/backlog/fase1.md`

### Validar

* `.claude/skills/*/SKILL.md`
* `.claude/agents/*.md`
* `git diff --check`

### No tocar

* `.agents/**`
* `.gemini/**`
* `.antigravity/**`
* `paw/parches/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] read handoff layout and required skill list.
* [x] read existing Codex candidate skill pattern.

### Bloque B - Inspeccion de estado actual

* [x] confirm `.claude/**` does not exist before edits.

### Bloque C - Edicion por archivo

* [x] create required skill files with candidate-only wording.
* [x] create shared references for activation boundary and validation.
* [x] create advisory project subagents.
* [x] do not create `.claude/settings.json`; record deferred reason.
* [x] create `paw-conformance` instead of handoff-local `paw-verify`.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] record no blockers.
* [x] record settings/hooks deferred.

### Bloque E - Validacion

* [x] inspect each skill has frontmatter and description.
* [x] inspect each subagent has frontmatter and advisory limits.
* [x] run `git diff --check`.

### Bloque F - Cierre

* [x] mark phase done only after validation.

---

## 9. Drift detectado

* Fecha: 2026-06-21
  * fuente esperada: private handoff listed `.claude/skills/paw-verify/SKILL.md`.
  * diferencia encontrada: live workflow and Codex candidate skills use
    `paw-conformance`; `paw-verify` is not a governed operation.
  * impacto: materializing `paw-verify` would introduce contract drift.
  * accion: use `paw-conformance` and record decision.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-21
  * hallazgo: `.agents` exists locally as an empty or ignored directory, but it
    is not tracked and does not appear in `git status --short`.
  * impacto: no phase drift; this patch did not create `.agents/**`.
  * accion: keep `.agents/**` outside this patch.

---

## 11. Blockers

* [x] no blockers.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-21
  * decision: omit `.claude/settings.json` in phase 1.
  * razon: no minimal safe project-level config is required to expose project skills and advisory agents.
  * documentos o areas afectadas: `.claude/**`, closure evidence.
* Fecha: 2026-06-21
  * decision: replace `paw-verify` with `paw-conformance`.
  * razon: avoid introducing a new portable operation from private handoff wording.
  * documentos o areas afectadas: `.claude/skills/**`, SDD artifacts.

---

## 13. Validaciones

### Documentales

* [x] verify candidate wording and no default activation.

### Tecnicas

* [x] structural inspection of `.claude/skills/*/SKILL.md`.
* [x] structural inspection of `.claude/agents/*.md`.
* [x] `git diff --check`.

### Manuales

* [x] Claude Code discovery not executed in this phase.

### Resultados

* Validacion:
  * comando o revision: `Get-ChildItem -Recurse -File .claude`
  * resultado esperado: required `.claude/skills/**` and `.claude/agents/**`
    files exist.
  * resultado obtenido: pass; 15 files listed.
  * estado: `pass`
  * notas: no `.claude/settings.json` or `.claude/settings.local.json`.
* Validacion:
  * comando o revision: `Get-ChildItem -Path .claude/skills -Recurse -Filter SKILL.md | Select-String ...`
  * resultado esperado: every skill has frontmatter, description, status, and
    do-not boundaries.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: `paw-conformance` documents why `paw-verify` is not materialized.
* Validacion:
  * comando o revision: `Get-ChildItem -Path .claude/agents -Filter *.md | Select-String ...`
  * resultado esperado: agents have frontmatter and read-only/advisory limits.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: `paw-test-reviewer` allows Bash only for read-only inspection or
    explicit validation commands.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: no whitespace errors.
  * resultado obtenido: pass with line-ending warnings only.
  * estado: `pass`
  * notas: warnings are existing Git autocrlf notices.
* Validacion:
  * comando o revision: Claude Code runtime discovery.
  * resultado esperado: project skills visible and invocable in Claude Code.
  * resultado obtenido: not executed in this phase.
  * estado: `skipped`
  * notas: absence of runtime evidence caps closure at `physical-files-candidate`
    unless later manual validation is provided.

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

* risk: physical files may be mistaken for active PAW v2.
  * mitigacion: every skill and `.claude/README.md` states candidate-only and
    points active `paw-foundation` work to `sdd-*`.

### Pendientes

* reconcile declarative adapter and distribution inventory in Fase 2.
