# Backlog Fase 1: Superficie y modelo contractual de adopcion

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id: `paw-05-adapter-adoption-contracts`
* Patch kind: `spec`
* Lifecycle: `spec-anchored`
* Fase: 1 - Superficie y modelo contractual de adopcion
* Estado: `done`
* Ultima actualizacion: 2026-06-19
* Owner: sesion Codex activa con aprobacion humana
* Depende de: SDD preparation commit `d91d192`
* Desbloquea: Fase 2 - Schemas y validators de adapter contracts

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/patch.yaml`
* `sdd/parches/paw-05-adapter-adoption-contracts/definicion.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/plan.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/tasks.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/decision.log`
* `paw/core/README.md`
* `paw/catalogs/README.md`

---

## 2. Objetivo de la fase

* Resultado esperado: `paw/adoption/**` existe como superficie documental portable
  para contratos de adopcion, con limites claros frente a core, catalogos, tooling,
  tests, runtime adapters concretos y governance local.
* Razon de la fase: las fases posteriores necesitan una fuente viva donde anclar
  schemas, records, assessments y examples sin duplicar doctrina.
* Cambio que queda habilitado al cerrar: Fase 2 puede crear schemas de adapters
  contra una separacion conceptual ya documentada.

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica: crea `paw/adoption/**` y
  prepara registro documental minimo en `docs/README.md` y `docs/governance/ARCHITECTURE.md`.
* reconciliacion esperada: `paw/adoption/**` queda registrado como contrato portable
  materializado pero inactivo como automatizacion de adopcion.

### Si `patch_kind = batch`

* No aplica.

---

## 4. Assumptions

* `paw/adoption/**` puede existir como contrato portable sin activar workflows,
  writers, adapters concretos, installers o portability claims.
* La Fase 1 puede registrar la superficie en docs vivos aunque los validators se
  implementen en fases posteriores.
* No hay decisiones humanas pendientes para crear la superficie documental.

---

## 5. Precondiciones

### Documentos

* [x] `definicion.md`, `plan.md` y `tasks.md` existen y estan vigentes.
* [x] `decision.log` registra la politica provisional de commits y la superficie
  `paw/adoption/**`.

### Decisiones previas

* [x] Branch basada en cierre de `paw-04-catalogs-presets`.
* [x] SDD preparation commit creada antes de implementar.

### Estado tecnico

* [x] `paw/adoption/**` no existe antes de la fase.
* [x] `paw/catalogs/**` existe y esta validado como dependencia.

---

## 6. Alcance

### Si entra

* [x] Crear `paw/adoption/README.md`.
* [x] Crear `paw/adoption/adapters/README.md`.
* [x] Crear `paw/adoption/records/README.md`.
* [x] Crear `paw/adoption/assessments/README.md`.
* [x] Crear `paw/adoption/examples/README.md`.
* [x] Registrar la superficie en `docs/README.md`.
* [x] Agregar `Catalogs` / `Adoption` como capas separadas en `docs/governance/ARCHITECTURE.md` si falta.

### No entra

* [ ] Schemas JSON de adopcion.
* [ ] Validators o CLI de adopcion.
* [ ] Fixtures o tests de adopcion.
* [ ] Cambios en `paw/catalogs/**`.
* [ ] Runtime adapters concretos.
* [ ] `paw/parches/**` o writers v2.

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `docs/README.md`
* `docs/governance/ARCHITECTURE.md`
* `paw/core/README.md`
* `paw/catalogs/README.md`
* `paw/README.md`

### Editar

* `paw/adoption/README.md`
* `paw/adoption/adapters/README.md`
* `paw/adoption/records/README.md`
* `paw/adoption/assessments/README.md`
* `paw/adoption/examples/README.md`
* `docs/README.md`
* `docs/governance/ARCHITECTURE.md`
* `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase1.md`

### Validar

* `node sdd/tools/validate-sdd.mjs`
* `node paw/tools/validate-patches.mjs --json`
* `node paw/tools/validate-catalogs.mjs --json`
* `git diff --check`

### No tocar

* `paw/catalogs/**`
* `paw/core/**`
* `paw/tools/**`
* `paw/tests/**`
* `paw/parches/**`
* `.codex/**`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [x] Leer `docs/README.md` y confirmar como registrar nuevas superficies.
* [x] Leer `docs/governance/ARCHITECTURE.md` y confirmar capas existentes.
* [x] Leer `paw/core/README.md` para preservar limites del micro-core.
* [x] Leer `paw/catalogs/README.md` para preservar adoption-neutrality.

### Bloque B - Inspeccion de estado actual

* [x] Confirmar que `paw/adoption/**` no existe.
* [x] Confirmar que `docs/README.md` no registra aun `paw/adoption/**`.
* [x] Confirmar que arquitectura ya separa core, catalogs y runtime adapters.

### Bloque C - Edicion por archivo

* [x] Crear `paw/adoption/README.md` con status, contract map, ownership y boundaries.
* [x] Crear `paw/adoption/adapters/README.md` con responsabilidades separadas de repo,
  stack y runtime adapters.
* [x] Crear `paw/adoption/records/README.md` con binding metadata, resolution status,
  variants, exceptions y overrides.
* [x] Crear `paw/adoption/assessments/README.md` con comparacion preset/adoption/realidad.
* [x] Crear `paw/adoption/examples/README.md` con ejemplos esperados y limites.
* [x] Editar `docs/README.md` para registrar `paw/adoption/**` como authoritative
  contract surface con verification default automated.
* [x] Editar `docs/governance/ARCHITECTURE.md` para incluir Adoption contracts como
  capa separada de catalogs, tooling y runtime adapters.

### Bloque D - Registro de decisiones, hallazgos o blockers

* [x] Registrar hallazgo si alguna fuente viva contradice `paw/adoption/**`.
* [x] Registrar drift si docs vivos no pueden reconciliarse en esta fase.
* [x] No agregar nuevas decisiones si solo se ejecuta lo ya registrado en
  `decision.log`.

### Bloque E - Validacion

* [x] Ejecutar `node sdd/tools/validate-sdd.mjs`.
* [x] Ejecutar `node paw/tools/validate-patches.mjs --json`.
* [x] Ejecutar `node paw/tools/validate-catalogs.mjs --json`.
* [x] Ejecutar `git diff --check`.
* [x] Revisar manualmente que Fase 1 no agrego schemas, validators, fixtures ni
  activation claims.

### Bloque F - Cierre

* [x] Marcar checklist completo.
* [x] Registrar resultados de validacion.
* [x] Cambiar Estado a `done` si no quedan blockers.
* [x] Preparar commit `docs(adoption): add adoption contract surface`.

---

## 9. Drift detectado

* Fecha: 2026-06-19
  * hallazgo: `paw/adoption/**` no existia y las fuentes vivas no lo registraban.
  * impacto: la Fase 1 pudo crear la superficie sin reconciliar conflictos previos.
  * accion: se agregaron READMEs de adoption y registro en index/architecture.

---

## 10. Hallazgos durante ejecucion

* Ninguno registrado al crear el backlog.

---

## 11. Blockers

* Ninguno.

---

## 12. Decisiones tomadas

* Ninguna nueva durante backlog creation.

---

## 13. Validaciones

### Documentales

* [x] verificar alineacion con contratos aplicables

### Tecnicas

* [ ] `node sdd/tools/validate-sdd.mjs`
* [ ] `node paw/tools/validate-patches.mjs --json`
* [ ] `node paw/tools/validate-catalogs.mjs --json`
* [ ] `git diff --check`

### Manuales

* [x] revision manual de no activacion y limites de superficie

### Resultados

* Validacion:
  * comando o revision: `node sdd/tools/validate-sdd.mjs`
  * resultado esperado: pass
  * resultado obtenido: `SDD repo validation passed`
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-patches.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 5 patches; warnings transicionales de schema v1.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `node paw/tools/validate-catalogs.mjs --json`
  * resultado esperado: pass
  * resultado obtenido: pass; 8 families, 22 capabilities, 8 documentation presets,
    11 components, 10 concerns, 11 implementation presets, 17 variants, 31 sources.
  * estado: `pass`
  * notas: sin errores.
* Validacion:
  * comando o revision: `git diff --check`
  * resultado esperado: pass
  * resultado obtenido: pass con avisos LF/CRLF del checkout Windows.
  * estado: `pass`
  * notas: sin whitespace errors.

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

* Riesgo: lectores interpreten `paw/adoption/**` como automatizacion lista.
  Mitigacion: limites de no activacion registrados en README raiz y boundaries.

### Pendientes

* Fase 2 debe materializar schemas y validators de adapters.
