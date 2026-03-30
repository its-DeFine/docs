# Workflow Audit Draft: Generate Component Registry

- Source path: `.github/workflows/generate-component-registry.yml`
- Workflow family: `docs-catalog-governance`
- Cleanup decision: `merge`
- Usage status: `active-mutating`
- Process fit: `core-shipping`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `review-fix`
- Consolidation target: `future:docs-catalog-governance-workflow`

## Summary

Generate Component Registry runs on push, workflow_dispatch and primarily produces generated or refreshed repository data.

## Recommended Engineering Action

Merge this workflow with its sibling family into `future:docs-catalog-governance-workflow` so one workflow owns both check and write modes.

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

## Cleanup Rationale

- This family already has obvious check/generate pairings that likely want one governed workflow with mode flags.
- This workflow writes back to the repository, so its blast radius is higher than a read-only validation workflow.
