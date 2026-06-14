# Backlog Fase 1: identidad, autoridad y gobierno

Este documento es auxiliar. No redefine precedencia ni sustituye contratos.

## Estado

- Change id: `paw-01-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Fase: `1 - Identidad, autoridad y gobierno`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: intake, plan y tasks completos
- Desbloquea: Fase 2

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-01-foundation/patch.yaml`
- `sdd/parches/paw-01-foundation/definicion.md`
- `sdd/parches/paw-01-foundation/plan.md`
- `sdd/parches/paw-01-foundation/tasks.md`
- `sdd/parches/paw-01-foundation/decision.log`
- `_inbox/final/01-foundation-identity-authority-handoff.md`

## 2. Objetivo de la fase

- Resultado esperado: fuentes vivas en ingles para identidad, autoridad, arquitectura, naming, contribucion, transicion y licencia.
- Razon: el layout PAW no puede documentarse sin un mapa y ownership aprobados.
- Cambio habilitado al cerrar: creacion del layout objetivo inerte.

## 3. Rama spec

- Fuente viva modificada: gobierno publico y repo-local.
- Reconciliacion esperada: decisiones vinculantes promovidas desde el handoff a `docs/**`, README y contributor guidance.

## 4. Assumptions

- La politica de autoridad puede vivir completa en `docs/README.md`; los documentos enlazados explican capas o temas sin redefinir precedencia.
- `NOTICES.md` no necesita cambio si conserva titular, licencia y ausencia de dependencias.

## 5. Precondiciones

- [x] artifacts SDD vigentes
- [x] naming y autoridad resueltos
- [x] branch `patch/paw-01-foundation` activa

## 6. Alcance

### Si entra

- [x] fuentes vivas y contributor guidance del patch 01
- [x] visibilidad de MPL-2.0 y output policy
- [x] indice canonico con roles, autoridad, precedencia y ownership

### No entra

- [x] layout `paw/**`
- [x] runtime v1 bajo `sdd/**` o `.codex/**`
- [x] schemas, validators y tests

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- `README.md`
- `AGENTS.md`
- `docs/README.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `docs/governance/PROVENANCE.md`
- `docs/licensing/OUTPUT-POLICY.md`
- `LICENSES/README.md`
- `NOTICES.md`

### Editar

- `README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/README.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/NAMING.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/licensing/OUTPUT-POLICY.md`
- `LICENSES/README.md`

### Validar

- todos los Markdown editados
- `node sdd/tools/validate-sdd.mjs`
- `git diff --check`

### No tocar

- `LICENSE`
- `NOTICES.md`, salvo finding de atribucion
- `docs/provenance/*.tsv`
- `paw/**`
- `sdd/**`, excepto artifacts de este patch
- `.codex/**`
- `tests/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

- [x] releer handoff, definicion, plan y decisions de identidad/autoridad
- [x] confirmar roles y niveles de autoridad desde ledger/legacy relacionado

### Bloque B - Inspeccion de estado actual

- [x] identificar claims bootstrap que deben actualizarse
- [x] confirmar licencia y notices existentes
- [x] confirmar que procedencia historica no debe reescribirse

### Bloque C - Edicion por archivo

- [x] reescribir `README.md` con formulacion oficial, estado, estructura, transicion, validacion y licencia
- [x] convertir `docs/README.md` en indice canonico y politica unica
- [x] reducir `AGENTS.md` a reglas operativas y referencias al indice
- [x] crear `CONTRIBUTING.md`
- [x] crear arquitectura de capas con ownership y limites
- [x] crear politica de naming y compatibilidad historica
- [x] crear inventario y regla de transicion v1
- [x] actualizar bootstrap status
- [x] ampliar output policy y license map sin crear excepciones nuevas

### Bloque D - Registro

- [x] registrar findings o decisions no mecanicas
- [x] verificar que no se uso legacy adicional

### Bloque E - Validacion

- [x] ejecutar validator repo
- [x] ejecutar `git diff --check`
- [x] revisar idioma, claims y links

### Bloque F - Cierre

- [x] marcar checklist completo
- [x] registrar resultados
- [x] cambiar estado a `done`

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- `NOTICES.md` ya contiene titular, licencia y estado de dependencias correctos; no requirio cambio.
- Los TSV de procedencia y `LICENSE` permanecen intactos.
- Las coincidencias con nombres prohibidos en `docs/governance/NAMING.md` son ejemplos normativos negativos, no naming activo.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- Las decisiones de arquitectura documental ya constan en `decision.log`.

## 13. Validaciones

### Documentales

- [x] indice y documentos enlazados no se contradicen
- [x] toda documentacion distribuible editada esta en ingles

### Tecnicas

- [x] `node sdd/tools/validate-sdd.mjs`
- [x] `git diff --check`

### Manuales

- [x] referencias al portfolio restantes son historicas o de procedencia
- [x] no se promete portabilidad ni activacion v2

### Resultados

- Validator repo: `pass` (`SDD repo validation passed`).
- Diff whitespace: `pass`.
- Revision de idioma, claims, links, licencia y procedencia: `pass`.

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] decisions registradas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

### Riesgos

- Duplicacion de autoridad entre indice y documentos tematicos.

### Pendientes

- Fases 2 a 4.
