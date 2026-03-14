#!/usr/bin/env node
/**
 * @script            generate-mint-dev-scope
 * @category          generator
 * @purpose           tooling:dev-tools
 * @scope             tools/scripts/dev, docs.json, .mintignore
 * @owner             docs
 * @needs             E-C6, F-C1
 * @purpose-statement Mint dev scope generator — creates a scoped docs.json for running mint dev on a subset of pages
 * @pipeline          manual — interactive developer tool, not suited for automated pipelines
 * @usage             node tools/scripts/dev/generate-mint-dev-scope.js [flags]
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const readline = require('readline');
const { spawn } = require('child_process');

const STRUCTURAL_ARRAY_KEYS = ['versions', 'languages', 'tabs', 'anchors', 'groups', 'pages'];

function printUsage() {
  console.log(
    [
      'Usage: node tools/scripts/dev/generate-mint-dev-scope.js [options]',
      '',
      'Options:',
      '  --repo-root <path>',
      '  --workspace-base <path>',
      '  --docs-config <path>',
      '  --scope-file <path>',
      '  --versions <csv>          (repeatable)',
      '  --languages <csv>         (repeatable)',
      '  --tabs <csv>              (repeatable)',
      '  --prefixes <csv>          (repeatable)',
      '  --interactive',
      '  --disable-openapi',
      '  --workspace-id <value>    (internal)',
      '  --print-only',
      '  --help'
    ].join('\n')
  );
}

function splitCsv(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqStrings(values) {
  return [...new Set((values || []).map((entry) => String(entry || '').trim()).filter(Boolean))];
}

function normalizeRoute(value) {
  return String(value || '')
    .trim()
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}

function normalizeForCompare(value) {
  return String(value || '').trim().toLowerCase();
}

function routeMatchesPrefix(route, prefix) {
  const normalizedRoute = normalizeRoute(route);
  const normalizedPrefix = normalizeRoute(prefix);
  if (!normalizedRoute || !normalizedPrefix) return false;
  return normalizedRoute === normalizedPrefix || normalizedRoute.startsWith(`${normalizedPrefix}/`);
}

function isLanguageSegment(value) {
  const segment = String(value || '').trim();
  return /^[a-z]{2}(?:-[A-Za-z]{2})?$/.test(segment);
}

function isLikelyRouteEntry(value) {
  const route = normalizeRoute(value);
  if (!route) return false;
  if (route.startsWith('http://') || route.startsWith('https://')) return false;
  if (route === '-') return false;
  return route.includes('/');
}

function isOpenapiRoute(route) {
  const normalized = normalizeRoute(route);
  return normalized.includes('/api-reference/') || normalized.endsWith('/api-reference');
}

function shouldKeepRouteEntry(routeValue, context) {
  const route = normalizeRoute(routeValue);
  if (!route) return false;
  if (!isLikelyRouteEntry(route)) return false;
  if (context.disableOpenapi && isOpenapiRoute(route)) return false;
  if (context.prefixes.length === 0) return true;
  return context.prefixes.some((prefix) => routeMatchesPrefix(route, prefix));
}

function deriveSectionPrefix(routeValue) {
  const route = normalizeRoute(routeValue);
  if (!route) return '';
  const segments = route.split('/').filter(Boolean);
  if (segments.length < 2) return route;
  if (/^v\d+$/.test(segments[0])) {
    if (segments.length >= 3 && isLanguageSegment(segments[1])) {
      return segments.slice(0, 3).join('/');
    }
    return segments.slice(0, 2).join('/');
  }
  return segments.slice(0, 2).join('/');
}

function collectRoutesFromPages(pages, outSet) {
  if (!Array.isArray(pages)) return;
  for (const entry of pages) {
    if (typeof entry === 'string') {
      const route = normalizeRoute(entry);
      if (isLikelyRouteEntry(route)) outSet.add(route);
      continue;
    }
    if (entry && typeof entry === 'object') {
      visitNavigationNode(entry, outSet);
    }
  }
}

function visitNavigationNode(node, outSet) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node.pages)) collectRoutesFromPages(node.pages, outSet);
  if (Array.isArray(node.groups)) node.groups.forEach((group) => visitNavigationNode(group, outSet));
  if (Array.isArray(node.anchors)) node.anchors.forEach((anchor) => visitNavigationNode(anchor, outSet));
  if (Array.isArray(node.tabs)) node.tabs.forEach((tab) => visitNavigationNode(tab, outSet));
  if (Array.isArray(node.languages)) node.languages.forEach((language) => visitNavigationNode(language, outSet));
  if (Array.isArray(node.versions)) node.versions.forEach((version) => visitNavigationNode(version, outSet));
}

function collectRoutesFromNavigation(navigation) {
  const routes = new Set();
  visitNavigationNode(navigation, routes);
  return [...routes].sort();
}

function parseArgs(argv) {
  const out = {
    repoRoot: process.cwd(),
    workspaceBase: path.join(os.tmpdir(), 'lpd-mint-dev'),
    docsConfig: '',
    scopeFile: '',
    versions: [],
    languages: [],
    tabs: [],
    prefixes: [],
    interactive: false,
    disableOpenapi: false,
    workspaceId: '',
    runScopedSession: false,
    mintArgs: [],
    printOnly: false,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--') {
      out.mintArgs = argv.slice(i + 1);
      break;
    }
    if (token === '--help' || token === '-h') {
      out.help = true;
      continue;
    }
    if (token === '--repo-root') {
      out.repoRoot = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (token.startsWith('--repo-root=')) {
      out.repoRoot = token.slice('--repo-root='.length).trim();
      continue;
    }
    if (token === '--workspace-base') {
      out.workspaceBase = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (token.startsWith('--workspace-base=')) {
      out.workspaceBase = token.slice('--workspace-base='.length).trim();
      continue;
    }
    if (token === '--docs-config') {
      out.docsConfig = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (token.startsWith('--docs-config=')) {
      out.docsConfig = token.slice('--docs-config='.length).trim();
      continue;
    }
    if (token === '--scope-file') {
      out.scopeFile = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (token.startsWith('--scope-file=')) {
      out.scopeFile = token.slice('--scope-file='.length).trim();
      continue;
    }
    if (token === '--versions' || token === '--scope-version') {
      out.versions.push(...splitCsv(argv[i + 1] || ''));
      i += 1;
      continue;
    }
    if (token.startsWith('--versions=') || token.startsWith('--scope-version=')) {
      out.versions.push(...splitCsv(token.split('=').slice(1).join('=')));
      continue;
    }
    if (token === '--languages' || token === '--scope-language') {
      out.languages.push(...splitCsv(argv[i + 1] || ''));
      i += 1;
      continue;
    }
    if (token.startsWith('--languages=') || token.startsWith('--scope-language=')) {
      out.languages.push(...splitCsv(token.split('=').slice(1).join('=')));
      continue;
    }
    if (token === '--tabs' || token === '--scope-tab') {
      out.tabs.push(...splitCsv(argv[i + 1] || ''));
      i += 1;
      continue;
    }
    if (token.startsWith('--tabs=') || token.startsWith('--scope-tab=')) {
      out.tabs.push(...splitCsv(token.split('=').slice(1).join('=')));
      continue;
    }
    if (token === '--prefixes' || token === '--scope-prefix') {
      out.prefixes.push(...splitCsv(argv[i + 1] || ''));
      i += 1;
      continue;
    }
    if (token.startsWith('--prefixes=') || token.startsWith('--scope-prefix=')) {
      out.prefixes.push(...splitCsv(token.split('=').slice(1).join('=')));
      continue;
    }
    if (token === '--interactive') {
      out.interactive = true;
      continue;
    }
    if (token === '--disable-openapi') {
      out.disableOpenapi = true;
      continue;
    }
    if (token === '--workspace-id') {
      out.workspaceId = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (token.startsWith('--workspace-id=')) {
      out.workspaceId = token.slice('--workspace-id='.length).trim();
      continue;
    }
    if (token === '--run-scoped-session') {
      out.runScopedSession = true;
      continue;
    }
    if (token === '--print-only') {
      out.printOnly = true;
      continue;
    }
    throw new Error(`Unknown option: ${token}`);
  }

  out.repoRoot = out.repoRoot ? path.resolve(out.repoRoot) : process.cwd();
  out.workspaceBase = out.workspaceBase ? path.resolve(out.workspaceBase) : path.join(os.tmpdir(), 'lpd-mint-dev');
  out.docsConfig = out.docsConfig ? path.resolve(out.repoRoot, out.docsConfig) : '';
  out.versions = uniqStrings(out.versions);
  out.languages = uniqStrings(out.languages);
  out.tabs = uniqStrings(out.tabs);
  out.prefixes = uniqStrings(out.prefixes.map(normalizeRoute));
  return out;
}

function loadScopeFile(scopeFile, repoRoot) {
  if (!scopeFile) {
    return {
      docsConfig: '',
      versions: [],
      languages: [],
      tabs: [],
      prefixes: [],
      disableOpenapi: false
    };
  }

  const absolutePath = path.isAbsolute(scopeFile) ? scopeFile : path.join(repoRoot, scopeFile);
  const payload = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  const looksLikeDocsConfig =
    payload &&
    typeof payload === 'object' &&
    payload.navigation &&
    typeof payload.navigation === 'object';
  return {
    docsConfig: looksLikeDocsConfig ? absolutePath : '',
    versions: uniqStrings(payload.versions || payload.scope_versions || []),
    languages: uniqStrings(payload.languages || payload.scope_languages || []),
    tabs: uniqStrings(payload.tabs || payload.scope_tabs || []),
    prefixes: uniqStrings((payload.prefixes || payload.scope_prefixes || []).map(normalizeRoute)),
    disableOpenapi: Boolean(payload.disableOpenapi || payload.disable_openapi)
  };
}

function collectOptionsFromNavigation(navigation) {
  const versions = new Set();
  const tabsByVersionLanguage = new Map();
  const languagesByVersion = new Map();

  const versionEntries = Array.isArray(navigation && navigation.versions) ? navigation.versions : [];
  for (const versionEntry of versionEntries) {
    const versionName = String(versionEntry && versionEntry.version ? versionEntry.version : '').trim();
    if (!versionName) continue;
    versions.add(versionName);
    const versionKey = normalizeForCompare(versionName);
    if (!languagesByVersion.has(versionKey)) languagesByVersion.set(versionKey, new Set());

    const languageEntries = Array.isArray(versionEntry.languages) ? versionEntry.languages : [];
    for (const languageEntry of languageEntries) {
      const languageName = String(languageEntry && languageEntry.language ? languageEntry.language : '').trim();
      if (!languageName) continue;
      languagesByVersion.get(versionKey).add(languageName);

      const tabs = Array.isArray(languageEntry.tabs) ? languageEntry.tabs : [];
      const tabMapKey = `${versionKey}::${normalizeForCompare(languageName)}`;
      if (!tabsByVersionLanguage.has(tabMapKey)) tabsByVersionLanguage.set(tabMapKey, new Set());

      for (const tabEntry of tabs) {
        const tabName = String(tabEntry && tabEntry.tab ? tabEntry.tab : '').trim();
        if (!tabName) continue;
        tabsByVersionLanguage.get(tabMapKey).add(tabName);
      }
    }
  }

  return {
    versions: [...versions].sort(),
    tabsByVersionLanguage,
    languagesByVersion
  };
}

function resolveSelectionInput(rawInput, options) {
  const input = String(rawInput || '').trim();
  if (!input) return [];

  const byIndex = new Map();
  const byValue = new Map();
  options.forEach((option, index) => {
    byIndex.set(String(index + 1), option);
    byValue.set(normalizeForCompare(option), option);
  });

  const tokens = splitCsv(input);
  const out = [];
  for (const token of tokens) {
    if (byIndex.has(token)) {
      out.push(byIndex.get(token));
      continue;
    }
    const normalized = normalizeForCompare(token);
    if (byValue.has(normalized)) {
      out.push(byValue.get(normalized));
      continue;
    }
    throw new Error(`Invalid selection token: ${token}`);
  }
  return uniqStrings(out);
}

function matchesSelection(value, selectedSet) {
  if (!selectedSet || selectedSet.size === 0) return true;
  return selectedSet.has(normalizeForCompare(value));
}

function pruneNavigationNode(node, context) {
  if (!node || typeof node !== 'object') return null;
  if (Array.isArray(node)) {
    const items = node.map((entry) => pruneNavigationNode(entry, context)).filter(Boolean);
    return items.length > 0 ? items : null;
  }

  const out = { ...node };

  if (Array.isArray(node.versions)) {
    out.versions = node.versions
      .filter((entry) => matchesSelection(entry && entry.version, context.versionSet))
      .map((entry) => pruneNavigationNode(entry, context))
      .filter(Boolean);
  }

  if (Array.isArray(node.languages)) {
    out.languages = node.languages
      .filter((entry) => matchesSelection(entry && entry.language, context.languageSet))
      .map((entry) => pruneNavigationNode(entry, context))
      .filter(Boolean);
  }

  if (Array.isArray(node.tabs)) {
    out.tabs = node.tabs
      .filter((entry) => matchesSelection(entry && entry.tab, context.tabSet))
      .map((entry) => pruneNavigationNode(entry, context))
      .filter(Boolean);
  }

  if (Array.isArray(node.anchors)) {
    out.anchors = node.anchors
      .map((entry) => pruneNavigationNode(entry, context))
      .filter(Boolean);
  }

  if (Array.isArray(node.groups)) {
    out.groups = node.groups
      .map((entry) => pruneNavigationNode(entry, context))
      .filter(Boolean);
  }

  if (Array.isArray(node.pages)) {
    const scopedPages = [];
    for (const entry of node.pages) {
      if (typeof entry === 'string') {
        if (shouldKeepRouteEntry(entry, context)) {
          scopedPages.push(normalizeRoute(entry));
        }
        continue;
      }
      if (!entry || typeof entry !== 'object') continue;
      const pruned = pruneNavigationNode(entry, context);
      if (pruned) scopedPages.push(pruned);
    }
    out.pages = scopedPages;
  }

  const hasStructuralArrays = STRUCTURAL_ARRAY_KEYS.some((key) => Array.isArray(node[key]));
  if (!hasStructuralArrays) return out;

  const hasAnyContent = STRUCTURAL_ARRAY_KEYS.some((key) => {
    return !Array.isArray(out[key]) || out[key].length > 0;
  });

  if (!hasAnyContent) return null;
  return out;
}

function buildScopedNavigation(navigation, selection) {
  const context = {
    versionSet: new Set(selection.versions.map(normalizeForCompare)),
    languageSet: new Set(selection.languages.map(normalizeForCompare)),
    tabSet: new Set(selection.tabs.map(normalizeForCompare)),
    prefixes: selection.prefixes.map(normalizeRoute).filter(Boolean),
    disableOpenapi: Boolean(selection.disableOpenapi)
  };
  return pruneNavigationNode(navigation, context);
}

function buildScopedMintignore(baseContent, scopedMetadata) {
  const lines = String(baseContent || '').split('\n');
  const appendSet = new Set();
  const append = (line) => {
    const value = String(line || '').trim();
    if (!value || appendSet.has(value)) return;
    appendSet.add(value);
  };

  if (scopedMetadata.excludedVersions.length > 0 || scopedMetadata.excludedLanguagePaths.length > 0) {
    append('# LPD scoped profile (generated): excluded versions/languages');
  }
  scopedMetadata.excludedVersions.forEach((version) => append(`/${version}/**`));
  scopedMetadata.excludedLanguagePaths.forEach((entry) => append(entry));

  if (scopedMetadata.excludedSectionPrefixes.length > 0) {
    append('# LPD scoped profile (generated): excluded section prefixes');
    scopedMetadata.excludedSectionPrefixes.forEach((prefix) => append(`/${prefix}/**`));
  }

  if (scopedMetadata.disableOpenapi) {
    append('# LPD scoped profile (generated): OpenAPI routes excluded');
    append('/v2/**/api-reference/**');
    append('/v2/**/api-reference.mdx');
  }

  if (appendSet.size === 0) {
    return lines.join('\n').replace(/\n*$/, '\n');
  }

  const merged = [...lines];
  if (merged.length === 0 || merged[merged.length - 1].trim() !== '') merged.push('');
  merged.push(...appendSet);
  return merged.join('\n').replace(/\n*$/, '\n');
}

