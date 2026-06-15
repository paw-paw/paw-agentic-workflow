# Tasks: paw-03-schema-validator-compatibility

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-03-schema-validator-compatibility/patch.yaml`
- `sdd/parches/paw-03-schema-validator-compatibility/definicion.md`
- `sdd/parches/paw-03-schema-validator-compatibility/plan.md`
- `sdd/parches/paw-03-schema-validator-compatibility/decision.log`
- related docs declarados en el manifest
- `paw/core/patch-model.md`
- `paw/core/compatibility-policy.md`

## 2. Preflight

- [x] `definicion.md` vigente
- [x] `plan.md` vigente
- [x] assumptions criticas clasificadas antes de dividir fases
- [x] no hay decisiones abiertas bloqueantes
- [x] destino canonico `paw/tools/**` y `paw/tests/**` reconciliado
- [x] baseline v1 y limites de activacion preservados

## 3. Resumen del plan

- Materializar schema v2 y un validator PAW versionado bajo `paw/tools/**`.
- Preservar schema, fixtures, entrypoints y writers v1 bajo `sdd/**`.
- Separar parsing, deteccion de version, reglas v1/v2 y reporting estructurado.
- Exponer una CLI automatizable y mantener compatibles los comandos v1 actuales.
- Completar fixtures y conformance sin activar `paw/parches/**` ni cambiar el default.

## 4. Fases

### Fase 1 - Schema v2 y parsing versionado

- Estado: `done`
- Objetivo: crear los contratos fisicos iniciales y una capa de parsing fail-loud
  capaz de detectar version antes de aplicar reglas.
- Origen en `plan.md`: Bloque 1 - Contratos fisicos y parsing versionado.
- Precondiciones: patch 02 cerrado; contratos core vigentes; guardrails de
  materializacion incremental reconciliados.
- Tareas:
  - crear el schema v2 bajo `paw/tools/schemas/**`;
  - preservar e identificar explicitamente el schema v1 existente;
  - implementar parser YAML acotado con diagnosticos de path, linea y causa;
  - implementar deteccion de version y rechazo de ausencia, version desconocida y
    ejes v1/v2 hibridos;
  - agregar fixtures y tests enfocados de parsing y deteccion bajo `paw/tests/**`.
- Archivos o areas probables:
  - `paw/tools/schemas/**`
  - `paw/tools/validation/**`
  - `paw/tests/fixtures/**`
  - `paw/tests/contract/**`
  - `sdd/tools/schemas/patch.schema.json`
- Validaciones:
  - tests unitarios de parsing, scalars, arrays, null y comentarios;
  - YAML invalido con diagnostico accionable;
  - version ausente/desconocida y manifest hibrido rechazados;
  - schema v1 preservado sin cambios semanticos;
  - validaciones globales aplicables.
- Criterio de cierre: schema v2 observable y parser versionado probado sin validar
  todavia todas las invariantes semanticas ni cambiar entrypoints v1.

### Fase 2 - Validacion dual y compatibilidad historica

- Estado: `done`
- Objetivo: implementar validadores separados v1/v2 y una matriz completa de
  compatibilidad read-only.
- Origen en `plan.md`: Bloque 2 - Validadores v1/v2 y compatibilidad historica.
- Precondiciones: Fase 1 cerrada; parser y deteccion de version estables.
- Tareas:
  - trasladar las reglas v1 existentes a un validator compatible sin regresiones;
  - implementar invariantes v2 por `patch_mode`, status, fechas y arrays;
  - clasificar diagnosticos como error, warning o compatibilidad historica;
  - preservar exencion de `sdd/parches/legacy/**` y lectura de patches v1 cerrados;
  - crear la matriz obligatoria de fixtures positivos y negativos v1/v2;
  - probar que ninguna validacion muta manifests o patches historicos.
- Archivos o areas probables:
  - `paw/tools/validation/**`
  - `paw/tests/fixtures/patch-v1/**`
  - `paw/tests/fixtures/patch-v2/**`
  - `paw/tests/contract/**`
  - `sdd/tests/fixtures/**`
  - `sdd/parches/**` solo como input read-only de validacion
- Validaciones:
  - v1 `spec/spec-first`, `spec/spec-anchored` y `batch/spec-first`;
  - legacy exento y patches cerrados legibles sin migracion;
  - cada `patch_mode` v2 valido y todos los negativos obligatorios;
  - paths fuera de roots permitidos rechazados;
  - prueba de no mutacion;
  - validaciones globales aplicables.
- Criterio de cierre: dispatch dual y matriz de compatibilidad pasan con diagnosticos
  estructurados, sin modificar historia ni cambiar writers/defaults.

### Fase 3 - CLI contractual y bridge v1

- Estado: `done`
- Objetivo: exponer el validator PAW mediante una interfaz estable y conservar las
  invocaciones operativas v1 sin duplicar implementacion.
- Origen en `plan.md`: Bloque 3 - CLI y output contractual.
- Precondiciones: Fases 1 y 2 cerradas; resultado interno de validacion estable.
- Tareas:
  - crear el entrypoint PAW versionado;
  - implementar `--help`, `--json`, `--root`, `--version` y ejecucion de fixtures;
  - definir stdout, stderr y exit codes para exito, validacion y uso invalido;
  - emitir el output minimo `status`, `schema_version`, `validated_paths`,
    `warnings`, `errors` y `evidence`;
  - adaptar `sdd/tools/validate-sdd.mjs` como bridge compatible o entrypoint v1
    delgado;
  - preservar ejecucion sin flags y `--fixtures` para consumidores existentes.
- Archivos o areas probables:
  - `paw/tools/**`
  - `sdd/tools/validate-sdd.mjs`
  - `paw/tests/contract/**`
  - `tests/sdd-validation.test.mjs`
  - nuevos tests top-level de CLI si son necesarios
- Validaciones:
  - contract tests de proceso para flags, stdout, stderr y exit codes;
  - JSON parseable y estable;
  - roots validos e invalidos;
  - comandos v1 actuales siguen pasando;
  - validator sin prompts, dependencias npm, Astro o Codex;
  - validaciones globales aplicables.
- Criterio de cierre: CLI PAW automatizable y bridge v1 compatible, con una sola
  implementacion canonica de parsing y validacion.

### Fase 4 - Conformance, documentacion y reconciliacion final

- Estado: `done`
- Objetivo: completar la evidencia durable, promover el estado implementado y
  verificar que la materializacion no activa el workflow v2.
- Origen en `plan.md`: Bloque 4 - Fixtures, conformance y reconciliacion de estado.
- Precondiciones: Fases 1 a 3 cerradas; schema, validator y CLI estables.
- Tareas:
  - completar contract tests y fixtures faltantes frente al handoff;
  - agregar checks de independencia, ownership y ausencia de mutacion;
  - actualizar bootstrap status, arquitectura, transicion, indice y comandos
    operativos segun el estado real;
  - adaptar conformance foundation al inventario materializado sin debilitar
    `paw/parches/**`, no dual-write ni default v1;
  - revisar drift, decisiones, riesgos residuales y readiness de cierre.
- Archivos o areas probables:
  - `paw/tests/**`
  - `tests/**`
  - `README.md`
  - `AGENTS.md`
  - `docs/README.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `paw/README.md`
  - `paw/tools/README.md`
  - `paw/tests/README.md`
  - artifacts SDD del patch
- Validaciones:
  - suite tecnica completa;
  - todos los fixtures obligatorios trazables al handoff;
  - inventario manual de namespaces, writers y skills;
  - documentacion sin claims de cutover, portabilidad o release;
  - `git diff --check`;
  - validaciones globales completas.
- Criterio de cierre: contratos, implementacion, fixtures, CLI, docs y conformance
  estan alineados; v1 sigue gobernando y no queda drift sin clasificar.

## 5. Dependencias entre fases

- Fase 1 bloquea: Fase 2.
- Fase 2 bloquea: Fase 3.
- Fase 3 bloquea: Fase 4.
- Fase 4 bloquea: reconciliacion final y `sdd-close`.

No se recomienda paralelizar las fases porque parser, reglas, CLI y conformance
estabilizan contratos consumidos por la fase siguiente.

## 6. Decisiones y bloqueos

- Decisiones abiertas bloqueantes: ninguna.
- Drift operacional: el merge `86645bd` integro las fases 1-3 antes de la fase 4
  y del cierre formal. La recuperacion continua en una rama de seguimiento basada
  en `origin/main`, sin revertir ni reescribir historia.
- Decisiones abiertas no bloqueantes:
  - forma interna exacta de los modulos bajo `paw/tools/validation/**`;
  - codigos concretos de diagnostico y exit codes, dentro del contrato estable;
  - mecanismo de prueba de no mutacion, a seleccionar en el backlog de Fase 2.
- Stop conditions heredadas:
  - el schema exige redefinir decisiones de patch 02;
  - compatibilidad exige alterar patches cerrados;
  - schema o validator se mezclan con routing de skills;
  - una fase intenta activar writers, `paw/parches/**` o el default v2.

## 7. Validaciones globales

- [x] `node sdd/tools/validate-sdd.mjs`
- [x] `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] `node --test tests/sdd-validation.test.mjs`
- [x] `node --test tests/foundation-governance.test.mjs`
- [x] `node --test tests/core-contracts.test.mjs`
- [x] tests nuevos de parser, validator y CLI definidos por las fases
- [x] `git diff --check`
- [x] revision manual de no mutacion de historia
- [x] revision manual de namespace, writers, defaults y claims

Estas validaciones permanecen globales aunque cada backlog seleccione el subconjunto
proporcional a su riesgo.

## 8. Trabajo diferido

- Writers, templates y skills que produzcan schema v2.
- Workflow portable y conformance general del patch 06.
- Toolkit compartido y mutation envelopes del patch 07.
- Instalacion/distribucion del patch 09.
- Activacion candidate del patch 10.
- Cutover, freeze y release del patch 14.

## 9. Politica de commits por fase

- Cerrar y validar cada backlog antes de crear su commit de fase.
- Crear al menos un Conventional Commit por fase.
- Dividir una fase cuando schema, runtime, tests o documentacion representen
  intenciones separadas que merezcan historial independiente.
- No publicar WIP ni reescribir historia sin autorizacion humana.
- Reservar un commit independiente, no sustantivo, para el cierre tras `sdd-close`.

## 10. Criterio de cierre

- [x] cada fase tiene objetivo, precondiciones, tareas, validaciones y criterio de cierre
- [x] cada tarea es trazable al `plan.md`
- [x] las validaciones son reales
- [x] dependencias y stop conditions estan visibles
- [x] trabajo diferido conserva owner futuro
- [x] la politica provisional de commits esta reflejada operativamente

## 11. Registro de cambios

- `2026-06-15`
  - Drift del merge prematuro clasificado como operacional; fase 4 y cierre
    continuan mediante un pull request de seguimiento.
  - Fase 4 cerrada con documentacion reconciliada, cobertura explicita del handoff
    y conformidad de ownership, independencia, no mutacion y no activacion.
- `2026-06-14`
  - Division inicial en cuatro fases trazables a los bloques del plan reconciliado.
  - Fase 1 cerrada con schema v2, parsing versionado y contract tests validados.
  - Fase 2 cerrada con validacion dual, compatibilidad legacy y matriz read-only.
  - Fase 3 cerrada con CLI contractual y bridge v1 sin reglas duplicadas.
