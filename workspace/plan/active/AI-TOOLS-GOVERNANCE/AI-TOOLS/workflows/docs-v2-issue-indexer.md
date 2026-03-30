# Workflow Audit Draft: Docs v2 Issue Indexer

- Source path: `.github/workflows/docs-v2-issue-indexer.yml`
- Concern: `review`
- Risk level: `medium`
- Dispatcher candidate: `research-review-packet`

## Summary

Docs v2 Issue Indexer runs on issues, schedule, workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- action:actions/github-script@v7

## Dependants

- dispatcher:research-review-packet

## Frailty Notes

- Scheduled execution can hide drift until the next cron window.
