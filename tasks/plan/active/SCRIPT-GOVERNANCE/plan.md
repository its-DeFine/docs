# Script Restructure & Governance Plan

> **Status**: Active
> **Created**: 2026-03-19
> **Source of truth**: This file. Completed tasks get ~~strikethrough~~.
> **Worktree**: `script-restructure` branch, created from `docs-v2-dev`
> **Merge policy**: Merge back to `docs-v2-dev` after each completed task when safe. Sync any new `docs-v2-dev` changes into worktree before starting next task.

---

## Workflow

Every task follows this cycle:

1. **Sync** — pull latest `docs-v2-dev` into the worktree branch
2. **Do the work** in the worktree
3. **CHECKPOINT** — present results to human for review
4. **Human approves** — merge worktree branch back to `docs-v2-dev`
5. **Strikethrough** the task in this plan file (in the `Docs-v2-dev` working directory)

No task proceeds without human approval at the checkpoint.

---

## Problem statement

The pre-commit hook is 1,599 lines. It runs structural checks, unit tests, codex
validation, component governance, copy linting, pattern enforcement, style checks,
generated artifact freshness, MDX-safe validation, and docs-index generation —
all before every commit. It blocks daily workflows.

~70 scripts live flat in `tools/scripts/` root, plus ~50 in subdirectories. The
subdirectories that exist (`validators/`, `enforcers/`, `remediators/`) are a
start but inconsistent — validators live in both root and `validators/`.

Multiple scripts overlap: 3 grammar/spelling scripts, 3 page audit scripts, 3
script-auditing scripts, 5 SEO/OG scripts (3 deprecated but still present).

Scripts are fragmented, not orchestrated. No clear execution model for what runs
where, when, or why.

**Total scripts across repo: 179** (158 in tools/scripts/, 4 in .githooks/,
4 in .github/scripts/, 1 in tasks/scripts/, 8 in snippets/automations/, 4 config/data files)

---

## Parallel work — not in scope but noted

- **Component restructure** is happening separately. Should not affect this plan.
- **`/tools` folder restructure** happens AFTER all script work is complete.
- **`/api` folder** — only moves if it doesn't break Mintlify. May belong in `/tools` not scripts. Deferred.
- **`/ai-tools`** — skills aren't scripts. Stays out of scope. May belong in `/tools`.

---

## Future work — flagged for later plans

- **`.github/scripts/` and `.github/workflows/`** — organise GitHub Actions scripts using the same `<type>/<concern>/<niche>` model. Cannot move them (Actions requires `.github/` paths) but can restructure within `.github/scripts/`.
- **`ai-tools/` scripts** — organise any operational scripts inside `ai-tools/` using the same model.
- **Full unused-script sweep** — after restructure is done, run a comprehensive usage audit to find scripts that are never called from any hook, workflow, package.json, or other script.

---

## Folder taxonomy

Three-tier model: `<type> / <concern> / <concern-niche>`

Concern-niche is **only used where needed** (e.g., `content/` is broad enough to
warrant sub-grouping). Most folders stop at two tiers.

### Layer 1 — type (what the script *does*)

| Folder | Purpose | Status |
|---|---|---|
| `audits/` | Read-only scan, measure, report | **APPROVED** |
| `generators/` | Produce files from source-of-truth data | **APPROVED** |
| `validators/` | Enforce rules, pass/fail gate | **APPROVED** |
| `remediators/` | Bulk fix/repair | **APPROVED** |
| `dispatch/` | Dispatch work to agents — codex/AI task lifecycle, cross-agent packaging, pipeline chaining | **APPROVED** |
| `automations/` | Automated pipelines — translation, external data fetch, feed conversion | **APPROVED** |
| `lib/` | Shared utilities | **APPROVED** |
| `config/` | Shared configuration, policy files | **APPROVED** |
| `archive/` | Deprecated scripts | **APPROVED** |

### Layer 2 — concern (what the script is *about*)

Three concerns, used across types where volume warrants it:

