# Cierre: paw-09-manual-distribution

---

## Estado

- Change id: `paw-09-manual-distribution`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Status final: `closed`
- Fecha de cierre: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana
- Nivel de cierre: `anchored`

---

## 1. Resumen

- Objetivo original: crear una distribucion manual, versionada, reproducible,
  validable y reversible de PAW para Codex sin adelantar packaging,
  marketplaces, auto-update, release estable ni portabilidad multiruntime.
- Resultado ejecutado: se materializo un contrato vivo de distribucion manual
  candidate bajo `paw/distribution/**`, manifest canonical con 336 entradas y
  checksums SHA-256, validator deterministico, fixtures, tests contractuales,
  helpers puros de planificacion/verificacion/uninstall y binding Codex
  candidate `paw-distribute` para inspeccion local.
- Alcance cerrado:
  - layout y contrato de distribucion manual candidate;
  - manifest y checksums auditables;
  - reglas de install, upgrade, rollback, uninstall y post-install verification;
  - guia de carga progresiva;
  - validator `validate-distribution.mjs`, schema, fixtures y tests;
  - helpers puros para detectar conflictos antes de escribir y evitar
    eliminacion de archivos ajenos;
  - runtime Codex candidate read-only para inspeccion del manifest.
- Alcance diferido:
  - publicacion estable `0.1.0`;
  - package manager, marketplace, auto-update, release automation, Pages,
    Actions y deployment;
  - instalacion real sobre un destino externo;
  - adapters Claude Code/Antigravity y portabilidad multiruntime.

---

## 2. Rama obligatoria por tipo

### Si `patch_kind = spec`

- fuente viva reconciliada: `docs/README.md`, `README.md`, `AGENTS.md`,
  `docs/governance/**`, `docs/licensing/OUTPUT-POLICY.md`, `paw/README.md`,
  `paw/distribution/**`, `paw/tools/README.md`, `paw/tests/README.md` y
  `.codex/**`.
- cambio promovido: distribucion manual candidate como contrato y evidencia
  validable, sin activar workflow v2 ni declarar release estable.

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
- `backlog/fase5.md`
- `decision.log`

---

## 4. Decisiones relevantes

- decision: ejecutar el patch directamente sobre `main` sin crear branch.
  - fuente: instruccion humana y `decision.log`.
  - impacto: se respeta la cadencia de commits de `paw-08`, pero no se crea PR.
- decision: mantener la distribucion como `candidate`, no release estable
  `0.1.0`.
  - fuente: handoff 09 y `decision.log`.
  - impacto: docs, manifest y runtime binding evitan claims de publicacion.
- decision: introducir `paw/distribution/**` como autoridad viva.
  - fuente: `decision.log` y `docs/README.md`.
  - impacto: policy vive en documentos, herramientas son evidencia.
- decision: excluir fixtures de distribucion de `validate-patches --fixtures`.
  - fuente: `decision.log`.
  - impacto: `validate-distribution --fixtures` gobierna esa matriz de dominio.

---

## 5. Assumptions, blockers y findings

### Assumptions

- No critical assumptions.

### Blockers

- Ninguno.

### Findings

- finding: no existia superficie viva para distribucion manual.
  - evidencia: Fase 1 creo `paw/distribution/**` y registro `docs/README.md`.
  - impacto: fases posteriores pudieron validar contra una autoridad durable.
- finding: el manifest canonical debe regenerarse cuando cambian superficies
  incluidas.
  - evidencia: validators detectan checksum stale y el manifest se regenera en
    fases 2-4.
  - impacto: riesgo operativo aceptado y visible.
- finding: los fixtures de distribucion no son fixtures de patch.
  - evidencia: primera matriz integral fallo en `validate-patches --fixtures`.
  - impacto: se excluyo `/distribution/` del harness de patch y se registro
    decision.

---

## 6. Drift

- drift: `validate-patches --fixtures` recogia fixtures de distribucion.
  - categoria: `validation`
  - fuente esperada: fixtures de patch bajo `paw/tests/fixtures/**` excluyen
    dominios con harness propio.
  - diferencia encontrada: `/distribution/` aun no estaba excluido.
  - accion: actualizar `validate-fixtures.mjs` y `patch-validation.test.mjs`;
    registrar decision.
  - estado: resuelto.
- drift: `README.md` ya no contenia la frase exacta esperada por
  `schema-validator-conformance.test.mjs`.
  - categoria: `minor`
  - fuente esperada: live status docs deben conservar claims existentes.
  - diferencia encontrada: wrap introducido por Fase 1 separo la frase
    "portable family and preset catalogs".
  - accion: reordenar la frase preservando el nuevo contenido de distribucion.
  - estado: resuelto.

