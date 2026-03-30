# Workflow Audit Draft: Generate llms.txt

- Source path: `.github/workflows/generate-llms-files.yml`
- Concern: `agent-runtime`
- Risk level: `high`
- Dispatcher candidate: `handover-readiness`

## Summary

Generate llms.txt runs on push, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generate-llms-files.js

## Dependants

- dispatcher:handover-readiness

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
