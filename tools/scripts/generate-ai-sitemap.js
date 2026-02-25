#!/usr/bin/env node
/**
 * @script generate-ai-sitemap
 * @summary Generate an AI-focused sitemap with enriched metadata for v2 docs pages.
 * @owner docs
 * @scope tools/scripts, v2
 *
 * @usage
 *   node tools/scripts/generate-ai-sitemap.js --write
 *   node tools/scripts/generate-ai-sitemap.js --check
 *
 * @inputs
 *   --write Write sitemap-ai.xml to repo root.
 *   --check Verify sitemap-ai.xml is up to date without writing.
 *
 * @outputs
 *   - sitemap-ai.xml at repo root
 *
 * @exit-codes
 *   0 = success (or --check found no changes)
 *   1 = --check found differences or runtime failure
 *
 * @examples
 *   node tools/scripts/generate-ai-sitemap.js --write
 *
 * @notes
 *   Keep script behavior deterministic and update script indexes after changes.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

const BASE_URL = 'https://docs.livepeer.org';
const OUTPUT_REL = 'snippets/assets/site/sitemap-ai.xml';

const DOMAIN_RENAME_MAP = {
  '00_home': 'home',
  '010_products': 'platforms',
  '01_about': 'about',
  '02_community': 'community',
  '03_developers': 'developers',
  '04_gateways': 'gateways',
  '05_orchestrators': 'orchestrators',
  '06_lptoken': 'lpt',
  '07_resources': 'resources',
  '09_internal': 'internal',
  deprecated: 'deprecated',
  experimental: 'experimental',
  notes: 'notes'
};

function getRepoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (_err) {
    return process.cwd();
  }
}

const REPO_ROOT = getRepoRoot();
const V2_ROOT = path.join(REPO_ROOT, 'v2');
const OUTPUT_PATH = path.join(REPO_ROOT, OUTPUT_REL);

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function normalizeUrlPath(relPath) {
  let normalized = toPosix(relPath).replace(/\\/g, '/');
  normalized = normalized.replace(/\.(md|mdx)$/i, '');
  normalized = normalized.replace(/\/index$/i, '');
  normalized = normalized.replace(/\/+$/, '');
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  return normalized;
}

function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (_err) {
    return '';
  }
}

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    return {};
  }
  try {
    return yaml.load(match[1]) || {};
  } catch (err) {
    console.warn(`⚠️  Frontmatter parse failed for ${filePath}: ${err.message}`);
    return {};
  }
}

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\s*/g, '');
}

