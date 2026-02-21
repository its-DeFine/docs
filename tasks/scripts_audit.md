# tasks/scripts Audit

Generated: 2026-02-21T06:59:53.831Z
Scope: `tasks/scripts`
Total files in scope: 10

## File Recommendations

| File | Used For | Stale PLAN Paths | Exact Duplicates in tools/scripts | Purpose Overlap in tools/scripts | Recommendation | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| tasks/scripts/audit-all-pages-simple.js | Fast v2 pages audit with file/link checks and report generation (no full browser pass). | no |  | tools/scripts/audit-all-v2-pages.js<br>tools/scripts/test-all-pages-browser.js<br>tools/scripts/test-all-pages-comprehensive.js<br>tools/scripts/test/verify-all-pages.js<br>tools/scripts/verify-all-pages.js | move to tools/scripts | purpose overlap with tools/scripts family |
| tasks/scripts/audit-all-pages.js | Comprehensive v2 pages audit with file checks, link checks, and browser validation. | no |  | tools/scripts/audit-all-v2-pages.js<br>tools/scripts/test-all-pages-browser.js<br>tools/scripts/test-all-pages-comprehensive.js<br>tools/scripts/test/verify-all-pages.js<br>tools/scripts/verify-all-pages.js | move to tools/scripts | purpose overlap with tools/scripts family |
| tasks/scripts/audit-component-usage.js | Component usage inventory across snippets/components, v2 pages, and component docs. | no | tools/scripts/audit-component-usage.js | tools/scripts/audit-tasks-folders.js | archive | exact duplicate by hash/basename in tools/scripts |
| tasks/scripts/audit-minimal.js | Minimal smoke audit that validates docs.json access and checks a subset of pages. | no |  |  | keep in tasks/scripts | no overlap or deprecation signal |
| tasks/scripts/audit-python.py | Python implementation of v2 pages audit with JSON/Markdown report output. | no |  |  | keep in tasks/scripts | no overlap or deprecation signal |
| tasks/scripts/README.md | Tasks/scripts local README and script index anchor. | no | tools/scripts/README.md<br>tools/scripts/snippets/generate-data/README.md | tools/scripts/README-test-v2-pages.md<br>tools/scripts/dev/README-add-callouts.md<br>tools/scripts/dev/README.mdx<br>tools/scripts/dev/SEO-GENERATOR-README.md<br>tools/scripts/snippets/README.mdx | keep in tasks/scripts | folder-level README |
| tasks/scripts/run-audit-direct.sh | Shell wrapper for legacy Python audit and log capture. | yes |  |  | archive | stale tasks/PLAN reference |
| tasks/scripts/run-audit-now.js | Node wrapper to execute comprehensive audit script immediately and mark run status. | no |  |  | keep in tasks/scripts | no overlap or deprecation signal |
| tasks/scripts/run-audit.sh | Shell wrapper to launch legacy simple audit commands and list resulting outputs. | yes |  |  | archive | stale tasks/PLAN reference |
| tasks/scripts/test-audit.js | Sanity check for docs.json parsing and basic audit preconditions. | no |  |  | keep in tasks/scripts | no overlap or deprecation signal |
