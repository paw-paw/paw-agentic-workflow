# Tasks: paw-06-workflow-conformance

---

## Estado

- Change id: `paw-06-workflow-conformance`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-backlog`
- Ultima actualizacion: 2026-06-19
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `sdd/parches/paw-06-workflow-conformance/patch.yaml`
- `sdd/parches/paw-06-workflow-conformance/definicion.md`
- `sdd/parches/paw-06-workflow-conformance/plan.md`
- `sdd/parches/paw-06-workflow-conformance/decision.log`
- `_inbox/final/06-workflow-bootstrap-conformance-handoff.md`
- `_inbox/final/README.md`
- `_inbox/final/patch-execution-guide.md`

---

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes

---

## 3. Resumen del plan

El patch materializa contratos portables e inactivos para workflow, bootstrap
documental y conformance bajo las superficies PAW existentes. La ejecucion se
divide en contratos documentales, schemas y validadores, fixtures y tests,
reconciliacion documental, y cierre SDD. Cada fase debe dejar el repo en un estado
validable y no puede activar `paw/parches/**`, writers v2, runtime adapters,
instalacion, CI ni publicacion.

---

## 4. Fases

### Fase 1 - Workflow and bootstrap contracts

- Objetivo: materializar los contratos portables de operaciones `paw-*`, state
  machine, routing y bootstrap discover/define/write sin runtime bindings.
- Origen en `plan.md`: Bloques 1 y 2.
- Precondiciones:
  - preparacion SDD commiteada;
  - `paw/orchestration/README.md` sigue como superficie inactiva;
  - no hay decision humana abierta sobre ubicacion de contratos.
- Tareas:
  - crear documentos contractuales bajo `paw/orchestration/**` para workflow,
    bootstrap y conformance ownership inicial;
  - definir operaciones, estados, precondiciones, inputs, outputs, readiness,
    transiciones invalidas, loop handling y missing-artifact handling;
  - definir bootstrap discover, define y write con artifacts, gates, `creates_docs`
    y write report;
  - ajustar solo los documentos core necesarios para authority, gates, drift y
    lifecycle cuando el contrato de bootstrap los referencie;
  - registrar la nueva autoridad en `docs/README.md` sin activar workflow v2.
- Archivos o areas probables:
  - `paw/orchestration/README.md`
  - `paw/orchestration/workflow.md`
  - `paw/orchestration/bootstrap.md`
  - `paw/orchestration/conformance.md`
  - `paw/core/artifact-lifecycle.md`
  - `paw/core/authority-and-evidence.md`
  - `paw/core/decision-gates.md`
  - `paw/core/drift-policy.md`
  - `docs/README.md`
- Validaciones:
  - `node sdd/tools/validate-sdd.mjs`
  - `node paw/tools/validate-patches.mjs --json`
  - `git diff --check`
  - revision manual de no activacion y no dependencia de `.codex/**`.
- Criterio de cierre:
  - contratos vivos creados y registrados;
  - discover no crea autoridad, define no escribe contratos finales y write exige
    gate humano;
  - backlog actualizado con validaciones, hallazgos y cierre.

### Fase 2 - Workflow schemas and validator

- Objetivo: agregar schemas, validator y CLI para validar forma, referencias,
  transiciones y conformance del dominio workflow.
- Origen en `plan.md`: Bloques 3 y 4.
- Precondiciones:
  - Fase 1 cerrada y commiteada;
  - contratos documentales de workflow y bootstrap disponibles como autoridad.
- Tareas:
  - crear schemas JSON bajo `paw/tools/schemas/workflow/**`;
  - implementar validator Node.js bajo `paw/tools/workflow/**`;
  - exponer CLI `paw/tools/validate-workflow.mjs` con salida consistente con los
    validators existentes;
  - validar roles documentales, reglas, checks, enforcement, manual evidence,
    bootstrap gates, estados, transiciones imposibles y loops;
  - actualizar `paw/tools/README.md`.
- Archivos o areas probables:
  - `paw/tools/schemas/workflow/*.schema.json`
  - `paw/tools/workflow/*.mjs`
  - `paw/tools/validate-workflow.mjs`
  - `paw/tools/README.md`
- Validaciones:
  - `node paw/tools/validate-workflow.mjs --json`
  - `node paw/tools/validate-workflow.mjs --help`
  - `node paw/tools/validate-workflow.mjs --version`
  - `git diff --check`
- Criterio de cierre:
  - CLI devuelve estado estructurado;
  - validator no escribe runtime state;
  - no se introducen dependencias externas.

### Fase 3 - Workflow fixtures and contract tests

- Objetivo: cubrir con fixtures y tests los casos completos e incompletos de
  workflow, bootstrap y conformance.
- Origen en `plan.md`: Bloques 3 y 4.
- Precondiciones:
  - Fase 2 cerrada y commiteada;
  - validator de workflow disponible.
- Tareas:
  - crear fixtures validos e invalidos bajo `paw/tests/fixtures/workflow/**`;
  - cubrir loops, estados imposibles, artifacts faltantes, write sin gate,
    `creates_docs` violado, evidence manual incompleta, gaps aceptados y drift de
    roles;
  - crear tests contractuales bajo `paw/tests/contract/**`;
  - actualizar `paw/tests/README.md`;
  - agregar el nuevo validator a la lista deterministica en `AGENTS.md` si queda
    como check requerido por el patch.
- Archivos o areas probables:
  - `paw/tests/fixtures/workflow/**`
  - `paw/tests/contract/workflow-validation.test.mjs`
  - `paw/tests/contract/workflow-cli.test.mjs`
  - `paw/tests/README.md`
  - `AGENTS.md`
- Validaciones:
  - `node paw/tools/validate-workflow.mjs --fixtures --json`
  - `node --test paw/tests/contract/workflow-validation.test.mjs`
  - `node --test paw/tests/contract/workflow-cli.test.mjs`
  - `git diff --check`
- Criterio de cierre:
  - fixtures prueban aceptacion y rechazo esperados;
  - tests pasan y no sustituyen autoridad documental.

### Fase 4 - Governance reconciliation and full validation

- Objetivo: reconciliar documentos vivos, estado bootstrap y checks globales tras
  materializar workflow/conformance.
- Origen en `plan.md`: Bloque 5.
- Precondiciones:
  - Fases 1 a 3 cerradas y commiteadas;
  - no hay drift bloqueante pendiente.
- Tareas:
  - actualizar `docs/governance/ARCHITECTURE.md`,
    `docs/governance/V1-TRANSITION.md`, `docs/governance/BOOTSTRAP-STATUS.md` y
    `paw/README.md`;
  - verificar que `docs/README.md`, `paw/orchestration/README.md`,
    `paw/tools/README.md`, `paw/tests/README.md` y `AGENTS.md` esten sincronizados;
  - ejecutar la suite deterministica completa de `AGENTS.md`;
  - registrar resultados, drift, gaps, pendientes y riesgos en el backlog.
- Archivos o areas probables:
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `paw/README.md`
  - `docs/README.md`
  - `AGENTS.md`
- Validaciones:
  - todos los comandos vigentes listados en `AGENTS.md`;
  - nuevos comandos de workflow si fueron agregados;
  - `git diff --check`.
- Criterio de cierre:
  - docs vivos reflejan el nuevo contrato sin claims de activacion, portabilidad,
    packaging, CI o runtime adapters;
  - validacion integral registrada.

### Fase 5 - Formal SDD closure

- Objetivo: cerrar formalmente el patch con `sdd-close` y un commit independiente
  sin cambios sustantivos de implementacion.
- Origen en `plan.md`: Bloque 5 y politica provisional de commits.
- Precondiciones:
  - Fases 1 a 4 cerradas, validadas y commiteadas;
  - todas las reglas durables promovidas a fuentes vivas;
  - no hay blockers ni drift sin clasificar.
- Tareas:
  - crear `cierre.md` desde los artefactos vivos;
  - actualizar `patch.yaml` a `closed` con `closed_at`;
  - clasificar validaciones como automated, manual, not applicable o deferred;
  - registrar gaps aceptados, pendientes fuera de alcance y riesgos residuales;
  - ejecutar validaciones finales relevantes.
- Archivos o areas probables:
  - `sdd/parches/paw-06-workflow-conformance/cierre.md`
  - `sdd/parches/paw-06-workflow-conformance/patch.yaml`
- Validaciones:
  - `node sdd/tools/validate-sdd.mjs`
  - `node paw/tools/validate-patches.mjs --json`
  - `git diff --check`
- Criterio de cierre:
  - patch cerrado en `patch.yaml`;
  - `cierre.md` no introduce autoridad nueva ni oculta drift;
  - commit de cierre independiente creado.

---

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2, Fase 3, Fase 4, Fase 5.
- Fase 2 bloquea: Fase 3, Fase 4, Fase 5.
- Fase 3 bloquea: Fase 4, Fase 5.
- Fase 4 bloquea: Fase 5.

---

## 6. Decisiones y bloqueos

- decisiones abiertas bloqueantes: ninguna.
- decisiones abiertas no bloqueantes: ninguna.

---

## 7. Validaciones globales

- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] `node paw/tools/validate-catalogs.mjs --json`
- [ ] `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-workflow.mjs --json`
- [ ] `node paw/tools/validate-workflow.mjs --fixtures --json`
- [ ] `node --test paw/tests/contract/patch-parsing.test.mjs`
- [ ] `node --test paw/tests/contract/patch-validation.test.mjs`
- [ ] `node --test paw/tests/contract/validator-cli.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-adapters.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-records.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-assessments.test.mjs`
- [ ] `node --test paw/tests/contract/workflow-validation.test.mjs`
- [ ] `node --test paw/tests/contract/workflow-cli.test.mjs`
- [ ] `node --test tests/sdd-validation.test.mjs`
- [ ] `node --test tests/foundation-governance.test.mjs`
- [ ] `node --test tests/core-contracts.test.mjs`
- [ ] `node --test tests/schema-validator-conformance.test.mjs`
- [ ] `git diff --check`

---

## 8. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales

---

## 9. Registro de cambios

- Fecha: 2026-06-19
  - cambio: desglose inicial de fases macro para `paw-06-workflow-conformance`.
  - razon: preparar backlogs de fase conforme a `sdd-tasks`.
