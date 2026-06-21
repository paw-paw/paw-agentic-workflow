# Handover: paw-10c-antigravity-first-physical-adapter

---

## Source

- Private input: `_inbox/final/10-handoff-expansion/03_antigravity.md`
- Program brief: `_inbox/final/10-handoff-expansion/00_general.md`
- Parent patch: `paw-10-multiruntime-adapters`

The private handoff is binding input for this patch during `paw-foundation`, but
durable claims must be reconciled into live documents before closure.

---

## Intent

Materialize a Google Antigravity-first physical adapter candidate under
`.agents/**` without introducing Gemini CLI, without creating a plugin, without
activating PAW v2, and without claiming stable support.

Because no local Antigravity runtime validation is available in this session,
the expected result is `physical-files-candidate`.

---

## Boundaries

- `.agents/**` is a candidate Antigravity runtime surface only.
- `.agents/**` does not replace `.codex/**` for Codex.
- Do not create `.gemini/**` or `.antigravity/**`.
- Do not create plugin/bundle distribution in this patch.
- Use `paw-conformance` instead of handoff-local `paw-verify`.
