#!/usr/bin/env node
/**
 * @script      update-jsdoc-headers
 * @type        remediator
 * @concern     governance
 * @niche       scaffold
 * @purpose     governance:repo-health
 * @description Fills blank @type, @concern, @niche tags in script JSDoc headers by inferring
 *              values from the file path. Only patches blank fields — never overwrites existing
 *              values. Preserves all other tags and multi-line content.
 * @mode        edit
 * @pipeline    manual -> operations/scripts/, tools/dev/, .githooks/ -> patched headers
 * @scope       operations/scripts/, tools/scripts/, tools/dev/, .githooks/
 * @usage       node operations/scripts/remediators/governance/scaffold/update-jsdoc-headers.js [--write] [--verify]
 * @policy      R-R10
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const WRITE = process.argv.includes('--write');
const VERIFY = process.argv.includes('--verify');
const HELP = process.argv.includes('--help') || process.argv.includes('-h');
const REPO = process.cwd();

if (HELP) {
  console.log([
    'Usage:',
    '  node operations/scripts/remediators/governance/scaffold/update-jsdoc-headers.js [--write] [--verify]',
    '',
    'Modes:',
    '  (default)   Dry-run — report what would be patched',
    '  --write     Apply patches to files',
    '  --verify    After --write, re-check that blank fields are filled. Exit 1 if any remain',
    '',
    'Behaviour:',
    '  - Only fills BLANK @type, @concern, @niche fields',
    '  - Never overwrites existing non-empty values',
    '  - Preserves all other tags, multi-line descriptions, @policy, etc.',
    '  - Derives values from file path: operations/scripts/<type>/<concern>/<niche>/script.js',
  ].join('\n'));
  process.exit(0);
}

// ─── Taxonomy maps ───

const TYPE_MAP = {
  audits: 'audit',
  generators: 'generator',
  validators: 'validator',
  remediators: 'remediator',
  dispatch: 'dispatch',
  automations: 'automation',
  integrators: 'integrator',
};

const CONCERN_LIST = ['content', 'components', 'governance', 'ai'];

// ─── Discover scripts ───

function findScripts() {
  const dirs = [
    'operations/scripts/audits',
    'operations/scripts/generators',
    'operations/scripts/validators',
    'operations/scripts/remediators',
    'operations/scripts/dispatch',
    'operations/scripts/automations',
    'operations/scripts/config',
    'tools/scripts',
    'tools/dev',
    '.githooks',
  ];

  const scripts = [];
  for (const dir of dirs) {
    const full = path.join(REPO, dir);
    if (!fs.existsSync(full)) continue;
    try {
      const files = execSync(
        `find "${full}" -type f \\( -name "*.js" -o -name "*.sh" -o -name "*.py" \\) | grep -v node_modules | grep -v x-archive | grep -v "/test/" | grep -v "/lib/" | grep -v ".test."`,
        { encoding: 'utf8' }
      ).trim().split('\n').filter(Boolean);
      scripts.push(...files);
    } catch (_) { /* empty directory */ }
  }
  return scripts;
}

// ─── Derive taxonomy from path ───

function getTaxonomy(filePath) {
  const rel = path.relative(REPO, filePath).split(path.sep);

  // .githooks/script.js
  if (rel[0] === '.githooks') {
    return { type: 'dispatch', concern: 'governance', niche: 'hooks' };
  }

  // tools/dev/category/script.js
  if (rel[0] === 'tools' && rel[1] === 'dev') {
    const niche = rel.length > 3 ? rel[2] : 'dev-tools';
    return { type: 'automation', concern: 'governance', niche };
  }

  // tools/scripts/<type>/<concern>/script.js
  if (rel[0] === 'tools' && rel[1] === 'scripts') {
    const typeDir = rel[2] || '';
    const type = TYPE_MAP[typeDir] || typeDir;
    const concern = rel.length > 3 && CONCERN_LIST.includes(rel[3]) ? rel[3] : '';
    const niche = rel.length > 4 ? rel[rel.length - 2] : '';
    return { type, concern, niche };
  }

  // operations/scripts/config/script.js
  if (rel[0] === 'operations' && rel[1] === 'scripts' && rel[2] === 'config') {
    return { type: 'generator', concern: 'governance', niche: 'config' };
  }

  // operations/scripts/<type>/<concern>/<niche>/script.js
  if (rel[0] === 'operations' && rel[1] === 'scripts') {
    const typeDir = rel[2] || '';
    const type = TYPE_MAP[typeDir] || typeDir;
    const concern = rel.length > 3 && CONCERN_LIST.includes(rel[3]) ? rel[3] : '';
    const niche = rel.length > 5 ? rel[4] : (rel.length > 4 ? rel[4] : '');
    // If niche is the filename, clear it
    if (niche && niche.includes('.')) return { type, concern, niche: '' };
    return { type, concern, niche };
  }

  return { type: '', concern: '', niche: '' };
}

