#!/usr/bin/env node
/**
 * @script publish-v2-internal-reports
 * @summary Duplicate approved markdown reports into v2/internal/reports pages with metadata and update docs.json.
 * @owner docs
 * @scope tools/scripts, tools/config, v2/internal, docs.json, tasks/reports, tests/reports
 *
 * @usage
 *   node tools/scripts/publish-v2-internal-reports.js --check
 *   node tools/scripts/publish-v2-internal-reports.js
 *
 * @inputs
 *   --check Preview actions without writing files or modifying docs.json.
 *   --strict Exit non-zero if any configured source report is missing.
 *   --category <slug[,slug]> Restrict processing to one or more category slugs.
 *
 * @outputs
 *   - v2/internal/reports/<category>/<page>.md (generated docs pages)
 *   - docs.json (Internal Hub report groups only)
 *
 * @exit-codes
 *   0 = success (or dry-run preview)
 *   1 = invalid args, missing strict sources, or write failure
 *
 * @examples
 *   node tools/scripts/publish-v2-internal-reports.js --check
 *   node tools/scripts/publish-v2-internal-reports.js --category navigation-links,repo-ops
 *
 * @notes
 *   Overwrites managed report pages on each run. Dynamic audit-tasks-folders pages are cleaned by filename prefix.
 */

const fs = require('fs');
const path = require('path');

const manifest = require('../config/v2-internal-report-pages');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DOCS_JSON_PATH = path.join(REPO_ROOT, 'docs.json');
const INTERNAL_REPORTS_ROOT = path.join(REPO_ROOT, 'v2', 'internal', 'reports');
const GENERATED_OG_IMAGE = '/snippets/assets/domain/SHARED/LivepeerDocsLogo.svg';

function usage() {
  console.log(
    'Usage: node tools/scripts/publish-v2-internal-reports.js [--check] [--strict] [--category <slug[,slug]>]'
  );
}

function parseArgs(argv) {
  const out = {
    check: false,
    strict: false,
    categories: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--check') {
      out.check = true;
      continue;
    }
    if (token === '--strict') {
      out.strict = true;
      continue;
    }
    if (token === '--category') {
      const raw = String(argv[i + 1] || '').trim();
      if (!raw) {
        throw new Error('Missing --category value');
      }
      out.categories = new Set(
        raw
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean)
      );
      i += 1;
      continue;
    }
    if (token.startsWith('--category=')) {
      const raw = token.slice('--category='.length).trim();
      out.categories = new Set(
        raw
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean)
      );
      continue;
    }
    if (token === '--help' || token === '-h') {
      out.help = true;
      continue;
    }
    throw new Error(`Unknown arg: ${token}`);
  }

  return out;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function toRepoPath(absPath) {
  return toPosix(path.relative(REPO_ROOT, absPath));
}

function stripExtension(repoPath) {
  return repoPath.replace(/\.(md|mdx)$/i, '');
}

function escapeSingleQuotedYaml(value) {
  return String(value).replace(/'/g, "''");
}

function stripFrontmatter(content) {
  if (!content.startsWith('---\n')) return content;
  const end = content.indexOf('\n---\n', 4);
  if (end === -1) return content;
  return content.slice(end + 5);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/\.(md|mdx)$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleFromBasename(baseName) {
  const withoutExt = baseName.replace(/\.(md|mdx)$/i, '');
  return withoutExt
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function buildFrontmatter(record) {
  const keywords = [
    'livepeer',
    'internal',
    'reports',
    record.categorySlug,
    record.scriptId,
  ];
  const lines = [
    '---',
    `title: '${escapeSingleQuotedYaml(record.title)}'`,
    `sidebarTitle: '${escapeSingleQuotedYaml(record.sidebarTitle || record.title)}'`,
    `description: '${escapeSingleQuotedYaml(record.description)}'`,
    `keywords: ${JSON.stringify(keywords)}`,
    `og:image: "${GENERATED_OG_IMAGE}"`,
    '---',
    '',
  ];
  return lines.join('\n');
}

function listFilesRecursive(absDir) {
  const out = [];
  if (!fs.existsSync(absDir)) return out;
  const stack = [absDir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        out.push(fullPath);
      }
    }
  }
  return out;
}

function expandSimpleGlob(repoGlob) {
  const posixGlob = repoGlob.replace(/\\/g, '/');
  if (!posixGlob.includes('*')) {
    const abs = path.join(REPO_ROOT, ...posixGlob.split('/'));
    return fs.existsSync(abs) ? [abs] : [];
  }
  const starIndex = posixGlob.indexOf('*');
  const slashBeforeStar = posixGlob.lastIndexOf('/', starIndex);
  const baseRepoDir = slashBeforeStar >= 0 ? posixGlob.slice(0, slashBeforeStar) : '.';
  const baseAbsDir = path.join(REPO_ROOT, ...baseRepoDir.split('/'));
  const regex = new RegExp(
    '^' +
      posixGlob
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '[^/]*') +
      '$'
  );
  return listFilesRecursive(baseAbsDir)
    .filter((absPath) => regex.test(toRepoPath(absPath)))
    .sort((a, b) => toRepoPath(a).localeCompare(toRepoPath(b)));
}

