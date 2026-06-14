# Backlog Fase 2: validacion dual y compatibilidad historica

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no
introduce nuevas decisiones de producto por si solo.

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `2 - Validacion dual y compatibilidad historica`
- Estado: `done`
- Ultima actualizacion: `2026-06-14`
- Owner: sesion Codex activa
- Depende de: Fase 1 cerrada y commit `a8cd7b0`
- Desbloquea: Fase 3 - CLI contractual y bridge v1

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `paw/core/patch-model.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/compatibility-policy.md`
- `paw/tools/schemas/patch-v2.schema.json`
- `sdd/tools/schemas/patch.schema.json`
- `sdd/tools/validate-sdd.mjs`
- `sdd/parches/paw-03-schema-validator-compatibility/patch.yaml`
- `sdd/parches/paw-03-schema-validator-compatibility/definicion.md`
- `sdd/parches/paw-03-schema-validator-compatibility/plan.md`
- `sdd/parches/paw-03-schema-validator-compatibility/tasks.md`
- `sdd/parches/paw-03-schema-validator-compatibility/decision.log`
- approved final handoff 03

## 2. Objetivo de la fase

- Resultado esperado: dispatch dual v1/v2, validadores semanticos separados,
  validacion read-only de directorios y matriz de fixtures positiva/negativa.
- Razon de la fase: parsing y version detection ya son estables; falta convertir
  shape e invariantes en enforcement reusable antes de exponer una CLI.
- Cambio que queda habilitado al cerrar: entrypoint PAW y bridge v1 de Fase 3 sobre
  una unica implementacion canonica de validacion.

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - materializa invariantes de `paw/core/patch-model.md`;
  - preserva reglas v1 observables de `sdd/tools/validate-sdd.mjs`;
  - aplica compatibilidad read-only de `paw/core/compatibility-policy.md`.
- Reconciliacion esperada:
  - v1 y v2 usan validadores separados tras deteccion de version;
  - legacy produce evidencia de compatibilidad, no migracion ni error;
  - no se agrega CLI, traversal global ni cambio al entrypoint v1.

## 4. Assumptions

- Node.js standard library sigue siendo suficiente.
- El validator devuelve un resultado con `valid`, `schemaVersion`, `diagnostics` y
  `validatedPaths`; la serializacion contractual pertenece a Fase 3.
- Severidades admitidas en esta fase: `error`, `warning` y `compatibility`.
- La exencion legacy es la evidencia concreta de compatibilidad historica.
- No existe historia real con `closed_at` inconsistente; no se crea una tolerancia
  hipotetica.
- El adapter de directorio puede leer `patch.yaml`, `cierre.md` y `definicion.md`,
  pero nunca escribe.
- Containment se comprueba contra roots explicitamente entregados por el caller; la
  seleccion de `--root` y defaults pertenece a Fase 3.
- Los fixtures nuevos usan `expected.json` estructurado y no modifican
  `sdd/tests/**`.

## 5. Precondiciones

### Documentos

- [x] `definicion.md`, `plan.md` y `tasks.md` vigentes
- [x] handoff 03 y contratos core releidos
- [x] politica de compatibilidad y no dual-write vigente

### Decisiones previas

- [x] implementacion canonica bajo `paw/tools/**`
- [x] fixtures portables bajo `paw/tests/**`
- [x] v1 sigue siendo unico writer/default
- [x] no hay excepcion historica de `closed_at` que requiera decision

### Estado tecnico

- [x] Fase 1 marcada `done`
- [x] parser, diagnostics y detector versionado presentes
- [x] schema v1 conserva hash
  `C694A530ABFF48B2194A7A6563E3B477EDB37D1FD191C24627F376F43D19A104`
- [x] working tree limpio al crear el backlog

## 6. Alcance

### Si entra

- [x] implementar resultado y helpers de validacion compartidos
- [x] implementar reglas v1 equivalentes al validator activo
- [x] implementar required fields, tipos, enums e invariantes v2
- [x] despachar por version solo despues de parsing y detection exitosos
- [x] validar un patch directory read-only con roots permitidos
- [x] preservar legacy como exencion observable de compatibilidad
- [x] crear fixtures v1/v2 positivos y negativos obligatorios
- [x] probar no mutacion mediante snapshot de contenido
- [x] documentar modulos y fixture layout materializados

