# Workflow Audit Draft: Update Blog and Forum Data

- Source path: `.github/workflows/update-blog-data.yml`
- Concern: `authoring`
- Risk level: `high`
- Dispatcher candidate: `page-ship`

## Summary

Update Blog and Forum Data runs on workflow_dispatch and primarily produces generated or refreshed repository data.

## Dependencies

- action:actions/checkout@v4
- secret:GITHUB_TOKEN
- snippets/automations/
- snippets/automations/blog/ghostBlogData.jsx
- snippets/automations/forum/forumData.jsx

## Dependants

- dispatcher:page-ship

## Frailty Notes

- Contains advisory steps with `continue-on-error`, so failures may be softened rather than fully blocking.
- Mutates repository state from CI, which raises coordination and safety risk.
- Depends on secrets, so runtime behavior cannot be fully reasoned about from repo state alone.
