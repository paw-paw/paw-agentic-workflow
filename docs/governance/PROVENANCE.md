# Provenance

## Source

- Repository: `https://github.com/paw-paw/paw-paw.github.io`
- Source branch: `dev`
- Source commit: `1bcc251dc0ad0d7ee5f0ad5754e839907f624771`
- Captured at: `2026-06-13T20:26:44Z`
- Source working tree: clean
- Remote backup verification: `origin/dev` matched the source commit on June 13, 2026
- Hash algorithm: SHA-256

## Extraction model

A complete private snapshot was created before any `_inbox/` normalization. The public seed was then assembled from that frozen snapshot rather than from a modified portfolio working tree.

The private snapshot contains all Git-tracked source files plus the ignored `_inbox/**` surface. It is not committed or published. Its protected local path is intentionally omitted from public repository content.

## Public history

The PAW repository starts with a new sanitized history. It does not import the portfolio `.git/` directory or portfolio commit history. Source commit identity and per-file hashes preserve traceability without exposing private staging material.

`docs/provenance/public-seed-imports.tsv` records every byte-identical imported file. `docs/provenance/public-seed-exclusions.tsv` records excluded surfaces and reasons.
