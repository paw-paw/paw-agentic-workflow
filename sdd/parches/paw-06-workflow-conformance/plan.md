# Plan: paw-06-workflow-conformance

---

## Estado

- Change id: `paw-06-workflow-conformance`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-19
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-05-adapter-adoption-contracts`
- Desbloquea: `paw-07-codex-runtime-tooling`, `paw-08-vcs-pr-integration`,
  pilots 11-13 y cutover 14

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `sdd/parches/paw-06-workflow-conformance/patch.yaml`
- `sdd/parches/paw-06-workflow-conformance/definicion.md`
- `sdd/parches/paw-06-workflow-conformance/decision.log`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/**`
- `paw/adoption/**`
- `paw/orchestration/README.md`
- `paw/tools/**`
- `paw/tests/**`
- `sdd/parches/paw-05-adapter-adoption-contracts/cierre.md`

---

## 2. Lectura brownfield

- estructura existente:
  - `paw/core/**` ya contiene contratos portables de patch model, lifecycle,
    autoridad, decision gates, drift y compatibilidad.
  - `paw/orchestration/README.md` existe como orientacion inactiva para futuros
    contratos runtime-neutral de routing, gates, drift y coordinacion.
  - `paw/tools/**` ya materializa schemas, validadores y CLIs por dominio sin
    activar writers ni workflow v2.
  - `paw/tests/**` contiene fixtures y tests contractuales por dominio.
  - `sdd/parches/**` sigue siendo el unico workspace activo antes del cutover.
- patrones existentes:
  - Documentos contractuales Markdown registrados en `docs/README.md`.
  - Schemas JSON bajo `paw/tools/schemas/<domain>/**`.
  - Validadores Node.js sin dependencias externas bajo `paw/tools/<domain>/**`.
  - CLIs canonicas `validate-*.mjs` con salida JSON estructurada.
  - Fixtures validos e invalidos con `case.json`, `patch.yaml` o `expected.json`
    segun dominio.
  - Tests contractuales bajo `paw/tests/contract/**`.
- deuda o drift relevante:
  - `BOOTSTRAP-STATUS.md` aun no declara workflow, bootstrap ni conformance como
    implementados.
  - `paw/orchestration/README.md` dice que la superficie es solo orientacion
    inactiva; el patch debe actualizarla sin activar workflow v2.
  - No existe dominio de schemas/validators para workflow o conformance.
  - `_inbox/final/patch-execution-guide.md` fue solicitado pero no existe en la
    base revisada; el plan no depende de el.
- restricciones tecnicas:
  - No agregar dependencias externas salvo decision explicita.
  - No escribir `paw/parches/**`.
  - No crear skills, agents, prompts o scripts especificos de Codex.
  - No duplicar responsabilidades existentes de `paw/core/**` ni `paw/adoption/**`.
  - No usar tests como sustituto de autoridad documental.

---

## 3. Assumptions

- La superficie principal de contratos sera `paw/orchestration/**` porque el handoff
  trata routing, workflow, bootstrap, conformance operacional y cierre.
- Los ajustes a `paw/core/**` seran limitados a conceptos que ya son core: lifecycle,
  autoridad, evidence, decision gates, drift y compatibilidad.
- La validacion de conformance puede usar schemas JSON y validadores deterministas
  de forma, referencias, transiciones y dispositions, sin decidir el contenido
  humano de una revision manual.
- Los documentos distribuibles nuevos se escribiran en ingles; los artefactos SDD
  internos permanecen en espanol.

---

## 4. Zonas afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/README.md`
- `paw/orchestration/README.md`
- nuevos contratos bajo `paw/orchestration/**`
- posibles ajustes puntuales en `paw/core/artifact-lifecycle.md`
- posibles ajustes puntuales en `paw/core/authority-and-evidence.md`
- posibles ajustes puntuales en `paw/core/decision-gates.md`
- posibles ajustes puntuales en `paw/core/drift-policy.md`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Codigo

- `paw/tools/schemas/workflow/*.schema.json`
- `paw/tools/workflow/*.mjs`
- `paw/tools/validate-workflow.mjs`
- posibles utilidades compartidas bajo `paw/tools/validation/**` solo si reducen
  duplicacion real.

### Configuracion, tests o build

- `paw/tests/fixtures/workflow/**`
- `paw/tests/contract/workflow-*.test.mjs`
- posible `tests/workflow-conformance.test.mjs` si hace falta cubrir reglas
  transversales de docs vivos.

---

## 5. Bloques de implementacion

### Bloque 1 - Contratos portables de workflow y routing

- Objetivo: materializar la state machine portable y las operaciones `paw-*` sin
  runtime bindings.
- Superficies afectadas: `paw/orchestration/**`, `docs/README.md`,
  `docs/governance/ARCHITECTURE.md`, `docs/governance/V1-TRANSITION.md`.
