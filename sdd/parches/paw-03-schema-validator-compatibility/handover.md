# Handover: paw-03-schema-validator-compatibility

## Procedencia

- Fuente privada: `_inbox/final/03-schema-validator-compatibility-handoff.md`
- Program id: `paw-foundation`
- Orden: 3 de 14
- Dependencia: `paw-02-core-patch-contracts` cerrado
- Gobierno de ejecucion: workflow SDD v1 vigente

Este artifact preserva el input filtrado necesario para ejecutar el patch. La fuente
privada no se versiona y este handover no sustituye los contratos vivos.

## Objetivo heredado

Materializar el modelo conceptual del manifest v2 mediante schema, validator dual y
fixtures ejecutables sin cambiar el default operativo v1.

## Alcance heredado

- Preservar la validacion de manifests v1.
- Implementar el schema fisico v2 para `patch.yaml`.
- Detectar la version antes de aplicar reglas.
- Validar invariantes de `patch_mode` y estado.
- Rechazar manifests hibridos o de version desconocida.
- Mantener exento `sdd/parches/legacy/**`.
- Producir resultados humanos compactos y output estructurado.
- Cubrir parsing, contrato de CLI y compatibilidad con fixtures positivos y negativos.
- Mantener el validator libre de Astro, npm, Codex, prompts y mutaciones.

## Contrato v2 heredado

Campos:

```yaml
schema_version: 2
change_id: string
program_id: string | null
patch_mode: docs-bootstrap | intention-first | doc-anchored
status: active | blocked | closed | abandoned
created_at: date
closed_at: date | null
related_docs: array
creates_docs: array
bootstrap_context: pure-greenfield | undocumented-brownfield | null
```

Invariantes:

- `docs-bootstrap` requiere `creates_docs` no vacio y `bootstrap_context` no nulo.
- `intention-first` requiere `bootstrap_context` nulo.
- `doc-anchored` requiere `related_docs` no vacio y `bootstrap_context` nulo.
- `closed` requiere `closed_at`; los demas estados lo mantienen nulo salvo una
  compatibilidad historica documentada.

## Casos minimos heredados

- v1 valido: `spec/spec-first`, `spec/spec-anchored`, `batch/spec-first`.
- v1 legacy exento.
- v2 valido por cada `patch_mode` y con `program_id`.
- v2 invalido por requisitos de modo o inconsistencia de `closed_at`.
- manifest hibrido, version desconocida y YAML invalido.
- paths fuera de roots permitidos.

## Limites heredados

- No activar `paw/parches/`.
- No migrar workspaces v1 ni modificar patches cerrados.
- No cambiar skills v1 para escribir v2 por default.
- No implementar catalogs, workflow, mutation envelopes ni toolkit completo.
- No declarar compatibilidad multiruntime.

## Reconciliacion de layout

El handoff proponia `paw/tools/**` y `paw/tests/**`, pero permitia ajustar el layout.
Las fuentes vivas mantienen esas superficies inactivas y prohiben escribir tooling o
schemas activos alli antes del cutover. El ledger confirma que el validator v1 debe
extenderse para compatibilidad dual durante la transicion.

Por tanto, este patch planifica la implementacion transicional bajo `sdd/tools/**`,
`sdd/tests/**` y `tests/**`. `paw/tools/**` y `paw/tests/**` conservan solo su
orientacion inactiva. El destino final no se activa ni se duplica en este patch.

## Stop conditions

- El schema exige redefinir decisiones de `paw-02-core-patch-contracts`.
- La compatibilidad exige alterar patches cerrados.
- La implementacion mezcla schema con routing de skills.
- Se intenta activar v2 o un segundo namespace antes de sus gates.

## Siguiente patch

`paw-04-catalogs-presets`.
