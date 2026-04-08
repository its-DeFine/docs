import { CopyText } from '/snippets/components/elements/text/Text.jsx'

// Re-exports for consumers that import these from Links.jsx
export { BlinkingIcon } from '/snippets/components/elements/icons/Icons.jsx';
export { CustomCallout, TipWithArrow } from '/snippets/components/elements/callouts/Callouts.jsx';

/**
 * @component DoubleIconLink
 * @category elements
 * @subcategory links
 * @status stable
 * @description Inline link with icons on both sides.
 * @aiDiscoverability none
 * @param {string} [label=""] - Link text/label
 * @param {string} [href="#"] - Link URL
 * @param {string} [text=""] - Optional text to display before the link
 * @param {string} [iconLeft="github"] - Icon to display on the left
 * @param {string} [iconRight="arrow-up-right"] - Icon to display on the right
 * @example
 * <DoubleIconLink />
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
const DoubleIconLink = ({
  label = '',
  labelColor,
  href = '#',
  text = '',
  iconLeft = 'github',
  iconLeftColor,
  iconRight = 'arrow-up-right',
  iconRightColor = 'var(--lp-color-accent)',
  className = '',
  style = {},
  ...rest
}) => {
  return (
    <span
      className={className}
      style={{
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: "var(--lp-spacing-1)",
        marginLeft: '0.3rem',
        ...style,
      }}
      {...rest}
    >
      {text && <span style={{ marginRight: 8 }}>{text}</span>}
      <Icon icon={iconLeft} color={iconLeftColor} />
      <a href={href} style={{ color: { labelColor } }}>
        {label}
      </a>
      <div style={{ marginRight: '0.3rem' }}>
        <Icon icon={iconRight} size={12} color={iconRightColor} />
      </div>
    </span>
  )
}

/**
 * @component GotoLink
 * @category elements
 * @subcategory links
 * @status stable
 * @description Inline navigation link with icon prefix and label.
 * @aiDiscoverability none
 * @param {string} label - Link text/label
 * @param {string} relativePath - Relative URL path
 * @param {string} [text=""] - Optional text to display before the link
 * @param {string} [icon="arrow-turn-down-right"] - Icon to display
 * @example
 * <GotoLink label="example" relativePath="example" />
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
const GotoLink = ({
  label,
  relativePath,
  text = '',
  icon = 'arrow-turn-down-right',
  className = '',
  style = {},
  ...rest
}) => {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', ...style }}
      {...rest}
    >
      <span style={{ marginRight: 8 }}>{text}</span>
      <Icon icon={icon} aria-hidden="true" />
      <a href={relativePath} style={{ marginLeft: 6 }}>
        {label}
      </a>
    </span>
  )
}

/**
 * @component GotoCard
 * @category elements
 * @subcategory links
 * @status stable
 * @description Card-style navigation link wrapping Mintlify Card component.
 * @aiDiscoverability none
 * @param {string} label - Card title
 * @param {string} relativePath - Relative URL path
 * @param {string} icon - Icon to display (defaults to "arrow-turn-down-right")
 * @param {React.ReactNode} text - Card content
 * @param {string} [cta=""] - Call-to-action button text
 * @param {any} props - props prop.
 * @example
 * <GotoCard label="example" relativePath="example" />
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
const GotoCard = ({
  label,
  relativePath,
  icon,
  text,
  cta = '',
  className = '',
  style = {},
  ...props
}) => {
  icon = icon ? icon : 'arrow-turn-down-right'
  return (
    <Card
      title={label}
      icon={icon}
      href={relativePath}
      cta={cta}
      className={className}
      style={style}
      {...props}
    >
      {text}
    </Card>
  )
}

/**
 * @component LinkArrow
 * @category elements
 * @subcategory links
 * @status stable
 * @description External link with arrow icon, optional description, and line break control.
 * @aiDiscoverability none
 * @param {any} href - href prop.
 * @param {any} label - label prop.
 * @param {any} description - description prop.
 * @param {boolean} [newline=true] - newline prop.
 * @param {any} borderColor - border Color prop.
 * @example
 * <LinkArrow href="example" label="example" />
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
const LinkArrow = ({
  href,
  label,
  description,
  newline = true,
  borderColor,
  className = '',
  style = {},
  ...rest
}) => {
  const linkArrowStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: "var(--lp-spacing-1)",
    width: 'fit-content',
    ...(borderColor && { borderColor }),
  }
  return (
    <span className={className} style={style} {...rest}>
      {newline && <br />}
      <span style={linkArrowStyle}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
        <Icon icon="arrow-up-right" size={14} color="var(--lp-color-accent)" />
      </span>
      {description && description}
      {description && <div style={{ height: "var(--lp-spacing-3)" }} />}
    </span>
  )
}

/**
 * @component LinkIcon
 * @category elements
 * @subcategory links
 * @status stable
 * @description Wraps a Mintlify Icon in an anchor tag. Strips default Mintlify link styling (border-bottom).
 * @aiDiscoverability none
 * @param {string} href - Link destination URL.
 * @param {string} [icon="arrow-up-right-from-square"] - Font Awesome icon name.
 * @param {number} [size=14] - Icon size in pixels.
 * @param {string} [color] - Icon colour override.
 * @param {string} [target="_blank"] - Link target.
 * @param {string} [rel="noopener noreferrer"] - Link rel attribute.
 * @param {object} [style={}] - Inline style overrides.
 * @param {string} [className=""] - CSS class name.
 */
