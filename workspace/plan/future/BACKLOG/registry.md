# Backlog Registry

> Items captured during work. Each gets an ID, a source, and a status.
> Triage into master-tasks.md or park here.

---

_Empty — cleared 2026-03-29. BL-001 (SHOWCASE_DISCORD_REVIEWER_USER_ID warning) was a false positive, closed._

## BL-003 — Add sync-docs-paths dry-run to pre-commit hook
**Source:** Propagate thread — 2026-03-29
**Description:** Human renames via Finder/VS Code bypass the Claude hook. Adding `sync-docs-paths.js --dry-run --staged` to `.githooks/pre-commit` would catch stale references before commit.
**Priority:** P2

## BL-004 — Update sync-docs-paths CLI console formatting for new reason types
**Source:** Propagate thread — 2026-03-29
**Description:** The CLI wrapper's human-readable output doesn't label `full-url`, `redirect-creation`, or `xml-value` reason types. Formatting update needed.
**Priority:** P3

## BL-005 — Fix stale sitemap-ai.xml entry for contract addresses
**Source:** SEO/AEO thread — 2026-03-30
**Description:** sitemap-ai.xml contains entry for `contract-addresses-canonical` which no longer exists. Page renamed to `livepeer-contract-addresses` by Contracts thread.
**Priority:** P1

## BL-006 — Automate generate-og-images.js and generate-seo.js in CI
**Source:** SEO/AEO thread — 2026-03-30
**Description:** Both scripts exist but are manual-only. OG fallback is generic. SEO generator may conflict with manual keywords. Both need GitHub Action workflows.
**Priority:** P0

## BL-007 — Design companion file automation pipeline
**Source:** SEO/AEO thread — 2026-03-30
**Description:** Components tagged `@aiDiscoverability props-extracted` require companion JSON but no automated pipeline generates them. 12 glossary companions exist. Contracts and other tagged components have no companion. Alison requested pipeline starting with contracts and glossaries.
**Priority:** P0

## BL-008 — Register HistoricalContractTable in component-registry.json
**Source:** Contracts & Changelogs — 2026-03-30
**Description:** New component at snippets/components/displays/tables/HistoricalContractTable.jsx has 7-tag JSDoc but is not registered in docs-guide/config/component-registry.json.
**Priority:** P1

## BL-009 — Mintlify CDN not propagating docs-v2 deployments
**Source:** Solutions Merge session — 2026-03-30
**Description:** Mintlify dashboard shows "Update successful" for PR #847 (10+ hours ago) and manual update (triggered from dashboard). Live site at docs.livepeer.org still serves pre-PR-847 content. Manual redeploy and empty commit push both failed to flush CDN. Needs Mintlify support contact or investigation of deployment pipeline.
**Priority:** P0

## BL-010 — Clean up solutions-merge worktree after PR merges
**Source:** Solutions Merge session — 2026-03-30
**Description:** `.claude/worktrees/solutions-merge` worktree and `origin/merge/solutions-to-docs-v2` branch should be deleted after PR merges to docs-v2.
**Priority:** P2

## BL-011 — Remove dead .gitattributes LFS declarations
**Source:** Asset Pipeline (#849) — 2026-03-30
**Description:** `.gitattributes` declares `*.gif` and `*.mp4` as LFS-tracked but LFS was never properly configured. Dead config that produces clone warnings.
**Priority:** P2

## BL-012 — git filter-repo to purge binaries from history
**Source:** Asset Pipeline (#849) — 2026-03-30
**Description:** Migrated assets are removed from working tree but still in git history (~326 MB). `git filter-repo` + force-push needed to actually reduce clone size. Coordinate with team.
**Priority:** P3

## BL-013 — gray-matter not declared as dependency
**Source:** Asset Pipeline (#849) — 2026-03-30
**Description:** `operations/scripts/validators/content/copy/lint-copy.js` requires `gray-matter` but it's not in any `package.json`. Currently installed at repo root with `--no-save`. Add to appropriate package.json.
**Priority:** P1

## BL-014 — Clean up fix-sync-assets worktree after PR #851 merges
**Source:** Asset Pipeline (#849) — 2026-03-30
**Description:** `../fix-sync-assets/` worktree and `fix/sync-large-assets-yaml` branch should be deleted after PR #851 merges to main.
**Priority:** P2
