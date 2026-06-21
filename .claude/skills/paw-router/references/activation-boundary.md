# Activation Boundary

PAW is pre-alpha. The active governed workflow remains `sdd-*` under
`sdd/parches/<change-id>/` until the approved cutover gate.

Candidate runtime adapter files may exist under `.claude/**`, `.codex/**`, or a
future governed surface, but their presence does not:

- activate PAW v2 by default;
- make `paw/parches/**` writable active workspace;
- claim stable support or portability;
- authorize dual-write across v1 and v2.

When a candidate adapter conflicts with `docs/README.md`, `AGENTS.md`, or live
PAW contracts, stop and record drift before mutating files.
