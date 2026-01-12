const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get list of files that were changed
const filesChanged = execSync("git diff --name-only 90dced9 4964c2c")
  .toString()
  .trim()
  .split("\n")
  .filter((f) => f.endsWith(".mdx"));

console.log(`Found ${filesChanged.length} files to restore`);

let restored = 0;
let errors = 0;

filesChanged.forEach((file) => {
  try {
    // Get the original frontmatter from commit 90dced9
    const originalContent = execSync(`git show 90dced9:"${file}"`, {
      encoding: "utf8",
    });

    // Get current content
    const currentPath = path.join(process.cwd(), file);
    if (!fs.existsSync(currentPath)) {
      console.log(`SKIP: ${file} (doesn't exist)`);
      return;
    }

    const currentContent = fs.readFileSync(currentPath, "utf8");

    // Extract original frontmatter
    const originalMatch = originalContent.match(/^---\n([\s\S]*?)\n---/);
    const currentMatch = currentContent.match(/^---\n([\s\S]*?)\n---/);

    if (!originalMatch || !currentMatch) {
      console.log(`SKIP: ${file} (no frontmatter)`);
      return;
    }

    const originalFrontmatter = originalMatch[1];
    const currentFrontmatter = currentMatch[1];

    // Get current og:image and keywords values to preserve them
    const currentOgMatch = currentFrontmatter.match(
      /^["']?og:image["']?\s*:\s*["'](.+?)["']\s*$/m,
    );
    const currentKeywordsMatch = currentFrontmatter.match(
      /^keywords\s*:\s*(\[[\s\S]*?\])\s*$/m,
    );

    const currentOgImage = currentOgMatch ? currentOgMatch[0] : null;
    const currentKeywords = currentKeywordsMatch
      ? currentKeywordsMatch[0]
      : null;

    // Use original frontmatter but replace og:image and keywords with current values
    let newFrontmatterLines = originalFrontmatter.split("\n");
    let finalLines = [];
    let skipLine = false;

    for (let i = 0; i < newFrontmatterLines.length; i++) {
      const line = newFrontmatterLines[i];

      // Skip old og:image lines (both formats)
      if (
        line.match(/^["']?og:image["']?\s*:/) ||
        line.match(/^og:\s*["']image["']?\s*:/)
      ) {
        skipLine = true;
        continue;
      }

      // Skip old keywords lines
      if (line.match(/^keywords\s*:/)) {
        skipLine = true;
        // Check if it's a multi-line array
        if (!line.includes("]")) {
          // Multi-line array, need to skip until we find the closing bracket
          while (
            i < newFrontmatterLines.length - 1 &&
            !newFrontmatterLines[i].includes("]")
          ) {
            i++;
          }
        }
        continue;
      }

      finalLines.push(line);
    }

    // Add current og:image and keywords at the end if they exist
    if (currentKeywords) {
      finalLines.push(currentKeywords);
    }
    if (currentOgImage) {
      finalLines.push(currentOgImage);
    }

    const newFrontmatter = finalLines.join("\n");
    const bodyContent = currentContent.substring(currentMatch[0].length);
    const newContent = `---\n${newFrontmatter}\n---${bodyContent}`;

    fs.writeFileSync(currentPath, newContent, "utf8");
    console.log(`✓ Restored: ${file}`);
    restored++;
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
    errors++;
  }
});

console.log(`\n✅ Restored ${restored} files`);
console.log(`❌ Errors: ${errors}`);
