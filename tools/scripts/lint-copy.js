#!/usr/bin/env node
/**
 * @script            lint-copy
 * @category          enforcer
 * @purpose           qa:content-quality
 * @scope             staged, changed, v2-content, single-file
 * @owner             docs
 * @needs             E-R1, R-R11
 * @purpose-statement Enforce banned word and phrase rules on MDX content files.
 * @pipeline          indirect, manual
 * @usage             node tools/scripts/lint-copy.js [file or glob] [flags]
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COPY_GOVERNANCE_DIR = path.resolve(__dirname, '../lib/copy-governance');

const BANNED_WORDS = fs
  .readFileSync(path.join(COPY_GOVERNANCE_DIR, 'banned-words.txt'), 'utf8')
  .split('\n')
  .map((word) => word.trim())
  .filter(Boolean);

const BANNED_PHRASES = fs
  .readFileSync(path.join(COPY_GOVERNANCE_DIR, 'banned-phrases.txt'), 'utf8')
  .split('\n')
  .map((phrase) => phrase.trim())
  .filter(Boolean);

const TIER2_PATTERNS = [
  {
    id: 'CONDITIONAL_IF',
    label: '"if" in body prose — check for conditional gatekeeping',
    regex: /(?<!\/\/.*)\bif\b(?![^`\n]*`[^`\n]*$)/gim,
    exclude: /```[\s\S]*?```|{\/\*[\s\S]*?\*\/}/g
  },
  {
    id: 'NOT_CONSTRUCTION',
    label: '"not [noun/verb]" — restate as positive claim',
    regex: /\bnot\s+[a-z]/gim,
    exclude: /```[\s\S]*?```|{\/\*[\s\S]*?\*\/}/g
  },
  {
    id: 'WEAKENED_VALUE',
    label: '"can/may [verb]" in apparent value claim — assert directly or delete',
    regex: /\b(can|may)\s+[a-z]+/gim,
    exclude: /```[\s\S]*?```|{\/\*[\s\S]*?\*\/}/g
  },
  {
    id: 'SELF_UNDERMINING_VALUE',
    label: '"[value] — if" construction — split into two sentences',
    regex: /—\s+if\b/gim,
    exclude: /```[\s\S]*?```/g
  },
  {
    id: 'CONSISTENTLY_NO_NUMBER',
    label: '"consistently" without adjacent number — add threshold or rewrite',
    regex: /\bconsistently\b(?!.{0,60}\d)/gim,
    exclude: /```[\s\S]*?```/g
  },
  {
    id: 'CURRENCY_NON_USD',
    label: 'Non-USD currency outside declared regional scope — use USD',
    regex: /[£€¥]/gm,
    exclude: null
  },
  {
    id: 'REVIEW_FLAG_RENDERED',
    label: 'Unresolved REVIEW flag in rendered content — BLOCKS MERGE',
    regex: /\{\/\*\s*REVIEW:/gm,
    exclude: null,
    tier1: true
  }
];

function readFileListFromEnv() {
  const listPath = String(process.env.LINT_FILE_LIST || '').trim();
  if (!listPath || !fs.existsSync(listPath)) {
    return [];
  }

  return fs
    .readFileSync(listPath, 'utf8')
    .split('\n')
    .map((filePath) => filePath.trim())
    .filter(Boolean)
    .filter((filePath) => /\.(md|mdx)$/i.test(filePath))
    .filter((filePath) => fs.existsSync(filePath));
}

function getFiles() {
  const envFiles = readFileListFromEnv();
  if (envFiles.length > 0) {
    return envFiles;
  }

  const args = process.argv.slice(2);
  if (args.includes('--changed-files')) {
    const diff = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf8'
    });
    return diff
      .split('\n')
      .filter((filePath) => filePath.endsWith('.mdx') || filePath.endsWith('.md'))
      .filter((filePath) => fs.existsSync(filePath));
  }

  const target = args.find((arg) => !arg.startsWith('--')) || 'v2/**/*.mdx';
  if (fs.existsSync(target)) return [target];
  return [];
}

