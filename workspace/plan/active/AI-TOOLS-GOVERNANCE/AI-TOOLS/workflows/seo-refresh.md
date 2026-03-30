# Workflow Audit Draft: SEO Metadata Refresh

- Source path: `.github/workflows/seo-refresh.yml`
- Workflow family: `content-publication`
- Cleanup decision: `consolidate`
- Usage status: `active`
- Process fit: `core-shipping`
- Concern: `authoring`
- Risk level: `low`
- Dispatcher candidate: `page-ship`
- Consolidation target: `dispatcher:page-ship`

## Summary

SEO Metadata Refresh runs on workflow_dispatch and primarily produces workflow logs and job status.

## Recommended Engineering Action

Consolidate this workflow under `dispatcher:page-ship` and keep the script or validator layer as the reusable implementation boundary.

## Dependencies

- action:actions/checkout@v4
- action:actions/setup-node@v4
- operations/scripts/remediators/content/seo/generate-seo.js

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Current heuristic risk level is `low`; no exceptional frailty markers were detected in the file scan.

## Cleanup Rationale

- No additional cleanup rationale recorded.
