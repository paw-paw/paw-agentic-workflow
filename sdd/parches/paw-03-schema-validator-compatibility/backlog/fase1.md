# Backlog Fase 1: schema v2 y parsing versionado

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no
introduce nuevas decisiones de producto por si solo.

## Estado

- Change id: `paw-03-schema-validator-compatibility`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `1 - Schema v2 y parsing versionado`
- Estado: `active`
- Ultima actualizacion: `2026-06-14`
- Owner: sesion Codex activa
- Depende de: preparacion SDD, drift sync y task breakdown completos y versionados
- Desbloquea: Fase 2 - Validacion dual y compatibilidad historica

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `paw/core/patch-model.md`
- `paw/core/compatibility-policy.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `sdd/parches/paw-03-schema-validator-compatibility/patch.yaml`
- `sdd/parches/paw-03-schema-validator-compatibility/definicion.md`
- `sdd/parches/paw-03-schema-validator-compatibility/plan.md`
- `sdd/parches/paw-03-schema-validator-compatibility/tasks.md`
- `sdd/parches/paw-03-schema-validator-compatibility/decision.log`
- approved final handoff 03

## 2. Objetivo de la fase

- Resultado esperado: schema v2 fisico, parser YAML acotado y deteccion explicita de
  version disponibles bajo las superficies PAW propietarias.
- Razon de la fase: las reglas v1/v2 posteriores necesitan una representacion
  determinista del manifest y un dispatch que falle antes de mezclar contratos.
- Cambio que queda habilitado al cerrar: implementacion de validadores semanticos v1
  y v2 en Fase 2.

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - implementa la forma fisica derivada de `paw/core/patch-model.md`;
  - materializa por primera vez `paw/tools/**` y `paw/tests/**`;
  - preserva `sdd/**` como baseline v1 sin activar writers o workspaces v2.
- Reconciliacion esperada:
  - schema v2 y parsing canonico viven bajo `paw/**`;
  - schema v1 permanece identificable y byte-equivalente salvo decision registrada;
  - parsing y version detection no cambian el default operativo ni validan aun todas
    las invariantes semanticas de Fase 2.

## 4. Assumptions

- Node.js standard library es suficiente; no se agrega `package.json` ni dependencia.
- El subset YAML requerido se limita a mappings top-level, scalars simples, arrays
  block de scalars, comentarios y lineas vacias.
- Objetos anidados, anchors, aliases, tags, multiline scalars y flow mappings no son
  necesarios para `patch.yaml` y deben fallar con diagnostico accionable.
- El schema v2 expresa campos, tipos, enums y `additionalProperties: false`; las
  invariantes cruzadas por `patch_mode` y status se completan en Fase 2.
- Nombres candidatos de modulos:
  - `paw/tools/validation/parse-patch-yaml.mjs`
  - `paw/tools/validation/detect-schema-version.mjs`
  - `paw/tools/validation/diagnostics.mjs`
  - `paw/tools/schemas/patch-v2.schema.json`
  - `paw/tests/contract/patch-parsing.test.mjs`
  Pueden ajustarse solo si el backlog registra el finding y preserva ownership.

## 5. Precondiciones

### Documentos

- [x] `definicion.md`, `plan.md` y `tasks.md` vigentes
- [x] handoff 03 contrastado con handoff 00, ledger y contratos vivos
- [x] `AGENTS.md` y `V1-TRANSITION.md` permiten materializacion incremental

### Decisiones previas

- [x] destino canonico `paw/tools/**` y `paw/tests/**` aprobado
- [x] v1 conserva writers, workspace root y default hasta cutover
- [x] no hay decisiones abiertas bloqueantes para parsing o schema shape

### Estado tecnico

- [x] working tree limpio al crear el backlog
- [x] `paw/tools/**` solo contiene `README.md`
- [x] `paw/tests/**` solo contiene `README.md`
- [x] hash baseline de `sdd/tools/schemas/patch.schema.json` registrado:
  `C694A530ABFF48B2194A7A6563E3B477EDB37D1FD191C24627F376F43D19A104`

## 6. Alcance

### Si entra

- [ ] crear `paw/tools/schemas/patch-v2.schema.json`
- [ ] crear parser reusable que devuelva datos y metadata de ubicacion
- [ ] crear diagnosticos estructurados de parsing/version detection
- [ ] detectar `schema_version` antes de cualquier regla v1/v2
- [ ] rechazar manifests sin version, con version no soportada o con ejes hibridos
- [ ] crear tests unitarios de parsing y deteccion
- [ ] crear fixtures minimos exclusivos de sintaxis/version cuando mejoren legibilidad
- [ ] documentar el subset YAML soportado junto al tooling si no queda autoexplicativo

### No entra

- [ ] aplicar en runtime todas las required properties de v1 o v2
- [ ] implementar invariantes por `patch_mode`
- [ ] validar coherencia de `status` y `closed_at`
- [ ] recorrer `sdd/parches/**` o tratar legacy
- [ ] implementar CLI, flags, stdout/stderr o exit codes
- [ ] modificar `sdd/tools/validate-sdd.mjs`
- [ ] modificar semantica o contenido del schema v1
- [ ] activar writers, skills o workspaces bajo `paw/parches/**`

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- `paw/core/patch-model.md`
- `paw/core/compatibility-policy.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `sdd/tools/validate-sdd.mjs`, con foco en `parseScalar` y `parsePatchYaml`
- `sdd/tools/schemas/patch.schema.json`
- `tests/sdd-validation.test.mjs`
- `tests/core-contracts.test.mjs`
- handoff 03, con foco en contrato v2 y fixtures obligatorios

### Editar

- `paw/tools/schemas/patch-v2.schema.json`
- `paw/tools/validation/parse-patch-yaml.mjs`
- `paw/tools/validation/detect-schema-version.mjs`
- `paw/tools/validation/diagnostics.mjs`, si evita duplicacion real
- `paw/tests/contract/patch-parsing.test.mjs`
- fixtures de sintaxis/version bajo `paw/tests/fixtures/` si el test inline pierde
  claridad
- `paw/tools/README.md` o `paw/tests/README.md` solo para documentar paths y subset
  materializados
- este backlog durante la ejecucion
- `decision.log` solo si aparece una decision significativa

### Validar

- `paw/tools/schemas/patch-v2.schema.json`
- `paw/tools/validation/**`
- `paw/tests/contract/patch-parsing.test.mjs`
- `sdd/tools/schemas/patch.schema.json`
- suite SDD y core existente

### No tocar

- `sdd/tools/validate-sdd.mjs`
- `sdd/tests/**`
- `sdd/parches/**`, salvo artifacts de este patch
- `.codex/skills/**`
- `.codex/agents/**`
- `paw/parches/**`
- `paw/orchestration/**`
- documentos core, salvo drift contractual demostrado y escalado

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

- [ ] releer `paw/core/patch-model.md` y enumerar exactamente los diez campos v2
- [ ] releer handoff 03 y separar shape/schema de invariantes reservadas a Fase 2
- [ ] releer `sdd/tools/validate-sdd.mjs` y listar comportamiento de parsing que debe
  preservarse o rechazarse explicitamente
- [ ] releer schema v1 y confirmar hash baseline antes de editar

### Bloque B - Inspeccion de estado actual

- [ ] confirmar que no existe codigo previo bajo `paw/tools/validation/**`
- [ ] confirmar que no existen fixtures/tests previos bajo `paw/tests/**`
- [ ] identificar todos los imports actuales de `sdd/tools/validate-sdd.mjs` para no
  introducir cambios indirectos en Fase 1
- [ ] comprobar line endings y convenciones de ESM de los tests Node existentes
- [ ] registrar cualquier sintaxis YAML real en manifests del repo que exceda el
  subset asumido

### Bloque C - Schema v2

- [ ] crear `paw/tools/schemas/patch-v2.schema.json` con draft 2020-12
- [ ] asignar `$id`, title y descripcion que identifiquen PAW patch manifest v2
- [ ] declarar `type: object`, los diez campos y `additionalProperties: false`
- [ ] exigir los diez campos contractuales como propiedades presentes
- [ ] declarar `schema_version` como integer enum `[2]`
- [ ] declarar `change_id` como string no vacio
- [ ] declarar `program_id` como `string | null`, con string no vacio
- [ ] declarar `patch_mode` con los tres valores aprobados
- [ ] declarar `status` con los cuatro valores aprobados
- [ ] declarar fechas con forma `YYYY-MM-DD` y `closed_at` nullable
- [ ] declarar `related_docs` y `creates_docs` como arrays de strings no vacios
- [ ] declarar `bootstrap_context` con dos valores aprobados o `null`
- [ ] no incorporar aun condicionales por modo/status que oculten ownership de Fase 2

### Bloque D - Parser y diagnosticos

- [ ] crear un parser puro que reciba texto y un source path descriptivo
- [ ] devolver datos parseados y metadata suficiente para diagnosticos de linea
- [ ] soportar comentarios, lineas vacias, scalars string/integer/null y arrays block
- [ ] rechazar claves duplicadas con path, linea y causa
- [ ] rechazar items de lista sin clave de lista activa
- [ ] rechazar indentacion o lineas YAML fuera del subset
- [ ] rechazar objetos anidados, anchors, aliases, tags y multiline scalars
- [ ] evitar lectura de filesystem dentro del parser puro
- [ ] crear helper separado para leer un path solo si simplifica tests futuros
- [ ] representar diagnosticos con al menos code, severity, path, line y message

### Bloque E - Deteccion de version

- [ ] crear detector puro que opere sobre el resultado parseado
- [ ] reportar error especifico si falta `schema_version`
- [ ] aceptar exclusivamente versiones `1` y `2` en esta fase
- [ ] reportar version desconocida sin aplicar reglas de ninguna version
- [ ] rechazar mezcla de `patch_kind`/`lifecycle` con `patch_mode`
- [ ] rechazar `schema_version: 1` con campos exclusivos v2
- [ ] rechazar `schema_version: 2` con campos exclusivos v1
- [ ] devolver version detectada solo cuando el eje sea inequívoco

### Bloque F - Tests y fixtures

- [ ] crear tests para string, integer, null, arrays, comentarios y CRLF/LF
- [ ] crear tests para clave duplicada, lista huerfana y sintaxis no soportada
- [ ] crear tests para version 1, version 2, ausencia y version desconocida
- [ ] crear tests para manifest hibrido en ambas direcciones
- [ ] comprobar que cada error incluye path, linea cuando aplica y causa accionable
- [ ] comprobar que importar los modulos no ejecuta CLI ni muta archivos
- [ ] comprobar que el schema v2 contiene campos/enums alineados con core
- [ ] mantener fixtures de esta fase acotados a parsing/version; diferir matriz
  semantica completa a Fase 2

### Bloque G - Registro de decisiones, hallazgos o blockers

- [ ] registrar en este backlog cualquier sintaxis real no soportada encontrada
- [ ] registrar en `decision.log` cualquier ampliacion del subset YAML o cambio de
  ownership entre schema y validator
- [ ] detener y marcar blocker si soportar manifests reales requiere una dependencia
  YAML externa o redefinir el contrato v2
- [ ] clasificar como drift cualquier discrepancia entre campos core y handoff 03

### Bloque H - Validacion

- [ ] ejecutar `node --test paw/tests/contract/patch-parsing.test.mjs`
- [ ] ejecutar `node sdd/tools/validate-sdd.mjs`
- [ ] ejecutar `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] ejecutar `node --test tests/sdd-validation.test.mjs`
- [ ] ejecutar `node --test tests/foundation-governance.test.mjs`
- [ ] ejecutar `node --test tests/core-contracts.test.mjs`
- [ ] ejecutar `git diff --check`
- [ ] recalcular SHA-256 de `sdd/tools/schemas/patch.schema.json` y confirmar
  `C694A530ABFF48B2194A7A6563E3B477EDB37D1FD191C24627F376F43D19A104`
- [ ] revisar manualmente que no hay cambios bajo `paw/parches/**`, `.codex/**` o
  `sdd/tests/**`

### Bloque I - Cierre

- [ ] registrar resultados de cada validacion en la seccion 13
- [ ] actualizar findings, drift, blockers y decisiones
- [ ] confirmar que enforcement runtime de required properties e invariantes pendientes esta
  asignadas a Fase 2 y no olvidadas
- [ ] marcar la fase `done` solo con checklist y validaciones completas
- [ ] actualizar Fase 1 a `done` en `tasks.md`
- [ ] crear al menos un Conventional Commit coherente despues del cierre y
  validacion del backlog

## 9. Drift detectado

- Ninguno al crear el backlog.

## 10. Hallazgos durante ejecucion

- Estado inicial:
  - `paw/tools/**` y `paw/tests/**` no contienen implementacion previa.
  - el parser v1 esta acoplado al entrypoint monolitico y no reporta lineas.
  - el runtime actual no consume el schema JSON v1.

## 11. Blockers

- Ninguno al crear el backlog.

## 12. Decisiones tomadas

- Las decisiones estructurales de namespace, compatibilidad y commits constan en
  `decision.log`.
- El backlog separa shape/parser/version detection en Fase 1 de required
  properties e invariantes semanticas completas en Fase 2.

## 13. Validaciones

### Documentales

- [ ] schema v2 alineado con `paw/core/patch-model.md`
- [ ] implementacion bajo ownership de `paw/tools/**` y evidencia bajo `paw/tests/**`
- [ ] sin claims de activacion, portabilidad o cutover

### Tecnicas

- [ ] `node --test paw/tests/contract/patch-parsing.test.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs`
- [ ] `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] `node --test tests/sdd-validation.test.mjs`
- [ ] `node --test tests/foundation-governance.test.mjs`
- [ ] `node --test tests/core-contracts.test.mjs`
- [ ] `git diff --check`
- [ ] hash del schema v1 sin cambios

### Manuales

- [ ] parser sin filesystem effects ni ejecucion implicita
- [ ] sin dependencia npm, Astro o Codex
- [ ] sin cambios en writers, skills, workspaces o fixtures v1
- [ ] mensajes de error accionables en paths Windows y POSIX

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
- [ ] schema v1 conserva su hash baseline
- [ ] Fase 2 puede implementar reglas semanticas sin rehacer parser o version detection

## 15. Riesgos y pendientes

### Riesgos

- El subset YAML puede resultar insuficiente para manifests reales no inventariados.
- JSON Schema y validator pueden divergir si Fase 2 duplica enums o required fields.
- La metadata de linea puede complejizar el parser mas de lo proporcional.
- Los tests pueden fijar wording incidental en vez de codigos y estructura.

### Pendientes

- Enforcement runtime de required properties y reglas semanticas v1/v2 pertenece a Fase 2.
- CLI, output JSON, roots y exit codes pertenecen a Fase 3.
- Conformance global y promocion final de estado pertenecen a Fase 4.
