const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Fix og:image Frontmatter Script
 *
 * This script:
 * 1. Finds all "og:image" (with quotes) in frontmatter
 * 2. Replaces with: og:image: "/snippets/assets/domain/SHARED/LivepeerDocsLogo.svg"
 * 3. EXCLUDES mission-control.mdx
 */

const DRY_RUN = false; // Set to false to actually write files
const NEW_OG_IMAGE = "/snippets/assets/domain/SHARED/LivepeerDocsHero.svg";
const EXCLUDE_FILES = ["mission-control.mdx"];

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  // Check if file should be excluded
  const fileName = path.basename(filePath);
  if (EXCLUDE_FILES.includes(fileName)) {
    return { success: true, skipped: true, reason: "Excluded file" };
  }

  if (!fs.existsSync(fullPath)) {
    return { success: false, error: "File not found" };
  }

  const content = fs.readFileSync(fullPath, "utf8");

  // Check if file has frontmatter with "og:image" (with quotes)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return { success: false, error: "No frontmatter found" };
  }

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  // Check if frontmatter has og:image (with or without quotes on key)
  const hasOgImage = /(["']?og:image["']?):\s*["'].*?["']/.test(frontmatter);

  if (!hasOgImage) {
    return { success: true, skipped: true, reason: "No og:image found" };
  }

  // Replace og:image: "..." with og:image: "/snippets/assets/domain/SHARED/LivepeerDocsHero.svg"
  const newFrontmatter = frontmatter.replace(
    /(["']?og:image["']?):\s*["'].*?["']/g,
    `og:image: "${NEW_OG_IMAGE}"`,
  );

  const newContent = `---\n${newFrontmatter}\n---\n${body}`;

  // Write file if not dry run
  if (!DRY_RUN) {
    fs.writeFileSync(fullPath, newContent, "utf8");
  }

  return {
    success: true,
    filePath,
    changed: true,
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(
      "Usage: node fix-og-image-quotes.js <file1.mdx> [file2.mdx] ...",
    );
    console.log("");
    console.log("Or find all MDX files:");
    console.log(
      '  find v2/pages -name "*.mdx" -type f | xargs node fix-og-image-quotes.js',
    );
    console.log("");
    console.log("Options:");
    console.log("  Edit DRY_RUN in script to false to actually write files");
    console.log("");
    console.log("Excluded files:");
    EXCLUDE_FILES.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }

  console.log(`Processing ${args.length} file(s)...`);
  console.log(
    `DRY RUN: ${DRY_RUN ? "YES (no files will be modified)" : "NO (files will be modified)"}`,
  );
  console.log(`New og:image value: ${NEW_OG_IMAGE}`);
  console.log(`Excluded files: ${EXCLUDE_FILES.join(", ")}\n`);

  let processed = 0;
  let changed = 0;
  let skipped = 0;
  let errors = 0;

  args.forEach((file) => {
    const result = processFile(file);

    if (result.success) {
      if (result.skipped) {
        skipped++;
        console.log(`⊘ ${file} - ${result.reason}`);
      } else if (result.changed) {
        processed++;
        changed++;
        console.log(`✓ ${file} - og:image updated`);
      }
    } else {
      errors++;
      console.error(`✗ ${file}: ${result.error}`);
    }
  });

  console.log(`\n========== SUMMARY ==========`);
  console.log(`Changed: ${changed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`DRY RUN: ${DRY_RUN ? "YES" : "NO"}`);
  console.log(`=============================`);
}

module.exports = { processFile, DRY_RUN, NEW_OG_IMAGE, EXCLUDE_FILES };
