#!/usr/bin/env node
/**
 * @script      validate-component-creation
 * @type        validator
 * @concern     components
 * @niche       library
 * @purpose     governance:quality-gate
 * @description Validates new/modified .jsx files in snippets/components/ for 7-tag JSDoc presence,
 *              PascalCase naming, and folder placement. Self-remediates missing tags where inferable.
 *              Blocks commit only on non-remediable violations.
 * @mode        read-write
 * @pipeline    pre-commit, pr-workflow -> snippets/components/ -> exit-code, stdout:violations
 * @scope       snippets/components/
 * @usage       node operations/scripts/validators/components/library/validate-component-creation.js [--check] [--fix] [--dry-run] [--staged] [--files path,path]
 * @policy      R-R10
 */

const fs = require('fs');
const path = require('path');
const {
  REPO_ROOT,
  VALID_CATEGORIES,
  VALID_STATUSES,
  collectGovernedExportCodeSegments,
  extractExports,
  getCategoryFromPath,
  getComponentFiles,
  getStagedComponentFiles,
  parseJSDocBlock,
  replaceRange,
  updateJSDocTags
} = require('../../../../../tools/lib/governance/component-governance-utils');

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const PASCAL_CASE_FILE_RE = /^[A-Z][a-zA-Z0-9]*\.jsx$/;
const PASCAL_CASE_EXPORT_RE = /^[A-Z][a-zA-Z0-9]*$/;

/**
 * Required governance tags — checks both current (@category/@subcategory) and
 * migrated (@type/@subniche) tag names. Writes @category/@subcategory since
 * that is what production components use.
 */
const REQUIRED_TAGS = ['component', 'status', 'description'];
const CATEGORY_TAGS = ['category', 'type'];
const SUBCATEGORY_TAGS = ['subcategory', 'subniche'];

function printHelp() {
  console.log(
    [
      'Usage:',
      '  node operations/scripts/validators/components/library/validate-component-creation.js [options]',
      '',
      'Options:',
      '  --check      Validate only, exit 1 on violations (default)',
      '  --fix        Apply auto-remediations and write files',
      '  --dry-run    Show what --fix would do without writing',
      '  --staged     Only check git-staged .jsx files (for pre-commit)',
      '  --files      Comma-separated file paths to validate',
      '  --help, -h   Show this help message',
      '',
      'Self-remediates:',
      '  Missing @component        → set to export name',
      '  Missing @category/@type   → infer from folder path',
      '  Missing @subcategory      → infer from folder path',
      '  Missing @status           → set to "stable"',
      '  Missing @aiDiscoverability → set to "none"',
      '',
      'Non-remediable (blocks commit):',
      '  Missing @description',
      '  @component does not match export name',
      '  @category does not match folder category',
      '  @subcategory does not match folder subcategory'
    ].join('\n')
  );
}

function parseArgs(argv) {
  const args = {
    mode: 'check',
    staged: false,
    files: [],
    help: false
  };

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      args.help = true;
    } else if (token === '--check') {
      args.mode = 'check';
    } else if (token === '--fix') {
      args.mode = 'fix';
    } else if (token === '--dry-run') {
      args.mode = 'dry-run';
    } else if (token === '--staged') {
      args.staged = true;
    } else if (token === '--files') {
      const next = argv[i + 1];
      if (next) {
        args.files = next.split(',').map((f) => f.trim()).filter(Boolean);
        i++;
      }
    } else {
      console.error(`${RED}Unknown argument: ${token}${RESET}`);
      process.exit(2);
    }
  }

  return args;
}

function getTagValue(jsDoc, primaryTag, fallbackTags) {
  if (!jsDoc || !jsDoc.tags) return '';
  if (jsDoc.tags[primaryTag]) return jsDoc.tags[primaryTag];
  if (fallbackTags) {
    for (const tag of fallbackTags) {
      if (jsDoc.tags[tag]) return jsDoc.tags[tag];
    }
  }
  return '';
}

