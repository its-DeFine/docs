# Docs Guide (Internal Source of Truth)

This folder is the internal maintainer navigation source of truth for repository features and functionality. It is not part of Mintlify navigation in `docs.json`; it exists to keep operational documentation discoverable, non-duplicative, and maintainable.

## Source-of-Truth Model

- Runtime behavior: source of truth is code and tests.
- Feature and operations navigation: source of truth is this `docs-guide/` folder.
- Public docs UX/content: source of truth is Mintlify pages under `v2/pages/`.
- Generated catalogs: source of truth is generator scripts; generated files are read-only.

See [source-of-truth-policy.md](./source-of-truth-policy.md) for full boundaries.

## Start Here

| If you need to understand... | Canonical file |
|---|---|
| Governance and canonical ownership | [source-of-truth-policy.md](./source-of-truth-policy.md) |
| Complete repo capability map | [feature-map.md](./feature-map.md) |
| Data + control flow across systems | [architecture-map.md](./architecture-map.md) |
| CLI behavior and operator runbooks | [lpd.md](./lpd.md) |
| Validation and enforcement gates | [quality-gates.md](./quality-gates.md) |
| GitHub Actions, n8n, and automation pipelines | [automation-pipelines.md](./automation-pipelines.md) |
| Information architecture and content strategy | [content-system.md](./content-system.md) |
| APIs and external data integrations | [data-integrations.md](./data-integrations.md) |
| Script catalog (generated) | [scripts-index.md](./scripts-index.md) |
| Workflow catalog (generated) | [workflows-index.md](./workflows-index.md) |
| Issue/PR template catalog (generated) | [templates-index.md](./templates-index.md) |

## Update Rules

1. Update manual docs when behavior, process, ownership, or architecture changes.
2. Regenerate generated catalogs when scripts/workflows/templates change:
   - `node tools/scripts/generate-docs-guide-indexes.js --write`
   - `node tests/unit/script-docs.test.js --write --rebuild-indexes`
3. Keep `README.md` high-level and link to canonical docs-guide files for deep detail.
4. Do not duplicate long procedural guidance across README, tests docs, and docs-guide. Link to canonical pages instead.

## Related Areas

- Root orientation: [`README.md`](../README.md)
- Public docs guide: [`v2/pages/07_resources/documentation-guide/`](../v2/pages/07_resources/documentation-guide/)
- Contributor procedures: [`contribute/CONTRIBUTING/`](../contribute/CONTRIBUTING/)
- Test matrices and CI behavior: [`tests/`](../tests/)
