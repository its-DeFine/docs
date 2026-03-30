# Workflow Audit Draft: Auto Assign Docs Reviewers

- Source path: `.github/workflows/auto-assign-docs-reviewers.yml`
- Concern: `review`
- Risk level: `high`
- Dispatcher candidate: `review-fix`

## Summary

Auto Assign Docs Reviewers runs on pull_request and primarily produces github issue or pr metadata.

## Dependencies

- action:actions/github-script@v7

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Current heuristic risk level is `high`; no exceptional frailty markers were detected in the file scan.
