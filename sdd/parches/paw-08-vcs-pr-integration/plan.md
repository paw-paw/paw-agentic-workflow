# Plan: paw-08-vcs-pr-integration

---

## Estado

- Change id: `paw-08-vcs-pr-integration`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-07-codex-runtime-tooling`
- Desbloquea: `paw-09-manual-distribution`

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-08-vcs-pr-integration/patch.yaml`
- `sdd/parches/paw-08-vcs-pr-integration/definicion.md`
- `sdd/parches/paw-08-vcs-pr-integration/decision.log`
- documentos contractuales aplicables listados en `patch.yaml`

---

## 2. Lectura brownfield

- `paw/core/artifact-lifecycle.md` ya reserva `integration.yaml` sin semantica
  provider-specific; este patch debe reemplazar la reserva por ownership vivo.
- `paw/orchestration/workflow.md` define operaciones lifecycle pero no entrega ni
  change-request integration.
- `paw/tools/**` tiene validators Node.js sin dependencias externas, con CLIs
  agregados y fixtures JSON/YAML simples.
- `paw/tests/**` usa contract tests Node `node:test` y fixture matrices con
  `case.json`/`expected.json`.
- `.codex/**` contiene runtime map, toolkit y skills candidate inactivas.
- `docs/README.md` es el unico mapa canonico de autoridad y debe registrar la
  nueva superficie viva.

---

## 3. Assumptions

- La nueva validacion debe funcionar sin red ni credenciales.
- El schema inicial de `integration.yaml` puede usar el parser YAML restringido
  existente para mantener consistencia con validators actuales.
- GitHub queda aislado como provider experimental; el contrato portable usa
  terminologia neutral de change request.

---

## 4. Zonas afectadas

### Docs

- `paw/integration/README.md`
- `paw/integration/integration-lifecycle.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/README.md`
- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `README.md`
- `AGENTS.md`
- `.codex/README.md`

### Codigo

- `paw/tools/integration/**`
- `paw/tools/validate-integration.mjs`
- `paw/tools/schemas/integration/integration.schema.json`
- `.codex/paw-toolkit/**`
- `.codex/skills/paw-integrate/SKILL.md`
- `.codex/paw-runtime-map.json`

### Configuracion, tests o build

- `paw/tests/contract/integration-*.test.mjs`
- `paw/tests/fixtures/integration/**`
- `tests/core-contracts.test.mjs`
- `tests/foundation-governance.test.mjs`
- `tests/schema-validator-conformance.test.mjs`

---

## 5. Bloques de implementacion

### Bloque 1 - Contrato portable

- Objetivo: documentar responsabilidades, estados, readiness y permisos de
  integracion sin proveedor concreto.
- Superficies afectadas: `paw/integration/**`, `paw/core/**`, `docs/**`,
  `README.md`, `AGENTS.md`.
- Cambios esperados: nueva autoridad registrada, `integration.yaml` definido,
  prompt operativo de commits/PRs.
- Dependencias: baseline SDD aprobado.
- Riesgos: duplicar doctrina en docs operativos.
- Validaciones asociadas: tests de gobernanza y revision manual de autoridad.

### Bloque 2 - Schema, validator y fixtures

- Objetivo: validar mechanically `integration.yaml` y matrices positivas/
  negativas.
- Superficies afectadas: `paw/tools/**`, `paw/tests/**`.
- Cambios esperados: CLI `validate-integration.mjs`, schema JSON, validator
  stdlib, fixtures standalone/member/draft/stale/closed/abandoned/absent.
- Dependencias: contrato portable.
- Riesgos: hacer del schema una fuente de verdad superior al contrato.
- Validaciones asociadas: nuevo test contractual y CLI fixtures.

### Bloque 3 - Codex candidate integration

- Objetivo: exponer `paw-integrate` como binding candidate inactivo.
- Superficies afectadas: `.codex/**`.
- Cambios esperados: skill, runtime map, toolkit subcommand de inspeccion
  mecanica y GitHub provider experimental sin operaciones destructivas.
- Dependencias: contrato y validator.
- Riesgos: que la skill parezca activar workflow v2 o permisos remotos.
- Validaciones asociadas: tests Codex runtime actualizados y manual no-activation.

### Bloque 4 - Reconciliacion y cierre

- Objetivo: sincronizar docs vivos, checks globales y artifacts SDD finales.
- Superficies afectadas: SDD workspace, docs y test inventory.
- Cambios esperados: backlogs cerrados, decision log actualizado, cierre formal.
- Dependencias: fases previas completadas.
- Riesgos: cerrar con drift sin clasificar.
- Validaciones asociadas: matriz completa de `AGENTS.md` y nuevo validator.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados: nuevo `paw/integration/**`, core lifecycle y
  registros en `docs/README.md`.
- Datos o contenido afectados: fixtures de integracion.
- Schemas o modelos afectados: nuevo schema de `integration.yaml`.
- Compatibilidad esperada: ningun cambio a schema de `patch.yaml`; `sdd/**`
  sigue activo y `paw/parches/**` sigue inactivo.

---

## 7. Validaciones previstas

### Documentales

- [x] verificar alineacion con `docs/README.md`
- [x] verificar no activacion de `paw/parches/**`
- [x] verificar que `_inbox/**` no se incluya en commits

### Tecnicas

- [x] nuevo validator `node paw/tools/validate-integration.mjs --fixtures --json`
- [x] tests contractuales de integracion
- [x] matriz vigente de `AGENTS.md`
- [x] `git diff --check`

### Manuales

- [x] revision de que el PR no es autoridad
- [x] revision de permisos separados y merge humano

---

## 8. Riesgos y mitigaciones

- riesgo: provider snapshot stale aceptado como vigente.
  - impacto: readiness erronea.
  - mitigacion: validar checks contra `head_sha`.
- riesgo: `program_id` interpretado como branch compartida.
  - impacto: integracion monolitica.
  - mitigacion: fixture de member y contrato explicito.
- riesgo: operaciones remotas sin consentimiento.
  - impacto: efectos externos no autorizados.
  - mitigacion: skill/toolkit solo inspeccion local por defecto; push/PR fuera del
    validator y bajo aprobacion humana.

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
  - cambio: plan tecnico inicial.
  - razon: convertir definicion aprobada en estrategia brownfield.

