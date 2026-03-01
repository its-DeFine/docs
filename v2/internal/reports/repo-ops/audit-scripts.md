---
title: 'Script Audit Report'
sidebarTitle: 'Script Audit'
description: 'Generated script inventory audit report from tools/scripts/audit-scripts.js.'
keywords: ["livepeer","internal","reports","repo-ops","audit-scripts"]
og:image: "/snippets/assets/domain/SHARED/LivepeerDocsLogo.svg"
---
Last Generated (UTC ISO): `2026-03-01T04:50:34.348Z`
Last Generated (UTC Human): `March 01, 2026 04:50 UTC`
Generator Script: `tools/scripts/audit-scripts.js`
What It Does: Audit full-repo executable scripts, categorize usage/overlap, and overwrite SCRIPT_AUDIT reports.
Audited Scope: `tools/scripts, tasks/reports, tests/unit/script-docs.test.js, tests/README.md`
Outputs:
- tasks/reports/repo-ops/SCRIPT_AUDIT.md
- tasks/reports/repo-ops/SCRIPT_AUDIT.json
# SCRIPT_AUDIT

Generated: 2026-02-24T13:08:14.862Z

## Rules Source
- `tests/unit/script-docs.test.js`
- `tests/README.md`

## Summary
- Total scripts: 100
- Template compliant: 95
- Template non-compliant: 5
- Exact overlap clusters: 9
- Near overlap clusters: 0

## Category Counts

| Category | Count |
|---|---:|
| `audit` | 20 |
| `ci` | 7 |
| `deprecated` | 1 |
| `enforcement` | 26 |
| `fixture` | 12 |
| `generator` | 12 |
| `helper` | 21 |
| `hook` | 14 |
| `manual` | 92 |
| `npm-script` | 22 |
| `pr` | 3 |
| `pre-commit` | 10 |
| `push` | 3 |
| `runner` | 4 |
| `scheduled` | 4 |
| `sync` | 14 |
| `test` | 21 |
| `workflow-dispatch` | 4 |

## Script Inventory

