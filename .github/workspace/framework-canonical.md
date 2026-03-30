# GitHub Actions Governance Framework

> Canonical reference for the Livepeer Docs GitHub Actions library.
> Aligned to the script governance framework (`workspace/plan/active/SCRIPT-GOVERNANCE/script-framework.md`).
> Status: DRAFT, co-designing with Alison.

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
| `automation` | End-to-end pipelines: fetch, transform, commit. Data freshness, issue management | 13 |
| `generator` | Produce files from source-of-truth data on push/merge | 7 |
| `validator` | Enforce rules with pass/fail gate on PR | 10 |
| `audit` | Read-only scheduled monitoring and reporting | 3 |
| `remediator` | Auto-fix with optional commit | 3 |
| `dispatch` | Orchestrate multiple scripts/workflows | 1 |
| `placeholder` | Stub, not implemented | 3 |

**Classification test:** Same as script framework. If it only scans and reports, it is an audit. If it edits files in place, it is a remediator. If it spawns child processes, it is a dispatch.

### Concerns (aligned to script framework)

| Concern | What it covers | Workflow count |
|---|---|---|
| `content` | Docs pages, data feeds, SEO, changelogs, translation, quality | 26 |
| `components` | Component registry, health, documentation | 3 |
| `governance` | Repo structure, codex, issue/PR lifecycle, self-healing | 8 |
| `ai` | AI companions, sitemap, LLM files | 6 |

### Niches (Layer 3)

| Concern | Niches |
|---|---|
| content | data-feeds, links, catalogs, quality, seo, changelog, translation, freshness |
| components | registry, health |
| governance | codex, pr-lifecycle, issue-lifecycle, pipelines, compliance, review |
| ai | companions, sitemap, llm |

---

## 3. Pipeline Tags (Actions-specific)

Pipeline tags classify WHEN a workflow runs and what authority it has.

| Tag | Trigger | Authority | Use case |
|---|---|---|---|
| **P2** | `pull_request` (required status check) | Blocks merge | CI gates: test suite, codex governance |
| **P3** | `pull_request` (non-required) | Advisory, does not block | PR checks: companion files, docs index, links |
| **P4** | `push` to deploy branch | Post-merge automation | Generators: companions, sitemap, registry, index, LLM files |
| **P5** | `schedule` (monitoring only) | Read-only reporting | Audits: content health, freshness, external links |
| **P5-auto** | `schedule` + auto-commit | Writes to repo on schedule | Data feeds: discord, forum, ghost, github, youtube, contracts, changelogs |
| **P6** | `schedule` + auto-fix | Self-healing | Repair: governance sync, script repair |
| **manual** | `workflow_dispatch` only | Human-triggered | SEO refresh, style homogenise, translation, SDK generation |
| **event-driven** | `repository_dispatch` | External event | Discord issue intake |

---

## 4. Required Standards

### 4.1 Workflow file standards

Every workflow file MUST have:

| Requirement | Example |
|---|---|
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

## 6. Consolidation Plan

### Merge candidates

| Target | Source workflows | Rationale |
|---|---|---|
| Unified data-fetch dispatcher | 7 daily data-fetch workflows | Identical structure. One workflow with matrix or parameterised job |
| Unified verify workflow | verify-ai-sitemap + verify-llms-files | Same triggers, same pattern |

### Deprecation candidates

| Workflow | Reason |
|---|---|
| `update-blog-data.yml` | Broken (hardcoded API key placeholder), superseded |
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
