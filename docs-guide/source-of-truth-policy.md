# Source of Truth Policy

This document defines canonical ownership boundaries to prevent drift across README, docs-guide, tests docs, and Mintlify pages.

## Canonical Boundaries

| Concern | Canonical source | Notes |
|---|---|---|
| Script/runtime behavior | Code + tests | Behavioral truth always lives in executable code and validation tests. |
| Script metadata and inventory | Script headers + generated indexes | Script headers feed script index generation. |
| Repo feature navigation map | `docs-guide/*.md` (manual canonical files) | Internal maintainer source of truth. |
| Public user-facing docs content | `v2/pages/**` | Mintlify docs in `docs.json` navigation. |
| CI/test execution behavior | Workflow files + test runner scripts | Narrative summaries must link to these files. |
| Issue/PR intake behavior | `.github/ISSUE_TEMPLATE/*` + PR templates + workflows | Generated templates index summarizes usage. |

## Required docs-guide Canonical Files

The following files must exist and be non-empty:

- `docs-guide/README.md`
- `docs-guide/feature-map.md`
- `docs-guide/architecture-map.md`
- `docs-guide/lpd.md`
- `docs-guide/quality-gates.md`
- `docs-guide/automation-pipelines.md`
- `docs-guide/content-system.md`
- `docs-guide/data-integrations.md`

## Generated Index Files

The following files are generated and should not be edited directly:

- `docs-guide/scripts-index.md`
- `docs-guide/workflows-index.md`
- `docs-guide/templates-index.md`

Regenerate with:

```bash
node tools/scripts/generate-docs-guide-indexes.js --write
node tests/unit/script-docs.test.js --write --rebuild-indexes
```

## Generated File Banners

Generated and mixed generated files should include a standardized banner at the top that documents:

- generator script(s)
- purpose
- when to rerun the generator
- a do-not-edit warning

Guidelines:

- Use a full-file banner for files that are entirely generated.
- Use a mixed-file banner for files that contain generated sections only.
- Use `unknown/external` when the generator cannot be confirmed in-repo.
- Do not edit generated JSON files directly; JSON artifacts should be inventoried/reported instead of commented.

If your branch includes the generated banner enforcer utility, use:

```bash
node tools/scripts/enforce-generated-file-banners.js --write
node tools/scripts/enforce-generated-file-banners.js --check
```

## README Contract

`README.md` is an orientation document, not a full operations manual.

It must include:

- what the repo is
- how to run quickly (`lpd setup`, `lpd dev`, basic test)
- high-level feature map
- links to docs-guide canonical files

It should not duplicate deep procedures that already exist in:

- `docs-guide/`
- `tests/*.md`
- `contribute/CONTRIBUTING/*.md`
- `v2/resources/documentation-guide/*.mdx`

## Change Management Rules

1. Any meaningful process change must update the relevant docs-guide canonical file in the same PR.
2. Any script/workflow/template change must regenerate indexes in the same PR.
3. If README and docs-guide disagree, docs-guide canonical files are considered authoritative for operational navigation.