| Concern | What it covers |
|---|---|
| `content/` | Docs pages, copy, SEO, fact-checking, quality, catalogs, reconciliation |
| `components/` | Component library, registry, CSS, naming, imports |
| `governance/` | Scripts about scripts, repo structure, agent docs, manifests |

### Layer 3 — concern-niche (only where needed)

Used inside `content/` where the volume of scripts warrants sub-grouping.

### Full target structure

```
tools/scripts/
  audits/
    content/
      fact-checking/           # claim validation, evidence checking
    components/
    governance/
  generators/
    content/
      seo/                     # ai-sitemap, og-images, seo metadata
      catalogs/                # docs-guide indexes, skills indexes
      reconciliation/          # content-gap reconciliation
    components/
    governance/
  validators/
    content/
      grammar/                 # grammar-en-gb, proper-nouns
    components/
    governance/
  remediators/
    content/
      style/                   # ownerless-language, homogenizer, wcag
      classification/          # framework-headers, pagetype, purpose-metadata
    components/
  dispatch/                    # flat — no Layer 2 needed yet
  automations/
    translation/               # all i18n scripts flattened into one folder
    external/                  # fetch scripts for external data sources
    convert-rss-to-mdx.js     # flat (single script, no subfolder)
    sync-legacy-root-v1.js    # flat (single script, no subfolder)
  lib/
  config/
  archive/
```

---

## Complete script assignments

### `audits/content/`

- docs-quality-and-freshness-audit.js
- audit-v2-usefulness.js
- audit-media-assets.js

### `audits/content/fact-checking/`

- docs-fact-registry.js
- docs-page-research.js
- docs-page-research-pr-report.js
- docs-research-adjudication.js
- docs-research-packet.js
- orchestrator-guides-research-review.js
- pattern-observer.js

### `audits/components/`

- audit-component-usage.js

### `audits/governance/`

- audit-scripts.js
- audit-tasks-folders.js
- script-footprint-and-usage-audit.js
- repo-audit-orchestrator.js
- audit-python.py (from `tasks/scripts/`)

### `generators/content/`

- generate-docs-index.js
- generate-pages-index.js
- generate-llms-files.js
- generate-api-docs.sh (from `snippets/`)
- generate-glossary.js (from `snippets/generate-data/scripts/`)
- terminology-search.js (from `snippets/generate-data/scripts/`)

### `generators/content/seo/`

- generate-ai-sitemap.js
- generate-og-images.js (from `snippets/`)
- generate-seo.js (from `snippets/`)

### `generators/content/catalogs/`

- generate-docs-guide-indexes.js
- generate-docs-guide-components-index.js
- generate-docs-guide-pages-index.js
- generate-ai-skills-indexes.js

### `generators/content/reconciliation/`

- generate-content-gap-reconciliation.js

### `generators/components/`

- generate-component-registry.js
- generate-component-docs.js
- generate-component-snippets.py
- generate-ui-templates.js
- scan-component-imports.js

### `generators/governance/`

- generate-v2-folder-governance-cleanup-matrix.js
- generate-component-governance-remediation-reports.js
- new-script.js (scaffold)

### `validators/content/`

- lint-copy.js
- lint-patterns.js
- lint-structure.js
- check-anchor-usage.js (from `validators/content/`)
- check-description-quality.js (from `validators/content/`)
- check-docs-path-sync.js (from `validators/content/`)
- check-double-headers.js (from `validators/content/`)
- check-mdx-safe-markdown.js (from `validators/content/`)
- check-page-endings.js (from `validators/content/`)
- enforce-generated-file-banners.js
- test-v2-pages.js (browser-based page validator)
- verify-all-pages.js (headless browser route validator)

### `validators/content/grammar/`

- check-grammar-en-gb.js (from `validators/content/`)
- check-proper-nouns.js (from `validators/content/`)

### `validators/components/`

- component-layout-governance.js
- check-component-css.js (from `validators/components/`)
- check-component-docs.js (from `validators/components/`)
- check-mdx-component-scope.js (from `validators/components/`)
- check-naming-conventions.js (from `validators/components/`)

