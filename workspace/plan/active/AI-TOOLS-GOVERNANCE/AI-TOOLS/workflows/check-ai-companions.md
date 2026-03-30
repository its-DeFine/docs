# Workflow Audit Draft: Check AI Companion Files

- Source path: `.github/workflows/check-ai-companions.yml`
- Concern: `agent-runtime`
- Risk level: `low`
- Dispatcher candidate: `handover-readiness`

## Summary

Check AI Companion Files runs on pull_request, push, workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generators/content/reference/generate-glossary-companions.js
- operations/scripts/validators/governance/ai/check-companion-manifest.js

## Dependants

- dispatcher:handover-readiness

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