### No entra

- [ ] modificar `sdd/tools/validate-sdd.mjs`
- [ ] modificar `sdd/tests/**` o patches historicos
- [ ] implementar CLI, flags, stdout/stderr o exit codes
- [ ] recorrer el repo o seleccionar roots por defecto
- [ ] activar `paw/parches/**`, writers o skills v2
- [ ] permitir inconsistencias historicas sin evidencia real
- [ ] implementar catalogs, workflow o mutation envelopes

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- `paw/core/patch-model.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/compatibility-policy.md`
- `sdd/tools/validate-sdd.mjs`
- `sdd/tools/schemas/patch.schema.json`
- `sdd/tests/fixtures/**`
- `paw/tools/validation/**`
- `paw/tests/contract/patch-parsing.test.mjs`
- handoff 03, con foco en invariantes y fixtures obligatorios

### Editar

- `paw/tools/validation/validation-result.mjs`
- `paw/tools/validation/validate-v1-manifest.mjs`
- `paw/tools/validation/validate-v2-manifest.mjs`
- `paw/tools/validation/validate-patch-manifest.mjs`
- `paw/tools/validation/validate-patch-directory.mjs`
- `paw/tests/fixtures/patch-v1/**`
- `paw/tests/fixtures/patch-v2/**`
- `paw/tests/fixtures/invalid/**`
- `paw/tests/contract/patch-validation.test.mjs`
- `paw/tools/README.md`
- `paw/tests/README.md`
- este backlog durante ejecucion
- `tasks.md` al cerrar la fase
- `decision.log` solo si aparece una decision estructural

### Validar

- todos los modulos bajo `paw/tools/validation/**`
- matriz completa bajo `paw/tests/fixtures/**`
- contract tests de parsing y validacion
- schema v1 y suites globales existentes

### No tocar

- `sdd/tools/validate-sdd.mjs`
- `sdd/tools/schemas/patch.schema.json`
- `sdd/tests/**`
- `sdd/parches/**`, salvo artifacts de este patch
- `.codex/**`
- `paw/parches/**`
- `paw/orchestration/**`
- writers, templates y routing

## 8. Checklist de ejecucion

### Bloque A - Relectura e inventario

- [x] enumerar required fields, enums e invariantes v1 actuales
- [x] enumerar required fields, enums e invariantes v2 del core/handoff
- [x] confirmar reglas de cierre y batch que requieren evidencia de directorio
- [x] inventariar fixtures v1 existentes y preservar sus resultados
- [x] comprobar historia para inconsistencias reales de status/`closed_at`
- [x] confirmar hash del schema v1 antes de editar

### Bloque B - Contrato interno de resultados

- [x] definir resultado estable con `valid`, `schemaVersion`, `diagnostics` y
  `validatedPaths`
- [x] conservar diagnostics con code, severity, path, line y message
- [x] agregar helpers sin acoplar serializacion humana/JSON
- [x] permitir `compatibility` sin convertirla en error
- [x] mantener warnings y compatibility observables en el resultado

### Bloque C - Validator v1

- [x] exigir los nueve campos contractuales v1
- [x] rechazar propiedades no declaradas por v1
- [x] validar tipos, enums, fechas y arrays
- [x] preservar combinaciones `spec/spec-first`, `spec/spec-anchored` y
  `batch/spec-first`
- [x] rechazar `batch/spec-anchored`
- [x] exigir `related_docs` no vacio para `spec-anchored`
- [x] exigir `cierre.md` y `closed_at` para status `closed`
- [x] exigir `closed_at: null` para status no cerrado
- [x] rechazar `closed_at` anterior a `created_at`
- [x] validar secciones y criterio por item del contrato batch

### Bloque D - Validator v2

- [x] exigir exactamente los diez campos contractuales v2
- [x] rechazar propiedades adicionales
- [x] validar tipos, enums, fechas y arrays de strings no vacios
- [x] aceptar `program_id` string no vacio o null
- [x] exigir `creates_docs` no vacio y `bootstrap_context` no nulo para
  `docs-bootstrap`
- [x] exigir `bootstrap_context: null` para `intention-first`
- [x] exigir `related_docs` no vacio y `bootstrap_context: null` para
  `doc-anchored`
- [x] exigir `closed_at` no nulo para status `closed`
- [x] exigir `closed_at: null` para status distinto de `closed`
- [x] rechazar `closed_at` anterior a `created_at`

