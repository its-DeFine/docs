# Workflow Audit Draft: Governance sync (post-merge)

- Source path: `.github/workflows/governance-sync.yml`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `repo-cleanup-handover`

## Summary

Governance sync (post-merge) runs on push and primarily produces generated or refreshed repository data.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- action:peter-evans/create-pull-request@v7
- operations/scripts/dispatch/governance/pipelines/governance-pipeline.js
- workspace/reports/repo-ops/REPAIR_REPORT_LATEST.json

## Dependants

- dispatcher:repo-cleanup-handover

## Frailty Notes

- Current heuristic risk level is `high`; no exceptional frailty markers were detected in the file scan.
