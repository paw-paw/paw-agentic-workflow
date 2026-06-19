# Backlog Fase 5: Reconciliacion documental, conformance y cierre

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id: `paw-05-adapter-adoption-contracts`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 5 - Reconciliacion documental, conformance y cierre
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa con aprobacion humana
* Depende de: Fases 1-4 cerradas y commiteadas
* Desbloquea: `sdd-close`

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `README.md`
* `docs/governance/ARCHITECTURE.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/README.md`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `tests/*`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase1.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase2.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase3.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase4.md`

---

## 2. Objetivo de la fase

* Resultado esperado: live docs, tools/tests docs y conformance reflejan adoption
  contracts, schemas, fixtures y validators sin activar workflow v2.
* Razon de la fase: las reglas durables introducidas deben quedar promovidas a
  fuentes vivas antes del cierre.
* Cambio que queda habilitado al cerrar: `sdd-close` puede producir `cierre.md`.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: README, AGENTS, governance,
  PAW layout docs, tools/tests docs y conformance tests.
* reconciliacion esperada: adoption aparece como materialized contract surface, no
  como automation, runtime adapter concreto ni portability claim.

### Si `patch_kind = batch`

* No aplica.

---

## 4. Assumptions

* El validator de adoption debe añadirse a comandos deterministas porque ya existe y
  cubre fixtures.
* La falla previa de `tests/core-contracts.test.mjs` por CRLF es validation drift
  local y puede corregirse en conformance para soportar checkout Windows.

---

## 5. Precondiciones

### Documentos

* [x] Backlogs de Fases 1-4 estan `done`.

### Decisiones previas

* [x] Politica provisional de commits registrada.

### Estado tecnico

* [x] Adoption validator pasa sobre fixtures antes de reconciliacion.

---

## 6. Alcance

### Si entra

* [x] Actualizar README y AGENTS con comandos adoption.
* [x] Actualizar V1 transition, bootstrap status, paw README, tools README y tests README.
* [x] Agregar conformance de adoption.
* [x] Corregir validation drift CRLF en core contract test.
* [x] Ejecutar matriz completa.
* [x] Preparar `sdd-close`.

### No entra

* [ ] Implementacion sustantiva nueva de adoption contracts.
* [ ] Nuevos fixtures de dominio.
* [ ] Packaging, CI, runtime adapters concretos o PR automation.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `README.md`
* `AGENTS.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/README.md`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `tests/core-contracts.test.mjs`

### Editar

* `README.md`
* `AGENTS.md`
* `docs/governance/V1-TRANSITION.md`
* `docs/governance/BOOTSTRAP-STATUS.md`
* `paw/README.md`
* `paw/tools/README.md`
* `paw/tests/README.md`
* `tests/adoption-conformance.test.mjs`
* `tests/core-contracts.test.mjs`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase5.md`

### Validar

* Todas las validaciones listadas en `AGENTS.md`, mas `node paw/tools/validate-adoption.mjs --fixtures --json`.

### No tocar

* `paw/catalogs/**`
* `paw/core/**` salvo que validacion demuestre drift contractual real
* `paw/parches/**`
* `.codex/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] Leer live docs y tools/tests docs.
* [x] Leer `tests/core-contracts.test.mjs` para ubicar drift CRLF.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar que live docs aun no listan adoption como implementado.
* [x] Confirmar que adoption validator no esta en comandos deterministas.
* [x] Confirmar que core conformance falla por regex LF-only.

### Bloque C - Edicion por archivo

* [x] Actualizar README validation list con adoption validator y tests adoption.
* [x] Actualizar AGENTS validation list con adoption validator y tests adoption.
* [x] Actualizar V1 transition target inventory.
* [x] Actualizar bootstrap status implemented/not implemented.
* [x] Actualizar paw README map.
* [x] Actualizar tools README materialized surface y CLI.
* [x] Actualizar tests README materialized surface.
* [x] Crear adoption conformance test.
* [x] Ajustar core conformance para aceptar CRLF en fenced YAML.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar drift CRLF en backlog.
* [x] Registrar hallazgos de reconciliacion.

### Bloque E - Validacion

* [x] Ejecutar `node sdd/tools/validate-sdd.mjs`.
* [x] Ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`.
* [x] Ejecutar `node paw/tools/validate-patches.mjs --json`.
* [x] Ejecutar `node paw/tools/validate-patches.mjs --fixtures --json`.
* [x] Ejecutar `node paw/tools/validate-catalogs.mjs --json`.
* [x] Ejecutar `node paw/tools/validate-catalogs.mjs --fixtures --json`.
* [x] Ejecutar `node paw/tools/validate-adoption.mjs --fixtures --json`.
* [x] Ejecutar `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`.
* [x] Ejecutar `git diff --check`.
* [x] Revision manual de no activacion.