| Script | Purpose | Template | Role Tags | Run Context Tags | Used and When |
|---|---|---|---|---|---|
| `.githooks/install.sh` | Utility script for .githooks/install.sh. | PASS | hook | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.githooks/pre-commit` | Pre-commit hook for repository validation | PASS | enforcement, hook | pre-commit | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.githooks/pre-commit-no-deletions` | Utility script for .githooks/pre-commit-no-deletions. | PASS | hook | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.githooks/server-manager.js` | Utility script for .githooks/server-manager.js. | PASS | hook | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.githooks/verify-browser.js` | Utility script for .githooks/verify-browser.js. | PASS | enforcement, hook | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.githooks/verify.sh` | Utility script for .githooks/verify.sh. | PASS | enforcement, hook | pre-commit | hook:.githooks/pre-commit#line 438 [pre-commit] |
| `.github/scripts/embed-table.js` | Reserved CI utility script placeholder for markdown table embedding tasks. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.github/scripts/fetch-forum-data.js` | Utility script for .github/scripts/fetch-forum-data.js. | PASS | ci, sync | scheduled, workflow-dispatch | workflow:.github/workflows/update-forum-data.yml#Update Forum Data > update-forum-data > Fetch and process forum data [scheduled,workflow-dispatch] |
| `.github/scripts/fetch-ghost-blog-data.js` | Utility script for .github/scripts/fetch-ghost-blog-data.js. | PASS | ci, sync | scheduled, workflow-dispatch | workflow:.github/workflows/update-ghost-blog-data.yml#Update Ghost Blog Data > update-ghost-data > Fetch and process Ghost blog data [scheduled,workflow-dispatch] |
| `.github/scripts/fetch-youtube-data.js` | Utility script for .github/scripts/fetch-youtube-data.js. | PASS | ci, sync | scheduled, workflow-dispatch | workflow:.github/workflows/update-youtube-data.yml#Update YouTube Data > update-youtube > Fetch and process YouTube videos [scheduled,workflow-dispatch] |
| `.github/scripts/gen-table.js` | Reserved CI utility script placeholder for generated table output. | PASS | generator | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.github/scripts/gen-textareas.js` | Reserved CI utility script placeholder for textarea generation tasks. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `.github/scripts/project-showcase-sync.js` | Utility script for .github/scripts/project-showcase-sync.js. | PASS | ci, sync | scheduled, workflow-dispatch | workflow:.github/workflows/project-showcase-sync.yml#Project Showcase Sync > sync-showcase > Run project showcase sync [scheduled,workflow-dispatch] |
| `lpd` | Utility script for lpd. | FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes) | runner | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `snippets/automations/youtube/filterVideos.js` | Utility script for filterVideos. | FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes) | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tasks/scripts/audit-minimal.js` | Utility script for tasks/scripts/audit-minimal.js. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tasks/scripts/audit-python.py` | Utility script for tasks/scripts/audit-python.py. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tasks/scripts/run-audit-now.js` | Utility script for tasks/scripts/run-audit-now.js. | PASS | audit, runner | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tasks/scripts/test-audit.js` | Utility script for tasks/scripts/test-audit.js. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tests/integration/browser.test.js` | Utility script for tests/integration/browser.test.js. | PASS | ci, enforcement, test | manual, npm-script, pr, push | package-script:tests/package.json#scripts.test:browser [manual,npm-script] \| package-script:tools/package.json#scripts.test:browser [manual,npm-script] \| package-script:tools/package.json#scripts.test:browser:all [manual,npm-script] \| workflow:.github/workflows/test-suite.yml#Docs CI - Content Quality Suite > test-suite > Run Browser Tests (All Pages) [npm-script,pr,push] |
| `tests/integration/domain-pages-audit.js` | Audit deployed docs page load status and emit a stable JSON report. | PASS | audit, enforcement, hook, test | manual, npm-script, pre-commit | hook:.githooks/pre-commit#line 547 [pre-commit] \| hook:.githooks/pre-commit#line 642 [pre-commit] \| package-script:tests/package.json#scripts.test:domain [manual,npm-script] \| package-script:tests/package.json#scripts.test:domain:both [manual,npm-script] \| package-script:tests/package.json#scripts.test:domain:v1 [manual,npm-script] \| package-script:tests/package.json#scripts.test:domain:v2 [manual,npm-script] |
| `tests/integration/v2-link-audit.js` | Comprehensive V2 MDX link audit with report and domain link map outputs. | PASS | audit, enforcement, hook, test | manual, npm-script, pre-commit | hook:.githooks/pre-commit#line 532 [pre-commit] \| hook:.githooks/pre-commit#line 627 [pre-commit] \| package-script:tests/package.json#scripts.test:link-audit [manual,npm-script] \| package-script:tests/package.json#scripts.test:link-audit:staged [manual,npm-script] |
| `tests/integration/v2-wcag-audit.js` | Audit v2 docs accessibility (WCAG 2.2 AA) with deterministic reports and conservative source autofixes. | PASS | audit, enforcement, hook, test | manual, npm-script, pre-commit | hook:.githooks/pre-commit#line 497 [pre-commit] \| hook:.githooks/pre-commit#line 592 [pre-commit] \| package-script:tests/package.json#scripts.test:wcag [manual,npm-script] \| package-script:tests/package.json#scripts.test:wcag:nofix [manual,npm-script] \| package-script:tests/package.json#scripts.test:wcag:staged [manual,npm-script] |
| `tests/integration/v2-wcag-audit.selftest.js` | Script-level self-tests for the v2 WCAG audit (local HTTP + Puppeteer axe run, and temp-file fix/stage behavior without Mintlify). | PASS | audit, test | manual, npm-script | package-script:tests/package.json#scripts.test:wcag:selftest [manual,npm-script] |
| `tests/run-all.js` | Utility script for tests/run-all.js. | PASS | enforcement, hook, runner, test | manual, npm-script, pre-commit | hook:.githooks/pre-commit#line 460 [pre-commit] \| hook:.githooks/pre-commit#line 508 [pre-commit] \| hook:.githooks/pre-commit#line 603 [pre-commit] \| package-script:tests/package.json#scripts.test [manual,npm-script] \| package-script:tools/package.json#scripts.test [manual,npm-script] |
| `tests/run-pr-checks.js` | Run changed-file scoped validation checks for pull request CI. | PASS | ci, enforcement, runner, sync, test | manual, npm-script, pr, push | package-script:tests/package.json#scripts.test:pr [manual,npm-script] \| workflow:.github/workflows/test-suite.yml#Docs CI - Content Quality Suite > test-suite > Run PR Changed-File Checks [npm-script,pr,push] |
| `tests/unit/docs-guide-sot.test.js` | Validate docs-guide source-of-truth coverage, README pointers, and generated index freshness. | PASS | enforcement, generator, hook, test | pre-commit | hook:.githooks/pre-commit#line 521 [pre-commit] \| hook:.githooks/pre-commit#line 524 [pre-commit] \| hook:.githooks/pre-commit#line 616 [pre-commit] \| hook:.githooks/pre-commit#line 619 [pre-commit] |
| `tests/unit/docs-navigation.test.js` | Validate docs.json page-entry syntax, report missing routes, suggest remaps, and optionally apply approved remaps. | PASS | audit, enforcement, test | manual, npm-script | package-script:tests/package.json#scripts.test:docs-nav [manual,npm-script] |
| `tests/unit/docs-usefulness-accuracy-verifier.test.js` | Validate source-weighted 2026 accuracy verification rules (GitHub vs DeepWiki precedence, freshness, fallback, and cache reuse). | PASS | enforcement, test | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tests/unit/links-imports.test.js` | Utility script for tests/unit/links-imports.test.js. | PASS | test | manual, npm-script | package-script:tests/package.json#scripts.test:links [manual,npm-script] \| package-script:tools/package.json#scripts.test:links [manual,npm-script] |
| `tests/unit/mdx-guards.test.js` | Enforce MDX guardrails for globals imports, math delimiters, and markdown table line breaks. | PASS | enforcement, test | manual, npm-script | package-script:tests/package.json#scripts.test:mdx:guards [manual,npm-script] |
| `tests/unit/mdx.test.js` | Utility script for tests/unit/mdx.test.js. | PASS | test | manual, npm-script | package-script:tests/package.json#scripts.test:mdx [manual,npm-script] \| package-script:tools/package.json#scripts.test:mdx [manual,npm-script] |
| `tests/unit/quality.test.js` | Utility script for tests/unit/quality.test.js. | PASS | test | manual, npm-script | package-script:tests/package.json#scripts.test:quality [manual,npm-script] \| package-script:tools/package.json#scripts.test:quality [manual,npm-script] |
| `tests/unit/script-docs.test.js` | Enforce script header schema, keep group script indexes in sync, and build aggregate script index. | PASS | enforcement, generator, hook, sync, test | manual, npm-script, pre-commit | hook:.githooks/pre-commit#line 469 [pre-commit] \| hook:.githooks/pre-commit#line 564 [pre-commit] \| package-script:tests/package.json#scripts.test:scripts [manual,npm-script] |
| `tests/unit/spelling.test.js` | Utility script for tests/unit/spelling.test.js. | PASS | test | manual, npm-script | package-script:tests/package.json#scripts.test:spell [manual,npm-script] \| package-script:tools/package.json#scripts.test:spell [manual,npm-script] |
| `tests/unit/style-guide.test.js` | Utility script for tests/unit/style-guide.test.js. | PASS | test | manual, npm-script | package-script:tests/package.json#scripts.test:style [manual,npm-script] \| package-script:tools/package.json#scripts.test:style [manual,npm-script] |
| `tests/unit/v2-wcag-audit.test.js` | Unit tests for v2 WCAG audit helper logic (args, thresholds, route mapping, report sorting, and conservative autofixes). | PASS | audit, test | manual, npm-script | package-script:tests/package.json#scripts.test:wcag:unit [manual,npm-script] |
| `tests/utils/file-walker.js` | Utility script for tests/utils/file-walker.js. | PASS | enforcement, hook, test | pre-commit | hook:.githooks/pre-commit#line 64 [pre-commit] \| hook:.githooks/verify.sh#line 47 [manual] |
| `tests/utils/mdx-parser.js` | Utility script for tests/utils/mdx-parser.js. | PASS | test | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tests/utils/spell-checker.js` | Utility script for tests/utils/spell-checker.js. | PASS | enforcement, test | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/config/v2-internal-report-pages.js` | Utility script for v2 internal report pages. | FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes) | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/lib/docs-usefulness/accuracy-verifier.js` | Utility script for accuracy verifier. | FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes) | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/lib/docs-usefulness/scoring.js` | Utility script for scoring. | FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes) | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/audit-all-pages-simple.js` | Utility script for tasks/scripts/audit-all-pages-simple.js. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/audit-all-pages.js` | Utility script for tasks/scripts/audit-all-pages.js. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/audit-all-v2-pages.js` | Utility script for tools/scripts/audit-all-v2-pages.js. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/audit-component-usage.js` | Utility script for tools/scripts/audit-component-usage.js. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/audit-scripts.js` | Audit full-repo executable scripts, categorize usage/overlap, and overwrite SCRIPT_AUDIT reports. | PASS | audit | manual, npm-script | package-script:tools/package.json#scripts.audit:scripts [manual,npm-script] |
| `tools/scripts/audit-tasks-folders.js` | Audit tasks folders, optionally normalize report locations, and optionally apply audit recommendations with conflict-safe moves. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/audit-v2-usefulness.js` | Audit v2 MDX pages (excluding x-* directories) and emit page-level usefulness matrix rows with source-weighted 2026 accuracy verification fields. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/check-component-errors.js` | Utility script for tools/scripts/check-component-errors.js. | PASS | enforcement | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/debug-mint-dev.js` | Utility script for tools/scripts/debug-mint-dev.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/deprecated/project-management-output-script.js` | Deprecated legacy project-management output script retained as a reference stub. | PASS | deprecated, fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/add-callouts.js` | Utility script for tools/scripts/dev/add-callouts.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/batch-update-og-image.sh` | Utility script for tools/scripts/dev/batch-update-og-image.sh. | PASS | sync | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/replace-og-image.py` | Utility script for tools/scripts/dev/replace-og-image.py. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/seo-generator-safe.js` | Utility script for tools/scripts/dev/seo-generator-safe.js. | PASS | generator | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/test-add-callouts.js` | Utility script for tools/scripts/dev/test-add-callouts.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/test-seo-generator.js` | Utility script for tools/scripts/dev/test-seo-generator.js. | PASS | generator | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/update-all-og-images.js` | Utility script for tools/scripts/dev/update-all-og-images.js. | PASS | sync | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/dev/update-og-image.js` | Utility script for tools/scripts/dev/update-og-image.js. | PASS | sync | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/download-linkedin-video.sh` | Utility script for tools/scripts/download-linkedin-video.sh. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/download-linkedin-with-cookies.sh` | Utility script for tools/scripts/download-linkedin-with-cookies.sh. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/final-verification.js` | Utility script for tools/scripts/final-verification.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/find-correct-url.js` | Utility script for tools/scripts/find-correct-url.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/generate-docs-guide-indexes.js` | Generate docs-guide workflow/template indexes and optionally verify they are up to date. | PASS | enforcement, generator | manual, npm-script | package-script:tools/package.json#scripts.docs-guide:indexes [manual,npm-script] |
| `tools/scripts/generate-pages-index.js` | Generate and verify section-style index.mdx files for v2 docs folders, plus the root aggregate index. | PASS | enforcement, generator, hook | manual, npm-script, pre-commit | hook:.githooks/pre-commit#line 483 [pre-commit] \| hook:.githooks/pre-commit#line 578 [pre-commit] \| package-script:tests/package.json#scripts.test:pages-index [manual,npm-script] \| package-script:tests/package.json#scripts.test:pages-index:rebuild [manual,npm-script] \| package-script:tests/package.json#scripts.test:pages-index:write [manual,npm-script] |
| `tools/scripts/inspect-page.js` | Utility script for tools/scripts/inspect-page.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/inspect-video-page.js` | Utility script for tools/scripts/inspect-video-page.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/mint-dev.sh` | Utility script for tools/scripts/mint-dev.sh. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/new-script.js` | Create a new script file prefilled with the required docs header template. | PASS | generator | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/publish-v2-internal-reports.js` | Duplicate approved markdown reports into v2/internal/reports pages with metadata and update docs.json. | PASS | audit, sync | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/snippets/fetch-external-docs.sh` | Utility script for tools/scripts/snippets/fetch-external-docs.sh. | PASS | ci, enforcement, sync | manual, npm-script, pr, push | package-script:tools/package.json#scripts.fetch-docs [manual,npm-script] \| package-script:tools/package.json#scripts.prebuild [manual,npm-script] \| workflow:.github/workflows/broken-links.yml#Check Broken Links > broken-links > Fetch external snippets [pr] \| workflow:.github/workflows/test-suite.yml#Docs CI - Content Quality Suite > test-suite > Fetch external snippets [pr,push] \| workflow:.github/workflows/test-v2-pages.yml#Docs CI - V2 Browser Sweep > test-pages > Fetch external snippets [pr,push] |
| `tools/scripts/snippets/fetch-lpt-exchanges.sh` | Utility script for tools/scripts/snippets/fetch-lpt-exchanges.sh. | PASS | sync | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/snippets/fetch-openapi-specs.sh` | Utility script for tools/scripts/snippets/fetch-openapi-specs.sh. | PASS | sync | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/snippets/generate-api-docs.sh` | Utility script for tools/scripts/snippets/generate-api-docs.sh. | PASS | generator | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/snippets/generate-data/scripts/generate-glossary.js` | Utility script for tools/scripts/snippets/generate-data/scripts/generate-glossary.js. | PASS | generator | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/snippets/generate-data/scripts/terminology-search.js` | Utility script for tools/scripts/snippets/generate-data/scripts/terminology-search.js. | PASS | generator | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/snippets/generate-seo.js` | Utility script for tools/scripts/snippets/generate-seo.js. | PASS | generator | manual, npm-script | package-script:tools/package.json#scripts.generate-seo [manual,npm-script] \| package-script:tools/package.json#scripts.generate-seo:dry-run [manual,npm-script] |
| `tools/scripts/snippets/test-scripts.sh` | Utility script for tools/scripts/snippets/test-scripts.sh. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/snippets/update-component-library.sh` | Utility script for tools/scripts/snippets/update-component-library.sh. | PASS | sync | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test-all-pages-browser.js` | Utility script for tools/scripts/test-all-pages-browser.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test-all-pages-comprehensive.js` | Utility script for tools/scripts/test-all-pages-comprehensive.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test-v2-pages.js` | Utility script for tools/scripts/test-v2-pages.js. | PASS | helper | manual, npm-script | package-script:tools/package.json#scripts.test:all-pages [manual,npm-script] \| package-script:tools/package.json#scripts.test:v2-pages [manual,npm-script] |
| `tools/scripts/test-youtube-pages.js` | Utility script for tools/scripts/test-youtube-pages.js. | PASS | helper | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/allowed-script.js` | Utility script for tools/scripts/test/allowed-script.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/allowed-test.js` | Utility script for tools/scripts/test/allowed-test.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/allowed.js` | Utility script for tools/scripts/test/allowed.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/check-component-errors.js` | Utility script for tools/scripts/test/check-component-errors.js. | PASS | enforcement, fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/final-verification.js` | Utility script for tools/scripts/test/final-verification.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/find-correct-url.js` | Utility script for tools/scripts/test/find-correct-url.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/inspect-page.js` | Utility script for tools/scripts/test/inspect-page.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/inspect-video-page.js` | Utility script for tools/scripts/test/inspect-video-page.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/test-youtube-pages.js` | Utility script for tools/scripts/test/test-youtube-pages.js. | PASS | fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/verify-all-pages.js` | Utility script for tools/scripts/verify-all-pages.js. | PASS | enforcement, fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/test/verify-pages.js` | Utility script for tools/scripts/verify-pages.js. | PASS | enforcement, fixture | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/verify-all-pages.js` | Utility script for tools/scripts/verify-all-pages.js. | PASS | enforcement | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/verify-pages.js` | Utility script for tools/scripts/verify-pages.js. | PASS | enforcement | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/verify/.verify-large-change.sh` | Reserved verifier hook placeholder for large-change checks. | PASS | enforcement | manual | Manual/on-demand (no direct hook/workflow/package reference found) |
| `tools/scripts/wcag-repair-common.js` | Apply conservative WCAG-related source autofixes across v2 docs (common raw-tag issues) and write deterministic repair reports. | PASS | audit | manual | Manual/on-demand (no direct hook/workflow/package reference found) |

## Template Compliance Failures

### `lpd`
- Missing tags: @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes
- Empty/placeholder tags: none

### `snippets/automations/youtube/filterVideos.js`
- Missing tags: @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes
- Empty/placeholder tags: none

### `tools/config/v2-internal-report-pages.js`
- Missing tags: @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes
- Empty/placeholder tags: none

### `tools/lib/docs-usefulness/accuracy-verifier.js`
- Missing tags: @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes
- Empty/placeholder tags: none

### `tools/lib/docs-usefulness/scoring.js`
- Missing tags: @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes
- Empty/placeholder tags: none


## Usage Detail

### `.githooks/install.sh`
- Purpose: Utility script for .githooks/install.sh.
- Template compliance: PASS
- Role tags: hook
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.githooks/pre-commit`
- Purpose: Pre-commit hook for repository validation
- Template compliance: PASS
- Role tags: enforcement, hook
- Run-context tags: pre-commit
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.githooks/pre-commit-no-deletions`
- Purpose: Utility script for .githooks/pre-commit-no-deletions.
- Template compliance: PASS
- Role tags: hook
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.githooks/server-manager.js`
- Purpose: Utility script for .githooks/server-manager.js.
- Template compliance: PASS
- Role tags: hook
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.githooks/verify-browser.js`
- Purpose: Utility script for .githooks/verify-browser.js.
- Template compliance: PASS
- Role tags: enforcement, hook
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.githooks/verify.sh`
- Purpose: Utility script for .githooks/verify.sh.
- Template compliance: PASS
- Role tags: enforcement, hook
- Run-context tags: pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 438 (when: pre-commit)

