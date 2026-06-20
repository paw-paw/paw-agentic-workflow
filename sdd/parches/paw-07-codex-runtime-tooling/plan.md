# Plan: paw-07-codex-runtime-tooling

---

## Estado

- Change id: `paw-07-codex-runtime-tooling`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-06-workflow-conformance`
- Desbloquea: `paw-08-vcs-pr-integration`, `paw-10-claude-antigravity-adapters`,
  pilotos 11-13 y cutover 14

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `sdd/parches/paw-07-codex-runtime-tooling/patch.yaml`
- `sdd/parches/paw-07-codex-runtime-tooling/definicion.md`
- `sdd/parches/paw-07-codex-runtime-tooling/decision.log`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/orchestration/**`
- `paw/tools/**`
- `paw/tests/**`
- `.codex/config.toml`
- `.codex/skills/sdd-*`
- `.codex/agents/sdd-*.toml`
- `sdd/parches/paw-06-workflow-conformance/cierre.md`
- `_inbox/final/patch-execution-guide.md`

---

## 2. Lectura brownfield

- estructura existente:
  - `.codex/skills/**` contiene solo skills `sdd-*` activas para el flujo v1.
  - `.codex/agents/**` contiene solo perfiles `sdd-*` de soporte.
  - `.codex/config.toml` es la superficie local de runtime Codex registrada por
    `V1-TRANSITION.md`.
  - `paw/orchestration/**` ya define contratos runtime-neutral para workflow,
    bootstrap y conformance materializados por patch 06.
  - `paw/tools/**` ya contiene CLIs Node.js con `--json`, `--fixtures`, `--help`,
    `--version`, salida estructurada y modulos sin dependencias externas.
  - `paw/tests/**` ya contiene fixtures y tests contractuales por dominio.
  - `sdd/parches/**` sigue siendo el unico workspace activo antes del cutover.
- patrones existentes:
  - Skills Codex con `SKILL.md`, assets y scripts locales opcionales.
  - Agentes Codex TOML con perfiles acotados por rol.
  - Validadores Node.js deterministas y no interactivos.
  - Contratos vivos en Markdown registrados en `docs/README.md`.
  - Tests contractuales bajo `paw/tests/contract/**` y validacion top-level.
- deuda o drift relevante:
  - `BOOTSTRAP-STATUS.md` declara `paw-*` skills/agentes y runtime bindings como no
    implementados.
  - `V1-TRANSITION.md` registra `.codex/skills/paw-*` y `.codex/agents/paw-*` como
    futuras y no creadas.
  - No existe mapa operacion portable -> implementacion Codex.
  - No existe toolkit compartido de runtime Codex.
  - No existen fixtures que prueben progressive disclosure, mutation envelope o
    entrypoints de scripts Codex.
- restricciones tecnicas:
  - No escribir ni promover `.agents/**`.
  - No duplicar implementaciones activas bajo `sdd/**` y `paw/**`.
  - No activar `paw/parches/**` ni cambiar el workflow default.
  - No introducir prompts interactivos en scripts.
  - No agregar dependencias externas salvo decision explicita y justificada.
  - No convertir politica VCS provisional en doctrina portable.

---

## 3. Assumptions

- El toolkit compartido debe estar bajo `.codex/**` porque es runtime Codex, no
  contrato portable general; si se ubica bajo `.codex/skills/paw-toolkit/**`, debe
  quedar documentado como toolkit y no como operacion de workflow.
- Las skills nuevas pueden ser candidate y probables, pero los prompts de ejecucion
  del programa siguen usando `sdd-*` hasta cutover.
- Los scripts pueden apoyarse en validadores `paw/tools/**` para leer contratos
  portables, pero no deben mover la autoridad desde documentos vivos hacia codigo.
- La validacion de skills sera mayormente contract-test y fixture-based, porque el
  runtime Codex interactivo no debe ser requisito para checks deterministas.

---

## 4. Zonas afectadas

### Docs

- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/orchestration/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/README.md` o documento equivalente si se crea para mapear runtime Codex

### Codigo

- `.codex/skills/paw-*/SKILL.md`
- `.codex/skills/paw-*/scripts/**`
- `.codex/skills/paw-*/assets/**`
- `.codex/agents/paw-*.toml`
- `.codex/paw-toolkit/**` o `.codex/skills/paw-toolkit/**`
- posibles utilidades de validacion bajo `paw/tools/**` si el mapa runtime necesita
  check determinista desde la suite existente.

### Configuracion, tests o build

- `.codex/config.toml`
- `paw/tests/fixtures/codex-runtime/**` o superficie equivalente
- `paw/tests/contract/codex-runtime-*.test.mjs`
- posible `paw/tools/validate-codex-runtime.mjs` si el plan de fase lo justifica
- `tests/foundation-governance.test.mjs` si debe cubrir limites `.agents` o
  activacion.

---

## 5. Bloques de implementacion

### Bloque 1 - Runtime map and shared toolkit contract

- Objetivo: definir el mapa operacion portable -> implementacion Codex y el contrato
  del toolkit compartido antes de crear skills individuales.
- Superficies afectadas: `.codex/**`, `docs/README.md`,
  `docs/governance/V1-TRANSITION.md`, `docs/governance/BOOTSTRAP-STATUS.md`.
- Cambios esperados:
  - Documento o manifest de runtime que liste cada operacion portable, skill Codex,
    scripts asociados, estado candidate, gaps y no activacion.
  - Contrato de toolkit comun con version, discovery, root detection, JSON output,
    stderr diagnostics, stable exit codes, dry-run, freshness y idempotencia.
  - Definicion del mutation envelope Nivel 1, Nivel 2 y Nivel 3 para Codex.
  - Decision documentada de ubicacion del toolkit bajo `.codex/**`.
- Dependencias: preparacion SDD commiteada y contratos de patch 06.
- Riesgos: convertir el toolkit en doctrina portable o activar workflow v2.
- Validaciones asociadas: revision documental, no `.agents`, no `paw/parches/**`,
  `node paw/tools/validate-workflow.mjs --json`, `git diff --check`.

### Bloque 2 - Shared toolkit implementation and contract tests

- Objetivo: implementar el toolkit compartido y sus tests antes de conectarlo a
  skills.
- Superficies afectadas: `.codex/paw-toolkit/**` o ubicacion aprobada,
  `paw/tests/contract/**`, `paw/tests/fixtures/**`, posibles docs bajo
  `paw/tools/README.md` y `paw/tests/README.md`.
- Cambios esperados:
  - Entry points no interactivos para descubrir root, leer estado de patch,
    validar artifacts, preparar payloads mecanicos y clasificar mutaciones.
  - Soporte `--help`, `--json`, `--version`, `--root` y `--dry-run` para mutaciones.
  - Exit codes estables y diagnosticos separados stdout/stderr.
  - Tests de contrato para ayuda, JSON, dry-run, errores, idempotencia y freshness.
- Dependencias: Bloque 1.
- Riesgos: scripts redactan contenido semantico o requieren contexto ya resuelto por
  la skill.
- Validaciones asociadas: tests contractuales de toolkit, fixture runner y checks
  existentes de PAW.

### Bloque 3 - Core lifecycle skills `paw-*`

- Objetivo: crear las skills Codex que traducen las operaciones del ciclo de vida
  principal sin reemplazar `sdd-*`.
- Superficies afectadas: `.codex/skills/paw-triage`,
  `.codex/skills/paw-intake`, `.codex/skills/paw-router`,
  `.codex/skills/paw-plan`, `.codex/skills/paw-tasks`,
  `.codex/skills/paw-phase-backlog`, `.codex/skills/paw-execute-phase`,
  `.codex/skills/paw-sync-drift`, `.codex/skills/paw-close`.
- Cambios esperados:
  - `SKILL.md` compacto por skill con progressive disclosure.
  - Referencias a contratos inmediatos en `paw/orchestration/**` y assets/scripts
    especificos solo cuando aporten valor mecanico.
  - Guardrails de no activacion, no `.agents`, no escritura fuera de autoridad y
    handoff a `sdd-*` para este programa hasta cutover.
  - Integracion con toolkit para discovery, validation y mutaciones mecanicas.
- Dependencias: Bloques 1 y 2.
- Riesgos: duplicar los `sdd-*` vigentes o crear una segunda implementacion activa.
- Validaciones asociadas: tests/fixtures de skill metadata, progressive disclosure y
  mapping completo.

### Bloque 4 - Bootstrap, conformance and agent profiles

- Objetivo: completar operaciones de bootstrap/conformance y perfiles Codex
  necesarios con permisos acotados.
- Superficies afectadas: `.codex/skills/paw-bootstrap-discover`,
  `.codex/skills/paw-bootstrap-define`,
  `.codex/skills/paw-bootstrap-write`,
  `.codex/skills/paw-conformance` o integracion equivalente,
  `.codex/agents/paw-*.toml`.
- Cambios esperados:
  - Skills de bootstrap separadas para discover, define y write con approval gate y
    `creates_docs`.
  - Conformance documentada como skill propia o integracion explicita del flujo,
    sin ocultar reglas en tests.
  - Agentes read-only/advisory por defecto y writers con ownership unico,
    autorizacion explicita y sin autoridad contractual.
  - Tests que impidan delegacion recursiva innecesaria y permisos amplios.
- Dependencias: Bloques 1-3.
- Riesgos: bootstrap write sin gate o agentes con autoridad contractual implicita.
- Validaciones asociadas: fixtures de gates, agent profile lint y revision manual de
  permisos.

### Bloque 5 - Runtime documentation, validation matrix and SDD closure

- Objetivo: reconciliar docs vivos, pruebas completas y cierre SDD.
- Superficies afectadas: docs vivos, `.codex/**`, `paw/tests/**`,
  `paw/tools/**` si se agrego validator, `sdd/parches/paw-07-codex-runtime-tooling/**`.
- Cambios esperados:
  - `docs/README.md`, arquitectura, transicion y bootstrap status sincronizados.
  - Documentacion Codex explica candidate status, no cutover, no portability claim y
    mapa completo de operaciones.
  - Validaciones completas de AGENTS y checks nuevos.
  - Backlogs, decision log y `cierre.md` reflejan fases, validaciones, drift, gaps,
    pendientes y riesgos residuales.
  - Commit de cierre independiente tras `sdd-close` sin cambios sustantivos.
- Dependencias: Bloques 1-4 cerrados y validados.
- Riesgos: dejar reglas durables solo en artifacts SDD o tests.
- Validaciones asociadas: suite completa de `AGENTS.md`, tests nuevos, posible
  validator de Codex runtime y `git diff --check`.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados:
  - Mapa Codex runtime candidate bajo `.codex/**` y registros vivos asociados.
  - Contrato del toolkit compartido de Codex.
  - Reconciliacion de `V1-TRANSITION.md`, arquitectura y bootstrap status.
- Datos o contenido afectados:
  - Skill metadata, assets, fixtures de skill/runtime y agent profiles.
  - Ejemplos de outputs JSON compactos y diagnosticos extendidos.
- Schemas o modelos afectados:
  - Posible manifest/schema para mapa Codex runtime.
  - Posible schema o fixture contract para mutation envelope.
  - Contratos de CLI del toolkit.
- Compatibilidad esperada:
  - No cambiar schemas de patch v1/v2 salvo que un validator nuevo solo lea
    fixtures propias.
  - No cambiar contratos portables de workflow salvo drift demostrado.
  - No activar `paw/parches/**`.
  - Mantener `sdd-*` como workflow activo de la transformacion.

---

## 7. Validaciones previstas

### Documentales

- [ ] verificar alineacion con `docs/README.md`
- [ ] verificar que `.codex/**` se documenta como runtime binding, no contrato
  portable general
- [ ] verificar que no se usa `.agents/**`
- [ ] verificar que docs vivos no declaran cutover, portability, packaging, CI,
  releases o workflow v2 default
- [ ] verificar mapa operacion portable -> implementacion Codex o gap explicito

### Tecnicas

- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node paw/tools/validate-patches.mjs --json`
- [ ] `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] `node paw/tools/validate-catalogs.mjs --json`
- [ ] `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] `node paw/tools/validate-adoption.mjs --fixtures --json`
- [ ] `node paw/tools/validate-workflow.mjs --json`
- [ ] `node paw/tools/validate-workflow.mjs --fixtures --json`
- [ ] nuevo validator de Codex runtime, si se introduce
- [ ] tests contractuales nuevos de toolkit, skills y agent profiles
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

### Manuales

- [ ] revision de progressive disclosure por skill.
- [ ] revision de que el toolkit no decide semantica.
- [ ] revision de mutation envelope Nivel 1/2/3 y approval token para Nivel 2.
- [ ] revision de permisos de agentes y ownership unico.
- [ ] revision de candidate status sin reemplazar `sdd-*`.

---

## 8. Riesgos y mitigaciones

- riesgo: el adapter Codex redefine el workflow portable.
  - impacto: drift entre runtime binding y `paw/orchestration/**`.
  - mitigacion: mapa explicito contra operaciones del patch 06 y tests de cobertura.
- riesgo: scripts hacen generacion semantica sustantiva.
  - impacto: decisiones ocultas en tooling.
  - mitigacion: scripts aceptan payloads ya resueltos por skills y se limitan a
    mecanica verificable.
- riesgo: mutation Nivel 2 opera sin freshness o aprobacion vigente.
  - impacto: cambios relevantes sin gate.
  - mitigacion: contrato exige token de aprobacion, plan materializado y freshness.
- riesgo: demasiadas skills copian contratos completos.
  - impacto: contexto inmanejable y drift.
  - mitigacion: referencias especificas, ayuda extendida bajo demanda y tests de
    fixtures.
- riesgo: tests de skills dependen de ejecutar Codex interactivamente.
  - impacto: validacion no deterministica.
  - mitigacion: probar contratos de archivos, scripts y fixtures; dejar runtime
    interactivo como revision manual.

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

- Fecha: 2026-06-20
  - cambio: plan tecnico brownfield inicial.
  - razon: preparar `sdd-tasks` para el patch 07.
