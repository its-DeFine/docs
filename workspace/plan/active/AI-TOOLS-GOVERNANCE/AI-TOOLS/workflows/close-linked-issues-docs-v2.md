# Workflow Audit Draft: Close Linked Issues (docs-v2 Merge)

- Source path: `.github/workflows/close-linked-issues-docs-v2.yml`
- Concern: `review`
- Risk level: `low`
- Dispatcher candidate: `review-fix`

## Summary

Close Linked Issues (docs-v2 Merge) runs on pull_request and primarily produces workflow logs and job status.

## Dependencies

- action:actions/github-script@v7

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
