# Workflow Audit Draft: Generate Component Registry

- Source path: `.github/workflows/generate-component-registry.yml`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `review-fix`

## Summary

Generate Component Registry runs on push, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- docs-guide/config/component-registry-schema.json
- docs-guide/config/component-registry.json
- operations/scripts/generators/components/library/generate-component-registry.js
- secret:GITHUB_TOKEN

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
