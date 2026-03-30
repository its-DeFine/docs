# Workflow Audit Draft: Generate Docs Index

- Source path: `.github/workflows/generate-docs-index.yml`
- Workflow family: `docs-catalog-governance`
- Cleanup decision: `merge`
- Usage status: `active-mutating`
- Process fit: `core-shipping`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `page-ship`
- Consolidation target: `future:docs-catalog-governance-workflow`

## Summary

Generate Docs Index runs on push, workflow_dispatch and primarily produces generated or refreshed repository data.

## Recommended Engineering Action

Merge this workflow with its sibling family into `future:docs-catalog-governance-workflow` so one workflow owns both check and write modes.

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

## Cleanup Rationale

- This family already has obvious check/generate pairings that likely want one governed workflow with mode flags.
- This workflow writes back to the repository, so its blast radius is higher than a read-only validation workflow.
