# tools/config

Machine-readable tooling contracts for the Livepeer Docs repo.

This folder is for shared config that is consumed by live tooling. It is not a general storage area for seeds, reports, templates, or workflow-local data.

## Allowed Structure

- `tools/config/runtime/`
  Shared runtime manifests, schemas, and config modules used by multiple tools or governance surfaces.
- `tools/config/quality/`
  Style, spelling, layout, usefulness, and accuracy profiles used by audits, validators, and tests.
- `tools/config/scoped-navigation/`
  Stable scoped `docs.json` variants used by `lpd`, scoped preview helpers, and research tooling.
- `tools/config/registry/`
  Generated governance indexes and registries.
- `tools/config/.speakeasy/`
  Vendor-owned Speakeasy workflow files. This is the only workflow-specific exception kept here.

## Not Allowed

- Workflow-local seeds or baselines that belong beside one audit or one script
- Long-form documentation or planning notes
- Ad hoc env templates such as `.env.*` placeholders without a live documented consumer
- Duplicate vendor config copied out of canonical hidden folders
- Reports, archives, or experiments

## Placement Rules

- If the file configures a shared runtime or governance contract, place it in `runtime/`.
- If the file defines style, spelling, scoring, or quality rules, place it in `quality/`.
- If the file is a scoped docs config used for preview or bounded review, place it in `scoped-navigation/`.
- If the file is generated from repo metadata, place it in `registry/` and regenerate it instead of hand-editing it.
- If the file belongs to one workflow only, colocate it with that workflow under `operations/scripts/**`.

## Current Exceptions

- `scoped-navigation/` remains at the top level because multiple preview and review tools already treat it as a stable contract.
- `.speakeasy/` remains at the top level because it is the canonical vendor-owned workflow surface.

## Maintenance

- Update consuming code, tests, and docs in the same change when a config path moves.
- Regenerate `registry/` outputs after changing script metadata or indexed script paths.
- Keep this folder understandable from a quick directory listing.
