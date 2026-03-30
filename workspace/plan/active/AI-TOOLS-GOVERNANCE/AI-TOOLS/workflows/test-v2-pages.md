# Workflow Audit Draft: Docs CI - V2 Browser Sweep

- Source path: `.github/workflows/test-v2-pages.yml`
- Concern: `validation`
- Risk level: `high`
- Dispatcher candidate: `review-fix`

## Summary

Docs CI - V2 Browser Sweep runs on pull_request, push, workflow_dispatch and primarily produces github issue or pr metadata.

## Dependencies

- action:actions/checkout@v4
- action:actions/github-script@v7
- action:actions/setup-node@v4
- action:actions/upload-artifact@v4
- operations/scripts/automations/content/data/fetching/fetch-external-docs.sh
- tools/v2-page-test-report.json

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Uses `localhost:3000`, which conflicts with the repo baseline that forbids port 3000 for local Mintlify sessions.
- Contains advisory steps with `continue-on-error`, so failures may be softened rather than fully blocking.
