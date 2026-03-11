#!/usr/bin/env bash
# Custom Mintlify loader for alternate docs config
# Usage: bash tools/scripts/dev/mint-custom-loader.sh <custom-docs-json>

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
CUSTOM_DOCS_JSON="$1"

if [ ! -f "$CUSTOM_DOCS_JSON" ]; then
  echo "Error: $CUSTOM_DOCS_JSON not found."
  exit 1
fi

# Backup original docs.json if exists
if [ -f "$REPO_ROOT/docs.json" ]; then
  mv "$REPO_ROOT/docs.json" "$REPO_ROOT/docs.json.bak"
fi

cp "$CUSTOM_DOCS_JSON" "$REPO_ROOT/docs.json"
echo "Temporarily replaced docs.json with $CUSTOM_DOCS_JSON"

mint dev

# Restore original docs.json if backup exists
if [ -f "$REPO_ROOT/docs.json.bak" ]; then
  mv "$REPO_ROOT/docs.json.bak" "$REPO_ROOT/docs.json"
  echo "Restored original docs.json"
fi
