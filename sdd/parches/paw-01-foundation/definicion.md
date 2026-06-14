# Definicion: paw-01-foundation

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce decisiones de producto fuera del handoff vinculante.

---

## Estado

- Change id: `paw-01-foundation`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-first`
- Estado: `done`
- Fuente: `_inbox/final/01-foundation-identity-authority-handoff.md`
- Ultima actualizacion: `2026-06-13`
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Objetivo

Establecer la identidad y autoridad inicial de PAW, materializar un mapa documental canonico y crear el layout objetivo `paw/**` sin activar el workflow v2. El patch debe convertir la semilla publica en un repositorio con gobierno propio, preservar el runtime v1 bajo `sdd/**` y eliminar acoplamientos operativos activos al portfolio que no pertenece a este repositorio.

## 2. No objetivos

- No escribir doctrina detallada del patch model v2.
- No crear schemas, catalogs, adapters, presets ni skills `paw-*`.
- No mover workspaces v1 ni cambiar el default de nuevos patches.
- No activar `paw/parches/` antes del cutover.
- No declarar PAW portable o estable.
- No habilitar Pages, Actions, releases, packaging ni deployment.
- No iniciar ni formalizar `paw-02-core-patch-contracts`.

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `_inbox/final/01-foundation-identity-authority-handoff.md`
- artefactos gobernados de este workspace
- baseline v1 bajo `sdd/**` y `.codex/**`
- `_inbox/decision_ledger.md`, solo para dudas no resueltas por fuentes superiores
- `_inbox/legacy/**`, solo como evidencia historica de emergencia

Protocolo ante ambiguedad, inconsistencia o duda potencialmente bloqueante:

1. Contrastar el handoff con fuentes vivas, artifacts del patch y repo reality.
2. Consultar `_inbox/decision_ledger.md`.
3. Si persiste, leer solo el documento relacionado bajo `_inbox/legacy/`.
4. Si aun persiste, detener la fase y consultar al humano.
5. Registrar la decision resultante y sincronizar artifacts afectados.

Legacy nunca reemplaza el handoff, el ledger ni una fuente viva.

## 4. Alcance

### Si entra

- Definir identidad, naming y compatibilidad historica de PAW.
- Crear un indice documental canonico con politica unica de autoridad y precedencia.
- Definir arquitectura de capas y responsabilidades.
- Alinear README publico, contributor guidance y gobierno operativo minimo.
- Documentar MPL-2.0, outputs, templates y atribuciones.
- Crear `paw/core/`, `paw/parches/`, `paw/orchestration/`, `paw/tools/` y `paw/tests/` como layout inerte y orientativo.
- Inventariar superficies v1 activas y fijar la transicion hasta el patch 14.
- Corregir acoplamientos operativos activos al portfolio dentro del runtime v1 conservado.
- Incorporar validacion determinista del contrato de foundation.
- Cerrar el patch mediante el flujo SDD v1 y entregar un primary PR contra `main`.

### Fuera de alcance

- Renombrar `sdd/**`, skills `sdd-*`, schemas o manifests v1.
- Crear una segunda superficie ejecutable o writers en ambos namespaces.
- Modificar la procedencia import-time registrada.
- Convertir research o documentos legacy en contratos.
- Cambiar arquitectura de schema, patch model, lifecycle o validator v1 salvo checks aditivos del foundation.

## 5. Superficies afectadas

### Docs

- `README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/**`
- READMEs orientativos bajo `paw/**`
- documentos v1 con acoplamientos activos bajo `sdd/**`

### Runtime Codex v1

- `.codex/skills/sdd-*/SKILL.md` cuando contengan rutas de verificacion inexistentes
- `.codex/agents/*.toml` cuando contengan identidad o restricciones del portfolio fuente
- `.codex/config.toml` solo para neutralizar identidad heredada

### Configuracion o validacion

- `tests/foundation-governance.test.mjs`
- `tests/sdd-validation.test.mjs` solo si la integracion del nuevo check lo requiere
- `sdd/tools/validate-sdd.mjs` solo si la validacion existente necesita reconocer documentos nuevos

## 6. Decisiones conocidas

- Marca visible: `PAW`.
- Expansion oficial: `Paw's Agentic Workflow`.
- Repo: `paw-agentic-workflow`.
- Identificadores tecnicos nuevos: `paw`.
- Licencia: `MPL-2.0`.
- PAW implementa una metodologia personalizada; no nombra una metodologia nueva.
- `SDD` significa exclusivamente `Spec-Driven Development`.
- Ruta futura fija: `paw/parches/<change-id>/`.
- `.codex/` sigue siendo la superficie real de Codex.
- `sdd/**` y `sdd-*` permanecen activos como v1 hasta el patch 14.
- No hay symlinks, dual-write ni dos namespaces activos.
- La documentacion distribuible se redacta en ingles; artifacts del patch pueden permanecer en espanol.

## 7. Assumptions

- El handoff 00 esta completado y la semilla publica actual es la base correcta.
- El titular y las atribuciones materializadas en `NOTICES.md` son vigentes.
- El layout `paw/**` usa READMEs orientativos para poder versionar directorios vacios sin presentarlos como implementacion.
- Las menciones historicas al portfolio en documentos de procedencia pueden conservarse cuando describen origen, no comportamiento activo.

## 8. Decisiones abiertas

- Ninguna decision de producto bloqueante identificada durante intake.

## 9. Riesgos

- Duplicar doctrina entre `docs/README.md` y `AGENTS.md`.
  - Mitigacion: el indice documental sera canonico y `AGENTS.md` solo un puente operativo.
- Presentar `paw/**` como activo.
  - Mitigacion: cada README declarara estado inerte y prohibicion de uso antes del cutover.
- Borrar historia o procedencia al corregir naming.
  - Mitigacion: separar referencias historicas legitimas de acoplamientos operativos activos.
- Introducir cambios v2 prematuros.
  - Mitigacion: tests negativos para schemas, skills, writers, symlinks y dual-write.
- Romper el flujo v1 al neutralizar referencias Astro/portfolio.
  - Mitigacion: conservar interfaces y ejecutar todas las validaciones v1.

## 10. Stop conditions

- La politica de autoridad exige reabrir una decision cerrada.
- Material heredado impide relicenciar la semilla bajo MPL-2.0.
- La separacion v1/PAW exige dual-write o symlinks.
- La implementacion requiere activar `paw/parches/` antes del cutover.
- Una duda bloqueante no se resuelve mediante handoff, fuentes vivas, ledger o legacy relacionado.

## 11. Criterio de cierre

La definicion queda lista para `sdd-plan` porque:

- [x] objetivo y no objetivos estan claros
- [x] las fuentes de verdad aplicables estan listadas
- [x] el alcance y fuera de alcance no se contradicen
- [x] assumptions criticas estan clasificadas
- [x] no hay decisiones abiertas bloqueantes
- [x] los riesgos principales estan identificados

El patch solo puede cerrar cuando:

- toda primera mencion publica usa `PAW (Paw's Agentic Workflow)`;
- no quedan referencias activas que llamen SDD al producto PAW;
- `paw/**` tiene ownership, responsabilidad y estado inerte documentados;
- `sdd/**` esta marcado como v1 activo durante la transicion;
- existe una unica politica de autoridad y precedencia;
- `workspace_root` no aparece como opcion configurable;
- no existen symlinks, dual-write ni dos namespaces activos;
- MPL-2.0 y la politica de outputs son visibles;
- no quedan acoplamientos operativos activos al portfolio;
- v2 permanece inactivo.

## 12. Registro de cambios

- `2026-06-13`
  - Creacion desde el handoff final 01 y el baseline publico.
  - Razon: formalizar el patch mediante `sdd-intake`.
