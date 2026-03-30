# Workflow Audit Draft: OpenAPI Reference Validation

- Source path: `.github/workflows/openapi-reference-validation.yml`
- Concern: `repo-ops`
- Risk level: `high`
- Dispatcher candidate: `review-fix`

## Summary

OpenAPI Reference Validation runs on pull_request, push, schedule, workflow_dispatch and primarily produces github issue or pr metadata.

## Dependencies

- action:actions/checkout@v4
- action:actions/github-script@v7
- action:actions/setup-node@v4
- action:actions/upload-artifact@v4
- action:peter-evans/create-pull-request@v6
- operations/tests/integration/openapi-reference-audit.js

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Scheduled execution can hide drift until the next cron window.
