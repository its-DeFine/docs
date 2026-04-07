# Consolidated Governance Architecture

> The COMPLETE blueprint. Every workflow renamed, every consolidation, every self-remediation path.
> NOTHING gets implemented until this is approved.
> Date: 2026-04-07

---

## Target State: Workflow Inventory

52 current workflows → target ~30 after consolidation + renames.

### DELETE (4 workflows → 0)

| Current | Reason |
|---|---|
| build-review-assets.yml | Placeholder, never implemented |
| generate-review-table.yml | Placeholder, never implemented |
| update-review-template.yml | Placeholder, never implemented |
| update-blog-data.yml | Broken (hardcoded YOUR_CONTENT_API_KEY). Superseded by data-refresh-governance |

### DISABLE (1 workflow)

| Current | Reason |
|---|---|
| project-showcase-sync.yml | Not working. Keep workflow_dispatch for future investigation, disable schedule |

### CONSOLIDATE: Social Data Feeds (6 → already using data-refresh-governance.yml)

These already delegate to data-refresh-governance.yml. They are thin wrappers.

| Current wrapper | Mode | Keep as-is or consolidate? |
|---|---|---|
| update-discord-data.yml | discord | Keep (thin wrapper, different schedule) |
| update-forum-data.yml | forum | Keep (thin wrapper) |
| update-ghost-blog-data.yml | ghost-blog | Keep (thin wrapper) |
| update-github-data.yml | github | Keep (thin wrapper) |
| update-rss-blog-data.yml | rss-blog | Keep (thin wrapper) |
| update-youtube-data.yml | youtube | Keep (thin wrapper) |

These are already consolidated via the reusable workflow pattern. The wrappers just set schedule + mode. This is the correct architecture. No further consolidation needed here.

### RENAME: Every Active Workflow

| # | Current name | New name (D-ACT-04) | Type | Concern | Pipeline |
|---|---|---|---|---|---|
| 1 | auto-assign-docs-reviewers.yml | interface-governance-assign-reviewers.yml | interface | governance | P3 |
| 2 | broken-links.yml | validator-health-check-broken-links.yml | validator | health | P3 |
| 3 | check-ai-companions.yml | validator-discoverability-check-companions.yml | validator | discoverability | P3 |
| 4 | check-copy-standards.yml | validator-brand-check-copy-standards.yml | validator | brand | P3 |
| 5 | check-docs-guide-catalogs.yml | validator-maintenance-check-catalogs.yml | validator | maintenance | P3 |
| 6 | check-docs-index.yml | validator-maintenance-check-docs-index.yml | validator | maintenance | P3 |
| 7 | check-page-structure.yml | validator-health-check-page-structure.yml | validator | health | P3 |
| 8 | close-linked-issues-docs-v2.yml | interface-governance-close-linked-issues.yml | interface | governance | P4 |
| 9 | codex-governance.yml | validator-governance-check-codex-compliance.yml | validator | governance | P2 |
| 10 | content-health.yml | audit-health-scan-content-quality.yml | audit | health | P5 |
| 11 | data-refresh-governance.yml | dispatch-copy-update-social-feeds.yml | dispatch | copy | reusable |
| 12 | discord-issue-intake.yml | interface-governance-intake-discord-issues.yml | interface | governance | event |
| 13 | docs-catalog-governance.yml | dispatch-maintenance-check-catalogs.yml | dispatch | maintenance | reusable |
| 14 | docs-v2-issue-indexer.yml | interface-governance-index-issues.yml | interface | governance | P5+event |
| 15 | freshness-monitor.yml | audit-health-scan-data-freshness.yml | audit | health | P5 |
| 16 | generate-ai-companions.yml | generator-discoverability-generate-companions.yml | generator | discoverability | P4 |
| 17 | generate-ai-sitemap.yml | generator-discoverability-generate-ai-sitemap.yml | generator | discoverability | P4 |
| 18 | generate-component-registry.yml | generator-maintenance-generate-component-registry.yml | generator | maintenance | P4 |
| 19 | generate-docs-guide-catalogs.yml | generator-maintenance-generate-catalogs.yml | generator | maintenance | P4 |
| 20 | generate-docs-index.yml | generator-maintenance-generate-docs-index.yml | generator | maintenance | P4 |
| 21 | generate-llms-files.yml | generator-discoverability-generate-llms-files.yml | generator | discoverability | P4 |
| 22 | governance-sync.yml | dispatch-governance-post-merge-sync.yml | dispatch | governance | P4 |
| 23 | issue-auto-label.yml | interface-governance-label-issues.yml | interface | governance | event |
| 24 | openapi-reference-validation.yml | validator-health-check-openapi-reference.yml | validator | health | P3+P5 |
| 25 | page-integrity-health.yml | audit-health-scan-page-integrity.yml | audit | health | P5 |
| 26 | repair-governance.yml | remediator-governance-repair-pipelines.yml | remediator | governance | P6 |
| 27 | sdk_generation.yaml | generator-maintenance-generate-sdk-clients.yml | generator | maintenance | P5-auto |
| 28 | seo-refresh.yml | remediator-discoverability-repair-seo-metadata.yml | remediator | discoverability | manual |
| 29 | style-homogenise.yml | remediator-brand-repair-en-gb-style.yml | remediator | brand | manual |
| 30 | sync-large-assets.yml | integrator-maintenance-update-large-assets.yml | integrator | maintenance | P5-auto |
| 31 | tasks-retention.yml | audit-governance-scan-workspace-retention.yml | audit | governance | P5 |
| 32 | test-suite.yml | validator-copy-check-content-quality-suite.yml | validator | copy | P2 |
| 33 | test-v2-pages.yml | validator-health-check-page-rendering.yml | validator | health | P3 |
| 34 | translate-docs.yml | integrator-copy-update-translations.yml | integrator | copy | manual |
| 35 | update-changelogs.yml | integrator-copy-update-changelogs.yml | integrator | copy | P5-auto |
| 36 | update-contract-addresses.yml | integrator-maintenance-update-contract-addresses.yml | integrator | maintenance | P5-auto |
| 37 | update-contract-addresses-shadow.yml | integrator-maintenance-update-contract-addresses-shadow.yml | integrator | maintenance | P5-auto |
| 38 | update-discord-data.yml | integrator-copy-update-discord-data.yml | integrator | copy | P5-auto |
| 39 | update-forum-data.yml | integrator-copy-update-forum-data.yml | integrator | copy | P5-auto |
| 40 | update-ghost-blog-data.yml | integrator-copy-update-ghost-blog-data.yml | integrator | copy | P5-auto |
| 41 | update-github-data.yml | integrator-copy-update-github-data.yml | integrator | copy | P5-auto |
| 42 | update-livepeer-release.yml | integrator-maintenance-update-release-version.yml | integrator | maintenance | P5-auto |
| 43 | update-rss-blog-data.yml | integrator-copy-update-rss-blog-data.yml | integrator | copy | P5-auto |
| 44 | update-youtube-data.yml | integrator-copy-update-youtube-data.yml | integrator | copy | P5-auto |
| 45 | v2-external-link-audit.yml | audit-health-scan-external-links.yml | audit | health | P5 |
| 46 | verify-ai-sitemap.yml | validator-discoverability-check-ai-sitemap.yml | validator | discoverability | P3 |
| 47 | verify-llms-files.yml | validator-discoverability-check-llms-files.yml | validator | discoverability | P3 |

**47 active workflows after deleting 4 + disabling 1.**

### Inline Script Extractions (5 workflows)

| Workflow | Lines inline | Extract to | JSDoc type |
|---|---|---|---|
| auto-assign-docs-reviewers | 80 | operations/scripts/interfaces/governance/assign-reviewers.js | interface |
| close-linked-issues-docs-v2 | 140 | operations/scripts/interfaces/governance/close-linked-issues.js | interface |
| discord-issue-intake | 260 | operations/scripts/interfaces/governance/discord-issue-intake.js | interface |
| docs-v2-issue-indexer | 400 | operations/scripts/interfaces/governance/issue-indexer.js | interface |
| issue-auto-label | 340 | operations/scripts/interfaces/governance/issue-auto-label.js | interface |

### .github/scripts/ Migration (D-ACT-06)

