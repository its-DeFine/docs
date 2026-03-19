# Script Restructure & Governance Plan

> **Status**: Active
> **Created**: 2026-03-19
> **Source of truth**: This file. Completed tasks get ~~strikethrough~~.
> **Branch**: `docs-v2-dev-scripts` (branched off `docs-v2-dev`)
> **Worktree**: `Docs-v2-dev-scripts`
> **Merge policy**: Merge back to `docs-v2-dev` after each completed task when safe. Sync any new `docs-v2-dev` changes into worktree before starting next task.
> **Deletion policy**: No deletions ever. All superseded files go to `x-archive/` via `git mv`. Only archive one script at a time, after its replacement is fully working, tested, and all downstream dependants have updated paths.

<CustomDivider />

## Workflow

Every task follows this cycle:

1. **Sync** — pull latest `docs-v2-dev` into the worktree branch
2. **Do the work** in the worktree
3. **CHECKPOINT** — present results to human for review
4. **Human approves** — merge worktree branch back to `docs-v2-dev`
5. **Strikethrough** the task in this plan file (in the `Docs-v2-dev` working directory)

No task proceeds without human approval at the checkpoint.

<CustomDivider />

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

<CustomDivider />

## Parallel work — not in scope but noted

- **Component restructure** is happening separately. Should not affect this plan.
- **`/tools` folder restructure** happens AFTER all script work is complete.
- **`/api` folder** — only moves if it doesn't break Mintlify. May belong in `/tools` not scripts. Deferred.
- **`/ai-tools`** — skills aren't scripts. Stays out of scope. May belong in `/tools`.

<CustomDivider />

## Future work — flagged for later plans

- **`.github/scripts/` and `.github/workflows/`** — organise GitHub Actions scripts using the same `<type>/<concern>/<niche>` model. Cannot move them (Actions requires `.github/` paths) but can restructure within `.github/scripts/`.
- **`ai-tools/` scripts** — organise any operational scripts inside `ai-tools/` using the same model.
- **Full unused-script sweep** — after restructure is done, run a comprehensive usage audit to find scripts that are never called from any hook, workflow, package.json, or other script.

<CustomDivider />

## Folder taxonomy

Three-tier model: `<type> / <concern> / <concern-niche>`

Content and governance **always** have niche sub-folders. Components stays flat
unless volume warrants splitting. Concern-niche definitions need interactive
refinement — flagged in Task 1.

### Layer 1 — type (what the script *does*)

| Folder | Purpose | Status |
|---|---|---|
| `audits/` | Read-only scan, measure, report | **APPROVED** |
| `generators/` | Produce files from source-of-truth data | **APPROVED** |
| `validators/` | Enforce rules, pass/fail gate | **APPROVED** |
| `remediators/` | Bulk fix/repair | **APPROVED** |
| `dispatch/` | Dispatch work to agents — codex/AI task lifecycle, cross-agent packaging, pipeline chaining | **APPROVED** |
| `automations/` | Automated pipelines — translation, external data fetch, feed conversion | **APPROVED** |
| `config/` | Shared configuration, policy files, and shared utility libraries | **APPROVED** |
| `x-archive/` | Displaced scripts awaiting final cleanup — nothing is deleted until Task 12 | **APPROVED** |

### Layer 2 — concern (what the script is *about*)

Three concerns, used across types:

| Concern | What it covers |
|---|---|
| `content/` | Docs pages, copy, SEO, fact-checking, quality, reconciliation |
| `components/` | Component library, registry, CSS, naming, imports |
| `governance/` | Scripts about scripts, repo structure, agent docs, manifests, catalogs |

### Layer 3 — concern-niche (always for content and governance, where needed for components)

**Content niches** — PENDING interactive refinement in Task 1. Current proposals:

| Niche | Used in | Scripts |
|---|---|---|
| `fact-checking/` | audits | claim validation, evidence, research packets |
| `quality/` | audits | freshness, usefulness, media assets |
| `seo/` | generators | sitemap, og-images, seo metadata |
| `reconciliation/` | generators | content-gap reconciliation |
| `copy/` | validators | banned words, patterns (lint-copy, lint-patterns) |
| `structure/` | validators | MDX-safe, double-headers, page-endings, anchors, descriptions, banners |
| `grammar/` | validators | en-gb grammar, proper-nouns |
| `style/` | remediators | ownerless-language, homogenizer, wcag |
| `classification/` | remediators | framework-headers, pagetype, purpose-metadata |
| `repair/` | remediators | mdx-safe-markdown, spelling, docs-paths, quarantine, migrate-assets |

