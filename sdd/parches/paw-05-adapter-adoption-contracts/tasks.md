# Tasks: paw-05-adapter-adoption-contracts

---

## Estado

- Change id: `paw-05-adapter-adoption-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-19
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/paw-05-adapter-adoption-contracts/patch.yaml`
- `sdd/parches/paw-05-adapter-adoption-contracts/definicion.md`
- `sdd/parches/paw-05-adapter-adoption-contracts/plan.md`
- `sdd/parches/paw-05-adapter-adoption-contracts/decision.log`
- `paw/core/**`
- `paw/catalogs/**`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

El patch materializa una superficie portable de adopcion bajo `paw/adoption/**`,
schemas y validators bajo `paw/tools/**`, fixtures y tests bajo `paw/tests/**`, y
reconciliacion documental en `docs/**`. La implementacion se divide en cinco fases:
modelo contractual, adapters, adoption records/overrides, assessments/validacion de
referencias, y reconciliacion/cierre.

---

## 4. Fases

### Fase 1 - Superficie y modelo contractual de adopcion

- Objetivo: crear la base documental de `paw/adoption/**` y fijar las distinciones
  contractuales que guian el resto del patch.
- Origen en `plan.md`: Bloque 1.
- Precondiciones:
  - Branch basada en cierre de `paw-04`.
  - SDD preparation commit creado.
- Tareas:
  - Crear `paw/adoption/README.md` con status, ownership, boundaries y no activacion.
  - Crear guias iniciales para layers, resolution, adapters, records, assessments y
    examples.
  - Documentar las diferencias entre preset definition, adoption record, stack
    realization y assessment.
  - Registrar riesgos de drift si las guias duplican core o catalogos.
- Archivos o areas probables:
  - `paw/adoption/**`
  - `docs/README.md`
  - `docs/governance/ARCHITECTURE.md`
- Validaciones:
  - Revision documental de limites.
  - `node paw/tools/validate-patches.mjs --json`
  - `node sdd/tools/validate-sdd.mjs`
- Criterio de cierre:
  - `paw/adoption/**` existe como contrato orientativo sin schemas ejecutables aun.
  - La superficie esta registrada o el backlog registra por que se difiere hasta fase
    final.
  - No hay claims de activation, installation o portability.

### Fase 2 - Schemas y validators de adapter contracts

- Objetivo: implementar contratos validables para repo adapter, stack adapter y
  runtime adapter.
- Origen en `plan.md`: Bloque 2.
- Precondiciones:
  - Fase 1 cerrada y commit creada.
- Tareas:
  - Crear schemas de repo, stack y runtime adapter.
  - Crear validator de adapters con errores accionables.
  - Crear fixtures validos e invalidos para responsabilidades disjuntas.
  - Agregar tests contractuales para adapter boundaries.
  - Confirmar que runtime adapter no puede elegir stack y que stack adapter no puede
    declarar un preset reusable nuevo.
- Archivos o areas probables:
  - `paw/tools/schemas/adoption/*adapter*.schema.json`
  - `paw/tools/adoption/**`
  - `paw/tests/fixtures/adoption/adapters/**`
  - `paw/tests/contract/*adapter*.test.mjs`
- Validaciones:
  - Nuevo validator de adoption/adapters.
  - `node --test paw/tests/contract/*.test.mjs`
  - `node sdd/tools/validate-sdd.mjs`
- Criterio de cierre:
  - Los tres adapter types tienen schemas separados, fixtures validos/invalidos y
    tests que demuestran responsabilidades disjuntas.

### Fase 3 - Adoption records, binding, variants y overrides

- Objetivo: implementar schema y validacion para adoption records, binding metadata,
  variantes soportadas, excepciones locales y overrides controlados.
- Origen en `plan.md`: Bloque 3.
- Precondiciones:
  - Fase 2 cerrada y commit creada.
  - Catalogos de implementation presets disponibles.
- Tareas:
  - Crear `adoption-record.schema.json` y reglas compartidas de evidence/review.
  - Exigir aplicabilidad, `binding_mode`, `approval_policy`, `resolution_status`,
    responsable, evidencia y fecha de revision.
  - Validar parametro de envelope, variante soportada, excepcion local y necesidad
    de preset nuevo como disposiciones distintas.
  - Exigir override metadata completa y conformance impact.
  - Agregar fixtures de adopcion exacta, variante, excepcion, rechazo e invalidos.
