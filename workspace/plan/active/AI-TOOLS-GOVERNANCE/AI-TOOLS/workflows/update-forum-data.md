# Workflow Audit Draft: Update Forum Data

- Source path: `.github/workflows/update-forum-data.yml`
- Workflow family: `data-refresh`
- Cleanup decision: `merge`
- Usage status: `compatibility-wrapper`
- Process fit: `legacy-or-unclear`
- Concern: `authoring`
- Risk level: `medium`
- Dispatcher candidate: `page-ship`
- Consolidation target: `data-refresh-governance`

## Summary

Update Forum Data runs on schedule, workflow_dispatch and primarily produces generated or refreshed repository data.

## Recommended Engineering Action

Keep this as a thin compatibility wrapper until the Actions vs n8n ownership decision is resolved, then either retire it or keep only the canonical reusable workflow.

## Dependencies

- No direct dependencies identified in current repo scan.

## Dependants

- dispatcher:page-ship

## Frailty Notes

- No local repo dependencies were detected automatically; verify whether this is truly standalone.
- Scheduled execution can hide drift until the next cron window.

## Cleanup Rationale

- Dual ownership between Actions and n8n is governance debt.
- This belongs to a repeating data-refresh pattern and should not stay as an uncoordinated top-level workflow forever.
- This wrapper should not regain unique logic.
- Workflow comments explicitly say n8n is being used as an alternative.
