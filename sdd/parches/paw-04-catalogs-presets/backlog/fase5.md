# Fase 5 - Cross-catalog conformance y reconciliacion final

## Estado

- Change id: `paw-04-catalogs-presets`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `5`
- Estado: `active`
- Ultima actualizacion: `2026-06-15`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: Fase 4 cerrada
- Desbloquea: `sdd-close`

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `README.md`
- `docs/governance/{ARCHITECTURE.md,V1-TRANSITION.md,BOOTSTRAP-STATUS.md}`
- `paw/README.md`
- `paw/catalogs/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `sdd/parches/paw-04-catalogs-presets/{patch.yaml,definicion.md,plan.md,tasks.md,decision.log}`
- `sdd/parches/paw-04-catalogs-presets/backlog/fase4.md`

## 2. Objetivo de la fase

- Resultado esperado: validation, conformance, docs vivos y artefactos SDD alineados
  para cerrar el patch sin drift no clasificado.
- Razon de la fase: los cuatro entregables principales ya existen; falta reconciliar
  estado publico, comandos, evidencia cruzada y preparacion de cierre.
- Cambio que queda habilitado al cerrar: `sdd-close` puede producir `cierre.md`.

## 3. Rama obligatoria por tipo

### `patch_kind = spec`

- Fuente viva o alcance de spec que esta fase modifica:
  - documentation status and validation command lists;
  - catalog/tool/test orientation docs;
  - cross-catalog conformance expectations;
  - final SDD artifacts for closure.
- Reconciliacion esperada:
  - live docs acknowledge catalogs and presets as materialized;
  - no document claims adoption, portability, release, or workflow activation;
  - validation commands reflect the new catalog validator.

## 4. Assumptions

- No new catalog semantics are introduced in this phase.
- Phase 5 may edit live status docs and validation docs only to reconcile materialized
  reality.
- `sdd-close` remains separate and will receive its own non-substantive closure commit.

## 5. Precondiciones

### Documentos

- [x] Fases 1-4 `done`
- [x] `paw/catalogs/**` registered in `docs/README.md`
- [x] source evidence and validator counts recorded in Phase 4

### Decisiones previas

- [x] provisional commit policy recorded
- [x] all ID and support gates resolved

### Estado tecnico

- [x] 5 canonical catalog classes validate
- [x] catalog fixtures validate
- [x] complete suite passes with 67 tests

## 6. Alcance

### Si entra

- [ ] update live status docs for materialized catalogs/presets
- [ ] document catalog validator commands
- [ ] update PAW tools/tests orientation for catalog validation and fixtures
- [ ] ensure cross-catalog conformance covers guides, read-only, no activation
- [ ] run complete validation suite
- [ ] update `tasks.md`, this backlog and decision/finding records

### No entra

- [ ] new catalog IDs or semantics
- [ ] adoption records or assessments
- [ ] v2 writers, workspaces, skills or adapters
- [ ] package/release/Pages/Actions activation
- [ ] source rewriting or history rewriting

## 7. Archivos y superficies de trabajo

### Leer antes de editar

- live docs listed in section 1
- catalog validator and conformance tests
- all previous phase backlogs

### Editar

- `README.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `tests/catalog-conformance.test.mjs`, only if coverage gap exists
- this backlog and `tasks.md`

### Validar

- SDD validators
- patch validators
- catalog validators
- complete contract/conformance suite
- `git diff --check`

### No tocar

- `paw/core/**`
- `paw/parches/**`
- `.codex/**`
- `_inbox/**`
- closed patch workspaces

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

- [ ] reread live status docs and locate stale claims
- [ ] reread catalog validator CLI behavior and output counts
- [ ] reread conformance tests for no activation and guide coverage

### Bloque B - Inspeccion de estado actual

- [ ] inspect whether `README.md` validation omits catalog commands
- [ ] inspect whether bootstrap status still lists catalogs/presets as missing
- [ ] inspect whether `paw/tools/README.md` and `paw/tests/README.md` omit catalog surfaces
- [ ] inspect git status for only scoped Phase 5 changes after Phase 4 commits

### Bloque C - Edicion por archivo

- [ ] add catalog validator commands to public validation list
- [ ] update bootstrap implemented/not-implemented status
- [ ] update transition inventory for catalog materialization
- [ ] update PAW tools/tests readmes with catalog validator, schemas, fixtures and tests
- [ ] update conformance tests only if docs are not already asserted
- [ ] update `tasks.md` Phase 5 status and registration log

### Bloque D - Registro de decisiones, hallazgos o blockers

- [ ] record stale-status drift found and resolved
- [ ] record any remaining residual risks for `sdd-close`
- [ ] stop if any live doc would imply activation or portability

### Bloque E - Validacion

- [ ] run `node sdd/tools/validate-sdd.mjs`
- [ ] run `node sdd/tools/validate-sdd.mjs --fixtures`
- [ ] run `node paw/tools/validate-patches.mjs --json`
- [ ] run `node paw/tools/validate-patches.mjs --fixtures --json`
- [ ] run `node paw/tools/validate-catalogs.mjs --json`
- [ ] run `node paw/tools/validate-catalogs.mjs --fixtures --json`
- [ ] run `node --test paw/tests/contract/*.test.mjs tests/*.test.mjs`
- [ ] run `git diff --check`

### Bloque F - Cierre

- [ ] record validation results and counts
- [ ] mark Fase 5 `done`
- [ ] confirm no blockers remain for `sdd-close`
- [ ] create Conventional Commit(s) after validation

## 9. Drift detectado

- Ninguno al crear el backlog; likely stale status docs must be confirmed during execution.

## 10. Hallazgos durante ejecucion

- Pendiente.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- Ninguna al crear el backlog.

## 13. Validaciones

### Documentales

- [ ] live docs distinguish materialization from activation
- [ ] validation docs include catalog commands

### Tecnicas

- [ ] all deterministic validators pass
- [ ] complete tests pass

### Manuales

- [ ] no portability, release, adoption or cutover claim added

### Resultados

- Pendientes de ejecucion.

## 14. Cierre

La fase solo se considera cerrada si:

- [ ] checklist complete
- [ ] drift resolved or recorded
- [ ] blockers resolved
- [ ] validations pass and results recorded
- [ ] backlog and `tasks.md` synchronized

## 15. Riesgos y pendientes

### Riesgos

- Status docs could overstate catalog materialization as active adoption.
- Validation docs could omit new deterministic catalog checks.

### Pendientes

- `sdd-close` after Phase 5.