**Governance niches** — PENDING interactive refinement in Task 1. Current proposals:

| Niche | Used in | Scripts |
|---|---|---|
| `scripts/` | audits | script auditing, footprint analysis |
| `repo/` | audits | tasks-folders, audit orchestrator |
| `catalogs/` | generators | docs-guide indexes, skills indexes, component indexes |
| `reports/` | generators | cleanup-matrix, governance-remediation-reports |
| `compliance/` | validators | ai-tools-registry, codex-task-contract, agent-docs-freshness |
| `pr/` | validators | component-immutability, pr-template |

### Full target structure

See "2. Folder structure" section at end of plan for the complete tree with tagged scripts.

<CustomDivider />

## Task 1 — Agree on folder taxonomy (interactive)

**Goal**: Lock down all folder names, concern-niches, and script assignments before moving anything.
No code changes. Just naming decisions.

### Tasks

- [ ] **1.1** Review and approve Layer 1 type folders
- [ ] **1.2** Review and approve Layer 2 concern folders
- [ ] **1.3** Review and approve content niche folders across all types (see proposals above)
- [ ] **1.4** Review and approve governance niche folders across all types (see proposals above)
- [ ] **1.5** Lock the taxonomy — mark all items as APPROVED in this plan

<CustomDivider />

## Task 2 — Set up worktree and move dead code to x-archive

**Goal**: Create the working worktree. Move confirmed dead scripts to `x-archive/` (no deletions).

### Tasks

- [ ] **2.1** Create worktree: `git worktree add ../Docs-v2-dev-scripts -b docs-v2-dev-scripts docs-v2-dev`
- [ ] **2.2** Create `tools/scripts/x-archive/` folder
- [ ] **2.3** Move the 7 confirmed dead scripts to `x-archive/` (not delete)
- [ ] **2.4** Update any import paths or references that would break with the moved scripts (point them to the replacement scripts or remove dead references)
- [ ] **2.5** **CHECKPOINT** — show diff to human for approval
- [ ] **2.6** Commit + merge back to `docs-v2-dev`
- [ ] **2.7** Strikethrough completed tasks in this plan

### Confirmed dead scripts (move to x-archive)

| Script | Reason |
|---|---|
| `dev/seo-generator-safe.js` | Deprecated — header says use canonical workflow |
| `dev/update-og-image.js` | Deprecated — header says use canonical workflow |
| `dev/update-all-og-images.js` | Deprecated — header says use canonical workflow |
| `dev/batch-update-og-image.sh` | Deprecated — header says use canonical workflow |
| `dev/replace-og-image.py` | Deprecated — header says use canonical workflow |
| `codex-safe-merge-with-stash.js` | Compatibility shim — directs to task-finalize |
| `verify/.verify-large-change.sh` | No-op placeholder |

<CustomDivider />

## Task 3 — Gut the pre-commit hook

**Goal**: Reduce pre-commit to &lt; 5 seconds. Move everything else to GitHub Actions
workflows that run on pull requests (`test-suite.yml`, `codex-governance.yml`, etc.)
or to scheduled cron workflows that self-heal.

"PR CI" = GitHub Actions CI workflows triggered on `pull_request` events.

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
- [ ] **3.3** Move copy linting (`lint-copy`, `lint-patterns`) to PR workflows
- [ ] **3.4** Move structure linting (`lint-structure`) to PR workflows
- [ ] **3.5** Move component governance checks to PR workflows
- [ ] **3.6** Move style checks (ThemeData, hardcoded colors, imports) to PR workflows
- [ ] **3.7** Move anchor validation to PR workflows
- [ ] **3.8** Move description quality / SEO checks to PR workflows
- [ ] **3.9** Move generated artifact freshness checks to PR workflows (workflow can regen + commit)
- [ ] **3.10** Move component registry freshness to PR workflows (workflow can regen + commit)
- [ ] **3.11** **CHECKPOINT** — show new pre-commit + workflow changes to human
- [ ] **3.12** Verify the slimmed pre-commit runs in &lt; 5 seconds on a typical commit
- [ ] **3.13** Move old pre-commit to `x-archive/pre-commit-v1`
- [ ] **3.14** Update `.githooks/README.md` and `BYPASS.md` to reflect new scope
- [ ] **3.15** Commit + merge back to `docs-v2-dev`
- [ ] **3.16** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 4 — Restructure scripts into approved folders

