# V2 WCAG Accessibility Audit Report

- Timestamp: 2026-02-27T04:23:12.959Z
- Mode: full
- WCAG Profile: WCAG 2.2 AA
- Fail Threshold: serious
- Base URL: http://localhost:3000
- Fix Enabled (default): no
- Max Browser Pages: unlimited

## Summary

- Files scanned: 324
- Browser target pages: 324
- Browser-audited pages: 324
- Static-only files: 0
- WCAG violations: 46
- Best-practice violations (advisory): 32
- Incomplete/manual-review results: 15
- Static findings still open: 2
- Static findings auto-fixed: 0
- Autofix edits applied: 0
- Blocking WCAG/static issues (>= serious): 32

## Blocking Issues

- `v2/about/core-concepts.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/core-concepts.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-network/actors.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-network/actors.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-network/interfaces.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-network/interfaces.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-network/job-lifecycle.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-network/job-lifecycle.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-network/job-lifecycle.mdx` [serious] scrollable-region-focusable: Scrollable region must have keyboard access
- `v2/about/livepeer-network/marketplace.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-network/marketplace.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-network/overview.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-network/overview.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-network/technical-architecture.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-network/technical-architecture.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-overview.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-overview.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-protocol/core-mechanisms.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-protocol/core-mechanisms.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-protocol/core-mechanisms.mdx` [serious] nested-interactive: Interactive controls must not be nested
- `v2/about/livepeer-protocol/economics.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-protocol/economics.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-protocol/governance-model.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-protocol/governance-model.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-protocol/livepeer-token.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-protocol/livepeer-token.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-protocol/overview.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-protocol/overview.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
- `v2/about/livepeer-protocol/overview.mdx` [serious] nested-interactive: Interactive controls must not be nested
- `v2/about/livepeer-protocol/overview.mdx` [serious] target-size: All touch targets must be 24px large, or leave sufficient space
- `v2/about/livepeer-protocol/technical-architecture.mdx` [serious] aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements
- `v2/about/livepeer-protocol/technical-architecture.mdx` [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds

## Top Rules And Suggestions

- **aria-hidden-focus** (14) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **color-contrast** (14) - Adjust foreground/background colors to meet WCAG contrast minimums; avoid relying on color alone.
- **meta-viewport** (14) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **nested-interactive** (2) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **raw-iframe-missing-title** (1) - Add a descriptive title attribute (for example: `Embedded content from player.simplecast.com`).
- **raw-iframe-missing-title** (1) - Add a descriptive title attribute (for example: `Embedded content from creators.spotify.com`).
- **scrollable-region-focusable** (1) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.
- **target-size** (1) - Review the axe rule guidance and update the source/component markup to provide semantic structure and accessible labels.

## Autofixes Applied

_No autofixes applied._

## Static-Only Findings

_No open static-only findings._

## Notes

- Automated WCAG checks are partial coverage and do not replace manual accessibility review (keyboard, screen-reader UX, content meaning, and task flows).
- Best-practice findings are reported separately as advisory and are not blocking by default.
- Default autofix only applies conservative raw-tag attribute insertions (iframe title, img alt, empty/icon-only anchor aria-label).