const LinkIcon = ({
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  style = {},
  className = '',
  icon = 'arrow-up-right-from-square',
  size = 12,
  ...iconProps
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ borderBottom: 'none', textDecoration: 'none', ...style }}
    >
      <Icon icon={icon} size={size} {...iconProps} />
    </a>
  )
}

/**
 * @component AddressLinks
 * @category elements
 * @subcategory links
 * @status stable
 * @description Copyable contract address with blockchain explorer and GitHub links.
 * @aiDiscoverability none
 * @param {string} address - Contract address to display and copy.
 * @param {string} [blockchainHref] - Blockchain explorer URL (e.g. Arbiscan).
 * @param {string} [githubHref] - GitHub source URL.
 * @param {object} [style={}] - Inline style overrides.
 * @param {string} [className=""] - CSS class name.
 * @example
 * <AddressLinks address={controller} blockchainHref={`${arb}${controller}`} githubHref="https://github.com/livepeer/protocol/blob/delta/contracts/Controller.sol" />
 */
const AddressLinks = ({
  address,
  blockchainHref,
  githubHref,
  style = {},
  className = '',
  ...rest
}) => {
  return (
    <span className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', ...style }} {...rest}>
      <CopyText text={address} />
      <span style={{ display: 'flex', alignItems: 'center', gap: "var(--lp-spacing-2)", marginBottom: '0.2rem' }}>
        {blockchainHref && <LinkIcon color="var(--lp-color-text-secondary)" href={blockchainHref} />}
        {githubHref && <LinkIcon icon="github" size={14} color="var(--lp-color-text-secondary)" href={githubHref} />}
      </span>
    </span>
  )
}

/**
 * @component SocialLinks
 * @category elements
 * @subcategory links
 * @status stable
 * @description Row of icon-only social media links with tooltips and aria-labels. Pass a links array to customise per product; omit for Livepeer defaults.
 * @aiDiscoverability none
 * @param {Array} [links] - Array of {icon, href, label} objects. Falls back to Livepeer defaults if omitted.
 * @param {number} [size=20] - Icon size in pixels.
 * @param {string} [gap="0.75rem"] - Gap between icons.
 * @param {string} [justify="center"] - Flex justify-content value.
 * @param {string} [iconColor] - Override all icons to a single colour.
 * @param {string} [color] - Alias for iconColor (backwards compat).
 * @param {string} [className=""] - CSS class name.
 * @param {object} [style={}] - Inline style overrides.
 * @example
 * <SocialLinks />
 */
const SocialLinks = ({
  links,
  size = 20,
  gap = "0.75rem",
  justify = "center",
  iconColor,
  color,
  className = "",
  style = {},
  ...rest
}) => {
  const resolvedIconColor = iconColor || color;
  const linkStyle = {
    border: "none",
    borderBottom: "none",
    textDecoration: "none",
    display: "inline-flex",
  };

  const colors = {
    discord: resolvedIconColor || "var(--lp-color-brand-discord)",
    twitter: resolvedIconColor || "var(--hero-text)",
    github: resolvedIconColor || "var(--lp-color-brand-github)",
    forum: resolvedIconColor || "var(--lp-color-brand-forum)",
    website: resolvedIconColor || "var(--accent)",
    blog: resolvedIconColor || "var(--accent)",
    globe: resolvedIconColor || "var(--lp-color-brand-globe)",
    twitch: resolvedIconColor || "var(--lp-color-brand-twitch)",
    youtube: resolvedIconColor || "var(--lp-color-brand-youtube)",
    instagram: resolvedIconColor || "var(--lp-color-brand-instagram)",
    linkedin: resolvedIconColor || "var(--lp-color-brand-linkedin)",
  };

  const iconColorMap = {
    discord: "discord",
    "x-twitter": "twitter",
    github: "github",
    "comment-pen": "forum",
    "pen-line": "blog",
    "pencil-line": "blog",
    globe: "globe",
    "book-open": "website",
    twitch: "twitch",
    youtube: "youtube",
    instagram: "instagram",
    linkedin: "linkedin",
  };

  const defaultLinks = [
    { icon: "discord", href: "https://discord.com/invite/livepeer", label: "Livepeer Discord" },
    { icon: "globe", href: "https://livepeer.org", label: "Livepeer Website" },
    { icon: "github", href: "https://github.com/livepeer", label: "Livepeer GitHub" },
    { icon: "comment-pen", href: "https://forum.livepeer.org", label: "Livepeer Forum" },
    { icon: "pen-line", href: "https://livepeer.org/blog", label: "Livepeer Blog" },
    { icon: "x-twitter", href: "https://x.com/livepeer", label: "Livepeer X" },
  ];

  const items = links || defaultLinks;

  return (
    <div className={className} style={style} {...rest}>
      <style>{`
        .social-links a {
          border: none;
          border-bottom: none;
        }
      `}</style>
      <span
        className="social-links"
        style={{
          display: "flex",
          justifyContent: justify,
          gap: gap,
          marginTop: "0.5rem",
        }}
      >
        {items.map((item, i) => (
          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} style={linkStyle}>
            <Tooltip headline={item.label}>
              <Icon icon={item.icon} size={size} color={colors[iconColorMap[item.icon] || "website"] || "var(--accent)"} aria-hidden="true" />
            </Tooltip>
          </a>
        ))}
      </span>
    </div>
  );
};

export {
  DoubleIconLink,
  GotoLink,
  GotoCard,
  LinkArrow,
  LinkIcon,
  AddressLinks,
  SocialLinks,
}