function buildScopedMetadata(selection, optionData, allRoutes, scopedRoutes) {
  const availableVersions = optionData.versions;
  const selectedVersionSet = new Set(selection.versions.map(normalizeForCompare));
  const selectedLanguageSet = new Set(selection.languages.map(normalizeForCompare));

  const excludedVersions = availableVersions
    .filter((version) => selectedVersionSet.size > 0 && !selectedVersionSet.has(normalizeForCompare(version)))
    .map((version) => normalizeRoute(version));

  const excludedLanguagePaths = [];
  for (const version of availableVersions) {
    if (selectedVersionSet.size > 0 && !selectedVersionSet.has(normalizeForCompare(version))) continue;
    const langSet = optionData.languagesByVersion.get(normalizeForCompare(version));
    if (!langSet || langSet.size === 0) continue;
    for (const language of langSet) {
      const langNorm = normalizeForCompare(language);
      if (selectedLanguageSet.size === 0 || selectedLanguageSet.has(langNorm)) continue;
      if (langNorm === 'en') continue;
      excludedLanguagePaths.push(`/${normalizeRoute(version)}/${normalizeRoute(language)}/**`);
    }
  }

  const allSections = new Set(allRoutes.map(deriveSectionPrefix).filter(Boolean));
  const selectedSections = new Set(
    (selection.prefixes.length > 0 ? selection.prefixes : scopedRoutes).map(deriveSectionPrefix).filter(Boolean)
  );
  const excludedSectionPrefixes = [...allSections]
    .filter((section) => selectedSections.size > 0 && !selectedSections.has(section))
    .sort();

  return {
    excludedVersions: uniqStrings(excludedVersions),
    excludedLanguagePaths: uniqStrings(excludedLanguagePaths),
    excludedSectionPrefixes,
    disableOpenapi: Boolean(selection.disableOpenapi)
  };
}

