# Workflow Audit Draft: Generate Docs Index

- Source path: `.github/workflows/generate-docs-index.yml`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Generate Docs Index runs on push, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/generators/content/catalogs/generate-docs-index.js
- secret:GITHUB_TOKEN

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
