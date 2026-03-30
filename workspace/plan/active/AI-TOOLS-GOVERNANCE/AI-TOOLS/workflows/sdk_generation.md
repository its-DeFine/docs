# Workflow Audit Draft: Generate

- Source path: `.github/workflows/sdk_generation.yaml`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Generate runs on schedule, workflow_dispatch and primarily produces github issue or pr metadata.

## Dependencies

- secret:GITHUB_TOKEN
- secret:SPEAKEASY_API_KEY

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
- Scheduled execution can hide drift until the next cron window.
