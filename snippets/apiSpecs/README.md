# ELI5: Generate API Docs in Mintlify

Follow these super simple steps to turn an OpenAPI spec (YAML/JSON) into
Mintlify docs.

## 1) Install Mintlify (first time only)

```bash
npm i -g mintlify
```

## 2) Pick your OpenAPI spec and output folder

- Spec file: for example `ai/worker/api/openapi.yaml`
- Output folder: where the generated MDX pages go, e.g.
  `v2/pages/04_gateways/guides-references/api-reference/CLI-HTTP`
- Title: a friendly name shown in nav, e.g. `"CLI HTTP"`

## 3) Run the generator script

From the repo root:

```bash
./v2/scripts/generate-api-docs.sh ai/worker/api/openapi.yaml v2/pages/04_gateways/guides-references/api-reference/CLI-HTTP "CLI HTTP"
```

Examples:

```bash
# AI API example
./v2/scripts/generate-api-docs.sh ai/worker/api/openapi.yaml v2/pages/04_gateways/guides-references/api-reference/AI-API "AI API"

# CLI HTTP example
./v2/scripts/generate-api-docs.sh ai/worker/api/openapi.yaml v2/pages/04_gateways/guides-references/api-reference/CLI-HTTP "CLI HTTP"
```

## 4) What gets created

- MDX pages inside your chosen output folder
- A navigation snippet for `docs.json` (list of page paths as strings)

## 5) Add the pages to `docs.json`

Open [docs.json](docs.json) and include the generated pages under the right
group. Important: each item inside `pages` must be a string path.

Example:

```json
{
  "group": "CLI HTTP API",
  "pages": [
    "v2/pages/04_gateways/guides-references/api-reference/CLI-HTTP/overview",
    "v2/pages/04_gateways/guides-references/api-reference/CLI-HTTP/reference"
  ]
}
```

## 6) Preview locally

```bash
mint dev
```

Open the local preview and click into the new group to see the generated API
docs.

## 7) Troubleshooting (ELI5)

- Error: "Incorrect type. Expected string": make sure every entry in `pages` is
  a string path (no objects).
- Pages not showing: double-check the output folder path matches what you put in
  `docs.json`.
- Need to regenerate: rerun the script after updating your OpenAPI spec.

## 8) Optional: Build via Docker or Makefile

```bash
# Docker build (amd64)
docker buildx build --platform linux/amd64 --load -t livepeer/docs .

# Makefile build
make all
```