- Cambios esperados:
  - Contrato de operaciones: triage, intake, bootstrap discover, bootstrap define,
    bootstrap write, plan, tasks, phase backlog, execute phase, sync drift y close.
  - Estados, precondiciones, inputs, outputs, readiness, transiciones invalidas,
    loop detection y artifact-missing handling.
  - Fronteras no solapadas: triage clasifica antes del workspace; intake abre
    workspace y define identidad; bootstrap es discover/define/write.
  - Registro de que la superficie sigue inactiva como default hasta cutover.
- Dependencias: SDD preparation commit y contratos core existentes.
- Riesgos: copiar comportamiento Codex o v1 como doctrina portable.
- Validaciones asociadas: revision documental, validator de fixtures de estados
  validos/invalidos y checks de no activacion.

### Bloque 2 - Contratos de bootstrap documental

- Objetivo: definir artifacts, gates y responsabilidades de discover, define y
  write.
- Superficies afectadas: `paw/orchestration/**`,
  `paw/core/authority-and-evidence.md`, `paw/core/decision-gates.md`.
- Cambios esperados:
  - Discover divergente que no crea autoridad ni documentos contractuales.
  - Define convergente con `document-map`, `document-content-definitions`,
    `evidence-to-authority` y `approval-gate`.
  - Write permitido solo tras aprobacion humana explicita y limitado a
    `creates_docs`.
  - `bootstrap-write-report.md` como evidencia, no autoridad automatica.
  - Reglas para promocion explicita de evidencia a autoridad.
- Dependencias: Bloque 1.
- Riesgos: permitir write sin gate o convertir evidencia observada en autoridad.
- Validaciones asociadas: fixtures invalidos para write sin gate, docs fuera de
  `creates_docs` y promocion automatica de evidencia.

### Bloque 3 - Roles documentales y conformance model

- Objetivo: materializar roles documentales, reglas, checks, enforcement y evidencia
  manual.
- Superficies afectadas: `paw/orchestration/**`, `docs/README.md`,
  `paw/tools/schemas/workflow/**`, `paw/tests/fixtures/workflow/**`.
- Cambios esperados:
  - Roles `strategic`, `contract`, `verifiable`, `operational`, con
    `primary_doc_role` para documentos multirol.
  - Separacion explicita entre rol y autoridad.
  - Drift entre indice documental y frontmatter opcional.
  - Conformance chain: document, role, rule, check, enforcement.
  - Dispositions: `existing-check`, `new-automated-check`,
    `manual-with-evidence`, `generated`, `deferred`, `accepted-gap`, `blocked`.
  - Enforcement: `manual`, `automated`, `ci-gated`.
  - Evidence manual estructurada: reviewer, date, reviewed object, criterion,
    result y references.
- Dependencias: Bloques 1 y 2.
- Riesgos: modelar `generated` como enforcement o forzar tests artificiales.
- Validaciones asociadas: fixtures completos/incompletos para reglas, checks,
  evidence manual y gaps aceptados.

### Bloque 4 - Schemas, validator y fixtures

- Objetivo: agregar enforcement determinista para la forma de workflow, bootstrap y
  conformance sin convertirlo en runtime.
- Superficies afectadas: `paw/tools/schemas/workflow/**`,
  `paw/tools/workflow/**`, `paw/tools/validate-workflow.mjs`,
  `paw/tests/contract/**`, `paw/tests/fixtures/workflow/**`,
  `paw/tools/README.md`, `paw/tests/README.md`.
- Cambios esperados:
  - Schemas JSON para workflow operations, bootstrap artifacts, document roles,
    conformance rules/checks y manual evidence.
  - Validator Node.js con salida `valid`, diagnostics, validated paths y JSON CLI
    consistente con los dominios existentes.
  - Fixtures validos e invalidos para loops, estados imposibles, artifacts faltantes,
    write no aprobado, checks generados y manual evidence incompleta.
  - Tests contractuales para parser/validator/CLI del nuevo dominio.
- Dependencias: Bloques 1-3.
- Riesgos: sobregeneralizar schemas o duplicar validadores existentes.
- Validaciones asociadas: `node paw/tools/validate-workflow.mjs --json`,
  `node paw/tools/validate-workflow.mjs --fixtures --json` y tests contractuales.

### Bloque 5 - Reconciliacion documental, validacion completa y cierre SDD

- Objetivo: promover reglas durables a docs vivos, reconciliar estado bootstrap y
  cerrar el patch sin ocultar gaps ni drift.
- Superficies afectadas: docs vivos, `sdd/parches/paw-06-workflow-conformance/**`,
  validators y tests incorporados.
- Cambios esperados:
  - `docs/README.md` registra los nuevos documentos y autoridad.
  - `ARCHITECTURE.md`, `V1-TRANSITION.md`, `BOOTSTRAP-STATUS.md`, `paw/README.md`,
    `paw/tools/README.md` y `paw/tests/README.md` quedan sincronizados.
  - `tasks.md`, backlogs, decision log y `cierre.md` reflejan fases, validaciones,
    drift, gaps aceptados, pendientes y riesgos residuales.
  - Commit de cierre independiente tras `sdd-close` sin cambios sustantivos.
