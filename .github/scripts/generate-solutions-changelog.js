/**
 * @script            generate-solutions-changelog
 * @type              automation
 * @concern           content
 * @niche             data/changelog
 * @purpose           infrastructure:data-feeds
 * @description       Fetches GitHub releases for a solutions product, generates Mintlify <Update> blocks,
 *                    and appends new entries to the product's changelog MDX file. Config-driven via
 *                    product-social-config.json. With --enhance, uses an LLM to summarise release notes.
 *                    Falls back to raw extraction on LLM failure.
 * @mode              generate
 * @pipeline          config → GitHub REST API → [LLM optional] → v2/solutions/{product}/changelog.mdx
 * @scope             .github/scripts, v2/solutions/
 * @usage             PRODUCT_KEY=daydream node .github/scripts/generate-solutions-changelog.js [--dry-run] [--enhance]
 * @policy            Public repos only. GITHUB_TOKEN optional (rate limits). No secrets in output.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// ── Config ──────────────────────────────────────────────────────────────────
const REPO_ROOT = path.resolve(__dirname, "../..");
const CONFIG_PATH =
  process.env.CONFIG_PATH || path.join(REPO_ROOT, "operations/scripts/config/product-social-config.json");
const PRODUCT_KEY = process.env.PRODUCT_KEY || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const LIMIT = parseInt(process.env.LIMIT || "10", 10);
const DRY_RUN = process.argv.includes("--dry-run");
const ENHANCE = process.argv.includes("--enhance");

// Resolve product config
function loadProductConfig(key) {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const products = config.products || {};

  if (key) {
    const product = products[key];
    if (!product) {
      console.error(`Product "${key}" not found in config.`);
      process.exit(1);
    }
    if (!product.github || !product.github.releasesActive) {
      console.log(`${key}: releases not active, skipping.`);
      process.exit(0);
    }
    return [{ key, ...product }];
  }

  // No key specified — run for all products with active releases
  return Object.entries(products)
    .filter(([, p]) => p.github && p.github.releasesActive)
    .map(([k, p]) => ({ key: k, ...p }));
}

// LLM config
const LLM_PROVIDER = process.env.LLM_PROVIDER || "openrouter"; // "openrouter" | "copilot"
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "google/gemini-2.5-pro-exp-03-25:free";
const COPILOT_TOKEN = process.env.COPILOT_TOKEN || GITHUB_TOKEN;
const COPILOT_MODEL = process.env.COPILOT_MODEL || "gpt-4o";
const LLM_TIMEOUT_MS = 30000;

// ── GitHub API ──────────────────────────────────────────────────────────────
function githubGet(endpoint) {
  return new Promise((resolve, reject) => {
    const headers = {
      "User-Agent": "livepeer-docs-bot",
      Accept: "application/vnd.github+json",
    };
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    }

    const options = {
      hostname: "api.github.com",
      path: endpoint,
      method: "GET",
      headers,
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

// ── LLM providers ───────────────────────────────────────────────────────────

/**
 * Generic HTTPS POST helper for LLM API calls.
 */
function httpsPost(hostname, path, headers, body, timeoutMs) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`LLM parse error: ${data.substring(0, 300)}`));
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error("LLM request timed out"));
    });

    req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Call OpenRouter chat completions API (free tier).
 * Docs: https://openrouter.ai/docs/api-reference/chat-completion
 */
async function callOpenRouter(prompt) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not set");
  }

  console.log(`  LLM: OpenRouter (${OPENROUTER_MODEL})`);

  const res = await httpsPost(
    "openrouter.ai",
    "/api/v1/chat/completions",
    {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://docs.livepeer.org",
      "X-Title": "Livepeer Docs Changelog",
    },
    {
      model: OPENROUTER_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.3,
    },
    LLM_TIMEOUT_MS
  );

  if (res.error) {
    throw new Error(`OpenRouter error: ${res.error.message || JSON.stringify(res.error)}`);
  }

  const content = res.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter returned empty content");
  }

  return content.trim();
}

