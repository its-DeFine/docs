# Workflow Audit Draft: Check Broken Links

- Source path: `.github/workflows/broken-links.yml`
- Concern: `validation`
- Risk level: `medium`
- Dispatcher candidate: `review-fix`

## Summary

Check Broken Links runs on pull_request, workflow_dispatch and primarily produces github step summary.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/automations/content/data/fetching/fetch-external-docs.sh

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Contains advisory steps with `continue-on-error`, so failures may be softened rather than fully blocking.
