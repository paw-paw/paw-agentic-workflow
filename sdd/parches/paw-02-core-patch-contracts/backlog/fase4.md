# Backlog Fase 4: conformance y reconciliacion

## Estado

- Change id: `paw-02-core-patch-contracts`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Fase: `4 - Conformance y reconciliacion`
- Estado: `done`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa
- Depende de: Fases 1 a 3 cerradas
- Desbloquea: `sdd-close`

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- related docs del manifest
- artifacts del patch
- todos los contratos `paw/core/**`

## 2. Objetivo de la fase

- Resultado: invariantes core automatizados, foundation reconciliado y suite completa en verde.
- Razon: los contratos no deben depender solo de revision narrativa.
- Habilita: cierre anclado.

## 3. Rama spec

- Fuentes vivas modificadas: checks de conformance y listas operativas de validacion.
- Reconciliacion: sustituir el supuesto foundation de "todo paw inerte" por "core conceptual vivo, superficies ejecutables inactivas".

## 4. Assumptions

- Los invariantes pueden testearse por estructura y vocabulario contractual sin fijar redaccion completa.

## 5. Precondiciones

- [x] siete contratos core presentes
- [x] fuentes ancladas reconciliadas
- [x] fases previas versionadas

## 6. Alcance

### Si entra

- [x] test dedicado del core
- [x] adaptacion de foundation
- [x] promocion del comando de validacion
- [x] suite global y revision manual
- [x] sync de drift si aparece

### No entra

- [x] schema tests v2
- [x] validator v2
- [x] CI o Actions
- [x] tests de adapters o workflow

## 7. Archivos y superficies

### Leer antes de editar

- `tests/foundation-governance.test.mjs`
- `tests/sdd-validation.test.mjs`
- `AGENTS.md`
- `README.md`
- `paw/core/**`

### Editar

- `tests/foundation-governance.test.mjs`
- `tests/core-contracts.test.mjs`
- `AGENTS.md`
- `README.md`
- artifacts SDD si drift

### Validar

- todos los comandos de `AGENTS.md`
- `node --test tests/core-contracts.test.mjs`
- `git diff --check`
- revision manual de scope

### No tocar

- validator y fixtures
- schemas
- `.codex/**`
- `paw/parches/**`
- contratos core salvo correccion de drift demostrada

## 8. Checklist de ejecucion

### Bloque A - Relectura

- [x] releer criterios de acceptance y contratos finales
- [x] releer tests foundation

### Bloque B - Inspeccion

- [x] identificar aserciones foundation obsoletas
- [x] elegir invariantes semanticos estables para core

### Bloque C - Edicion

- [x] adaptar inventario y estado foundation
- [x] crear test de modos, manifest, artifacts, autoridad, drift y compatibilidad
- [x] verificar neutralidad de runtime y proveedor
- [x] promover el comando a README y AGENTS

### Bloque D - Registro

- [x] clasificar y sincronizar drift encontrado

### Bloque E - Validacion

- [x] ejecutar validator repo
- [x] ejecutar validator fixtures
- [x] ejecutar tests SDD
- [x] ejecutar tests foundation
- [x] ejecutar tests core
- [x] ejecutar `git diff --check`
- [x] ejecutar revision manual

### Bloque F - Cierre

- [x] registrar resultados
- [x] marcar tareas y fase `done`

## 9. Drift detectado

- Drift operacional esperado: el test foundation fija exactamente seis READMEs bajo `paw/**`.
- Drift de validacion encontrado: helpers del test no normalizaban separadores Windows ni retiraban el BOM del README, lo que rompia inventarios y exclusiones de historia cerrada.

## 10. Hallazgos durante ejecucion

- El fallo inicial de foundation era multiplataforma: paths con `\` evitaban excluir `paw-01-foundation` y no coincidian con inventarios portables.
- El helper de lectura tolera un BOM opcional para validar contenido, no encoding incidental.
- La asercion del encabezado exigia LF aunque el checkout usa CRLF; ahora acepta ambos finales de linea.

## 11. Blockers

- Ninguno.

## 12. Decisiones tomadas

- Ninguna adicional.

## 13. Validaciones

### Documentales

- [x] comandos y fuentes vivas alineados

### Tecnicas

- [x] suite global completa

### Manuales

- [x] no objetivos, neutralidad, inactividad y no dual-write

### Resultados

- `node sdd/tools/validate-sdd.mjs`: `pass`.
- `node sdd/tools/validate-sdd.mjs --fixtures`: `pass`.
- `node --test tests/sdd-validation.test.mjs`: `pass` (2 tests).
- `node --test tests/foundation-governance.test.mjs`: `pass` (6 tests).
- `node --test tests/core-contracts.test.mjs`: `pass` (8 tests).
- `git diff --check`: `pass`.
- Revision manual: solo READMEs en superficies PAW inactivas, `_inbox/**` no versionado, sin ejecutables/schema bajo `paw/**`, sin runtimes/proveedores/stacks nombrados en el core.

## 14. Cierre

- [x] checklist completo
- [x] assumptions resueltas
- [x] decisiones registradas
- [x] blockers resueltos
- [x] drift documentado
- [x] validaciones ejecutadas

## 15. Riesgos y pendientes

### Riesgos

- Tests demasiado ligados a frases concretas.

### Pendientes

- Cierre formal.
