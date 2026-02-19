#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

usage() {
    cat <<'EOF'
Usage:
  ./lp --help
  ./lp mint dev [lp-options] [mint-flags...]

Examples:
  ./lp mint dev
  ./lp mint dev --help
  ./lp mint dev --script tools/scripts/mint-dev.sh
  ./lp mint dev --port 3333

lp-options for `mint dev`:
  --help, -h           Show command help
  --script <path>      Override launcher script (repo-relative or absolute)
  --script=<path>      Same as --script <path>
  --dry-run            Print resolved command without executing it
EOF
}

command_mint_dev() {
    local script_path="$REPO_ROOT/mint-dev.sh"
    local dry_run=false

    while [ "$#" -gt 0 ]; do
        case "$1" in
            --help|-h)
                usage
                exit 0
                ;;
            --script)
                if [ "$#" -lt 2 ]; then
                    echo "Error: --script requires a path value."
                    exit 1
                fi
                script_path="$2"
                shift 2
                ;;
            --script=*)
                script_path="${1#--script=}"
                shift
                ;;
            --dry-run)
                dry_run=true
                shift
                ;;
            --)
                shift
                break
                ;;
            *)
                break
                ;;
        esac
    done

    if [ "${script_path#/}" = "$script_path" ]; then
        script_path="$REPO_ROOT/$script_path"
    fi

    if [ ! -f "$script_path" ]; then
        echo "Error: script not found: $script_path"
        exit 1
    fi

    if [ ! -x "$script_path" ]; then
        echo "Error: script is not executable: $script_path"
        exit 1
    fi

    if [ "$dry_run" = true ]; then
        echo "Dry run:"
        printf '  %q' "$script_path" "$@"
        echo ""
        exit 0
    fi

    exec "$script_path" "$@"
}

if [ "$#" -eq 0 ]; then
    usage
    exit 1
fi

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    usage
    exit 0
fi

if [ "$#" -ge 2 ] && [ "$1" = "mint" ] && [ "$2" = "dev" ]; then
    shift 2
    command_mint_dev "$@"
fi

echo "Error: Unsupported command: $*"
echo ""
usage
exit 1
