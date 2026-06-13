# Definicion Template: spec

Usa este template para crear `sdd/parches/<change-id>/definicion.md` durante `sdd-intake` cuando `patch_kind = spec`.

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

- Change id:
- Program id:
- Patch kind: `spec`
- Lifecycle: `spec-first` | `spec-anchored`
- Estado: `draft` | `active` | `blocked` | `done`
- Fuente:
- Ultima actualizacion:
- Owner:

---

## 1. Objetivo

Describe en 3-6 lineas que debe quedar resuelto, por que el cambio existe y que cambia cuando se cierra.

---

## 2. No objetivos

- [ ] cosa que explicitamente no entra

---

## 3. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- documentos contractuales aplicables:
- documentos auxiliares aplicables:
- fuentes externas o handovers:

---

## 4. Alcance

### Si entra

- [ ] linea de alcance

### Fuera de alcance

- [ ] limite explicito

---

## 5. Superficies afectadas

### Docs

- `docs/...`

### Codigo o contenido

- `src/...`

### Configuracion o validacion

- `tests/...`

---

## 6. Decisiones conocidas

- decision:
  - razon:
  - documentos o areas afectadas:

---

## 7. Assumptions

- No critical assumptions.

---

## 8. Decisiones abiertas

- [ ] decision pendiente:
  - por que bloquea:
  - quien debe decidir:

---

## 9. Riesgos

- riesgo:
  - impacto:
  - mitigacion:

---

## 10. Criterio de cierre

La definicion queda lista para `sdd-plan` solo si:

- [ ] objetivo y no objetivos estan claros
- [ ] las fuentes de verdad aplicables estan listadas
- [ ] el alcance y fuera de alcance no se contradicen
- [ ] assumptions criticas resueltas, aceptadas o escaladas
- [ ] las decisiones abiertas estan visibles
- [ ] los riesgos principales estan identificados

---

## 11. Registro de cambios

- Fecha:
  - cambio:
  - razon:
