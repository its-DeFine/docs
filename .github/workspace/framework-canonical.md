# GitHub Actions Governance Framework

> Canonical reference for the Livepeer Docs GitHub Actions library.
> Aligned to the script governance framework (`workspace/plan/active/SCRIPT-GOVERNANCE/script-framework.md`).
> Status: CONFIRMED. All taxonomy decisions locked (D-ACT-01 through D-ACT-03).
> Decisions log: `.github/workspace/reports-audits/decisions-log.mdx`

---

## 1. Overview

The GitHub Actions library lives at `.github/workflows/` with supporting scripts at `.github/scripts/`. It contains 45 workflows and 10 scripts that automate CI/CD, data pipelines, content generation, validation, governance, and issue management for the Livepeer documentation repo.

Actions are governed using the same type/concern model as scripts, extended with pipeline tags and enforcement tiers specific to GitHub Actions.

**Related governance:**
- Script framework: `workspace/plan/active/SCRIPT-GOVERNANCE/script-framework.md`
- Component framework: `workspace/plan/active/COMPONENT-GOVERNANCE/component-framework-canonical.md`
- Actions audit data: `.github/workspace/actions-audit.json`
- Actions library: `.github/workspace/actions-library/`

---

## 2. Taxonomy

### Types (aligned to script framework)

| Type | Purpose | Workflow count |
|---|---|---|
| `automation` | End-to-end pipelines: fetch, transform, commit | 10 |
| `generator` | Produce files from source-of-truth data on push/merge | 7 |
| `validator` | Enforce rules with pass/fail gate on PR | 10 |
| `audit` | Read-only scheduled monitoring and reporting | 3 |
| `remediator` | Auto-fix with optional commit | 3 |
| `dispatch` | Orchestrate multiple scripts/workflows | 1 |
| `interface` | Issue/PR event handling and triage (D-ACT-01) | 5 |
| `placeholder` | Stub, not implemented (deprecation candidates) | 3 |

**Classification test:** Same as script framework. If it only scans and reports, it is an audit. If it edits files in place, it is a remediator. If it spawns child processes, it is a dispatch. If it reacts to issue/PR events for triage, labelling, or assignment, it is an interface.

### Concerns (confirmed D-ACT-05)

The concern names the part of the system the workflow operates on.

| Concern | What it covers | Count |
|---|---|---|
| `integrations` | External data feeds, APIs, structured data pipelines | 11 |
| `copy` | Written text, data standards, spelling, grammar | 2 |
| `maintenance` | Indexes, catalogs, documentation, registries, changelogs | 6 |
| `health` | Site integrity, links, rendering, freshness, assets | 8 |
| `discoverability` | SEO, AEO, AI indexing, translation | 7 |
| `governance` | System rules, compliance, issue/PR management | 8 |

**Reserved:** `brand` (style, formatting, page structure, voice). No workflows currently.

---

## 3. Pipeline Tags (Actions-specific, confirmed D-ACT-02)

Pipeline tags classify WHEN a workflow runs and what authority it has.

| Tag | Trigger | Authority | Use case | Count |
|---|---|---|---|---|
| **P2** | `pull_request` (required status check) | Blocks merge | CI gates: test suite, codex governance | 2 |
| **P3** | `pull_request` (non-required) | Advisory, does not block | PR checks: companion files, docs index, links | 8 |
| **P4** | `push` to deploy branch | Post-merge automation | Generators: companions, sitemap, registry, index, LLM files | 8 |
| **P5** | `schedule` (read-only) | Read-only reporting | Audits: content health, freshness, external links | 4 |
| **P5-auto** | `schedule` + auto-commit | Writes to repo on schedule | Data feeds: discord, forum, ghost, github, youtube, contracts, changelogs | 12 |
| **P6** | `schedule` + auto-fix | Self-healing | Repair: governance sync | 1 |
| **manual** | `workflow_dispatch` only | Human-triggered | SEO refresh, style homogenise, translation | 4 |
| **event-driven** | `repository_dispatch` / `issues` | External event | Discord issue intake, issue labelling, issue indexing | 3 |

**P5 vs P5-auto:** P5 is read-only (scans and reports). P5-auto is read-write (fetches data, commits to repo). P5-auto requires concurrency control, bot identity, commit message conventions, and push error handling. P5 requires none of that.

---

## 4. Required Standards

### 4.1 Workflow file naming (confirmed D-ACT-04)

**Pattern:** `type-concern-function-name.yml`

**Example:** `integrator-maintenance-update-contract-addresses.yml`

**Segments:**
- **type** (7 values): `integrator`, `generator`, `validator`, `audit`, `remediator`, `dispatch`, `interface`
- **concern** (7 values): `integrations`, `copy`, `maintenance`, `health`, `discoverability`, `governance` (+ `brand` reserved)
- **function** (11 verbs, closed enum):

| Verb | Absorbs | Used by types |
|---|---|---|
| `update` | `sync` | integrator |
| `generate` | | generator |
| `check` | `verify`, `test` | validator |
| `scan` | `audit`, `monitor` | audit |
| `repair` | `fix`, `refresh`, `homogenise` | remediator |
| `dispatch` | | dispatch |
| `label` | | interface |
| `index` | | interface |
| `intake` | | interface |
| `close` | | interface |
| `assign` | | interface |

- **name**: descriptive kebab-case slug that communicates purpose at a glance

**Naming quality rule:** The name segment must describe what the workflow does, not how it is implemented. If someone unfamiliar with the repo cannot guess the workflow's purpose from the filename alone, the name is bad. Rename during governance adoption.

| Bad name | Problem | Good name |
|---|---|---|
| `sdk_generation` | Vague, underscore | `generate-sdk-clients` |
| `content-health` | What aspect of content? | `scan-content-quality` |
| `broken-links` | Missing verb context | `check-broken-links` |
| `codex-governance` | Internal jargon | `check-codex-compliance` |
| `test-suite` | Which tests? | `check-content-quality-suite` |
| `project-showcase-sync` | What does it sync? | `update-showcase-submissions` |
| `seo-refresh` | Refresh what? | `repair-seo-metadata` |

### 4.2 Workflow file standards

Every workflow file MUST have:

| Requirement | Example |
|---|---|
| File name follows naming convention | `integrator-maintenance-update-contract-addresses.yml` |
| `name:` field (human-readable) | `name: Update Contract Addresses` |
| Named steps (every step has `name:`) | `- name: Checkout repository` |
| `permissions:` declared explicitly | `permissions: contents: write` |
| `concurrency:` group for auto-commit workflows | `concurrency: group: ${{ github.workflow }}` |
| Branch targeting via `vars.DEPLOY_BRANCH` | Not hardcoded `docs-v2` |
| Node version: `20` (standardised) | `node-version: "20"` |
| `npm ci` (not `npm install`) | Deterministic installs |
| Bot identity: `github-actions[bot]` | Consistent git config |
| Commit message: `chore(scope): description [skip ci]` | Consistent format |

### 4.2 Error handling requirements

| Pipeline tag | Minimum error handling |
|---|---|
| P2, P3 | Step summary with pass/fail |
| P4 | Step summary |
| P5 | Step summary + artifact upload |
| P5-auto | `if: failure()` step + issue creation OR step summary |
| P6 | Step summary + conditional PR creation |
| manual | Step summary + artifact upload |

### 4.3 Operational requirements

| Requirement | Applies to | Standard |
|---|---|---|
| `--dry-run` support | All workflows with `workflow_dispatch` | Input with default `false` |
| Generate/verify pairs | All generators (P4) | Matching P3 validator workflow |
| No inline scripts > 50 lines | All workflows | Extract to `.github/scripts/` |
| Config-driven | All data-fetch workflows | Read from `product-social-config.json` |
| No hardcoded URLs | All scripts | Config or env var |
| Shared utilities | All `.github/scripts/` | Import from `.github/scripts/lib/shared.js` |

---

## 5. Folder Structure

```
.github/
  workflows/                    # Workflow YAML files (flat, kebab-case)
  scripts/                      # Supporting scripts
    lib/                        # Shared utilities (escapeForJSX, config loader)
    fetch-contract-addresses.js # Gold standard
    generate-changelog.js       # Config-driven, multi-mode
    ...
  workspace/                    # Governance working directory (gitignored)
    framework-canonical.md      # This file
    actions-audit.json          # Structured audit data
    actions-library/            # Per-action documentation pages
      action-template.mdx       # Template for new pages
      catalog-index.mdx         # SearchTable catalog
      ...per-action pages...
```

---

## 6. Consolidation Plan (confirmed D-ACT-03)

### Merge candidates

| Target | Source workflows | Rationale | Status |
|---|---|---|---|
| `update-data-feeds.yml` (matrix) | update-discord-data, update-forum-data, update-ghost-blog-data, update-github-data, update-rss-blog-data, update-youtube-data, update-blog-data | Identical structure. 3 have missing permissions bugs. One workflow fixes all 7 at once | Approved, Phase 6 |
| Unified verify workflow | verify-ai-sitemap + verify-llms-files | Same triggers, same pattern | Proposed |

### Stay separate (excluded from merge)

| Workflow | Reason |
|---|---|
| `update-contract-addresses.yml` | Gold standard, complex verification, multi-source dispatch |
| `update-changelogs.yml` | LLM integration, multi-mode generation |
| `update-livepeer-release.yml` | Inline sed, no external script (extraction candidate instead) |
| `project-showcase-sync.yml` | Multi-service integration, 15-min schedule |
| `sync-large-assets.yml` | Git LFS, binary content |
| `sdk_generation.yaml` | Speakeasy-managed, different toolchain |

### Deprecation candidates

| Workflow | Reason |
|---|---|
| `update-blog-data.yml` | Broken (hardcoded API key placeholder), superseded by data-feed merge |
| `build-review-assets.yml` | Placeholder, never implemented |
| `generate-review-table.yml` | Placeholder, never implemented |
| `update-review-template.yml` | Placeholder, never implemented |

### Script extraction candidates

6 workflows with 80-403 line inline scripts should be extracted to `.github/scripts/`.

### Shared module extraction

`escapeForJSX()` + JSX file writer + config loader should be extracted to `.github/scripts/lib/shared.js`.

---

## 7. Self-Documentation Pipeline

The actions library is self-documenting:

```
actions-audit.json (structured data, auto-generated)
    |
    v
catalog-index.mdx (SearchTable rendering audit data)
    |
    v
per-action pages (one MDX per workflow, from template)
    |
    v
framework-canonical.md (this file, governance rules)
```

Adding a new workflow:
1. Create the workflow YAML following the standards in section 4
2. Run the audit script to update `actions-audit.json`
3. Create a page from `action-template.mdx`
4. The catalog index auto-renders from the audit data

---

## 8. Enforcement

| Tier | What | Gate |
|---|---|---|
| **Hard gate** | P2 workflows must pass before merge | Required status check in GitHub |
| **Soft gate** | P3 workflows report but don't block | Non-required PR check |
| **Self-heal** | P6 workflows auto-fix on schedule | Cron + auto-commit or PR |
| **Advisory** | P5 workflows report for human review | Step summary + artifact |

---

## Sources

- Script framework: `workspace/plan/active/SCRIPT-GOVERNANCE/script-framework.md`
- Best practices research: `workspace/thread-outputs/research/actions-best-practices-report.md`
- Repo analysis: `workspace/thread-outputs/research/actions-repo-analysis-report.md`
- Audit data: `.github/workspace/actions-audit.json`
