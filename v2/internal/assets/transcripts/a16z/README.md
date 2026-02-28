# a16z transcript workflow

This folder is the target for internally generated MDX transcripts produced by `tools/scripts/transcribe-audio-to-mdx.js`. The script handles the audio download, `ffmpeg` chunking, OpenRouter transcription, and markdown rendering; it writes files to `v2/internal/assets/transcripts/a16z/<published-at>-<slug>.mdx`.

## First planned transcript

- **Episode**: Inferact: Building the Infrastructure That Runs Modern AI
- **Published**: 2026-01-22
- **Slug**: `inferact-building-the-infrastructure-that-runs-modern-ai`
- **Output path**: `v2/internal/assets/transcripts/a16z/2026-01-22-inferact-building-the-infrastructure-that-runs-modern-ai.mdx`

The transcript itself is not yet generated because it requires a valid `OPENROUTER_API_KEY`. Run the following command locally (with your own API key) to produce the MDX file when ready:

```bash
OPENROUTER_API_KEY=... \
  node tools/scripts/transcribe-audio-to-mdx.js \
    --audio-url "https://afp-848985-injected.calisto.simplecastaudio.com/112866f3-1a50-4d92-8517-8d84c18386af/episodes/f6d42d55-3e7d-4d92-8517-8d84c18386af/audio/128/default.mp3/default.mp3_ywr3ahjkcgo_f7861f0342eb814c39535221300c24b2_41873754.mp3?aid=rss_feed&awCollectionId=112866f3-1a50-4d92-8517-8d84c18386af&awEpisodeId=f6d42d55-3e7d-4d92-8517-8d84c18386af&feed=Hb_IuXOo&hash_redirect=1&x-total-bytes=41873754&x-ais-classified=streaming&listeningSessionID=0CD_382_57__96de380fcf4d43a6f78ba49d7726176a3cbea54b" \
    --title "Inferact: Building the Infrastructure That Runs Modern AI" \
    --show "AI + a16z" \
    --published-at 2026-01-22 \
    --output-dir v2/internal/assets/transcripts/a16z
```

For a reliable run, ensure that `ffmpeg`/`ffprobe` are installed (`brew install ffmpeg` on macOS, `sudo apt install ffmpeg` on Debian/Ubuntu) and that the OpenRouter site headers match your environment (`OPENROUTER_SITE_URL` and `OPENROUTER_SITE_NAME`, if needed). The script already enforces the required flags and will retry transient API errors before failing with troubleshooting hints.
