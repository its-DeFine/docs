# Workflow Audit Draft: Verify llms.txt Files

- Source path: `.github/workflows/verify-llms-files.yml`
- Concern: `agent-runtime`
- Risk level: `low`
- Dispatcher candidate: `handover-readiness`

## Summary

Verify llms.txt Files runs on pull_request, push, workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generate-llms-files.js

## Dependants

- dispatcher:handover-readiness

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
