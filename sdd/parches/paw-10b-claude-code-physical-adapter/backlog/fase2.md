# Backlog Fase 2: Reconciliar adapter declarativo y docs

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id: `paw-10b-claude-code-physical-adapter`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 2 - Reconciliar adapter declarativo y docs
* Estado: `done`
* Ultima actualizacion: 2026-06-21
* Owner: sesion Codex activa
* Depende de: Fase 1 commit `3b4864c`
* Desbloquea: Fase 3 - Validar y cerrar

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/patch.yaml`
* `sdd/parches/paw-10b-claude-code-physical-adapter/definicion.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/plan.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/tasks.md`
* `sdd/parches/paw-10b-claude-code-physical-adapter/decision.log`
* `.claude/**`
* `paw/adoption/adapters/runtime/claude-code.json`
* `paw/distribution/manifest.md`
* `paw/distribution/progressive-loading.md`
* `paw/distribution/distribution-manifest.json`

---

## 2. Objetivo de la fase

* Resultado esperado: live adapter evidence and candidate distribution inventory describe the new `.claude/**` files truthfully.
* Razon de la fase: new physical files create drift unless represented in declarative adapter and distribution surfaces.
* Cambio que queda habilitado al cerrar: final validation and closure can classify the physical state.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: adoption runtime adapter evidence and distribution candidate inventory.
* reconciliacion esperada: `.claude/**` is candidate, optional for Codex, and does not activate PAW v2.

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase: not applicable.
* criterio global de cierre que esta fase acerca: not applicable.
* criterio de cierre por item: not applicable.
* split check: not applicable.

---

## 4. Assumptions

* `.claude/**` should be included in the candidate distribution manifest because the physical adapter files are versioned repo assets.
* `required_for_codex` remains `false` for `.claude/**` entries.

---

## 5. Precondiciones

### Documentos

* [x] Fase 1 backlog done.

### Decisiones previas

* [x] `paw-conformance` replaces `paw-verify`.
* [x] settings/hooks are deferred.

### Estado tecnico

* [x] `.claude/**` files exist.

---

## 6. Alcance

### Si entra

* [x] update Claude runtime adapter JSON to record materialized physical files.
* [x] update distribution docs for `.claude/**` candidate files.
* [x] update distribution manifest entries and checksums.

### No entra

* [x] create Claude plugin distribution.
* [x] create Antigravity files.
* [x] change runtime adapter schema.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/tools/distribution/validate-distribution-manifest.mjs`
* `paw/tools/schemas/distribution/distribution-manifest.schema.json`
* `paw/adoption/adapters/runtime/claude-code.json`

### Editar

* `paw/adoption/adapters/runtime/claude-code.json`
* `paw/distribution/manifest.md`
* `paw/distribution/progressive-loading.md`
* `paw/distribution/distribution-manifest.json`
* `sdd/parches/paw-10b-claude-code-physical-adapter/backlog/fase2.md`

### Validar

* `node paw/tools/validate-adoption.mjs --fixtures --json`
* `node paw/tools/validate-distribution.mjs --json`
* `node --test paw/tests/contract/adoption-adapters.test.mjs`
* `git diff --check`

### No tocar

* `.agents/**`
* `.gemini/**`
* `.antigravity/**`
* `paw/parches/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] read distribution manifest schema and validator.
* [x] read current Claude runtime adapter JSON.

### Bloque B - Inspeccion de estado actual

* [x] confirm manifest requires file-level checksums.

### Bloque C - Edicion por archivo

* [x] update `claude-code.json` physical evidence and gap disposition.
* [x] update distribution docs with `.claude/**` candidate boundary.
* [x] update `distribution-manifest.json` with checksums for `.claude/**`.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] record no blockers.
* [x] record manifest inclusion rationale.

### Bloque E - Validacion

* [x] run adoption validator and adapter test.
* [x] run distribution validator.
* [x] run `git diff --check`.

### Bloque F - Cierre

* [x] mark phase done only after validation.

---

## 9. Drift detectado

* None.

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-21
  * hallazgo: `distribution-manifest.json` required checksum refresh for docs
    and adapter JSON changed by this phase.
  * impacto: first distribution validation failed with checksum mismatch.
  * accion: regenerated SHA-256 values for all manifest entries.

---

## 11. Blockers

* [x] no blockers.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-21
  * decision: include `.claude/**` physical adapter files in the manual candidate distribution manifest with `required_for_codex: false`.
  * razon: the files are repo-versioned candidate runtime bindings, but they are not required for Codex operation.
  * documentos o areas afectadas: `paw/distribution/distribution-manifest.json`, distribution docs.

---

## 13. Validaciones

### Documentales

* [x] candidate wording and no-default-activation review.

### Tecnicas

* [x] `node paw/tools/validate-adoption.mjs --fixtures --json`
* [x] `node paw/tools/validate-distribution.mjs --json`
* [x] `node --test paw/tests/contract/adoption-adapters.test.mjs`
* [x] `git diff --check`

### Manuales

* [x] manual review that distribution entries are not plugin packaging.

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: pass.
  * resultado obtenido: pass.
  * estado: `pass`
  * notas: adapter fixture count remains 11.
* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --json`
  * resultado esperado: pass.
  * resultado obtenido: pass after checksum refresh.
  * estado: `pass`
  * notas: manifest file count 364.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/adoption-adapters.test.mjs`
  * resultado esperado: pass.
  * resultado obtenido: pass, 6 tests.
  * estado: `pass`
  * notas: runtime adapter boundary tests unchanged.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: no whitespace errors.
  * resultado obtenido: pass with line-ending warnings only.
  * estado: `pass`
  * notas: warnings are Git autocrlf notices.

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

* risk: distribution entries could be mistaken for a Claude plugin package.
  * mitigacion: docs state `.claude/**` inclusion is not a Claude plugin,
    marketplace package, stable release, or multi-runtime installer.

### Pendientes

* final closure must classify runtime discovery as skipped unless manually validated.