### `.github/scripts/embed-table.js`
- Purpose: Reserved CI utility script placeholder for markdown table embedding tasks.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.github/scripts/fetch-forum-data.js`
- Purpose: Utility script for .github/scripts/fetch-forum-data.js.
- Template compliance: PASS
- Role tags: ci, sync
- Run-context tags: scheduled, workflow-dispatch
- Used by:
  - workflow: .github/workflows/update-forum-data.yml#Update Forum Data > update-forum-data > Fetch and process forum data (when: scheduled, workflow-dispatch)

### `.github/scripts/fetch-ghost-blog-data.js`
- Purpose: Utility script for .github/scripts/fetch-ghost-blog-data.js.
- Template compliance: PASS
- Role tags: ci, sync
- Run-context tags: scheduled, workflow-dispatch
- Used by:
  - workflow: .github/workflows/update-ghost-blog-data.yml#Update Ghost Blog Data > update-ghost-data > Fetch and process Ghost blog data (when: scheduled, workflow-dispatch)

### `.github/scripts/fetch-youtube-data.js`
- Purpose: Utility script for .github/scripts/fetch-youtube-data.js.
- Template compliance: PASS
- Role tags: ci, sync
- Run-context tags: scheduled, workflow-dispatch
- Used by:
  - workflow: .github/workflows/update-youtube-data.yml#Update YouTube Data > update-youtube > Fetch and process YouTube videos (when: scheduled, workflow-dispatch)

### `.github/scripts/gen-table.js`
- Purpose: Reserved CI utility script placeholder for generated table output.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.github/scripts/gen-textareas.js`
- Purpose: Reserved CI utility script placeholder for textarea generation tasks.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `.github/scripts/project-showcase-sync.js`
- Purpose: Utility script for .github/scripts/project-showcase-sync.js.
- Template compliance: PASS
- Role tags: ci, sync
- Run-context tags: scheduled, workflow-dispatch
- Used by:
  - workflow: .github/workflows/project-showcase-sync.yml#Project Showcase Sync > sync-showcase > Run project showcase sync (when: scheduled, workflow-dispatch)

