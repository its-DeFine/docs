---
title: 'Docs Navigation Route Report'
sidebarTitle: 'Docs Navigation'
description: 'Generated docs.json route validation report from tests/unit/docs-navigation.test.js.'
keywords: ["livepeer","internal","reports","navigation-links","docs-navigation.test"]
og:image: "/snippets/assets/domain/SHARED/LivepeerDocsLogo.svg"
---
Last Generated (UTC ISO): `2026-03-01T04:39:53.754Z`
Last Generated (UTC Human): `March 01, 2026 04:39 UTC`
Generator Script: `tests/unit/docs-navigation.test.js`
What It Does: Validate docs.json page-entry syntax, report missing routes, suggest remaps, and optionally apply approved remaps.
Audited Scope: `tests, docs.json`
Outputs:
- tasks/reports/navigation-links/navigation-report.md
- tasks/reports/navigation-links/navigation-report.json
- docs.json (only when --write-remaps is used and user approves entries)
- Console summary of syntax and route-resolution status.
# Docs Navigation Route Report

- Generated at (UTC): 2026-03-01T03:27:41.359Z
- Entries scanned: 1176
- Syntax errors: 0
- Missing routes: 2
- Missing routes with suggestions: 0

## Syntax Errors

- None

## Missing Routes

- `v2/internal/personas` (normalized: `v2/internal/personas`)
  - Pointer: `navigation.versions[1].languages[0].tabs[8].anchors[0].groups[0].pages[3]`
  - Suggested remaps: none

- `v2/internal/governance` (normalized: `v2/internal/governance`)
  - Pointer: `navigation.versions[1].languages[0].tabs[8].anchors[0].groups[0].pages[4]`
  - Suggested remaps: none
