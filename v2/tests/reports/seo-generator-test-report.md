# SEO Generator Script - Test Report

## Test Date
2026-01-12

## Script Location
`snippets/scripts/generate-seo.js`

## Test Environment
Test files created in: `v2/tests/seo-test/`

## Test Cases

### Test 1: Broken YAML - `og: 'image': '/path'`
**File:** `test1-broken-og-image.mdx`
**Original:**
```yaml
og: 'image': '/some/path.jpg'
```
**Result:** ✅ PASS
- Invalid line detected and skipped
- Correct metadata added with double quotes
- Keywords generated without system paths

### Test 2: Single-quoted key - `'og:image': '/path'`
**File:** `test2-single-quotes.mdx`
**Original:**
```yaml
'og:image': '/some/path.jpg'
```
**Result:** ✅ PASS
- Invalid single-quoted key detected and skipped
- Correct metadata added with double quotes
- Keywords generated correctly

### Test 3: No existing SEO metadata
**File:** `test3-no-metadata.mdx`
**Result:** ✅ PASS
- Keywords generated from title and description
- og:image added correctly
- All metadata in correct double-quote format

### Test 4: Existing correct metadata
**File:** `test4-existing-good.mdx`
**Result:** ✅ PASS
- Existing keywords preserved (not overwritten)
- Existing og:image preserved (not overwritten)
- No unnecessary changes made

## Dry-Run on Actual Pages

**Command:** `npm run generate-seo:dry-run`

### Summary Statistics
- **Total files scanned:** 297 MDX files
- **Files to be processed:** 193 files
- **Files skipped:** 104 files (no frontmatter)
- **Errors:** 0

### Changes to be Made

#### 1. Fix Broken YAML Syntax
The script will fix these invalid YAML patterns:
- `'og:image': '/path'` → `"og:image": "/path"`
- `og: 'image': '/path'` → Removed (invalid, will be replaced)
- `og:image: '/path'` → `"og:image": "/path"`

#### 2. Add Missing SEO Metadata
- **Keywords:** Will be added to 193 files
- **og:image:** Will be added to 193 files

#### 3. Keyword Generation
Keywords are generated from:
- Base keyword: "livepeer"
- File path (domain folders like "gateways", "developers", etc.)
- Page title (meaningful words > 3 characters)
- Description (top 3 meaningful words > 4 characters)
- **Maximum:** 10 keywords per page

#### 4. Social Preview Images
Domain-specific images assigned based on folder:
- `00_home` → `/snippets/assets/domain/00_HOME/social-preview-home.jpg`
- `01_about` → `/snippets/assets/domain/01_ABOUT/social-preview-about.jpg`
- `04_gateways` → `/snippets/assets/domain/04_GATEWAYS/social-preview-gateways.jpg`
- `05_orchestrators` → `/snippets/assets/domain/05_ORCHESTRATORS/social-preview-orchestrators.jpg`
- `06_delegators` → `/snippets/assets/domain/06_DELEGATORS/social-preview-delegators.jpg`
- `07_resources` → `/snippets/assets/domain/07_RESOURCES/social-preview-resources.jpg`
- **Default:** `/snippets/assets/social/livepeer-social-preview.jpg`

## Script Improvements Made

### 1. Fixed YAML Parsing
- Detects and skips invalid YAML lines with multiple colons
- Properly handles quoted keys like `"og:image"`
- Removes broken lines instead of preserving them

### 2. Path Filtering
- Filters out system paths (Users, Documents, etc.)
- Uses relative paths from v2/pages or v2/tests
- Excludes "tests" folder from keyword generation

### 3. Correct YAML Output Format
- Uses double quotes for all keys and values
- Properly formats keys with colons: `"og:image": "value"`
- Arrays formatted as: `keywords: ["keyword1", "keyword2"]`

## Recommendation

✅ **READY TO RUN**

The script has been tested and will:
1. Fix all broken YAML syntax (193 files)
2. Add proper SEO metadata with correct formatting
3. Not overwrite existing good metadata
4. Generate clean, relevant keywords

**Next Step:** Run `npm run generate-seo` to apply changes to all 193 files.

