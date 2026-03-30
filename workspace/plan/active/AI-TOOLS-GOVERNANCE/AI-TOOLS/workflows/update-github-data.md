# Workflow Audit Draft: Update GitHub Discussions & Releases Data

- Source path: `.github/workflows/update-github-data.yml`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Update GitHub Discussions & Releases Data runs on schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- .github/scripts/fetch-github-discussions.js
- .github/scripts/fetch-github-releases.js
- action:actions/checkout@v4
- action:actions/setup-node@v4
- secret:GITHUB_TOKEN
- snippets/automations/

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.
