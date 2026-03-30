# Workflow Audit Draft: Project Showcase Sync

- Source path: `.github/workflows/project-showcase-sync.yml`
- Concern: `review`
- Risk level: `high`
- Dispatcher candidate: `research-review-packet`

## Summary

Project Showcase Sync runs on repository_dispatch, schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- .github/scripts/project-showcase-sync.js
- action:actions/checkout@v4
- action:actions/setup-node@v4
- secret:GITHUB_TOKEN
- secret:SHOWCASE_DISCORD_BOT_TOKEN
- secret:SHOWCASE_GOOGLE_SERVICE_ACCOUNT_JSON

## Dependants

- dispatcher:research-review-packet

## Frailty Notes

- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.
