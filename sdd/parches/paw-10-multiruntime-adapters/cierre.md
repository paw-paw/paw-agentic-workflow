# Cierre: paw-10-multiruntime-adapters

---

## Estado

- Change id: `paw-10-multiruntime-adapters`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Status final: `closed`
- Fecha de cierre: 2026-06-21
- Owner: sesion Codex activa con subagentes SDD read-only
- Nivel de cierre: `anchored`

---

## 1. Resumen

- Objetivo original: implementar adapters Claude Code y Antigravity contra el
  mismo contrato portable probado con Codex, sin exigir identidad fisica entre
  runtimes ni activar el workflow v2 por defecto.
- Resultado ejecutado: se extendio el contrato validable de runtime adapter para
  declarar mappings de operaciones, source freshness, matriz de capacidades,
  gaps y activacion; se agrego evidencia candidate para Codex, Claude Code y
  Antigravity; se documentaron limites de opt-in y se reconcilio el manifest de
  distribucion candidate.
- Alcance cerrado:
  - runtime adapter evidence bajo `paw/adoption/adapters/runtime/**`;
  - fixtures positivas y negativas para adapter runtime multiruntime;
  - validacion deterministica de default activation prohibida y gaps bloqueados;
  - docs vivos de adoption, transicion, status, arquitectura, tools/tests y
    distribucion;
  - manifest de distribucion candidate `0.1.0-candidate.10` con 349 entradas.
- Alcance diferido:
  - instalacion fisica `.claude/**`;
  - cualquier archivo o contrato fisico `.antigravity/**`;
  - portabilidad completa o release estable;
  - activacion default de PAW v2 o `paw/parches/**`;
  - pilotos `paw-11` a `paw-13`.

---

## 2. Rama obligatoria por tipo

### Si `patch_kind = spec`

- fuente viva reconciliada: `paw/adoption/**`, `docs/governance/**`,
  `paw/tools/README.md`, `paw/tests/README.md`, `paw/distribution/**`.
- cambio promovido: evidencia candidate multiruntime para runtime adapters,
  validable y con gaps explicitos, sin activar runtimes ni declarar
  portabilidad completa.

### Si `patch_kind = batch`

- no aplica.

---

## 3. Artifacts revisados

- `patch.yaml`
- `handover.md`
- `definicion.md`
- `plan.md`
- `tasks.md`
- `backlog/fase1.md`
- `backlog/fase2.md`
- `backlog/fase3.md`
- `backlog/fase4.md`
- `decision.log`

---

## 4. Decisiones relevantes

- decision: ejecutar el patch directamente sobre `main` sin branch.
  - fuente: instruccion humana y `decision.log`.
  - impacto: se respeto la cadencia de commits de `paw-08` sin crear PR.
- decision: modelar Antigravity con paths bloqueados cuando no existe fuente
  oficial tecnica suficiente.
  - fuente: handoff 10 y `decision.log`.
  - impacto: `antigravity.json` es evidencia candidate con gaps, no instalador.
- decision: exigir activation opt-in y source freshness en runtime adapters.
  - fuente: Fase 1.
  - impacto: validators rechazan default activation y gaps bloqueados sin
    disposition.
- decision: no crear operaciones nuevas en `paw/orchestration/**`.
  - fuente: Fase 2.
  - impacto: runtime adapter semantics permanecen en `paw/adoption/**`.
- decision: bump del manifest a `0.1.0-candidate.10`.
  - fuente: Fase 3.
  - impacto: distribucion candidate incluye evidencia de patch 10, sin release
    estable.

---

## 5. Assumptions, blockers y findings

### Assumptions

- Claude Code docs oficiales revisados el 2026-06-21 sostienen project skills,
  supporting files, tool controls, subagents, hooks y context fork semantics.
- Antigravity public site oficial revisado el 2026-06-21 permite reconocer una
  orientacion agentica publica, pero no fija paths locales o hooks PAW.

### Blockers

- Ninguno.

### Findings

- finding: los adapters runtime existentes eran genericos y no representaban
  Claude Code ni Antigravity.
  - evidencia: Fase 1 amplio fixtures de 6 a 11 y agrego adapters concretos.
  - impacto: ahora hay evidencia validable para los tres runtimes.
- finding: `BOOTSTRAP-STATUS.md` estaba stale al decir que no existian concrete
  runtime adapters.
  - evidencia: Fase 2 lo ajusto a "candidate runtime adapter evidence" y dejo
    activated adapters como no implementados.
  - impacto: status vivo distingue materializacion de activacion.
