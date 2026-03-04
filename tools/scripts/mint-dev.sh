#!/usr/bin/env bash
# @script mint-dev
# @summary Utility script for tools/scripts/mint-dev.sh.
# @owner docs
# @scope tools/scripts
#
# @usage
#   bash tools/scripts/mint-dev.sh
#
# @inputs
#   No required CLI flags; optional flags are documented inline.
#
# @outputs
#   - Console output and/or file updates based on script purpose.
#
# @exit-codes
#   0 = success
#   1 = runtime or validation failure
#
# @examples
#   bash tools/scripts/mint-dev.sh
#
# @notes
#   Keep script behavior deterministic and update script indexes after changes.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MINT_WORKDIR="$REPO_ROOT"

# chokidar treats glob metacharacters in watch paths as patterns. If the repo
# path includes brackets (common in worktree names), change events can be lost.
path_has_glob_meta() {
    local path="$1"
    case "$path" in
        *'['*|*']'*|*'{'*|*'}'*|*'*'*|*'?'*|*'!'*)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

if path_has_glob_meta "$REPO_ROOT"; then
    REPO_HASH="$(printf '%s' "$REPO_ROOT" | cksum | awk '{print $1}')"
    WATCH_SAFE_LINK="/tmp/mint-dev-${REPO_HASH}"
    ln -sfn "$REPO_ROOT" "$WATCH_SAFE_LINK"
    MINT_WORKDIR="$WATCH_SAFE_LINK"
    echo "Using watcher-safe path for mint dev: $MINT_WORKDIR"
fi

cd "$REPO_ROOT"

# Support both regular repos and worktrees
GIT_COMMON_DIR=$(git rev-parse --git-common-dir 2>/dev/null)
if [ -z "$GIT_COMMON_DIR" ] || [ "$GIT_COMMON_DIR" = "--git-common-dir" ]; then
    GIT_COMMON_DIR=".git"
fi

HOOK_SOURCE=".githooks/pre-commit"
HOOK_TARGET="$GIT_COMMON_DIR/hooks/pre-commit"

if [ -f "$HOOK_SOURCE" ]; then
    if [ ! -x "$HOOK_TARGET" ] || ! cmp -s "$HOOK_SOURCE" "$HOOK_TARGET"; then
        echo "Installing git hooks..."
        ./.githooks/install.sh
        echo ""
    fi
else
    echo "Warning: $HOOK_SOURCE not found. Skipping hook installation."
fi

if ! command -v mint >/dev/null 2>&1; then
    echo "Error: mint CLI not found."
    echo "Install it with: npm i -g mintlify"
    exit 1
fi

echo "Checking Mint watcher patch..."
if bash tools/scripts/dev/ensure-mint-watcher-patch.sh --apply; then
    echo "Mint watcher patch preflight complete."
else
    echo "Warning: Mint watcher patch preflight failed."
    echo "Run manually: bash tools/scripts/dev/ensure-mint-watcher-patch.sh --apply"
    echo "Continuing with repo-local watcher-safe launcher path fallback."
fi

echo "Fetching external snippets..."
bash tools/scripts/snippets/fetch-external-docs.sh

cd "$MINT_WORKDIR"
exec mint dev "$@"
