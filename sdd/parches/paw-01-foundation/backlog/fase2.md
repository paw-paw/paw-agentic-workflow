# Backlog Fase 2: layout PAW inerte

## Estado

- Change id: `paw-01-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Fase: `2 - Layout PAW inerte`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: Fase 1 cerrada
- Desbloquea: Fase 3

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- artifacts principales del patch

## 2. Objetivo de la fase

- Resultado esperado: `paw/{core,parches,orchestration,tools,tests}` versionable, orientativo e inactivo.
- Razon: materializar el namespace objetivo sin crear una segunda implementacion.
- Cambio habilitado al cerrar: neutralizacion del runtime v1 contra el target ya documentado.

## 3. Rama spec

- Fuente viva o alcance modificado: layout objetivo definido por arquitectura y transicion.
- Reconciliacion esperada: cada README coincide con el indice y no agrega doctrina futura.

## 4. Assumptions

- Un README por directorio es suficiente para ownership y versionado.
- No se necesitan placeholders, `.gitkeep`, schemas, manifests ni archivos ejecutables.

## 5. Precondiciones

- [x] Fase 1 `done`
- [x] arquitectura y transicion vigentes
- [x] `paw/**` inexistente antes de ejecutar

## 6. Alcance

### Si entra

- [x] `paw/README.md`
- [x] `paw/core/README.md`
- [x] `paw/parches/README.md`
- [x] `paw/orchestration/README.md`
- [x] `paw/tools/README.md`
- [x] `paw/tests/README.md`

### No entra

- [x] schemas o contratos v2
- [x] workspaces de patch bajo `paw/parches/`
- [x] tooling, tests ejecutables, skills o agentes
- [x] cambios a `sdd/**` y `.codex/**`

## 7. Archivos y superficies

### Leer antes de editar

- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/README.md`

### Editar

- solo los seis READMEs bajo `paw/**`

### Validar

- arbol `paw/**`
- contenido inerte y ownership
- ausencia de symlinks y archivos adicionales
- validator repo y `git diff --check`

### No tocar

- `sdd/**`, excepto este backlog
- `.codex/**`
- `tests/**`
- schemas y manifests v1

## 8. Checklist de ejecucion

### Bloque A - Relectura

- [x] confirmar responsabilidades por capa
- [x] confirmar regla de no activacion

### Bloque B - Inspeccion

- [x] confirmar que `paw/**` no existe
- [x] confirmar que no hay symlinks

### Bloque C - Edicion

- [x] crear README raiz con mapa y estado
- [x] crear README de core
- [x] crear README de parches con prohibicion de escritura
- [x] crear README de orchestration
- [x] crear README de tools
- [x] crear README de tests

### Bloque D - Registro

- [x] registrar findings o decisiones no mecanicas

### Bloque E - Validacion

- [x] listar archivos y tipos bajo `paw/**`
- [x] ejecutar validator repo
- [x] ejecutar `git diff --check`
- [x] revisar que no se promete implementacion

### Bloque F - Cierre

- [x] registrar resultados y cambiar estado a `done`

## 9. Drift detectado

- Ninguno.

## 10. Hallazgos

- El layout exacto se materializo con seis READMEs y ningun archivo adicional.
- No fue necesario modificar el indice canonico: su entrada `paw/**/README.md` ya cubria las superficies creadas.

## 11. Blockers

- Ninguno.

## 12. Decisiones

- Ninguna nueva.

## 13. Validaciones

- [x] layout exacto
- [x] solo Markdown regular, sin symlinks
- [x] `paw/parches/` inactivo
- [x] validator repo: `pass`
- [x] `git diff --check`: `pass`

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

- Riesgo: interpretacion prematura del target como runtime.
- Pendiente: fases 3 y 4.