function buildDynamicTarget(entry, sourceAbsPath) {
  const sourceRepoPath = toRepoPath(sourceAbsPath);
  const baseName = path.basename(sourceRepoPath);
  const slugSuffix = slugify(baseName);
  return {
    targetSlug: `${entry.targetSlugPrefix}${slugSuffix}`,
    title: entry.titlePrefix ? `${entry.titlePrefix}: ${titleFromBasename(baseName)}` : entry.title,
    sidebarTitle: entry.sidebarTitle || titleFromBasename(baseName),
    description:
      entry.description ||
      `Generated report from ${entry.scriptId} (${sourceRepoPath}).`,
  };
}

function resolvePublishRecords(args) {
  const categoriesBySlug = new Map(manifest.categories.map((c) => [c.slug, c]));
  const records = [];
  const missing = [];

  for (const entry of manifest.entries) {
    if (entry.publish === false) continue;
    if (args.categories && !args.categories.has(entry.categorySlug)) continue;
    if (!categoriesBySlug.has(entry.categorySlug)) {
      throw new Error(`Manifest entry references unknown category: ${entry.categorySlug}`);
    }

    if (entry.sourceType === 'file') {
      const sourceAbs = path.join(REPO_ROOT, ...entry.sourcePath.split('/'));
      if (!fs.existsSync(sourceAbs)) {
        missing.push({ entry, sourcePath: entry.sourcePath });
        continue;
      }
      records.push(
        makeRecord({
          entry,
          sourceAbsPath: sourceAbs,
          targetSlug: entry.targetSlug,
          title: entry.title,
          sidebarTitle: entry.sidebarTitle,
          description: entry.description,
        })
      );
      continue;
    }

    if (entry.sourceType === 'glob') {
      const matches = expandSimpleGlob(entry.sourceGlob);
      if (matches.length === 0) {
        missing.push({ entry, sourcePath: entry.sourceGlob });
        continue;
      }
      for (const sourceAbs of matches) {
        const dynamic = buildDynamicTarget(entry, sourceAbs);
        records.push(
          makeRecord({
            entry,
            sourceAbsPath: sourceAbs,
            targetSlug: dynamic.targetSlug,
            title: dynamic.title,
            sidebarTitle: dynamic.sidebarTitle,
            description: dynamic.description,
          })
        );
      }
      continue;
    }

    throw new Error(`Unsupported sourceType: ${entry.sourceType}`);
  }

  return { records, missing };
}

function makeRecord({ entry, sourceAbsPath, targetSlug, title, sidebarTitle, description }) {
  const targetAbsPath = path.join(
    INTERNAL_REPORTS_ROOT,
    entry.categorySlug,
    `${targetSlug}.md`
  );
  return {
    entry,
    categorySlug: entry.categorySlug,
    scriptId: entry.scriptId,
    sourceAbsPath,
    sourceRepoPath: toRepoPath(sourceAbsPath),
    targetAbsPath,
    targetRepoPath: toRepoPath(targetAbsPath),
    targetSlug,
    title,
    sidebarTitle: sidebarTitle || title,
    description:
      description ||
      `Generated report from ${entry.scriptId} (${toRepoPath(sourceAbsPath)}).`,
  };
}

function writeManagedPage(record, args) {
  const sourceRaw = fs.readFileSync(record.sourceAbsPath, 'utf8');
  const body = stripFrontmatter(sourceRaw).replace(/^\uFEFF/, '');
  const nextContent = `${buildFrontmatter(record)}${body.replace(/^\n+/, '')}`;
  if (args.check) return { changed: true };
  ensureDir(path.dirname(record.targetAbsPath));
  const prev = fs.existsSync(record.targetAbsPath)
    ? fs.readFileSync(record.targetAbsPath, 'utf8')
    : null;
  if (prev === nextContent) return { changed: false };
  fs.writeFileSync(record.targetAbsPath, nextContent, 'utf8');
  return { changed: true };
}

