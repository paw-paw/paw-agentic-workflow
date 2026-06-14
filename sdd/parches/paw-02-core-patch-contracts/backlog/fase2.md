# Backlog Fase 2: lifecycle y ownership de artifacts

## Estado

- Change id: `paw-02-core-patch-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `2 - Lifecycle y ownership de artifacts`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: Fase 1 cerrada
- Desbloquea: Fase 3

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- artifacts del patch
- `paw/core/README.md`
- `paw/core/authority-and-evidence.md`
- approved final handoff 02

## 2. Objetivo de la fase

- Resultado: contrato portable de responsabilidades, transiciones, promocion y memoria de artifacts.
- Razon: workflows y adapters posteriores necesitan ownership estable sin redefinirlo.
- Habilita: gates, drift y compatibilidad.

## 3. Rama spec

- Fuente viva modificada: `paw/core/artifact-lifecycle.md`.
- Reconciliacion: el indice ya reserva y registra este contrato; la fase materializa su contenido.

## 4. Assumptions

- `integration.yaml` puede reservarse con limites negativos sin definir provider fields ni estados concretos.

## 5. Precondiciones

- [x] Fase 1 cerrada y versionada
- [x] autoridad, evidencia y promocion definidas
- [x] sin blockers

## 6. Alcance

### Si entra

- [x] responsabilidades de nueve artifacts
- [x] secuencia conceptual y transiciones
- [x] promocion antes del cierre
- [x] memoria historica post-cierre

### No entra

- [x] schemas o templates ejecutables
- [x] semantica GitHub o VCS
- [x] workflow de bootstrap detallado
- [x] gates y drift detallados

## 7. Archivos y superficies

### Leer antes de editar

- `paw/core/README.md`
- `paw/core/authority-and-evidence.md`
- `sdd/core/artifact-lifecycle.md`

### Editar

- `paw/core/artifact-lifecycle.md`
- este backlog

### Validar

- `node sdd/tools/validate-sdd.mjs`
- `git diff --check`
- coverage manual de artifacts

### No tocar

- `sdd/core/**`
- `docs/**`
- `tests/**`
- `paw/parches/**`
- `.codex/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura

- [x] releer lifecycle v1 solo como baseline
- [x] releer contratos core de Fase 1

### Bloque B - Inspeccion

- [x] confirmar los nueve artifacts requeridos
- [x] separar identidad, narrativa, ejecucion, decisiones, cierre e integracion

### Bloque C - Edicion

- [x] crear tabla de ownership exclusivo
- [x] definir secuencia conceptual sin imponer un workflow completo
- [x] reservar `integration.yaml` sin semantica de proveedor
- [x] definir promocion y memoria post-cierre

### Bloque D - Registro

- [x] registrar findings, drift o decisiones no mecanicas

### Bloque E - Validacion

- [x] ejecutar validator repo
- [x] ejecutar `git diff --check`
- [x] verificar coverage y ausencia de semantica fuera de scope

### Bloque F - Cierre

- [x] registrar resultados
- [x] marcar fase `done`

## 9. Drift detectado

- Ninguno.

## 10. Hallazgos durante ejecucion

- El baseline v1 combina algunas responsabilidades operativas en sus skills; el contrato v2 conserva ownership conceptual sin exigir migracion en este patch.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- Ninguna adicional.

## 13. Validaciones

### Documentales

- [ ] ownership completo y no solapado

### Tecnicas

- [ ] validator v1
- [ ] whitespace

### Manuales

- [ ] `integration.yaml` permanece reservado y neutral

### Resultados

- `node sdd/tools/validate-sdd.mjs`: `pass`.
- `git diff --check`: `pass`.
- Coverage de nueve artifacts y neutralidad de `integration.yaml`: `pass`.

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] decisiones registradas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

### Riesgos

- Convertir lifecycle conceptual en workflow prescriptivo.

### Pendientes

- Fases 3 y 4.
