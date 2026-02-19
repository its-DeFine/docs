#!/usr/bin/env node
/**
 * @script script-docs-test
 * @summary Enforce script header template for new scripts and maintain README script indexes.
 * @owner docs
 * @scope tests/unit, tests/README.md, .githooks/README.md, tools/scripts, tasks/scripts
 *
 * @usage
 *   node tests/unit/script-docs.test.js --staged --write --stage
 *
 * @inputs
 *   --staged (checks newly added staged scripts only)
 *   --write (updates README script indexes)
 *   --stage (git add changed README indexes)
 *   --autofill (inject template into newly added scripts missing tags)
 *
 * @outputs
 *   - Updated README index blocks between SCRIPT-INDEX markers
 *
 * @exit-codes
 *   0 = validation passed
 *   1 = template violations detected
 *
 * @examples
 *   node tests/unit/script-docs.test.js --staged --write --stage
 *   node tests/unit/script-docs.test.js --staged
 *
 * @notes
 *   Template enforcement targets newly added scripts by design.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = process.cwd();
const INDEX_START = '<!-- SCRIPT-INDEX:START -->';
const INDEX_END = '<!-- SCRIPT-INDEX:END -->';

const REQUIRED_TAGS = [
  '@script',
  '@summary',
  '@owner',
  '@scope',
  '@usage',
  '@inputs',
  '@outputs',
  '@exit-codes',
  '@examples',
  '@notes'
];

const INLINE_REQUIRED_TAGS = ['@script', '@summary', '@owner', '@scope'];
const BLOCK_REQUIRED_TAGS = ['@usage', '@inputs', '@outputs', '@exit-codes', '@examples', '@notes'];
const PLACEHOLDER_PATTERNS = [
  /^<.*>$/,
  /^todo\b/i,
  /^tbd\b/i,
  /^fill\b/i,
  /^replace\b/i,
  /^n\/a$/i,
  /^none$/i
];

const SCRIPT_EXTENSIONS = new Set([
  '.js',
  '.cjs',
  '.mjs',
  '.ts',
  '.tsx',
  '.sh',
  '.bash',
  '.py'
]);

// Explicit mapping for script folders to documentation files.
const README_MAP = [
  { root: '.githooks', readme: '.githooks/README.md' },
  { root: 'tests', readme: 'tests/README.md' },
  { root: 'tools/scripts', readme: 'tools/scripts/README.md' },
  { root: 'tasks/scripts', readme: 'tasks/scripts/README.md' },
  { root: 'v2/scripts/dev', readme: 'v2/scripts/dev/README.mdx' }
];

function normalizeRepoPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function existsRepoPath(repoPath) {
  return fs.existsSync(path.join(REPO_ROOT, repoPath));
}

function readFileSafe(repoPath) {
  try {
    return fs.readFileSync(path.join(REPO_ROOT, repoPath), 'utf8');
  } catch (_err) {
    return '';
  }
}

function isScriptFile(repoPath) {
  const ext = path.extname(repoPath).toLowerCase();
  if (SCRIPT_EXTENSIONS.has(ext)) return true;
  const content = readFileSafe(repoPath);
  return content.startsWith('#!/usr/bin/env') || content.startsWith('#!/bin/');
}

function getStagedAddedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=A', { encoding: 'utf8' });
    return output.split('\n').map((line) => line.trim()).filter(Boolean);
  } catch (_err) {
    return [];
  }
}

function walkFiles(dirPath, out = []) {
  const full = path.join(REPO_ROOT, dirPath);
  if (!fs.existsSync(full)) return out;
  const entries = fs.readdirSync(full, { withFileTypes: true });
  for (const entry of entries) {
    const rel = normalizeRepoPath(path.join(dirPath, entry.name));
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walkFiles(rel, out);
    } else {
      out.push(rel);
    }
  }
  return out;
}

function getAllScriptFiles() {
  const roots = [...new Set(README_MAP.map((x) => x.root))];
  const all = [];
  for (const root of roots) {
    walkFiles(root, all);
  }
  return all.filter((file) => isScriptFile(file));
}

function getHeaderChunk(content) {
  return content.split('\n').slice(0, 120).join('\n');
}

function getTagValue(header, tagName) {
  const re = new RegExp(`\\${tagName}\\s+(.+)`);
  const match = header.match(re);
  return match ? match[1].trim() : '';
}

function isPlaceholderValue(value) {
  const v = String(value || '').trim();
  if (!v) return true;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(v));
}

function getSectionLines(header, tagName) {
  const lines = header.split('\n');
  const out = [];
  const tagToken = tagName.replace('@', '');
  const idx = lines.findIndex((line) => line.includes(`@${tagToken}`));
  if (idx === -1) return out;

  for (let i = idx + 1; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed) continue;

    const stripped = trimmed
      .replace(/^\*\s?/, '')
      .replace(/^#\s?/, '')
      .trim();

    if (stripped.startsWith('@')) break;
    if (stripped.startsWith('/**') || stripped.startsWith('*/')) continue;

    out.push(stripped);
  }

  return out;
}

