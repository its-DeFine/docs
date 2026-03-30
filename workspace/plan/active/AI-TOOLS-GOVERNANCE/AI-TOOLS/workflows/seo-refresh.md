# Workflow Audit Draft: SEO Metadata Refresh

- Source path: `.github/workflows/seo-refresh.yml`
- Concern: `authoring`
- Risk level: `low`
- Dispatcher candidate: `page-ship`

## Summary

SEO Metadata Refresh runs on workflow_dispatch and primarily produces workflow logs and job status.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/remediators/content/seo/generate-seo.js

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.
