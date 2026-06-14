# Cierre: paw-01-foundation

Este documento es memoria auxiliar del cambio. Las reglas durables fueron reconciliadas hacia las fuentes vivas registradas en `docs/README.md`.

## Estado

- Change id: `paw-01-foundation`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Status final: `closed`
- Fecha de cierre: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana
- Nivel de cierre: `standard`

## 1. Resumen

- Objetivo original: establecer identidad, autoridad, namespace objetivo y transicion inicial de PAW sin activar v2.
- Resultado ejecutado: gobierno publico, indice canonico, arquitectura, naming, licencia/output policy, layout `paw/**` inerte, runtime v1 neutralizado y conformance local.
- Alcance cerrado: las cuatro fases seleccionadas.
- Alcance diferido: contratos PAW v2, schemas, catalogs, adapters, skills `paw-*`, pilotos, packaging, release y cutover.

## 2. Rama spec

- Fuente viva reconciliada:
  - `README.md`
  - `docs/README.md`
  - `AGENTS.md`
  - `CONTRIBUTING.md`
  - `docs/governance/ARCHITECTURE.md`
  - `docs/governance/NAMING.md`
  - `docs/governance/V1-TRANSITION.md`
  - `docs/governance/BOOTSTRAP-STATUS.md`
  - `docs/licensing/OUTPUT-POLICY.md`
  - `LICENSES/README.md`
  - `sdd/README.md`
  - `sdd/core/README.md`
  - `sdd/parches/README.md`
- Cambio promovido: identidad PAW, autoridad local, ownership de capas, naming, limites de transicion y politica de outputs.

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

- Decision: `docs/README.md` es el unico indice canonico y politica de precedencia.
  - Fuente: handoff 01 y decision log.
  - Impacto: `AGENTS.md` queda como puente operativo, no segunda doctrina.
- Decision: roles documentales y autoridad son dimensiones separadas.
  - Fuente: ledger y consulta legacy acotada de roles/conformance.
  - Impacto: registro canonico con roles, authority level, owner y verification default.
- Decision: documentacion creada o modificada queda en ingles sin traducir masivamente compatibilidad v1 fuera de scope.
  - Fuente: `FIX-09`, `TS-06` y consulta legacy acotada de secuencia.
  - Impacto: READMEs v1 editados en ingles; templates y fixtures no afectados conservados.
- Decision: `paw/**` se materializa solo con READMEs orientativos.
  - Fuente: handoff 01.
  - Impacto: target visible sin activar writers, schemas o tooling.
- Decision: reabrir temporalmente el cierre para corregir drift de `sdd/parches/README.md`.
  - Fuente: auditoria final contra `docs/governance/V1-TRANSITION.md`.
  - Impacto: el unico workspace writable queda descrito de forma consistente.

## 5. Assumptions, blockers y findings

### Assumptions

- El handoff 00 estaba completado y el baseline publico era la base correcta: confirmado por repo reality.
- Titular y notices existentes eran vigentes: no se encontro evidencia contradictoria.
- Referencias al portfolio restantes en procedencia describen origen, no comportamiento activo.

### Blockers

- Ninguno al cierre.

### Findings

- Algunos archivos importados conservaban permisos locales de solo lectura.
  - Evidencia: fallo inicial de escritura durante Fase 3.
  - Impacto: se habilito escritura solo en la lista aprobada; Git no registra cambios de modo.
- Invocar Git desde el test Node produjo `EPERM` bajo sandbox.
  - Evidencia: primer resultado de `tests/foundation-governance.test.mjs`.
  - Impacto: el test usa filesystem; checks Git se ejecutan por separado.
- La primera auditoria de cierre encontro un README v1 no incluido en la edicion inicial.
  - Evidencia: `sdd/parches/README.md` describia el workspace como futuro.
  - Impacto: se ejecuto `sdd-sync-drift`, se corrigio el documento y se repitio el cierre.

## 6. Drift

- Drift: descripcion obsoleta del workspace v1.
  - Categoria: `operational`
  - Fuente esperada: `docs/governance/V1-TRANSITION.md`.
  - Diferencia encontrada: `sdd/parches/README.md` presentaba el workspace como futuro y portable.
  - Accion: reapertura temporal, actualizacion en ingles, validacion completa y segundo cierre mediante `sdd-sync-drift`.
  - Estado: resuelto.
- Drift: ajustes de permisos y test sandbox.
  - Categoria: `minor`
  - Fuente esperada: runbook de ejecucion.
  - Diferencia encontrada: archivos locales read-only y `EPERM` al lanzar Git desde Node.
  - Accion: permisos locales acotados y separacion de checks Git.
  - Estado: resuelto.

## 7. Reconciliacion de fuente viva

- Fuente viva afectada: indice, gobierno, arquitectura, naming, transicion, licencia/output policy y runtime v1.
- Cambio requerido: promover todas las reglas durables del handoff 01.
- Estado: `aplicado`.
- Evidencia: fuentes listadas en la seccion 2 y tests de foundation.

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
- Validacion: test SDD v1.
  - Tipo: `automated`
  - Comando: `node --test tests/sdd-validation.test.mjs`
  - Resultado esperado: pass.
  - Resultado obtenido: pass.
  - Estado: `pass`
- Validacion: conformance foundation.
  - Tipo: `automated`
  - Comando: `node --test tests/foundation-governance.test.mjs`
  - Resultado esperado: pass.
  - Resultado obtenido: pass.
  - Estado: `pass`
- Validacion: whitespace y patch format.
  - Tipo: `automated`
  - Comando: `git diff --check`
  - Resultado esperado: sin output.
  - Resultado obtenido: sin output.
  - Estado: `pass`
- Validacion: `_inbox/**` privado.
  - Tipo: `manual`
  - Revision: `git ls-files '_inbox/**'` y `git check-ignore`.
  - Resultado esperado: ningun archivo versionado y regla ignore activa.
  - Resultado obtenido: sin archivos versionados; `.gitignore:2:_inbox/`.
  - Estado: `pass`
- Validacion: symlinks.
  - Tipo: `automated`
  - Revision: test foundation y `find` fuera de `.git`/`_inbox`.
  - Resultado esperado: ninguno.
  - Resultado obtenido: ninguno.
  - Estado: `pass`
- Validacion: no objetivos y claims.
  - Tipo: `manual`
  - Revision: docs, layout, runtime y diff.
  - Resultado esperado: sin v2 activo, portabilidad, packaging, Pages o scope del patch 02.
  - Resultado obtenido: conforme.
  - Estado: `pass`

## 9. Riesgos residuales

- Riesgo: lectores pueden confundir el layout target con una implementacion.
  - Impacto: uso prematuro.
  - Mitigacion: estado `Inactive` repetido y test de layout.
- Riesgo: v1 permanece activo y conserva deuda heredada fuera del scope.
  - Impacto: terminologia o estructuras transitorias hasta patch 14.
  - Mitigacion: inventario de transicion y patches seriales.
- Riesgo: no existe gate CI.
  - Impacto: validaciones dependen de ejecucion local.
  - Mitigacion: comandos deterministas documentados; CI permanece fuera de scope por decision vinculante.

## 10. Pendientes

- No hay pendientes requeridos para `paw-01-foundation`.
- Los handoffs 02 a 14 permanecen fuera de scope y no fueron iniciados.

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas
- [x] assumptions criticas resueltas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto
- [x] validaciones registradas
- [x] fuentes vivas reconciliadas
- [x] riesgos residuales visibles
