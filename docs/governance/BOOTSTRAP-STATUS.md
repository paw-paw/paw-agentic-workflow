# Bootstrap Status

## State

- Public status: `pre-alpha`.
- Program prepared: `paw-foundation`.
- Active implementation: sanitized v1 bootstrap.
- Portability claim: none.
- Release claim: none.

## Included

The seed contains the v1 SDD core, orchestration support, validator, schema, fixtures, selected Codex SDD skills and agents, and minimum public governance.

Imported files were copied byte-for-byte from the frozen source snapshot and classified in `docs/provenance/public-seed-imports.tsv`.

## Not included

The seed excludes the Astro portfolio runtime, personal content, assets, portfolio contracts, deployment workflows, `CNAME`, package dependencies, generated output, editorial skills, portfolio verification tooling, historical portfolio patches, and every `_inbox/**` file from Git history.

The private final handoffs and decision ledger exist only in the local ignored working tree. The private legacy archive remains with the extraction snapshot.

## Known inherited limitations

The v1 bootstrap was developed inside an Astro portfolio and some imported files still contain portfolio-specific wording or assumptions. They are retained unchanged for provenance and bootstrap compatibility. Their transformation belongs to the approved patch sequence beginning with patch 01.

This phase does not create `paw/**`, rename skills, migrate manifests, implement schema v2, reorganize doctrine, or enable automation.
