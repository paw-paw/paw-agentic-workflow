# Backlog Fase 4: conformance y reconciliacion

## Estado

- Change id: `paw-01-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Fase: `4 - Conformance y reconciliacion`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: Fase 3 cerrada
- Desbloquea: `sdd-close`

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- fuentes vivas creadas por Fase 1
- layout creado por Fase 2
- runtime v1 actualizado por Fase 3
- artifacts principales del patch

## 2. Objetivo de la fase

- Resultado esperado: reglas estables del foundation protegidas por un test local y todas las validaciones globales en verde.
- Razon: cerrar con evidencia, no solo revision editorial.
- Cambio habilitado al cerrar: cierre formal del patch.

## 3. Rama spec

- Fuente viva o alcance modificado: conformance del foundation.
- Reconciliacion esperada: cada check deriva de una regla ya registrada; no introduce doctrina nueva.

## 4. Assumptions

- Node.js standard library es suficiente.
- Los checks de acoplamiento se limitan a superficies runtime activas y no penalizan procedencia legitima.

## 5. Precondiciones

- [x] Fases 1 a 3 `done`
- [x] comandos de validacion existentes confirmados
- [x] no hay blockers abiertos

## 6. Alcance

### Si entra

- [x] `tests/foundation-governance.test.mjs`
- [x] ajustes puntuales requeridos por fallos reales
- [x] actualizacion de artifacts con resultados

### No entra

- [x] CI o workflows remotos
- [x] dependencias
- [x] cambios de schema o validator v1
- [x] scope de patches posteriores

## 7. Archivos y superficies

### Leer antes de editar

- reglas de acceptance en definicion y fuentes vivas
- estilo de `tests/sdd-validation.test.mjs`
- arbol y runtime resultante

### Editar

- `tests/foundation-governance.test.mjs`
- artifacts de Fase 4
- solo fuentes que fallen un check justificado

### Validar

- todos los comandos globales
- busquedas manuales de naming y scope
- status Git y paths privados

### No tocar

- schema y fixtures v1
- `LICENSE`
- TSV de procedencia
- `_inbox/**`

## 8. Checklist de ejecucion

### Bloque A - Relectura

- [x] mapear cada acceptance criterion a un check o revision manual

### Bloque B - Inspeccion

- [x] confirmar APIs Node disponibles y estilo de tests

### Bloque C - Edicion

- [x] crear test de identidad e indice canonico
- [x] crear test de layout exacto e inerte
- [x] crear test de transicion y ausencia de writers v2
- [x] crear test de privacidad, symlinks y configuracion fija
- [x] crear test de desacoplamiento runtime
- [x] crear test de licencia/output visibility

### Bloque D - Drift

- [x] clasificar cualquier fallo contra plan y fuentes vivas
- [x] confirmar que `sdd-sync-drift` no aplica porque no cambio el significado de artifacts

### Bloque E - Validacion

- [x] `node sdd/tools/validate-sdd.mjs`
- [x] `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] `node --test tests/sdd-validation.test.mjs`
- [x] `node --test tests/foundation-governance.test.mjs`
- [x] `git diff --check`
- [x] revision manual de no objetivos

### Bloque F - Cierre

- [x] registrar resultados
- [x] reconciliar tasks
- [x] cambiar estado a `done`

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos

- El primer intento del test uso `git` como subprocess y recibio `EPERM` dentro del sandbox, aunque Git produjo output. El test se ajusto a Node filesystem APIs.
- `git ls-files` y `git check-ignore` se mantuvieron como validaciones separadas de la sesion.
- No se detecto drift contractual u operacional; `sdd-sync-drift` no fue necesario.

## 11. Blockers

- Ninguno.

## 12. Decisiones

- Ninguna nueva.

## 13. Validaciones

- `node sdd/tools/validate-sdd.mjs`: `pass`
- `node sdd/tools/validate-sdd.mjs --fixtures`: `pass`
- `node --test tests/sdd-validation.test.mjs`: `pass`
- `node --test tests/foundation-governance.test.mjs`: `pass`
- `git diff --check`: `pass`
- `_inbox/**` ignorado y no versionado: `pass`
- symlinks fuera de `.git` y `_inbox`: ninguno
- revision manual de no objetivos: `pass`

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] decisions registradas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

- Riesgo: falsos positivos por historia/procedencia.
- Pendiente: `sdd-close`, entrega Git y PR.