**Goal**: Move every script into its approved `<type>/<concern>/<concern-niche>` home.

**Safety rule**: Move one script (or one tight group) at a time. After each move:
1. Update all downstream paths (package.json, workflows, hooks, imports)
2. Verify the moved script still works
3. Only then move the original to `x-archive/`

### Tasks

- [ ] **4.1** Sync worktree with latest `docs-v2-dev`
- [ ] **4.2** Create all approved folders (types, concerns, niches)
- [ ] **4.3** Move audit scripts — one group at a time, verify, x-archive originals
- [ ] **4.4** Move generator scripts — one group at a time, verify, x-archive originals
- [ ] **4.5** Promote existing validators — move root-level validators in, verify, x-archive
- [ ] **4.6** Promote existing remediators — move root-level remediators in, verify, x-archive
- [ ] **4.7** Create `dispatch/` — absorb `codex/`, `orchestrators/`, root dispatch scripts, verify, x-archive
- [ ] **4.8** Create `automations/` — absorb `snippets/` fetch scripts, `i18n/` → `translation/`, redirects, rss, verify, x-archive
- [ ] **4.9** Move `enforcers/` content into `validators/governance/`, verify, x-archive
- [ ] **4.10** Move `dev/` contents to `/tools/dev/`, verify, x-archive
- [ ] **4.11** Move shared config/policy files to `config/`
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

<CustomDivider />

## Task 5 — Review script naming and single-purpose (interactive)

**Goal**: Every script does one thing and its filename describes that thing.

> **CHECKPOINT**: This task starts with an interactive review. Present each script's
> current name vs proposed name, flag scripts that do too many things and need
> splitting. Human approves before any changes.

### Tasks

- [ ] **5.1** Sync worktree with latest `docs-v2-dev`
- [ ] **5.2** **INTERACTIVE** — present full script-by-script audit: current name, what it does, proposed rename (if any), flag scripts that need splitting
- [ ] **5.3** Human approves rename list and split list
- [ ] **5.4** Execute approved renames
- [ ] **5.5** Execute approved splits (create new scripts, update callers)
- [ ] **5.6** Move originals of split scripts to `x-archive/`
- [ ] **5.7** **CHECKPOINT** — show results to human
- [ ] **5.8** Commit + merge back to `docs-v2-dev`
- [ ] **5.9** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 6 — Consolidate overlapping scripts (interactive)

**Goal**: Where scripts genuinely overlap (do the same thing), consolidate. Scripts
should be composable into pipelines — do NOT merge scripts that have distinct
purposes just because they touch similar areas.

> **CHECKPOINT**: This task starts with an interactive review. Present each
> consolidation candidate with evidence of actual overlap. Human decides.

### Known candidates (verify before acting)

| Candidate | Evidence of overlap | Decision |
|---|---|---|
| `audit-scripts` + `audit-script-inventory` + `script-footprint-and-usage-audit` | All three audit scripts about scripts — verify they aren't complementary pipeline stages | PENDING |
| `generate-docs-guide-components-index` + `generate-docs-guide-indexes` + `generate-docs-guide-pages-index` | All generate docs-guide index pages — verify they aren't distinct outputs | PENDING |
| Others TBD from Task 5 findings | | |

### Tasks

- [ ] **6.1** Sync worktree with latest `docs-v2-dev`
- [ ] **6.2** **INTERACTIVE** — present each overlap candidate with what each script actually does, inputs, outputs. Show where they genuinely duplicate vs where they're pipeline stages.
- [ ] **6.3** Human approves consolidation list
- [ ] **6.4** Execute approved consolidations
- [ ] **6.5** Update all callers (package.json, workflows, orchestrator)
- [ ] **6.6** Move originals to `x-archive/` with note pointing to replacement
- [ ] **6.7** **CHECKPOINT** — show results to human
- [ ] **6.8** Commit + merge back to `docs-v2-dev`
- [ ] **6.9** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 7 — Audit x-archive and legacy scripts (interactive)

**Goal**: Understand what's in x-archive and legacy. No deletions yet — just classification.

> **CHECKPOINT**: Interactive review. Present findings, human decides what stays
> and what gets flagged for deletion in the cleanup phase.

### Tasks

