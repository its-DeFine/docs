# Report Generator Rescan

- Scope: `tests`, `tools`, `tasks/scripts`
- Scripts detected: 23
- Publishable markdown (internal): 11
- Uncategorized: 8

## Category Counts

- `navigation-links`: 2
- `page-audits`: 8
- `quality-accessibility`: 2
- `repo-ops`: 3
- `uncategorized`: 8

## `tests/integration/v2-link-audit.js`

- Category: `navigation-links`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `v2-link-audit`
- Summary: Comprehensive V2 MDX link audit with report and domain link map outputs.
- Declared outputs:
  - `Markdown report at tasks/reports/navigation-links/LINK_TEST_REPORT.md (or custom path)`
  - `snippets/data/<domain>/hrefs.jsx files when write-links enabled`

## `tests/unit/docs-navigation.test.js`

- Category: `navigation-links`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `docs-navigation.test`
- Summary: Validate docs.json page-entry syntax, report missing routes, suggest remaps, and optionally apply approved remaps.
- Declared outputs:
  - `tasks/reports/navigation-links/navigation-report.md`
  - `tasks/reports/navigation-links/navigation-report.json`
  - `docs.json (only when --write-remaps is used and user approves entries)`
  - `Console summary of syntax and route-resolution status.`

## `tasks/scripts/audit-python.py`

- Category: `page-audits`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `audit-python`
- Summary: Utility script for tasks/scripts/audit-python.py.
- Declared outputs:
  - `tasks/PLAN/reports/page-audit-python-latest.json`
  - `tasks/PLAN/reports/page-audit-python-latest.md`

## `tests/integration/domain-pages-audit.js`

- Category: `page-audits`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `domain-pages-audit`
- Summary: Audit deployed docs page load status and emit a stable JSON report.
- Declared outputs:
  - `tests/reports/domain-page-load-report.json`

## `tools/scripts/audit-all-pages-simple.js`

- Category: `page-audits`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `audit-all-pages-simple`
- Summary: Utility script for tasks/scripts/audit-all-pages-simple.js.
- Declared outputs:
  - `tasks/reports/page-audits/page-audit-simple-latest.json`
  - `tasks/reports/page-audits/page-audit-simple-latest.md`

## `tools/scripts/audit-all-pages.js`

- Category: `page-audits`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `audit-all-pages`
- Summary: Utility script for tasks/scripts/audit-all-pages.js.
- Declared outputs:
  - `tasks/reports/page-audits/page-audit-latest.json`
  - `tasks/reports/page-audits/page-audit-latest.md`

## `tools/scripts/audit-all-v2-pages.js`

- Category: `page-audits`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `audit-all-v2-pages`
- Summary: Utility script for tools/scripts/audit-all-v2-pages.js.
- Declared outputs:
  - `Console output and/or file updates based on script purpose.`

## `tools/scripts/test-all-pages-browser.js`

- Category: `page-audits`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `test-all-pages-browser`
- Summary: Utility script for tools/scripts/test-all-pages-browser.js.
- Declared outputs:
  - `Console output and/or file updates based on script purpose.`

## `tools/scripts/test-all-pages-comprehensive.js`

- Category: `page-audits`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `test-all-pages-comprehensive`
- Summary: Utility script for tools/scripts/test-all-pages-comprehensive.js.
- Declared outputs:
  - `tasks/reports/page-audits/browser-test-report.json`
  - `tasks/reports/page-audits/browser-test-report.md`

## `tools/scripts/test-v2-pages.js`

- Category: `page-audits`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `test-v2-pages`
- Summary: Utility script for tools/scripts/test-v2-pages.js.
- Declared outputs:
  - `Console output and/or file updates based on script purpose.`

## `tests/integration/v2-wcag-audit.js`

- Category: `quality-accessibility`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `v2-wcag-audit`
- Summary: Audit v2 docs accessibility (WCAG 2.2 AA) with deterministic reports and conservative source autofixes.
- Declared outputs:
  - `tasks/reports/quality-accessibility/v2-wcag-audit-report.md (default full/manual report)`
  - `tasks/reports/quality-accessibility/v2-wcag-audit-report.json (default full/manual report)`
  - `Console summary`
  - `v2/*.mdx or v2/*.md changes only when --fix (default) applies conservative autofixes`

