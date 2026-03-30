# Workflow Audit Draft: Issue Auto Label

- Source path: `.github/workflows/issue-auto-label.yml`
- Concern: `review`
- Risk level: `low`
- Dispatcher candidate: `review-fix`

## Summary

Issue Auto Label runs on issues and primarily produces workflow logs and job status.

## Dependencies

- action:actions/github-script@v7

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