### Bloque E - Dispatch y adapter read-only

- [x] parsear texto y detener dispatch ante syntax diagnostics
- [x] detectar version y detener dispatch ante ausencia, desconocida o hibrida
- [x] ejecutar exclusivamente el validator de la version detectada
- [x] leer `patch.yaml` desde directorio sin mutarlo
- [x] aportar presencia de `cierre.md` y contenido de `definicion.md` a reglas v1
- [x] rechazar patch paths fuera de roots permitidos
- [x] aceptar roots Windows/POSIX mediante `resolve` y `relative`
- [x] reconocer legacy solo dentro de roots legacy explicitos
- [x] devolver compatibility diagnostic `PATCH_LEGACY_EXEMPT` para legacy
- [x] no exigir `patch.yaml` ni migracion dentro de legacy

### Bloque F - Fixtures v1

- [x] crear fixture valido `spec/spec-first`
- [x] crear fixture valido `spec/spec-anchored`
- [x] crear fixture valido `batch/spec-first` con definicion completa
- [x] crear fixture legacy exento sin manifest
- [x] crear negativo v1 para combinacion batch/spec-anchored
- [x] crear negativo v1 para batch contract incompleto
- [x] expresar expectativa con validity, version y diagnostic codes

### Bloque G - Fixtures v2 y comunes

- [x] crear fixture valido `docs-bootstrap`
- [x] crear fixture valido `intention-first`
- [x] crear fixture valido `doc-anchored`
- [x] cubrir `program_id` no nulo en al menos un fixture valido
- [x] crear negativo docs-bootstrap sin `creates_docs`
- [x] crear negativo docs-bootstrap sin `bootstrap_context`
- [x] crear negativo doc-anchored sin `related_docs`
- [x] crear negativos de `closed_at` para cerrado y no cerrado
- [x] crear manifest hibrido
- [x] crear version desconocida
- [x] crear YAML invalido
- [x] crear caso de path fuera de roots permitidos

### Bloque H - Contract tests y no mutacion

- [x] ejecutar fixtures mediante una tabla determinista
- [x] comprobar validity, schemaVersion y diagnostic codes esperados
- [x] comprobar severidades error/warning/compatibility
- [x] comprobar path y line cuando aplican
- [x] snapshotear contenido de todos los fixtures antes/despues de validar
- [x] comprobar que ningun archivo fue creado, eliminado o modificado
- [x] probar directamente dispatch v1/v2 y short-circuit de errores
- [x] mantener tests sin red, timers, prompts ni dependencias externas

### Bloque I - Registro de findings y drift

- [x] registrar cualquier divergencia entre reglas v1 y schema v1
- [x] registrar cualquier discrepancia entre schema v2 y core/handoff
- [x] detener si compatibilidad requiere modificar historia
- [x] registrar en `decision.log` solo decisiones estructurales nuevas

### Bloque J - Validacion

- [x] ejecutar `node --test paw/tests/contract/patch-parsing.test.mjs`
- [x] ejecutar `node --test paw/tests/contract/patch-validation.test.mjs`
- [x] ejecutar `node sdd/tools/validate-sdd.mjs`
- [x] ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] ejecutar `node --test tests/sdd-validation.test.mjs`
- [x] ejecutar `node --test tests/foundation-governance.test.mjs`
- [x] ejecutar `node --test tests/core-contracts.test.mjs`
- [x] ejecutar `git diff --check`
- [x] confirmar hash del schema v1 sin cambios
- [x] revisar que no hay cambios bajo `sdd/tests/**`, `paw/parches/**` o `.codex/**`

### Bloque K - Cierre

- [x] registrar resultados concretos en la seccion 13
- [x] actualizar findings, drift, blockers y decisiones
- [x] confirmar que CLI/traversal/bridge siguen asignados a Fase 3
- [x] marcar fase `done` solo con todas las validaciones requeridas en pass
- [x] actualizar Fase 2 a `done` en `tasks.md`
- [x] crear al menos un Conventional Commit despues del cierre validado

## 9. Drift detectado

- Ninguno. Las reglas v1 implementadas coinciden con el schema y validator baseline;
  las invariantes v2 coinciden con core y handoff 03.

## 10. Hallazgos durante ejecucion

