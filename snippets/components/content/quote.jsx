/**
 * @component Quote
 * @category content
 * @tier composite
 * @status stable
 * @description Renders the quote component
 * @contentAffinity concept
 * @owner @livepeer/docs-team
 * @dependencies FrameQuote
 * @usedIn v2/about/livepeer-protocol/core-mechanisms.mdx
 *   v2/about/livepeer-protocol/governance-model.mdx, v2/about/livepeer-protocol/livepeer-token.mdx
 *   v2/about/livepeer-protocol/overview.mdx, v2/about/livepeer-protocol/technical-architecture.mdx
 *   v2/about/livepeer-protocol/treasury.mdx, v2/home/about-livepeer/vision.mdx
 *   v2/internal/rfp/aims.mdx, v2/internal/rfp/report.mdx
 *   v2/orchestrators/quickstart/join-a-pool.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/display.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <Quote>Example</Quote>
 */
export const Quote = ({ children }) => {
  if (children == null) {
    console.warn("[Quote] Missing children");
    return null;
  }

  const quoteStyle = {
    fontSize: '1rem',
    textAlign: 'center',
    opacity: 1,
    fontStyle: 'italic',
    color: 'var(--accent)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
  }
  return <div style={quoteStyle}>{children}</div>
}

/**
 * @component FrameQuote
 * @category content
 * @tier composite
 * @status stable
 * @description Renders the frame quote component
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/livepeer-protocol/core-mechanisms.mdx, v2/about/livepeer-protocol/overview.mdx
 *   v2/home/about-livepeer/benefits.mdx, v2/home/about-livepeer/ecosystem.mdx
 *   v2/home/about-livepeer/vision.mdx, v2/internal/overview/docs-philosophy.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/display.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/style-guide.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} author - Author used by the component.
 * @param {string} source - Source used by the component.
 * @param {string} href - Destination URL used by the component.
 * @param {boolean} [frame=true] - Boolean flag that controls component behaviour.
 * @param {string} [align='right'] - Align used by the component.
 * @param {string} borderColor - Border color used by the component.
 * @param {string} img - Asset or embed source used by the component.
 * @param {boolean} [spacing=true] - Boolean flag that controls component behaviour.
 *
 * @example
 * <FrameQuote author="value" source="value" href="/example" />
 */
export const FrameQuote = ({
  children,
  author,
  source,
  href,
  frame = true,
  align = 'right',
  borderColor,
  img,
  spacing = true,
  ...props
}) => {
  const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0.75rem 1rem 0.25rem 1rem',
        gap: '0.25rem',
      }}
    >
      <div
        style={{
          borderLeft: `4px solid var(--accent)`,
          paddingLeft: '1rem',
          fontStyle: 'italic',
        }}
      >
        {children}
      </div>
      {(author || source) && (
        <div
          style={{
            display: 'flex',
            justifyContent: alignmentMap[align] || 'flex-end',
            marginLeft: align === 'left' ? '1.5rem' : 0,
          }}
        >
          <div style={{ textAlign: align === 'center' ? 'center' : 'left' }}>
            {author && (
              <div>
                {spacing && <br />}
                <Icon icon="microphone" />{' '}
                <strong>
                  <em>{author}</em>
                </strong>
              </div>
            )}
            {source &&
              (href ? (
                <a href={href} target="_blank">
                  <span
                    style={{
                      opacity: 0.7,
                      fontStyle: 'italic',
                      borderBottom: '1px solid var(--accent)',
                      fontSize: '1rem',
                    }}
                  >
                    {source}
                  </span>{' '}
                  <Icon icon="arrow-up-right" size={12} color="var(--accent)" />
                </a>
              ) : (
                <span
                  style={{
                    opacity: 0.7,
                    fontStyle: 'italic',
                    fontSize: '1rem',
                  }}
                >
                  {source}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  )

  return frame ? (
    <div
      style={{
        border: borderColor ? `1px solid ${borderColor}` : 'none',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Frame {...props} style={{ border: 'none' }}>
        {img && <img src={img.src} alt={img.alt} />}
        {content}
      </Frame>
    </div>
  ) : (
    content
  )
}