| Current (.github/scripts/) | Target (operations/scripts/) |
|---|---|
| fetch-contract-addresses.js | Already has pipeline modules in operations/scripts/automations/content/data/contracts/ |
| fetch-discord-announcements.js | operations/scripts/integrators/copy/social-feeds/ |
| fetch-forum-data.js | operations/scripts/integrators/copy/social-feeds/ |
| fetch-ghost-blog-data.js | operations/scripts/integrators/copy/social-feeds/ |
| fetch-github-discussions.js | operations/scripts/integrators/copy/social-feeds/ |
| fetch-github-releases.js | operations/scripts/integrators/copy/social-feeds/ |
| fetch-rss-blog-data.js | operations/scripts/integrators/copy/social-feeds/ |
| fetch-youtube-data.js | operations/scripts/integrators/copy/social-feeds/ |
| generate-changelog.js | operations/scripts/integrators/copy/changelogs/ |
| project-showcase-sync.js | operations/scripts/integrators/copy/showcase/ |

---

## Self-Remediation Architecture

### Every enforcement layer must respond to findings:

| Layer | On detection | Response |
|---|---|---|
| Pre-commit | Violation detected | BLOCK with clear error + override via git trailer |
| PR (P2) | Check fails | BLOCK merge. Step summary explains what and how to fix |
| PR (P3) | Check fails | WARN (advisory). Step summary explains what and how to fix. Does NOT block |
| Post-merge (P4) | Generator runs | Auto-commit. If fails: governance-sync catches next merge |
| Scheduled (P5) | Scanner finds issues | Route A: auto-fix + commit/PR. Route B: create/update rolling issue. Route C: re-dispatch stale feed |
| Self-heal (P6) | Weekly audit | Full repair cycle: audit, fix, verify, create PR |
| Event | Issue/PR event | Auto-label, assign, index, close, intake. Config-driven |

### Generate/Verify Pairs (complete)

| Generator | Verifier | Status |
|---|---|---|
| generate-ai-companions | check-ai-companions | Paired |
| generate-ai-sitemap | verify-ai-sitemap | Paired |
| generate-llms-files | verify-llms-files | Paired |
| generate-docs-index | check-docs-index | Paired |
| generate-docs-guide-catalogs | check-docs-guide-catalogs | Paired |
| generate-component-registry | check-component-registry (via docs-catalog-governance) | Paired (indirect) |

### Scan-to-Act Routing

| Scanner | Finding type | Route |
|---|---|---|
| content-health | Component issues | Step 5 (repair-component-metadata.js) runs in same pipeline |
| content-health | Quality/layout | Report in step summary (no auto-fix for quality judgments) |
| freshness-monitor | Stale data feed | Create/update rolling issue (health:data-freshness label) |
| freshness-monitor | All feeds fresh | Auto-close rolling issue |
| v2-external-link-audit | Broken external link | Create/update rolling issue (health:external-links label) |
| v2-external-link-audit | All links clean | Auto-close rolling issue |
| page-integrity-health | Broken links/imports | Auto-repair + rolling issue for unresolved |
| openapi-reference-validation | Spec drift | Auto-fix PR + rolling issue |

---

## Standards Compliance Checklist (per workflow)

Every workflow in the target state must pass:

- [ ] File name follows `type-concern-verb-name.yml` (D-ACT-04)
- [ ] `name:` field is descriptive
- [ ] `permissions:` declared explicitly
- [ ] `concurrency:` group set (auto-commit workflows)
- [ ] Branch targeting uses `vars.DEPLOY_BRANCH` (no hardcoded branches)
- [ ] Node version: `20`
- [ ] `npm ci` (not `npm install`)
- [ ] Bot identity: `github-actions[bot]`
- [ ] Commit message: `chore(scope): description [skip ci]`
- [ ] Error handling per pipeline tag
- [ ] `--dry-run` support (workflow_dispatch)
- [ ] No inline scripts > 50 lines
- [ ] Scripts called via NODE_PATH=tools/node_modules where needed

---

## Ownerless Contract Compliance (per surface)

Every governed surface in the unified registry must have:

- [ ] Canonical source registered
- [ ] Validator exists and runs
- [ ] Repair path exists
- [ ] Gate layer assigned
- [ ] Escalation mode defined
- [ ] Success signals defined
- [ ] Write policy declared
- [ ] Agent write policy declared

---

## Implementation Order

1. Delete 4 placeholder workflows + disable showcase
2. Rename all 47 workflows in one batch
3. Fix all standards violations across all workflows (permissions, concurrency, node version, npm ci, error handling, hardcoded branches)
4. Add scan-to-act to all headless scanners
5. Extract 5 inline scripts
6. Migrate .github/scripts/ to operations/scripts/
7. Run every script with --dry-run/--check/--help to verify
8. Full end-to-end test per enforcement layer
9. Update all canonical docs
10. Merge to docs-v2

