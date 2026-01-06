# Automations

This folder contains all automations or desired automations in the Livepeer docs. Status will say [Live] if it is live, [WIP] if it is in progress, and [Future] if it is a future automation.

The following automations are available:

### Trending & Data Fetching

- Fetch recent YouTube Videos & Display
- Fetch recent Forum Posts & Display
- Fetch recent Discord Announcements & Display
- Fetch recent Blog Posts & Display
- Fetch RFPs & Display
  ~Maybe~
- Fetch recent Twitter Tweets & Display
- Fetch recent GitHub Issues & Display
- Fetch recent GitHub Pull Requests & Display

### HUBs & Contact

- Ecosystem Projects HUB
- Resources HUB
- Partner HUB
- Sales/Data Center Contact Form (?) -> should direct to appropriate email
-

### Changelog

- Automated Changelog from Github Releases

### AI Functions

- Transcribe a Youtube Video for download
- Translate pages into other languages
- Create a hero image
- Check All Documentation Links (periodically)
- Create a video?

### AI Optimisations

- RAG (?) -> enable access to github repo's & external docs for better assistant capabilities
- MCP ()

---

## Scripts

Scripts are located in `v2/scripts/`. These are command-line tools for generating and fetching documentation assets.

### generate-api-docs.sh [Live]

Generates Mintlify API documentation from an OpenAPI specification file.

**What it does:**

1. Reads an OpenAPI spec (YAML or JSON)
2. Creates a **landing page** with CardGroups linking to each endpoint (grouped by tags)
3. Creates **individual MDX pages** for each endpoint with `openapi: METHOD /path` frontmatter
4. Outputs a **docs.json navigation snippet** ready to copy-paste

**Usage:**

```bash
./v2/scripts/generate-api-docs.sh <openapi-spec> <output-dir> <api-name>
```

**Example:**

```bash
./v2/scripts/generate-api-docs.sh ai/worker/api/openapi.yaml v2/pages/04_gateways/guides-references/api-reference/AI-API "AI API"
```

**Output structure:**

```
output-dir/
├── ai-api.mdx           # Landing page with Base URLs + CardGroups
├── text-to-image.mdx    # openapi: post /text-to-image
├── image-to-image.mdx   # openapi: post /image-to-image
├── llm.mdx              # openapi: post /llm
├── health.mdx           # openapi: get /health
└── ...
```

**Landing page features:**

- Title & description from API name
- Base URLs table (pulled from OpenAPI `servers` field)
- Endpoints grouped by OpenAPI tags (e.g., "generate", "system")
- Auto-assigned icons based on endpoint name (image, video, audio, etc.)

**After running:** Copy the outputted JSON snippet into your `docs.json` navigation.

---

### fetch-openapi-specs.sh [Live]

Fetches OpenAPI specification files from the livepeer/ai-runner repository.

**Usage:**

```bash
./v2/scripts/fetch-openapi-specs.sh
```

**Downloads:**

- `ai/worker/api/openapi.yaml` - AI Runner API spec
- `ai/worker/api/gateway.openapi.yaml` - AI Gateway API spec

---

### fetch-external-docs.sh [Live]

Fetches external documentation files from other Livepeer repositories.

**Usage:**

```bash
./v2/scripts/fetch-external-docs.sh
```
