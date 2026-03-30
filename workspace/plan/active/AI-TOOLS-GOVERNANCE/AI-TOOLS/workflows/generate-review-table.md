# Workflow Audit Draft: Generate Review Table

- Source path: `.github/workflows/generate-review-table.yml`
- Concern: `review`
- Risk level: `low`
- Dispatcher candidate: `page-ship`

## Summary

Generate Review Table runs on workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- No direct dependencies identified in current repo scan.

## Dependants

- dispatcher:page-ship

## Frailty Notes

- No local repo dependencies were detected automatically; verify whether this is truly standalone.
