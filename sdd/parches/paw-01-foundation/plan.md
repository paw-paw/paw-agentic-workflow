# Plan: paw-01-foundation

## Estado

- Change id: `paw-01-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Estado: `ready-for-tasks`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana
- Depende de: handoff 00 completado
- Desbloquea: `paw-02-core-patch-contracts`, solo despues del merge y cierre

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `AGENTS.md`
- `sdd/parches/paw-01-foundation/patch.yaml`
- `sdd/parches/paw-01-foundation/definicion.md`
- `sdd/parches/paw-01-foundation/decision.log`
- `_inbox/final/01-foundation-identity-authority-handoff.md`
- `_inbox/decision_ledger.md`, consultado para identidad, capas, autoridad y transicion
- `_inbox/legacy/decision-handoff/sdd-roles-conformance-consolidated-decisions-handoff.md`, consultado de forma acotada para resolver los nombres de roles y niveles de autoridad

## 2. Lectura brownfield

### Estructura existente

- El repo contiene una semilla publica pre-alpha con gobierno minimo en `docs/**`.
- `sdd/**` y `.codex/**` forman el runtime v1 que debe seguir ejecutando el programa hasta el patch 14.
- No existe `paw/**`, workspace para patch 01, CI, Pages, runtime web, package manager ni dependencias externas.
- MPL-2.0, notices, outputs y procedencia ya tienen una materializacion inicial.

### Patrones existentes

- Markdown es la superficie principal de doctrina, gobierno y operacion.
- `docs/README.md` ya funciona como mapa bootstrap y debe evolucionar al indice canonico.
- Las validaciones deterministas usan Node.js standard library y `node:test`.
- Los artifacts SDD viven en `sdd/parches/<change-id>/`.

### Deuda o drift relevante

- `sdd/**` se presenta en varios documentos como producto portable o metodologia propia, aunque ahora es historia/runtime v1 de Spec-Driven Development.
- Algunas skills y perfiles `.codex/**` todavia se describen como parte de un Astro portfolio y enrutan a `astro-pages-verify`/`astro-verifier`, superficies ausentes del repo.
- `AGENTS.md`, `docs/README.md` y `sdd/core/README.md` contienen reglas de autoridad parcialmente solapadas.
- No existe contributor guidance ni separacion explicita entre core portable futuro, workspaces, orchestration, tooling, tests, runtime adapters, gobierno local e historia v1.

### Restricciones tecnicas

- No renombrar ni mover `sdd/**`, `.codex/skills/sdd-*`, schemas o manifests.
- No modificar el contrato del schema v1 ni activar un writer bajo `paw/**`.
- No introducir dependencias.
- Preservar los TSV de procedencia como registro import-time.
- Mantener toda documentacion distribuible nueva o modificada en ingles.

## 3. Assumptions

- Las referencias al portfolio dentro de `docs/governance/PROVENANCE.md`, tablas de importacion/exclusion y explicaciones historicas siguen siendo evidencia legitima, no acoplamiento operativo.
- El indice canonico puede clasificar documentos mediante una tabla central sin exigir frontmatter global en este patch.
- Los roles aprobados son `strategic`, `contract`, `verifiable` y `operational`; los niveles de autoridad son `authoritative`, `supporting` y `non_authoritative`.
- Los READMEs bajo `paw/**` son la minima materializacion segura porque documentan ownership sin fingir implementacion.

## 4. Zonas afectadas

### Gobierno e identidad

- `README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/README.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- nuevos documentos de arquitectura, naming y transicion v1 bajo `docs/governance/`
- `docs/licensing/OUTPUT-POLICY.md`
- `LICENSES/README.md`
- `NOTICES.md` solo si la revision detecta una atribucion incompleta

### Layout objetivo

- `paw/README.md`
- `paw/core/README.md`
- `paw/parches/README.md`
- `paw/orchestration/README.md`
- `paw/tools/README.md`
- `paw/tests/README.md`

### Runtime v1 conservado

- `sdd/README.md`
- `sdd/core/README.md`
- documentos de `sdd/orchestration/**` con routing Astro/portfolio
- perfiles `.codex/agents/*.toml` con identidad Astro/portfolio
- skills `.codex/skills/sdd-*/SKILL.md` con verificacion Astro inexistente
- `.codex/config.toml` para describirlo como runtime v1, sin alterar limites

### Validacion

- nuevo `tests/foundation-governance.test.mjs`
- validator v1 solo se modifica si los nuevos documentos revelan una incompatibilidad real

## 5. Bloques de implementacion

### Bloque 1 - Identidad, autoridad y gobierno

- Objetivo: convertir el bootstrap minimo en un mapa documental canonico y gobierno propio de PAW.
- Cambios esperados:
  - README con formulacion oficial, estado honesto, estructura y transicion.
  - `docs/README.md` como indice unico con roles, autoridad, precedencia y ownership.
  - `AGENTS.md` reducido a puente operativo.
  - contributor guidance y documentos de arquitectura, naming y transicion.
  - licensing/output guidance visible y consistente.
- Riesgo principal: duplicar autoridad o promover decisiones de patches futuros.
- Validacion: revision de indice, expresiones prohibidas, links y claims.

### Bloque 2 - Layout PAW inerte

- Objetivo: materializar `paw/**` con ownership y limites sin activar v2.
- Cambios esperados:
  - seis READMEs en ingles.
  - prohibicion explicita de workspaces, writers, schemas, tooling y ejecucion antes del patch propietario/cutover.
- Riesgo principal: que un lector o agente use `paw/parches/` prematuramente.
- Validacion: contenido permitido, ausencia de archivos ejecutables y ausencia de symlinks.

### Bloque 3 - Transicion y desacoplamiento v1

- Objetivo: mantener operativo v1 sin presentarlo como PAW final ni depender del portfolio fuente.
- Cambios esperados:
  - `sdd/**` descrito como Spec-Driven Development v1 activo y transitorio.
  - routing, model policy y subagents neutrales al repo actual.
  - eliminación de referencias a verificadores Astro ausentes.
  - perfiles Codex neutrales, conservando nombres, interfaces y permisos.
- Riesgo principal: romper el flujo que ejecuta este mismo patch.
- Validacion: suite v1 completa y busqueda dirigida de acoplamientos operativos.

### Bloque 4 - Conformance y reconciliacion

- Objetivo: convertir criterios de acceptance estables en checks locales proporcionales.
- Cambios esperados:
  - test Node para identidad, indice, layout, inactividad v2, ausencia de symlinks, `_inbox` privado, naming y desacoplamiento.
  - revision final de docs, runtime v1 y workspace SDD.
- Riesgo principal: checks demasiado amplios que confundan historia legitima con comportamiento activo.
- Validacion: comandos obligatorios, test nuevo y `git diff --check`.

## 6. Datos, schemas y contratos

- Contratos documentales afectados: mapa documental, autoridad, naming, arquitectura de capas, transicion v1 y output policy.
- Datos o contenido afectados: solo Markdown y metadata textual de Codex.
- Schemas o modelos afectados: ninguno.
- Compatibilidad esperada:
  - manifests y validator v1 permanecen compatibles.
  - workspaces nuevos siguen naciendo bajo `sdd/parches/`.
  - `paw/parches/` permanece no operativo.

## 7. Conformance previsto

| Regla | Check o disposicion | Enforcement |
| --- | --- | --- |
| Identidad oficial y claims pre-alpha | nuevo test de foundation + revision manual | automated |
| Indice documental unico y clasificado | nuevo test + revision manual | automated |
| Layout `paw/**` presente e inerte | nuevo test | automated |
| v1 sigue activo y v2 no se activa | validator v1 + nuevo test | automated |
| Sin symlinks, dual-write ni `workspace_root` configurable | nuevo test | automated |
| `_inbox/**` ignorado y no versionado | nuevo test | automated |
| Sin acoplamiento operativo al portfolio | nuevo test dirigido + busqueda manual | automated |
| MPL-2.0 y output policy visibles | nuevo test + revision manual | automated |

No se crea CI ni enforcement `ci-gated` porque el handoff lo excluye.

## 8. Validaciones previstas

### Documentales

- verificar que `docs/README.md` contiene el mapa canonico completo;
- verificar que cada documento distribuible modificado esta en ingles;
- comprobar links Markdown mediante el validator existente;
- buscar expresiones de naming prohibidas y referencias activas al producto como SDD.

### Tecnicas

```bash
node sdd/tools/validate-sdd.mjs
node sdd/tools/validate-sdd.mjs --fixtures
node --test tests/sdd-validation.test.mjs
node --test tests/foundation-governance.test.mjs
git diff --check
```

### Manuales

- revisar que referencias al portfolio restantes sean solo procedencia/historia;
- revisar que `paw/**` no prometa implementacion o portabilidad;
- revisar que no se haya iniciado scope del handoff 02.

## 9. Riesgos y mitigaciones

- Riesgo: convertir roles documentales futuros en una migracion global.
  - Mitigacion: clasificar solo la superficie gobernada por el indice en este patch; no agregar schema/frontmatter obligatorio.
- Riesgo: modificar demasiado runtime v1.
  - Mitigacion: cambios textuales y de routing únicamente donde una superficie ausente produce una instruccion falsa.
- Riesgo: test con falsos positivos sobre procedencia.
  - Mitigacion: limitar checks de acoplamiento a superficies runtime activas.
- Riesgo: cierre SDD versionado junto con fuentes vivas cause dos autoridades.
  - Mitigacion: declarar artifacts del patch como memoria no autoritativa tras cierre.

## 10. Decisiones humanas abiertas

- Estado: `none`

## 11. Criterio de cierre tecnico

- [x] el alcance respeta `definicion.md`
- [x] las zonas afectadas estan identificadas
- [x] los bloques de implementacion son secuenciables
- [x] las validaciones existen y son proporcionales
- [x] assumptions criticas estan clasificadas
- [x] no hay decisiones abiertas que bloqueen `sdd-tasks`

## 12. Registro de cambios

- `2026-06-13`
  - Plan inicial basado en repo reality, ledger y consulta legacy acotada.
