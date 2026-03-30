# Workflow Audit Draft: Update Changelogs

- Source path: `.github/workflows/update-changelogs.yml`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Update Changelogs runs on repository_dispatch, schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- .github/scripts/generate-changelog.js
- action:actions/checkout@v4
- action:actions/setup-node@v4
- secret:ARBISCAN_API_KEY
- secret:ETHERSCAN_API_KEY
- secret:GITHUB_TOKEN
- secret:GITLAB_TOKEN
- secret:OPENROUTER_API_KEY
- v2/resources/changelog/
- v2/solutions/

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Contains advisory steps with `continue-on-error`, so failures may be softened rather than fully blocking.
- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.
