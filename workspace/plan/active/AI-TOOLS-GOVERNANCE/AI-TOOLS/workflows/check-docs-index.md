# Workflow Audit Draft: Check Docs Index

- Source path: `.github/workflows/check-docs-index.yml`
- Concern: `repo-ops`
- Risk level: `low`
- Dispatcher candidate: `review-fix`

## Summary

Check Docs Index runs on pull_request, push, workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generators/content/catalogs/generate-docs-index.js

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