### Bloque F - Cierre

* [x] Marcar checklist completo.
* [x] Registrar resultados de validacion.
* [x] Cambiar Estado a `done` si no quedan blockers.
* [x] Preparar commit `docs(adoption): reconcile adoption validation`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * fuente esperada: patch fixture runner debe validar solo fixtures de patch.
  * diferencia encontrada: tras agregar `paw/tests/fixtures/adoption/**`, el runner
    de patch fixtures intento leer expected files de adoption como patch manifests.
  * impacto: `node paw/tools/validate-patches.mjs --fixtures --json` fallaba con
    mismatches falsos.
  * accion: `paw/tools/validation/validate-fixtures.mjs` y su test contractual ahora
    excluyen `/adoption/`, igual que ya excluian `/catalogs/`.
  * requiere decision: `no`
* Fecha: 2026-06-19
  * fuente esperada: conformance debe ser estable en checkout Windows.
  * diferencia encontrada: `tests/core-contracts.test.mjs` buscaba fenced YAML con
    LF exacto y fallaba con CRLF.
  * impacto: la suite global fallaba sin drift contractual.
  * accion: regex ajustado a `\r?\n`.
  * requiere decision: `no`

---

## 10. Hallazgos durante ejecucion

* Fecha: 2026-06-19
  * hallazgo: docs vivos listaban catalogs y schema validation, pero no adoption
    contracts ni adoption validator.
  * impacto: cierre habria dejado reglas durables sin promocion visible.
  * accion: README, AGENTS, transition, bootstrap, PAW tools/tests docs y conformance
    fueron reconciliados.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna nueva durante backlog creation.

---

## 13. Validaciones

### Documentales

* [x] verificar docs vivos sin activation claims

### Tecnicas

* [x] matriz completa

### Manuales

* [x] revision manual de no activacion

### Resultados

* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: `SDD repo validation passed`
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs --fixtures`
  * resultado esperado: pass
  * resultado obtenido: `SDD fixture validation passed`
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 5 patches; warnings transicionales de schema v1.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 20 patch fixtures.
  * estado: `pass`
  * notas: adoption fixtures excluidos por dominio.
* Validacion:
  * comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass; catalogos intactos.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-catalogs.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 15 catalog fixtures.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 6 adapter, 6 record y 5 assessment fixtures.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  * resultado esperado: pass
  * resultado obtenido: 82 tests, 82 pass.
  * estado: `pass`
  * notas: incluye adoption conformance y CRLF-safe core conformance.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: pass
  * resultado obtenido: pass con avisos LF/CRLF del checkout Windows.
  * estado: `pass`
  * notas: sin whitespace errors.
* Validacion:
  * comando o revision: revision manual de no activacion.
  * resultado esperado: no v2 workspace, no runtime adapters concretos, no packaging
    ni portability claims.
  * resultado obtenido: conforme.
  * estado: `pass`
  * notas: docs vivos describen materializacion, no activacion.

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

* Riesgo: docs vivos puedan leerse como activacion de adoption automation.
  Mitigacion: repetir que contracts/validators no activan workflow ni portability.

### Pendientes

* Ejecutar `sdd-close` despues de la commit de fase.
