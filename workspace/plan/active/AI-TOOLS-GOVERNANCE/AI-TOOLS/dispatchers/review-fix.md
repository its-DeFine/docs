# Dispatcher Audit Draft: Review Fix

- Source path: `workspace/plan/active/AI-TOOLS-GOVERNANCE/architecture-audit.md`
- Concern: `review`
- Status: `active`

## Summary

Review Fix is a governed dispatcher concept that coordinates 4 child capability surfaces into one named workflow.

## Child Skills

- `docs-review-packet-generation`
- `docs-review-fix-execution`
- `staged-test-suite-runner`
- `precommit-failure-triage`

## Risks

- Different review surfaces still use different evidence formats.
- Not every workflow failure maps cleanly to one existing atomic skill yet.
