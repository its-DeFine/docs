# Workflow Audit Draft: V2 External Link Audit (Advisory)

- Source path: `.github/workflows/v2-external-link-audit.yml`
- Concern: `validation`
- Risk level: `medium`
- Dispatcher candidate: `review-fix`

## Summary

V2 External Link Audit (Advisory) runs on schedule, workflow_dispatch and primarily produces github step summary.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- action:actions/upload-artifact@v4
- operations/tests/integration/v2-link-audit.js

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Contains advisory steps with `continue-on-error`, so failures may be softened rather than fully blocking.
- Scheduled execution can hide drift until the next cron window.
