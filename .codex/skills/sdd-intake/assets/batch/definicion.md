# Definicion Template: batch

Usa este template para crear `sdd/parches/<change-id>/definicion.md` durante `sdd-intake` cuando `patch_kind = batch`.

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

- Change id:
- Program id:
- Patch kind: `batch`
- Lifecycle: `spec-first`
- Estado: `draft` | `active` | `blocked` | `done`
- Fuente:
- Ultima actualizacion:
- Owner:

---

## 1. Objetivo global

Resume por que estos items deben resolverse juntos y que queda cerrado al final del batch.

---

## 2. Lista cerrada de items

- Item 1:
  - criterio de cierre:
- Item 2:
  - criterio de cierre:

---

## 3. Criterio global de cierre

- [ ] todos los items incluidos estan cerrados o diferidos explicitamente
- [ ] no aparecieron dependencias internas complejas que requieran split

---

## 4. Fuentes de verdad aplicables

- `docs/README.md`
- `AGENTS.md`
- documentos contractuales aplicables:
- documentos auxiliares aplicables:
- fuentes externas o handovers:

---

## 5. Alcance

### Si entra

- [ ] item incluido

### Fuera de alcance

- [ ] limite explicito

---

## 6. Assumptions

- No critical assumptions.

---

## 7. Decisiones abiertas

- [ ] decision pendiente:
  - por que bloquea:
  - quien debe decidir:

---

## 8. Riesgos

- riesgo:
  - impacto:
  - mitigacion:

---

## 9. Criterio de readiness

La definicion queda lista para `sdd-plan` solo si:

- [ ] la lista de items esta cerrada
- [ ] existe criterio global de cierre
- [ ] cada item tiene criterio de cierre
- [ ] no hay dependencias internas complejas sin resolver
- [ ] assumptions criticas resueltas, aceptadas o escaladas

---

## 10. Registro de cambios

- Fecha:
  - cambio:
  - razon:
