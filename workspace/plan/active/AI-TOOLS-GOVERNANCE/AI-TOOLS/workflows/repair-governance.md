# Workflow Audit Draft: Governance Repair

- Source path: `.github/workflows/repair-governance.yml`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `repo-cleanup-handover`

## Summary

Governance Repair runs on schedule, workflow_dispatch and primarily produces github issue or pr metadata.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- action:actions/upload-artifact@v4
- action:peter-evans/create-pull-request@v7
- operations/scripts/dispatch/governance/pipelines/governance-pipeline.js
- workspace/reports/repo-ops/REPAIR_REPORT_LATEST.json

## Dependants

- dispatcher:repo-cleanup-handover

## Frailty Notes

- Scheduled execution can hide drift until the next cron window.