function stripCodeAndComments(content) {
  return content
    .replace(/```[\s\S]*?```/g, '[CODE_BLOCK]')
    .replace(/`[^`]+`/g, '[INLINE_CODE]')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '[JSX_COMMENT]');
}

function getLines(content) {
  return content.split('\n');
}

function inFrontmatter(lines, index) {
  let frontmatterMarkerCount = 0;
  for (let i = 0; i < index; i += 1) {
    if (lines[i].trim() === '---') {
      frontmatterMarkerCount += 1;
    }
  }
  return frontmatterMarkerCount < 2;
}

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPhraseRegex(phrase) {
  const tokens = String(phrase || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      if (token === 'X' || token === '[X]') {
        return '[A-Za-z0-9][^.!?\\n]{0,120}?';
      }
      return escapeRegExp(token);
    });

  return new RegExp(tokens.join('\\s+'), 'i');
}

function checkBannedWords(content, filePath, options = {}) {
  const suppressedLines = options.suppressedLines instanceof Set ? options.suppressedLines : new Set();
  const errors = [];
  const lines = getLines(content);
  const stripped = getLines(stripCodeAndComments(content));

  lines.forEach((line, index) => {
    if (inFrontmatter(lines, index)) {
      return;
    }
    if (suppressedLines.has(index + 1)) {
      return;
    }
    const cleanLine = stripped[index];
    BANNED_WORDS.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(cleanLine)) {
        errors.push({
          tier: 1,
          file: filePath,
          line: index + 1,
          id: 'BANNED_WORD',
          label: `"${word}" — delete or restate directly`,
          text: line.trim().slice(0, 80),
          match: word
        });
      }
    });
  });

  return errors;
}

function checkBannedPhrases(content, filePath) {
  const errors = [];
  const lines = getLines(content);
  const stripped = getLines(stripCodeAndComments(content));

  lines.forEach((line, index) => {
    if (inFrontmatter(lines, index)) {
      return;
    }
    const cleanLine = stripped[index];
    BANNED_PHRASES.forEach((phrase) => {
      const regex = buildPhraseRegex(phrase);
      if (regex.test(cleanLine)) {
        errors.push({
          tier: 1,
          file: filePath,
          line: index + 1,
          id: 'BANNED_PHRASE',
          label: `"${phrase}" — see banned phrases list`,
          text: line.trim().slice(0, 80),
          match: phrase
        });
      }
    });
  });

  return errors;
}

function checkTier2Patterns(content, filePath) {
  const warnings = [];
  const lines = getLines(content);

  TIER2_PATTERNS.forEach((pattern) => {
    let cleanContent = content;
    if (pattern.exclude) {
      cleanContent = content.replace(pattern.exclude, (match) => ' '.repeat(match.length));
    }
    const cleanLines = getLines(cleanContent);

    cleanLines.forEach((line, index) => {
      if (inFrontmatter(lines, index)) {
        return;
      }
      if (pattern.regex.test(line)) {
        warnings.push({
          tier: pattern.tier1 ? 1 : 2,
          file: filePath,
          line: index + 1,
          id: pattern.id,
          label: pattern.label,
          text: lines[index].trim().slice(0, 80)
        });
      }
      pattern.regex.lastIndex = 0;
    });
  });

  return warnings;
}

function run() {
  const args = process.argv.slice(2);
  const warnOnly = args.includes('--warn-only');
  const tier1Only = args.includes('--tier1-only');
  const files = getFiles();

  if (files.length === 0) {
    console.log('lint-copy: no files to check.');
    process.exit(0);
  }

  let tier1Count = 0;
  let tier2Count = 0;

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const phraseErrors = checkBannedPhrases(content, filePath);
    const phraseHitLines = new Set(phraseErrors.map((finding) => finding.line));

    const tier1Errors = [
      ...phraseErrors,
      ...checkBannedWords(content, filePath, { suppressedLines: phraseHitLines })
    ];

    const tier2Warnings = tier1Only ? [] : checkTier2Patterns(content, filePath);

    const allTier1 = [...tier1Errors, ...tier2Warnings.filter((warning) => warning.tier === 1)];
    const allTier2 = tier2Warnings.filter((warning) => warning.tier === 2);

    if (allTier1.length > 0) {
      console.error(`\n❌  ${filePath} — ${allTier1.length} BLOCKING error(s):\n`);
      allTier1.forEach((error) => {
        console.error(`  [L${error.line}] ${error.id}: ${error.label}`);
        console.error(`        → "${error.text}"`);
      });
      tier1Count += allTier1.length;
    }

    if (allTier2.length > 0) {
      console.warn(`\n⚠️   ${filePath} — ${allTier2.length} warning(s) (human sign-off required):\n`);
      allTier2.forEach((warning) => {
        console.warn(`  [L${warning.line}] ${warning.id}: ${warning.label}`);
        console.warn(`        → "${warning.text}"`);
      });
      tier2Count += allTier2.length;
    }
  });

  console.log(
    `\nlint-copy complete: ${tier1Count} blocking, ${tier2Count} warnings across ${files.length} file(s).`
  );

  if (tier1Count > 0 && !warnOnly) {
    console.error('\nMerge blocked. Resolve all blocking errors before re-submitting.');
    process.exit(1);
  }

  process.exit(0);
}

if (require.main === module) {
  run();
}

module.exports = {
  BANNED_WORDS,
  BANNED_PHRASES,
  TIER2_PATTERNS,
  checkBannedWords,
  checkBannedPhrases,
  checkTier2Patterns,
  getFiles,
  run
};
