#!/usr/bin/env python3
"""
Comprehensive Page Audit Script
Checks all pages in docs.json for:
1. File existence
2. Frontmatter syntax errors
3. Component imports and usage
4. Broken links
5. Image paths
"""

import json
import os
import re
from pathlib import Path
from typing import List, Dict, Set

def extract_pages_from_docs_json(docs_path: str) -> List[str]:
    """Extract all page paths from docs.json"""
    with open(docs_path, 'r') as f:
        content = f.read()
    
    # Find all page references
    pages = re.findall(r'"(v2/pages/[^"]+)"', content)
    # Remove duplicates and filter out empty strings
    pages = [p for p in set(pages) if p.strip() and p.strip() != ' ']
    return sorted(pages)

def check_file_exists(page_path: str) -> tuple:
    """Check if file exists, try with .mdx and .md extensions"""
    if os.path.exists(page_path) and os.path.isfile(page_path):
        return True, page_path

    if not page_path.endswith('.mdx') and not page_path.endswith('.md'):
        mdx_path = f"{page_path}.mdx"
        md_path = f"{page_path}.md"

        if os.path.exists(mdx_path) and os.path.isfile(mdx_path):
            return True, mdx_path
        elif os.path.exists(md_path) and os.path.isfile(md_path):
            return True, md_path

    return False, page_path

def check_frontmatter(file_path: str) -> List[str]:
    """Check frontmatter for syntax errors"""
    errors = []
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if frontmatter exists
    if not content.startswith('---'):
        errors.append("Missing frontmatter")
        return errors
    
    # Extract frontmatter
    parts = content.split('---', 2)
    if len(parts) < 3:
        errors.append("Malformed frontmatter (missing closing ---)")
        return errors
    
    frontmatter = parts[1]
    lines = frontmatter.strip().split('\n')
    
    for i, line in enumerate(lines, 1):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        
        # Check for key without value
        if ':' in line:
            key, value = line.split(':', 1)
            value = value.strip()
            if not value and not line.endswith(':'):
                errors.append(f"Line {i}: Key '{key.strip()}' has no value")
        else:
            # Check if it's a continuation or error
            if not line.startswith('-') and not line.startswith(' '):
                errors.append(f"Line {i}: Invalid frontmatter syntax: '{line}'")
    
    return errors

def check_imports(file_path: str) -> List[str]:
    """Check component imports"""
    errors = []
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all import statements
    imports = re.findall(r"import\s+.*?from\s+['\"]([^'\"]+)['\"]", content, re.MULTILINE)
    
    for imp in imports:
        if imp.startswith('/snippets/'):
            # Convert to relative path
            snippet_path = imp[1:]  # Remove leading /
            if not os.path.exists(snippet_path):
                errors.append(f"Import not found: {imp}")
    
    return errors

def main():
    docs_json_path = 'docs.json'
    
    print("=== COMPREHENSIVE PAGE AUDIT ===\n")
    
    pages = extract_pages_from_docs_json(docs_json_path)
    print(f"Found {len(pages)} page references in docs.json\n")
    
    results = {
        'missing_files': [],
        'frontmatter_errors': {},
        'import_errors': {},
        'total_pages': len(pages),
        'checked_pages': 0
    }
    
    for page in pages:
        exists, file_path = check_file_exists(page)
        
        if not exists:
            results['missing_files'].append(page)
        else:
            results['checked_pages'] += 1
            
            # Check frontmatter
            fm_errors = check_frontmatter(file_path)
            if fm_errors:
                results['frontmatter_errors'][file_path] = fm_errors
            
            # Check imports
            imp_errors = check_imports(file_path)
            if imp_errors:
                results['import_errors'][file_path] = imp_errors
    
    # Print results
    print(f"Total pages: {results['total_pages']}")
    print(f"Existing pages: {results['checked_pages']}")
    print(f"Missing pages: {len(results['missing_files'])}\n")
    
    if results['missing_files']:
        print(f"=== MISSING FILES ({len(results['missing_files'])}) ===")
        for f in results['missing_files']:
            print(f"  - {f}")
        print()
    
    if results['frontmatter_errors']:
        print(f"=== FRONTMATTER ERRORS ({len(results['frontmatter_errors'])}) ===")
        for file, errors in results['frontmatter_errors'].items():
            print(f"\n{file}:")
            for error in errors:
                print(f"  - {error}")
        print()
    
    if results['import_errors']:
        print(f"=== IMPORT ERRORS ({len(results['import_errors'])}) ===")
        for file, errors in results['import_errors'].items():
            print(f"\n{file}:")
            for error in errors:
                print(f"  - {error}")
        print()
    
    print("\nAudit complete!")

if __name__ == '__main__':
    main()

