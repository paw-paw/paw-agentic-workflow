# Backlog Fase 1: modelo de patch, autoridad y evidencia

## Estado

- Change id: `paw-02-core-patch-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `1 - Modelo de patch, autoridad y evidencia`
- Estado: `ready`
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

- [ ] `paw/core/README.md`
- [ ] `patch-model.md`
- [ ] `authority-and-evidence.md`
- [ ] registro y claims afectados

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

- [ ] releer artifacts y fuentes vivas
- [ ] contrastar vocabulario v2 con baseline v1

### Bloque B - Inspeccion

- [ ] localizar claims que tratan todo `paw/**` como inerte
- [ ] confirmar registro canonico actual

### Bloque C - Edicion

- [ ] convertir README del core en indice contractual
- [ ] crear modelo conceptual de patch v2
- [ ] crear contrato de autoridad, evidencia y promocion
- [ ] registrar contratos con roles, autoridad, owner y verificacion
- [ ] ajustar arquitectura y orientacion general sin activar otras superficies

### Bloque D - Registro

- [ ] registrar findings o drift no mecanico

### Bloque E - Validacion

- [ ] ejecutar validator repo
- [ ] ejecutar `git diff --check`
- [ ] revisar neutralidad y no objetivos

### Bloque F - Cierre

- [ ] registrar resultados
- [ ] marcar fase `done`

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Pendiente.

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

- Pendiente.

## 14. Cierre

- [ ] checklist completo
- [ ] assumptions resueltas
- [ ] decisiones registradas
- [ ] blockers resueltos
- [ ] drift documentado
- [ ] validaciones ejecutadas

## 15. Riesgos y pendientes

### Riesgos

- Activacion demasiado amplia por wording impreciso.

### Pendientes

- Fases 2 a 4.
