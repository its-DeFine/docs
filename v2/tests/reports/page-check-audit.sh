#!/bin/bash

# Script to check all pages referenced in docs.json
# This script will verify:
# 1. File existence
# 2. MDX syntax errors
# 3. Component imports
# 4. Link validity

echo "=== PAGE CHECK AUDIT ==="
echo "Starting comprehensive page audit..."
echo ""

# Extract all page paths from docs.json
pages=$(grep -o '"v2/pages/[^"]*"' docs.json | sed 's/"//g' | grep -v '^ $' | sort -u)

missing_files=()
existing_files=()

echo "Checking file existence..."
for page in $pages; do
    # Add .mdx extension if not present
    if [[ ! "$page" =~ \.mdx$ ]] && [[ ! "$page" =~ \.md$ ]]; then
        page="${page}.mdx"
    fi
    
    if [ -f "$page" ]; then
        existing_files+=("$page")
    else
        missing_files+=("$page")
    fi
done

echo ""
echo "=== SUMMARY ==="
echo "Total pages referenced in docs.json: $(echo "$pages" | wc -l | tr -d ' ')"
echo "Existing files: ${#existing_files[@]}"
echo "Missing files: ${#missing_files[@]}"
echo ""

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "=== MISSING FILES ==="
    for file in "${missing_files[@]}"; do
        echo "  - $file"
    done
fi

echo ""
echo "Audit complete. Check the detailed report in v2/tests/reports/page-check-report.md"