function getSubcategoryFromPath(filePath) {
  const posix = filePath.replace(/\\/g, '/');
  const match = posix.match(/snippets\/components\/[^/]+\/([^/]+)\//);
  return match ? match[1] : '';
}

function validateFile(filePath, mode) {
  const result = {
    file: filePath,
    exports: 0,
    errors: [],
    warnings: [],
    remediations: [],
    fixedContent: null
  };

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    result.errors.push({ type: 'RUNTIME', message: `Cannot read file: ${err.message}` });
    return result;
  }

  let exports;
  try {
    exports = extractExports(filePath);
  } catch (err) {
    result.errors.push({ type: 'PARSE', message: `Cannot parse exports: ${err.message}` });
    return result;
  }

  if (exports.length === 0) {
    result.warnings.push({ type: 'EMPTY', message: 'No governed exports found' });
    return result;
  }

  result.exports = exports.length;

  const filename = path.basename(filePath);
  if (!PASCAL_CASE_FILE_RE.test(filename)) {
    result.warnings.push({
      type: 'NAMING',
      message: `Filename "${filename}" is not PascalCase — manual rename required`
    });
  }

  const folderCategory = getCategoryFromPath(filePath);
  const folderSubcategory = getSubcategoryFromPath(filePath);
  const needsFix = mode === 'fix' || mode === 'dry-run';
  let workingContent = content;
  let contentModified = false;

  for (const exp of exports) {
    const exportName = exp.name;

    if (!PASCAL_CASE_EXPORT_RE.test(exportName)) {
      result.warnings.push({
        type: 'NAMING',
        export: exportName,
        message: `Export "${exportName}" is not PascalCase`
      });
    }

    if (!exp.jsDocBlock) {
      result.errors.push({
        type: 'MISSING_JSDOC',
        export: exportName,
        message: `No JSDoc block for export "${exportName}"`
      });
      continue;
    }

    const jsDoc = parseJSDocBlock(exp.jsDocBlock);
    const replacements = {};

    const componentTag = getTagValue(jsDoc, 'component');
    if (!componentTag) {
      replacements.component = exportName;
      result.remediations.push({
        export: exportName,
        tag: '@component',
        value: exportName
      });
    } else if (componentTag !== exportName) {
      result.errors.push({
        type: 'MISMATCH',
        export: exportName,
        message: `@component "${componentTag}" does not match export name "${exportName}"`
      });
    }

    const categoryTag = getTagValue(jsDoc, 'category', ['type']);
    if (!categoryTag) {
      if (folderCategory) {
        replacements.category = folderCategory;
        result.remediations.push({
          export: exportName,
          tag: '@category',
          value: folderCategory
        });
      } else {
        result.errors.push({
          type: 'MISSING',
          export: exportName,
          message: 'Missing @category and cannot infer from folder path'
        });
      }
    } else if (folderCategory && categoryTag !== folderCategory) {
      result.errors.push({
        type: 'MISMATCH',
        export: exportName,
        message: `@category "${categoryTag}" does not match folder category "${folderCategory}"`
      });
    }

    const subcategoryTag = getTagValue(jsDoc, 'subcategory', ['subniche']);
    if (!subcategoryTag) {
      if (folderSubcategory) {
        replacements.subcategory = folderSubcategory;
        result.remediations.push({
          export: exportName,
          tag: '@subcategory',
          value: folderSubcategory
        });
      } else {
        result.warnings.push({
          type: 'MISSING',
          export: exportName,
          message: 'Missing @subcategory and cannot infer from folder path'
        });
      }
    } else if (folderSubcategory && subcategoryTag !== folderSubcategory) {
      result.errors.push({
        type: 'MISMATCH',
        export: exportName,
        message: `@subcategory "${subcategoryTag}" does not match folder "${folderSubcategory}"`
      });
    }

    const statusTag = getTagValue(jsDoc, 'status');
    if (!statusTag) {
      replacements.status = 'stable';
      result.remediations.push({
        export: exportName,
        tag: '@status',
        value: 'stable'
      });
    } else if (!VALID_STATUSES.includes(statusTag)) {
      result.warnings.push({
        type: 'INVALID',
        export: exportName,
        message: `@status "${statusTag}" is not a valid status (${VALID_STATUSES.join(', ')})`
      });
    }

    const descriptionTag = getTagValue(jsDoc, 'description');
    if (!descriptionTag) {
      result.errors.push({
        type: 'MISSING',
        export: exportName,
        message: 'Missing @description — cannot auto-remediate'
      });
    }

    const aiTag = getTagValue(jsDoc, 'aiDiscoverability');
    if (!aiTag) {
      replacements.aiDiscoverability = 'none';
      result.remediations.push({
        export: exportName,
        tag: '@aiDiscoverability',
        value: 'none'
      });
    }

    if (needsFix && Object.keys(replacements).length > 0 && exp.jsDocRange) {
      const updatedBlock = updateJSDocTags(exp.jsDocBlock, replacements);
      if (updatedBlock !== exp.jsDocBlock) {
        workingContent = replaceRange(
          workingContent,
          exp.jsDocRange.start,
          exp.jsDocRange.end,
          updatedBlock
        );
        contentModified = true;
      }
    }
  }

  if (contentModified) {
    const beforeSegments = collectGovernedExportCodeSegments(content);
    const afterSegments = collectGovernedExportCodeSegments(workingContent);
    const beforeMap = new Map(beforeSegments.map((s) => [s.name, s.code]));
    const afterMap = new Map(afterSegments.map((s) => [s.name, s.code]));
    let safeToWrite = true;

    if (beforeMap.size !== afterMap.size) {
      safeToWrite = false;
    } else {
      for (const [name, code] of beforeMap.entries()) {
        if (!afterMap.has(name) || afterMap.get(name) !== code) {
          safeToWrite = false;
          break;
        }
      }
    }

    if (safeToWrite) {
      result.fixedContent = workingContent;
    } else {
      result.errors.push({
        type: 'SAFETY',
        message: 'Export code segments changed during remediation — aborting write for safety'
      });
      result.fixedContent = null;
    }
  }

  return result;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  let files;

  if (args.files.length > 0) {
    files = args.files.map((f) => {
      const abs = path.isAbsolute(f) ? f : path.resolve(REPO_ROOT, f);
      return { absolutePath: abs, displayPath: path.relative(REPO_ROOT, abs) };
    });
  } else if (args.staged) {
    files = getStagedComponentFiles();
  } else {
    files = getComponentFiles();
  }

  if (files.length === 0) {
    console.log(`${GREEN}No component files to validate.${RESET}`);
    process.exit(0);
  }

  console.log(`\n${BOLD}Component Governance Validator${RESET}`);
  console.log('═'.repeat(40));
  console.log(`${DIM}Mode: ${args.mode} | Files: ${files.length}${RESET}\n`);

  let totalExports = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalRemediations = 0;
  let filesRemediated = 0;

  for (const { absolutePath, displayPath } of files) {
    const result = validateFile(absolutePath, args.mode);
    totalExports += result.exports;
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    totalRemediations += result.remediations.length;

    const hasIssues = result.errors.length > 0 || result.warnings.length > 0 || result.remediations.length > 0;

    if (hasIssues) {
      console.log(`${BOLD}${displayPath}${RESET}`);

      for (const err of result.errors) {
        const prefix = err.export ? `  ${err.export}: ` : '  ';
        console.log(`  ${RED}ERROR${RESET} ${prefix}${err.message}`);
      }

      for (const warn of result.warnings) {
        const prefix = warn.export ? `  ${warn.export}: ` : '  ';
        console.log(`  ${YELLOW}WARN${RESET}  ${prefix}${warn.message}`);
      }

      for (const rem of result.remediations) {
        const action = args.mode === 'check' ? 'WOULD FIX' : 'REMEDIATED';
        console.log(`  ${GREEN}${action}${RESET}  ${rem.export}: ${rem.tag} → "${rem.value}"`);
      }

      if (result.fixedContent !== null && args.mode === 'fix') {
        try {
          fs.writeFileSync(absolutePath, result.fixedContent, 'utf8');
          filesRemediated++;
          console.log(`  ${GREEN}✓ File updated${RESET}`);
        } catch (err) {
          console.log(`  ${RED}✗ Failed to write: ${err.message}${RESET}`);
          totalErrors++;
        }
      } else if (result.fixedContent !== null && args.mode === 'dry-run') {
        filesRemediated++;
        console.log(`  ${DIM}(dry-run — would update file)${RESET}`);
      }

      console.log('');
    }
  }

  console.log('─'.repeat(40));
  console.log(`Files checked:      ${files.length}`);
  console.log(`Exports validated:  ${totalExports}`);
  if (totalRemediations > 0) {
    const verb = args.mode === 'fix' ? 'Auto-remediated' : 'Would remediate';
    console.log(`${verb}:     ${totalRemediations} tags across ${filesRemediated} files`);
  }
  if (totalErrors > 0) {
    console.log(`${RED}Errors (blocking):  ${totalErrors}${RESET}`);
  }
  if (totalWarnings > 0) {
    console.log(`${YELLOW}Warnings:           ${totalWarnings}${RESET}`);
  }
  console.log('');

  if (totalErrors > 0) {
    console.log(`${RED}${BOLD}FAIL${RESET} — ${totalErrors} non-remediable violation(s) found\n`);
    process.exit(1);
  }

  console.log(`${GREEN}${BOLD}PASS${RESET}\n`);
  process.exit(0);
}

try {
  main();
} catch (err) {
  console.error(`${RED}Runtime error: ${err.message}${RESET}`);
  if (process.env.DEBUG) console.error(err.stack);
  process.exit(2);
}