function extractPrimaryUsage(header) {
  const lines = header.split('\n');
  const idx = lines.findIndex((line) => line.includes('@usage'));
  if (idx === -1) return '';
  for (let i = idx + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) continue;
    if (t.includes('@') && t.startsWith('*')) break;
    if (t.includes('@') && t.startsWith('#')) break;
    if (t.startsWith('*')) {
      const c = t.replace(/^\*\s?/, '').trim();
      if (c) return c;
    } else if (t.startsWith('#')) {
      const c = t.replace(/^#\s?/, '').trim();
      if (c) return c;
    } else if (!t.startsWith('//')) {
      return t;
    }
  }
  return '';
}

function validateTemplate(repoPath) {
  const content = readFileSafe(repoPath);
  const header = getHeaderChunk(content);
  const missing = REQUIRED_TAGS.filter((tag) => !header.includes(tag));
  const empty = [];

  INLINE_REQUIRED_TAGS.forEach((tag) => {
    if (missing.includes(tag)) return;
    const value = getTagValue(header, tag);
    if (isPlaceholderValue(value)) {
      empty.push(tag);
    }
  });

  BLOCK_REQUIRED_TAGS.forEach((tag) => {
    if (missing.includes(tag)) return;
    const sectionLines = getSectionLines(header, tag);
    const meaningful = sectionLines.filter((line) => !isPlaceholderValue(line));
    if (meaningful.length === 0) {
      empty.push(tag);
    }
  });

  return {
    file: repoPath,
    valid: missing.length === 0 && empty.length === 0,
    missing,
    empty,
    script: getTagValue(header, '@script') || path.basename(repoPath),
    summary: getTagValue(header, '@summary'),
    usage: extractPrimaryUsage(header)
  };
}

function buildUsageDefault(repoPath) {
  if (repoPath.endsWith('.sh') || repoPath.endsWith('.bash')) return `bash ${repoPath}`;
  if (repoPath.endsWith('.py')) return `python3 ${repoPath}`;
  return `node ${repoPath}`;
}

function buildTemplateBlock(repoPath, style) {
  const scriptName = path.basename(repoPath, path.extname(repoPath));
  const usageDefault = buildUsageDefault(repoPath);

  if (style === 'hash') {
    const lines = [
      '# @script ' + scriptName,
      '# @summary TODO: one-line purpose',
      '# @owner TODO: team-or-role',
      '# @scope TODO: paths-or-domain',
      '#',
      '# @usage',
      '#   ' + usageDefault,
      '#',
      '# @inputs',
      '#   TODO: --flag <description> (default: ...)',
      '#',
      '# @outputs',
      '#   - TODO: output file/path/side effect',
      '#',
      '# @exit-codes',
      '#   0 = success',
      '#   1 = failure',
      '#',
      '# @examples',
      '#   ' + usageDefault,
      '#',
      '# @notes',
      '#   TODO: caveats, constraints, safety notes',
      ''
    ];
    return lines.join('\n');
  }

  const lines = [
    '/**',
    ` * @script ${scriptName}`,
    ' * @summary TODO: one-line purpose',
    ' * @owner TODO: team-or-role',
    ' * @scope TODO: paths-or-domain',
    ' *',
    ' * @usage',
    ` *   ${usageDefault}`,
    ' *',
    ' * @inputs',
    ' *   TODO: --flag <description> (default: ...)',
    ' *',
    ' * @outputs',
    ' *   - TODO: output file/path/side effect',
    ' *',
    ' * @exit-codes',
    ' *   0 = success',
    ' *   1 = failure',
    ' *',
    ' * @examples',
    ` *   ${usageDefault}`,
    ' *',
    ' * @notes',
    ' *   TODO: caveats, constraints, safety notes',
    ' */',
    ''
  ];
  return lines.join('\n');
}

