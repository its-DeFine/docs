# V2 WCAG Accessibility Audit Report

- Timestamp: 2026-02-27T17:08:43.087Z
- Mode: full
- WCAG Profile: WCAG 2.2 AA
- Fail Threshold: serious
- Base URL: http://localhost:3000
- Fix Enabled (default): yes
- Max Browser Pages: unlimited

## Summary

- Files scanned: 319
- Browser target pages: 319
- Browser-audited pages: 317
- Static-only files: 2
- WCAG violations: 657
- Best-practice violations (advisory): 728
- Incomplete/manual-review results: 335
- Static findings still open: 0
- Static findings auto-fixed: 1
- Autofix edits applied: 1
- Blocking WCAG/static issues (>= serious): 23
- Browser audit completion: incomplete (317/319)

## Blocking Issues

- `v2/about/livepeer-protocol/core-mechanisms.mdx` [serious] nested-interactive: Interactive controls must not be nested
- `v2/about/livepeer-protocol/overview.mdx` [serious] nested-interactive: Interactive controls must not be nested
- `v2/about/livepeer-protocol/overview.mdx` [serious] target-size: All touch targets must be 24px large, or leave sufficient space
- `v2/community/livepeer-community/livepeer-latest-topics.mdx` [serious] frame-title: Frames must have an accessible name
- `v2/community/livepeer-community/trending-topics.mdx` [serious] frame-title: Frames must have an accessible name
- `v2/developers/technical-references/awesome-livepeer.mdx` [critical] aria-valid-attr-value: ARIA attributes must conform to valid values
- `v2/gateways/run-a-gateway/quickstart/get-AI-to-setup-the-gateway.mdx` [critical] aria-valid-attr-value: ARIA attributes must conform to valid values
- `v2/home/mission-control.mdx` [critical] aria-valid-attr-value: ARIA attributes must conform to valid values
- `v2/internal/overview/about.mdx` [serious] target-size: All touch targets must be 24px large, or leave sufficient space
- `v2/internal/reports/navigation-links/v2-link-audit.md` [serious] scrollable-region-focusable: Scrollable region must have keyboard access
- `v2/internal/reports/repo-ops/audit-scripts.md` [serious] scrollable-region-focusable: Scrollable region must have keyboard access
- `v2/platforms/livepeer-studio/api-reference/assets/delete.mdx` [critical] button-name: Buttons must have discernible text
- `v2/platforms/livepeer-studio/api-reference/multistream/delete.mdx` [critical] button-name: Buttons must have discernible text
- `v2/platforms/livepeer-studio/api-reference/multistream/update.mdx` [critical] button-name: Buttons must have discernible text
- `v2/platforms/livepeer-studio/api-reference/rooms/delete.mdx` [critical] button-name: Buttons must have discernible text
- `v2/platforms/livepeer-studio/api-reference/rooms/remove-user.mdx` [critical] button-name: Buttons must have discernible text
- `v2/platforms/livepeer-studio/api-reference/streams/delete.mdx` [critical] button-name: Buttons must have discernible text
- `v2/platforms/livepeer-studio/api-reference/streams/update.mdx` [critical] button-name: Buttons must have discernible text
- `v2/platforms/product-hub.mdx` [serious] target-size: All touch targets must be 24px large, or leave sufficient space
- `v2/resources/documentation-guide/component-library/display.mdx` [serious] scrollable-region-focusable: Scrollable region must have keyboard access
- `v2/resources/documentation-guide/component-library/primitives.mdx` [serious] scrollable-region-focusable: Scrollable region must have keyboard access
- `v2/resources/documentation-guide/contribute-to-the-docs.mdx` [critical] label: Form elements must have labels
- `v2/resources/documentation-guide/style-guide.mdx` [serious] scrollable-region-focusable: Scrollable region must have keyboard access

## Top Rules And Suggestions

- **color-contrast** (317) - Adjust foreground/background colors to meet WCAG contrast minimums; avoid relying on color alone.
- **meta-viewport** (317) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **button-name** (7) - Give interactive controls a visible label or accessible name.
- **scrollable-region-focusable** (5) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **aria-valid-attr-value** (3) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **target-size** (3) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **frame-title** (2) - Add a descriptive `title` to each iframe so screen-reader users can identify embedded content.
- **nested-interactive** (2) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **label** (1) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.

## Autofixes Applied

- `v2/internal/overview/docs-philosophy.mdx`:40 - raw-iframe-missing-title -> added title="Embedded content from player.simplecast.com" (review suggested)

## Static-Only Findings

_No open static-only findings._

## Notes

- Automated WCAG checks are partial coverage and do not replace manual accessibility review (keyboard, screen-reader UX, content meaning, and task flows).
- Advisory-only WCAG rules (non-blocking): color-contrast.
- Best-practice findings are reported separately as advisory and are not blocking by default.
- Default autofix only applies conservative raw-tag attribute insertions (iframe title, img alt, empty/icon-only anchor aria-label).
