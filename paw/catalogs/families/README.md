# Software Families

## Purpose

A software family describes the primary intent of the governed product or system.
Every product selects exactly one primary family. Technology, repository shape, and
agent runtime do not determine family identity.

The canonical identifiers and boundary data live in `catalog.json`.

## Classification

Use the product's sustained responsibility:

- `content-knowledge`: publishing and navigating maintained content.
- `transactional-application`: interactive workflows over durable business state.
- `service-api`: a sustained remote machine interface.
- `library-package-sdk`: reusable code consumed through an ecosystem.
- `cli-developer-tool`: a supported command or developer-tool contract.
- `client-application`: an installed mobile or desktop experience.
- `data-machine-learning`: governed data or model lifecycle outcomes.
- `agentic-system`: material autonomy, tools, memory, approvals, and recovery.

## Composite Products

A composite product still has one primary family. Additional architectural
responsibilities are represented later through component profiles and concerns.

Examples:

- A transactional product with an API, worker, and package remains
  `transactional-application`.
- An SDK with a documentation site remains `library-package-sdk`.
- A data product with a model-serving API remains `data-machine-learning` when the
  data/model lifecycle is still its primary intent.

## Important Boundaries

- A documentation-only site is `content-knowledge`.
- Mobile and desktop products are both `client-application`; implementation envelopes
  may differ later.
- Software does not become `agentic-system` because an agent helped build it.
- A subordinate LLM feature does not reclassify a product when autonomy is not the
  central product responsibility.

The `SF-*` values are provenance aliases from the design research. New contracts use
the semantic family IDs.
