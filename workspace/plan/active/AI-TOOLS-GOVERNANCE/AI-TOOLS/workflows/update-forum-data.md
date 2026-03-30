# Workflow Audit Draft: Update Forum Data

- Source path: `.github/workflows/update-forum-data.yml`
- Workflow family: `data-refresh`
- Cleanup decision: `needs-investigation`
- Usage status: `legacy-unclear`
- Process fit: `legacy-or-unclear`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`
- Consolidation target: `future:data-refresh-dispatcher`

## Summary

Update Forum Data runs on schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Recommended Engineering Action

Choose one owner path between GitHub Actions and n8n, then remove the duplicate path.

## Dependencies

- .github/scripts/fetch-forum-data.js
- action:actions/checkout@v4
- action:actions/setup-node@v4
- secret:GITHUB_TOKEN
- snippets/automations/forum/forumData.jsx

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.

## Cleanup Rationale

- Current repo evidence is not strong enough to justify either deletion or consolidation without tracing real usage first.
- Dual ownership between Actions and n8n is governance debt.
- This belongs to a repeating data-refresh pattern and should not stay as an uncoordinated top-level workflow forever.
- Workflow comments explicitly say n8n is being used as an alternative.
