# Definicion: paw-06-workflow-conformance

---

## Estado

- Change id: `paw-06-workflow-conformance`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: `_inbox/final/06-workflow-bootstrap-conformance-handoff.md`
- Ultima actualizacion: 2026-06-19
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Objetivo

Definir la superficie portable de workflow, bootstrap documental y conformance de
PAW sin activar el workflow v2 ni crear runtime adapters. El patch debe convertir el
handoff 06 en contratos vivos, schemas, fixtures y validaciones proporcionales que
permitan describir estados, routing, readiness, artifacts de bootstrap, roles
documentales, reglas de conformance, checks, enforcement y cierre. Al cerrar, las
reglas durables deben estar promovidas a documentos vivos registrados y la memoria
SDD debe reconciliar alcance, decisiones, drift, validaciones y riesgos residuales.

---

## 2. No objetivos

- No crear ni modificar skills Codex `paw-*` o agentes runtime.
- No implementar integracion VCS/PR, publicacion, instalacion, packaging o release.
- No activar `paw/parches/**`, writers v2 ni el workflow v2 como default.
- No reescribir documentacion contractual del portfolio fuera de las superficies
  necesarias para registrar y gobernar este contrato.
- No convertir evidencia observada o fixtures en autoridad sin promocion explicita.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/README.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `paw/core/drift-policy.md`
- `paw/core/compatibility-policy.md`
- `paw/orchestration/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `sdd/parches/paw-05-adapter-adoption-contracts/cierre.md`
- `_inbox/final/06-workflow-bootstrap-conformance-handoff.md`
- `_inbox/final/README.md`
- `_inbox/final/patch-execution-guide.md`

---

## 4. Alcance

### Si entra

- Crear contratos portables para operaciones `paw-*` de workflow y routing.
- Definir estados, precondiciones, inputs, outputs, readiness, transiciones
  invalidas, loops y errores de artifact faltante.
- Definir contratos de bootstrap discover, define y write, incluyendo artifacts,
  permisos, gates y reportes.
- Definir contrato de roles documentales multirol, autoridad separada de rol y drift
  entre indice y metadata local.
- Definir conformance como cadena documento, rol, regla, check y enforcement.
- Materializar schemas para workflow, bootstrap, roles, reglas, checks y evidencia
  manual donde el plan lo ubique.
- Agregar fixtures completos e incompletos para estados validos, estados imposibles,
  writes sin gate, gaps aceptados, reglas manuales y cierre con drift.
- Agregar validadores y tests deterministas proporcionales a los contratos.
- Reconciliar `docs/README.md`, arquitectura, transicion, bootstrap status y READMEs
  de superficies afectadas antes del cierre.

### Fuera de alcance

- Crear ejecutores runtime o prompts Codex para las operaciones `paw-*`.
- Escribir workspaces bajo `paw/parches/**`.
- Automatizar reglas que requieran juicio humano.
- Introducir CI, GitHub Actions, Pages, releases o deployment.
- Resolver la futura integracion VCS/PR; queda para `paw-08-vcs-pr-integration`.

---

## 5. Superficies afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/README.md`
- `paw/core/**`
- `paw/orchestration/README.md`
- posibles nuevos documentos bajo `paw/orchestration/**`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Codigo o contenido

- posibles schemas bajo `paw/tools/schemas/workflow/**` o superficie equivalente
  aprobada por el plan.
- posibles validadores bajo `paw/tools/workflow/**` o superficie equivalente
  aprobada por el plan.
- posible CLI `paw/tools/validate-workflow.mjs` si el plan la justifica.

### Configuracion o validacion

- fixtures bajo `paw/tests/fixtures/workflow/**` o superficie equivalente.
- tests contractuales bajo `paw/tests/contract/**`.
- tests top-level de conformance si se necesita cubrir gobernanza transversal.

---

## 6. Decisiones conocidas

- Decision: ejecutar este patch como `spec` + `spec-anchored` bajo SDD v1.
  - razon: el handoff 06 lo declara y `AGENTS.md` mantiene `sdd/parches/**` como
    workspace activo hasta el cutover.
  - documentos o areas afectadas: `sdd/parches/paw-06-workflow-conformance/**`.
- Decision: basar la rama en `origin/main`, no en el `main` local.
  - razon: `origin/main` contiene el merge de `paw-05`; el `main` local estaba
    detras y no contenia el cierre anterior.
  - documentos o areas afectadas: branch `codex/paw-06-workflow-conformance`.

---

## 7. Assumptions

- El contrato portable de workflow pertenece a `paw/orchestration/**`, con ajustes
  puntuales en `paw/core/**` solo si una regla es semantica central y no routing.
- Los schemas y validators pueden materializarse bajo `paw/tools/**` como superficie
  target inactiva, sin activar writers ni workspaces v2.
- Los roles documentales del handoff se mapearan a los identificadores vivos en
  ingles: `strategic`, `contract`, `verifiable`, `operational`.
- La evidencia manual debe ser estructurada y validable en forma, pero su contenido
  puede requerir revision humana sin forzar un test artificial.

---

## 8. Decisiones abiertas

- Ninguna decision humana bloqueante identificada durante intake.

---

## 9. Riesgos

- riesgo: el workflow portable se confunde con runtime Codex.
  - impacto: activacion prematura de skills o prompts fuera de alcance.
  - mitigacion: mantener contratos runtime-neutral y registrar Codex como fuera de
    alcance hasta `paw-07-codex-runtime-tooling`.
- riesgo: `bootstrap write` puede parecer autorizado sin gate humano.
  - impacto: documentos contractuales podrian escribirse sin aprobacion explicita.
  - mitigacion: schema, fixtures y validator deben rechazar write readiness sin gate
    y `creates_docs` aprobado.
- riesgo: conformance fuerza automatizacion de reglas no automatizables.
  - impacto: tests fragiles o falsa precision.
  - mitigacion: modelar `manual-with-evidence`, `accepted-gap`, `deferred` y
    `blocked` como resultados validos con evidencia y owner.
- riesgo: cierre oculta gaps o drift.
  - impacto: historial inconsistente y autoridad incompleta.
  - mitigacion: close debe requerir clasificacion explicita de drift, gaps,
    pendientes, validacion y riesgo residual.

---

## 10. Criterio de cierre

La definicion queda lista para `sdd-plan` solo si:

- [x] objetivo y no objetivos estan claros
- [x] las fuentes de verdad aplicables estan listadas
- [x] el alcance y fuera de alcance no se contradicen
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] las decisiones abiertas estan visibles
- [x] los riesgos principales estan identificados

---

## 11. Registro de cambios

- Fecha: 2026-06-19
  - cambio: intake inicial de `paw-06-workflow-conformance`.
  - razon: preparar plan tecnico brownfield mediante SDD v1.
- Fecha: 2026-06-19
  - cambio: se agrego la guia operativa de ejecucion como fuente consultada.
  - razon: el archivo esta disponible y confirma el flujo de fases, backlogs,
    validacion y commits del patch.