function cleanupDynamicPages(records, args) {
  const dynamicEntries = manifest.entries.filter(
    (entry) =>
      entry.publish !== false &&
      entry.sourceType === 'glob' &&
      (!args.categories || args.categories.has(entry.categorySlug))
  );
  let removed = 0;
  for (const entry of dynamicEntries) {
    const categoryDir = path.join(INTERNAL_REPORTS_ROOT, entry.categorySlug);
    if (!fs.existsSync(categoryDir)) continue;
    const keep = new Set(
      records
        .filter((record) => record.entry === entry)
        .map((record) => path.basename(record.targetAbsPath))
    );
    for (const fileName of fs.readdirSync(categoryDir)) {
      if (!fileName.startsWith(entry.targetSlugPrefix)) continue;
      if (keep.has(fileName)) continue;
      const fullPath = path.join(categoryDir, fileName);
      if (!args.check) fs.unlinkSync(fullPath);
      removed += 1;
    }
  }
  return removed;
}

function findInternalHubTab(node) {
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findInternalHubTab(item);
      if (found) return found;
    }
    return null;
  }
  if (!node || typeof node !== 'object') return null;
  if (node.tab === 'Internal Hub' && Array.isArray(node.anchors)) return node;
  for (const value of Object.values(node)) {
    const found = findInternalHubTab(value);
    if (found) return found;
  }
  return null;
}

function updateDocsJson(records, args) {
  const categoryMap = new Map(manifest.categories.map((c) => [c.slug, c]));
  const pagesByCategory = new Map();
  for (const category of manifest.categories) {
    if (args.categories && !args.categories.has(category.slug)) continue;
    pagesByCategory.set(category.slug, []);
  }
  for (const record of records) {
    const pages = pagesByCategory.get(record.categorySlug);
    if (!pages) continue;
    pages.push(stripExtension(record.targetRepoPath));
  }
  const docs = JSON.parse(fs.readFileSync(DOCS_JSON_PATH, 'utf8'));
  const internalTab = findInternalHubTab(docs);
  if (!internalTab) {
    throw new Error('Unable to find hidden "Internal Hub" tab in docs.json');
  }
  const internalAnchor = (internalTab.anchors || []).find(
    (anchor) => anchor && anchor.anchor === 'Internal Hub' && Array.isArray(anchor.groups)
  );
  if (!internalAnchor) {
    throw new Error('Unable to find "Internal Hub" anchor groups in docs.json');
  }

  const managedGroupTitles = new Set(
    manifest.categories
      .filter((c) => !args.categories || args.categories.has(c.slug))
      .map((c) => c.groupTitle)
  );

  const preservedGroups = (internalAnchor.groups || []).filter(
    (group) => !managedGroupTitles.has(group.group)
  );
  const newGroups = [];
  for (const category of manifest.categories) {
    if (args.categories && !args.categories.has(category.slug)) continue;
    const pages = pagesByCategory.get(category.slug) || [];
    if (!pages.length) continue;
    newGroups.push({ group: category.groupTitle, pages });
  }
  internalAnchor.groups = [...preservedGroups, ...newGroups];

  const next = `${JSON.stringify(docs, null, 2)}\n`;
  const prev = fs.readFileSync(DOCS_JSON_PATH, 'utf8');
  if (args.check || prev === next) return { changed: false, groupsWritten: newGroups.length };
  fs.writeFileSync(DOCS_JSON_PATH, next, 'utf8');
  return { changed: true, groupsWritten: newGroups.length };
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    usage();
    process.exit(1);
  }

  if (args.help) {
    usage();
    process.exit(0);
  }

  const { records, missing } = resolvePublishRecords(args);
  if (missing.length) {
    for (const row of missing) {
      console.warn(`Missing source report: ${row.sourcePath}`);
    }
    if (args.strict) {
      console.error(`Strict mode failed: ${missing.length} source report(s) missing.`);
      process.exit(1);
    }
  }

  let changedPages = 0;
  for (const record of records) {
    const result = writeManagedPage(record, args);
    if (result.changed) changedPages += 1;
  }
  const removedDynamic = cleanupDynamicPages(records, args);
  const docsResult = updateDocsJson(records, args);

  console.log(`${args.check ? 'Previewed' : 'Processed'} report pages: ${records.length}`);
  console.log(`Page writes ${args.check ? '(planned)' : ''}: ${changedPages}`);
  console.log(`Dynamic stale pages ${args.check ? '(planned removals)' : 'removed'}: ${removedDynamic}`);
  console.log(`docs.json report groups ${args.check ? '(planned)' : ''}: ${docsResult.groupsWritten}`);
  if (records.length) {
    for (const record of records) {
      console.log(` - ${record.sourceRepoPath} -> ${record.targetRepoPath}`);
    }
  }
}

main();
