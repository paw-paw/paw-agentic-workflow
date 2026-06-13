# Plan Template: spec

Usa este template para convertir una `definicion.md` `spec` en un plan tecnico brownfield.

---

## Estado

- Change id:
- Patch kind: `spec`
- Lifecycle:
- Estado: `draft` | `blocked` | `ready-for-tasks` | `superseded`
- Ultima actualizacion:
- Owner:
- Depende de:
- Desbloquea:

---

## 1. Fuente de verdad aplicable

- `docs/README.md`
- `sdd/parches/<change-id>/patch.yaml`
- `sdd/parches/<change-id>/definicion.md`
- `sdd/parches/<change-id>/decision.log`, si existe
- documentos contractuales aplicables:
- documentos auxiliares aplicables:

---

## 2. Lectura brownfield

- estructura existente:
- patrones existentes:
- deuda o drift relevante:
- restricciones tecnicas:

---

## 3. Assumptions

- No critical assumptions.

---

## 4. Zonas afectadas

### Docs

- `docs/...`

### Codigo

- `src/...`

### Configuracion, tests o build

- `tests/...`

---

## 5. Bloques de implementacion

### Bloque N - <nombre>

- Objetivo:
- Superficies afectadas:
- Cambios esperados:
- Dependencias:
- Riesgos:
- Validaciones asociadas:

---

## 6. Datos, schemas y contratos

- Contratos documentales afectados:
- Datos o contenido afectados:
- Schemas o modelos afectados:
- Compatibilidad esperada:

---

## 7. Validaciones previstas

### Documentales

- [ ] verificar alineacion con `docs/README.md`

### Tecnicas

- [ ] validacion tecnica relevante

### Manuales

- [ ] revision manual relevante

---

## 8. Riesgos y mitigaciones

- riesgo:
  - impacto:
  - mitigacion:

---

## 9. Decisiones humanas abiertas

- Estado: `none` | `non-blocking` | `blocking`

---

## 10. Criterio de cierre tecnico

- [ ] el alcance respeta `definicion.md`
- [ ] las zonas afectadas estan identificadas
- [ ] los bloques de implementacion son secuenciables
- [ ] las validaciones son reales y proporcionales
- [ ] assumptions criticas resueltas, aceptadas o escaladas
- [ ] no hay decisiones abiertas que bloqueen la division en fases

---

## 11. Registro de cambios

- Fecha:
  - cambio:
  - razon:
