# Workflow Audit Draft: Check Docs Index

- Source path: `.github/workflows/check-docs-index.yml`
- Workflow family: `docs-catalog-governance`
- Cleanup decision: `merge`
- Usage status: `active`
- Process fit: `core-shipping`
- Concern: `repo-ops`
- Risk level: `low`
- Dispatcher candidate: `review-fix`
- Consolidation target: `future:docs-catalog-governance-workflow`

## Summary

Check Docs Index runs on pull_request, push, workflow_dispatch and primarily produces workflow logs and job status.

## Recommended Engineering Action

Merge this workflow with its sibling family into `future:docs-catalog-governance-workflow` so one workflow owns both check and write modes.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generators/content/catalogs/generate-docs-index.js

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.

## Cleanup Rationale

- This family already has obvious check/generate pairings that likely want one governed workflow with mode flags.