- [ ] **7.1** Sync worktree with latest `docs-v2-dev`
- [ ] **7.2** **INTERACTIVE** — audit each script in `x-archive/` — classify as: confirmed dead, possibly useful, keep for reference
- [ ] **7.3** **INTERACTIVE** — audit `archive/legacy/` (14 scripts) — flag unique logic vs pure duplicates
- [ ] **7.4** **INTERACTIVE** — audit `archive/deprecated/` (2 scripts) and `archive/fixtures/` (2 files)
- [ ] **7.5** Human approves classification
- [ ] **7.6** Update `x-archive/` with README documenting classification and deletion schedule
- [ ] **7.7** Commit + merge back to `docs-v2-dev`
- [ ] **7.8** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 8 — Performance and optimisation

**Goal**: Every script is efficient — no hardcoding, no redundant work, correct
error handling. Script-by-script review.

### Tasks

- [ ] **8.1** Sync worktree with latest `docs-v2-dev`
- [ ] **8.2** Audit each script for: hardcoded paths, unnecessary file reads, redundant regex compilation, missing early exits, poor error messages
- [ ] **8.3** **CHECKPOINT** — present findings to human
- [ ] **8.4** Execute approved optimisations
- [ ] **8.5** **CHECKPOINT** — show results to human
- [ ] **8.6** Commit + merge back to `docs-v2-dev`
- [ ] **8.7** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 9 — Define governance tiers + documentation

**Goal**: Every script has a tier. Governance is documented in `docs-guide/`.
One source of truth for script documentation and auto-generation.

### Three tiers

| Tier | Gate type | Scope | Runs where |
|---|---|---|---|
| **Hard gate** | Blocks commit or merge | Syntax, security, AI isolation | Pre-commit + required GitHub Actions status check |
| **Soft gate** | Warns in PR, does not block merge | Style, quality, freshness | GitHub Actions check (non-required) |
| **Self-heal** | No gate — auto-fixes on schedule | Generated artifacts, formatting, metadata | Cron workflow with auto-PR |

### Move to cron (self-healing)

| Check | Schedule | Self-heal action |
|---|---|---|
| Governance repair | Weekly (already: `repair-governance.yml`) | Auto-fix + PR |
| Content freshness audit | Weekly (already: `freshness-monitor.yml`) | Issue creation |
| Script metadata enforcement | Weekly | Auto-fix + PR |
| Grammar/spelling sweep | Weekly | Auto-fix + PR |
| Media asset audit | Monthly | Report |
| Component docs regen | On component change (already workflow trigger) | Auto-commit |

### Tasks

- [ ] **9.1** Sync worktree with latest `docs-v2-dev`
- [ ] **9.2** Add `tier` field to every script's header metadata (`tier: hard-gate | soft-gate | self-heal`)
- [ ] **9.3** Create governance manifest: `tools/config/script-governance.json`
- [ ] **9.4** **CHECKPOINT** — show manifest to human for tier review
- [ ] **9.5** Update `repo-audit-orchestrator.js` to respect tiers
- [ ] **9.6** Verify all expected cron workflows exist
- [ ] **9.7** Create any missing cron workflows for self-heal scripts
- [ ] **9.8** Create governance documentation pages in `docs-guide/policies/`
- [ ] **9.9** Audit how auto-documentation works — ensure one source of truth for script docs (script headers → auto-generated catalog → docs-guide)
- [ ] **9.10** Clean up any duplicate or conflicting documentation
- [ ] **9.11** Rewrite `tools/scripts/README.md` with real content reflecting new structure
- [ ] **9.12** Regenerate `docs-guide/catalog/scripts-catalog.mdx`
- [ ] **9.13** Verify all doc references match new paths (AGENTS.md, lpd-cli.mdx, CONTRIBUTING, policies)
- [ ] **9.14** **CHECKPOINT** — show all doc changes to human
- [ ] **9.15** Commit + merge back to `docs-v2-dev`
- [ ] **9.16** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 10 — Full testing

**Goal**: Comprehensive test pass over all restructured scripts.

### Tasks

- [ ] **10.1** Sync worktree with latest `docs-v2-dev`
- [ ] **10.2** Run full test suite: `npm test --prefix tests`
- [ ] **10.3** Run link/import validation to catch broken references
- [ ] **10.4** Run each script type's own validation (generators generate correctly, validators validate correctly, etc.)
- [ ] **10.5** Verify all GitHub Actions workflows still reference correct paths
- [ ] **10.6** Verify pre-commit hook works with new paths
- [ ] **10.7** **CHECKPOINT** — present full test results to human
- [ ] **10.8** Fix any failures
- [ ] **10.9** Commit + merge back to `docs-v2-dev`
- [ ] **10.10** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 11 — Root restructure: create `/operations`