- finding: el manifest de distribucion quedo stale tras editar archivos
  distribuidos.
  - evidencia: `validate-distribution --json` fallo por checksum mismatch antes
    de Fase 3.
  - impacto: Fase 3 regenero checksums y agrego nueva evidencia.

---

## 6. Drift

- drift: manifest de distribucion con checksums stale.
  - categoria: `operational`
  - fuente esperada: manifest declared checksums match source content.
  - diferencia encontrada: checksum mismatches after Fases 1-2 edits.
  - accion: regenerate manifest checksums and include new adapter files.
  - estado: resuelto.
- drift: live status wording lagged behind candidate adapter evidence.
  - categoria: `minor`
  - fuente esperada: status docs reflect materialized but inactive surfaces.
  - diferencia encontrada: status still said concrete adapters were not
    implemented.
  - accion: update to candidate evidence vs activated adapters distinction.
  - estado: resuelto.

---

## 7. Reconciliacion de fuente viva

- fuente viva afectada: `paw/adoption/**`.
  - cambio requerido: documentar concrete runtime adapter evidence and add
    Codex, Claude Code, and Antigravity candidate mappings.
  - estado: `aplicado`.
  - evidencia: `paw/adoption/adapters/runtime/*.json` and adapter docs.
- fuente viva afectada: `docs/governance/**`.
  - cambio requerido: preserve no-default-activation while acknowledging
    candidate adapter evidence.
  - estado: `aplicado`.
  - evidencia: `V1-TRANSITION.md`, `BOOTSTRAP-STATUS.md`, `ARCHITECTURE.md`.
- fuente viva afectada: `paw/tools/**` and `paw/tests/**`.
  - cambio requerido: validate expanded runtime adapter semantics.
  - estado: `aplicado`.
  - evidencia: schema, validator, fixtures, and contract tests.
- fuente viva afectada: `paw/distribution/**`.
  - cambio requerido: include adapter evidence in candidate manifest without
    declaring multi-runtime installer support.
  - estado: `aplicado`.
  - evidencia: `manifest.md`, `progressive-loading.md`,
    `distribution-manifest.json`.

---

## 8. Validaciones

- validacion:
  - tipo: `automated`
  - comando o revision: full deterministic matrix listed in `AGENTS.md`
  - resultado esperado: all commands pass
  - resultado obtenido: all commands passed before closure edits on 2026-06-21
  - estado: `pass`
  - evidencia: Fase 4 validation run recorded in `backlog/fase4.md`.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-adoption.mjs --fixtures --json`
  - resultado esperado: `status: pass`
  - resultado obtenido: `status: pass`, 11 adapter fixtures
  - estado: `pass`
  - evidencia: Fase 1 and Fase 4 validation.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-distribution.mjs --json`
  - resultado esperado: `status: pass`
  - resultado obtenido: `status: pass`, 349 manifest entries
  - estado: `pass`
  - evidencia: Fase 3 and Fase 4 validation.
- validacion:
  - tipo: `manual`
  - comando o revision: source freshness and no-default-activation review
  - resultado esperado: docs and adapters do not claim default activation or full
    portability
  - resultado obtenido: adapters use `candidate-opt-in`, Antigravity gaps are
    explicit, and status docs keep no portability claim.
  - estado: `pass`
  - evidencia: adapter JSON, `BOOTSTRAP-STATUS.md`, `V1-TRANSITION.md`.

---

## 9. Riesgos residuales

- riesgo: Antigravity public technical surface remains insufficient for physical
  runtime files.
  - impacto: pilot users need manual task-context fallback until official paths
    or APIs exist.
  - mitigacion: `antigravity.json` marks local skill path and hook contract gaps
    as blocked.
- riesgo: Claude Code mapping is documented but not physically installed.
  - impacto: a future pilot must materialize `.claude/**` files before claiming
    runtime execution.
  - mitigacion: `claude-code.json` records this as manual future work.
- riesgo: candidate adapter evidence may be misread as portability complete.
  - impacto: premature claims before pilots and patch 14.
  - mitigacion: status docs and distribution docs preserve candidate/no-release
    language.

---

## 10. Pendientes

- pendiente: start `paw-11-pilot-portfolio-codex` after human review.
  - owner: next governed patch.
  - razon: pilots are outside patch 10.
- pendiente: optional future materialization of `.claude/**` adapter files.
  - owner: future governed patch or pilot.
  - razon: patch 10 records mapping but does not install runtime files.
- pendiente: official Antigravity technical path discovery.
  - owner: future governed patch or pilot.
  - razon: current official public source is limited.

---

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas o diferidas con razon
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto o diferido
- [x] validaciones registradas
- [x] fuente viva reconciliada o marcada no aplicable
- [x] riesgos residuales visibles
