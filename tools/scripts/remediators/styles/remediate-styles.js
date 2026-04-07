#!/usr/bin/env node
/**
 * @script            remediate-styles
 * @category          remediator
 * @purpose           qa:style-governance
 * @scope             v2-content,snippets-components
 * @owner             docs
 * @needs             R-STYLE-GOV
 * @purpose-statement Auto-remediates deterministic style violations: legacy tokens → --lp-*, outline removal, mermaid init standardisation. Conservative — only fixes patterns with known-safe replacements.
 * @pipeline          P6 (on-demand via workflow or manual)
 * @dualmode          --dry-run (show proposed fixes) | --write (apply fixes)
 * @usage             node tools/scripts/remediators/styles/remediate-styles.js --dry-run
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

/* ============================================
   TOKEN MIGRATION MAP
   ============================================ */

const TOKEN_MAP = {
  'var(--accent)': 'var(--lp-color-accent)',
  'var(--accent-dark)': 'var(--lp-color-accent-strong)',
  'var(--hero-text)': 'var(--lp-color-text-primary)',
  'var(--text)': 'var(--lp-color-text-secondary)',
  'var(--muted-text)': 'var(--lp-color-text-muted)',
  'var(--background)': 'var(--lp-color-bg-page)',
  'var(--card-background)': 'var(--lp-color-bg-card)',
  'var(--border)': 'var(--lp-color-border-default)',
  'var(--button-text)': 'var(--lp-color-on-accent)',
  'var(--arbitrum)': 'var(--lp-color-arbitrum)',
};

/* ============================================
   STANDARD MERMAID INIT (from MermaidColours.jsx)
   ============================================ */

const STANDARD_MERMAID_INIT = "%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#18794E', 'primaryTextColor': '#fff', 'primaryBorderColor': '#3CB540', 'lineColor': '#3CB540', 'mainBkg': '#18794E', 'nodeBorder': '#3CB540', 'clusterBkg': 'transparent', 'clusterBorder': '#3CB540', 'titleColor': '#3CB540', 'edgeLabelBackground': 'transparent', 'textColor': '#3CB540', 'nodeTextColor': '#fff'}}}%%";

/* ============================================
   EXCLUDE PATTERNS
   ============================================ */

const EXCLUDE_PATTERNS = [
  '_workspace', 'archive', 'language-pages', 'x-deprecated',
  'x-archived', 'node_modules', '.claude', '_dep-docs',
  'tasks/context_data'
];

function shouldExclude(filePath) {
  const relative = path.relative(REPO_ROOT, filePath);
  return EXCLUDE_PATTERNS.some(p => relative.includes(p));
}

