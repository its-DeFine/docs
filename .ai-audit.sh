#!/bin/bash
# AI Operations Audit Log
# Logs every git operation attempted by the AI assistant

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
COMMAND="$*"
FILES_CHANGED=$(git status --porcelain 2>/dev/null | wc -l)

LOG_ENTRY="[$TIMESTAMP] BRANCH=$BRANCH | COMMAND=$COMMAND | FILES_STAGED=$FILES_CHANGED"

# Write to audit log
echo "$LOG_ENTRY" >> .ai-operations.log

# Also print for visibility
echo "$LOG_ENTRY"