### `lpd`
- Purpose: Utility script for lpd.
- Template compliance: FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes)
- Role tags: runner
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `snippets/automations/youtube/filterVideos.js`
- Purpose: Utility script for filterVideos.
- Template compliance: FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes)
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tasks/scripts/audit-minimal.js`
- Purpose: Utility script for tasks/scripts/audit-minimal.js.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tasks/scripts/audit-python.py`
- Purpose: Utility script for tasks/scripts/audit-python.py.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tasks/scripts/run-audit-now.js`
- Purpose: Utility script for tasks/scripts/run-audit-now.js.
- Template compliance: PASS
- Role tags: audit, runner
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tasks/scripts/test-audit.js`
- Purpose: Utility script for tasks/scripts/test-audit.js.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tests/integration/browser.test.js`
- Purpose: Utility script for tests/integration/browser.test.js.
- Template compliance: PASS
- Role tags: ci, enforcement, test
- Run-context tags: manual, npm-script, pr, push
- Used by:
  - package-script: tests/package.json#scripts.test:browser (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:browser (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:browser:all (when: manual, npm-script)
  - workflow: .github/workflows/test-suite.yml#Docs CI - Content Quality Suite > test-suite > Run Browser Tests (All Pages) (when: npm-script, pr, push)

### `tests/integration/domain-pages-audit.js`
- Purpose: Audit deployed docs page load status and emit a stable JSON report.
- Template compliance: PASS
- Role tags: audit, enforcement, hook, test
- Run-context tags: manual, npm-script, pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 547 (when: pre-commit)
  - hook: .githooks/pre-commit#line 642 (when: pre-commit)
  - package-script: tests/package.json#scripts.test:domain (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:domain:both (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:domain:v1 (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:domain:v2 (when: manual, npm-script)

### `tests/integration/v2-link-audit.js`
- Purpose: Comprehensive V2 MDX link audit with report and domain link map outputs.
- Template compliance: PASS
- Role tags: audit, enforcement, hook, test
- Run-context tags: manual, npm-script, pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 532 (when: pre-commit)
  - hook: .githooks/pre-commit#line 627 (when: pre-commit)
  - package-script: tests/package.json#scripts.test:link-audit (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:link-audit:staged (when: manual, npm-script)

### `tests/integration/v2-wcag-audit.js`
- Purpose: Audit v2 docs accessibility (WCAG 2.2 AA) with deterministic reports and conservative source autofixes.
- Template compliance: PASS
- Role tags: audit, enforcement, hook, test
- Run-context tags: manual, npm-script, pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 497 (when: pre-commit)
  - hook: .githooks/pre-commit#line 592 (when: pre-commit)
  - package-script: tests/package.json#scripts.test:wcag (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:wcag:nofix (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:wcag:staged (when: manual, npm-script)

### `tests/integration/v2-wcag-audit.selftest.js`
- Purpose: Script-level self-tests for the v2 WCAG audit (local HTTP + Puppeteer axe run, and temp-file fix/stage behavior without Mintlify).
- Template compliance: PASS
- Role tags: audit, test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:wcag:selftest (when: manual, npm-script)

### `tests/run-all.js`
- Purpose: Utility script for tests/run-all.js.
- Template compliance: PASS
- Role tags: enforcement, hook, runner, test
- Run-context tags: manual, npm-script, pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 460 (when: pre-commit)
  - hook: .githooks/pre-commit#line 508 (when: pre-commit)
  - hook: .githooks/pre-commit#line 603 (when: pre-commit)
  - package-script: tests/package.json#scripts.test (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test (when: manual, npm-script)

### `tests/run-pr-checks.js`
- Purpose: Run changed-file scoped validation checks for pull request CI.
- Template compliance: PASS
- Role tags: ci, enforcement, runner, sync, test
- Run-context tags: manual, npm-script, pr, push
- Used by:
  - package-script: tests/package.json#scripts.test:pr (when: manual, npm-script)
  - workflow: .github/workflows/test-suite.yml#Docs CI - Content Quality Suite > test-suite > Run PR Changed-File Checks (when: npm-script, pr, push)

### `tests/unit/docs-guide-sot.test.js`
- Purpose: Validate docs-guide source-of-truth coverage, README pointers, and generated index freshness.
- Template compliance: PASS
- Role tags: enforcement, generator, hook, test
- Run-context tags: pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 521 (when: pre-commit)
  - hook: .githooks/pre-commit#line 524 (when: pre-commit)
  - hook: .githooks/pre-commit#line 616 (when: pre-commit)
  - hook: .githooks/pre-commit#line 619 (when: pre-commit)

### `tests/unit/docs-navigation.test.js`
- Purpose: Validate docs.json page-entry syntax, report missing routes, suggest remaps, and optionally apply approved remaps.
- Template compliance: PASS
- Role tags: audit, enforcement, test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:docs-nav (when: manual, npm-script)

### `tests/unit/docs-usefulness-accuracy-verifier.test.js`
- Purpose: Validate source-weighted 2026 accuracy verification rules (GitHub vs DeepWiki precedence, freshness, fallback, and cache reuse).
- Template compliance: PASS
- Role tags: enforcement, test
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tests/unit/links-imports.test.js`
- Purpose: Utility script for tests/unit/links-imports.test.js.
- Template compliance: PASS
- Role tags: test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:links (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:links (when: manual, npm-script)

### `tests/unit/mdx-guards.test.js`
- Purpose: Enforce MDX guardrails for globals imports, math delimiters, and markdown table line breaks.
- Template compliance: PASS
- Role tags: enforcement, test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:mdx:guards (when: manual, npm-script)

### `tests/unit/mdx.test.js`
- Purpose: Utility script for tests/unit/mdx.test.js.
- Template compliance: PASS
- Role tags: test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:mdx (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:mdx (when: manual, npm-script)

### `tests/unit/quality.test.js`
- Purpose: Utility script for tests/unit/quality.test.js.
- Template compliance: PASS
- Role tags: test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:quality (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:quality (when: manual, npm-script)

### `tests/unit/script-docs.test.js`
- Purpose: Enforce script header schema, keep group script indexes in sync, and build aggregate script index.
- Template compliance: PASS
- Role tags: enforcement, generator, hook, sync, test
- Run-context tags: manual, npm-script, pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 469 (when: pre-commit)
  - hook: .githooks/pre-commit#line 564 (when: pre-commit)
  - package-script: tests/package.json#scripts.test:scripts (when: manual, npm-script)

### `tests/unit/spelling.test.js`
- Purpose: Utility script for tests/unit/spelling.test.js.
- Template compliance: PASS
- Role tags: test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:spell (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:spell (when: manual, npm-script)

### `tests/unit/style-guide.test.js`
- Purpose: Utility script for tests/unit/style-guide.test.js.
- Template compliance: PASS
- Role tags: test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:style (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:style (when: manual, npm-script)

### `tests/unit/v2-wcag-audit.test.js`
- Purpose: Unit tests for v2 WCAG audit helper logic (args, thresholds, route mapping, report sorting, and conservative autofixes).
- Template compliance: PASS
- Role tags: audit, test
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tests/package.json#scripts.test:wcag:unit (when: manual, npm-script)

### `tests/utils/file-walker.js`
- Purpose: Utility script for tests/utils/file-walker.js.
- Template compliance: PASS
- Role tags: enforcement, hook, test
- Run-context tags: pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 64 (when: pre-commit)
  - hook: .githooks/verify.sh#line 47 (when: manual)

### `tests/utils/mdx-parser.js`
- Purpose: Utility script for tests/utils/mdx-parser.js.
- Template compliance: PASS
- Role tags: test
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tests/utils/spell-checker.js`
- Purpose: Utility script for tests/utils/spell-checker.js.
- Template compliance: PASS
- Role tags: enforcement, test
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/config/v2-internal-report-pages.js`
- Purpose: Utility script for v2 internal report pages.
- Template compliance: FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes)
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/lib/docs-usefulness/accuracy-verifier.js`
- Purpose: Utility script for accuracy verifier.
- Template compliance: FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes)
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/lib/docs-usefulness/scoring.js`
- Purpose: Utility script for scoring.
- Template compliance: FAIL (missing @script, @summary, @owner, @scope, @usage, @inputs, @outputs, @exit-codes, @examples, @notes)
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/audit-all-pages-simple.js`
- Purpose: Utility script for tasks/scripts/audit-all-pages-simple.js.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/audit-all-pages.js`
- Purpose: Utility script for tasks/scripts/audit-all-pages.js.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/audit-all-v2-pages.js`
- Purpose: Utility script for tools/scripts/audit-all-v2-pages.js.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/audit-component-usage.js`
- Purpose: Utility script for tools/scripts/audit-component-usage.js.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/audit-scripts.js`
- Purpose: Audit full-repo executable scripts, categorize usage/overlap, and overwrite SCRIPT_AUDIT reports.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tools/package.json#scripts.audit:scripts (when: manual, npm-script)

### `tools/scripts/audit-tasks-folders.js`
- Purpose: Audit tasks folders, optionally normalize report locations, and optionally apply audit recommendations with conflict-safe moves.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/audit-v2-usefulness.js`
- Purpose: Audit v2 MDX pages (excluding x-* directories) and emit page-level usefulness matrix rows with source-weighted 2026 accuracy verification fields.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/check-component-errors.js`
- Purpose: Utility script for tools/scripts/check-component-errors.js.
- Template compliance: PASS
- Role tags: enforcement
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/debug-mint-dev.js`
- Purpose: Utility script for tools/scripts/debug-mint-dev.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/deprecated/project-management-output-script.js`
- Purpose: Deprecated legacy project-management output script retained as a reference stub.
- Template compliance: PASS
- Role tags: deprecated, fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/add-callouts.js`
- Purpose: Utility script for tools/scripts/dev/add-callouts.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/batch-update-og-image.sh`
- Purpose: Utility script for tools/scripts/dev/batch-update-og-image.sh.
- Template compliance: PASS
- Role tags: sync
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/replace-og-image.py`
- Purpose: Utility script for tools/scripts/dev/replace-og-image.py.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/seo-generator-safe.js`
- Purpose: Utility script for tools/scripts/dev/seo-generator-safe.js.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/test-add-callouts.js`
- Purpose: Utility script for tools/scripts/dev/test-add-callouts.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/test-seo-generator.js`
- Purpose: Utility script for tools/scripts/dev/test-seo-generator.js.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/update-all-og-images.js`
- Purpose: Utility script for tools/scripts/dev/update-all-og-images.js.
- Template compliance: PASS
- Role tags: sync
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/dev/update-og-image.js`
- Purpose: Utility script for tools/scripts/dev/update-og-image.js.
- Template compliance: PASS
- Role tags: sync
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/download-linkedin-video.sh`
- Purpose: Utility script for tools/scripts/download-linkedin-video.sh.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/download-linkedin-with-cookies.sh`
- Purpose: Utility script for tools/scripts/download-linkedin-with-cookies.sh.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/final-verification.js`
- Purpose: Utility script for tools/scripts/final-verification.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/find-correct-url.js`
- Purpose: Utility script for tools/scripts/find-correct-url.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/generate-docs-guide-indexes.js`
- Purpose: Generate docs-guide workflow/template indexes and optionally verify they are up to date.
- Template compliance: PASS
- Role tags: enforcement, generator
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tools/package.json#scripts.docs-guide:indexes (when: manual, npm-script)

### `tools/scripts/generate-pages-index.js`
- Purpose: Generate and verify section-style index.mdx files for v2 docs folders, plus the root aggregate index.
- Template compliance: PASS
- Role tags: enforcement, generator, hook
- Run-context tags: manual, npm-script, pre-commit
- Used by:
  - hook: .githooks/pre-commit#line 483 (when: pre-commit)
  - hook: .githooks/pre-commit#line 578 (when: pre-commit)
  - package-script: tests/package.json#scripts.test:pages-index (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:pages-index:rebuild (when: manual, npm-script)
  - package-script: tests/package.json#scripts.test:pages-index:write (when: manual, npm-script)

### `tools/scripts/inspect-page.js`
- Purpose: Utility script for tools/scripts/inspect-page.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/inspect-video-page.js`
- Purpose: Utility script for tools/scripts/inspect-video-page.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/mint-dev.sh`
- Purpose: Utility script for tools/scripts/mint-dev.sh.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/new-script.js`
- Purpose: Create a new script file prefilled with the required docs header template.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/publish-v2-internal-reports.js`
- Purpose: Duplicate approved markdown reports into v2/internal/reports pages with metadata and update docs.json.
- Template compliance: PASS
- Role tags: audit, sync
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/snippets/fetch-external-docs.sh`
- Purpose: Utility script for tools/scripts/snippets/fetch-external-docs.sh.
- Template compliance: PASS
- Role tags: ci, enforcement, sync
- Run-context tags: manual, npm-script, pr, push
- Used by:
  - package-script: tools/package.json#scripts.fetch-docs (when: manual, npm-script)
  - package-script: tools/package.json#scripts.prebuild (when: manual, npm-script)
  - workflow: .github/workflows/broken-links.yml#Check Broken Links > broken-links > Fetch external snippets (when: pr)
  - workflow: .github/workflows/test-suite.yml#Docs CI - Content Quality Suite > test-suite > Fetch external snippets (when: pr, push)
  - workflow: .github/workflows/test-v2-pages.yml#Docs CI - V2 Browser Sweep > test-pages > Fetch external snippets (when: pr, push)

### `tools/scripts/snippets/fetch-lpt-exchanges.sh`
- Purpose: Utility script for tools/scripts/snippets/fetch-lpt-exchanges.sh.
- Template compliance: PASS
- Role tags: sync
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/snippets/fetch-openapi-specs.sh`
- Purpose: Utility script for tools/scripts/snippets/fetch-openapi-specs.sh.
- Template compliance: PASS
- Role tags: sync
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/snippets/generate-api-docs.sh`
- Purpose: Utility script for tools/scripts/snippets/generate-api-docs.sh.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/snippets/generate-data/scripts/generate-glossary.js`
- Purpose: Utility script for tools/scripts/snippets/generate-data/scripts/generate-glossary.js.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/snippets/generate-data/scripts/terminology-search.js`
- Purpose: Utility script for tools/scripts/snippets/generate-data/scripts/terminology-search.js.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/snippets/generate-seo.js`
- Purpose: Utility script for tools/scripts/snippets/generate-seo.js.
- Template compliance: PASS
- Role tags: generator
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tools/package.json#scripts.generate-seo (when: manual, npm-script)
  - package-script: tools/package.json#scripts.generate-seo:dry-run (when: manual, npm-script)

### `tools/scripts/snippets/test-scripts.sh`
- Purpose: Utility script for tools/scripts/snippets/test-scripts.sh.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/snippets/update-component-library.sh`
- Purpose: Utility script for tools/scripts/snippets/update-component-library.sh.
- Template compliance: PASS
- Role tags: sync
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test-all-pages-browser.js`
- Purpose: Utility script for tools/scripts/test-all-pages-browser.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test-all-pages-comprehensive.js`
- Purpose: Utility script for tools/scripts/test-all-pages-comprehensive.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test-v2-pages.js`
- Purpose: Utility script for tools/scripts/test-v2-pages.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual, npm-script
- Used by:
  - package-script: tools/package.json#scripts.test:all-pages (when: manual, npm-script)
  - package-script: tools/package.json#scripts.test:v2-pages (when: manual, npm-script)

### `tools/scripts/test-youtube-pages.js`
- Purpose: Utility script for tools/scripts/test-youtube-pages.js.
- Template compliance: PASS
- Role tags: helper
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/allowed-script.js`
- Purpose: Utility script for tools/scripts/test/allowed-script.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/allowed-test.js`
- Purpose: Utility script for tools/scripts/test/allowed-test.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/allowed.js`
- Purpose: Utility script for tools/scripts/test/allowed.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/check-component-errors.js`
- Purpose: Utility script for tools/scripts/test/check-component-errors.js.
- Template compliance: PASS
- Role tags: enforcement, fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/final-verification.js`
- Purpose: Utility script for tools/scripts/test/final-verification.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/find-correct-url.js`
- Purpose: Utility script for tools/scripts/test/find-correct-url.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/inspect-page.js`
- Purpose: Utility script for tools/scripts/test/inspect-page.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/inspect-video-page.js`
- Purpose: Utility script for tools/scripts/test/inspect-video-page.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/test-youtube-pages.js`
- Purpose: Utility script for tools/scripts/test/test-youtube-pages.js.
- Template compliance: PASS
- Role tags: fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/verify-all-pages.js`
- Purpose: Utility script for tools/scripts/verify-all-pages.js.
- Template compliance: PASS
- Role tags: enforcement, fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/test/verify-pages.js`
- Purpose: Utility script for tools/scripts/verify-pages.js.
- Template compliance: PASS
- Role tags: enforcement, fixture
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/verify-all-pages.js`
- Purpose: Utility script for tools/scripts/verify-all-pages.js.
- Template compliance: PASS
- Role tags: enforcement
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/verify-pages.js`
- Purpose: Utility script for tools/scripts/verify-pages.js.
- Template compliance: PASS
- Role tags: enforcement
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/verify/.verify-large-change.sh`
- Purpose: Reserved verifier hook placeholder for large-change checks.
- Template compliance: PASS
- Role tags: enforcement
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

### `tools/scripts/wcag-repair-common.js`
- Purpose: Apply conservative WCAG-related source autofixes across v2 docs (common raw-tag issues) and write deterministic repair reports.
- Template compliance: PASS
- Role tags: audit
- Run-context tags: manual
- Used by: Manual/on-demand (no direct hook/workflow/package reference found)

## Overlap Clusters

### Cluster 1 (exact)
- Scripts: `tools/scripts/test/allowed-script.js`, `tools/scripts/test/allowed-test.js`, `tools/scripts/test/allowed.js`
- Canonical candidate: `tools/scripts/test/allowed.js`
- Shared role tags: fixture
- Recommendation: Consolidate to `tools/scripts/test/allowed.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 2 (exact)
- Scripts: `tools/scripts/check-component-errors.js`, `tools/scripts/test/check-component-errors.js`
- Canonical candidate: `tools/scripts/check-component-errors.js`
- Shared role tags: enforcement
- Recommendation: Consolidate to `tools/scripts/check-component-errors.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 3 (exact)
- Scripts: `tools/scripts/final-verification.js`, `tools/scripts/test/final-verification.js`
- Canonical candidate: `tools/scripts/final-verification.js`
- Shared role tags: none
- Recommendation: Consolidate to `tools/scripts/final-verification.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 4 (exact)
- Scripts: `tools/scripts/find-correct-url.js`, `tools/scripts/test/find-correct-url.js`
- Canonical candidate: `tools/scripts/find-correct-url.js`
- Shared role tags: none
- Recommendation: Consolidate to `tools/scripts/find-correct-url.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 5 (exact)
- Scripts: `tools/scripts/inspect-page.js`, `tools/scripts/test/inspect-page.js`
- Canonical candidate: `tools/scripts/inspect-page.js`
- Shared role tags: none
- Recommendation: Consolidate to `tools/scripts/inspect-page.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 6 (exact)
- Scripts: `tools/scripts/inspect-video-page.js`, `tools/scripts/test/inspect-video-page.js`
- Canonical candidate: `tools/scripts/inspect-video-page.js`
- Shared role tags: none
- Recommendation: Consolidate to `tools/scripts/inspect-video-page.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 7 (exact)
- Scripts: `tools/scripts/test-youtube-pages.js`, `tools/scripts/test/test-youtube-pages.js`
- Canonical candidate: `tools/scripts/test-youtube-pages.js`
- Shared role tags: none
- Recommendation: Consolidate to `tools/scripts/test-youtube-pages.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 8 (exact)
- Scripts: `tools/scripts/test/verify-all-pages.js`, `tools/scripts/verify-all-pages.js`
- Canonical candidate: `tools/scripts/verify-all-pages.js`
- Shared role tags: enforcement
- Recommendation: Consolidate to `tools/scripts/verify-all-pages.js`; replace duplicates with wrappers or remove after migrating references.

### Cluster 9 (exact)
- Scripts: `tools/scripts/test/verify-pages.js`, `tools/scripts/verify-pages.js`
- Canonical candidate: `tools/scripts/verify-pages.js`
- Shared role tags: enforcement
- Recommendation: Consolidate to `tools/scripts/verify-pages.js`; replace duplicates with wrappers or remove after migrating references.


## Consolidation Recommendations

- Consolidate to `tools/scripts/test/allowed.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/check-component-errors.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/final-verification.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/find-correct-url.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/inspect-page.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/inspect-video-page.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/test-youtube-pages.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/verify-all-pages.js`; replace duplicates with wrappers or remove after migrating references.
- Consolidate to `tools/scripts/verify-pages.js`; replace duplicates with wrappers or remove after migrating references.
