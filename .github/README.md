## docs-v2-assets Branch

This branch is dedicated to static asset hosting for large files that Mintlify
skips during docs builds.

How it works:
- Source branch: `docs-v2`
- Sync workflow: `.github/workflows/sync-large-assets.yml` (runs on pushes to `docs-v2`)
- Mirrored paths: `snippets/assets/**` and `v2/assets/**` (large files only)

This branch is intentionally asset-focused and should not be used for docs page
content changes.

When GitHub Pages is enabled for this branch, assets can be referenced via:
- `https://livepeer.github.io/docs/snippets/assets/...`
- `https://livepeer.github.io/docs/v2/assets/...`
