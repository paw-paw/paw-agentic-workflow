# Backlog Fase N Template

Este documento es auxiliar. No redefine precedencia, no sustituye contratos y no introduce nuevas decisiones de producto por si solo.

---

## Estado

* Change id:
* Patch kind: `spec` | `batch`
* Lifecycle:
* Fase:
* Estado: `draft` | `active` | `blocked` | `done`
* Ultima actualizacion:
* Owner:
* Depende de:
* Desbloquea:

---

## 1. Fuente de verdad aplicable

* `docs/README.md`
* `AGENTS.md`
* `sdd/parches/<change-id>/patch.yaml`
* `sdd/parches/<change-id>/definicion.md`
* `sdd/parches/<change-id>/plan.md`
* `sdd/parches/<change-id>/tasks.md`
* `sdd/parches/<change-id>/decision.log`, si existe

---

## 2. Objetivo de la fase

* Resultado esperado:
* Razon de la fase:
* Cambio que queda habilitado al cerrar:

---

## 3. Rama obligatoria por tipo

### Si `patch_kind = spec`

* fuente viva o alcance de spec que esta fase modifica:
* reconciliacion esperada:

### Si `patch_kind = batch`

* items cerrados cubiertos por esta fase:
* criterio global de cierre que esta fase acerca:
* criterio de cierre por item:
* split check:

---

## 4. Assumptions

* No critical assumptions.

---

## 5. Precondiciones

### Documentos

* [ ] artifacts vigentes

### Decisiones previas

* [ ] decision requerida antes de ejecutar

### Estado tecnico

* [ ] condicion tecnica requerida

---

## 6. Alcance

### Si entra

* [ ] cambio incluido

### No entra

* [ ] cambio fuera de alcance

---

## 7. Archivos y superficies de trabajo

### Leer antes de editar

* `docs/...`

### Editar

* `docs/...`

### Validar

* `tests/...`

### No tocar

* `src/...`

---

## 8. Checklist de ejecucion

### Bloque A - Relectura de fuentes

* [ ] tarea concreta

### Bloque B - Inspeccion de estado actual

* [ ] tarea concreta

### Bloque C - Edicion por archivo

* [ ] tarea concreta

### Bloque D - Registro de decisiones, hallazgos o blockers

* [ ] tarea concreta

### Bloque E - Validacion

* [ ] tarea concreta

### Bloque F - Cierre

* [ ] tarea concreta

---

## 9. Drift detectado

* Fecha:
  * fuente esperada:
  * diferencia encontrada:
  * impacto:
  * accion:
  * requiere decision: `si` | `no`

---

## 10. Hallazgos durante ejecucion

* Fecha:
  * hallazgo:
  * impacto:
  * accion:

---

## 11. Blockers

* [ ] blocker

---

## 12. Decisiones tomadas

* Fecha:
  * decision:
  * razon:
  * documentos o areas afectadas:

---

## 13. Validaciones

### Documentales

* [ ] verificar alineacion con contratos aplicables

### Tecnicas

* [ ] validacion tecnica aplicable

### Manuales

* [ ] revision manual aplicable

### Resultados

* Validacion:
  * comando o revision:
  * resultado esperado:
  * resultado obtenido:
  * estado: `pass` | `fail` | `skipped`
  * notas:

---

## 14. Cierre

La fase solo se considera cerrada si:

* [ ] checklist completo o pendientes explicitamente diferidos
* [ ] assumptions criticas resueltas, aceptadas o escaladas
* [ ] decisiones relevantes registradas
* [ ] blockers resueltos o diferidos con razon
* [ ] drift documentado o resuelto
* [ ] validaciones requeridas ejecutadas o justificadas
* [ ] resultados de validacion registrados

---

## 15. Riesgos y pendientes

### Riesgos

* riesgo

### Pendientes

* pendiente