---

## 7. Reconciliacion de fuente viva

- fuente viva afectada: `docs/README.md`.
  - cambio requerido: registrar `paw/distribution/**` como autoridad.
  - estado: `aplicado`.
  - evidencia: canonical registry contiene la nueva fila.
- fuente viva afectada: `paw/distribution/**`.
  - cambio requerido: definir contrato de manifest, instalacion manual,
    rollback, uninstall, verificacion y carga progresiva.
  - estado: `aplicado`.
  - evidencia: `README.md`, `manifest.md`, `manual-installation.md` y
    `progressive-loading.md`.
- fuente viva afectada: `docs/licensing/OUTPUT-POLICY.md`.
  - cambio requerido: aclarar auditoria de licencia/notices para distribucion
    manual sin cambiar regla de outputs.
  - estado: `aplicado`.
  - evidencia: seccion `Manual Distribution`.
- fuente viva afectada: `AGENTS.md`, `README.md`, `paw/tools/README.md` y
  `paw/tests/README.md`.
  - cambio requerido: registrar comandos y evidencias nuevas.
  - estado: `aplicado`.
  - evidencia: matriz completa de validaciones ejecutada.
- fuente viva afectada: `.codex/**`.
  - cambio requerido: agregar binding Codex candidate read-only.
  - estado: `aplicado`.
  - evidencia: `paw-distribute`, runtime map y toolkit `inspect-distribution`.

---

## 8. Validaciones

- validacion:
  - tipo: `automated`
  - comando o revision: matriz completa de `AGENTS.md` mas `git diff --check`
  - resultado esperado: todos los comandos pasan
  - resultado obtenido: 34 comandos pass
  - estado: `pass`
  - evidencia: ejecucion integral del 2026-06-20.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-distribution.mjs --json`
  - resultado esperado: `status: pass`
  - resultado obtenido: `status: pass`, 336 manifest entries
  - estado: `pass`
  - evidencia: manifest canonical y schema validados.
- validacion:
  - tipo: `automated`
  - comando o revision: `node paw/tools/validate-distribution.mjs --fixtures --json`
  - resultado esperado: `status: pass`
  - resultado obtenido: 4 fixtures, 1 valida y 3 invalidas
  - estado: `pass`
  - evidencia: fixtures de checksum, excluded source y release estable prohibida.
- validacion:
  - tipo: `manual`
  - comando o revision: revision de limites de distribucion
  - resultado esperado: no release estable, no packaging, no marketplace, no
    auto-update, no v2 activation, no rutas absolutas requeridas.
  - resultado obtenido: limites preservados en docs, manifest, skill y toolkit.
  - estado: `pass`
  - evidencia: `paw/distribution/**`, `.codex/skills/paw-distribute/SKILL.md`.

---

## 9. Riesgos residuales

- riesgo: el manifest canonical queda stale cuando cambian archivos incluidos.
  - impacto: validator falla hasta regenerar checksums.
  - mitigacion: `validate-distribution --json` detecta mismatch; regenerar
    manifest es parte de fases que editan superficies incluidas.
- riesgo: usuarios interpreten la distribucion candidate como release estable.
  - impacto: claims prematuros antes de cutover.
  - mitigacion: status `candidate`, `README.md`, `BOOTSTRAP-STATUS.md` y skill
    Codex reiteran no release estable ni portabilidad.
- riesgo: helpers de instalacion son modelos puros, no instalador real.
  - impacto: una futura instalacion real debe integrar filesystem/approval con
    cuidado.
  - mitigacion: fase actual cubre reglas y tests sin efectos externos; writes
    reales quedan fuera de alcance.

---

## 10. Pendientes

- pendiente: iniciar `paw-10-multiruntime-adapters`.
  - owner: siguiente patch gobernado.
  - razon: adapters Claude Code/Antigravity y portabilidad multiruntime estan
    fuera de alcance de `paw-09`.
- pendiente: push/PR remoto.
  - owner: humano si lo solicita.
  - razon: el usuario pidio trabajar directo en `main`; no se ejecutaron
    operaciones remotas salvo `fetch`.

---

## 11. Criterio de cierre

- [x] fases seleccionadas cerradas o diferidas con razon
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] decisiones relevantes registradas
- [x] drift clasificado y resuelto o diferido
- [x] validaciones registradas
- [x] fuente viva reconciliada o marcada no aplicable
- [x] riesgos residuales visibles
