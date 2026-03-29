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
