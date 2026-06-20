# PAW Codex Toolkit

## Status

This directory contains the shared deterministic toolkit for the candidate Codex
runtime adapter. It is a runtime binding helper, not a workflow skill and not a
portable PAW contract.

Contract version: `paw-codex-toolkit/0.1.0`.

## Responsibility Split

Skills own semantic routing, scope checks, human decision gates, drift
classification, and substantive writing decisions.

Toolkit scripts may only perform deterministic mechanics:

- repository root discovery;
- contract and runtime-map loading;
- patch artifact state inspection;
- JSON result formatting;
- diagnostic formatting;
- mutation envelope validation;
- dry-run planning for mechanical writes;
- freshness checks based on provided expected state.
- local integration record inspection;
- experimental provider snapshot normalization from user-provided data.

Toolkit scripts must not draft doctrine, decide scope, infer authority, or generate
substantive artifact copy.

## Entrypoint Contract

Every toolkit entrypoint must be non-interactive and fail loud. When applicable it
must support:

- `--help`;
- `--version`;
- `--json`;
- `--root <path>` or deterministic root discovery;
- `--dry-run` for mutations;
- stdout for normal result data;
- stderr for diagnostics and usage errors;
- stable exit codes.

Exit codes:

- `0`: success, help, or version output;
- `1`: validation or freshness failure;
- `2`: invalid usage or internal execution failure.

JSON output must stay small and stable enough for a skill to choose its next step.

## Mutation Envelope

Mutation levels are:

- `level-1`: reversible, scoped, and authorized by current context. Direct execution
  is allowed when the skill has already validated scope.
- `level-2`: relevant impact. Requires materialized plan, approval token, and
  freshness check.
- `level-3`: destructive, ambiguous, or outside authority. Automatic execution is
  prohibited.

Scripts cannot increase their authority because a skill can reason about context.

## Integration Helpers

`inspect-integration` validates a local integration record and reports provider
state, PAW readiness, and delivery disposition. `github-snapshot` normalizes a
provided provider snapshot into the portable integration shape. These helpers do
not perform network calls, push, update change requests, read remote checks, or
merge.

## Idempotency

Mutating scripts must be idempotent or explicitly report repeated execution. A
dry-run must not change the workspace.
