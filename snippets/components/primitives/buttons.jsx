// ARCHIVED: placeholder - see tasks/reports/archived-components-review.md
// export const BasicBtn = () => <div></div>

/**
 * @component DownloadButton
 * @category primitives
 * @tier primitive
 * @status stable
 * @description A download button that uses IntersectionObserver for lazy rendering. Only renders
 *   the full button when it becomes visible in the viewport. Supports custom icons, labels, and
 *   optional border styling
 * @contentAffinity how_to
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/gateways/quickstart/gateway-setup.mdx
 *   v2/gateways/run-a-gateway/install/linux-install.mdx, v2/internal/overview/docs-philosophy.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx, v2/resources/media-kit.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} [label='Download'] - Label text rendered by the component.
 * @param {string} [icon='download'] - Icon configuration used by the component.
 * @param {string} downloadLink - Download link used by the component.
 * @param {string} [rightIcon=''] - Right icon used by the component.
 * @param {boolean} [border=false] - Boolean flag that controls component behaviour.
 *
 * @example
 * <DownloadButton downloadLink="value" />
 */
export const DownloadButton = ({
  label = 'Download',
  icon = 'download',
  downloadLink,
  rightIcon = '',
  border = false,
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  downloadLink = downloadLink ? downloadLink : 'https://Livepeer.org'

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = downloadLink
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (!isVisible) {
    return (
      <span ref={ref} style={{ minHeight: '20px', display: 'inline-block' }} />
    )
  }

  return (
    <span
      ref={ref}
      style={
        border
          ? {
              border: '1px solid grey',
              borderRadius: '6px',
              padding: '6px 10px',
              display: 'inline-block',
              cursor: 'pointer',
            }
          : { cursor: 'pointer' }
      }
    >
      <Icon icon={icon} size={18} color="var(--accent)" />
      <button
        onClick={handleDownload}
        style={{
          marginRight: 8,
          marginLeft: 8,
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          textDecoration: 'underline',
          padding: 0,
          font: 'inherit',
        }}
      >
        {label}
      </button>
      {rightIcon && (
        <Icon
          icon={rightIcon}
          style={{ marginLeft: 8 }}
          size={18}
          color="var(--accent)"
        />
      )}
    </span>
  )
}
