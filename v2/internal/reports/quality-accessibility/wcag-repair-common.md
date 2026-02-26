---
title: 'WCAG Repair Common Report'
sidebarTitle: 'WCAG Repair'
description: 'Generated WCAG repair report from tools/scripts/wcag-repair-common.js.'
keywords: ["livepeer","internal","reports","quality-accessibility","wcag-repair-common"]
og:image: "/snippets/assets/domain/SHARED/LivepeerDocsLogo.svg"
---
# V2 WCAG Accessibility Audit Report

- Timestamp: 2026-02-24T12:38:31.673Z
- Mode: full
- WCAG Profile: WCAG 2.2 AA
- Fail Threshold: serious
- Base URL: (none / static-only run)
- Fix Enabled (default): yes
- Max Browser Pages: 0

## Summary

- Files scanned: 421
- Browser target pages: 0
- Browser-audited pages: 0
- Static-only files: 421
- WCAG violations: 0
- Best-practice violations (advisory): 0
- Incomplete/manual-review results: 0
- Static findings still open: 0
- Static findings auto-fixed: 10
- Autofix edits applied: 10
- Runtime/navigation failures: 0
- Blocking issues (>= serious) + runtime failures: 0

## Blocking Issues

_No blocking issues found at configured threshold._

## Top Rules And Suggestions

_No suggestions generated._

## Autofixes Applied

- `v2/developers/builder-opportunities/dev-programs.mdx`:15 - raw-iframe-missing-title -> added title="Embedded content from livepeer.org" (review suggested)
- `v2/developers/developer-guide.mdx`:17 - raw-iframe-missing-title -> added title="Embedded content from livepeer.org" (review suggested)
- `v2/developers/technical-references/deepwiki.mdx`:30 - raw-iframe-missing-title -> added title="Embedded content from deepwiki.com" (review suggested)
- `v2/gateways/about-gateways/gateway-explainer.mdx`:335 - raw-iframe-missing-title -> added title="Embedded content from cdn.jsdelivr.net" (review suggested)
- `v2/gateways/run-a-gateway/requirements/on-chain setup/fund-gateway.mdx`:125 - raw-iframe-missing-title -> added title="Embedded content from docs.arbitrum.io" (review suggested)
- `v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx`:256 - raw-iframe-missing-title -> added title="Embedded content from docs.arbitrum.io" (review suggested)
- `v2/gateways/run-a-gateway/requirements/on-chain setup/on-chain.mdx`:264 - raw-iframe-missing-title -> added title="Embedded content from docs.arbitrum.io" (review suggested)
- `v2/home/about-livepeer/ecosystem.mdx`:293 - raw-iframe-missing-title -> added title="Embedded content from imgflip.com" (review suggested)
- `v2/internal/ally-notes.mdx`:179 - raw-iframe-missing-title -> added title="Embedded content from cdn.jsdelivr.net" (review suggested)
- `v2/platforms/embody/overview.mdx`:22 - raw-iframe-missing-title -> added title="Embedded content from embody.zone" (review suggested)

## Static-Only Findings

_No open static-only findings._

## Runtime / Navigation Failures

_No runtime/navigation failures._

## Notes

- Automated WCAG checks are partial coverage and do not replace manual accessibility review (keyboard, screen-reader UX, content meaning, and task flows).
- Best-practice findings are reported separately as advisory and are not blocking by default.
- Default autofix only applies conservative raw-tag attribute insertions (iframe title, img alt, empty/icon-only anchor aria-label).
