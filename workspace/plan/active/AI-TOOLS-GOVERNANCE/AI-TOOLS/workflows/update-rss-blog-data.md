# Workflow Audit Draft: Update RSS Blog Data

- Source path: `.github/workflows/update-rss-blog-data.yml`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Update RSS Blog Data runs on schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- .github/scripts/fetch-rss-blog-data.js
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
