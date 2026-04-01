#!/usr/bin/env node
/**
 * @script            imports.test
 * @category          validator
 * @purpose           qa:import-integrity
 * @scope             tests
 * @domain            docs
 * @needs             E-R12, E-R14
 * @purpose-statement Validates MDX import paths and snippet imports are resolvable, with repo-wide dry-run support.
 * @pipeline          P1, P3
 * @usage             node operations/tests/unit/imports.test.js [--dry-run] [--scope routable-v2|repo] [--staged] [--files <paths>]
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const { getMdxFiles, getStagedDocsPageFiles, getStagedFiles, readFile } = require('../utils/file-walker');
const { extractImports } = require('../utils/mdx-parser');
const { validateSnippetImports } = require('../../../tools/editor-extensions/authoring-tools/lib/authoring-core');

let errors = [];
let warnings = [];
const REPO_ROOT = getRepoRoot();
const SCOPE_VALUES = new Set(['routable-v2', 'repo']);
const GENERATED_EXTERNAL_DOCS = [
  'awesome-livepeer-readme.mdx',
  'box-additional-config.mdx',
  'gwid-readme.mdx',
  'whitepaper.mdx',
  'wiki-readme.mdx'
];

function getRepoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (_error) {
    return process.cwd();
  }
}

function parseArgs(argv) {
  const parsed = {
    stagedOnly: false,
    dryRun: false,
    scope: 'routable-v2',
    files: []
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--staged') {
      parsed.stagedOnly = true;
      continue;
    }
    if (token === '--dry-run') {
      parsed.dryRun = true;
      continue;
    }
    if (token === '--scope') {
      parsed.scope = String(argv[i + 1] || '').trim().toLowerCase();
      i += 1;
      continue;
    }
    if (token === '--files' || token === '--file') {
      const raw = String(argv[i + 1] || '').trim();
      if (raw) {
        raw
          .split(',')
          .map((entry) => entry.trim())
          .filter(Boolean)
          .forEach((entry) => {
            parsed.files.push(path.isAbsolute(entry) ? entry : path.resolve(process.cwd(), entry));
          });
      }
      i += 1;
    }
  }

  if (!SCOPE_VALUES.has(parsed.scope)) {
    throw new Error(`Invalid --scope value "${parsed.scope}". Use routable-v2|repo.`);
  }

  parsed.files = [...new Set(parsed.files)];
  return parsed;
}

function ensureExternalDocs() {
  const externalDir = path.join(REPO_ROOT, 'snippets', 'external');
  const missingFiles = GENERATED_EXTERNAL_DOCS.filter(
    (fileName) => !fs.existsSync(path.join(externalDir, fileName))
  );

  if (missingFiles.length === 0) {
    return;
  }

  const fetchScript = path.join(REPO_ROOT, 'tools', 'scripts', 'snippets', 'fetch-external-docs.sh');
  if (!fs.existsSync(fetchScript)) {
    warnings.push({
      file: 'operations/scripts/automations/content/data/fetching/fetch-external-docs.sh',
      message: `Missing external-doc bootstrap script; generated imports may fail: ${missingFiles.join(', ')}`
    });
    return;
  }

  const result = spawnSync('bash', [fetchScript], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    env: {
      ...process.env,
      LC_ALL: process.env.LC_ALL || 'C',
      LANG: process.env.LANG || 'C'
    }
  });

  if (result.status !== 0) {
    const detail = String(result.stderr || result.stdout || '')
      .trim()
      .split('\n')
      .slice(-3)
      .join(' ');
    errors.push({
      file: 'operations/scripts/automations/content/data/fetching/fetch-external-docs.sh',
      rule: 'External docs fetch',
      message: `Failed to fetch generated external docs required for import validation.${detail ? ` ${detail}` : ''}`
    });
  }
}

function isStyleGuideExampleFile(file) {
  return file.includes('style-guide.mdx');
}

function getRepoMdxFiles() {
  const result = spawnSync('git', ['ls-files', '--', '*.mdx'], {
    cwd: REPO_ROOT,
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    return [];
  }

  return String(result.stdout || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => path.resolve(REPO_ROOT, line))
    .filter((filePath) => fs.existsSync(filePath));
}

function resolveImportTarget(importPath, currentFile) {
  let filePath;
  if (importPath.startsWith('/')) {
    filePath = path.join(REPO_ROOT, importPath);
  } else {
    const currentDir = path.dirname(currentFile);
    filePath = path.resolve(currentDir, importPath);
    const relativePath = path.relative(REPO_ROOT, filePath);
    filePath = path.join(REPO_ROOT, relativePath);
  }

  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js') && !filePath.endsWith('.mdx')) {
    const withJsx = `${filePath}.jsx`;
    const withJs = `${filePath}.js`;
    const withMdx = `${filePath}.mdx`;

    if (fs.existsSync(withJsx)) {
      filePath = withJsx;
    } else if (fs.existsSync(withJs)) {
      filePath = withJs;
    } else if (fs.existsSync(withMdx)) {
      filePath = withMdx;
    }
  }

  return filePath;
}

function checkBrokenImports(files) {
  files.forEach((file) => {
    if (!file.endsWith('.mdx')) return;

    const content = readFile(file);
    if (!content) return;

    validateSnippetImports(content, file).forEach((finding) => {
      errors.push({
        file,
        rule: finding.rule,
        message: finding.message,
        import: finding.importValue
      });
    });

    const imports = extractImports(content);
    imports.forEach((imp) => {
      const importPath = String(imp.path || '').trim();

      if (!importPath.startsWith('/') && !importPath.startsWith('./') && !importPath.startsWith('../')) {
        return;
      }

      const filePath = resolveImportTarget(importPath, file);
      if (!fs.existsSync(filePath)) {
        errors.push({
          file,
          rule: 'Broken import',
          message: `Import from "${importPath}" points to non-existent file`,
          import: importPath,
          expected: filePath.replace(`${REPO_ROOT}/`, '')
        });
      }
    });
  });
}

function runTests(options = {}) {
  errors = [];
  warnings = [];
  ensureExternalDocs();

  const { files = null, stagedOnly = false, scope = 'routable-v2', dryRun = false } = options;

  let testFiles = files;
  if (!testFiles) {
    if (stagedOnly) {
      testFiles = scope === 'repo'
        ? getStagedFiles().filter((filePath) => filePath.endsWith('.mdx'))
        : getStagedDocsPageFiles().filter((filePath) => filePath.endsWith('.mdx'));
    } else if (scope === 'repo') {
      testFiles = getRepoMdxFiles();
    } else {
      testFiles = getMdxFiles();
    }
  }

  testFiles = testFiles.filter((file) => file.endsWith('.mdx'));
  testFiles = testFiles.filter((file) => !isStyleGuideExampleFile(file));

  checkBrokenImports(testFiles);

  return {
    errors,
    warnings,
    passed: errors.length === 0,
    total: testFiles.length,
    scope,
    dryRun
  };
}

if (require.main === module) {
  const parsed = parseArgs(process.argv.slice(2));
  const result = runTests({
    stagedOnly: parsed.stagedOnly,
    files: parsed.files.length > 0 ? parsed.files : null,
    scope: parsed.scope,
    dryRun: parsed.dryRun
  });

  if (parsed.dryRun) {
    console.log('\nℹ️  Dry run: imports.test.js is read-only; no files were modified.');
  }

  if (result.errors.length > 0) {
    console.error('\n❌ Broken Imports Errors:\n');
    result.errors.forEach((err) => {
      console.error(`  ${err.file}`);
      console.error(`    ${err.rule}: ${err.message}`);
      if (err.expected) {
        console.error(`    Expected: ${err.expected}`);
      }
      console.error('');
    });
  }

  if (result.warnings.length > 0) {
    console.warn('\n⚠️  Import Warnings:\n');
    result.warnings.forEach((warn) => {
      console.warn(`  ${warn.file} - ${warn.message}`);
    });
  }

  if (result.passed) {
    console.log(`\n✅ All imports valid (${result.total} files checked)`);
    process.exit(0);
  } else {
    console.error(`\n❌ ${result.errors.length} broken import(s) found`);
    process.exit(1);
  }
}

module.exports = { parseArgs, runTests };