## `tools/scripts/audit-v2-usefulness.js`

- Category: `quality-accessibility`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `audit-v2-usefulness`
- Summary: Audit v2 MDX pages (excluding x-* directories) and emit page-level usefulness matrix rows with source-weighted 2026 accuracy verification fields.
- Declared outputs:
  - `page-matrix.jsonl (canonical rows with accuracy verification fields)`
  - `page-matrix.csv (flattened matrix with human/agent usefulness scores and flags)`
  - `run-metadata.json (run config, counts, and source policy)`
  - `summary.md (human-readable audit summary)`

## `tools/scripts/audit-component-usage.js`

- Category: `repo-ops`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `false`
- Script ID: `audit-component-usage`
- Summary: Utility script for tools/scripts/audit-component-usage.js.
- Declared outputs:
  - `tasks/reports/repo-ops/component-usage-audit.json`

## `tools/scripts/audit-scripts.js`

- Category: `repo-ops`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `audit-scripts`
- Summary: Audit full-repo executable scripts, categorize usage/overlap, and overwrite SCRIPT_AUDIT reports.
- Declared outputs:
  - `tasks/reports/repo-ops/SCRIPT_AUDIT.md`
  - `tasks/reports/repo-ops/SCRIPT_AUDIT.json`

## `tools/scripts/audit-tasks-folders.js`

- Category: `repo-ops`
- Output behavior: `stable-overwrite`
- Publishable markdown to internal: `true`
- Script ID: `audit-tasks-folders`
- Summary: Audit tasks folders, optionally normalize report locations, and optionally apply audit recommendations with conflict-safe moves.
- Declared outputs:
  - `tasks/reports/repo-ops/*_audit.md (one report per audited folder, plus tasks_root_audit.md)`
  - `File moves/deletes in tasks/reports + tasks/report when --apply is set`
  - `tasks/reports/repo-ops/recommendation-apply-summary.json when --apply-recommendations is set (non dry-run)`
  - `tasks/reports/repo-ops/recommendation-conflicts.md when conflicts exist (non dry-run)`

## `tasks/scripts/audit-minimal.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `audit-minimal`
- Summary: Utility script for tasks/scripts/audit-minimal.js.
- Declared outputs:
  - `Console output and/or file updates based on script purpose.`

## `tasks/scripts/run-audit-now.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `run-audit-now`
- Summary: Utility script for tasks/scripts/run-audit-now.js.
- Declared outputs:
  - `Console output and/or file updates based on script purpose.`

## `tasks/scripts/test-audit.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `test-audit`
- Summary: Utility script for tasks/scripts/test-audit.js.
- Declared outputs:
  - `Console output and/or file updates based on script purpose.`

## `tests/integration/v2-wcag-audit.selftest.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `v2-wcag-audit.selftest`
- Summary: Script-level self-tests for the v2 WCAG audit (local HTTP + Puppeteer axe run, and temp-file fix/stage behavior without Mintlify).
- Declared outputs:
  - `Console test summary.`
  - `Temporary /tmp reports.`
  - `Temporary repo file under v2/internal/ during test (cleaned up before exit).`

## `tests/run-pr-checks.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `run-pr-checks`
- Summary: Run changed-file scoped validation checks for pull request CI.
- Declared outputs:
  - `Console summary`
  - `GitHub step summary table when GITHUB_STEP_SUMMARY is set`

## `tools/lib/docs-usefulness/accuracy-verifier.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Output literals:
  - `livepeer-docs-usefulness-audit/1.0`

## `tools/scripts/dev/update-all-og-images.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `update-all-og-images`
- Summary: Utility script for tools/scripts/dev/update-all-og-images.js.
- Declared outputs:
  - `Console output and/or file updates based on script purpose.`

## `tools/scripts/publish-v2-internal-reports.js`

- Category: `uncategorized`
- Output behavior: `unknown`
- Publishable markdown to internal: `false`
- Script ID: `publish-v2-internal-reports`
- Summary: Duplicate approved markdown reports into v2/internal/reports pages with metadata and update docs.json.
- Declared outputs:
  - `v2/internal/reports/<category>/<page>.md (generated docs pages)`
  - `docs.json (Internal Hub report groups only)`

