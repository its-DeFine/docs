# Workflow Audit Draft: Generate AI Sitemap

- Source path: `.github/workflows/generate-ai-sitemap.yml`
- Concern: `agent-runtime`
- Risk level: `high`
- Dispatcher candidate: `handover-readiness`

## Summary

Generate AI Sitemap runs on push, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generate-ai-sitemap.js
- secret:GITHUB_TOKEN

## Dependants

- dispatcher:handover-readiness

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
