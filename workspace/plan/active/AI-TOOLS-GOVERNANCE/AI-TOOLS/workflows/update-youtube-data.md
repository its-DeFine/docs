# Workflow Audit Draft: Update YouTube Data

- Source path: `.github/workflows/update-youtube-data.yml`
- Workflow family: `data-refresh`
- Cleanup decision: `needs-investigation`
- Usage status: `legacy-unclear`
- Process fit: `legacy-or-unclear`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`
- Consolidation target: `future:data-refresh-dispatcher`

## Summary

Update YouTube Data runs on schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Recommended Engineering Action

Trace actual runtime use, owner, and downstream dependencies before deciding whether to keep, merge, or retire it. Current nearest dispatcher: `page-ship`.

## Dependencies

- .github/scripts/fetch-youtube-data.js
- action:actions/checkout@v4
- action:actions/setup-node@v4
- secret:GITHUB_TOKEN
- secret:YOUTUBE_API_KEY
- snippets/automations/youtube/youtubeData.jsx

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.

## Cleanup Rationale

- Current repo evidence is not strong enough to justify either deletion or consolidation without tracing real usage first.
- This belongs to a repeating data-refresh pattern and should not stay as an uncoordinated top-level workflow forever.
