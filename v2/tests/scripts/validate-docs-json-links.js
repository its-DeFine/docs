#!/usr/bin/env node
/**
 * Validates all internal links referenced in docs.json
 * 
 * This script checks:
 * 1. All page paths exist as files
 * 2. All icon paths (SVG/image files) exist
 * 3. All anchor links point to valid pages
 * 4. No duplicate page references
 * 5. No broken internal navigation links
 * 
 * Output: v2/tests/reports/docs-json-links-validation-report.md
 * 
 * Usage:
 *   node v2/tests/scripts/validate-docs-json-links.js
 *   npm run validate:docs-links
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Detect repo root via git
let REPO_ROOT;
try {
  REPO_ROOT = execSync("git rev-parse --show-toplevel", {
    encoding: "utf8",
  }).trim();
} catch {
  console.error("Error: Must run from within a git repository");
  process.exit(1);
}

const DOCS_JSON_PATH = path.join(REPO_ROOT, "docs.json");
const OUTPUT_DIR = path.join(REPO_ROOT, "v2/tests/reports");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "docs-json-links-validation-report.md");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read and parse docs.json
let docsJson;
try {
  docsJson = JSON.parse(fs.readFileSync(DOCS_JSON_PATH, "utf8"));
} catch (error) {
  console.error(`Error reading docs.json: ${error.message}`);
  process.exit(1);
}

// Results tracking
const results = {
  totalPages: 0,
  totalIcons: 0,
  missingPages: [],
  missingIcons: [],
  duplicatePages: [],
  validPages: [],
  validIcons: [],
  errors: [],
};

/**
 * Check if a file exists, trying with and without extensions
 */
function checkFileExists(filePath, extensions = []) {
  const fullPath = path.join(REPO_ROOT, filePath);
  
  // Check exact path
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return { exists: true, path: filePath };
  }
  
  // Try with extensions
  for (const ext of extensions) {
    const pathWithExt = `${filePath}${ext}`;
    const fullPathWithExt = path.join(REPO_ROOT, pathWithExt);
    if (fs.existsSync(fullPathWithExt) && fs.statSync(fullPathWithExt).isFile()) {
      return { exists: true, path: pathWithExt };
    }
  }
  
  return { exists: false, path: filePath };
}

/**
 * Extract all page paths from navigation structure
 */
function extractPages(obj, context = "") {
  const pages = [];
  
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      pages.push(...extractPages(item, `${context}[${index}]`));
    });
  } else if (typeof obj === "object" && obj !== null) {
    // Check for pages array
    if (obj.pages && Array.isArray(obj.pages)) {
      obj.pages.forEach((page, index) => {
        if (typeof page === "string") {
          pages.push({ page, context: `${context}.pages[${index}]` });
        } else {
          pages.push(...extractPages(page, `${context}.pages[${index}]`));
        }
      });
    }
    
    // Recursively check other properties
    Object.keys(obj).forEach((key) => {
      if (key !== "pages") {
        pages.push(...extractPages(obj[key], `${context}.${key}`));
      }
    });
  }
  
  return pages;
}

/**
 * Extract all icon paths from navigation structure
 */
function extractIcons(obj, context = "") {
  const icons = [];
  
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      icons.push(...extractIcons(item, `${context}[${index}]`));
    });
  } else if (typeof obj === "object" && obj !== null) {
    // Check for icon property that's a path (starts with /)
    if (obj.icon && typeof obj.icon === "string" && obj.icon.startsWith("/")) {
      icons.push({ icon: obj.icon, context });
    }
    
    // Recursively check other properties
    Object.keys(obj).forEach((key) => {
      icons.push(...extractIcons(obj[key], `${context}.${key}`));
    });
  }
  
  return icons;
}

