---
name: close
description: >-
  Session close skill. Verifies all thread tasks are complete (against the repo, not just the conversation),
  writes the completion report, updates session log, and updates the work streams table.
  Use at the end of any session to replace the repetitive "verify tasks, write report" prompt.
metadata:
  version: "1.0"
  category: process
  status: "active"
---

# SKILL: Close — Session Close

Verifies completion and writes the session record. Run this at the end of any session instead of describing the steps manually.

---

## When to use

- End of any working session
- After `/thread` outcome has been pursued and work is done (or stalled)
- When switching to a different work stream and need to record what was done first

## When NOT to use

- Mid-session check-ins — use TodoWrite status for that
- When nothing was done (just acknowledge no output and skip)

---

## Step 1: State the thread outcome

Read the thread outcome from the current conversation. If `/thread` was run, the outcome was stated at the top.

If no thread was anchored this session, state: "No thread outcome was defined this session." Then proceed to capture what was done anyway.

---

## Step 2: Verify tasks against the repo

Do NOT check the conversation. Check the repo.

Run these in parallel:
- `git status` — what files are modified/staged/untracked
- `git diff --stat HEAD` — what changed since last commit
- Read any relevant plan files or tracker files mentioned in the thread outcome

Then cross-check the task list (TodoWrite) against what the repo shows was actually done.

Report format:
```
Tasks defined: [N]
Tasks verified in repo: [N]
Unverified (conversation-only): [list any]
Uncommitted work: [yes/no — list files if yes]
```

If there is uncommitted work, flag it and ask whether to commit before closing.

---

## Step 3: Evaluate the thread outcome

State clearly:
- **Met** — deliverable exists in the repo or the decision was written to the registry
- **Partially met** — state what was done and what remains, with specific file/decision references
- **Not met** — state why (drift, blocker, scope change) and what the next session picks up

---

## Step 4: Write the completion report

Append to `workspace/plan/active/_Project-Management_/completion-reports.md`.

**Before writing:** Check the last entry in the file. If an entry already exists for today's date and the same initiative, do NOT create a duplicate — update the existing entry or add a continuation note below it.

Follow the template exactly:

```markdown
## [Initiative Name] — [YYYY-MM-DD]

**Plans**: `path/to/plan.md` (or "none" if no plan file)
**Scope**: One-line description of what this session covered.
**Outcome**: Met / Partially met / Not met

### Summary
2–3 sentences. What problem was solved, what approach was taken, what state the repo is in now.

### Completed
Group by phase or initiative. Outcome-oriented bullets — not task checkboxes.

### Decisions Made
| Decision | Rationale |
|---|---|

### Deferred Items
| Item | Priority | Reason | Dependency |
|---|---|---|---|

### Dependencies & Downstream Effects
- **[Affected thing]**: What changed and what it means for consumers.

### Test / Validation State
| Check | Result | Notes |
|---|---|---|

### Recommendations
1. **[Action]** — Why, and what it unblocks.

### Artifacts
| File | Type | Description |
|---|---|---|
```

Omit sections that have nothing to report. Do not leave empty section headers.

---

## Step 5: Update the session log

Append to `workspace/thread-outputs/sessions/session-log.txt`:

```
=== [YYYY-MM-DD HH:MM] ===
Stream: [work stream name]
Outcome: Met / Partially met / Not met
Done: [2-3 bullet points — outcomes, not actions]
Next: [what the next session picks up, if anything]
```

---

## Step 6: Update project state

If this session started, completed, or changed a work stream, update `workspace/plan/active/_Project-Management_/project-state.md` so `session-state.js` reflects the change at next session start.

- If this session **continued** an existing stream: update the status in project-state.md
- If this session **completed** a stream: mark it done
- If this session **started** a new stream: add it

Only edit sections relevant to this session. Do not touch other entries.

---

## Step 7: Confirm close

Output a single close summary:

```
Session closed.

Outcome: [Met / Partially met / Not met]
Report written: workspace/plan/active/_Project-Management_/completion-reports.md
Session log: updated
Work streams: [what changed]

[If uncommitted work]: Uncommitted changes in [files]. Commit before ending?
[If deferred items]: Carrying forward: [list]
```

---

## Principles

1. Repo-check, not conversation-check. The conversation can lie. The repo does not.
2. Never duplicate a report. Check before writing.
3. If outcome was not met, say so plainly — don't soften it.
4. Deferred items are not failures. Log them accurately so the next session starts clean.