/**
 * Call GitHub Copilot / GitHub Models API.
 * Docs: https://docs.github.com/en/github-models
 */
async function callCopilot(prompt) {
  if (!COPILOT_TOKEN) {
    throw new Error("COPILOT_TOKEN / GITHUB_TOKEN not set");
  }

  console.log(`  LLM: GitHub Copilot (${COPILOT_MODEL})`);

  const res = await httpsPost(
    "models.github.ai",
    "/inference/chat/completions",
    {
      Authorization: `Bearer ${COPILOT_TOKEN}`,
    },
    {
      model: COPILOT_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.3,
    },
    LLM_TIMEOUT_MS
  );

  if (res.error) {
    throw new Error(`Copilot error: ${res.error.message || JSON.stringify(res.error)}`);
  }

  const content = res.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Copilot returned empty content");
  }

  return content.trim();
}

/**
 * Route to the configured LLM provider.
 */
async function callLLM(prompt) {
  switch (LLM_PROVIDER) {
    case "openrouter":
      return callOpenRouter(prompt);
    case "copilot":
      return callCopilot(prompt);
    default:
      throw new Error(`Unknown LLM_PROVIDER: ${LLM_PROVIDER}`);
  }
}

// ── Prompt ───────────────────────────────────────────────────────────────────

function buildPrompt(release, prTitles, productName) {
  const prSection =
    prTitles.length > 0
      ? `\nMerged PRs in this release:\n${prTitles.map((t) => `- ${t}`).join("\n")}\n`
      : "";

  return `You are writing a changelog entry for ${productName}.

Release: ${release.tag_name} (${formatDate(release.published_at || release.created_at)})

Release notes from GitHub:
${release.body || "(no release notes)"}
${prSection}
Write a concise changelog post about what shipped in this release. Rules:
- Product changes only. No internal implementation details.
- No private file paths, directory structures, code snippets, or function names.
- Organise into sections: ### New features, ### Updates, ### Bug fixes. Omit empty sections.
- Use markdown bullet points (- **Name** — Description) under each section heading.
- Each bullet should be one sentence. Be terse.
- Do not include PR numbers, author names, or GitHub links.
- Maximum 6 bullets total. Skip trivial changes.
- If the release is a patch with only fixes, use a single ### Bug fixes section.

Example format:
### New features

- **Audio output** — Pipelines can now return audio alongside video, streamed over WebRTC.

### Bug fixes

- **Fixed VACE regression** — Resolved tempo sync modulation interfering with VACE noise scale.`;
}

/**
 * Fetch PR titles between two tags for richer LLM context.
 */
async function fetchPRTitlesBetweenTags(owner, repo, prevTag, currentTag) {
  try {
    const compare = await githubGet(
      `/repos/${owner}/${repo}/compare/${prevTag}...${currentTag}`
    );

    if (!compare.commits || !Array.isArray(compare.commits)) {
      return [];
    }

    // Extract PR titles from merge commit messages
    const prTitles = compare.commits
      .map((c) => c.commit?.message || "")
      .filter((msg) => msg.startsWith("Merge pull request") || msg.includes("(#"))
      .map((msg) => {
        // "Merge pull request #NNN from ...\n\nTitle" → "Title"
        const lines = msg.split("\n").filter(Boolean);
        return lines.length > 1 ? lines[lines.length - 1].trim() : lines[0];
      })
      .filter(Boolean)
      .slice(0, 20); // Cap to avoid bloating the prompt

    return prTitles;
  } catch (err) {
    console.log(`  Could not fetch PR titles: ${err.message}`);
    return [];
  }
}

// ── Markdown processing ─────────────────────────────────────────────────────

/**
 * Extract the Highlights section from a GitHub release body.
 * Falls back to the full body (trimmed) if no Highlights heading found.
 */
