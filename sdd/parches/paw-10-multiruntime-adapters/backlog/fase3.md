# Backlog Fase 3: Distribution and progressive loading reconciliation

---

## Estado

* Change id: `paw-10-multiruntime-adapters`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: `3 - Distribution and progressive loading reconciliation`
* Estado: `done`
* Ultima actualizacion: 2026-06-21
* Owner: sesion Codex activa
* Depende de: Fase 2 done
* Desbloquea: Fase 4

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-10-multiruntime-adapters/tasks.md`
* `paw/distribution/README.md`
* `paw/distribution/manifest.md`
* `paw/distribution/progressive-loading.md`
* `paw/distribution/distribution-manifest.json`

---

## 2. Objetivo de la fase

* Resultado esperado: distribution manifest and loading docs include the new
  runtime adapter evidence without claiming physical installation for
  Claude Code or Antigravity.
* Razon de la fase: modified distributed files and new adapter evidence must not
  leave stale checksums or unclear loading rules.
* Cambio que queda habilitado al cerrar: integral validation can run with a fresh
  distribution manifest.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: `paw/distribution/**`.
* reconciliacion esperada: distribution remains candidate and Codex-oriented for
  installable runtime files, while carrying runtime adapter evidence as declared
  contract/test data.

### Si `patch_kind = batch`

* no aplica.

---

## 4. Assumptions

* Distribution manifest may include adoption adapter evidence without promising
  installed Claude Code or Antigravity runtime files.

---

## 5. Precondiciones

### Documentos

* [x] Fase 2 docs completed.

### Decisiones previas

* [x] no packaging or release stable claim.

### Estado tecnico

* [x] distribution validation failed before reconciliation with checksum drift,
  as expected after changing distributed files.

---

## 6. Alcance

### Si entra

* [x] update distribution manifest checksums.
* [x] include new runtime adapter evidence and fixtures in the manifest.
* [x] update distribution docs for progressive runtime loading.

### No entra

* [x] create package manager, marketplace, or runtime installers.
* [x] claim physical Antigravity support.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `paw/distribution/manifest.md`
* `paw/distribution/progressive-loading.md`
* `paw/distribution/distribution-manifest.json`

### Editar

* same as read-before-edit list.

### Validar

* `node paw/tools/validate-distribution.mjs --json`
* `node paw/tools/validate-distribution.mjs --fixtures --json`
* `node --test paw/tests/contract/distribution-validation.test.mjs`
* `node --test paw/tests/contract/distribution-installation.test.mjs`

### No tocar

* `.claude/**`
* `.antigravity/**`
* package manager or release automation files

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] read distribution docs and validator error output.

### Bloque B - Inspeccion de estado actual

* [x] identify stale checksum errors and new files missing from manifest.

### Bloque C - Edicion por archivo

* [x] regenerate manifest checksums and add adapter evidence files.
* [x] update distribution manifest docs.
* [x] update progressive loading docs.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] record distribution remains candidate and Codex installable surface only.

### Bloque E - Validacion

* [x] run phase validations.

### Bloque F - Cierre

* [x] mark phase done.

---

## 9. Drift detectado

* Fecha: 2026-06-21
  * fuente esperada: distribution manifest checksums match declared files.
  * diferencia encontrada: `validate-distribution --json` reported checksum
    mismatches after Fase 1 and Fase 2 edits.
  * impacto: candidate distribution invalid until manifest refresh.
  * accion: regenerate checksums and add new adapter evidence files.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-21
  * hallazgo: Claude Code and Antigravity adapter evidence can be distributed as
    `paw/adoption/**` contract/test data without shipping `.claude/**` or
    `.antigravity/**` runtime files.
  * impacto: manifest can include evidence while avoiding a multiruntime
    installation claim.
  * accion: document boundary in `manifest.md` and `progressive-loading.md`.

---

## 11. Blockers

* [x] none.

---

## 12. Decisiones tomadas

* Fecha: 2026-06-21
  * decision: bump distribution candidate version to `0.1.0-candidate.10`.
  * razon: declared distribution manifest now includes patch 10 adapter evidence.
  * documentos o areas afectadas: `paw/distribution/distribution-manifest.json`.

---

## 13. Validaciones

### Documentales

* [x] manual review no stable release or package claim.

### Tecnicas

* [x] `node paw/tools/validate-distribution.mjs --json`
* [x] `node paw/tools/validate-distribution.mjs --fixtures --json`
* [x] `node --test paw/tests/contract/distribution-validation.test.mjs`
* [x] `node --test paw/tests/contract/distribution-installation.test.mjs`

### Manuales

* [x] review that Antigravity physical install remains blocked.

### Resultados

* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 349 manifest entries
  * estado: `pass`
  * notas: initial checksum drift was resolved by regenerating manifest checksums.
* Validacion:
  * comando o revision: `node paw/tools/validate-distribution.mjs --fixtures --json`
  * resultado esperado: `status: pass`
  * resultado obtenido: `status: pass`, 4 fixtures
  * estado: `pass`
  * notas: release and exclusion boundaries unchanged.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/distribution-validation.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 4 tests pass
  * estado: `pass`
  * notas: canonical manifest valid after checksum refresh.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/distribution-installation.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 6 tests pass
  * estado: `pass`
  * notas: install/uninstall planning remains safe.

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

* risk: users may read adapter evidence as installed runtime support; mitigated
  in `manifest.md`, `progressive-loading.md`, and Antigravity gap disposition.

### Pendientes

* pending: integral validation and closure.