function injectTemplateIfMissing(repoPath) {
  const fullPath = path.join(REPO_ROOT, repoPath);
  const existing = readFileSafe(repoPath);
  if (!existing) return false;

  const header = getHeaderChunk(existing);
  const hasAnyTag = REQUIRED_TAGS.some((tag) => header.includes(tag));
  if (hasAnyTag) return false;

  const shebangMatch = existing.match(/^(#![^\n]*\n)/);
  const shebang = shebangMatch ? shebangMatch[1] : '';
  const body = shebang ? existing.slice(shebang.length) : existing;
  const style = (repoPath.endsWith('.sh') || repoPath.endsWith('.bash') || repoPath.endsWith('.py')) ? 'hash' : 'block';
  const template = buildTemplateBlock(repoPath, style);
  const updated = `${shebang}${template}${body}`;

  if (updated !== existing) {
    fs.writeFileSync(fullPath, updated);
    return true;
  }
  return false;
}

function resolveReadmeForScript(scriptPath) {
  const normalized = normalizeRepoPath(scriptPath);
  const explicit = README_MAP.find((m) => normalized === m.root || normalized.startsWith(`${m.root}/`));
  if (explicit) {
    return {
      readmePath: explicit.readme,
      scopeRoot: explicit.root
    };
  }

  let dir = path.dirname(normalized);
  while (dir && dir !== '.') {
    const md = normalizeRepoPath(path.join(dir, 'README.md'));
    const mdx = normalizeRepoPath(path.join(dir, 'README.mdx'));
    if (existsRepoPath(md)) return { readmePath: md, scopeRoot: dir };
    if (existsRepoPath(mdx)) return { readmePath: mdx, scopeRoot: dir };
    dir = path.dirname(dir);
    if (dir === '/') break;
  }

  const fallbackReadme = normalizeRepoPath(path.join(path.dirname(normalized), 'README.md'));
  return {
    readmePath: fallbackReadme,
    scopeRoot: path.dirname(normalized)
  };
}

function generateIndexMarkdown(scopeRoot) {
  const scripts = walkFiles(scopeRoot, []).filter((file) => isScriptFile(file));
  const docs = scripts
    .map(validateTemplate)
    .filter((x) => x.valid)
    .sort((a, b) => a.file.localeCompare(b.file));

  if (docs.length === 0) {
    return [
      '## Script Index',
      '',
      '_No documented scripts found in this scope yet._'
    ].join('\n');
  }

  const rows = [
    '## Script Index',
    '',
    '| Script | Summary | Usage |',
    '|---|---|---|'
  ];

  docs.forEach((doc) => {
    const usage = doc.usage ? `\`${doc.usage.replace(/\|/g, '\\|')}\`` : '';
    const summary = (doc.summary || '').replace(/\|/g, '\\|');
    rows.push(`| \`${doc.file}\` | ${summary} | ${usage} |`);
  });

  return rows.join('\n');
}

function upsertReadmeIndex(readmePath, scopeRoot) {
  const readmeFullPath = path.join(REPO_ROOT, readmePath);
  const indexBlock = `${INDEX_START}\n${generateIndexMarkdown(scopeRoot)}\n${INDEX_END}`;

  let existing = '';
  if (fs.existsSync(readmeFullPath)) {
    existing = fs.readFileSync(readmeFullPath, 'utf8');
  } else {
    const title = `# ${path.basename(scopeRoot)} Scripts`;
    existing = `${title}\n\n`;
  }

  let updated;
  if (existing.includes(INDEX_START) && existing.includes(INDEX_END)) {
    updated = existing.replace(new RegExp(`${INDEX_START}[\\s\\S]*?${INDEX_END}`, 'm'), indexBlock);
  } else {
    updated = `${existing.trimEnd()}\n\n${indexBlock}\n`;
  }

  if (updated !== existing) {
    fs.mkdirSync(path.dirname(readmeFullPath), { recursive: true });
    fs.writeFileSync(readmeFullPath, updated);
    return true;
  }
  return false;
}

function stageFiles(repoPaths) {
  if (!repoPaths.length) return;
  const args = repoPaths.map((p) => `"${p}"`).join(' ');
  execSync(`git add ${args}`, { stdio: 'ignore' });
}

function runTests(options = {}) {
  const stagedOnly = Boolean(options.stagedOnly);
  const write = Boolean(options.write);
  const stage = Boolean(options.stage);
  const autofill = Boolean(options.autofill);

  const errors = [];
  const warnings = [];
  const changedReadmes = [];
  const autofilledScripts = [];

  const candidateScripts = stagedOnly
    ? getStagedAddedFiles().filter((file) => isScriptFile(file))
    : getAllScriptFiles();

  if (autofill) {
    candidateScripts.forEach((scriptPath) => {
      const changed = injectTemplateIfMissing(scriptPath);
      if (changed) autofilledScripts.push(scriptPath);
    });
    if (stage && autofilledScripts.length > 0) {
      try {
        stageFiles(autofilledScripts);
      } catch (err) {
        warnings.push({
          file: '(git add)',
          rule: 'Script template staging',
          message: `Failed to stage autofilled scripts: ${err.message}`,
          line: 1
        });
      }
    }
  }

  // Enforce template only for newly added scripts.
  const enforceTargets = stagedOnly ? candidateScripts : [];
  enforceTargets.forEach((scriptPath) => {
    const result = validateTemplate(scriptPath);
    if (!result.valid) {
      const parts = [];
      if (result.missing.length > 0) {
        parts.push(`missing required tags: ${result.missing.join(', ')}`);
      }
      if (result.empty.length > 0) {
        parts.push(`empty/placeholder values: ${result.empty.join(', ')}`);
      }
      errors.push({
        file: scriptPath,
        rule: 'Script header template',
        message: parts.join(' | '),
        line: 1
      });
    }
  });

  if (write) {
    const affected = new Map();
    candidateScripts.forEach((scriptPath) => {
      const mapping = resolveReadmeForScript(scriptPath);
      affected.set(mapping.readmePath, mapping.scopeRoot);
    });

    for (const [readmePath, scopeRoot] of affected.entries()) {
      const changed = upsertReadmeIndex(readmePath, scopeRoot);
      if (changed) changedReadmes.push(readmePath);
    }

    if (stage && changedReadmes.length > 0) {
      try {
        stageFiles(changedReadmes);
      } catch (err) {
        warnings.push({
          file: '(git add)',
          rule: 'README staging',
          message: `Failed to stage updated READMEs automatically: ${err.message}`,
          line: 1
        });
      }
    }
  }

  return {
    errors,
    warnings,
    changedReadmes,
    autofilledScripts,
    passed: errors.length === 0,
    total: candidateScripts.length
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const stagedOnly = args.includes('--staged');
  const write = args.includes('--write');
  const stage = args.includes('--stage');
  const autofill = args.includes('--autofill');

  const result = runTests({ stagedOnly, write, stage, autofill });

  if (result.errors.length > 0) {
    console.error('\n❌ Script documentation enforcement failed:\n');
    result.errors.forEach((err) => {
      console.error(`  ${err.file}:${err.line} - ${err.message}`);
    });
    console.error('\nRequired template tags:');
    console.error(`  ${REQUIRED_TAGS.join(', ')}`);
  }

  if (result.changedReadmes.length > 0) {
    console.log('\n📝 Updated README script indexes:');
    result.changedReadmes.forEach((p) => console.log(`  - ${p}`));
  }

  if (result.autofilledScripts.length > 0) {
    console.log('\n🧩 Injected script header template into:');
    result.autofilledScripts.forEach((p) => console.log(`  - ${p}`));
    console.log('Fill placeholder values before commit.');
  }

  if (result.errors.length === 0) {
    console.log('\n✅ Script documentation checks passed');
    process.exit(0);
  }

  process.exit(1);
}

module.exports = { runTests };