### `validators/governance/`

- validate-ai-tools-registry.js
- validate-codex-task-contract.js
- audit-script-inventory.js (from `validators/governance/`)
- check-agent-docs-freshness.js (from `validators/governance/`)
- review-governance-repair-checklist.js (from `validators/governance/`)
- check-component-immutability.js (from `enforcers/pr/`)
- check-pr-template.js (from `enforcers/pr/`)
- verify-pay-orc-gate-finalize.sh

### `remediators/content/`

- repair-mdx-safe-markdown.js (from `remediators/content/`)
- repair-spelling.js (from `remediators/content/`)
- sync-docs-paths.js (from `remediators/content/`)
- migrate-assets-to-branch.js (from `remediators/assets/`)
- cleanup-quarantine-manager.js

### `remediators/content/style/`

- repair-ownerless-language.js
- style-and-language-homogenizer-en-gb.js
- wcag-repair-common.js

### `remediators/content/classification/`

- add-framework-headers.js
- add-pagetype-mechanical.js
- assign-purpose-metadata.js

### `remediators/components/`

- repair-component-metadata.js (from `remediators/components/`)

### `dispatch/` (flat)

- codex-commit.js
- create-codex-pr.js
- check-codex-pr-overlap.js
- check-no-ai-stash.sh
- cross-agent-packager.js
- export-portable-skills.js
- sync-codex-skills.js
- publish-v2-internal-reports.js
- lock-release.js (from `codex/`)
- task-cleanup.js (from `codex/`)
- task-finalize.js (from `codex/`)
- task-preflight.js (from `codex/`)
- validate-locks.js (from `codex/`)
- repair-governance.js (from `orchestrators/` — chains audit→repair→verify)

### `automations/translation/` (flattened — all i18n scripts in one folder)

- translate-docs.js (from `i18n/`)
- generate-localized-docs-json.js (from `i18n/`)
- validate-generated.js (from `i18n/`)
- test-mintlify-version-language-toggle.js (from `i18n/`)
- common.js (from `i18n/lib/`)
- config.js (from `i18n/lib/`)
- docs-json-localizer.js (from `i18n/lib/`)
- docs-routes.js (from `i18n/lib/`)
- frontmatter.js (from `i18n/lib/`)
- mdx-parser.js (from `i18n/lib/`)
- mdx-translate.js (from `i18n/lib/`)
- path-utils.js (from `i18n/lib/`)
- provenance.js (from `i18n/lib/`)
- provider-mock.js (from `i18n/lib/`)
- provider-openrouter.js (from `i18n/lib/`)
- providers.js (from `i18n/lib/`)
- cli-guardrails.test.js (from `i18n/test/`)
- docs-json-localizer.test.js (from `i18n/test/`)
- frontmatter.test.js (from `i18n/test/`)
- mdx-translate.test.js (from `i18n/test/`)
- provenance.test.js (from `i18n/test/`)
- provider-openrouter.test.js (from `i18n/test/`)

### `automations/external/`

- fetch-external-docs.sh (from `snippets/`)
- fetch-lpt-exchanges.sh (from `snippets/`)
- fetch-openapi-specs.sh (from `snippets/`)

### `automations/` (flat — single scripts, no subfolder needed)

- convert-rss-to-mdx.js
- sync-legacy-root-v1.js (from `redirects/`)

### `lib/`

- docs-path-sync.js (existing)

### `config/`

- og-image-policy.js (from `snippets/lib/`)
- paths.config.json (from `snippets/`)

### Moving to `/tools/dev/` (out of scripts scope)

- debug-mint-dev.js
- mint-dev.sh
- format-mdx.js
- install-authoring-tools-extension.js
- add-callouts.js (from `dev/`)
- generate-mint-dev-scope.js (from `dev/`)
- mint-custom-loader.sh (from `dev/`)
- ensure-mint-watcher-patch.sh (from `dev/`)
- rename-vscode-codex-chat.js (from `dev/`)
- test-add-callouts.js (from `dev/`)
- test-seo-generator.js (from `dev/`)
- dev/lib/resolve-scoped-docs-config.js (from `dev/lib/`)

