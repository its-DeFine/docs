# Workflow Audit Draft: Sync Large Assets

- Source path: `.github/workflows/sync-large-assets.yml`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `repo-cleanup-handover`

## Summary

Sync Large Assets runs on push, schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- .github/assets-manifest.txt
- .github/README.md
- action:actions/checkout@v4
- snippets/assets
- snippets/assets/
- v2/assets
- v2/assets/

## Dependants

- dispatcher:repo-cleanup-handover

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Scheduled execution can hide drift until the next cron window.
