# Workflow Audit Draft: Check Docs Guide Catalogs

- Source path: `.github/workflows/check-docs-guide-catalogs.yml`
- Concern: `repo-ops`
- Risk level: `low`
- Dispatcher candidate: `review-fix`

## Summary

Check Docs Guide Catalogs runs on pull_request, push, workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generators/components/documentation/generate-component-docs.js
- operations/scripts/generators/components/library/generate-component-examples.js
- operations/scripts/generators/components/library/generate-component-registry.js
- operations/scripts/generators/governance/catalogs/generate-docs-guide-indexes.js
- operations/scripts/generators/governance/catalogs/generate-docs-guide-pages-index.js
- operations/scripts/validators/components/library/check-component-health.js
- operations/tests/unit/quality.test.js

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
