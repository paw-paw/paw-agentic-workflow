# Backlog Fase 1: modelo de patch, autoridad y evidencia

## Estado

- Change id: `paw-02-core-patch-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `1 - Modelo de patch, autoridad y evidencia`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: preparacion SDD completa y versionada
- Desbloquea: Fase 2

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- artifacts del patch
- related docs del manifest
- approved final handoff 02

## 2. Objetivo de la fase

- Resultado: core indexado y contratos de modelo, autoridad y evidencia publicados.
- Razon: los demas contratos necesitan vocabulario comun.
- Habilita: lifecycle de artifacts.

## 3. Rama spec

- Fuente viva modificada: `paw/core/**` y registro repo-local de autoridad.
- Reconciliacion: distinguir core vivo de superficies PAW ejecutables aun inactivas.

## 4. Assumptions

- La activacion documental acotada de `paw/core/**` es compatible con la prohibicion de activar `paw/parches/**`.

## 5. Precondiciones

- [x] artifacts SDD vigentes
- [x] politica provisional de commits registrada
- [x] branch del patch activa

## 6. Alcance

### Si entra

- [x] `paw/core/README.md`
- [x] `patch-model.md`
- [x] `authority-and-evidence.md`
- [x] registro y claims afectados

### No entra

- [x] lifecycle detallado, drift, gates y compatibilidad
- [x] tests finales
- [x] runtime v1

## 7. Archivos y superficies

### Leer antes de editar

- `paw/core/README.md`
- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `README.md`
- `paw/README.md`
- `sdd/core/**`

### Editar

- `paw/core/README.md`
- `paw/core/patch-model.md`
- `paw/core/authority-and-evidence.md`
- `docs/README.md`
- `docs/governance/ARCHITECTURE.md`
- `README.md`
- `paw/README.md`

### Validar

- Markdown editado
- `node sdd/tools/validate-sdd.mjs`
- `git diff --check`

### No tocar

- `sdd/core/**`
- `sdd/tools/**`
- `.codex/**`
- `paw/parches/**`
- schemas y fixtures

## 8. Checklist de ejecucion

### Bloque A - Relectura

- [x] releer artifacts y fuentes vivas
- [x] contrastar vocabulario v2 con baseline v1

### Bloque B - Inspeccion

- [x] localizar claims que tratan todo `paw/**` como inerte
- [x] confirmar registro canonico actual

### Bloque C - Edicion

- [x] convertir README del core en indice contractual
- [x] crear modelo conceptual de patch v2
- [x] crear contrato de autoridad, evidencia y promocion
- [x] registrar contratos con roles, autoridad, owner y verificacion
- [x] ajustar arquitectura y orientacion general sin activar otras superficies

### Bloque D - Registro

- [x] registrar findings o drift no mecanico

### Bloque E - Validacion

- [x] ejecutar validator repo
- [x] ejecutar `git diff --check`
- [x] revisar neutralidad y no objetivos

### Bloque F - Cierre

- [x] registrar resultados
- [x] marcar fase `done`

## 9. Drift detectado

- Drift contractual esperado: las fuentes foundation describian todo `paw/**` como inerte. Se reconcilio de forma acotada para activar solo los contratos conceptuales de `paw/core/**`.

## 10. Hallazgos durante ejecucion

- El registro canonico necesitaba entradas por archivo para asignar ownership y autoridad sin promover las otras superficies PAW.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- Las decisiones estructurales constan en `decision.log`.

## 13. Validaciones

### Documentales

- [ ] contratos coherentes y distribuidos en ingles

### Tecnicas

- [ ] validator v1
- [ ] whitespace

### Manuales

- [ ] sin activacion v2 ni doctrina dependiente de runtime

### Resultados

- `node sdd/tools/validate-sdd.mjs`: `pass`.
- `git diff --check`: `pass`.
- Revision manual de neutralidad, scope y activacion: `pass`.

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] decisiones registradas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

### Riesgos

- Activacion demasiado amplia por wording impreciso.

### Pendientes

- Fases 2 a 4.
