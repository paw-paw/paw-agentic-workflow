# Output, Template, and Asset Policy

PAW is licensed under MPL 2.0 on a file-level basis unless a file states another license.

## User Outputs

Using PAW does not automatically place a user's independent source code, documentation, decisions, plans, patch artifacts, generated artifacts, or other outputs under MPL 2.0.

MPL 2.0 obligations can apply when an output contains or modifies PAW Covered Software. Independent files merely created with help from PAW are not automatically PAW Covered Software.

## Templates

A template that copies substantial PAW Covered Software must retain the applicable license or declare an explicit output exception. A template that only instructs a tool to create independent content does not impose a blanket PAW license on that content.

Each future distributable template must state:

- its source and owner;
- its license or explicit output exception;
- whether generated copies contain PAW Covered Software;
- any attribution that must remain with distributed copies.

## Assets

Media, examples, fixtures, and other reusable assets must carry an explicit license when the repository default is insufficient or when third-party terms apply.

Do not assume that a source-repository asset is available for PAW merely because it existed near the inherited v1 implementation.

## Manual Distribution

A manual PAW distribution must preserve notices for covered source files and
must make license treatment auditable through its manifest.

The manifest may state a repository default license only when individual files
do not override it. Templates and reusable assets included in a distribution
must explicitly state whether materialized copies contain PAW Covered Software
or are delivered as independent output.

Manual distribution does not change the user-output rule above and does not add
MPL Exhibit B unless a future governed decision explicitly does so.

## Current Bootstrap

This bootstrap contains no packaged templates or media assets intended for redistribution into user products. Later patches must preserve or deliberately refine this policy when such surfaces are introduced.