function pathExists(pathname) {
  try {
    fs.lstatSync(pathname);
    return true;
  } catch (_error) {
    return false;
  }
}

function ensureRealDirectory(dirPath) {
  if (pathExists(dirPath)) {
    const stats = fs.lstatSync(dirPath);
    if (!stats.isDirectory() || stats.isSymbolicLink()) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  }

  fs.mkdirSync(dirPath, { recursive: true });
}

function ensureLinkedFile(source, target) {
  if (pathExists(target)) {
    const stats = fs.lstatSync(target);
    if (stats.isSymbolicLink()) {
      const currentTarget = fs.readlinkSync(target);
      if (currentTarget === source) {
        return;
      }
    }

    fs.rmSync(target, { recursive: true, force: true });
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.symlinkSync(source, target, 'file');
}

function ensureWrittenFile(target, content) {
  const desiredContent = String(content || '');

  if (pathExists(target)) {
    const stats = fs.lstatSync(target);
    if (stats.isFile() && !stats.isSymbolicLink()) {
      const current = fs.readFileSync(target, 'utf8');
      if (current === desiredContent) {
        return;
      }
    }

    fs.rmSync(target, { recursive: true, force: true });
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, desiredContent, 'utf8');
}

function toPosixPath(value) {
  return String(value || '').split(path.sep).join('/');
}

function normalizeRepoRelativePath(repoRoot, absolutePath) {
  return toPosixPath(path.relative(repoRoot, absolutePath)).replace(/^\/+/, '');
}

function isSafeRepoRelativePath(relPath) {
  return Boolean(relPath) && relPath !== '.' && !relPath.startsWith('../');
}

function routeToFileCandidates(routeValue) {
  const route = normalizeRoute(routeValue).replace(/\.(md|mdx)$/i, '');
  if (!route) return [];
  return [`${route}.mdx`, `${route}.md`, `${route}/index.mdx`, `${route}/index.md`, `${route}/README.mdx`, `${route}/README.md`];
}

function resolveFirstExistingRepoFile(repoRoot, candidates) {
  for (const candidate of candidates) {
    const absolute = path.resolve(candidate);
    if (!absolute.startsWith(repoRoot)) continue;
    if (!pathExists(absolute)) continue;
    const stats = fs.lstatSync(absolute);
    if (!stats.isFile()) continue;
    const relPath = normalizeRepoRelativePath(repoRoot, absolute);
    if (!isSafeRepoRelativePath(relPath)) continue;
    return relPath;
  }
  return '';
}

function resolveRouteToRepoFile(repoRoot, routeValue) {
  const normalizedRoute = normalizeRoute(routeValue);
  if (!normalizedRoute) return '';
  const candidates = routeToFileCandidates(normalizedRoute).map((candidate) => path.resolve(repoRoot, candidate));
  return resolveFirstExistingRepoFile(repoRoot, candidates);
}

function buildImportResolutionCandidates(basePath) {
  const extension = path.extname(basePath).toLowerCase();
  if (extension) {
    return [basePath];
  }

  const candidates = [basePath];
  ['.js', '.jsx', '.ts', '.tsx', '.mdx', '.md', '.json', '.css', '.svg'].forEach((ext) => {
    candidates.push(`${basePath}${ext}`);
  });
  ['index.js', 'index.jsx', 'index.ts', 'index.tsx', 'index.mdx', 'index.md', 'index.json', 'index.css'].forEach((name) => {
    candidates.push(path.join(basePath, name));
  });
  return candidates;
}

function resolveRepoFileReference(repoRoot, importerRelPath, reference, options = {}) {
  const raw = String(reference || '').trim();
  if (!raw) return '';

  const sanitized = raw.split('#')[0].split('?')[0].trim();
  if (!sanitized) return '';
  if (/^(?:[A-Za-z][A-Za-z+.-]*:|#)/.test(sanitized)) return '';

  let basePath = '';
  if (sanitized.startsWith('/')) {
    basePath = path.resolve(repoRoot, sanitized.replace(/^\/+/, ''));
  } else if (sanitized.startsWith('.')) {
    if (!importerRelPath) return '';
    basePath = path.resolve(repoRoot, path.dirname(importerRelPath), sanitized);
  } else if (String(options.kind || 'import') === 'route' && importerRelPath) {
    basePath = path.resolve(repoRoot, path.dirname(importerRelPath), sanitized);
  } else if (/^(?:v1|v2|snippets|docs-guide|tools|tests)\//.test(sanitized)) {
    basePath = path.resolve(repoRoot, sanitized);
  } else {
    return '';
  }

  if (!basePath.startsWith(repoRoot)) return '';
  const kind = String(options.kind || 'import');
  if (kind === 'route') {
    return resolveRouteToRepoFile(repoRoot, normalizeRepoRelativePath(repoRoot, basePath));
  }

  const candidates = buildImportResolutionCandidates(basePath);
  return resolveFirstExistingRepoFile(repoRoot, candidates);
}

function extractImportReferences(content) {
  const source = String(content || '');
  const refs = new Set();
  const importRegex =
    /^import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"];?/gm;
  const requireRegex = /\brequire\(\s*['"]([^'"]+)['"]\s*\)/g;
  const dynamicImportRegex = /\bimport\(\s*['"]([^'"]+)['"]\s*\)/g;

  let match;
  while ((match = importRegex.exec(source)) !== null) refs.add(match[1]);
  while ((match = requireRegex.exec(source)) !== null) refs.add(match[1]);
  while ((match = dynamicImportRegex.exec(source)) !== null) refs.add(match[1]);
  return [...refs];
}

function extractAssetReferences(content, extension) {
  const source = String(content || '');
  const refs = new Set();
  const normalizedExt = String(extension || '').toLowerCase();

  if (normalizedExt === '.css') {
    const cssUrlRegex = /url\(\s*['"]?([^"')]+)['"]?\s*\)/g;
    let match;
    while ((match = cssUrlRegex.exec(source)) !== null) {
      refs.add(match[1]);
    }
    return [...refs];
  }

  const markdownImageRegex = /!\[[^\]]*]\(([^)]+)\)/g;
  const jsxAssetRegex = /\b(?:src|poster|img)\s*=\s*["']([^"']+)["']/g;
  const jsxLiteralAssetRegex = /\b(?:src|poster|img)\s*=\s*\{["']([^"']+)["']\}/g;

  let match;
  while ((match = markdownImageRegex.exec(source)) !== null) refs.add(match[1]);
  while ((match = jsxAssetRegex.exec(source)) !== null) refs.add(match[1]);
  while ((match = jsxLiteralAssetRegex.exec(source)) !== null) refs.add(match[1]);
  return [...refs];
}

function collectDocsConfigFileReferences(node, out = new Set()) {
  if (typeof node === 'string') {
    const value = String(node || '').trim();
    if (!value) return out;
    if (/^(?:https?:\/\/|mailto:|tel:|#)/i.test(value)) return out;
    if ((value.startsWith('/') || /^(?:v1|v2|snippets|docs-guide|tools|tests)\//.test(value)) && /\.[A-Za-z0-9]+(?:[?#].*)?$/.test(value)) {
      out.add(value);
    }
    return out;
  }

  if (Array.isArray(node)) {
    node.forEach((entry) => collectDocsConfigFileReferences(entry, out));
    return out;
  }

  if (!node || typeof node !== 'object') {
    return out;
  }

  Object.values(node).forEach((value) => collectDocsConfigFileReferences(value, out));
  return out;
}

function isGeneratedPagesIndexFile(filePath, content) {
  if (path.basename(filePath) !== 'index.mdx') return false;
  const body = String(content || '');
  return body.includes('generated-file-banner:v1') && body.includes('tools/scripts/generate-pages-index.js');
}

function looksLikeRepoLink(value) {
  const raw = String(value || '').trim();
  if (!raw) return false;
  if (/^(?:https?:\/\/|mailto:|tel:|#)/i.test(raw)) return false;
  return (
    raw.startsWith('/') ||
    raw.startsWith('./') ||
    raw.startsWith('../') ||
    /^v[12]\//.test(raw) ||
    raw.includes('/') ||
    /\.(?:md|mdx)$/i.test(raw)
  );
}

function rewriteGeneratedIndexContentForScope(repoRoot, fileRelPath, content, includedFiles) {
  const lines = String(content || '').split('\n');
  const markdownLinkRegex = /\[[^\]]+]\(([^)]+)\)/;
  const rewritten = [];

  for (const line of lines) {
    const match = line.match(markdownLinkRegex);
    if (!match) {
      rewritten.push(line);
      continue;
    }

    const target = String(match[1] || '').trim();
    if (!looksLikeRepoLink(target)) {
      rewritten.push(line);
      continue;
    }

    const resolved = resolveRepoFileReference(repoRoot, fileRelPath, target, { kind: 'route' });
    if (!resolved) {
      continue;
    }
    if (!includedFiles.has(resolved)) {
      continue;
    }

    rewritten.push(line);
  }

  return `${rewritten.join('\n').replace(/\n*$/, '\n')}`;
}

function addWorkspaceEntry(entries, relPath, entry) {
  const normalizedPath = toPosixPath(relPath).replace(/^\/+/, '');
  if (!normalizedPath) return;
  entries.set(normalizedPath, entry);
}

function buildScopedWorkspaceEntries(repoRoot, scopedDocs, scopedRoutes) {
  const includedFiles = new Set();
  const routeFiles = new Set();
  const queue = [];
  const seen = new Set();

  const enqueue = (relPath) => {
    const normalizedPath = toPosixPath(relPath).replace(/^\/+/, '');
    if (!normalizedPath || seen.has(normalizedPath)) return;
    seen.add(normalizedPath);
    includedFiles.add(normalizedPath);
    queue.push(normalizedPath);
  };

  for (const route of scopedRoutes) {
    const resolved = resolveRouteToRepoFile(repoRoot, route);
    if (!resolved) {
      throw new Error(`Scoped route does not resolve to a file: ${route}`);
    }
    routeFiles.add(resolved);
    enqueue(resolved);
  }

  for (const reference of collectDocsConfigFileReferences(scopedDocs)) {
    const resolved = resolveRepoFileReference(repoRoot, '', reference, { kind: 'import' });
    if (resolved) {
      enqueue(resolved);
    }
  }

  while (queue.length > 0) {
    const fileRelPath = queue.shift();
    const absolutePath = path.join(repoRoot, fileRelPath);
    if (!pathExists(absolutePath)) continue;
    const extension = path.extname(fileRelPath).toLowerCase();

    if (!['.md', '.mdx', '.js', '.jsx', '.ts', '.tsx', '.css'].includes(extension)) {
      continue;
    }

    const content = fs.readFileSync(absolutePath, 'utf8');

    extractImportReferences(content).forEach((reference) => {
      const resolved = resolveRepoFileReference(repoRoot, fileRelPath, reference, { kind: 'import' });
      if (resolved) enqueue(resolved);
    });

    extractAssetReferences(content, extension).forEach((reference) => {
      const resolved = resolveRepoFileReference(repoRoot, fileRelPath, reference, { kind: 'import' });
      if (resolved && !/\.(md|mdx)$/i.test(resolved)) {
        enqueue(resolved);
      }
    });
  }

  const entries = new Map();
  [...includedFiles].sort((left, right) => left.localeCompare(right)).forEach((fileRelPath) => {
    const absolutePath = path.join(repoRoot, fileRelPath);
    if (!pathExists(absolutePath)) return;

    const content = /\.(?:md|mdx)$/i.test(fileRelPath) ? fs.readFileSync(absolutePath, 'utf8') : '';
    if (routeFiles.has(fileRelPath) && isGeneratedPagesIndexFile(fileRelPath, content)) {
      addWorkspaceEntry(entries, fileRelPath, {
        type: 'content',
        content: rewriteGeneratedIndexContentForScope(repoRoot, fileRelPath, content, includedFiles)
      });
      return;
    }

    addWorkspaceEntry(entries, fileRelPath, {
      type: 'symlink',
      source: absolutePath
    });
  });

  return {
    entries,
    routeFiles,
    includedFiles
  };
}

function collectWorkspaceParentDirs(fileEntries) {
  const dirs = new Set();
  dirs.add('');

  for (const relPath of fileEntries.keys()) {
    const segments = String(relPath || '')
      .split('/')
      .filter(Boolean);

    for (let index = 1; index < segments.length; index += 1) {
      dirs.add(segments.slice(0, index).join('/'));
    }
  }

  return dirs;
}

function pruneWorkspaceTree(workspaceDir, currentRelDir, desiredDirs, desiredFiles) {
  const absoluteDir = currentRelDir ? path.join(workspaceDir, currentRelDir) : workspaceDir;
  if (!pathExists(absoluteDir)) return;

  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = currentRelDir ? `${currentRelDir}/${entry.name}` : entry.name;
    const absolutePath = path.join(workspaceDir, relPath);

    if (entry.isDirectory()) {
      if (!desiredDirs.has(relPath)) {
        fs.rmSync(absolutePath, { recursive: true, force: true });
        continue;
      }
      pruneWorkspaceTree(workspaceDir, relPath, desiredDirs, desiredFiles);
      continue;
    }

    if (!desiredFiles.has(relPath)) {
      fs.rmSync(absolutePath, { recursive: true, force: true });
    }
  }
}

function syncScopedWorkspace(workspaceDir, fileEntries) {
  ensureRealDirectory(workspaceDir);

  const desiredDirs = collectWorkspaceParentDirs(fileEntries);
  [...desiredDirs]
    .sort((left, right) => {
      const depthDiff = left.split('/').filter(Boolean).length - right.split('/').filter(Boolean).length;
      return depthDiff !== 0 ? depthDiff : left.localeCompare(right);
    })
    .forEach((relDirPath) => {
      if (!relDirPath) return;
      ensureRealDirectory(path.join(workspaceDir, relDirPath));
    });

  [...fileEntries.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([relPath, entry]) => {
      const absoluteTarget = path.join(workspaceDir, relPath);
      if (entry.type === 'content') {
        ensureWrittenFile(absoluteTarget, entry.content);
        return;
      }
      ensureLinkedFile(entry.source, absoluteTarget);
    });

  pruneWorkspaceTree(workspaceDir, '', desiredDirs, new Set(fileEntries.keys()));
}

function sortStringsForIdentity(values) {
  return uniqStrings(values).sort((left, right) => left.localeCompare(right));
}

function normalizeWorkspaceId(workspaceId) {
  const raw = String(workspaceId || '').trim();
  if (!raw) return '';
  const sanitized = raw.replace(/[^A-Za-z0-9._-]/g, '-');
  return sanitized || '';
}

function getFileMtimeMs(filePath) {
  try {
    return fs.statSync(filePath).mtimeMs;
  } catch (_error) {
    return 0;
  }
}

function createWorkspaceHash(repoRoot, docsPath, selection, workspaceId = '') {
  const explicitId = normalizeWorkspaceId(workspaceId);
  if (explicitId) {
    return explicitId;
  }

  const payload = {
    repoRoot: fs.realpathSync(repoRoot),
    docsConfig: fs.realpathSync(docsPath),
    selection: {
      versions: sortStringsForIdentity(selection.versions),
      languages: sortStringsForIdentity(selection.languages),
      tabs: sortStringsForIdentity(selection.tabs),
      prefixes: sortStringsForIdentity((selection.prefixes || []).map(normalizeRoute)),
      disableOpenapi: Boolean(selection.disableOpenapi)
    }
  };
  return crypto.createHash('sha1').update(JSON.stringify(payload)).digest('hex').slice(0, 16);
}

async function promptSelectMany(rl, label, options, defaultSelection, allowAllByEmpty) {
  const defaults = uniqStrings(defaultSelection);
  const defaultLabel = defaults.length > 0 ? defaults.join(', ') : allowAllByEmpty ? 'all' : 'none';
  const promptLine = `Select ${label} (comma values or indices; Enter=${defaultLabel}): `;

  for (;;) {
    console.error(`\n${label}:`);
    options.forEach((option, index) => {
      console.error(`  ${index + 1}. ${option}`);
    });
    const answer = await new Promise((resolve) => rl.question(promptLine, resolve));
    const trimmed = String(answer || '').trim();
    if (!trimmed) {
      return allowAllByEmpty && defaults.length === 0 ? [] : defaults;
    }
    if (trimmed === '*') {
      return [];
    }
    try {
      return resolveSelectionInput(trimmed, options);
    } catch (error) {
      console.error(`Invalid selection: ${error.message}`);
    }
  }
}

function availableTabs(optionData, selectedVersions, selectedLanguages) {
  const versionSet = new Set(selectedVersions.map(normalizeForCompare));
  const languageSet = new Set(selectedLanguages.map(normalizeForCompare));
  const out = new Set();

  for (const [key, tabSet] of optionData.tabsByVersionLanguage.entries()) {
    const [versionKey, languageKey] = key.split('::');
    if (versionSet.size > 0 && !versionSet.has(versionKey)) continue;
    if (languageSet.size > 0 && !languageSet.has(languageKey)) continue;
    tabSet.forEach((tab) => out.add(tab));
  }
  return [...out].sort();
}

async function promptForSelection(initialSelection, optionData, allRoutes) {
  if (!process.stdin.isTTY) {
    throw new Error('--interactive requires a TTY terminal');
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
  try {
    const versions = await promptSelectMany(rl, 'versions', optionData.versions, initialSelection.versions, true);

    const languageOptions = (() => {
      if (versions.length === 0) {
        const all = new Set();
        for (const languageSet of optionData.languagesByVersion.values()) {
          languageSet.forEach((language) => all.add(language));
        }
        return [...all].sort();
      }
      const selected = new Set();
      versions.forEach((version) => {
        const languageSet = optionData.languagesByVersion.get(normalizeForCompare(version));
        if (!languageSet) return;
        languageSet.forEach((language) => selected.add(language));
      });
      return [...selected].sort();
    })();

    const languages = await promptSelectMany(rl, 'languages', languageOptions, initialSelection.languages, true);
    const tabOptions = availableTabs(optionData, versions, languages);
    const tabs = await promptSelectMany(rl, 'tabs', tabOptions, initialSelection.tabs, true);

    const prefixOptions = uniqStrings(allRoutes.map(deriveSectionPrefix).filter(Boolean));
    const prefixes = await promptSelectMany(
      rl,
      'route prefixes (optional; use * or Enter for all)',
      prefixOptions,
      initialSelection.prefixes,
      true
    );

    const disableOpenapiAnswer = await new Promise((resolve) =>
      rl.question(`Disable OpenAPI routes? [y/N] (${initialSelection.disableOpenapi ? 'current: yes' : 'current: no'}): `, resolve)
    );
    const disableOpenapi = /^(y|yes)$/i.test(String(disableOpenapiAnswer || '').trim())
      ? true
      : initialSelection.disableOpenapi && !String(disableOpenapiAnswer || '').trim();

    return {
      versions,
      languages,
      tabs,
      prefixes,
      disableOpenapi
    };
  } finally {
    rl.close();
  }
}

async function promptForScopedReload(message, options = {}) {
  const input = options.input || process.stdin;
  const output = options.output || process.stderr;

  if (!input || !output || !input.isTTY || !output.isTTY) {
    return null;
  }

  const rl = readline.createInterface({ input, output });
  try {
    const answer = await new Promise((resolve) => rl.question(`${message} [Y/n] `, resolve));
    return !/^(n|no)$/i.test(String(answer || '').trim());
  } finally {
    rl.close();
  }
}

function waitForChildExit(child) {
  return new Promise((resolve, reject) => {
    if (!child || typeof child.once !== 'function') {
      resolve({ code: 0, signal: null });
      return;
    }

    if (child.exitCode !== null || child.signalCode !== null) {
      resolve({ code: child.exitCode, signal: child.signalCode });
      return;
    }

    child.once('exit', (code, signal) => resolve({ code, signal }));
    child.once('error', (error) => reject(error));
  });
}

function waitForTimeout(promise, timeoutMs, setTimeoutFn = setTimeout, clearTimeoutFn = clearTimeout) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeoutFn(() => {
      if (settled) return;
      settled = true;
      resolve(null);
    }, timeoutMs);

    promise
      .then((value) => {
        if (settled) return;
        settled = true;
        clearTimeoutFn(timer);
        resolve(value);
      })
      .catch((error) => {
        if (settled) return;
        settled = true;
        clearTimeoutFn(timer);
        reject(error);
      });
  });
}

async function terminateChildProcess(child, options = {}) {
  if (!child) return { code: 0, signal: null };

  const setTimeoutFn = options.setTimeoutFn || setTimeout;
  const clearTimeoutFn = options.clearTimeoutFn || clearTimeout;
  const exitPromise = waitForChildExit(child);
  const tryKill = (signal) => {
    try {
      return child.kill(signal);
    } catch (_error) {
      return false;
    }
  };

  if (!tryKill('SIGINT')) {
    return exitPromise;
  }

  let result = await waitForTimeout(exitPromise, 8000, setTimeoutFn, clearTimeoutFn);
  if (result) return result;

  tryKill('SIGTERM');
  result = await waitForTimeout(exitPromise, 3000, setTimeoutFn, clearTimeoutFn);
  if (result) return result;

  tryKill('SIGKILL');
  return exitPromise;
}

class ScopedMintSessionSupervisor {
  constructor(options, deps = {}) {
    this.profileArgs = {
      repoRoot: options.repoRoot,
      workspaceBase: options.workspaceBase || path.join(os.tmpdir(), 'lpd-mint-dev'),
      docsConfig: options.docsConfig || '',
      scopeFile: options.scopeFile || '',
      versions: [...(options.versions || [])],
      languages: [...(options.languages || [])],
      tabs: [...(options.tabs || [])],
      prefixes: [...(options.prefixes || [])],
      interactive: Boolean(options.interactive),
      disableOpenapi: Boolean(options.disableOpenapi),
      workspaceId: options.workspaceId || '',
      printOnly: false,
      help: false
    };
    this.mintArgs = [...(options.mintArgs || [])];
    this.createScopedProfile = deps.createScopedProfile || createScopedProfile;
    this.spawnProcess = deps.spawnProcess || spawn;
    this.watchFactory = deps.watchFactory || ((watchPath, handler) => fs.watch(watchPath, { persistent: true }, handler));
    this.promptForReload = deps.promptForReload || ((message) => promptForScopedReload(message, { input: process.stdin, output: process.stderr }));
    this.log = deps.log || ((message) => console.log(message));
    this.logError = deps.logError || ((message) => console.error(message));
    this.setTimeoutFn = deps.setTimeoutFn || setTimeout;
    this.clearTimeoutFn = deps.clearTimeoutFn || clearTimeout;
    this.debounceMs = Number.isFinite(options.debounceMs) ? options.debounceMs : 250;
    this.profile = null;
    this.configWatcher = null;
    this.currentChild = null;
    this.debounceTimer = null;
    this.pendingRefresh = false;
    this.refreshInProgress = false;
    this.promptInProgress = false;
    this.restartInProgress = false;
    this.shuttingDown = false;
    this.expectedChildExit = false;
    this.signalHandlers = new Map();
    this.sessionPromise = null;
    this.resolveSession = null;
    this.rejectSession = null;
    this.lastSourceConfigMtimeMs = 0;
  }

  async buildProfile() {
    return this.createScopedProfile({ ...this.profileArgs, printOnly: false, help: false });
  }

  applyProfile(profile) {
    const previousSourceConfig = this.profile ? this.profile.sourceDocsConfig : '';
    this.profile = profile;
    this.lastSourceConfigMtimeMs = getFileMtimeMs(profile.sourceDocsConfig);
    this.profileArgs.docsConfig = profile.sourceDocsConfig;
    this.profileArgs.scopeFile = '';
    this.profileArgs.versions = [...(profile.selection && profile.selection.versions ? profile.selection.versions : [])];
    this.profileArgs.languages = [...(profile.selection && profile.selection.languages ? profile.selection.languages : [])];
    this.profileArgs.tabs = [...(profile.selection && profile.selection.tabs ? profile.selection.tabs : [])];
    this.profileArgs.prefixes = [...(profile.selection && profile.selection.prefixes ? profile.selection.prefixes : [])];
    this.profileArgs.interactive = false;
    this.profileArgs.disableOpenapi = Boolean(profile.selection && profile.selection.disableOpenapi);
    this.profileArgs.workspaceId = profile.scopeHash;

    if (previousSourceConfig && previousSourceConfig !== profile.sourceDocsConfig && this.configWatcher) {
      this.startWatcher();
    }
  }

  async initialize() {
    const profile = await this.buildProfile();
    this.applyProfile(profile);
    this.log(
      `Using scoped Mint workspace: ${profile.workspaceDir} (routes ${profile.routeCounts.scoped}/${profile.routeCounts.original}, hash ${profile.scopeHash})`
    );
    return profile;
  }

  startWatcher() {
    this.stopWatcher();
    if (!this.profile || !this.profile.sourceDocsConfig) {
      return;
    }

    const watchDir = path.dirname(this.profile.sourceDocsConfig);
    const watchName = path.basename(this.profile.sourceDocsConfig);
    this.configWatcher = this.watchFactory(watchDir, (eventType, filename) => {
      this.handleWatchedConfigEvent(eventType, filename, watchName);
    });
  }

  stopWatcher() {
    if (this.configWatcher && typeof this.configWatcher.close === 'function') {
      this.configWatcher.close();
    }
    this.configWatcher = null;
  }

  handleWatchedConfigEvent(eventType, filename, watchName = '') {
    if (eventType !== 'change' && eventType !== 'rename') {
      return;
    }

    if (filename) {
      const normalizedName = path.basename(String(filename));
      if (normalizedName !== watchName) {
        return;
      }
      const currentMtimeMs = getFileMtimeMs(this.profile ? this.profile.sourceDocsConfig : '');
      if (currentMtimeMs > 0) {
        this.lastSourceConfigMtimeMs = currentMtimeMs;
      }
    } else {
      const currentMtimeMs = getFileMtimeMs(this.profile ? this.profile.sourceDocsConfig : '');
      if (currentMtimeMs <= 0 || currentMtimeMs === this.lastSourceConfigMtimeMs) {
        return;
      }
      this.lastSourceConfigMtimeMs = currentMtimeMs;
    }

    this.scheduleRefresh();
  }

  scheduleRefresh() {
    if (this.shuttingDown) return;
    if (this.debounceTimer) {
      this.clearTimeoutFn(this.debounceTimer);
    }

    this.debounceTimer = this.setTimeoutFn(() => {
      this.debounceTimer = null;
      void this.runRefreshCycle();
    }, this.debounceMs);
  }

  async runRefreshCycle() {
    if (this.shuttingDown) return;
    if (this.refreshInProgress || this.promptInProgress || this.restartInProgress) {
      this.pendingRefresh = true;
      return;
    }

    this.refreshInProgress = true;
    try {
      const refreshedProfile = await this.buildProfile();
      this.applyProfile(refreshedProfile);
      this.log(
        `Scoped docs config refreshed: ${refreshedProfile.sourceDocsConfig} (routes ${refreshedProfile.routeCounts.scoped}/${refreshedProfile.routeCounts.original})`
      );
    } catch (error) {
      this.logError(`Scoped docs config refresh failed: ${error.message}`);
      return;
    } finally {
      this.refreshInProgress = false;
    }

    await this.maybePromptForRestart();
    await this.flushPendingRefresh();
  }

  async flushPendingRefresh() {
    if (!this.pendingRefresh || this.shuttingDown) {
      return;
    }
    this.pendingRefresh = false;
    await this.runRefreshCycle();
  }

  async maybePromptForRestart() {
    const message = 'Scoped docs config changed. Reload Mint now to apply nav changes?';
    let decision = null;
    this.promptInProgress = true;
    try {
      decision = await this.promptForReload(message);
    } finally {
      this.promptInProgress = false;
    }

    if (decision === null) {
      this.log('Scoped docs config changed. Restart Mint manually to apply nav changes.');
      return;
    }

    if (!decision) {
      this.log('Mint reload skipped. Navigation may stay stale until you restart this scoped session.');
      return;
    }

    await this.restartMintChild();
  }

  spawnMintChild() {
    if (!this.profile) {
      throw new Error('Scoped session must be initialized before Mint can start.');
    }

    return this.spawnProcess('mint', ['dev', ...this.mintArgs], {
      cwd: this.profile.workspaceDir,
      stdio: 'inherit'
    });
  }

  async startMintChild() {
    const child = this.spawnMintChild();
    this.currentChild = child;
    child.once('exit', (code, signal) => {
      this.handleChildExit(child, code, signal);
    });
    child.once('error', (error) => {
      this.handleChildError(error);
    });
    return child;
  }

  handleChildError(error) {
    if (this.shuttingDown || this.expectedChildExit) {
      return;
    }
    this.logError(`Mint dev failed: ${error.message}`);
    this.finishSession(1);
  }

  handleChildExit(child, code, signal) {
    if (this.currentChild === child) {
      this.currentChild = null;
    }

    if (this.expectedChildExit) {
      return;
    }

    if (this.shuttingDown) {
      this.finishSession(signal === 'SIGINT' ? 130 : signal === 'SIGTERM' ? 143 : code || 0);
      return;
    }

    const exitCode = Number.isInteger(code) ? code : 0;
    this.log(`Mint dev exited${signal ? ` (${signal})` : ''}.`);
    this.finishSession(exitCode);
  }

  async stopMintChild() {
    if (!this.currentChild) {
      return { code: 0, signal: null };
    }

    const child = this.currentChild;
    this.expectedChildExit = true;
    try {
      return await terminateChildProcess(child, {
        setTimeoutFn: this.setTimeoutFn,
        clearTimeoutFn: this.clearTimeoutFn
      });
    } finally {
      this.expectedChildExit = false;
      if (this.currentChild === child) {
        this.currentChild = null;
      }
    }
  }

  async restartMintChild() {
    if (this.shuttingDown) return;
    this.restartInProgress = true;
    try {
      this.log('Restarting Mint dev to apply scoped navigation changes...');
      await this.stopMintChild();
      await this.startMintChild();
    } finally {
      this.restartInProgress = false;
    }
  }

  registerSignalHandlers() {
    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      const handler = () => {
        void this.shutdown(signal);
      };
      this.signalHandlers.set(signal, handler);
      process.on(signal, handler);
    });
  }

  removeSignalHandlers() {
    for (const [signal, handler] of this.signalHandlers.entries()) {
      process.removeListener(signal, handler);
    }
    this.signalHandlers.clear();
  }

  async shutdown(signal = '') {
    if (this.shuttingDown) {
      return;
    }

    this.shuttingDown = true;
    this.stopWatcher();
    if (this.debounceTimer) {
      this.clearTimeoutFn(this.debounceTimer);
      this.debounceTimer = null;
    }

    try {
      await this.stopMintChild();
    } catch (error) {
      this.logError(`Failed to stop Mint dev cleanly: ${error.message}`);
    }

    const exitCode = signal === 'SIGINT' ? 130 : signal === 'SIGTERM' ? 143 : 0;
    this.finishSession(exitCode);
  }

  finishSession(exitCode) {
    this.stopWatcher();
    if (this.debounceTimer) {
      this.clearTimeoutFn(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.removeSignalHandlers();

    if (this.resolveSession) {
      const resolve = this.resolveSession;
      this.resolveSession = null;
      this.rejectSession = null;
      resolve(exitCode);
    }
  }

  async start() {
    if (!this.sessionPromise) {
      this.sessionPromise = new Promise((resolve, reject) => {
        this.resolveSession = resolve;
        this.rejectSession = reject;
      });
    }

    await this.initialize();
    this.startWatcher();
    this.registerSignalHandlers();
    await this.startMintChild();
    return this.sessionPromise;
  }
}

async function runScopedMintSession(args, deps = {}) {
  const supervisor = new ScopedMintSessionSupervisor(args, deps);
  return supervisor.start();
}

async function createScopedProfile(args) {
  const fromScopeFile = loadScopeFile(args.scopeFile, args.repoRoot);
  const docsPath = args.docsConfig || fromScopeFile.docsConfig || path.join(args.repoRoot, 'docs.json');
  const mintignorePath = path.join(args.repoRoot, '.mintignore');
  if (!fs.existsSync(docsPath)) throw new Error(`docs.json not found at ${docsPath}`);

  const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));
  if (!docs || typeof docs !== 'object' || !docs.navigation) {
    throw new Error('docs.json is missing required "navigation" object');
  }

  const optionData = collectOptionsFromNavigation(docs.navigation);
  const allRoutes = collectRoutesFromNavigation(docs.navigation);

  let selection = {
    versions: uniqStrings([...fromScopeFile.versions, ...args.versions]),
    languages: uniqStrings([...fromScopeFile.languages, ...args.languages]),
    tabs: uniqStrings([...fromScopeFile.tabs, ...args.tabs]),
    prefixes: uniqStrings([...fromScopeFile.prefixes, ...args.prefixes].map(normalizeRoute)),
    disableOpenapi: Boolean(fromScopeFile.disableOpenapi || args.disableOpenapi)
  };

  if (args.interactive) {
    selection = await promptForSelection(selection, optionData, allRoutes);
  }

  const scopedNavigation = buildScopedNavigation(docs.navigation, selection);
  if (!scopedNavigation) {
    throw new Error('Scoped profile removed all navigation nodes. Relax version/language/tab/prefix filters.');
  }

  const scopedDocs = { ...docs, navigation: scopedNavigation };
  const scopedRoutes = collectRoutesFromNavigation(scopedDocs.navigation);
  if (scopedRoutes.length === 0) {
    throw new Error('Scoped profile resolved to zero routes. Relax version/language/tab/prefix filters.');
  }

  const mintignoreBase = fs.existsSync(mintignorePath) ? fs.readFileSync(mintignorePath, 'utf8') : '';
  const metadata = buildScopedMetadata(selection, optionData, allRoutes, scopedRoutes);
  const scopedMintignore = buildScopedMintignore(mintignoreBase, metadata);
  const scopeHash = createWorkspaceHash(args.repoRoot, docsPath, selection, args.workspaceId || '');
  const workspaceDir = path.join(args.workspaceBase, scopeHash);
  const workspaceProjection = buildScopedWorkspaceEntries(args.repoRoot, scopedDocs, scopedRoutes);

  if (!args.printOnly) {
    const fileEntries = new Map(workspaceProjection.entries);
    addWorkspaceEntry(fileEntries, 'docs.json', {
      type: 'content',
      content: `${JSON.stringify(scopedDocs, null, 2)}\n`
    });
    addWorkspaceEntry(fileEntries, '.mintignore', {
      type: 'content',
      content: scopedMintignore
    });
    addWorkspaceEntry(fileEntries, '.lpd-scope.json', {
      type: 'content',
      content: `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          sourceRepoRoot: args.repoRoot,
          sourceDocsConfig: docsPath,
          selection,
          routeCounts: {
            original: allRoutes.length,
            scoped: scopedRoutes.length
          },
          workspaceFileCount: workspaceProjection.includedFiles.size
        },
        null,
        2
      )}\n`
    });
    syncScopedWorkspace(workspaceDir, fileEntries);
  }

  return {
    workspaceDir,
    scopeHash,
    selection,
    sourceDocsConfig: docsPath,
    routeCounts: {
      original: allRoutes.length,
      scoped: scopedRoutes.length
    },
    workspaceFileCount: workspaceProjection.includedFiles.size,
    disabledOpenapi: Boolean(selection.disableOpenapi)
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }
  if (args.runScopedSession) {
    const exitCode = await runScopedMintSession(args);
    if (Number.isInteger(exitCode)) {
      process.exitCode = exitCode;
    }
    return;
  }

  const result = await createScopedProfile(args);
  process.stdout.write(`${JSON.stringify(result)}\n`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  loadScopeFile,
  collectRoutesFromNavigation,
  collectOptionsFromNavigation,
  deriveSectionPrefix,
  buildScopedNavigation,
  buildScopedMintignore,
  buildScopedMetadata,
  resolveRouteToRepoFile,
  resolveRepoFileReference,
  extractImportReferences,
  extractAssetReferences,
  buildScopedWorkspaceEntries,
  syncScopedWorkspace,
  createWorkspaceHash,
  promptForScopedReload,
  ScopedMintSessionSupervisor,
  runScopedMintSession,
  createScopedProfile
};
