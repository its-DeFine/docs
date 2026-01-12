const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get list of files that were changed
const filesChanged = execSync('git diff --name-only 90dced9 4964c2c')
  .toString()
  .trim()
  .split('\n')
  .filter(f => f.endsWith('.mdx'));

console.log(`Verifying ${filesChanged.length} files...\n`);

let totalFiles = 0;
let contentChanges = 0;
let frontmatterIssues = 0;
let perfect = 0;

filesChanged.forEach(file => {
  try {
    const currentPath = path.join(process.cwd(), file);
    if (!fs.existsSync(currentPath)) {
      return;
    }
    
    totalFiles++;
    
    // Get original content from 90dced9
    const originalContent = execSync(`git show 90dced9:"${file}"`, { encoding: 'utf8' });
    const currentContent = fs.readFileSync(currentPath, 'utf8');
    
    // Extract frontmatter and body
    const originalMatch = originalContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const currentMatch = currentContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (!originalMatch || !currentMatch) {
      return;
    }
    
    const originalBody = originalMatch[2];
    const currentBody = currentMatch[2];
    
    // Check if body content changed
    if (originalBody !== currentBody) {
      console.log(`❌ CONTENT CHANGED: ${file}`);
      console.log(`   Original body length: ${originalBody.length}`);
      console.log(`   Current body length: ${currentBody.length}`);
      contentChanges++;
      return;
    }
    
    // Parse frontmatter to check fields
    const originalFM = originalMatch[1];
    const currentFM = currentMatch[1];
    
    // Extract all fields except og:image and keywords from original
    const originalFields = {};
    const currentFields = {};
    
    // Parse original frontmatter
    let currentField = null;
    let currentValue = [];
    originalFM.split('\n').forEach(line => {
      const fieldMatch = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
      if (fieldMatch) {
        if (currentField && currentField !== 'og:image' && currentField !== 'keywords') {
          originalFields[currentField] = currentValue.join('\n');
        }
        currentField = fieldMatch[1];
        currentValue = [fieldMatch[2]];
      } else if (currentField) {
        currentValue.push(line);
      }
    });
    if (currentField && currentField !== 'og:image' && currentField !== 'keywords') {
      originalFields[currentField] = currentValue.join('\n');
    }
    
    // Parse current frontmatter
    currentField = null;
    currentValue = [];
    currentFM.split('\n').forEach(line => {
      const fieldMatch = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
      if (fieldMatch) {
        if (currentField && currentField !== 'og:image' && currentField !== 'keywords') {
          currentFields[currentField] = currentValue.join('\n');
        }
        currentField = fieldMatch[1];
        currentValue = [fieldMatch[2]];
      } else if (currentField) {
        currentValue.push(line);
      }
    });
    if (currentField && currentField !== 'og:image' && currentField !== 'keywords') {
      currentFields[currentField] = currentValue.join('\n');
    }
    
    // Compare fields
    let hasDifference = false;
    for (const field in originalFields) {
      if (originalFields[field] !== currentFields[field]) {
        if (!hasDifference) {
          console.log(`⚠️  FRONTMATTER MISMATCH: ${file}`);
          hasDifference = true;
        }
        console.log(`   Field "${field}":`);
        console.log(`   Original: ${originalFields[field].substring(0, 100)}`);
        console.log(`   Current:  ${currentFields[field] ? currentFields[field].substring(0, 100) : 'MISSING'}`);
      }
    }
    
    if (hasDifference) {
      frontmatterIssues++;
    } else {
      perfect++;
    }
    
  } catch (error) {
    console.error(`❌ Error verifying ${file}:`, error.message);
  }
});

console.log(`\n========== VERIFICATION SUMMARY ==========`);
console.log(`Total files checked: ${totalFiles}`);
console.log(`✅ Perfect (no changes to content, frontmatter restored): ${perfect}`);
console.log(`⚠️  Frontmatter issues: ${frontmatterIssues}`);
console.log(`❌ Content changed: ${contentChanges}`);
console.log(`==========================================`);