- Dependencias: Bloques 1-4 cerrados y validados.
- Riesgos: dejar reglas durables solo en `cierre.md` o en fixtures.
- Validaciones asociadas: suite completa de `AGENTS.md`, nuevo validator de workflow,
  tests contractuales y `git diff --check`.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados:
  - Nuevos contratos portables bajo `paw/orchestration/**`.
  - Posibles ajustes a core cuando el workflow toque lifecycle, authority, gates,
    drift o compatibility.
  - Registro de autoridad y estado en docs vivos.
- Datos o contenido afectados:
  - Fixtures de workflow, bootstrap y conformance.
  - Evidencia manual de ejemplo para reglas no automatizables.
- Schemas o modelos afectados:
  - Workflow operation/state schema.
  - Bootstrap discover/define/write artifact schema.
  - Document role and conformance rule schema.
  - Check/enforcement/manual evidence schema.
- Compatibilidad esperada:
  - No cambiar schema de patch v1/v2 salvo que el validator de workflow solo lea
    fixtures propias.
  - No activar `paw/parches/**`.
  - No crear runtime adapters ni skills.
  - Mantener lectura y validacion v1 existentes.

---

## 7. Validaciones previstas

### Documentales

- [ ] verificar alineacion con `docs/README.md`
- [ ] verificar que `paw/orchestration/**` no duplica responsabilidades de
  `paw/core/**`, `paw/catalogs/**` ni `paw/adoption/**`
- [ ] verificar que docs vivos no declaran activacion de workflow v2, portabilidad,
  packaging, releases, CI o runtime adapters
- [ ] verificar que toda regla durable queda promovida a una fuente viva antes del
  cierre

### Tecnicas

- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] `node paw/tools/validate-catalogs.mjs --json`
- [ ] `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-workflow.mjs --json`, si se introduce
- [ ] `node paw/tools/validate-workflow.mjs --fixtures --json`, si se introduce
- [ ] `node --test paw/tests/contract/patch-parsing.test.mjs`
- [ ] `node --test paw/tests/contract/patch-validation.test.mjs`
- [ ] `node --test paw/tests/contract/validator-cli.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-adapters.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-records.test.mjs`
- [ ] `node --test paw/tests/contract/adoption-assessments.test.mjs`
- [ ] nuevos tests contractuales de workflow, si se introducen
- [ ] `node --test tests/sdd-validation.test.mjs`
- [ ] `node --test tests/foundation-governance.test.mjs`
- [ ] `node --test tests/core-contracts.test.mjs`
- [ ] `node --test tests/schema-validator-conformance.test.mjs`
- [ ] `git diff --check`

### Manuales

- [ ] revision de fronteras triage/intake/bootstrap.
- [ ] revision de que discover no crea autoridad, define no escribe contratos y
  write exige gate humano.
- [ ] revision de que `manual-with-evidence`, `accepted-gap`, `deferred` y `blocked`
  no se tratan como fallas automaticas cuando estan justificadas.
- [ ] revision de cierre para confirmar que gaps y drift quedan visibles.

---

## 8. Riesgos y mitigaciones

- riesgo: la state machine se implementa como flujo activo.
  - impacto: activacion prematura antes del cutover.
  - mitigacion: docs, schemas y validators deben presentarse como contratos
    materializados inactivos; no writers ni workspaces `paw/parches/**`.
- riesgo: bootstrap write puede escribir documentos no aprobados.
  - impacto: se rompe la politica de autoridad y gate humano.
  - mitigacion: `approval-gate` y `creates_docs` deben ser prerequisitos
    validables.
- riesgo: conformance se vuelve un test-only contract.
  - impacto: la autoridad queda escondida en fixtures o codigo.
  - mitigacion: registrar reglas durables en docs vivos y usar tests como evidencia.
- riesgo: evidencia manual no es suficientemente estructurada.
  - impacto: reglas manuales no son auditables.
  - mitigacion: schema de evidencia manual con reviewer, fecha, objeto, criterio,
    resultado y referencias.
- riesgo: los roles documentales del handoff en espanol divergen del indice vivo en
  ingles.
  - impacto: drift terminologico.
  - mitigacion: usar los identificadores canonicos vivos en ingles y documentar el
    mapeo.

---

## 9. Decisiones humanas abiertas

- Estado: `none`

---

## 10. Criterio de cierre tecnico

- [x] el alcance respeta `definicion.md`
- [x] las zonas afectadas estan identificadas
- [x] los bloques de implementacion son secuenciables
- [x] las validaciones son reales y proporcionales
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] no hay decisiones abiertas que bloqueen la division en fases

---

## 11. Registro de cambios

- Fecha: 2026-06-19
  - cambio: plan tecnico brownfield inicial.
  - razon: preparar `sdd-tasks` para el patch 06.
