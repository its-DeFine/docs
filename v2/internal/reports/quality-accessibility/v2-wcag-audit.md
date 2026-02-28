---
title: 'V2 WCAG Audit Report'
sidebarTitle: 'WCAG Audit'
description: 'Generated WCAG audit report from tests/integration/v2-wcag-audit.js.'
keywords: ["livepeer","internal","reports","quality-accessibility","v2-wcag-audit"]
og:image: "/snippets/assets/domain/SHARED/LivepeerDocsLogo.svg"
---
Last Generated (UTC ISO): `2026-02-28T04:22:56.252Z`
Last Generated (UTC Human): `February 28, 2026 04:22 UTC`
# V2 WCAG Accessibility Audit Report

- Timestamp: 2026-02-27T17:57:06.819Z
- Mode: full
- WCAG Profile: WCAG 2.2 AA
- Fail Threshold: serious
- Base URL: http://localhost:3000
- Fix Enabled (default): yes
- Max Browser Pages: unlimited

## Summary

- Files scanned: 319
- Browser target pages: 319
- Browser-audited pages: 1
- Static-only files: 318
- WCAG violations: 2
- Best-practice violations (advisory): 3
- Incomplete/manual-review results: 1
- Static findings still open: 0
- Static findings auto-fixed: 0
- Autofix edits applied: 0
- Blocking WCAG/static issues (>= serious): 0
- Browser audit completion: incomplete (1/319)

## Blocking Issues

_No blocking issues found at configured threshold._

## Top Rules And Suggestions

- **color-contrast** (1) - Adjust foreground/background colors to meet WCAG contrast minimums; avoid relying on color alone.
- **meta-viewport** (1) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.

## Autofixes Applied

_No autofixes applied._

## Static-Only Findings

_No open static-only findings._

## Notes

- Automated WCAG checks are partial coverage and do not replace manual accessibility review (keyboard, screen-reader UX, content meaning, and task flows).
- Advisory-only WCAG rules (non-blocking): color-contrast.
- Best-practice findings are reported separately as advisory and are not blocking by default.
- Default autofix only applies conservative raw-tag attribute insertions (iframe title, img alt, empty/icon-only anchor aria-label).
