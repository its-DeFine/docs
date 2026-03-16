# docs-v2-dev Replacement-Readiness Audit

Date: 2026-03-17
Branch: `codex/20260317-merge-readiness-style-root-cause`
Base comparison: `origin/docs-v2...HEAD`
Scope: compare-scoped routed docs set derived from the PR-check route logic (`356` routed docs)

## Summary

This branch cleared the two remaining compare-scoped content blockers that were assigned in this phase:

- `Style Guide`: compare-scoped errors reduced to `0`
- `Copy Lint`: compare-scoped errors reduced to `0`

The route/static validations that had already been repaired in the earlier navigation phase still hold in this branch:

- `Links & Imports`: passed
- `V2 Link Audit (Strict)`: passed with `0` missing refs
- `Docs Navigation`: passed with warnings only

## Implemented Changes

### Routed-page style root-cause remediation

- Added reusable layout variants in `snippets/components/layout/containers.jsx`
- Added margin props in `snippets/components/layout/layout.jsx`
- Added spacing presets in `snippets/components/primitives/divider.jsx`
- Replaced large inline-style surfaces in compare-scoped gateway pages with component props and structured table primitives
- Rebuilt the gateway configuration flags page onto structured data in `snippets/data/gateways/configuration-flags.js`

### Frontmatter normalization and rendered-review cleanup

- Added missing canonical frontmatter fields across the compare-scoped routed docs:
  - `title`
  - `pageType`
  - `audience`
  - `purpose`
  - `lastVerified`
- Normalized deprecated or missing metadata to canonical values in the compare scope
- Removed rendered `{/* REVIEW: ... */}` author comments from shipped content and rewrote the affected lines so unverified reminders do not ship as rendered content

### Blocking copy-governance cleanup

- Cleared all remaining Tier 1 compare-scoped `Copy Lint` errors:
  - banned words
  - banned phrases
  - self-undermining value constructions
- Rewrote flagged lines directly instead of hiding or suppressing them

## Validation Results

### Compare-scoped blocker checks

- `node tests/unit/style-guide.test.js` via exported `runTests({ files, baseRef: 'docs-v2' })`
  - result: `0` errors, `922` warnings, `348` files checked
- `node tests/unit/copy-lint.test.js` via exported `runTests({ files })`
  - result: `0` errors, `2462` warnings, `349` files checked
- `node tests/unit/mdx.test.js --files "$(paste -sd, /tmp/merge-readiness-routed-docs.txt)"`
  - result: passed, `358` files checked
- `node tests/unit/quality.test.js --files "$(paste -sd, /tmp/merge-readiness-routed-docs.txt)"`
  - result: passed with warnings only, `349` files checked

### Route/static checks

- `node tests/unit/links-imports.test.js --files "$(paste -sd, /tmp/merge-readiness-routed-docs.txt)"`
  - result: passed, `357` files checked
- `node tests/integration/v2-link-audit.js --files "$(paste -sd, /tmp/merge-readiness-routed-docs.txt)" --strict --report /tmp/livepeer-link-audit-merge-readiness-final.md`
  - result: passed
  - files analyzed: `370`
  - total refs: `3207`
  - missing refs: `0`
- `node tests/unit/docs-navigation.test.js`
  - result: passed with warnings only

### Full PR runner attempt

- Attempted: `node tests/run-pr-checks.js --lane branch-health --base-ref docs-v2`
- Result: runner did not progress beyond the startup inventory summary before manual termination
- Captured log: `/tmp/merge-readiness-branch-health.log`
- Action taken: used the direct compare-scoped matrix above as the authoritative validation evidence for this branch

## Non-Blocking Follow-Up Issues Found

These did not fail the compare-scoped blocker gates, but they remain visible in the broader audit output:

- `Quality` warnings remain widespread for missing `status`, legacy multi-audience strings, pageType/purpose mismatches, and relative-link advisories
- `Docs Navigation` warnings remain concentrated in the orchestrators IA and in files that exist on disk but are not represented in `docs.json`
- A raw file-list `Style Guide` CLI run still reports substantial warning-level or non-diff debt outside the base-ref-filtered error set, including:
  - deprecated `ThemeData`
  - hardcoded Mermaid theme colors
  - inline-style debt in additional routed pages
  - code-block metadata gaps
  - filename casing debt

## Readiness Call

Based on the direct compare-scoped validation matrix, this branch clears the two remaining assigned blockers for this phase:

- `Style Guide`
- `Copy Lint`

This branch is ready for the next merge-readiness review step on the `docs-v2...docs-v2-dev` replacement path.

Final unconditional replacement sign-off should still require one of the following:

- a successful completed `branch-health` runner execution, or
- explicit acceptance that the direct compare-scoped matrix above is the authoritative gate while the runner remains unreliable
