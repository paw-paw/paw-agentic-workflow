# Handover: paw-06-workflow-conformance

## Fuente

- Input primario: `_inbox/final/06-workflow-bootstrap-conformance-handoff.md`
- Contexto de programa: `_inbox/final/README.md`
- Guia solicitada: `_inbox/final/patch-execution-guide.md`

## Nota de disponibilidad

`_inbox/final/patch-execution-guide.md` no existe en la base revisada al iniciar el
patch. La preparacion usa el README final, el handoff 06, `docs/README.md`,
`AGENTS.md`, `CONTRIBUTING.md`, documentos vivos aplicables y el cierre de la fase
anterior disponible en `origin/main`.

## Identidad recibida

- `change_id`: `paw-06-workflow-conformance`
- `program_id`: `paw-foundation`
- Orden: 06 de 14
- Depende de: `paw-05-adapter-adoption-contracts`
- Gobierno de ejecucion: SDD v1 bajo `sdd/parches/`
- Clasificacion esperada: `spec` + `spec-anchored`

## Objetivo recibido

Definir contratos portables del workflow PAW, bootstrap documental y trazabilidad
de conformance sin empaquetarlos para un runtime agentic concreto.

## Alcance recibido

- Workflow portable con estados, precondiciones, inputs, outputs y routing para:
  triage, intake, bootstrap discover, bootstrap define, bootstrap write, plan,
  tasks, phase backlog, execute phase, sync drift y close.
- Nombres tecnicos definitivos con prefijo `paw-*`.
- Workflow portable sin dependencia de `.codex/**`.
- Fronteras explicitas entre triage e intake.
- Bootstrap documental separado en discover, define y write.
- Close con estados: completado, completado con gaps aceptados, bloqueado y
  abandonado.
- Roles documentales canonicos: strategic, contract, verifiable y operational.
- Conformance con cadena `documento -> rol -> regla -> check -> enforcement`.
- Dispositions de reglas: `existing-check`, `new-automated-check`,
  `manual-with-evidence`, `generated`, `deferred`, `accepted-gap`, `blocked`.
- Enforcement: `manual`, `automated`, `ci-gated`.
- Validaciones proporcionales, BDD-lite donde aplique, browser checks solo cuando
  la regla lo requiera y CI-gated solo para checks estables.

## Fuera de alcance recibido

- Skills Codex.
- Scripts especificos de runtime.
- Integracion VCS/PR.
- Instalacion.
- Reescritura de documentacion contractual de este portfolio.

## Criterios de aceptacion recibidos

- Triage, intake y bootstrap tienen fronteras no solapadas.
- Discover no crea autoridad.
- Define no escribe contratos finales.
- Write exige aprobacion humana y respeta `creates_docs`.
- Los cuatro roles se pueden aplicar a documentos multirol.
- Toda regla puede resolverse sin forzar un test artificial.
- El workflow detecta loops, artifacts faltantes y estados incompatibles.
- Close no puede declarar exito ocultando gaps o drift.

## Condiciones de parada recibidas

Detener y registrar decision si:

- una operacion requiere conocimiento de Codex para definirse;
- un artifact duplica otro sin responsabilidad distinta;
- evidencia observada se promueve automaticamente a autoridad;
- la cadena de conformance obliga a automatizar reglas no automatizables;
- un write puede operar sin gate humano.

## Verificacion de dependencia anterior

Al iniciar este patch, `origin/main` contiene el merge de `paw-05-adapter-adoption-contracts`
mediante `c939698` (`Merge pull request #6 from paw-paw/codex/paw-05-adapter-adoption-contracts`).
El `main` local estaba detras de `origin/main`, por lo que la rama del patch se creo
desde `origin/main`.