function extractHighlights(body) {
  if (!body) return "";

  // Try to extract ## Highlights section
  const highlightsMatch = body.match(
    /## Highlights\s*\n([\s\S]*?)(?=\n## |\n---|\n\*\*Full Changelog\*\*|$)/i
  );

  if (highlightsMatch) {
    return highlightsMatch[1].trim();
  }

  // Fallback: use everything before "## What's Changed" or "**Full Changelog**"
  const beforeChangelog = body.match(
    /^([\s\S]*?)(?=\r?\n#+ What'?s Changed|\r?\n\*\*Full Changelog\*\*)/i
  );

  if (beforeChangelog && beforeChangelog[1].trim()) {
    return beforeChangelog[1].trim();
  }

  // Last resort: first paragraph only (up to first double newline)
  const firstPara = body.split(/\n\s*\n/)[0];
  return (firstPara || body).trim();
}

/**
 * Convert GitHub Markdown to MDX-safe content for Mintlify <Update> blocks.
 * - Strips PR links like "by @user in https://..." suffixes
 * - Converts bold (**text**) — kept as-is (MDX supports it)
 * - Cleans up GH-specific markdown patterns
 */
function cleanForMdx(text) {
  return (
    text
      // Remove "by @user, @user, and @user in [#NNN](...)" patterns
      .replace(
        /\s+by\s+@[\w-]+(?:,\s*@[\w-]+)*(?:,?\s*and\s+@[\w-]+)?\s+in\s+\[#\d+\]\([^)]+\)(?:,\s*\[#\d+\]\([^)]+\))*/g,
        ""
      )
      // Remove standalone "by @user in https://..." patterns
      .replace(
        /\s+by\s+@[\w-]+(?:,\s*@[\w-]+)*(?:,?\s*and\s+@[\w-]+)?\s+in\s+https?:\/\/\S+/g,
        ""
      )
      // Clean trailing whitespace per line
      .replace(/[ \t]+$/gm, "")
      // Collapse multiple blank lines
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * Classify a release into tags based on its content.
 */
function classifyTags(body) {
  const tags = [];
  const lower = (body || "").toLowerCase();

  if (
    lower.includes("new") ||
    lower.includes("add") ||
    lower.includes("support") ||
    lower.includes("feat")
  ) {
    tags.push("Features");
  }
  if (lower.includes("fix") || lower.includes("regression")) {
    tags.push("Fixes");
  }
  if (lower.includes("performance") || lower.includes("optimiz")) {
    tags.push("Performance");
  }
  if (lower.includes("breaking")) {
    tags.push("Breaking");
  }

  return tags.length > 0 ? tags : ["Release"];
}

/**
 * Format an ISO date string to "Month YYYY" for display labels.
 */
function formatDateLabel(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/**
 * Format an ISO date string to "YYYY-MM-DD" for internal use.
 */
function formatDate(iso) {
  return iso.split("T")[0];
}

/**
 * Extract a one-line summary from release body for RSS description.
 */
function extractRssSummary(body) {
  if (!body) return "";
  // Use the first sentence/line of the body
  const firstLine = body.split(/\n/).find((l) => l.trim() && !l.startsWith("#"));
  if (!firstLine) return "";
  // Trim to ~120 chars, strip markdown formatting
  const clean = firstLine
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
  return clean.length > 120 ? clean.substring(0, 117) + "..." : clean;
}

// ── Update block generation ─────────────────────────────────────────────────

function buildUpdateBlock(tag, date, tags, content, releaseUrl, rssSummary, productName, repoLabel) {
  const tagsStr = tags.map((t) => `"${t}"`).join(", ");
  const rssTitle = `${productName} ${tag}`;
  const rssDesc = rssSummary || `${tag} release`;
  // Escape quotes in prop strings
  const esc = (s) => s.replace(/"/g, '\\"');
  // For multi-repo, prefix the heading with the repo label
  const heading = repoLabel ? `${repoLabel}: ${tag}` : tag;

  let block = "";
  block += `<Update label="${heading}" description="${date}" tags={[${tagsStr}]} rss={{ title: "${esc(rssTitle)}", description: "${esc(rssDesc)}" }}>\n`;
  block += `  ## ${heading}\n\n`;

  if (content) {
    const indented = content
      .split("\n")
      .map((line) => (line ? `  ${line}` : ""))
      .join("\n");
    block += `${indented}\n\n`;
  }

  block += `  <DoubleIconLink label="View release on GitHub" href="${releaseUrl}" iconLeft="github" />\n`;
  block += `</Update>\n`;

  return block;
}

/**
 * Generate an Update block using raw extraction (Option B).
 */
function generateUpdateBlockRaw(release, productName, repoLabel) {
  const tag = release.tag_name;
  const date = formatDateLabel(release.published_at || release.created_at);
  const tags = classifyTags(release.body);
  if (repoLabel) tags.push(repoLabel);
  const highlights = cleanForMdx(extractHighlights(release.body || ""));
  const rssSummary = extractRssSummary(release.body || "");
  return buildUpdateBlock(tag, date, tags, highlights, release.html_url, rssSummary, productName, repoLabel);
}

/**
 * Generate an Update block using LLM enhancement (Option A).
 * Falls back to raw extraction on any LLM failure.
 */
async function generateUpdateBlockEnhanced(release, prevTag, owner, repo, productName, repoLabel) {
  const tag = release.tag_name;
  const date = formatDateLabel(release.published_at || release.created_at);
  const tags = classifyTags(release.body);
  if (repoLabel) tags.push(repoLabel);

  try {
    // Fetch PR titles for richer context
    const prTitles = prevTag
      ? await fetchPRTitlesBetweenTags(owner, repo, prevTag, tag)
      : [];

    console.log(
      `  Enhancing ${tag} with LLM (${prTitles.length} PRs for context)...`
    );

    const prompt = buildPrompt(release, prTitles, productName);
    const llmContent = await callLLM(prompt);

    // Validate: LLM should return markdown bullets, not HTML or code
    if (!llmContent || llmContent.length < 10) {
      throw new Error("LLM output too short");
    }

    console.log(`  ✓ LLM returned ${llmContent.length} chars`);
    const rssSummary = extractRssSummary(release.body || "");
    return buildUpdateBlock(tag, date, tags, llmContent, release.html_url, rssSummary, productName, repoLabel);
  } catch (err) {
    console.log(`  ✗ LLM failed for ${tag}: ${err.message}`);
    console.log(`  → Falling back to raw extraction`);
    return generateUpdateBlockRaw(release, productName, repoLabel);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

/**
 * Fetch releases from one repo, annotating each with repo metadata.
 */
async function fetchRepoReleases(owner, repoName, repoLabel) {
  try {
    const releases = await githubGet(
      `/repos/${owner}/${repoName}/releases?per_page=${LIMIT}`
    );

    if (!Array.isArray(releases) || releases.length === 0) {
      return [];
    }

    // Filter: skip prereleases, drafts, and the "preview" tag
    const versioned = releases.filter(
      (r) => !r.prerelease && !r.draft && r.tag_name !== "preview"
    );

    // Annotate each release with repo context
    return versioned.map((r) => ({
      ...r,
      _repo: repoName,
      _repoLabel: repoLabel,
    }));
  } catch (err) {
    console.log(`  Error fetching ${owner}/${repoName}: ${err.message}`);
    return [];
  }
}

async function processProduct(product) {
  const owner = product.github.org;
  const productName = product.displayName;
  const changelogPath = path.join(
    REPO_ROOT,
    `v2/solutions/${product.key}/changelog.mdx`
  );

  // Determine repos to process
  const changelogRepos = product.github.changelogRepos || [
    { repo: product.github.mainRepo, label: product.github.mainRepo },
  ];

  const repoNames = changelogRepos.map((r) => r.repo).join(", ");
  console.log(`\n═══ ${productName} (${owner}: ${repoNames}) ═══`);

  if (!fs.existsSync(changelogPath)) {
    console.log(`  Changelog file not found: ${changelogPath} — skipping.`);
    return;
  }

  // Fetch releases from all repos
  const allReleases = [];
  for (const { repo, label } of changelogRepos) {
    const releases = await fetchRepoReleases(owner, repo, label);
    console.log(`  ${repo}: ${releases.length} versioned release(s)`);
    allReleases.push(...releases);
  }

  if (allReleases.length === 0) {
    console.log("  No releases found across any repo.");
    return;
  }

  // Sort by date (newest first)
  allReleases.sort(
    (a, b) =>
      new Date(b.published_at || b.created_at) -
      new Date(a.published_at || a.created_at)
  );

  // Read existing changelog — use repo:tag as unique key to avoid collisions
  // across repos (e.g. both scope and microscope could have v0.1.1)
  const existing = fs.readFileSync(changelogPath, "utf8");
  const newReleases = allReleases.filter((r) => {
    const uniqueHeading = `## ${r._repoLabel}: ${r.tag_name}`;
    const legacyHeading = `## ${r.tag_name}`;
    // Check both formats — legacy (single-repo) and new (multi-repo)
    return !existing.includes(uniqueHeading) && !existing.includes(legacyHeading);
  });

  if (newReleases.length === 0) {
    console.log("  All releases already in changelog. Nothing to do.");
    return;
  }

  console.log(`  ${newReleases.length} new release(s) to add.`);

  // Determine if this is a multi-repo product
  const isMultiRepo = changelogRepos.length > 1;

  // Generate Update blocks
  const blocks = [];
  for (const release of newReleases) {
    const repo = release._repo;
    const repoLabel = release._repoLabel;
    // For multi-repo: prefix heading with repo label, add repo to tags
    const displayName = isMultiRepo
      ? `${productName} ${repoLabel}`
      : productName;
    const labelForBlock = isMultiRepo ? repoLabel : null;

    // Find previous tag within the same repo for PR comparison
    const sameRepoReleases = allReleases.filter((r) => r._repo === repo);
    const currentIdx = sameRepoReleases.indexOf(release);
    const prevTag =
      currentIdx < sameRepoReleases.length - 1
        ? sameRepoReleases[currentIdx + 1].tag_name
        : null;

    if (ENHANCE) {
      blocks.push(
        await generateUpdateBlockEnhanced(
          release,
          prevTag,
          owner,
          repo,
          displayName,
          labelForBlock
        )
      );
    } else {
      blocks.push(generateUpdateBlockRaw(release, displayName, labelForBlock));
    }
  }

  const output = blocks.join("\n");

  // Find insertion point: after the automation zone comment
  const marker = "────────────────────────────────────────────── */}";
  const markerIdx = existing.indexOf(marker);

  if (markerIdx === -1) {
    console.error(
      `  ERROR: Could not find automation zone marker in ${changelogPath}`
    );
    return;
  }

  const insertAt = markerIdx + marker.length;
  const updated =
    existing.slice(0, insertAt) + "\n\n" + output + existing.slice(insertAt);

  if (DRY_RUN) {
    console.log(`\n  ── DRY RUN ── Would write to ${changelogPath}:\n`);
    console.log(output);
    console.log(`\n  ── ${newReleases.length} block(s) would be added.`);
    return;
  }

  fs.writeFileSync(changelogPath, updated);
  console.log(
    `  Written ${newReleases.length} new release(s) to ${changelogPath}`
  );
}

async function main() {
  const products = loadProductConfig(PRODUCT_KEY);

  console.log(
    `Processing ${products.length} product(s) (limit: ${LIMIT} releases each)`
  );
  if (ENHANCE) {
    console.log(`LLM enhancement enabled (provider: ${LLM_PROVIDER})`);
  }

  for (const product of products) {
    await processProduct(product);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