### Scripts OUTSIDE `tools/scripts/` — stays in place

| Location | Files | Decision |
|---|---|---|
| `.githooks/` (4 scripts) | install.sh, server-manager.js, verify-browser.js, verify.sh | Stay — hook infrastructure. Flag for future `.github/` organisation. |
| `.github/scripts/` (4 scripts) | fetch-forum-data.js, fetch-ghost-blog-data.js, fetch-youtube-data.js, project-showcase-sync.js | Stay — GitHub Actions requires `.github/` paths. Flag for future organisation. |
| `snippets/automations/` (8 .jsx files) | ghostBlogData, discordAnnouncementsData, forumData, globals, lumaEventsData, showcaseData, filterVideos, youtubeData | Stay — data export components, not scripts |
| `snippets/luma-calendar.jsx` | Incomplete data component | Stay — not a script |
| `snippets/test-scripts.sh` | Snippet test runner | Moves with tests in Task 9 |

### Confirmed dead scripts (delete in Task 2)

| Script | Reason |
|---|---|
| `dev/seo-generator-safe.js` | Deprecated — header says use canonical workflow |
| `dev/update-og-image.js` | Deprecated — header says use canonical workflow |
| `dev/update-all-og-images.js` | Deprecated — header says use canonical workflow |
| `dev/batch-update-og-image.sh` | Deprecated — header says use canonical workflow |
| `dev/replace-og-image.py` | Deprecated — header says use canonical workflow |
| `codex-safe-merge-with-stash.js` | Compatibility shim — directs to task-finalize |
| `verify/.verify-large-change.sh` | No-op placeholder |

### Archive (audit in Task 7)

| Location | Files |
|---|---|
| `archive/deprecated/` | project-management-output-script.js, update-component-library.sh |
| `archive/legacy/` | 14 scripts (audit-all-pages-simple through verify-pages) |
| `archive/fixtures/` | test-hook-hardcoded-color.jsx, test-hook-violation.jsx (test fixtures, not scripts) |

---

## Task 1 — Agree on folder taxonomy (interactive)

**Goal**: Lock down all folder names and script assignments before moving anything.
No code changes. Just naming decisions.

### Tasks

- [ ] **1.1** Review and approve Layer 1 type folders
- [ ] **1.2** Review and approve Layer 2 concern folders
- [ ] **1.3** Review and approve Layer 3 concern-niche folders
- [ ] **1.4** Lock the taxonomy — mark all items as APPROVED in this plan

---

## Task 2 — Set up worktree and delete dead code

**Goal**: Create the working worktree. Quick win: remove confirmed dead scripts.

### Tasks

- [ ] **2.1** Create worktree: `git worktree add ../script-restructure-wt -b script-restructure docs-v2-dev`
- [ ] **2.2** Delete the 7 confirmed dead scripts
- [ ] **2.3** Grep for remaining references to deleted scripts and fix them
- [ ] **2.4** **CHECKPOINT** — show diff to human for approval
- [ ] **2.5** Commit + merge back to `docs-v2-dev`
- [ ] **2.6** Strikethrough completed tasks in this plan

---

## Task 3 — Gut the pre-commit hook

**Goal**: Reduce pre-commit to < 5 seconds. Move everything else to CI or cron.

### Hard gates (KEEP in pre-commit)

| Check | Why it must block |
|---|---|
| MDX syntax validation | Broken pages can't be previewed |
| docs.json schema check | Broken nav = broken site |
| File deletion guard | Prevents accidental data loss |
| .allowlist / v1 freeze | Security boundary |
| Codex branch isolation | AI safety gate |

### Tasks

