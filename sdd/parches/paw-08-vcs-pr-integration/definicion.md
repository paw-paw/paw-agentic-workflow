# Definicion: paw-08-vcs-pr-integration

---

## Estado

- Change id: `paw-08-vcs-pr-integration`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: handoff final 08 filtrado en `handover.md`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Objetivo

Implementar la integracion VCS/change-request de PAW para que branches, commits,
pull requests, checks y delivery disposition queden modelados como evidencia
gobernada sin convertir al proveedor GitHub en autoridad. El patch debe promover
la semantica de `integration.yaml`, documentar la politica portable de commits y
PRs, agregar validacion deterministica y exponer una integracion Codex candidate
inactiva que pueda operar localmente con proveedor `absent`.

---

## 2. No objetivos

- Resolver automaticamente review comments o review threads.
- Automatizar merge, squash, rebase, force-push o limpieza destructiva.
- Activar Pages, Actions, releases, packaging, deployment o CI nuevo.
- Dar soporte completo a proveedores no GitHub.
- Crear una rama de integracion por `program_id`.
- Activar `paw/parches/**`, writers v2 o cambiar el workflow default antes del
  cutover.
- Reescribir patches historicos para simular cumplimiento retroactivo.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/README.md`
- `paw/core/patch-model.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/decision-gates.md`
- `paw/core/drift-policy.md`
- `paw/core/compatibility-policy.md`
- `paw/orchestration/README.md`
- `paw/orchestration/workflow.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/README.md`
- `.codex/paw-runtime-map.json`
- `sdd/parches/paw-08-vcs-pr-integration/handover.md`

---

## 4. Alcance

### Si entra

- Promover un contrato portable de integracion VCS/change-request.
- Definir responsabilidades, lifecycle y estados de `integration.yaml`.
- Agregar schema, validator, fixtures y tests contractuales para integracion.
- Documentar permisos separados para lectura local, branch, commit, push,
  PR/checks y merge humano.
- Agregar un provider adapter GitHub experimental acotado a inspeccion y snapshot.
- Agregar una skill Codex candidate `paw-integrate` o equivalente y registrar la
  operacion en el runtime map sin activar v2.
- Agregar un prompt operativo breve para politica de commits/PRs.
- Reconciliar docs vivos y checks deterministas afectados.

### Fuera de alcance

- Automatizacion de merge o resolucion de reviews.
- Activacion de GitHub Actions o cualquier pipeline remoto nuevo.
- Soporte portable completo de proveedores distintos de GitHub.
- Cambios a `sdd/**` que reemplacen el workflow v1 activo.
- Crear workspaces bajo `paw/parches/**`.

---

## 5. Superficies afectadas

### Docs

- `docs/README.md`
- `README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/core/README.md`
- `paw/core/artifact-lifecycle.md`
- `paw/orchestration/README.md`
- nuevo contrato bajo `paw/integration/**`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/README.md`

### Codigo o contenido

- `.codex/paw-runtime-map.json`
- `.codex/paw-toolkit/**`
- `.codex/skills/paw-integrate/**`
- `paw/tools/**`
- `paw/tests/**`

### Configuracion o validacion

- `tests/foundation-governance.test.mjs`
- `tests/core-contracts.test.mjs`
- `tests/schema-validator-conformance.test.mjs`
- nuevos tests contractuales de integracion bajo `paw/tests/contract/**`

---

## 6. Decisiones conocidas

- decision: crear `patch/paw-08-vcs-pr-integration` desde `origin/main`.
  - razon: `origin/main` contiene el merge de `paw-07`.
  - documentos o areas afectadas: branch de ejecucion y `decision.log`.
- decision: canonizar `integration.yaml` en este patch.
  - razon: `artifact-lifecycle.md` lo reservaba explicitamente para un contrato
    posterior y el handoff 08 es ese owner.
  - documentos o areas afectadas: `paw/core/artifact-lifecycle.md` y nuevo
    contrato `paw/integration/**`.
- decision: modelar GitHub como provider adapter experimental.
  - razon: el core debe permanecer neutral y no proveedor-especifico.
  - documentos o areas afectadas: `paw/integration/**`, `.codex/**`.

---

## 7. Assumptions

- Conventional Commits es el default portable, con bindings locales resueltos por
  adapters.
- La integracion debe validar evidencia local y fixtures sin requerir credenciales
  remotas.
- El provider GitHub puede serializar snapshots, pero no es autoridad y no decide
  readiness por si solo.
- La ausencia de proveedor remoto (`absent`) es un caso valido.

---

## 8. Decisiones abiertas

- Ninguna bloqueante para `sdd-plan`.

---

## 9. Riesgos

- riesgo: mezclar estado del proveedor con readiness PAW.
  - impacto: un PR abierto podria parecer suficiente para cerrar o declarar merge.
  - mitigacion: estados separados y fixtures de stale checks/absent provider.
- riesgo: contaminar core con detalles GitHub.
  - impacto: el contrato perderia neutralidad portable.
  - mitigacion: contrato neutral y provider adapter experimental separado.
- riesgo: agentes futuros publiquen commits WIP o reescriban historia.
  - impacto: se rompe trazabilidad SDD.
  - mitigacion: prompt operativo, permisos separados y guardrails de skill.

---

## 10. Criterio de cierre

La definicion queda lista para `sdd-plan` porque:

- [x] objetivo y no objetivos estan claros
- [x] las fuentes de verdad aplicables estan listadas
- [x] el alcance y fuera de alcance no se contradicen
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] las decisiones abiertas estan visibles
- [x] los riesgos principales estan identificados

---

## 11. Registro de cambios

- Fecha: 2026-06-20
  - cambio: definicion inicial del patch.
  - razon: intake aprobado desde handoff final 08.

