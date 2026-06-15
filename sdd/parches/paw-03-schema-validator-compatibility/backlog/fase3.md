# Backlog Fase 3: CLI contractual y bridge v1

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no
introduce nuevas decisiones de producto por si solo.

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `3 - CLI contractual y bridge v1`
- Estado: `done`
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

- [x] agregar aggregate validation de repo y fixtures PAW
- [x] agregar serializacion humana y JSON contractual
- [x] implementar parser de argumentos fail-loud
- [x] implementar `--help`, `--version`, `--json`, `--root`, `--fixtures`
- [x] implementar exit codes `0`, `1`, `2`
- [x] probar stdout/stderr y combinaciones de flags
- [x] convertir `sdd/tools/validate-sdd.mjs` en bridge de manifest validation
- [x] preservar outputs v1 exactos sin flags y con `--fixtures`
- [x] preservar exports v1 usados por tests
- [x] documentar comandos y contrato del CLI materializado

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

- [x] registrar output y exit code v1 sin flags
- [x] registrar output y exit code v1 con `--fixtures`
- [x] confirmar exports importados por tests y otros consumidores
- [x] separar checks v1 de manifest, estructura repo, links y fixture harness
- [x] inventariar flags inexistentes y comportamiento actual ante flags desconocidos
- [x] confirmar que no existe package/version source reutilizable

### Bloque B - Aggregate result

- [x] crear merger de resultados sin perder diagnostics ni validated paths
- [x] deduplicar paths conservando orden determinista
- [x] calcular `schema_version` null/integer/`mixed`
- [x] mapear severidad warning a `warnings`
- [x] mapear severidad error a `errors`
- [x] mapear compatibility y conteos a `evidence`
- [x] derivar `status: pass|fail` exclusivamente de errors

### Bloque C - Repository y fixture runners

- [x] recorrer solo directorios inmediatos bajo `sdd/parches`
- [x] validar patches no legacy con root permitido `sdd/parches`
- [x] validar hijos de `sdd/parches/legacy` con legacy root explicito
- [x] devolver error estructurado si root o `sdd/parches` no existe
- [x] ordenar traversal para output determinista
- [x] ejecutar los 20 fixtures PAW contra `expected.json`
- [x] convertir expectation mismatch en error de harness accionable
- [x] no escribir, crear ni corregir ningun fixture/patch

### Bloque D - Argumentos y CLI PAW

- [x] implementar parser puro de argumentos
- [x] aceptar `--help`, `--version`, `--json`, `--fixtures`
- [x] aceptar `--root <path>` una sola vez
- [x] rechazar flag desconocido con exit `2`
- [x] rechazar valor ausente/duplicado de `--root` con exit `2`
- [x] rechazar combinaciones ambiguas de help/version con ejecucion
- [x] permitir `--json` con ejecucion normal o fixtures
- [x] emitir help con usage, flags y exit codes
- [x] emitir version de CLI y schemas soportados
- [x] ejecutar sin prompts y capturar errores internos como exit `2`

### Bloque E - Serializacion

- [x] emitir JSON parseable con las seis keys minimas
- [x] conservar diagnostics completos dentro de warnings/errors/evidence
- [x] emitir JSON en stdout para pass y fail
- [x] dejar stderr vacio en modo JSON para validation failures
- [x] emitir resumen humano compacto en stdout
- [x] emitir validation diagnostics humanos en stderr
- [x] no incluir timestamps, cwd implicito variable o ordering no determinista

### Bloque F - Bridge v1

- [x] importar validator PAW desde `sdd/tools/validate-sdd.mjs`
- [x] eliminar parser YAML y reglas de manifest duplicadas
- [x] adaptar diagnostics PAW a strings v1 para exports existentes
- [x] preservar checks de required directories/files SDD
- [x] preservar validacion de links Markdown
- [x] preservar fixture harness y exencion legacy v1
- [x] preservar `validateRepo`, `validateFixtures`, `validateMarkdownLinks`
- [x] preservar stdout exacto `SDD repo validation passed`
- [x] preservar stdout exacto `SDD fixture validation passed`
- [x] preservar formato fail-loud existente para comandos legacy
- [x] delegar flags nuevos al runner PAW sin alterar invocaciones legacy

### Bloque G - Contract tests

- [x] probar help/version con exit `0`
- [x] probar repo humano y JSON validos
- [x] probar fixtures humano y JSON validos
- [x] probar root explicito valido
- [x] probar root inexistente con exit `1`
- [x] probar flag desconocido y `--root` incompleto con exit `2`
- [x] probar validation failure JSON con stderr vacio y exit `1`
- [x] comprobar keys y tipos del output estructurado
- [x] comprobar output humano por stdout/stderr
- [x] comprobar comandos legacy exactos con `spawnSync`
- [x] comprobar exports legacy mediante tests existentes
- [x] comprobar que bridge ya no contiene parser/reglas de manifest duplicadas

### Bloque H - Registro de findings y drift

- [x] registrar diferencias observables entre CLI planeado y runtime v1
- [x] registrar cualquier consumer que impida adelgazar el bridge
- [x] detener si compatibilidad exige mantener dos implementaciones de manifest
- [x] registrar en `decision.log` solo decisiones estructurales nuevas

### Bloque I - Validacion

