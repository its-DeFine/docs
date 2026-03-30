# Workflow Audit Draft: Codex Governance

- Source path: `.github/workflows/codex-governance.yml`
- Concern: `agent-runtime`
- Risk level: `medium`
- Dispatcher candidate: `handover-readiness`

## Summary

Codex Governance runs on pull_request and primarily produces workflow logs and job status.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/check-codex-pr-overlap.js
- operations/scripts/validators/governance/compliance/validate-codex-task-contract.js
- secret:GITHUB_TOKEN

## Dependants

- dispatcher:handover-readiness

## Frailty Notes

- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
