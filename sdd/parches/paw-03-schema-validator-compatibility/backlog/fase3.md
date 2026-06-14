# Backlog Fase 3: CLI contractual y bridge v1

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no
introduce nuevas decisiones de producto por si solo.

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `3 - CLI contractual y bridge v1`
- Estado: `active`
- Ultima actualizacion: `2026-06-14`
- Owner: sesion Codex activa
- Depende de: Fases 1 y 2 cerradas; commits `a8cd7b0` y `f4efdda`
- Desbloquea: Fase 4 - Conformance, documentacion y reconciliacion final

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `paw/core/compatibility-policy.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `sdd/tools/validate-sdd.mjs`
- `tests/sdd-validation.test.mjs`
- `paw/tools/validation/**`
- `paw/tests/fixtures/**`
- `sdd/parches/paw-03-schema-validator-compatibility/patch.yaml`
- `sdd/parches/paw-03-schema-validator-compatibility/definicion.md`
- `sdd/parches/paw-03-schema-validator-compatibility/plan.md`
- `sdd/parches/paw-03-schema-validator-compatibility/tasks.md`
- `sdd/parches/paw-03-schema-validator-compatibility/decision.log`
- approved final handoff 03

## 2. Objetivo de la fase

- Resultado esperado: CLI PAW determinista con output humano/JSON y un bridge v1
  compatible que delega parsing/manifest validation sin duplicar reglas.
- Razon de la fase: el validator reusable existe, pero aun no puede consumirse de
  forma automatizable ni sustituir la implementacion de manifest embebida en v1.
- Cambio que queda habilitado al cerrar: conformance y documentacion final pueden
  verificar una unica implementacion canonica y comandos estables.

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - materializa la interfaz de validator requerida por el handoff;
  - conserva `sdd/tools/validate-sdd.mjs` como entrypoint activo v1;
  - mantiene checks SDD locales de estructura y links bajo ownership v1.
- Reconciliacion esperada:
  - parsing y reglas de manifest dejan de estar duplicadas en `sdd/**`;
  - comandos v1 sin flags y `--fixtures` conservan output y exit status;
  - flags nuevos pueden delegar al CLI PAW sin activar writers o workspaces v2.

## 4. Assumptions

- Node.js standard library sigue siendo suficiente.
- Entry point PAW candidato: `paw/tools/validate-patches.mjs`.
- Version de CLI candidata: `paw-validator 0.1.0`; reporta schemas soportados `1,2`
  y no representa version de release PAW.
- Exit codes: `0` exito/help/version, `1` validation failure, `2` uso invalido.
- `--root <path>` selecciona un repository root read-only; default `cwd`.
- Ejecucion normal recorre `sdd/parches/*` y trata `sdd/parches/legacy/*` como
  compatibilidad; no activa ni recorre `paw/parches/**`.
- `--fixtures` ejecuta expectativas estructuradas de `paw/tests/fixtures/**`.
- Output estructurado usa exactamente: `status`, `schema_version`,
  `validated_paths`, `warnings`, `errors`, `evidence`.
- `schema_version` es `null`, un integer unico o `"mixed"` cuando el resultado
  agrega varias versiones.
- `evidence` contiene diagnostics de severidad `compatibility` y conteos; no incluye
  mutation envelopes.
- En modo humano, resumen va a stdout; validation/usage diagnostics van a stderr.
- En modo JSON, el documento completo va a stdout y stderr queda reservado para
  fallos de uso o ejecucion no serializables.
- El bridge v1 conserva exports `validateRepo`, `validateFixtures` y
  `validateMarkdownLinks`.

## 5. Precondiciones

### Documentos

- [x] `definicion.md`, `plan.md` y `tasks.md` vigentes
- [x] handoff 03 releido con foco en interfaz/output
- [x] boundaries de transicion y no dual-write vigentes

### Decisiones previas

- [x] tooling PAW es implementacion canonica
- [x] `sdd/tools/**` puede ser bridge v1
- [x] v1 sigue siendo unico default operativo y writer
- [x] CLI no implica activacion ni portabilidad multiruntime

### Estado tecnico

- [x] Fases 1 y 2 marcadas `done`
- [x] validator interno devuelve resultado estable
- [x] matriz PAW de 20 fixtures disponible
- [x] suites v1 actuales en pass
- [x] working tree limpio al crear el backlog

## 6. Alcance

### Si entra

- [ ] agregar aggregate validation de repo y fixtures PAW
- [ ] agregar serializacion humana y JSON contractual
- [ ] implementar parser de argumentos fail-loud
- [ ] implementar `--help`, `--version`, `--json`, `--root`, `--fixtures`
- [ ] implementar exit codes `0`, `1`, `2`
- [ ] probar stdout/stderr y combinaciones de flags
- [ ] convertir `sdd/tools/validate-sdd.mjs` en bridge de manifest validation
- [ ] preservar outputs v1 exactos sin flags y con `--fixtures`
- [ ] preservar exports v1 usados por tests
- [ ] documentar comandos y contrato del CLI materializado

### No entra

- [ ] cambiar writers, skills, templates o default schema
- [ ] activar o recorrer `paw/parches/**`
- [ ] eliminar checks v1 de estructura SDD o links Markdown
- [ ] mover fixtures existentes de `sdd/tests/**`
- [ ] declarar packaging, instalacion global o compatibilidad multiruntime
- [ ] agregar red, prompts, telemetria o dependencias npm
- [ ] modificar contratos core
- [ ] realizar reconciliacion documental final de Fase 4

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- `sdd/tools/validate-sdd.mjs`
- `tests/sdd-validation.test.mjs`
- `paw/tools/validation/**`
- `paw/tests/contract/patch-validation.test.mjs`
- `paw/tests/fixtures/**`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- handoff 03, secciones interfaz y criterios de aceptacion

### Editar

- `paw/tools/validation/aggregate-validation.mjs`
- `paw/tools/validation/validate-repository.mjs`
- `paw/tools/validation/validate-fixtures.mjs`
- `paw/tools/validation/format-validation-result.mjs`
- `paw/tools/cli/parse-validator-args.mjs`
- `paw/tools/cli/run-validator-cli.mjs`
- `paw/tools/validate-patches.mjs`
- `sdd/tools/validate-sdd.mjs`
- `paw/tests/contract/validator-cli.test.mjs`
- `tests/sdd-validation.test.mjs`
- `paw/tools/README.md`
- `paw/tests/README.md`
- este backlog durante ejecucion
- `tasks.md` al cerrar
- `decision.log` solo ante decision estructural nueva

### Validar

- CLI PAW como proceso
- bridge v1 como proceso y modulo importable
- aggregate repository/fixtures
- parsing/validation tests existentes
- suites globales y hash schema v1

### No tocar

- `sdd/tools/schemas/patch.schema.json`
- `sdd/tests/**`
- `paw/tests/fixtures/**`, salvo fixture CLI minimo si resulta imprescindible
- `sdd/parches/**`, salvo artifacts de este patch
- `.codex/**`
- `paw/parches/**`
- writers, skills, routing y templates

## 8. Checklist de ejecucion

### Bloque A - Relectura e inventario observable

- [ ] registrar output y exit code v1 sin flags
- [ ] registrar output y exit code v1 con `--fixtures`
- [ ] confirmar exports importados por tests y otros consumidores
- [ ] separar checks v1 de manifest, estructura repo, links y fixture harness
- [ ] inventariar flags inexistentes y comportamiento actual ante flags desconocidos
- [ ] confirmar que no existe package/version source reutilizable

### Bloque B - Aggregate result

- [ ] crear merger de resultados sin perder diagnostics ni validated paths
- [ ] deduplicar paths conservando orden determinista
- [ ] calcular `schema_version` null/integer/`mixed`
- [ ] mapear severidad warning a `warnings`
- [ ] mapear severidad error a `errors`
- [ ] mapear compatibility y conteos a `evidence`
- [ ] derivar `status: pass|fail` exclusivamente de errors

### Bloque C - Repository y fixture runners

- [ ] recorrer solo directorios inmediatos bajo `sdd/parches`
- [ ] validar patches no legacy con root permitido `sdd/parches`
- [ ] validar hijos de `sdd/parches/legacy` con legacy root explicito
- [ ] devolver error estructurado si root o `sdd/parches` no existe
- [ ] ordenar traversal para output determinista
- [ ] ejecutar los 20 fixtures PAW contra `expected.json`
- [ ] convertir expectation mismatch en error de harness accionable
- [ ] no escribir, crear ni corregir ningun fixture/patch

### Bloque D - Argumentos y CLI PAW

- [ ] implementar parser puro de argumentos
- [ ] aceptar `--help`, `--version`, `--json`, `--fixtures`
- [ ] aceptar `--root <path>` una sola vez
- [ ] rechazar flag desconocido con exit `2`
- [ ] rechazar valor ausente/duplicado de `--root` con exit `2`
- [ ] rechazar combinaciones ambiguas de help/version con ejecucion
- [ ] permitir `--json` con ejecucion normal o fixtures
- [ ] emitir help con usage, flags y exit codes
- [ ] emitir version de CLI y schemas soportados
- [ ] ejecutar sin prompts y capturar errores internos como exit `2`

### Bloque E - Serializacion

- [ ] emitir JSON parseable con las seis keys minimas
- [ ] conservar diagnostics completos dentro de warnings/errors/evidence
- [ ] emitir JSON en stdout para pass y fail
- [ ] dejar stderr vacio en modo JSON para validation failures
- [ ] emitir resumen humano compacto en stdout
- [ ] emitir validation diagnostics humanos en stderr
- [ ] no incluir timestamps, cwd implicito variable o ordering no determinista

### Bloque F - Bridge v1

- [ ] importar validator PAW desde `sdd/tools/validate-sdd.mjs`
- [ ] eliminar parser YAML y reglas de manifest duplicadas
- [ ] adaptar diagnostics PAW a strings v1 para exports existentes
- [ ] preservar checks de required directories/files SDD
- [ ] preservar validacion de links Markdown
- [ ] preservar fixture harness y exencion legacy v1
- [ ] preservar `validateRepo`, `validateFixtures`, `validateMarkdownLinks`
- [ ] preservar stdout exacto `SDD repo validation passed`
- [ ] preservar stdout exacto `SDD fixture validation passed`
- [ ] preservar formato fail-loud existente para comandos legacy
- [ ] delegar flags nuevos al runner PAW sin alterar invocaciones legacy

### Bloque G - Contract tests

- [ ] probar help/version con exit `0`
- [ ] probar repo humano y JSON validos
- [ ] probar fixtures humano y JSON validos
- [ ] probar root explicito valido
- [ ] probar root inexistente con exit `1`
- [ ] probar flag desconocido y `--root` incompleto con exit `2`
- [ ] probar validation failure JSON con stderr vacio y exit `1`
- [ ] comprobar keys y tipos del output estructurado
- [ ] comprobar output humano por stdout/stderr
- [ ] comprobar comandos legacy exactos con `spawnSync`
- [ ] comprobar exports legacy mediante tests existentes
- [ ] comprobar que bridge ya no contiene parser/reglas de manifest duplicadas

### Bloque H - Registro de findings y drift

- [ ] registrar diferencias observables entre CLI planeado y runtime v1
- [ ] registrar cualquier consumer que impida adelgazar el bridge
- [ ] detener si compatibilidad exige mantener dos implementaciones de manifest
- [ ] registrar en `decision.log` solo decisiones estructurales nuevas

### Bloque I - Validacion

- [ ] ejecutar `node paw/tools/validate-patches.mjs --help`
- [ ] ejecutar `node paw/tools/validate-patches.mjs --version`
- [ ] ejecutar `node paw/tools/validate-patches.mjs --json`
- [ ] ejecutar `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] ejecutar `node --test paw/tests/contract/patch-parsing.test.mjs`
- [ ] ejecutar `node --test paw/tests/contract/patch-validation.test.mjs`
- [ ] ejecutar `node --test paw/tests/contract/validator-cli.test.mjs`
- [ ] ejecutar `node sdd/tools/validate-sdd.mjs`
- [ ] ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] ejecutar `node --test tests/sdd-validation.test.mjs`
- [ ] ejecutar `node --test tests/foundation-governance.test.mjs`
- [ ] ejecutar `node --test tests/core-contracts.test.mjs`
- [ ] ejecutar `git diff --check`
- [ ] confirmar hash del schema v1 sin cambios
- [ ] revisar que no hay cambios en `sdd/tests/**`, `paw/parches/**` o `.codex/**`

### Bloque J - Cierre

- [ ] registrar resultados concretos en la seccion 13
- [ ] actualizar findings, drift, blockers y decisiones
- [ ] confirmar que docs/conformance final siguen asignados a Fase 4
- [ ] marcar fase `done` solo con todas las validaciones requeridas en pass
- [ ] actualizar Fase 3 a `done` en `tasks.md`
- [ ] crear al menos un Conventional Commit despues del cierre validado

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Estado inicial:
  - `sdd/tools/validate-sdd.mjs` combina manifest rules, estructura SDD, links,
    fixture harness y CLI;
  - `tests/sdd-validation.test.mjs` importa tres exports del entrypoint v1;
  - output legacy exitoso consta de una unica linea estable;
  - no existe source de version de paquete ni dependencia npm.

## 11. Blockers

- Ninguno al crear el backlog.

## 12. Decisiones tomadas

- El bridge conserva checks SDD locales que no pertenecen al validator portable.
- El CLI PAW agrega resultados de patches; no valida links Markdown ni doctrina SDD.
- Exit codes candidatos: `0` exito, `1` validation failure, `2` usage/internal.
- La version CLI no se presenta como version de release PAW.

## 13. Validaciones

### Documentales

- [ ] CLI alineado con interfaz minima del handoff
- [ ] bridge v1 conserva default operativo
- [ ] docs no afirman activacion, packaging o portabilidad

### Tecnicas

- [ ] comandos directos de help/version/json/fixtures
- [ ] tres contract test suites PAW
- [ ] comandos y tests legacy
- [ ] suites globales foundation/core
- [ ] `git diff --check`
- [ ] hash schema v1 sin cambios

### Manuales

- [ ] una sola implementacion de parsing/manifest validation
- [ ] stdout/stderr y exit codes revisados
- [ ] sin red, prompts, timers, npm, Astro o Codex
- [ ] sin cambios en writers, skills, workspaces o fixtures v1

### Resultados

- Pendientes de ejecucion.

## 14. Cierre

La fase solo se considera cerrada si:

- [ ] checklist completo o pendientes explicitamente diferidos
- [ ] assumptions criticas resueltas, aceptadas o escaladas
- [ ] decisiones relevantes registradas
- [ ] blockers resueltos o diferidos con razon
- [ ] drift documentado o resuelto
- [ ] validaciones requeridas ejecutadas o justificadas
- [ ] resultados de validacion registrados
- [ ] CLI cumple output minimo y exit codes
- [ ] bridge v1 preserva comandos/exports sin duplicar reglas
- [ ] Fase 4 puede reconciliar docs contra comportamiento estable

## 15. Riesgos y pendientes

### Riesgos

- El bridge puede conservar demasiada logica brownfield y dejar ownership ambiguo.
- El aggregate puede perder schema versions o diagnostics al fusionar resultados.
- El fixture runner puede confundir fallo esperado de fixture con fallo del harness.
- Paths absolutos pueden volver snapshots/JSON dependientes de maquina.
- Flags nuevos en el entrypoint v1 pueden romper el output legacy por accidente.

### Pendientes

- Reconciliacion de docs vivas, bootstrap status y comandos pertenece a Fase 4.
- Conformance global y claims finales pertenecen a Fase 4.
- Packaging, instalacion y adapters portables permanecen diferidos.
