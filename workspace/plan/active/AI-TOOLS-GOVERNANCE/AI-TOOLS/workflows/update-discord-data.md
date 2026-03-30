# Workflow Audit Draft: Update Discord Announcements Data

- Source path: `.github/workflows/update-discord-data.yml`
- Workflow family: `data-refresh`
- Cleanup decision: `consolidate`
- Usage status: `active-mutating`
- Process fit: `core-shipping`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`
- Consolidation target: `future:data-refresh-dispatcher`

## Summary

Update Discord Announcements Data runs on schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Recommended Engineering Action

Consolidate this workflow under `future:data-refresh-dispatcher` and keep the script or validator layer as the reusable implementation boundary.

## Dependencies

- .github/scripts/fetch-discord-announcements.js
- action:actions/checkout@v4
- action:actions/setup-node@v4
- secret:DISCORD_BOT_TOKEN
- secret:GITHUB_TOKEN
- snippets/automations/

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.

## Cleanup Rationale

- This belongs to a repeating data-refresh pattern and should not stay as an uncoordinated top-level workflow forever.
- This workflow writes back to the repository, so its blast radius is higher than a read-only validation workflow.
