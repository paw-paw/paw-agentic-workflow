# Cierre: paw-03-schema-validator-compatibility

Este documento es memoria auxiliar del cambio. Los contratos y comportamientos
durables fueron promovidos a las fuentes vivas y superficies propietarias indicadas
abajo.

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Status final: `closed`
- Fecha de cierre: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Nivel de cierre: `drift-heavy`

## 1. Resumen

- Objetivo original: materializar schema v2, validacion dual y fixtures ejecutables
  sin cambiar el default operativo v1.
- Resultado ejecutado: schema v2 fisico, parser YAML acotado, deteccion de version,
  validadores separados v1/v2, CLI contractual, bridge v1, 20 fixtures y conformance.
- Alcance cerrado: las cuatro fases seleccionadas, incluida la reconciliacion final
  de documentacion, ownership, independencia, no mutacion y no activacion.
- Alcance diferido: writers v2, workflow portable, mutation envelopes, integracion
  VCS portable, packaging, activacion y cutover.

## 2. Rama spec

- Fuentes vivas reconciliadas:
  - `README.md`
  - `AGENTS.md`
  - `docs/README.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
- Cambio promovido:
  - `paw/tools/schemas/patch-v2.schema.json`
  - `paw/tools/validation/**`
  - `paw/tools/cli/**`
  - `paw/tools/validate-patches.mjs`
  - `paw/tests/contract/**`
  - `paw/tests/fixtures/**`
  - `tests/schema-validator-conformance.test.mjs`
  - `sdd/tools/validate-sdd.mjs` como bridge v1

## 3. Artifacts revisados

- `patch.yaml`
- `definicion.md`
- `plan.md`
- `tasks.md`
- `backlog/fase1.md`
- `backlog/fase2.md`
- `backlog/fase3.md`
- `backlog/fase4.md`
- `decision.log`

Todos los backlogs estan `done`.

## 4. Decisiones relevantes

- Decision: materializar la implementacion canonica nueva bajo `paw/tools/**` y su
  evidencia portable bajo `paw/tests/**`.
  - Fuente: handoffs 00 y 03, decision ledger, contratos vivos y `decision.log`.
  - Impacto: `sdd/**` preserva el workflow v1 y solo delega validacion mediante un
    bridge compatible.
- Decision: conservar writers y default v1 mientras se agrega soporte read/validate
  para v2.
  - Fuente: compatibility policy y `decision.log`.
  - Impacto: no se crearon workspaces, writers, skills ni defaults v2.
- Decision: exponer `paw-validator 0.1.0` con schemas `1,2` y exit codes estables.
  - Fuente: handoff 03 y `decision.log`.
  - Impacto: existe una interfaz automatizable sin presentar una release PAW.
- Decision: completar el parche mediante un pull request de seguimiento despues del
  merge anticipado `86645bd`.
  - Fuente: aprobacion humana y `decision.log`.
  - Impacto: se preservo la historia; no hubo revert, rebase, force-push ni rewrite.
- Decision: aplicar la politica provisional de commits de `paw-foundation`.
  - Fuente: instruccion humana y `decision.log`.
  - Impacto: preparacion, fases y cierre se versionaron por intencion; la doctrina
    portable permanece asignada a `paw-08-vcs-pr-integration`.

## 5. Assumptions, blockers y findings

### Assumptions

- Node.js standard library era suficiente: confirmado; no se agregaron dependencias.
- El subset YAML acotado cubria los manifests reales inventariados: confirmado.
- No existia historia real que justificara tolerar `closed_at` inconsistente:
  confirmado durante la matriz de compatibilidad.

### Blockers

- Ninguno al cierre.

### Findings

- El schema JSON v1 no era enforcement runtime y el validator v1 mezclaba parsing,
  reglas, links y CLI.
  - Evidencia: lectura brownfield de `sdd/tools/validate-sdd.mjs`.
  - Impacto: parsing y manifest validation se extrajeron a PAW; checks SDD locales
    permanecieron en el bridge.
- Los documentos de estado negaban schema, tooling y tests ya materializados.
  - Evidencia: claims previos en README, arquitectura y bootstrap status.
  - Impacto: las fuentes vivas ahora distinguen materializacion de activacion.
- La matriz existente ya contenia los 20 casos esperados, incluido `program_id` v2.
  - Evidencia: fixture runner y `tests/schema-validator-conformance.test.mjs`.
  - Impacto: la fase final agrego trazabilidad sin duplicar fixtures.

## 6. Drift

- Drift: interpretacion inicial que ubicaba schema y tooling nuevo bajo `sdd/**`.
  - Categoria: `contractual`.
  - Fuente esperada: handoffs, ledger y ownership incremental de `paw/**`.
  - Diferencia encontrada: `sdd/**` debia preservar v1; la implementacion v2
    pertenecia a sus superficies PAW propietarias.
  - Accion: `AGENTS.md`, definicion, plan, tasks y decision log fueron reconciliados
    antes de implementar.
  - Estado: resuelto.
- Drift: fuentes vivas negaban superficies PAW materializadas.
  - Categoria: `contractual`.
  - Fuente esperada: estado real aprobado por patch 03.
  - Diferencia encontrada: README, arquitectura y bootstrap status aun describian
    schema, tooling y tests PAW como inexistentes o inactivos.
  - Accion: claims y comandos operativos actualizados; conformance agregada.
  - Estado: resuelto.
- Drift: fases 1-3 integradas por `86645bd` antes de fase 4 y cierre.
  - Categoria: `operational` e `integration`.
  - Fuente esperada: politica provisional de commits y lifecycle SDD.
  - Diferencia encontrada: implementacion integrada mientras el patch seguia activo.
  - Accion: rama de seguimiento desde `origin/main`, fase 4 validada y cierre
    independiente, sin reescritura de historia.
  - Estado: resuelto.

## 7. Reconciliacion de fuente viva

- Fuente viva afectada: indice, estado publico, arquitectura, transicion, bootstrap
  status y comandos operativos.
- Cambio requerido: registrar schema y validator dual materializados sin activar
  workspaces, writers o workflow v2.
- Estado: `aplicado`.
- Evidencia: documentos listados en la seccion 2 y conformance top-level.

## 8. Validaciones

- Validacion: CLI PAW sobre el repositorio.
  - Tipo: `automated`
  - Comando: `node paw/tools/validate-patches.mjs --json`
  - Resultado esperado: pass, schema v1, tres patches.
  - Resultado obtenido: pass, schema `1`, tres patches y cero errores.
  - Estado: `pass`
- Validacion: matriz PAW.
  - Tipo: `automated`
  - Comando: `node paw/tools/validate-patches.mjs --fixtures --json`
  - Resultado esperado: 20 fixtures con expectativas correctas.
  - Resultado obtenido: 20 fixtures, 8 validos y 12 invalidos esperados.
  - Estado: `pass`
- Validacion: suite tecnica completa.
  - Tipo: `automated`
  - Comando: `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
  - Resultado esperado: pass.
  - Resultado obtenido: 43 tests, 43 pass.
  - Estado: `pass`
- Validacion: repositorio SDD v1.
  - Tipo: `automated`
  - Comando: `node sdd/tools/validate-sdd.mjs`
  - Resultado esperado: sin errores.
  - Resultado obtenido: `SDD repo validation passed`.
  - Estado: `pass`
- Validacion: fixtures SDD v1.
  - Tipo: `automated`
  - Comando: `node sdd/tools/validate-sdd.mjs --fixtures`
  - Resultado esperado: sin errores.
  - Resultado obtenido: `SDD fixture validation passed`.
  - Estado: `pass`
- Validacion: whitespace.
  - Tipo: `automated`
  - Comando: `git diff --check`
  - Resultado esperado: sin errores.
  - Resultado obtenido: sin errores; solo avisos locales LF/CRLF.
  - Estado: `pass`
- Validacion: limites de activacion y no mutacion.
  - Tipo: `manual`
  - Revision: writers/skills, `paw/parches/**`, imports, APIs de escritura, fixture
    snapshots y hash del schema v1.
  - Resultado esperado: v1 unico writer; validator read-only y local.
  - Resultado obtenido: conforme; schema v1 conserva SHA-256
    `C694A530ABFF48B2194A7A6563E3B477EDB37D1FD191C24627F376F43D19A104`.
  - Estado: `pass`

## 9. Riesgos residuales

- Riesgo: el subset YAML deliberadamente acotado puede no cubrir sintaxis futura.
  - Impacto: manifests futuros con YAML avanzado fallaran de forma explicita.
  - Mitigacion: comportamiento fail-loud y ampliacion solo mediante patch gobernado.
- Riesgo: lectores pueden interpretar soporte v2 como activacion del workflow.
  - Impacto: adopcion prematura de writers o workspaces no aprobados.
  - Mitigacion: limites repetidos en fuentes vivas y conformance de no activacion.
- Riesgo: las validaciones siguen siendo locales y no CI-gated.
  - Impacto: dependen de ejecucion disciplinada durante contribucion.
  - Mitigacion: comandos deterministas documentados; Actions permanece fuera de scope.
- Riesgo: la politica de commits sigue siendo manual y provisional.
  - Impacto: posible inconsistencia hasta su canonizacion.
  - Mitigacion: decision registrada y owner futuro en patch 08.

## 10. Pendientes

- `paw-04-catalogs-presets` continua la secuencia del programa.
- `paw-06` conserva ownership de workflow portable y conformance general.
- `paw-07` conserva ownership de toolkit y mutation envelopes.
- `paw-08-vcs-pr-integration` canoniza integracion y politica VCS.
- Patches 09, 10 y 14 conservan packaging, activacion y cutover.
- No hay pendientes que requieran reabrir este patch.

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas
- [x] assumptions criticas resueltas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto
- [x] validaciones registradas
- [x] fuentes vivas reconciliadas
- [x] riesgos residuales visibles
