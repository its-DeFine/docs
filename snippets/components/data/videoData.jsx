import { YouTubeVideo } from "/snippets/components/content/video.jsx";

/**
 * YouTubeVideoData - Renders YouTube videos from youtubeData.jsx format
 *
 * @param {Array} items - Array of video objects from youtubeData.jsx
 * @param {number} [limit] - Optional limit on number of videos to display
 *
 * @example
 * import { youtubeData } from 'snippets/automations/youtube/youtubeData.jsx';
 * import { filterVideos } from 'snippets/automations/youtube/filterVideos.js';
 *
 * <YouTubeVideoData items={filterVideos(youtubeData)} limit={3} />
 */
export const YouTubeVideoData = ({ items = [], limit, cols = 2 }) => {
  const displayItems = limit ? items.slice(0, limit) : items;
  if (!displayItems || displayItems.length === 0) {
    return (
      <Note>
        <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>
          No videos at this time.
        </p>
      </Note>
    );
  }

  const getEmbedUrl = (href) => {
    if (!href) return "";
    const videoId = href.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : href;
  };

  return (
    <Columns cols={cols}>
      {displayItems.map((item, idx) => {
        if (!item || !item.href) return null;
        return (
          <YouTubeVideo
            key={item.href || idx}
            embedUrl={getEmbedUrl(item.href)}
            title={item.title || ""}
            caption={`${item.author || ""} • ${item.publishedDate || ""}`}
          />
        );
      })}
    </Columns>
  );
};
