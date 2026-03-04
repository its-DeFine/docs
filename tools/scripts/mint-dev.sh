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
#   Optional flags:
#     --clear-cache: Clear repo-local Mintlify cache before starting.
#   Optional env:
#     MINT_DEV_CLEAR_CACHE=1: Force cache clear every run.
#     MINT_DEV_CLEAR_CACHE_ON_CHANGE=0: Disable change-based cache clearing.
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
REPO_HASH="$(printf '%s' "$REPO_ROOT" | cksum | awk '{print $1}')"

CLEAR_CACHE_FLAG=0
MINT_ARGS=()
for arg in "$@"; do
    case "$arg" in
        --clear-cache)
            CLEAR_CACHE_FLAG=1
            ;;
        *)
            MINT_ARGS+=("$arg")
            ;;
    esac
done

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
    WATCH_SAFE_LINK="/tmp/mint-dev-${REPO_HASH}"
    ln -sfn "$REPO_ROOT" "$WATCH_SAFE_LINK"
    MINT_WORKDIR="$WATCH_SAFE_LINK"
    echo "Using watcher-safe path for mint dev: $MINT_WORKDIR"
fi

cd "$REPO_ROOT"

hash_file() {
    local file="$1"
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum "$file" | awk '{print $1}'
        return 0
    fi
    if command -v shasum >/dev/null 2>&1; then
        shasum -a 256 "$file" | awk '{print $1}'
        return 0
    fi
    cksum "$file" | awk '{print $1 ":" $2}'
}

calc_docs_fingerprint() {
    local -a entries
    local file
    entries=()
    for file in "$REPO_ROOT/docs.json" "$REPO_ROOT/docs-index.json"; do
        if [ -f "$file" ]; then
            entries+=("$(basename "$file")=$(hash_file "$file")")
        else
            entries+=("$(basename "$file")=missing")
        fi
    done
    printf '%s\n' "${entries[@]}" | cksum | awk '{print $1 ":" $2}'
}

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

should_clear_cache=0
clear_reason=""
change_check_enabled=1
if [ "${MINT_DEV_CLEAR_CACHE_ON_CHANGE:-1}" = "0" ]; then
    change_check_enabled=0
fi

if [ "${MINT_DEV_CLEAR_CACHE:-0}" = "1" ] || [ "$CLEAR_CACHE_FLAG" = "1" ]; then
    should_clear_cache=1
    clear_reason="forced"
fi

fingerprint=""
if [ "$change_check_enabled" = "1" ]; then
    fingerprint="$(calc_docs_fingerprint)"
    if [ "$should_clear_cache" = "0" ]; then
        CACHE_ROOT="${XDG_CACHE_HOME:-$HOME/.cache}"
        CACHE_STATE_DIR="$CACHE_ROOT/livepeer-docs/mint-dev"
        CACHE_STATE_FILE="$CACHE_STATE_DIR/${REPO_HASH}.fingerprint"
        prev_fingerprint=""
        if [ -f "$CACHE_STATE_FILE" ]; then
            prev_fingerprint="$(cat "$CACHE_STATE_FILE" 2>/dev/null || true)"
        fi
        if [ "$fingerprint" != "$prev_fingerprint" ]; then
            should_clear_cache=1
            clear_reason="docs.json/docs-index.json changed"
        fi
    fi
fi

if [ "$should_clear_cache" = "1" ]; then
    echo "Clearing Mintlify cache (${clear_reason})."
    rm -rf "$REPO_ROOT/.mintlify" "$REPO_ROOT/.mintlify-cache"
fi

if [ "$change_check_enabled" = "1" ] && [ -n "$fingerprint" ]; then
    CACHE_ROOT="${XDG_CACHE_HOME:-$HOME/.cache}"
    CACHE_STATE_DIR="$CACHE_ROOT/livepeer-docs/mint-dev"
    CACHE_STATE_FILE="$CACHE_STATE_DIR/${REPO_HASH}.fingerprint"
    mkdir -p "$CACHE_STATE_DIR"
    printf '%s\n' "$fingerprint" > "$CACHE_STATE_FILE"
fi

echo "Fetching external snippets..."
bash tools/scripts/snippets/fetch-external-docs.sh

cd "$MINT_WORKDIR"
exec mint dev "${MINT_ARGS[@]}"
