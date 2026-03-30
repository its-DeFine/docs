# Workflow Audit Draft: Verify AI Sitemap

- Source path: `.github/workflows/verify-ai-sitemap.yml`
- Concern: `agent-runtime`
- Risk level: `low`
- Dispatcher candidate: `handover-readiness`

## Summary

Verify AI Sitemap runs on pull_request, push, workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generate-ai-sitemap.js

## Dependants

- dispatcher:handover-readiness

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