function stripContent(content) {
  let stripped = stripFrontmatter(content);
  stripped = stripped.replace(/^import\s+.*$/gm, '');
  stripped = stripped.replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ');
  stripped = stripped.replace(/```[\s\S]*?```/g, ' ');
  stripped = stripped.replace(/`[^`]*`/g, ' ');
  stripped = stripped.replace(/<[^>]+>/g, ' ');
  stripped = stripped.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  stripped = stripped.replace(/[_*#>~]/g, ' ');
  return stripped;
}

function countWords(content) {
  const stripped = stripContent(content);
  const matches = stripped.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g);
  return matches ? matches.length : 0;
}

function findMdxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  });
  return results;
}

function deriveCategory(relPath) {
  const normalized = toPosix(relPath);
  if (normalized.startsWith('v2/pages/')) {
    const rest = normalized.slice('v2/pages/'.length);
    const [legacyDomain] = rest.split('/').filter(Boolean);
    return DOMAIN_RENAME_MAP[legacyDomain] || legacyDomain || 'v2';
  }
  if (normalized.startsWith('v2/x-pages/')) {
    const rest = normalized.slice('v2/x-pages/'.length);
    const [legacyDomain] = rest.split('/').filter(Boolean);
    return DOMAIN_RENAME_MAP[legacyDomain] || legacyDomain || 'v2';
  }
  if (normalized.startsWith('v2/')) {
    const rest = normalized.slice('v2/'.length);
    const [segment] = rest.split('/').filter(Boolean);
    return segment || 'v2';
  }
  return 'unknown';
}

function deriveContentType(relPath, frontmatter) {
  const normalized = toPosix(relPath).toLowerCase();
  const fileName = path.basename(normalized).toLowerCase();
  if (frontmatter && frontmatter.openapi) return 'api-reference';
  if (normalized.includes('/api-reference/')) return 'api-reference';
  if (normalized.includes('/quickstart/') || fileName.includes('quickstart')) return 'quickstart';
  if (
    normalized.includes('/guide') ||
    normalized.includes('/guides') ||
    normalized.includes('/tutorial') ||
    normalized.includes('/getting-started')
  ) {
    return 'guide';
  }
  if (
    normalized.includes('/reference') ||
    normalized.includes('/references') ||
    normalized.includes('/technical')
  ) {
    return 'reference';
  }
  if (fileName.includes('overview') || fileName.includes('introduction')) return 'overview';
  return 'page';
}

function buildGitLastModifiedMap() {
  try {
    const output = execSync('git log --name-only --format=%cI -- v2', {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10
    });
    const map = new Map();
    let currentDate = null;
    output.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
        currentDate = trimmed;
        return;
      }
      if (!currentDate) return;
      const normalized = toPosix(trimmed);
      if (!normalized.startsWith('v2/')) return;
      if (!/\.(md|mdx)$/i.test(normalized)) return;
      if (!map.has(normalized)) {
        map.set(normalized, currentDate);
      }
    });
    return map;
  } catch (_err) {
    return new Map();
  }
}

function getLastModified(relPath, frontmatter, gitMap) {
  const lastVerified = frontmatter?.lastVerified || frontmatter?.last_verified;
  if (typeof lastVerified === 'string' && lastVerified.trim()) {
    return lastVerified.trim();
  }

  if (gitMap && gitMap.has(relPath)) {
    return gitMap.get(relPath);
  }

  try {
    const stats = fs.statSync(path.join(REPO_ROOT, relPath));
    return stats.mtime.toISOString();
  } catch (_err) {
    return new Date().toISOString();
  }
}

function buildEntries() {
  const files = findMdxFiles(V2_ROOT);
  const gitMap = buildGitLastModifiedMap();
  return files.map((absPath) => {
    const relPath = toPosix(path.relative(REPO_ROOT, absPath));
    const content = readFileSafe(absPath);
    const frontmatter = parseFrontmatter(content, relPath);
    const urlPath = normalizeUrlPath(relPath);
    return {
      loc: encodeURI(`${BASE_URL}${urlPath}`),
      lastmod: getLastModified(relPath, frontmatter, gitMap),
      contentType: deriveContentType(relPath, frontmatter),
      wordCount: countWords(content),
      category: deriveCategory(relPath)
    };
  });
}

function buildXml(entries) {
  const sorted = [...entries].sort((a, b) => a.loc.localeCompare(b.loc));
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:ai="https://docs.livepeer.org/ai-sitemap">'
  );

  sorted.forEach((entry) => {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
    lines.push(`    <ai:contentType>${escapeXml(entry.contentType)}</ai:contentType>`);
    lines.push(`    <ai:wordCount>${escapeXml(entry.wordCount)}</ai:wordCount>`);
    lines.push(`    <ai:category>${escapeXml(entry.category)}</ai:category>`);
    lines.push('  </url>');
  });

  lines.push('</urlset>');
  lines.push('');
  return lines.join('\n');
}

function run() {
  const args = process.argv.slice(2);
  const shouldWrite = args.includes('--write');
  const shouldCheck = args.includes('--check') || !shouldWrite;

  const xml = buildXml(buildEntries());

  if (shouldWrite) {
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
    console.log(`✓ Wrote ${OUTPUT_REL}`);
  }

  if (shouldCheck) {
    const existing = readFileSafe(OUTPUT_PATH);
    if (existing !== xml) {
      console.error(`✗ ${OUTPUT_REL} is out of date. Run with --write.`);
      process.exit(1);
    }
    console.log(`✓ ${OUTPUT_REL} is up to date.`);
  }
}

run();