- Estado inicial:
  - los fixtures v1 existentes cubren combinaciones base, cierre y batch, pero usan
    expectativas booleanas y permanecen como baseline operativo;
  - no existe historia real con status/`closed_at` inconsistente;
  - el validator v1 mezcla reglas de manifest y evidencia de directorio;
  - la exencion legacy actual se representa por ausencia de `patch.yaml`.
- Implementacion:
  - se agrego `validation-rules.mjs` como helper compartido para evitar duplicar
    required fields, unknown fields, tipos, enums, fechas y arrays;
  - el resultado interno conserva diagnostics sin fijar todavia serializacion CLI;
  - la matriz fisica incluye 8 casos v1 y 12 casos v2/comunes, incluida historia
    cerrada, legacy, sintaxis, version, hibridos y containment;
  - la prueba de no mutacion compara nombres y contenido de todo el arbol de fixtures
    antes y despues de validarlo.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- La validacion semantica se separa de la lectura read-only de directorio.
- La categoria `compatibility` representa la exencion legacy observable.
- No se introduce tolerancia historica sin un caso real documentado.
- La CLI y el bridge v1 permanecen en Fase 3.
- No aparecieron decisiones estructurales nuevas que requieran modificar
  `decision.log`.

## 13. Validaciones

### Documentales

- [x] reglas v1 equivalentes al baseline
- [x] invariantes v2 alineadas con core y handoff
- [x] compatibilidad no implica migracion, escritura o activacion

### Tecnicas

- [x] `node --test paw/tests/contract/patch-parsing.test.mjs`
- [x] `node --test paw/tests/contract/patch-validation.test.mjs`
- [x] `node sdd/tools/validate-sdd.mjs`
- [x] `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] `node --test tests/sdd-validation.test.mjs`
- [x] `node --test tests/foundation-governance.test.mjs`
- [x] `node --test tests/core-contracts.test.mjs`
- [x] `git diff --check`
- [x] hash del schema v1 sin cambios

### Manuales

- [x] fixtures y patches historicos no mutados
- [x] sin npm, Astro, Codex, red, prompts o timers
- [x] sin cambios en writers, skills, defaults o namespaces activos
- [x] diagnostics accionables en paths Windows y POSIX

### Resultados

- `node --test paw/tests/contract/patch-parsing.test.mjs`: 8 tests, 8 pass.
- `node --test paw/tests/contract/patch-validation.test.mjs`: 6 tests, 6 pass.
- `node sdd/tools/validate-sdd.mjs`: pass.
- `node sdd/tools/validate-sdd.mjs --fixtures`: pass.
- `node --test tests/sdd-validation.test.mjs`: 2 tests, 2 pass.
- `node --test tests/foundation-governance.test.mjs`: 6 tests, 6 pass.
- `node --test tests/core-contracts.test.mjs`: 8 tests, 8 pass.
- `git diff --check`: pass; solo avisos informativos LF/CRLF.
- schema v1 SHA-256:
  `C694A530ABFF48B2194A7A6563E3B477EDB37D1FD191C24627F376F43D19A104`.
- revision manual y `rg`: sin red, prompts, timers, CLI implicita ni cambios en
  `sdd/tests/**`, `paw/parches/**` o `.codex/**`.

## 14. Cierre

La fase solo se considera cerrada si:

- [x] checklist completo o pendientes explicitamente diferidos
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisiones relevantes registradas
- [x] blockers resueltos o diferidos con razon
- [x] drift documentado o resuelto
- [x] validaciones requeridas ejecutadas o justificadas
- [x] resultados de validacion registrados
- [x] matriz obligatoria del handoff cubierta
- [x] Fase 3 puede consumir el resultado sin duplicar reglas

## 15. Riesgos y pendientes

### Riesgos

- Duplicar enums o required fields entre schemas y codigo puede generar drift.
- La equivalencia v1 puede perder reglas de evidencia como cierre o batch.
- Un containment incorrecto puede aceptar paths hermanos con prefijo comun.
- Tests de no mutacion pueden omitir archivos creados si solo comparan contenido.

### Pendientes

- CLI, output estructurado final, exit codes y bridge v1 pertenecen a Fase 3.
- Traversal global y defaults de root pertenecen a Fase 3.
- Conformance/documentacion final y promocion de estado pertenecen a Fase 4.