- [ ] **3.1** Sync worktree with latest `docs-v2-dev`
- [ ] **3.2** Extract the 5 hard gates into a new minimal pre-commit hook
- [ ] **3.3** Move copy linting (`lint-copy`, `lint-patterns`) to PR CI (`test-suite.yml`)
- [ ] **3.4** Move structure linting (`lint-structure`) to PR CI
- [ ] **3.5** Move component governance checks to PR CI
- [ ] **3.6** Move style checks (ThemeData, hardcoded colors, imports) to PR CI
- [ ] **3.7** Move anchor validation to PR CI
- [ ] **3.8** Move description quality / SEO checks to PR CI
- [ ] **3.9** Move generated artifact freshness checks to PR CI (CI can regen + commit)
- [ ] **3.10** Move component registry freshness to PR CI (CI can regen + commit)
- [ ] **3.11** **CHECKPOINT** — show new pre-commit + CI changes to human
- [ ] **3.12** Verify the slimmed pre-commit runs in < 5 seconds on a typical commit
- [ ] **3.13** Archive the old pre-commit to `.githooks/archive/pre-commit-v1`
- [ ] **3.14** Update `.githooks/README.md` and `BYPASS.md` to reflect new scope
- [ ] **3.15** Commit + merge back to `docs-v2-dev`
- [ ] **3.16** Strikethrough completed tasks in this plan

---

## Task 4 — Restructure scripts into approved folders

**Goal**: Move every script into its approved `<type>/<concern>/<concern-niche>` home.

### Tasks

- [ ] **4.1** Sync worktree with latest `docs-v2-dev`
- [ ] **4.2** Create all approved folders (types, concerns, niches)
- [ ] **4.3** Move audit scripts (including `content/fact-checking/` niche)
- [ ] **4.4** Move generator scripts (including `content/seo/`, `content/catalogs/`, `content/reconciliation/`)
- [ ] **4.5** Promote existing validators — move root-level validators in
- [ ] **4.6** Promote existing remediators — move root-level remediators in (including `content/style/`, `content/classification/`)
- [ ] **4.7** Create `dispatch/` — absorb `codex/`, `orchestrators/`, root dispatch scripts
- [ ] **4.8** Create `automations/` — absorb `snippets/` fetch scripts, `i18n/` → `translation/`, `redirects/`, `convert-rss-to-mdx`
- [ ] **4.9** Move `enforcers/` content into `validators/governance/`
- [ ] **4.10** Move `dev/` contents to `/tools/dev/`
- [ ] **4.11** Create `config/` — move `snippets/lib/og-image-policy.js`, `snippets/paths.config.json`
- [ ] **4.12** Move `tasks/scripts/audit-python.py` to `audits/governance/`
- [ ] **4.13** **CHECKPOINT** — show full tree to human for approval
- [ ] **4.14** Update `tools/package.json` script paths
- [ ] **4.15** Update `tests/package.json` script paths
- [ ] **4.16** Update all `.github/workflows/` referencing moved scripts
- [ ] **4.17** Update `.githooks/pre-commit` to reference new paths
- [ ] **4.18** Update `repo-audit-orchestrator.js` internal paths
- [ ] **4.19** Update cross-script `require`/`import` paths
- [ ] **4.20** **CHECKPOINT** — run tests, show results to human
- [ ] **4.21** Commit + merge back to `docs-v2-dev`
- [ ] **4.22** Strikethrough completed tasks in this plan

---

## Task 5 — Consolidate overlapping scripts

**Goal**: Eliminate fragmentation. One script per job.

| Merge these | Into | Reason |
|---|---|---|
| `check-grammar-en-gb` + `repair-spelling` + `style-and-language-homogenizer` | `remediators/content/style/language-and-grammar.js` (check + fix modes) | 3 scripts doing overlapping language work |
| `audit-scripts` + `audit-script-inventory` + `script-footprint-and-usage-audit` | `audits/governance/script-inventory.js` | 3 script-auditing scripts |
| `generate-docs-guide-components-index` + `generate-docs-guide-indexes` + `generate-docs-guide-pages-index` | `generators/content/catalogs/docs-guide-indexes.js` | 3 closely related index generators |

### Tasks

