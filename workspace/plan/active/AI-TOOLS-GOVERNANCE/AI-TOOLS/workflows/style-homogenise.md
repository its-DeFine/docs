# Workflow Audit Draft: EN-GB Style Homogenisation

- Source path: `.github/workflows/style-homogenise.yml`
- Concern: `validation`
- Risk level: `high`
- Dispatcher candidate: `review-fix`

## Summary

EN-GB Style Homogenisation runs on workflow_dispatch and primarily produces github issue or pr metadata.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- action:peter-evans/create-pull-request@v7
- operations/scripts/style-and-language-homogenizer-en-gb.js

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Current heuristic risk level is `high`; no exceptional frailty markers were detected in the file scan.
