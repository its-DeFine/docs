---
name: thread
description: >-
  Session anchor skill. Two modes: (1) START — defines outcome and creates task list at session start.
  (2) STATUS — when invoked mid-session or with no arguments, outputs current status snapshot and stops.
  Orient, don't execute. Never re-anchor or restart tasks when a thread is already active.
metadata:
  version: "1.1"
  category: process
  status: "active"
---

# SKILL: Thread — Session Anchor

Every session has one outcome. This skill makes it visible, keeps it visible, and pulls back when work drifts from it.

---

## When to use

- Start of any working session
- When the conversation has drifted from its original goal
- When switching between tasks within a session
- When a new skill is invoked — thread runs underneath
- Mid-session to check status — `/thread` with no arguments always gives status first

## When NOT to use

- Quick one-off questions that don't need session tracking

---

## Step 0: Mode detection — run this first, every time

**Before doing anything else, detect which mode to enter.**

**STATUS mode** — if ANY of the following are true:
- `/thread` was invoked with no arguments
- The user says "status", "where are we", "what's happening", "context", "what have we done", or anything that reads as a check-in rather than a new objective
- A thread outcome was already defined earlier in this conversation

In STATUS mode, output a status snapshot immediately. Do not re-anchor. Do not redefine the outcome. Do not create a new TodoWrite list:

```
Thread status
─────────────────────────────
What this session is: [1-2 plain-English sentences describing the purpose of this session —
what problem we're solving, what we're building, why it matters.
Enough that someone who forgot could instantly reorient.]

Outcome: [the specific deliverable or decision this session is working toward]

Progress:
  ✅ [completed task — outcome phrasing, not action]
  ✅ [completed task]
  🔄 [in-progress task — where it's at]
  ⬜ [pending task]

Last action: [the most recent thing that was done, in one line]
Next: [the next concrete action, or what's blocking]
Backlog: [any deferred items, or "none"]
```

After outputting status, **stop**. Wait for the user to respond. Do not proceed into execution.

**START mode** — only if ALL of the following are true:
- This is the first `/thread` invocation in the conversation
- The user has stated a new session objective with the invocation

In START mode: proceed to Step 1.

---

## Step 1: Define the outcome

If the user has stated a clear outcome, extract it. Do not ask again.

If the message is vague, **propose what you think they mean** and refine:

```
I think you're asking for [X]. Specifically:
- [concrete interpretation 1]
- [concrete interpretation 2]
Is that right, or should I adjust?
```

Never ask "what do you want?" Always propose a concrete interpretation. The user refines from there — that's faster than starting from blank.

The outcome must be:
- **Concrete** — names the deliverable or decision, not a vague direction
- **Testable** — you can verify at the end whether it happened
- **Scoped** — one session's worth of work, not a project milestone

**Immediately after defining the outcome, create a TodoWrite task list.** This is mandatory — not optional. The task list must include the session outcome as the first item and break down the known tasks below it. Mark the first task `in_progress`. Update task status in real time as work proceeds. At session close, the TodoWrite list is the source of truth for what was attempted.

### Register in CLAUDE.md work streams table

After defining the outcome, update the "Active work streams" table in `.claude/CLAUDE.md`:
- **New work stream:** add a row (stream name, status, key files)
- **Continuing existing stream:** update the status column
- **Stream completed this session:** mark done or remove the row

This is how parallel threads coordinate. Every `/thread` invocation keeps the table current — at start (registering) and at end (finalising).

### Bad outcomes
- "Work on orchestrators docs" — not testable
- "Make progress on the content pipeline" — not concrete
- "Review some pages" — not scoped

### Good outcomes
- "Produce a research brief on the 8 blocking decisions with recommendations for each"
- "Co-design the veracity pass architecture and write the architecture doc"
- "Build and test the /pm skill against the current orchestrators thread"

### Explore before executing

The first actions in any session should be Read/Grep/Glob — understand the problem before touching files. No Write/Edit until you know what you're changing and why. The worst sessions happen when Claude jumps straight to editing.

### Test-driven when fixing bugs

When the outcome involves fixing something broken, write a failing test first (see `/diagnose` Step 3b). The fix is done when the test passes, not when you think it works.

---

## Step 2: Trace every action

Before proposing any new action, state in one sentence how it connects to the outcome.

If the connection requires more than one sentence to explain, the action is probably drift.

### Format
```
This [action] serves the outcome because [one sentence].
```

If you cannot complete that sentence: flag it.

```
This doesn't trace back to [outcome]. Is this a scope change, or should we refocus?
```