- [ ] **5.1** Sync worktree with latest `docs-v2-dev`
- [ ] **5.2** Consolidate grammar/spelling/style scripts into single dual-mode script
- [ ] **5.3** **CHECKPOINT** — show merged script to human
- [ ] **5.4** Consolidate script auditing scripts into single inventory script
- [ ] **5.5** **CHECKPOINT** — show merged script to human
- [ ] **5.6** Consolidate docs-guide index generators into single script
- [ ] **5.7** **CHECKPOINT** — show merged script to human
- [ ] **5.8** Update all callers (package.json, workflows, orchestrator)
- [ ] **5.9** Move originals to `archive/` with note pointing to replacement
- [ ] **5.10** Commit + merge back to `docs-v2-dev`
- [ ] **5.11** Strikethrough completed tasks in this plan

---

## Task 6 — Define governance tiers

**Goal**: Every script has a tier. No ambiguity about what blocks, what warns, what self-heals.

### Three tiers

| Tier | Gate type | Scope | Runs where |
|---|---|---|---|
| **Hard gate** | Blocks commit or merge | Syntax, security, AI isolation | Pre-commit + required CI status check |
| **Soft gate** | Warns in PR, does not block merge | Style, quality, freshness | CI check (non-required) |
| **Self-heal** | No gate — auto-fixes on schedule | Generated artifacts, formatting, metadata | Cron workflow with auto-PR |

### Move to cron (self-healing)

| Check | Schedule | Self-heal action |
|---|---|---|
| Governance repair | Weekly (already: `repair-governance.yml`) | Auto-fix + PR |
| Content freshness audit | Weekly (already: `freshness-monitor.yml`) | Issue creation |
| Script metadata enforcement | Weekly | Auto-fix + PR |
| Grammar/spelling sweep | Weekly | Auto-fix + PR |
| Media asset audit | Monthly | Report |
| Component docs regen | On component change (already CI trigger) | Auto-commit |

### Tasks

- [ ] **6.1** Sync worktree with latest `docs-v2-dev`
- [ ] **6.2** Add `tier` field to every script's header metadata (`tier: hard-gate | soft-gate | self-heal`)
- [ ] **6.3** Create governance manifest: `tools/config/script-governance.json`
- [ ] **6.4** **CHECKPOINT** — show manifest to human for tier review
- [ ] **6.5** Update `repo-audit-orchestrator.js` to respect tiers
- [ ] **6.6** Verify all expected cron workflows exist
- [ ] **6.7** Create any missing cron workflows for self-heal scripts
- [ ] **6.8** Document the three tiers in `docs-guide/policies/generated-artifact-and-hook-governance.mdx`
- [ ] **6.9** **CHECKPOINT** — show full tier mapping to human
- [ ] **6.10** Commit + merge back to `docs-v2-dev`
- [ ] **6.11** Strikethrough completed tasks in this plan

---

## Task 7 — Audit archive and clean remaining dead code

**Goal**: No dead weight left.

### Tasks

- [ ] **7.1** Sync worktree with latest `docs-v2-dev`
- [ ] **7.2** Audit each script in `archive/legacy/` (14 scripts) — flag unique logic vs pure duplicates
- [ ] **7.3** Audit `archive/deprecated/` (2 scripts) — check for remaining references
- [ ] **7.4** Audit `archive/fixtures/` (2 files) — test fixtures, keep or delete
- [ ] **7.5** **CHECKPOINT** — present audit findings, recommend keep/delete for each
- [ ] **7.6** Delete approved dead scripts
- [ ] **7.7** If `archive/` has survivors, add README explaining what's kept and why
- [ ] **7.8** If `archive/` is empty, remove it
- [ ] **7.9** Commit + merge back to `docs-v2-dev`
- [ ] **7.10** Strikethrough completed tasks in this plan

---

## Task 8 — Documentation & references cleanup

**Goal**: Docs match reality. No stale references.

### Tasks