- [x] ejecutar `node paw/tools/validate-patches.mjs --help`
- [x] ejecutar `node paw/tools/validate-patches.mjs --version`
- [x] ejecutar `node paw/tools/validate-patches.mjs --json`
- [x] ejecutar `node paw/tools/validate-patches.mjs --fixtures --json`
- [x] ejecutar `node --test paw/tests/contract/patch-parsing.test.mjs`
- [x] ejecutar `node --test paw/tests/contract/patch-validation.test.mjs`
- [x] ejecutar `node --test paw/tests/contract/validator-cli.test.mjs`
- [x] ejecutar `node sdd/tools/validate-sdd.mjs`
- [x] ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`
- [x] ejecutar `node --test tests/sdd-validation.test.mjs`
- [x] ejecutar `node --test tests/foundation-governance.test.mjs`
- [x] ejecutar `node --test tests/core-contracts.test.mjs`
- [x] ejecutar `git diff --check`
- [x] confirmar hash del schema v1 sin cambios
- [x] revisar que no hay cambios en `sdd/tests/**`, `paw/parches/**` o `.codex/**`

### Bloque J - Cierre

- [x] registrar resultados concretos en la seccion 13
- [x] actualizar findings, drift, blockers y decisiones
- [x] confirmar que docs/conformance final siguen asignados a Fase 4
- [x] marcar fase `done` solo con todas las validaciones requeridas en pass
- [x] actualizar Fase 3 a `done` en `tasks.md`
- [x] crear al menos un Conventional Commit despues del cierre validado

## 9. Drift detectado

- Ninguno. El handoff permite ajustar layout y el bridge preserva todos los
  consumers/outputs observados sin duplicar manifest validation.

## 10. Hallazgos durante ejecucion

- Estado inicial:
  - `sdd/tools/validate-sdd.mjs` combina manifest rules, estructura SDD, links,
    fixture harness y CLI;
  - `tests/sdd-validation.test.mjs` importa tres exports del entrypoint v1;
  - output legacy exitoso consta de una unica linea estable;
  - no existe source de version de paquete ni dependencia npm.
- Implementacion:
  - el CLI agrega manifests del repo o la matriz de 20 fixtures en orden estable;
  - JSON relativiza paths contenidos por el root y conserva paths externos
    accionables;
  - fixtures negativos esperados cuentan como evidencia exitosa; solo mismatch del
    harness produce error;
  - el bridge conserva estructura SDD, links, fixture harness y tres exports, pero
    delega parsing y manifest validation;
  - `paw-validator 0.1.0` identifica el contrato CLI y schemas `1,2`, no una release
    de PAW.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- El bridge conserva checks SDD locales que no pertenecen al validator portable.
- El CLI PAW agrega resultados de patches; no valida links Markdown ni doctrina SDD.
- Exit codes: `0` exito, `1` validation failure, `2` usage/internal.
- La version CLI no se presenta como version de release PAW.
- El contrato durable y la estrategia de bridge quedaron registrados en
  `decision.log`.

## 13. Validaciones

### Documentales

- [x] CLI alineado con interfaz minima del handoff
- [x] bridge v1 conserva default operativo
- [x] docs no afirman activacion, packaging o portabilidad

### Tecnicas

- [x] comandos directos de help/version/json/fixtures
- [x] tres contract test suites PAW
- [x] comandos y tests legacy
- [x] suites globales foundation/core
- [x] `git diff --check`
- [x] hash schema v1 sin cambios

### Manuales

- [x] una sola implementacion de parsing/manifest validation
- [x] stdout/stderr y exit codes revisados
- [x] sin red, prompts, timers, npm, Astro o Codex
- [x] sin cambios en writers, skills, workspaces o fixtures v1

### Resultados

- `node paw/tools/validate-patches.mjs --help`: pass, exit `0`.
- `node paw/tools/validate-patches.mjs --version`: pass, exit `0`,
  `paw-validator 0.1.0 (schemas 1,2)`.
- `node paw/tools/validate-patches.mjs --json`: pass, schema `1`, 3 patches.
- `node paw/tools/validate-patches.mjs --fixtures --json`: pass, schema `mixed`,
  20 fixtures.
- tres suites PAW combinadas: 21 tests, 21 pass.
- `node sdd/tools/validate-sdd.mjs`: pass y output legacy exacto.
- `node sdd/tools/validate-sdd.mjs --fixtures`: pass y output legacy exacto.
- `node --test tests/sdd-validation.test.mjs`: 4 tests, 4 pass.
- `node --test tests/foundation-governance.test.mjs`: 6 tests, 6 pass.
- `node --test tests/core-contracts.test.mjs`: 8 tests, 8 pass.
- `git diff --check`: pass; solo avisos informativos LF/CRLF.
- schema v1 SHA-256:
  `C694A530ABFF48B2194A7A6563E3B477EDB37D1FD191C24627F376F43D19A104`.
- revision `rg` y paths: sin parser/reglas duplicadas, red, prompts, timers ni
  cambios en `sdd/tests/**`, `paw/parches/**` o `.codex/**`.

## 14. Cierre

La fase solo se considera cerrada si:

- [x] checklist completo o pendientes explicitamente diferidos
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisiones relevantes registradas
- [x] blockers resueltos o diferidos con razon
- [x] drift documentado o resuelto
- [x] validaciones requeridas ejecutadas o justificadas
- [x] resultados de validacion registrados
- [x] CLI cumple output minimo y exit codes
- [x] bridge v1 preserva comandos/exports sin duplicar reglas
- [x] Fase 4 puede reconciliar docs contra comportamiento estable

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
