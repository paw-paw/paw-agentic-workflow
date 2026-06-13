# Plan Template: batch

Usa este template para convertir una `definicion.md` `batch` en un plan tecnico acotado.

---

## Estado

- Change id:
- Patch kind: `batch`
- Lifecycle: `spec-first`
- Estado: `draft` | `blocked` | `ready-for-tasks` | `superseded`
- Ultima actualizacion:
- Owner:

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/decision.log`, si existe

---

## 2. Lectura del batch

- lista cerrada de items:
- criterio global de cierre:
- dependencias internas detectadas:
- senales de split:

---

## 3. Assumptions

- No critical assumptions.

---

## 4. Mapa por item

### Item N - <nombre>

- Cambio esperado:
- Superficies afectadas:
- Dependencias:
- Criterio de cierre:
- Validaciones asociadas:

---

## 5. Riesgos y split check

- riesgo:
  - impacto:
  - mitigacion:
- [ ] el batch sigue legible
- [ ] no mezcla lifecycles incompatibles
- [ ] no presenta dependencias internas complejas

---

## 6. Validaciones previstas

- [ ] validacion documental global
- [ ] validacion tecnica global
- [ ] validacion por item solo cuando haga falta

---

## 7. Decisiones humanas abiertas

- Estado: `none` | `non-blocking` | `blocking`

---

## 8. Criterio de cierre tecnico

- [ ] la lista de items sigue cerrada
- [ ] cada item conserva criterio de cierre
- [ ] el criterio global de cierre sigue vigente
- [ ] assumptions criticas resueltas, aceptadas o escaladas
- [ ] no hay senales de split sin resolver

---

## 9. Registro de cambios

- Fecha:
  - cambio:
  - razon:
