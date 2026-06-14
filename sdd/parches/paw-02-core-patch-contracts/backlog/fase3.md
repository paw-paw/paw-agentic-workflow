# Backlog Fase 3: gates, drift y compatibilidad

## Estado

- Change id: `paw-02-core-patch-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `3 - Gates, drift y compatibilidad`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: Fases 1 y 2 cerradas
- Desbloquea: Fase 4

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- related docs del manifest
- artifacts del patch
- contratos core de Fases 1 y 2
- approved final handoff 02

## 2. Objetivo de la fase

- Resultado: contratos de decision gates, drift y compatibilidad, con estado repo-local reconciliado.
- Razon: el modelo no es operable por implementaciones posteriores sin escalado, reconciliacion y limites de transicion.
- Habilita: conformance final.

## 3. Rama spec

- Fuentes vivas modificadas: tres contratos core, `V1-TRANSITION.md` y `BOOTSTRAP-STATUS.md`.
- Reconciliacion: declarar implementado el core conceptual sin activar schema, writers, workflow o tooling v2.

## 4. Assumptions

- Las categorias requeridas pueden definirse de forma portable sin asignar comandos ni responsables repo-locales.

## 5. Precondiciones

- [x] modelo, autoridad y lifecycle publicados
- [x] Fases 1 y 2 versionadas
- [x] sin blockers

## 6. Alcance

### Si entra

- [x] gates humanos estructurales
- [x] seis categorias minimas de drift
- [x] protocolo de reconciliacion
- [x] compatibilidad v1/v2 y cutover
- [x] estado de transicion y bootstrap reconciliado

### No entra

- [x] tooling de gates o drift
- [x] migracion de historia
- [x] activacion candidate
- [x] schema o validator dual

## 7. Archivos y superficies

### Leer antes de editar

- `paw/core/**`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `sdd/core/decision-drift-policy.md`

### Editar

- `paw/core/decision-gates.md`
- `paw/core/drift-policy.md`
- `paw/core/compatibility-policy.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- este backlog

### Validar

- `node sdd/tools/validate-sdd.mjs`
- `git diff --check`
- revision manual de compatibilidad y no activacion

### No tocar

- `sdd/core/**`
- schemas, validator y fixtures
- `paw/parches/**`
- `.codex/**`
- tests hasta Fase 4

## 8. Checklist de ejecucion

### Bloque A - Relectura

- [x] releer contratos core y fuentes ancladas
- [x] contrastar requisitos de drift y compatibilidad con el handoff

### Bloque B - Inspeccion

- [x] localizar claims obsoletos de core inerte
- [x] confirmar invariantes v1 y cutover

### Bloque C - Edicion

- [x] crear contrato de decision gates
- [x] crear contrato de drift y reconciliacion
- [x] crear contrato de compatibilidad
- [x] actualizar inventario de transicion
- [x] actualizar estado bootstrap

### Bloque D - Registro

- [x] registrar findings, drift o decisiones no mecanicas

### Bloque E - Validacion

- [x] ejecutar validator repo
- [x] ejecutar `git diff --check`
- [x] revisar no dual-write, legacy y no activacion

### Bloque F - Cierre

- [x] registrar resultados
- [x] marcar fase `done`

## 9. Drift detectado

- Drift contractual esperado: fuentes ancladas aun describen el core como no implementado.

## 10. Hallazgos durante ejecucion

- `V1-TRANSITION.md` y `BOOTSTRAP-STATUS.md` separaban correctamente workflow de target, pero requerian distinguir el core conceptual ya implementado.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- Ninguna adicional.

## 13. Validaciones

### Documentales

- [ ] seis categorias y protocolo completos

### Tecnicas

- [ ] validator v1
- [ ] whitespace

### Manuales

- [ ] v1 activo, v2 conceptual, no dual-write

### Resultados

- `node sdd/tools/validate-sdd.mjs`: `pass`.
- `git diff --check`: `pass`.
- Revision manual de categorias, no dual-write, legacy y cutover: `pass`.

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] decisiones registradas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

### Riesgos

- Formular compatibilidad como activacion o migracion implicita.

### Pendientes

- Fase 4.
