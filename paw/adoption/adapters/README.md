# Adoption Adapters

## Purpose

Adapters bind portable PAW adoption contracts to a specific repository, stack, or
agent runtime. Adapter types are disjoint: sharing a file or implementation detail is
not approval to share responsibilities.

## Repo Adapter

A repo adapter maps local repository facts:

- authority and documentation index;
- repository paths;
- real commands;
- documentation map;
- public, operational, and private surfaces;
- local VCS policy;
- repository-specific rules;
- root detection strategy.

It must not contain universal PAW rules, define catalog values, or override live
documentation precedence.

The materialized schema lives at
`paw/tools/schemas/adoption/repo-adapter.schema.json`.

## Stack Adapter

A stack adapter records technical reality:

- real stack and versions;
- development, build, test, and validation commands;
- deployment and operability facts;
- available checks;
- differences from an adopted implementation preset;
- brownfield constraints.

It must not choose the software family, choose the agentic runtime, or become an
implicit implementation preset.

The materialized schema lives at
`paw/tools/schemas/adoption/stack-adapter.schema.json`.

## Runtime Adapter

A runtime adapter maps PAW capabilities to an agent runtime:

- runtime paths and packaging;
- triggers;
- assets and references;
- scripts and permissions;
- approvals;
- subagents, hooks, or optional capabilities.

It must not modify architecture, stack, required documentation, methodology, or
catalog identity.

The materialized schema lives at
`paw/tools/schemas/adoption/runtime-adapter.schema.json`.

Runtime adapters that claim concrete candidate support must also declare:

- operation mappings from portable PAW operation IDs to runtime entrypoints;
- capability status for progressive context loading, subagents, hooks, scripts,
  permissions, approvals, and artifacts where relevant;
- source freshness with a checked date and source status;
- gap disposition for missing or blocked runtime capabilities;
- activation state, which must remain explicit opt-in before cutover.

The current candidate runtime adapter evidence lives under
`paw/adoption/adapters/runtime/`:

- `codex.json`: implemented candidate mapping to `.codex/**` skills, agents,
  runtime map, and toolkit.
- `claude-code.json`: candidate mapping to Claude Code project skills,
  supporting files, tool controls, advisory subagents, deferred hooks, and
  forked skill context based on official docs checked on 2026-06-21. Patch
  `paw-10b-claude-code-physical-adapter` materializes repo-local `.claude/**`
  files as `physical-files-candidate` evidence unless runtime discovery is
  manually validated.
- `antigravity.json`: Antigravity-first candidate mapping to repo-local
  `.agents/**` physical files. Patch `paw-10c-antigravity-first-physical-adapter`
  materializes skills, rules, and a thin workflow as `physical-files-candidate`
  evidence; runtime discovery remains unvalidated until local Antigravity
  execution proves it.

These files are evidence for adapter behavior. Runtime evidence may point to
physical adapter files when a governed patch creates them, but it does not create
stable support, `.antigravity/**`, `.gemini/**`, `paw/parches/**`, or a change to
the active SDD v1 workflow.

## Resolution Rule

When adapters disagree, treat the mismatch as evidence of drift or local constraint.
Do not let an adapter silently rewrite a catalog, core contract, or repository
authority source.

The deterministic adapter validator lives under `paw/tools/adoption/**` and is
exposed through `node paw/tools/validate-adoption.mjs --fixtures`. It validates
contract examples and fixtures; it is not a runtime adapter implementation.
