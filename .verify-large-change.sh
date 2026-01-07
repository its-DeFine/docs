#!/bin/bash
# AI Large Change Verification Script
# Used when AI needs to commit more than 10 files

BRANCH=$(git rev-parse --abbrev-ref HEAD)
FILES_COUNT=$(git diff --cached --name-only | wc -l)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo ""
echo "════════════════════════════════════════════════════════════"
echo "⚠️  LARGE CHANGE VERIFICATION REQUIRED"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Branch: $BRANCH"
echo "Files to be modified: $FILES_COUNT"
echo "Timestamp: $TIMESTAMP"
echo ""
echo "Files list:"
git diff --cached --name-only | sort
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo "HUMAN ACTION REQUIRED:"
echo ""
echo "1. Review the files above carefully"
echo "2. If safe, create verification file:"
echo "   touch .ai-commit-verified"
echo "3. AI will then proceed with commit"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
