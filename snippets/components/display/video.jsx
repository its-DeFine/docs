/**
 * YouTubeVideo - Embeds a YouTube video with optional caption and hint
 *
 * @description
 * Displays a YouTube video in a responsive iframe within a Frame component.
 * Supports optional hint text and caption with microphone icon.
 *
 * @param {string} embedUrl - YouTube embed URL (e.g., "https://www.youtube.com/embed/VIDEO_ID")
 * @param {string} [title=""] - Video title for accessibility
 * @param {string} [hint=""] - Optional hint text to display
 * @param {string} [caption] - Optional caption text to display below the video
 *
 * @example
 * <YouTubeVideo
 *   embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
 *   title="Introduction to Livepeer"
 *   caption="Watch this tutorial to get started"
 * />
 *
 * @todo Deconstruct to change icon props. Only render icon if passed in.
 * @author Livepeer Documentation Team
 */
export const YouTubeVideo = ({ embedUrl, title = "", hint = "", caption }) => {
  return (
    <Frame
      {...(hint ? { hint } : {})}
      {...(caption
        ? {
            caption: (
              <span style={{ display: "flex", alignItems: "center" }}>
                <Icon icon="microphone" color="grey" />
                <span style={{ marginLeft: 8 }}>{caption}</span>
              </span>
            ),
          }
        : {})}
    >
      <iframe
        className="w-full aspect-video rounded-xl"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Frame>
  );
};

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

  // Convert YouTube watch URL to embed URL
  const getEmbedUrl = (href) => {
    const videoId = href.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : href;
  };

  return (
    <Columns cols={cols}>
      {displayItems.map((item, idx) => (
        <YouTubeVideo
          key={item.href || idx}
          embedUrl={getEmbedUrl(item.href)}
          title={item.title}
          caption={`${item.author} • ${item.publishedDate}`}
        />
      ))}
    </Columns>
  );
};

/**
 * LinkedInEmbed - Embeds a LinkedIn post with optional caption and hint
 *
 * @description
 * Displays a LinkedIn post in a responsive iframe within a Frame component.
 * Follows LinkedIn's official embed requirements and terms of use.
 * See: https://developer.linkedin.com/legal/embed-terms-of-use
 *
 * @param {string} embedUrl - LinkedIn embed URL (e.g., "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:...")
 *                            Note: URL should include ?compact=1 parameter for proper rendering
 * @param {string} [title="Embedded post"] - Post title for accessibility (matches LinkedIn default)
 * @param {string} [hint=""] - Optional hint text to display
 * @param {string} [caption] - Optional caption text to display below the post
 * @param {string} [height="399"] - Height of the embed iframe (LinkedIn default: 399px)
 *
 * @example
 * <LinkedInEmbed
 *   embedUrl="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7387171661868933120?compact=1"
 *   title="Livepeer Update"
 *   caption="Latest news from the Livepeer team"
 *   height="500"
 * />
 *
 * @author Livepeer Documentation Team
 */
export const LinkedInEmbed = ({
  embedUrl,
  title = "Embedded post",
  hint = "",
  caption,
  height = "399",
}) => {
  // Ensure URL has compact parameter if not already present
  const finalUrl = embedUrl.includes("?") ? embedUrl : `${embedUrl}?compact=1`;

  return (
    <Frame
      {...(hint ? { hint } : {})}
      {...(caption
        ? {
            caption: (
              <span style={{ display: "flex", alignItems: "center" }}>
                <Icon icon="linkedin" color="grey" />
                <span style={{ marginLeft: 8 }}>{caption}</span>
              </span>
            ),
          }
        : {})}
    >
      <iframe
        src={finalUrl}
        title={title}
        height={height}
        className="w-full rounded-xl"
      />
    </Frame>
  );
};

/**
 * YouTubeVideoDownload - Placeholder for YouTube video with download functionality
 *
 * @description
 * Originally intended for YouTube videos with download capability.
 * Currently returns an empty container as DownloadButton was removed for Mintlify compatibility.
 *
 * @param {string} embedUrl - YouTube embed URL (currently unused)
 * @param {string} title - Video title (currently unused)
 * @param {string} hint - Hint text (currently unused)
 * @param {string} [caption=""] - Caption text (currently unused)
 *
 * @deprecated This component is currently non-functional. Use YouTubeVideo instead.
 * @author Livepeer Documentation Team
 */
export const YouTubeVideoDownload = ({
  embedUrl,
  title,
  hint,
  caption = "",
}) => {
  console.log("props", embedUrl, title, hint);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
      }}
    >
      {/* DownloadButton removed for Mintlify compatibility */}
      {/* <Frame
          {...(hint ? { hint } : {})}
          {...(caption
            ? {
                caption: (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Icon icon="microphone" color="grey" />
                    <span style={{ marginLeft: 8 }}>{caption}</span>
                  </span>
                ),
              }
            : {})}
        >
          <iframe
            className="w-full aspect-video rounded-xl"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Frame> */}
    </div>
  );
};

// export const YouTubeVideoDownload = ({
//   embedUrl,
//   title,
//   hint,
//   caption,
//   downloadLink,
// }) => {
//   return (
//     <Frame
//       {...(hint ? { hint } : {})}
//       {...(caption
//         ? {
//             caption: <DownloadLink downloadLink={downloadLink} />,
//           }
//         : {})}
//     >
//       <iframe
//         className="w-full aspect-video rounded-xl"
//         src={embedUrl}
//         title={title}
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       />
//     </Frame>
//   )
// }

//Self-hosted video
// ;<video
//   autoPlay
//   playsInline
//   controls
//   className="w-full aspect-video rounded-xl"
//   src="https://www.youtube.com/watch?v=9yLIPZ4iBLw"
// ></video>

// ;<div className="custom-caption">
//   <Icon icon="microphone" /> {title}
// </div>
// <Frame caption={title} hint="hint"></Frame>

/**
 * CardVideo - YouTube video embedded in a Card component
 *
 * @description
 * Displays a YouTube video within a Card component with a title caption below.
 * Uses responsive aspect ratio for proper video display.
 *
 * @param {string} embedUrl - YouTube embed URL
 * @param {string} title - Video title to display below the video
 *
 * @example
 * <CardVideo
 *   embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
 *   title="Getting Started with Livepeer"
 * />
 *
 * @author Livepeer Documentation Team
 */
export const CardVideo = ({ embedUrl, title }) => {
  console.log("Props:", { embedUrl, title }); // Add this
  return (
    <Card>
      <iframe
        className="w-full aspect-video rounded-xl"
        style={{ aspectRatio: "16/9" }}
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <span className="flex items-center justify-center">
        <Icon icon="microphone" color="grey" />
        <span className="ml-2" color="gray">
          {title}
        </span>
      </span>
    </Card>
  );
};

// Notes: Fetch video information for youtube videos

// Yes, **GitHub Actions is viable**. The workflow would:

// 1. **Trigger on commit/PR** to your code repo
// 2. **Run your script** to fetch YouTube metadata (title, description)
// 3. **Update MDX files** with the fetched data
// 4. **Commit changes** back to the repo (or create a new commit)
// 5. **Mintlify auto-builds** from the updated repo

// The key is that GitHub Actions can modify files and commit them before Mintlify's build process starts. You'd typically have the action commit directly to the branch or create a new commit that triggers Mintlify's deployment.

// **Example flow:**
// - Push code → GitHub Action runs → Script fetches YouTube data → Updates MDX → Commits changes → Mintlify detects new commit → Builds docs

// This is similar to how the [agent automation workflow](https://mintlify.com/docs/guides/automate-agent) works with GitHub Actions.
