const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { normalizeRepoRel, readJson, toPosix } = require('./common');
const { normalizeRouteKey, resolveRouteToFile } = require('./path-utils');
const { parseProvenanceComment, classifyLocalizedArtifactProvenance } = require('./provenance');

function collectPageStrings(node, out = []) {
  if (typeof node === 'string') {
    out.push(node);
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((item) => collectPageStrings(item, out));
    return out;
  }
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node.pages)) {
    node.pages.forEach((item) => collectPageStrings(item, out));
  }
  Object.values(node).forEach((value) => collectPageStrings(value, out));
  return out;
}

function getDocsJson(repoRoot) {
  return readJson(path.join(repoRoot, 'docs.json'));
}

function getV2EnglishLanguageNode(docsJson) {
  const versions = docsJson?.navigation?.versions || [];
  const v2 = versions.find((versionNode) => versionNode?.version === 'v2');
  if (!v2) throw new Error('v2 version not found in docs.json');
  const en = (v2.languages || []).find((langNode) => langNode?.language === 'en');
  if (!en) throw new Error('v2 English language node not found in docs.json');
  return { v2, en };
}

function getV2EnglishRoutes(repoRoot) {
  const docsJson = getDocsJson(repoRoot);
  const { en } = getV2EnglishLanguageNode(docsJson);
  const rawEntries = collectPageStrings(en);
  const seen = new Set();
  const routes = [];
  for (const raw of rawEntries) {
    const trimmed = String(raw || '').trim();
    if (!trimmed || trimmed === ' ') continue;
    if (!trimmed.startsWith('v2/')) continue;
    const normalized = normalizeRouteKey(trimmed);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    routes.push(normalized);
  }
  return routes;
}

function buildV2EnglishRouteInventory(repoRoot) {
  const routes = getV2EnglishRoutes(repoRoot);
  const items = [];
  const unresolved = [];

  for (const route of routes) {
    const fileRel = resolveRouteToFile(repoRoot, route);
    if (!fileRel) {
      unresolved.push(route);
      continue;
    }
    if (!fileRel.startsWith('v2/')) continue;
    if (fileRel.startsWith('v2/x-')) continue;
    items.push({
      route,
      fileRel,
      fileAbs: path.join(repoRoot, fileRel)
    });
  }

  return { items, unresolved };
}

function getChangedFilesSinceRef(repoRoot, baseRef) {
  const candidates = [`origin/${baseRef}...HEAD`, `${baseRef}...HEAD`];
  for (const range of candidates) {
    try {
      const output = execSync(`git diff --name-only ${range}`, { cwd: repoRoot, encoding: 'utf8' });
      return output
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => normalizeRepoRel(line));
    } catch (_err) {
      // Try next range.
    }
  }
  return [];
}

function loadPathsFile(repoRoot, filePath) {
  const abs = path.resolve(repoRoot, filePath);
  const content = fs.readFileSync(abs, 'utf8');
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => normalizeRepoRel(line));
}

function selectScopeItems(options) {
  const {
    repoRoot,
    inventory,
    scopeMode,
    baseRef,
    prefixes = [],
    pathsFile = '',
    maxPages = 50
  } = options;

  const items = inventory.items || [];
  let selected = [];

  if (scopeMode === 'full_v2_nav') {
    selected = items;
  } else if (scopeMode === 'prefixes') {
    const normalizedPrefixes = prefixes.map((p) => normalizeRepoRel(p)).filter(Boolean);
    selected = items.filter((item) =>
      normalizedPrefixes.some((prefix) => item.fileRel.startsWith(prefix) || item.route.startsWith(normalizeRouteKey(prefix)))
    );
  } else if (scopeMode === 'paths_file') {
    const entries = loadPathsFile(repoRoot, pathsFile);
    const routeSet = new Set(entries.map((entry) => normalizeRouteKey(entry)));
    const fileSet = new Set(entries.map((entry) => normalizeRepoRel(entry)));
    selected = items.filter((item) => routeSet.has(item.route) || fileSet.has(item.fileRel));
  } else {
    const changedFiles = new Set(getChangedFilesSinceRef(repoRoot, baseRef));
    selected = items.filter((item) => changedFiles.has(item.fileRel));
  }

  return {
    selected: selected.slice(0, Math.max(1, Number(maxPages) || 50)),
    truncated: selected.length > (Math.max(1, Number(maxPages) || 50)),
    totalCandidateCount: selected.length
  };
}

function collectExistingLocalizedRouteMapEntries(repoRoot, generatedRoot = 'v2/i18n') {
  const out = [];
  const rootAbs = path.join(repoRoot, generatedRoot);
  if (!fs.existsSync(rootAbs)) return out;

  function walk(dirAbs) {
    const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
    for (const entry of entries) {
      const childAbs = path.join(dirAbs, entry.name);
      if (entry.isDirectory()) {
        walk(childAbs);
        continue;
      }
      if (!/\.(md|mdx)$/i.test(entry.name)) continue;
      const rel = normalizeRepoRel(path.relative(repoRoot, childAbs));
      const parts = rel.split('/');
      if (parts.length < 4 || parts[0] !== 'v2' || parts[1] !== 'i18n') continue;
      const language = parts[2];
      const suffix = parts.slice(3).join('/');
      const localizedRoute = normalizeRouteKey(rel);
      const sourceRoute = normalizeRouteKey(path.posix.join('v2', suffix));
      let provenance = null;
      try {
        provenance = parseProvenanceComment(fs.readFileSync(childAbs, 'utf8'));
      } catch (_err) {
        provenance = null;
      }
      const provenanceMeta = classifyLocalizedArtifactProvenance(provenance);
      out.push({
        sourceRoute,
        localizedRoute,
        language,
        localizedFile: rel,
        status: 'existing',
        ...provenanceMeta,
        updatedAt: provenance?.generatedAt || ''
      });
    }
  }

  walk(rootAbs);
  return out;
}

module.exports = {
  buildV2EnglishRouteInventory,
  collectExistingLocalizedRouteMapEntries,
  collectPageStrings,
  getChangedFilesSinceRef,
  getDocsJson,
  getV2EnglishLanguageNode,
  getV2EnglishRoutes,
  selectScopeItems
};
