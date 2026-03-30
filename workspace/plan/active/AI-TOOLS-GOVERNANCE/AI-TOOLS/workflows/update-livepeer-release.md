# Workflow Audit Draft: Update Livepeer Release Version

- Source path: `.github/workflows/update-livepeer-release.yml`
- Concern: `release`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Update Livepeer Release Version runs on repository_dispatch, schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- action:actions/checkout@v4
- secret:GITHUB_TOKEN
- snippets/automations/globals/globals.jsx

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.
