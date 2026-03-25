---
name: thread
description: >-
  Session anchor skill. Defines the session outcome, tracks it throughout, and prevents drift.
  Use at the start of any working session. Stays active underneath all other skills.
  Restates outcome before phase transitions. Flags when work diverges from the goal.
metadata:
  version: "1.0"
  category: process
---

# SKILL: Thread — Session Anchor

Every session has one outcome. This skill makes it visible, keeps it visible, and pulls back when work drifts from it.

---

## When to use

- Start of any working session
- When the conversation has drifted from its original goal
- When switching between tasks within a session
- When a new skill is invoked — thread runs underneath

## When NOT to use

- Quick one-off questions that don't need session tracking

---

## Step 1: Define the outcome

Ask once: **"What's the outcome for this session?"**

If the user has already stated it, extract it. Do not ask again.

Write the outcome as a single sentence. It must be:
- **Concrete** — names the deliverable or decision, not a vague direction
- **Testable** — you can verify at the end whether it happened
- **Scoped** — one session's worth of work, not a project milestone

Write it to the task tracker.

### Bad outcomes
- "Work on orchestrators docs" — not testable
- "Make progress on the content pipeline" — not concrete
- "Review some pages" — not scoped

### Good outcomes
- "Produce a research brief on the 8 blocking decisions with recommendations for each"
- "Co-design the veracity pass architecture and write the architecture doc"
- "Build and test the /pm skill against the current orchestrators thread"

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

## Step 4: Drift detection

If 3+ actions have passed without the outcome being referenced, restate it unprompted:

```
Checking in — our outcome is: [restate]
Current work: [what we're doing now]
Connection: [how it serves the outcome]
```

If the connection is weak, say so. Recommend refocusing or explicitly expanding scope.

---

## Step 5: Session close

At session end, evaluate against the outcome:

- **Met** — the deliverable exists or the decision was made
- **Partially met** — state what was done and what remains
- **Not met** — state why (drift, blocker, scope change) and what the next session should pick up

Write this to the session log.

---

## Principles

1. The outcome is the user's, not Claude's. If the user changes it mid-session, update it — don't resist.
2. Drift is not always bad. Sometimes the user discovers something more important. The skill's job is to make the shift explicit, not prevent it.
3. Keep it lightweight. One sentence to trace, one sentence to check. This skill should never dominate the conversation.