// ─── Extract existing tag values ───

function extractTagValue(content, tagName) {
  // Extract value from same line only — split by lines first
  const lines = content.split('\n');
  const re = new RegExp(`[*#]\\s*@${tagName}\\b\\s*(.*)`);
  for (const line of lines) {
    const match = line.match(re);
    if (match) {
      const val = match[1].trim();
      return val;
    }
  }
  return '';
}

// ─── Patch a single blank tag in-place ───

function patchBlankTag(content, tagName, newValue) {
  // Match a line like: * @type        (with only whitespace after the tag name)
  // or: * @type (nothing after)
  const re = new RegExp(`([ \\t]*[*#][ \\t]*@${tagName})[ \\t]*$`, 'm');
  if (!re.test(content)) return content; // tag line not found

  // Only replace if the current value is blank
  const existingValue = extractTagValue(content, tagName);
  if (existingValue) return content; // already has a value — do not touch

  return content.replace(re, `$1${' '.repeat(Math.max(1, 9 - tagName.length))}${newValue}`);
}

// ─── Main ───

const scripts = findScripts();
let patched = 0;
let skipped = 0;
let alreadyComplete = 0;
const errors = [];
const modifiedFiles = [];

for (const filePath of scripts) {
  const rel = path.relative(REPO, filePath);
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Must have a @script tag to be a governed script
    if (!/@script/.test(content)) {
      skipped++;
      continue;
    }

    const taxonomy = getTaxonomy(filePath);
    const existingType = extractTagValue(content, 'type');
    const existingConcern = extractTagValue(content, 'concern');
    const existingNiche = extractTagValue(content, 'niche');

    // Check if any fields are blank
    const needsType = !existingType && taxonomy.type;
    const needsConcern = !existingConcern && taxonomy.concern;
    const needsNiche = !existingNiche && taxonomy.niche;

    if (!needsType && !needsConcern && !needsNiche) {
      alreadyComplete++;
      continue;
    }

    let newContent = content;
    const fixes = [];

    if (needsType) {
      newContent = patchBlankTag(newContent, 'type', taxonomy.type);
      fixes.push(`@type=${taxonomy.type}`);
    }
    if (needsConcern) {
      newContent = patchBlankTag(newContent, 'concern', taxonomy.concern);
      fixes.push(`@concern=${taxonomy.concern}`);
    }
    if (needsNiche) {
      newContent = patchBlankTag(newContent, 'niche', taxonomy.niche);
      fixes.push(`@niche=${taxonomy.niche}`);
    }

    if (newContent === content) {
      // patchBlankTag didn't find the blank lines — tag lines may not exist
      skipped++;
      continue;
    }

    if (WRITE) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✓ ${rel}  [${fixes.join(', ')}]`);
      modifiedFiles.push(filePath);
    } else {
      console.log(`  [dry-run] ${rel}  [${fixes.join(', ')}]`);
    }
    patched++;
  } catch (e) {
    errors.push(`${rel}: ${e.message}`);
  }
}

console.log(`\n${WRITE ? 'Patched' : 'Would patch'}: ${patched} scripts`);
console.log(`Already complete: ${alreadyComplete}`);
console.log(`Skipped (no @script tag): ${skipped}`);
if (errors.length) {
  console.log(`Errors: ${errors.length}`);
  errors.forEach(e => console.log(`  ✗ ${e}`));
}

// ─── Verify layer ───

if (WRITE && VERIFY && modifiedFiles.length > 0) {
  console.log(`\nVerify: re-checking ${modifiedFiles.length} patched file(s)...`);

  let verifyFails = 0;
  let verifyWarns = 0;
  for (const filePath of modifiedFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const type = extractTagValue(content, 'type');
    const concern = extractTagValue(content, 'concern');
    const niche = extractTagValue(content, 'niche');
    const rel = path.relative(REPO, filePath);
    // @type and @concern are required — blank is a failure
    if (!type || !concern) {
      const blanks = [];
      if (!type) blanks.push('@type');
      if (!concern) blanks.push('@concern');
      console.log(`  FAIL: ${rel} — still blank: ${blanks.join(', ')}`);
      verifyFails++;
    }
    // @niche is advisory — blank is a warning, not a failure
    if (!niche) {
      console.log(`  WARN: ${rel} — @niche blank (path has no niche folder)`);
      verifyWarns++;
    }
  }

  if (verifyWarns > 0) {
    console.log(`\n${verifyWarns} warning(s): @niche could not be derived from path structure.`);
  }
  if (verifyFails > 0) {
    console.log(`VERIFY FAILED — ${verifyFails} file(s) still have blank required fields.`);
    process.exit(1);
  }
  console.log('VERIFY PASSED — all required fields (@type, @concern) filled.');
}

process.exit(errors.length > 0 ? 2 : 0);