---

## Step 3: Phase transitions

When shifting between phases (research → design → build → iterate), restate the outcome and confirm:

```
Outcome: [restate]
Completed: [what just finished]
Starting: [next phase]
This moves us toward the outcome because: [one sentence]
```

Wait for confirmation before proceeding into the new phase.

---

## Step 3b: Backlog capture

When a new idea or tangent comes mid-task:

1. Log it immediately — TodoWrite with status `pending`, or append to a backlog file
2. Acknowledge it: "Logged: [idea]. Continuing with [current task]."
3. Return to the current task without delay

Do not chase the idea. Do not ignore it. Capture and continue.

At session end or natural pause, review the backlog: "These ideas came up during the session: [list]. Want to promote any to next actions?"

---

## Step 4: Drift detection

If 3+ actions have passed without the outcome being referenced, restate it unprompted:

```
Checking in — our outcome is: [restate]
Current work: [what we're doing now]
Connection: [how it serves the outcome]
```

If the connection is weak, say so. Recommend refocusing or explicitly expanding scope.

---

## Step 5: Session close — Finalisation report

At session end, produce a finalisation report following the completion-reports.md template at `workspace/plan/active/_Project-Management_/completion-reports.md`.

### Report structure

```markdown
## [Initiative Name] — [YYYY-MM-DD]

**Plans**: `path/to/plan.md`
**Scope**: One-line description of what this session covered.

### Summary
2-3 sentences. What problem was solved, what approach was taken, what state the repo is in now.

### Completed
Group by phase. Outcome-oriented bullets — not task checkboxes.

### Decisions Made
| Decision | Rationale |
|---|---|

### Deferred Items
| Item | Priority | Reason | Dependency |
|---|---|---|---|

### Dependencies & Downstream Effects
Things this work affects that other processes need to know about.

### Test / Validation State
| Check | Result | Notes |
|---|---|---|

### Recommendations
Numbered. Concrete next steps with what they unblock.

### Artifacts
| File | Type | Description |
|---|---|---|
```

### Outcome evaluation

State clearly:
- **Met** — the deliverable exists or the decision was made
- **Partially met** — state what was done and what remains
- **Not met** — state why (drift, blocker, scope change) and what the next session should pick up

### Where to write it

- Append to `workspace/plan/active/_Project-Management_/completion-reports.md`
- Also append a summary entry to the session log in `.claude/CLAUDE.md`
- If the session used a branch, include branch status in the report (merged / pending merge / abandoned)

### Branch cleanup at session end

If this session worked on a branch:
1. State the branch name and its status (complete / in-progress / abandoned)
2. If complete: recommend merge to main working branch
3. If in-progress: state what remains and where the next session picks up
4. If abandoned: recommend deletion with reasoning
5. Never leave a branch undocumented — the finalisation report is the record

---

## Step 6: Anti-loop discipline

If Claude has attempted the same approach twice and it has failed both times:

1. **STOP executing.** Do not try a third time.
2. State what was tried and why it failed (both times)
3. List the facts: error messages, file state, what changed between attempts
4. Propose a **different** approach based on root-cause analysis — not a retry
5. Wait for approval before trying again

If Claude cannot identify a different approach, say so: "I've tried [X] twice and it's not working. I don't have a clear alternative. Here's what I know — what's your read?"

This prevents the spiral pattern where Claude retries the same failing approach 10+ times.

---

## Principles

1. The outcome is the user's, not Claude's. If the user changes it mid-session, update it — don't resist.
2. Drift is not always bad. Sometimes the user discovers something more important. The skill's job is to make the shift explicit, not prevent it.
3. Keep it lightweight. One sentence to trace, one sentence to check. This skill should never dominate the conversation.
4. Propose, don't interrogate. When the user's intent is unclear, suggest what you think they mean — don't ask open-ended questions.

---

## Status: Draft — Testing in production

Known limitations updated after each real use.

### Known limitations
- Skill not yet followed by Claude in the session that built it (jumped ahead, drifted from outcome)
- Permission prompt rejections not handled gracefully (retried same approach 3 times)

### Test log
| Date | Used on | Worked | Didn't | Changes |
|---|---|---|---|---|
| 2026-03-25 | This build session | Outcome definition, task tracking concept | Anti-drift not followed, jumped to follow-up before finishing tasks | Added to known limitations |
| 2026-03-25 | This build session | — | Jumped to implementation on render verification (3 skill edits + CLAUDE.md) without confirming approach first | Confirms approval gate not being followed even by the session that wrote it |