- Archivos o areas probables:
  - `paw/adoption/records/**`
  - `paw/tools/schemas/adoption/adoption-record.schema.json`
  - `paw/tools/adoption/**`
  - `paw/tests/fixtures/adoption/records/**`
- Validaciones:
  - Nuevo validator de adoption records.
  - Tests contractuales de variants/overrides.
  - Catalog validation para referencias existentes.
- Criterio de cierre:
  - Un record valido puede expresar exact, variant, exception y rejection.
  - Un override sin owner, aprobador o revision falla de forma accionable.

### Fase 4 - Assessments, flows y referencias a catalogos

- Objetivo: implementar assessment schema, flujos greenfield/brownfield y validacion
  cruzada contra catalogos del patch 04.
- Origen en `plan.md`: Bloque 4.
- Precondiciones:
  - Fase 3 cerrada y commit creada.
- Tareas:
  - Crear `assessment.schema.json`.
  - Modelar stack realization como evidencia observada/materializada, no como preset.
  - Validar referencias a family, documentation preset, modifiers, implementation
    preset y variants.
  - Crear fixtures greenfield y brownfield con resolucion completa.
  - Agregar errores accionables para IDs desconocidos, conflictos y flows invalidos.
- Archivos o areas probables:
  - `paw/adoption/assessments/**`
  - `paw/adoption/examples/**`
  - `paw/tools/schemas/adoption/assessment.schema.json`
  - `paw/tests/fixtures/adoption/assessments/**`
  - `paw/tests/fixtures/adoption/examples/**`
- Validaciones:
  - `node paw/tools/validate-catalogs.mjs --json`
  - Nuevo validator de adoption fixtures.
  - `node --test paw/tests/contract/*.test.mjs`
- Criterio de cierre:
  - Greenfield y brownfield tienen fixtures verificables.
  - Referencias a catalogos desconocidas fallan.
  - Assessment compara preset, adoption decision y realidad sin seleccionar stack
    automaticamente.

### Fase 5 - Reconciliacion documental, conformance y cierre

- Objetivo: reconciliar fuentes vivas, integrar validaciones globales y cerrar el
  patch sin cambios sustantivos posteriores.
- Origen en `plan.md`: Bloque 5.
- Precondiciones:
  - Fases 1-4 cerradas y commits creadas.
- Tareas:
  - Actualizar `docs/README.md`, arquitectura, transicion y bootstrap status.
  - Actualizar `paw/README.md`, `paw/tools/README.md` y `paw/tests/README.md`.
  - Agregar conformance top-level si corresponde.
  - Ejecutar la matriz completa de validaciones.
  - Clasificar drift, riesgos residuales y pendientes.
  - Ejecutar `sdd-close` y crear commit de cierre independiente.
- Archivos o areas probables:
  - `docs/**`
  - `paw/**/README.md`
  - `tests/**`
  - `sdd/parches/paw-05-adapter-adoption-contracts/backlog/fase5.md`
  - `sdd/parches/paw-05-adapter-adoption-contracts/cierre.md`
- Validaciones:
  - Todas las validaciones globales listadas abajo.
  - Revision manual de no activacion.
- Criterio de cierre:
  - Fuentes vivas registran la nueva superficie y estado real.
  - Todos los durable rules/checks tienen destino vivo o diferimiento explicito.
  - `cierre.md` existe y la commit de cierre no contiene implementacion sustantiva.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fases 2, 3, 4 y 5.
- Fase 2 bloquea: Fases 3 y 4.
- Fase 3 bloquea: Fase 4.
- Fase 4 bloquea: Fase 5.
- Fase 5 bloquea: cierre del patch y cualquier PR o entrega posterior.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: ninguna.
- decisiones abiertas no bloqueantes: ninguna.
- condiciones de parada:
  - repo adapter contiene reglas universales;
  - stack adapter se convierte en preset implicito;
  - runtime adapter altera metodologia, docs requeridos, arquitectura o stack;
  - variantes y excepciones no pueden distinguirse;
  - overrides pueden persistir sin owner ni revision.

---

## 7. Validaciones globales

- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] `node paw/tools/validate-catalogs.mjs --json`
- [ ] `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] nuevo validator de adoption, si se introduce
- [ ] `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
- [ ] `git diff --check`
- [ ] revision manual de no activacion de workflow v2, runtime adapters concretos,
  installation, packaging, release automation o portability claims

---

## 8. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de
  cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales

---

## 9. Registro de cambios

- Fecha: 2026-06-19
  - cambio: tasks iniciales de patch 05.
  - razon: preparar la ejecucion posterior mediante `sdd-phase-backlog`.

