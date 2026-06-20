# Plan: paw-09-manual-distribution

---

## Estado

- Change id: `paw-09-manual-distribution`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-08-vcs-pr-integration`
- Desbloquea: `paw-10-multiruntime-adapters`

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-09-manual-distribution/patch.yaml`
- `sdd/parches/paw-09-manual-distribution/definicion.md`
- `sdd/parches/paw-09-manual-distribution/decision.log`
- documentos contractuales aplicables listados en `patch.yaml`

---

## 2. Lectura brownfield

- `paw/tools/**` ya usa validators Node.js sin dependencias externas, CLIs
  agregados y fixtures por dominio.
- `paw/tests/**` usa `node:test`, fixtures bajo `paw/tests/fixtures/**` y tests
  contractuales por superficie.
- `.codex/**` contiene el runtime Codex candidate, toolkit, skills y agentes que
  deben poder distribuirse sin rutas absolutas del repo origen.
- `docs/licensing/OUTPUT-POLICY.md` ya define que usar PAW no licencia
  automaticamente outputs independientes bajo MPL 2.0.
- `paw/integration/commit-pr-policy.md` gobierna la cadencia de commits usada en
  este patch, con la desviacion humana de trabajar en `main`.
- No existe aun `paw/distribution/**`; el patch debe crear y registrar esa
  autoridad sin activar packaging, releases ni marketplaces.

---

## 3. Assumptions

- Un manifest deterministico generado desde una lista canonica de archivos es
  suficiente como unidad de distribucion candidate para este patch.
- Los escenarios de instalacion limpia, conflicto, verificacion, rollback y
  uninstall pueden cubrirse con fixtures temporales y comandos locales.
- El runtime Codex candidate se puede instalar copiando archivos declarados bajo
  `.codex/**` y `paw/**` al destino, sin depender de paths absolutos.
- Las instrucciones de instalacion manual pueden requerir aprobacion humana para
  overwrites sin implementar una UI interactiva completa.

---

## 4. Zonas afectadas

### Docs

- `paw/distribution/README.md`
- `paw/distribution/manifest.md`
- `paw/distribution/manual-installation.md`
- `paw/distribution/progressive-loading.md`
- `docs/README.md`
- `README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `docs/licensing/OUTPUT-POLICY.md`
- `paw/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/README.md`

### Codigo

- `paw/tools/distribution/**`
- `paw/tools/validate-distribution.mjs`
- `paw/tools/schemas/distribution/distribution-manifest.schema.json`
- optional toolkit command under `.codex/paw-toolkit/bin/paw-codex-toolkit.mjs`
- `.codex/paw-runtime-map.json`

### Configuracion, tests o fixtures

- `paw/tests/contract/distribution-validation.test.mjs`
- `paw/tests/contract/distribution-cli.test.mjs`
- `paw/tests/fixtures/distribution/**`
- cross-surface tests under `tests/**` when inventory or authority changes

---

## 5. Bloques de implementacion

### Bloque 1 - Contrato de distribucion manual

- Objetivo: crear la autoridad viva de distribucion manual candidate.
- Superficies afectadas: `paw/distribution/**`, docs de gobernanza e inventario.
- Cambios esperados: layout, manifest semantics, compatibility, requirements,
  install/upgrade/rollback/uninstall/verify, license/notices, progressive loading.
- Dependencias: baseline SDD aprobado.
- Riesgos: confundir distribucion candidate con release estable o portabilidad.
- Validaciones asociadas: tests de gobernanza/core, revision manual de no
  activacion y no publicacion.

### Bloque 2 - Manifest, checksums y validator

- Objetivo: agregar herramientas deterministicas para auditar la distribucion.
- Superficies afectadas: `paw/tools/distribution/**`,
  `paw/tools/validate-distribution.mjs`, schema y fixtures.
- Cambios esperados: manifest canonical, checksum SHA-256, deteccion de archivos
  faltantes/alterados, ausencia de `_inbox/**` y portfolio, compatibilidad
  declarada.
- Dependencias: contrato de distribucion.
- Riesgos: que el validator sustituya la autoridad documental.
- Validaciones asociadas: CLI canonical y fixtures, contract tests.

### Bloque 3 - Instalacion manual, conflicto y rollback

- Objetivo: implementar/verificar operaciones manuales reversibles.
- Superficies afectadas: herramientas de distribucion, fixtures y docs.
- Cambios esperados: plan de instalacion antes de escribir, deteccion de
  conflicto, aprobacion para overwrite, backup/rollback, uninstall solo de
  archivos propios, verificacion post-install.
- Dependencias: manifest y validator.
- Riesgos: remover archivos ajenos o escribir fuera del destino.
- Validaciones asociadas: fixtures clean/conflict/uninstall y pruebas con temp
  dirs.

### Bloque 4 - Codex candidate distribution binding

- Objetivo: exponer la distribucion Codex candidate sin activar v2 ni paths
  absolutos.
- Superficies afectadas: `.codex/**`, runtime map, toolkit, docs Codex.
- Cambios esperados: comandos o metadata de distribucion Codex, docs de uso,
  compatibilidad de schema/toolkit/runtime adapter.
- Dependencias: manifest/instalacion.
- Riesgos: parecer multiruntime o marketplace.
- Validaciones asociadas: tests Codex runtime y distribution validator.

### Bloque 5 - Reconciliacion integral y cierre

- Objetivo: ejecutar matriz completa, cerrar backlogs y crear `cierre.md`.
- Superficies afectadas: SDD workspace, docs de inventario y validaciones.
- Cambios esperados: decision log actualizado, backlogs completos, cierre formal.
- Dependencias: fases previas completadas.
- Riesgos: cerrar con drift sin clasificar.
- Validaciones asociadas: matriz completa de `AGENTS.md` y `git diff --check`.

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados: nuevo `paw/distribution/**` y registros en
  `docs/README.md`.
- Datos o contenido afectados: manifest canonical y fixtures de distribucion.
- Schemas o modelos afectados: nuevo schema de manifest de distribucion.
- Compatibilidad esperada: ningun cambio a schema de `patch.yaml`; `sdd/**`
  sigue activo y `paw/parches/**` sigue inactivo.

---

## 7. Validaciones previstas

### Documentales

- [x] verificar alineacion con `docs/README.md`
- [x] verificar no activacion de `paw/parches/**`
- [x] verificar que `_inbox/**` no se incluya en commits ni manifest

### Tecnicas

- [x] nuevo validator `node paw/tools/validate-distribution.mjs --fixtures --json`
- [x] tests contractuales de distribucion
- [x] tests de runtime Codex afectados
- [x] matriz vigente de `AGENTS.md`
- [x] `git diff --check`

### Manuales

- [x] revision de que la distribucion es candidate y no release `0.1.0`
- [x] revision de reglas de overwrite/rollback/uninstall
- [x] revision de carga progresiva sin carga indiscriminada

---

## 8. Riesgos y mitigaciones

- riesgo: manifest no deterministico.
  - impacto: dos instalaciones desde la misma unidad pueden divergir.
  - mitigacion: ordenar entradas, checksums SHA-256 y fixtures.
- riesgo: conflicto local detectado tarde.
  - impacto: escritura parcial antes de aprobacion.
  - mitigacion: plan dry-run y bloqueo antes de escribir.
- riesgo: licencias/notices incompletos.
  - impacto: auditoria de distribucion insuficiente.
  - mitigacion: manifest con licencia/notices por archivo o por default MPL.
- riesgo: docs recomiendan cargar todo PAW.
  - impacto: uso ineficiente y contrario al handoff.
  - mitigacion: guia de carga progresiva como contrato.

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
