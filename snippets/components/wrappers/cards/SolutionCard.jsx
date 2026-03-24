/**
 * @component SolutionCard
 * @type wrappers
 * @subniche cards
 * @status stable
 * @description Card body for Solutions Portal product cards. Renders badges, logo, bold subtitle, infra tags, scrollable blurb, and social links as a single composable unit.
 * @accepts badges, logoSrc, logoAlt, subtitle, infraTags, blurb, socialLinks, scrollHeight
 * @aiDiscoverability high
 * @note Sub-components (ScrollBox, SocialLinks, P) must also be imported on the MDX page using this component.
 * @note Icon is a Mintlify global — no import needed.
 * @param {React.ReactNode} badges - Badge elements rendered above the logo.
 * @param {string} [logoSrc] - Path to the product logo image.
 * @param {string} [logoAlt] - Alt text for the logo image.
 * @param {string} [subtitle] - Bold one-line product subtitle.
 * @param {Array} [infraTags] - Array of {icon, label} objects for infra tag row.
 * @param {string} [blurb] - Product description text rendered in a scroll box.
 * @param {number} [scrollHeight=100] - Max height in px for the scroll box.
 * @param {Array} [socialLinks] - Array of {icon, href, label} objects passed to SocialLinks.
 *
 * @example
 * import { ScrollBox } from "/snippets/components/wrappers/containers/ScrollBox.jsx";
 * import { SocialLinks } from "/snippets/components/elements/social/SocialLinks.jsx";
 *
 * <SolutionCard
 *   badges={<><Badge color="blue">Video</Badge></>}
 *   logoSrc="/snippets/assets/logos/products/example-logo.svg"
 *   logoAlt="Example Logo"
 *   subtitle="One-line product subtitle"
 *   infraTags={[{ icon: "plug", label: "api" }, { icon: "cloud", label: "saas" }]}
 *   blurb="Product description text here."
 *   socialLinks={[{ icon: "globe", href: "https://example.com", label: "Website" }]}
 * />
 */

export const SolutionCard = ({
  badges,
  logoSrc,
  logoAlt,
  subtitle,
  infraTags = [],
  blurb,
  scrollHeight = 100,
  socialLinks,
}) => {
  // STYLE CONSTS HERE NOT INLINE
  const logoContainerStyle = {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    margin: '0.25rem 0',
  }
  const logoStyle = {
    height: '100%',
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
  }
  const subtitleStyle = {
    fontWeight: 700,
    fontSize: '1rem',
  }
  const infraRowStyle = {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    margin: '0.25rem 0 0.5rem',
  }
  const infraTagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.75rem',
    color: 'var(--hero-text)',
  }
  const socialStyle = { marginTop: '1rem', marginBottom: '-1rem' }

  return (
    <div style={{ margin: '0 0 -1.5rem 0' }}>
      {badges && <span>{badges}</span>}

      {logoSrc && (
        <div style={logoContainerStyle}>
          <img
            src={logoSrc}
            alt={logoAlt || 'solution provider logo'}
            style={logoStyle}
          />
        </div>
      )}

      {subtitle && (
        <>
          <style>{`.solution-card-subtitle { color: white !important; }`}</style>
          <div className="solution-card-subtitle" style={subtitleStyle}>
            {subtitle}
          </div>
        </>
      )}

      {infraTags.length > 0 && (
        <div style={infraRowStyle}>
          {infraTags.map((tag, i) => (
            <span key={i} style={infraTagStyle}>
              <Icon icon={tag.icon} size={12} color="var(--accent)" />
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {blurb && (
        <ScrollBox maxHeight={scrollHeight} style={{ fontSize: '0.75rem' }}>
          {blurb}
        </ScrollBox>
      )}

      {socialLinks && (
        <SocialLinks justify="center" style={socialStyle} links={socialLinks} />
      )}
    </div>
  )
}
