# Governance Repair Report

- Date: 2026-03-15T08:17:30.578Z
- Mode: fix
- Verification: PASS

## Pre Repair

- Total scripts: 229
- Grade A/B/C/F: 0/224/5/0
- Pipeline mismatches: 4
- Not in JSON: 0
- Phantom JSON: 0

## Repairs Applied

- Total fixes: 0
- JSON phantoms removed: 0
- JSON entries added: 0
- JSON entries updated: 0
- Header category added: 0
- Header purpose added: 0
- Header owner added: 0
- Header script added: 0
- Header usage added: 0
- Header scope added: 0
- Header needs added: 0
- Header purpose-statement added: 0
- Header pipeline corrected: 0
- Indexes regenerated: false

### Files Modified

- tools/lib/docs-authoring-rules.js
- tools/lib/docs-page-scope.js
- tools/lib/docs-usefulness/config-validator.js
- tools/lib/docs-usefulness/journey-check.js
- tools/lib/docs-usefulness/llm-evaluator.js
- tools/lib/docs-usefulness/prompts/changelog.js
- tools/lib/docs-usefulness/prompts/concept.js
- tools/lib/docs-usefulness/prompts/faq.js
- tools/lib/docs-usefulness/prompts/glossary.js
- tools/lib/docs-usefulness/prompts/how_to.js
- tools/lib/docs-usefulness/prompts/index.js
- tools/lib/docs-usefulness/prompts/landing.js
- tools/lib/docs-usefulness/prompts/overview.js
- tools/lib/docs-usefulness/prompts/reference.js
- tools/lib/docs-usefulness/prompts/troubleshooting.js
- tools/lib/docs-usefulness/prompts/tutorial.js
- tools/lib/docs-usefulness/quality-gate.js
- tools/lib/docs-usefulness/rubric-loader.js
- tools/lib/docs-usefulness/rule-evaluators.js
- tools/lib/docs-usefulness/scoring.js
- tools/lib/frontmatter-taxonomy.js

## Post Repair

- Total scripts: 229
- Grade A/B/C/F: 0/224/5/0
- Pipeline mismatches: 4
- Not in JSON: 0
- Phantom JSON: 0

## Needs Human

- tests/unit/docs-path-sync.test.js: @pipeline
- tests/unit/docs-route-scope.test.js: @pipeline
- tests/unit/mdx-guards.test.js: @scope
- tools/config/v2-internal-report-pages.js: @category
- tools/scripts/cleanup-quarantine-manager.js: @scope
- tools/scripts/remediators/content/sync-docs-paths.js: @pipeline
- tools/scripts/snippets/generate-og-images.js: @purpose
- tools/scripts/snippets/lib/og-image-policy.js: @purpose
- tools/scripts/validators/content/check-docs-path-sync.js: @pipeline

## Warnings

- Skipped staging pre-existing dirty repair targets: tools/lib/docs-authoring-rules.js, tools/lib/docs-page-scope.js, tools/lib/docs-usefulness/config-validator.js, tools/lib/docs-usefulness/journey-check.js, tools/lib/docs-usefulness/llm-evaluator.js, tools/lib/docs-usefulness/prompts/changelog.js, tools/lib/docs-usefulness/prompts/concept.js, tools/lib/docs-usefulness/prompts/faq.js, tools/lib/docs-usefulness/prompts/glossary.js, tools/lib/docs-usefulness/prompts/how_to.js, tools/lib/docs-usefulness/prompts/index.js, tools/lib/docs-usefulness/prompts/landing.js, tools/lib/docs-usefulness/prompts/overview.js, tools/lib/docs-usefulness/prompts/reference.js, tools/lib/docs-usefulness/prompts/troubleshooting.js, tools/lib/docs-usefulness/prompts/tutorial.js, tools/lib/docs-usefulness/quality-gate.js, tools/lib/docs-usefulness/rubric-loader.js, tools/lib/docs-usefulness/rule-evaluators.js, tools/lib/docs-usefulness/scoring.js, tools/lib/frontmatter-taxonomy.js

## Improvement

- Grade A delta: +0
- Grade F delta: +0
- Fixes applied: 0
- Remaining human items: 9

