# Cierre: paw-02-core-patch-contracts

Este documento es memoria auxiliar del cambio. Las reglas durables fueron promovidas a `paw/core/**` y registradas en las fuentes vivas del repositorio.

## Estado

- Change id: `paw-02-core-patch-contracts`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Status final: `closed`
- Fecha de cierre: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana
- Nivel de cierre: `anchored`

## 1. Resumen

- Objetivo original: materializar el micro-core portable y el contrato conceptual del patch v2 sin activar el workflow v2.
- Resultado ejecutado: siete contratos core autoritativos, fuentes de estado reconciliadas y conformance determinista.
- Alcance cerrado: modelo de patch, autoridad/evidencia, lifecycle de artifacts, decision gates, drift, compatibilidad y checks.
- Alcance diferido: schema y validator v2, workflows, catalogs, adapters, skills, integracion VCS, pilotos y cutover.

## 2. Rama spec

- Fuentes vivas reconciliadas:
  - `docs/README.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `README.md`
  - `AGENTS.md`
- Cambio promovido:
  - `paw/core/README.md`
  - `paw/core/patch-model.md`
  - `paw/core/artifact-lifecycle.md`
  - `paw/core/authority-and-evidence.md`
  - `paw/core/decision-gates.md`
  - `paw/core/drift-policy.md`
  - `paw/core/compatibility-policy.md`

## 3. Artifacts revisados

- `patch.yaml`
- `handover.md`
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

- Decision: promover `paw/core/**` como doctrina conceptual viva y autoritativa.
  - Fuente: handoff aprobado y `decision.log`.
  - Impacto: el indice canonico distingue core vivo de superficies ejecutables inactivas.
- Decision: mantener `sdd/**` como workflow activo hasta patch 14.
  - Fuente: compatibilidad aprobada y `decision.log`.
  - Impacto: no se modificaron manifest schema, validator, routing, writers ni workspaces v1.
- Decision: aplicar Conventional Commits como politica provisional de `paw-foundation`.
  - Fuente: instruccion humana y `decision.log`.
  - Impacto: preparacion, fases y cierre se versionaron por intencion; la doctrina portable queda diferida a patch 08.

## 5. Assumptions, blockers y findings

### Assumptions

- Los siete nombres de contrato preservan ownership claro: confirmado durante implementacion y conformance.
- El core documental puede activarse sin activar workflow v2: confirmado por inventario y tests de transicion.

### Blockers

- Ninguno al cierre.

### Findings

- `decision.log` coincide con la regla global `*.log` de `.gitignore`.
  - Evidencia: `git check-ignore -v`.
  - Impacto: se agrego explicitamente con `git add -f`; no se cambio la politica global de ignore.
- El test foundation tenia supuestos de separadores y finales de linea no portables.
  - Evidencia: primer run de `tests/foundation-governance.test.mjs` en Windows.
  - Impacto: helpers normalizados y exclusiones historicas restauradas.
- El primer batch de revalidacion fue interrumpido por timeout del revisor automatico de permisos.
  - Evidencia: resultados de herramienta sin ejecucion.
  - Impacto: se reintento una vez con menos procesos y todos los checks pasaron.

## 6. Drift

- Drift: fuentes foundation describian todo `paw/**` como inerte.
  - Categoria: `contractual`.
  - Fuente esperada: related docs del manifest.
  - Diferencia: `paw/core/**` debia pasar a contrato vivo sin activar otras superficies.
  - Accion: indice, arquitectura, transicion, bootstrap status y orientacion reconciliados.
  - Estado: resuelto.
- Drift: test foundation fijaba seis READMEs y paths POSIX.
  - Categoria: `operational` y `validation`.
  - Fuente esperada: estado real del layout y checks multiplataforma.
  - Diferencia: nuevos contratos y separadores Windows rompian inventario/exclusiones.
  - Accion: inventario explicito del core, paths normalizados y CRLF/LF aceptados.
  - Estado: resuelto.
- Drift: el nuevo check no figuraba en las listas operativas.
  - Categoria: `artifact`.
  - Fuente esperada: `AGENTS.md` y README.
  - Diferencia: `tests/core-contracts.test.mjs` era durable pero no descubrible.
  - Accion: comando promovido a ambas listas.
  - Estado: resuelto.

## 7. Reconciliacion de fuente viva

- Fuente viva afectada: indice canonico, arquitectura, transicion, bootstrap status, orientacion publica y validacion operativa.
- Cambio requerido: registrar autoridad del core, declarar su estado conceptual vivo y preservar inactividad del workflow v2.
- Estado: `aplicado`.
- Evidencia: contratos, documentos anclados y tests listados en este cierre.

## 8. Validaciones

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
- Validacion: tests SDD.
  - Tipo: `automated`
  - Comando: `node --test tests/sdd-validation.test.mjs`
  - Resultado esperado: pass.
  - Resultado obtenido: 2 tests pass.
  - Estado: `pass`
- Validacion: conformance foundation.
  - Tipo: `automated`
  - Comando: `node --test tests/foundation-governance.test.mjs`
  - Resultado esperado: pass.
  - Resultado obtenido: 6 tests pass.
  - Estado: `pass`
- Validacion: conformance core.
  - Tipo: `automated`
  - Comando: `node --test tests/core-contracts.test.mjs`
  - Resultado esperado: pass.
  - Resultado obtenido: 8 tests pass.
  - Estado: `pass`
- Validacion: whitespace.
  - Tipo: `automated`
  - Comando: `git diff --check`
  - Resultado esperado: sin errores.
  - Resultado obtenido: sin errores.
  - Estado: `pass`
- Validacion: limites manuales.
  - Tipo: `manual`
  - Revision: inventario `paw/**`, busqueda de runtimes/proveedores/stacks, `_inbox/**` y ejecutables/config v2.
  - Resultado esperado: core neutral; otras superficies inactivas; sin private input versionado ni v2 ejecutable.
  - Resultado obtenido: conforme.
  - Estado: `pass`

## 9. Riesgos residuales

- Riesgo: lectores pueden confundir contratos conceptuales con schema o workflow ejecutable.
  - Impacto: implementacion prematura.
  - Mitigacion: limites repetidos en core, transicion y bootstrap status; patch 03 es owner del schema.
- Riesgo: compatibilidad v2 aun no esta comprobada por validator dual.
  - Impacto: divergencia futura entre contrato y wire format.
  - Mitigacion: conformance documental actual y dependencia explicita del patch 03.
- Riesgo: la politica de commits sigue siendo manual y provisional.
  - Impacto: inconsistencia entre patches del programa.
  - Mitigacion: decision registrada y canonizacion diferida a patch 08.

## 10. Pendientes

- `paw-03-schema-validator-compatibility` implementa schema v2, validator y fixtures.
- Patches 06, 08 y 14 conservan ownership de workflow/conformance, VCS y cutover respectivamente.
- No hay pendientes requeridos para reabrir este patch.

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas
- [x] assumptions criticas resueltas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto
- [x] validaciones registradas
- [x] fuentes vivas reconciliadas
- [x] riesgos residuales visibles