**Goal**: Move `tools/scripts/` and `tests/` under a new root `/operations` directory.
This task runs after all internal script restructuring is complete and tested.

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
    config/
    x-archive/
  tests/              # everything from /tests
```

### Tasks

- [ ] **11.1** Sync worktree with latest `docs-v2-dev`
- [ ] **11.2** Create `/operations` root directory
- [ ] **11.3** Move `tools/scripts/` to `/operations/scripts/`
- [ ] **11.4** Move `tests/` to `/operations/tests/`
- [ ] **11.5** Update all path references (package.json, workflows, hooks, imports, docs)
- [ ] **11.6** **CHECKPOINT** — show full tree + test results to human
- [ ] **11.7** Commit + merge back to `docs-v2-dev`
- [ ] **11.8** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 12 — Full cleanup

**Goal**: Review and reconcile `x-archive/`. No files are deleted — all superseded
files stay in `x-archive/` via `git mv` to preserve history.

### Tasks

- [ ] **12.1** Sync worktree with latest `docs-v2-dev`
- [ ] **12.2** Review `x-archive/` contents — confirm each item has a working replacement and no remaining live references
- [ ] **12.3** Verify `archive/legacy/` and `archive/deprecated/` are reconciled per Task 7 decisions (move to `x-archive/` if not already)
- [ ] **12.4** Add README to `x-archive/` documenting what's in there and why
- [ ] **12.5** Final grep for any orphaned references to old paths
- [ ] **12.6** **CHECKPOINT** — show clean state to human
- [ ] **12.7** Commit + merge back to `docs-v2-dev`
- [ ] **12.8** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 13 — Final merge to docs-v2-dev

**Goal**: Clean merge of all work back to `docs-v2-dev`. Verify branch is clean.

### Tasks

- [ ] **13.1** Ensure all prior task merges are complete
- [ ] **13.2** Verify `docs-v2-dev` has all changes
- [ ] **13.3** Run full test suite on `docs-v2-dev` directly
- [ ] **13.4** **CHECKPOINT** — confirm with human
- [ ] **13.5** Strikethrough completed tasks in this plan

<CustomDivider />

## Task 14 — Close out

**Goal**: Final cleanup and plan completion.

### Tasks

- [ ] **14.1** Reconcile `snippets/components/catalog.md` with completed restructure
- [ ] **14.2** Reconcile any other plan files in `tasks/plan/active/` that overlap
- [ ] **14.3** Remove worktree: `git worktree remove ../Docs-v2-dev-scripts`
- [ ] **14.4** Move this plan to `tasks/plan/completed/`
- [ ] **14.5** Strikethrough all remaining tasks

<CustomDivider />

## Execution summary

| Task | What | Human checkpoint |
|---|---|---|
| **1** | Agree on folder taxonomy | Interactive: approve each name |
| **2** | Set up worktree + x-archive dead code | Before merge |
| **3** | Gut the pre-commit hook | Before merge |
| **4** | Restructure into approved folders | Before moves + after tests |
| **5** | Review naming + single-purpose | Interactive: approve renames/splits |
| **6** | Consolidate overlapping scripts | Interactive: approve each consolidation |
| **7** | Audit x-archive + legacy | Interactive: classify each script |
| **8** | Performance + optimisation | Before/after changes |
| **9** | Governance tiers + documentation | Before tier assignments |
| **10** | Full testing | Before merge |
| **11** | Root restructure to `/operations` | Before merge |
| **12** | Full cleanup (x-archive emptying) | Before deletions |
| **13** | Final merge to docs-v2-dev | Before merge |
| **14** | Close out | Final review |

<CustomDivider />

## Notes

- Old script governance reference: https://docs.google.com/document/d/1P8Y5F-dKV3jR8c3p8KZy8kzxOMNXE18LBRuuLYMDSS8/edit?usp=sharing
- Auto-generated catalog at `docs-guide/catalog/scripts-catalog.mdx` is produced by `tests/unit/script-docs.test.js` from script headers. Moving scripts auto-updates it once paths + headers are correct.
- `snippets/components/catalog.md` contains working notes for broader repo restructure — reconcile in Task 14.
- `luma-calendar.jsx` — belongs in `snippets/automations/` (data component, not a script).