function walkDir(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath, ext));
    } else if (entry.name.endsWith(ext) && !shouldExclude(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

/* ============================================
   CONTEXT DETECTION
   ============================================ */

function isInsideCodeBlock(content, matchIndex) {
  const before = content.slice(0, matchIndex);
  const fenceCount = (before.match(/```/g) || []).length;
  return fenceCount % 2 === 1;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

/* ============================================
   REMEDIATORS
   ============================================ */

function remediateLegacyTokens(filePath, content) {
  const fixes = [];
  let modified = content;

  // Process replacements in reverse order to preserve offsets
  const allMatches = [];
  for (const [legacy, replacement] of Object.entries(TOKEN_MAP)) {
    const escaped = legacy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (isInsideCodeBlock(content, match.index)) continue;
      allMatches.push({
        index: match.index,
        length: match[0].length,
        original: match[0],
        replacement: replacement,
        line: getLineNumber(content, match.index),
      });
    }
  }

  // Sort by index descending for safe reverse-order replacement
  allMatches.sort((a, b) => b.index - a.index);

  for (const m of allMatches) {
    modified = modified.slice(0, m.index) + m.replacement + modified.slice(m.index + m.length);
    fixes.push({
      type: 'legacy-token',
      file: path.relative(REPO_ROOT, filePath),
      line: m.line,
      before: m.original,
      after: m.replacement,
    });
  }

  return { modified, fixes };
}

function remediateOutlineRemoval(filePath, content) {
  const fixes = [];
  let modified = content;
  const regex = /outline:\s*["']?none["']?|outline:\s*0(?![.\d])/g;
  const allMatches = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    if (isInsideCodeBlock(content, match.index)) continue;
    allMatches.push({
      index: match.index,
      length: match[0].length,
      original: match[0],
      line: getLineNumber(content, match.index),
    });
  }

  // Reverse order
  allMatches.sort((a, b) => b.index - a.index);

  for (const m of allMatches) {
    // Replace outline:none with outline:revert (restores browser default)
    const replacement = 'outline: "revert"';
    modified = modified.slice(0, m.index) + replacement + modified.slice(m.index + m.length);
    fixes.push({
      type: 'outline-removal',
      file: path.relative(REPO_ROOT, filePath),
      line: m.line,
      before: m.original,
      after: replacement,
    });
  }

  return { modified, fixes };
}

// Same signature used in audit-styles.js to recognise compliant mermaid inits
const STANDARD_MERMAID_SIGNATURE = "'primaryColor': '#18794E', 'primaryTextColor': '#fff', 'primaryBorderColor': '#3CB540'";

function remediateMermaidInit(filePath, content) {
  const fixes = [];
  let modified = content;
  const regex = /%%\{init:.*?themeVariables.*?%%/gs;
  const allMatches = [];

  let match;
  while ((match = regex.exec(content)) !== null) {
    // Skip if already using the standard init (idempotent)
    if (match[0].includes(STANDARD_MERMAID_SIGNATURE)) continue;
    allMatches.push({
      index: match.index,
      length: match[0].length,
      original: match[0],
      line: getLineNumber(content, match.index),
    });
  }

  // Reverse order
  allMatches.sort((a, b) => b.index - a.index);

  for (const m of allMatches) {
    modified = modified.slice(0, m.index) + STANDARD_MERMAID_INIT + modified.slice(m.index + m.length);
    fixes.push({
      type: 'mermaid-hardcoded',
      file: path.relative(REPO_ROOT, filePath),
      line: m.line,
      before: m.original.slice(0, 60) + '...',
      after: STANDARD_MERMAID_INIT.slice(0, 60) + '...',
    });
  }

  return { modified, fixes };
}

/* ============================================
   ORCHESTRATOR
   ============================================ */

function runRemediation(options = {}) {
  const { mode = 'dry-run', category, files: explicitFiles } = options;

  const jsxFiles = explicitFiles
    ? explicitFiles.filter(f => f.endsWith('.jsx'))
    : walkDir(path.join(REPO_ROOT, 'snippets', 'components'), '.jsx');

  const mdxFiles = explicitFiles
    ? explicitFiles.filter(f => f.endsWith('.mdx'))
    : walkDir(path.join(REPO_ROOT, 'v2'), '.mdx');

  const allFixes = [];
  const filesModified = [];

  // JSX: legacy tokens + outline removal
  if (!category || category.includes('legacy-token') || category.includes('outline-removal')) {
    for (const file of jsxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      let modified = content;
      let fileFixes = [];

      if (!category || category.includes('legacy-token')) {
        const result = remediateLegacyTokens(file, modified);
        modified = result.modified;
        fileFixes.push(...result.fixes);
      }

      if (!category || category.includes('outline-removal')) {
        const result = remediateOutlineRemoval(file, modified);
        modified = result.modified;
        fileFixes.push(...result.fixes);
      }

      if (fileFixes.length > 0) {
        allFixes.push(...fileFixes);
        if (mode === 'write') {
          fs.writeFileSync(file, modified, 'utf8');
          filesModified.push(path.relative(REPO_ROOT, file));
        }
      }
    }
  }

  // MDX: mermaid init standardisation
  if (!category || category.includes('mermaid-hardcoded')) {
    for (const file of mdxFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const result = remediateMermaidInit(file, content);

      if (result.fixes.length > 0) {
        allFixes.push(...result.fixes);
        if (mode === 'write') {
          fs.writeFileSync(file, result.modified, 'utf8');
          filesModified.push(path.relative(REPO_ROOT, file));
        }
      }
    }
  }

  return {
    timestamp: new Date().toISOString(),
    mode,
    totalFixes: allFixes.length,
    filesModified: filesModified.length,
    byType: {
      'legacy-token': allFixes.filter(f => f.type === 'legacy-token').length,
      'outline-removal': allFixes.filter(f => f.type === 'outline-removal').length,
      'mermaid-hardcoded': allFixes.filter(f => f.type === 'mermaid-hardcoded').length,
    },
    fixes: allFixes,
    modifiedFiles: filesModified,
  };
}

/* ============================================
   CLI
   ============================================ */

function parseArgs(argv) {
  const args = { mode: 'dry-run', category: null, files: [], help: false };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--dry-run') args.mode = 'dry-run';
    else if (token === '--write') args.mode = 'write';
    else if (token === '--category' && argv[i + 1]) args.category = argv[++i].split(',');
    else if (token === '--files' && argv[i + 1]) args.files = argv[++i].split(',').map(f => path.resolve(REPO_ROOT, f));
  }
  return args;
}

function printHelp() {
  console.log([
    'Usage:',
    '  node tools/scripts/remediators/styles/remediate-styles.js [--dry-run|--write] [options]',
    '',
    'Modes:',
    '  --dry-run   Show proposed fixes without modifying files (default)',
    '  --write     Apply fixes and write modified files',
    '',
    'Options:',
    '  --category X   Only fix specific categories (comma-separated):',
    '                 legacy-token, outline-removal, mermaid-hardcoded',
    '  --files X      Only fix specific files (comma-separated)',
    '  --help, -h     Show this help',
    '',
    'Safety:',
    '  - Never modifies code blocks or inline code',
    '  - Applies fixes in reverse offset order to preserve positions',
    '  - Only fixes patterns with known-safe deterministic replacements',
    '  - Legacy tokens → --lp-* equivalents (1:1 mapping)',
    '  - Outline removal → outline: revert (restores browser default)',
    '  - Mermaid inits → standard init from MermaidColours.jsx',
  ].join('\n'));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) { printHelp(); process.exit(0); }

  const report = runRemediation({
    mode: args.mode,
    category: args.category,
    files: args.files.length > 0 ? args.files : undefined,
  });

  console.log(`\n🔧 Styles Remediation (${report.mode})`);
  console.log('═'.repeat(50));
  console.log(`Total fixes: ${report.totalFixes}`);
  console.log(`Files modified: ${report.filesModified}`);
  console.log();
  console.log('By type:');
  for (const [type, count] of Object.entries(report.byType)) {
    if (count > 0) console.log(`  ${count.toString().padStart(5)} × ${type}`);
  }

  if (report.fixes.length > 0) {
    console.log('\nFixes:');
    for (const fix of report.fixes) {
      console.log(`  ${fix.file}:${fix.line}`);
      console.log(`    - ${fix.before}`);
      console.log(`    + ${fix.after}`);
    }
  }

  if (report.mode === 'write' && report.filesModified > 0) {
    console.log(`\n✅ ${report.filesModified} file(s) modified.`);
    console.log('Modified files:');
    for (const f of report.modifiedFiles) {
      console.log(`  ${f}`);
    }
  } else if (report.mode === 'dry-run' && report.totalFixes > 0) {
    console.log(`\n💡 Run with --write to apply ${report.totalFixes} fix(es).`);
  } else {
    console.log('\n✅ No remediable violations found.');
  }
}

main();
