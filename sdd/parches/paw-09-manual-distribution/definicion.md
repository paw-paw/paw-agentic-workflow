# Definicion: paw-09-manual-distribution

---

## Estado

- Change id: `paw-09-manual-distribution`
- Program id: `paw-foundation`
- Patch kind: `spec`
- Lifecycle: `spec-anchored`
- Estado: `active`
- Fuente: handoff final 09 preservado en `handover.md`
- Ultima actualizacion: 2026-06-20
- Owner: sesion Codex activa con aprobacion humana

---

## 1. Objetivo

Materializar una distribucion manual candidate de PAW para Codex que sea
versionada, reproducible, auditable por manifest/checksums y reversible mediante
backup o rollback. El resultado debe permitir instalar, verificar, actualizar y
desinstalar la superficie Codex declarada sin depender de rutas absolutas del
repo origen, sin package manager, sin marketplace y sin declarar release estable
ni portabilidad multiruntime.

---

## 2. No objetivos

- Publicar `0.1.0` como release estable.
- Crear package manager, marketplace, auto-update, deployment, Pages o Actions.
- Declarar portabilidad multiruntime antes de `paw-10` y los pilotos.
- Incluir portfolio, `_inbox/**`, research privado o artifacts ajenos al
  runtime/distribucion PAW.
- Activar `paw/parches/**`, writers v2 o cambiar el workflow default antes del
  cutover.
- Sobrescribir instalaciones existentes o customizaciones locales en silencio.

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `README.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `docs/licensing/OUTPUT-POLICY.md`
- `paw/README.md`
- `paw/core/artifact-lifecycle.md`
- `paw/core/authority-and-evidence.md`
- `paw/core/compatibility-policy.md`
- `paw/orchestration/workflow.md`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/README.md`
- `.codex/paw-runtime-map.json`
- `paw/integration/commit-pr-policy.md`
- `sdd/parches/paw-09-manual-distribution/handover.md`

---

## 4. Alcance

### Si entra

- Definir el layout de release manual candidate y sus limites de contenido.
- Crear un manifest de distribucion con archivos declarados, checksums,
  version, compatibilidad, requisitos, licencias y notices.
- Agregar herramientas deterministicas para generar/validar el manifest y
  verificar una instalacion manual.
- Documentar instalacion, upgrade, rollback, desinstalacion y carga progresiva.
- Agregar fixtures/tests para instalacion limpia, conflicto local, manifest
  alterado y desinstalacion que no borra archivos ajenos.
- Reconciliar docs vivos, inventario de herramientas/tests y limites de
  bootstrap sin activar v2.

### Fuera de alcance

- Empaquetado publicado, releases, tags, marketplace, auto-update o CI remoto.
- Instaladores destructivos, edicion de archivos no declarados o overwrites sin
  aprobacion explicita.
- Distribucion de adapters no Codex que pertenecen a `paw-10`.
- Cambios conceptuales a licencia MPL fuera de aclarar la politica existente.

---

## 5. Superficies afectadas

### Docs

- `docs/README.md`
- `README.md`
- `AGENTS.md`
- `docs/governance/ARCHITECTURE.md`
- `docs/governance/V1-TRANSITION.md`
- `docs/governance/BOOTSTRAP-STATUS.md`
- `docs/licensing/OUTPUT-POLICY.md`
- `paw/README.md`
- nuevo contrato bajo `paw/distribution/**`
- `paw/tools/README.md`
- `paw/tests/README.md`
- `.codex/README.md`

### Codigo o contenido

- `paw/distribution/**`
- `paw/tools/distribution/**`
- `paw/tools/validate-distribution.mjs`
- `paw/tools/schemas/distribution/**`
- `paw/tests/fixtures/distribution/**`
- `.codex/paw-runtime-map.json`
- `.codex/paw-toolkit/**`

### Configuracion o validacion

- `paw/tests/contract/distribution-*.test.mjs`
- `tests/foundation-governance.test.mjs`
- `tests/core-contracts.test.mjs`
- `tests/schema-validator-conformance.test.mjs`

---

## 6. Decisiones conocidas

- decision: ejecutar `paw-09` directamente sobre `main` por instruccion humana
  explicita, sin crear rama nueva.
  - razon: el usuario ordeno "No generes una branch, estas modificaciones se
    haran en el main".
  - documentos o areas afectadas: cadencia local de commits y `decision.log`.
- decision: mantener la distribucion como `candidate` y no como release estable
  `0.1.0`.
  - razon: el handoff permite identificadores de candidato/desarrollo y prohibe
    publicar todavia `0.1.0`.
  - documentos o areas afectadas: manifest, docs de distribucion, versionado.
- decision: crear una superficie `paw/distribution/**` como contrato vivo de
  distribucion manual.
  - razon: `docs/README.md` no registra aun una autoridad especifica para
    distribucion manual y el patch necesita una superficie durable.
  - documentos o areas afectadas: `docs/README.md`, `paw/README.md`,
    `paw/tools/README.md`, `paw/tests/README.md`.

---

## 7. Assumptions

- La distribucion candidate inicial puede representarse como un manifest y
  herramientas de verificacion sin generar un archivo empaquetado externo.
- Las herramientas deben funcionar con Node.js stdlib y sin red.
- La instalacion manual Codex se limita a los archivos declarados para la
  superficie Codex candidate y no modifica archivos fuera del destino declarado.
- Las pruebas pueden simular destinos limpios y con conflictos mediante fixtures
  temporales sin tocar la instalacion real del usuario.

---

## 8. Decisiones abiertas

- Ninguna bloqueante para `sdd-plan`.

---

## 9. Riesgos

- riesgo: el manifest omite archivos necesarios para que Codex funcione.
  - impacto: la instalacion validaria integridad pero quedaria incompleta.
  - mitigacion: generar la lista desde un contrato explicito y cubrirla con
    tests de manifest y verificacion.
- riesgo: el instalador borra o sobrescribe customizaciones locales.
  - impacto: perdida de trabajo del usuario y violacion del handoff.
  - mitigacion: detectar conflictos antes de escribir y exigir aprobacion para
    overwrites; uninstall solo remueve archivos propios declarados.
- riesgo: la distribucion parezca una release portable estable.
  - impacto: se adelanta el cutover o la portabilidad antes de los gates.
  - mitigacion: estado `candidate`, docs de limites y sin publicacion `0.1.0`.
- riesgo: licencias/notices o outputs queden ambiguos.
  - impacto: obligaciones MPL mal comunicadas.
  - mitigacion: manifest con licencia/notices y docs alineadas con
    `OUTPUT-POLICY.md`.

---

## 10. Criterio de cierre

La definicion queda lista para `sdd-plan` porque:

- [x] objetivo y no objetivos estan claros
- [x] las fuentes de verdad aplicables estan listadas
- [x] el alcance y fuera de alcance no se contradicen
- [x] assumptions criticas resueltas, aceptadas o escaladas
- [x] las decisiones abiertas estan visibles
- [x] los riesgos principales estan identificados

---

## 11. Registro de cambios

- Fecha: 2026-06-20
  - cambio: definicion inicial del patch.
  - razon: intake aprobado desde handoff final 09 y repo actualizado a
    `origin/main`.
