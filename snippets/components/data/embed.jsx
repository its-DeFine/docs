/**
 * MarkdownEmbed - Fetches and renders markdown content from a URL
 *
 * @description
 * Dynamically fetches markdown content from a remote URL and renders it.
 * Uses React hooks to manage the fetch lifecycle.
 *
 * @param {string} url - URL of the markdown file to fetch and display
 *
 * @example
 * <MarkdownEmbed url="https://raw.githubusercontent.com/user/repo/main/README.md" />
 *
 * @author Livepeer Documentation Team
 */
export const MarkdownEmbed = ({ url }) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then(setContent)
  }, [url])

  return <Markdown>{content}</Markdown>
}

/**
 * PdfEmbed - Displays an embedded PDF or PDF-like document inside a frame
 *
 * @description
 * Wraps an iframe in a Mintlify Frame so long-form external documents can be
 * embedded with a caption and responsive width.
 *
 * @param {string} title - Frame caption and iframe title
 * @param {string} src - PDF or embeddable document URL
 * @param {string} [height="700px"] - Iframe height
 * @param {string} [width="100%"] - Iframe width
 *
 * @example
 * <PdfEmbed title="Whitepaper" src="https://example.com/whitepaper.pdf" />
 *
 * @author Livepeer Documentation Team
 */
export const PdfEmbed = ({
  title,
  src,
  height = '700px',
  width = '100%',
}) => (
  <Frame caption={title}>
    <iframe src={src} width={width} height={height} frameBorder="0" title={title}></iframe>
  </Frame>
)

// ARCHIVED: duplicate of MarkdownEmbed - see tasks/reports/archived-components-review.md
// export const EmbedMarkdown = ({ url }) => <MarkdownEmbed url={url} />

export const TwitterTimeline = ({}) => {
  return (
    <div
      style={{
        border: '3px solid var(--accent)',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '600px',
      }}
    >
      <iframe
        src="https://feed.mikle.com/widget/v2/176804/"
        style={{
          border: 'none',
          transform: 'scale(1.01)', // Shrink by 1% to hide border
          transformOrigin: 'center',
        }}
        height="652px" // Increase height by 4px (2px top + 2px bottom)
        width="100%" // Increase width by 4px (2px left + 2px right)
        class="fw-iframe"
        frameborder="none"
        scrolling="no"
      ></iframe>
    </div>
  )
}
