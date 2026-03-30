# Workflow Audit Draft: Pipeline Freshness Monitor

- Source path: `.github/workflows/freshness-monitor.yml`
- Concern: `validation`
- Risk level: `medium`
- Dispatcher candidate: `review-fix`

## Summary

Pipeline Freshness Monitor runs on schedule, workflow_dispatch and primarily produces github step summary.

## Dependencies

- action:actions/checkout@v4
- snippets/automations/blog/ghostBlogData.jsx
- snippets/automations/discord/discordAnnouncementsData.jsx
- snippets/automations/forum/forumData.jsx
- snippets/automations/globals/globals.mdx
- snippets/automations/luma/lumaEventsData.jsx
- snippets/automations/showcase/showcaseData.jsx
- snippets/automations/youtube/youtubeData.jsx

## Dependants

- dispatcher:review-fix

## Frailty Notes

- Contains advisory steps with `continue-on-error`, so failures may be softened rather than fully blocking.
- Scheduled execution can hide drift until the next cron window.