- [ ] **8.1** Sync worktree with latest `docs-v2-dev`
- [ ] **8.2** Rewrite `tools/scripts/README.md` with real content reflecting new structure
- [ ] **8.3** Regenerate `docs-guide/catalog/scripts-catalog.mdx`
- [ ] **8.4** Verify `docs-guide/tooling/lpd-cli.mdx` script references match new paths
- [ ] **8.5** Verify `AGENTS.md` script references match new paths
- [ ] **8.6** Verify `contribute/CONTRIBUTING/AGENT-INSTRUCTIONS.md` references match new paths
- [ ] **8.7** Verify `docs-guide/policies/agent-governance-framework.mdx` references
- [ ] **8.8** Verify `docs-guide/policies/generated-artifact-and-hook-governance.mdx` references
- [ ] **8.9** **CHECKPOINT** — show all doc changes to human
- [ ] **8.10** Run link/import test suite: `npm test --prefix tests`
- [ ] **8.11** Commit + merge back to `docs-v2-dev`
- [ ] **8.12** Strikethrough completed tasks in this plan

---

## Task 9 — Root restructure: create `/operations`

**Goal**: Move `tools/scripts/` and `tests/` under a new root `/operations` directory.
This task runs LAST, after all internal script restructuring is complete and stable.

> **NOTE**: `/tools` restructure is a separate follow-up effort after this plan completes.
> `/api` only moves if it doesn't break Mintlify — deferred, may belong in `/tools`.
> `/ai-tools` stays out of scope — skills aren't scripts, may belong in `/tools`.

### Target

```
/operations/
  scripts/            # everything from tools/scripts/ (now restructured)
    audits/
    generators/
    validators/
    remediators/
    dispatch/
    automations/
    lib/
    config/
    archive/
  tests/              # everything from /tests
```

### Tasks

- [ ] **9.1** Sync worktree with latest `docs-v2-dev`
- [ ] **9.2** Create `/operations` root directory
- [ ] **9.3** Move `tools/scripts/` to `/operations/scripts/`
- [ ] **9.4** Move `tests/` to `/operations/tests/`
- [ ] **9.5** Update all path references (package.json, workflows, hooks, imports, docs)
- [ ] **9.6** **CHECKPOINT** — show full tree + test results to human
- [ ] **9.7** Commit + merge back to `docs-v2-dev`
- [ ] **9.8** Strikethrough completed tasks in this plan

---

## Task 10 — Close out

**Goal**: Final cleanup and plan completion.

### Tasks

- [ ] **10.1** Reconcile `snippets/components/catalog.md` with completed restructure
- [ ] **10.2** Reconcile any other plan files in `tasks/plan/active/` that overlap
- [ ] **10.3** Remove worktree: `git worktree remove ../script-restructure-wt`
- [ ] **10.4** Move this plan to `tasks/plan/completed/`
- [ ] **10.5** Strikethrough all remaining tasks

---

## Execution summary

| Task | What | Impact | Human checkpoint |
|---|---|---|---|
| **1** | Agree on folder taxonomy | Foundation — everything depends on this | Interactive: approve each name |
| **2** | Set up worktree + delete dead code | Quick win | Before merge |
| **3** | Gut the pre-commit hook | Highest value — unblocks daily work | Before merge |
| **4** | Restructure into approved folders | Organizational | Before moves + after tests |
| **5** | Consolidate overlapping scripts | Reduces maintenance | After each merge |
| **6** | Define governance tiers | Long-term prevention | Before tier assignments |
| **7** | Audit archive + clean dead code | Remove dead weight | Before deletions |
| **8** | Documentation + references cleanup | Completeness | Before final merge |
| **9** | Root restructure to `/operations` | Final home for scripts + tests | Before merge |
| **10** | Close out | Plan completion | Final review |

---

## Notes

- Old script governance reference: https://docs.google.com/document/d/1P8Y5F-dKV3jR8c3p8KZy8kzxOMNXE18LBRuuLYMDSS8/edit?usp=sharing
- Auto-generated catalog at `docs-guide/catalog/scripts-catalog.mdx` is produced by `tests/unit/script-docs.test.js` from script headers. Moving scripts auto-updates it once paths + headers are correct.
- `snippets/components/catalog.md` contains working notes for broader repo restructure — reconcile in Task 10.
