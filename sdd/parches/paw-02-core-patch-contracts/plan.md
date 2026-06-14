# Plan: paw-02-core-patch-contracts

## Estado

- Change id: `paw-02-core-patch-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `ready-for-tasks`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: `paw-01-foundation` cerrado e integrado
- Desbloquea: `paw-03-schema-validator-compatibility`

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-02-core-patch-contracts/patch.yaml`
- `sdd/parches/paw-02-core-patch-contracts/definicion.md`
- `sdd/parches/paw-02-core-patch-contracts/decision.log`
- related docs declarados en el manifest
- `sdd/core/**` como baseline v1, no como destino de doctrina v2

## 2. Lectura brownfield

- `paw/core/README.md` existe como orientacion inerte y debe convertirse en indice contractual.
- `docs/README.md` registra actualmente `paw/**/README.md` como supporting e inerte; necesita entradas por contrato y ownership explicito.
- Arquitectura, transicion, bootstrap status, README raiz y `paw/README.md` afirman que todo `paw/**` es inerte.
- `tests/foundation-governance.test.mjs` exige exactamente seis READMEs bajo `paw/**`; debe distinguir el core activado de las superficies de workflow aun inactivas.
- Los contratos v1 bajo `sdd/core/**` ofrecen evidencia de estructura, pero no deben copiarse ni modificarse para simular v2.

## 3. Assumptions

- El core puede activarse documentalmente sin activar namespace de workspaces, orchestration, tools, tests o adapters.
- Los contratos conceptuales no requieren frontmatter ni schema en este patch.

## 4. Zonas afectadas

### Docs

- `paw/core/**`
- `README.md`
- `AGENTS.md`
- `paw/README.md`
- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`

### Codigo

- Ninguno.

### Configuracion, tests o build

- `tests/foundation-governance.test.mjs`
- `tests/core-contracts.test.mjs`
- validation command lists in `README.md` and `AGENTS.md`
- workspace SDD del patch

## 5. Bloques de implementacion

### Bloque 1 - Modelo, autoridad y evidencia

- Objetivo: definir identidad y modos del patch v2, y separar autoridad de evidencia.
- Cambios esperados: README de core, `patch-model.md`, `authority-and-evidence.md`, registro canonico y claims generales.
- Dependencias: foundation cerrado.
- Riesgos: confundir v2 conceptual con runtime activo.
- Validaciones: contenido requerido, neutralidad y checks foundation adaptados solo cuando corresponda.

### Bloque 2 - Lifecycle de artifacts

- Objetivo: asignar una responsabilidad no solapada a cada artifact y definir promocion antes del cierre.
- Cambios esperados: `artifact-lifecycle.md` con `integration.yaml` reservado.
- Dependencias: vocabulario de autoridad del Bloque 1.
- Riesgos: introducir semantica de workflow o proveedor fuera de scope.
- Validaciones: tabla completa, ownership exclusivo y limites explicitos.

### Bloque 3 - Gates, drift y compatibilidad

- Objetivo: definir escalado humano, reconciliacion y convivencia v1/v2.
- Cambios esperados: `decision-gates.md`, `drift-policy.md`, `compatibility-policy.md` y fuentes de estado ancladas.
- Dependencias: modelo y lifecycle definidos.
- Riesgos: activar implicitamente v2 o exigir migracion historica.
- Validaciones: categorias minimas, no dual-write, exencion legacy y patch 14 como unico cutover.

### Bloque 4 - Conformance y reconciliacion

- Objetivo: automatizar invariantes estables y cerrar drift entre foundation y core.
- Cambios esperados: test dedicado, adaptacion del test foundation y reconciliacion final.
- Dependencias: contratos completos.
- Riesgos: tests fragiles basados en redaccion incidental.
- Validaciones: suite completa, `git diff --check` y revision manual.

## 6. Datos, schemas y contratos

- Contratos documentales afectados: modelo de patch, autoridad/evidencia, lifecycle, gates, drift y compatibilidad.
- Datos o contenido afectados: Markdown y artifacts SDD.
- Schemas o modelos afectados: ninguno ejecutable; el manifest v2 es conceptual.
- Compatibilidad: validator y manifests v1 permanecen sin cambios; el futuro schema v2 implementara estos contratos en patch 03.

## 7. Validaciones previstas

### Documentales

- Alineacion con indice, arquitectura, transicion y bootstrap status.
- Ingles distribuible y terminologia PAW.
- Ausencia de doctrina universal dependiente de runtime, proveedor, stack o VCS.

### Tecnicas

- `node sdd/tools/validate-sdd.mjs`
- `node sdd/tools/validate-sdd.mjs --fixtures`
- `node --test tests/sdd-validation.test.mjs`
- `node --test tests/foundation-governance.test.mjs`
- `node --test tests/core-contracts.test.mjs`
- `git diff --check`

### Manuales

- Sin schema, validator, catalogs, adapters, skills o workflow v2.
- `paw/parches/**` inactivo y sin dual-write.
- `integration.yaml` reservado sin semantica GitHub.

## 8. Riesgos y mitigaciones

- Activacion parcial mal explicada: usar lenguaje preciso de "live core contracts" y mantener inactivas las superficies ejecutables.
- Duplicacion con v1: referenciar compatibilidad, no copiar contratos v1 como v2.
- Sobreautomatizacion: testear invariantes semanticos estables, no frases completas salvo vocabulario contractual.

## 9. Decisiones humanas abiertas

- Estado: `none`

## 10. Criterio de cierre tecnico

- [x] alcance respeta la definicion
- [x] zonas afectadas identificadas
- [x] bloques secuenciables
- [x] validaciones reales y proporcionales
- [x] assumptions clasificadas
- [x] sin decisiones bloqueantes

## 11. Registro de cambios

- `2026-06-13`
  - Plan brownfield inicial.
