# Workflow Audit Draft: workspace/ retention enforcement

- Source path: `.github/workflows/tasks-retention.yml`
- Concern: `repo-ops`
- Risk level: `medium`
- Dispatcher candidate: `repo-cleanup-handover`

## Summary

workspace/ retention enforcement runs on schedule, workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- No direct dependencies identified in current repo scan.

## Dependants

- dispatcher:repo-cleanup-handover

## Frailty Notes

- No local repo dependencies were detected automatically; verify whether this is truly standalone.
- Scheduled execution can hide drift until the next cron window.
