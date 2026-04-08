import { CopyText } from '/snippets/components/elements/text/Text.jsx'

<<<<<<< HEAD
// Re-exports for consumers that import these from Links.jsx
export { BlinkingIcon } from '/snippets/components/elements/icons/Icons.jsx';
export { CustomCallout, TipWithArrow } from '/snippets/components/elements/callouts/Callouts.jsx';
=======
/**
 * @component CustomCallout
 * @category elements
 * @subcategory links
 * @status stable
 * @description Styled callout box with icon, custom colour, and child content.
 * @aiDiscoverability none
 * @param {React.ReactNode} children - Content to display in the callout
 * @param {string} [icon="lightbulb"] - Icon name to display
 * @param {string} color - Primary color for icon, border, and background (defaults to theme accent)
 * @param {number} [iconSize=16] - Size of the icon in pixels
 * @param {string} [textSize="0.875rem"] - Font size for the text content
 * @param {string} textColor - Text color (defaults to match icon color)
 * @example
 * <CustomCallout color="example" textColor="example">Example content</CustomCallout>
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
const CustomCallout = ({
  children,
  icon = 'lightbulb',
  color,
  iconSize = 16,
  textSize = '0.875rem',
  textColor,
  className = '',
  style = {},
  ...rest
}) => {
  // Use theme accent if no color specified
  const resolvedColor = color || 'var(--lp-color-accent)'
  const resolvedTextColor = textColor || resolvedColor

  // Convert hex to rgba for proper opacity
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px 20px',
        borderRadius: '16px',
        border: `1px solid ${hexToRgba(resolvedColor, 0.2)}`,
        backgroundColor: hexToRgba(resolvedColor, 0.1),
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div style={{ marginTop: '2px', width: iconSize, flexShrink: 0 }}>
        <Icon icon={icon} size={iconSize} color={resolvedColor} />
      </div>
      <div
        style={{
          fontSize: textSize,
          color: resolvedTextColor,
          minWidth: 0,
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * @component BlinkingIcon
 * @category elements
 * @subcategory links
 * @status stable
 * @description Animated icon with pulsing opacity. Respects prefers-reduced-motion.
 * @aiDiscoverability none
 * @param {string} [icon="terminal"] - Icon name to display
 * @param {number} [size=16] - Size of the icon in pixels
 * @param {string} color - Color of the icon (defaults to theme accent)
 * @example
 * <BlinkingIcon color="example" />
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
const BlinkingIcon = ({
  icon = 'terminal',
  size = 16,
  color,
  className = '',
  style = {},
  ...rest
}) => {
  const resolvedColor = color || 'var(--lp-color-accent)'
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', ...style }}
      {...rest}
    >
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
      <span
        style={{
          display: 'inline-flex',
          animation: 'blink 3s ease-in-out infinite',
        }}
      >
        <Icon icon={icon} size={size} color={resolvedColor} />
      </span>
    </span>
  )
}

/**
 * @component BlinkingTerminal
 * @category elements
 * @subcategory links
 * @status stable
 * @description Preset blinking terminal icon (alias for BlinkingIcon with terminal defaults).
 * @aiDiscoverability none
 * @example
 * <BlinkingTerminal />
 */
const BlinkingTerminal = BlinkingIcon
>>>>>>> docs-v2-dev

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
<<<<<<< HEAD
=======
 * @component TipWithArrow
 * @category elements
 * @subcategory links
 * @status stable
 * @description Callout box with tip icon and corner arrow indicator.
 * @aiDiscoverability none
 * @param {React.ReactNode} children - Content to display in the tip
 * @param {string} [icon="lightbulb"] - Main icon to display on the left
 * @param {string} [arrowIcon="arrow-up-right"] - Arrow icon to display in top-right
 * @param {string} color - Primary color for icons, border, and background (defaults to theme accent)
 * @param {number} [iconSize=16] - Size of the main icon in pixels
 * @param {number} [arrowSize=16] - Size of the arrow icon in pixels
 * @example
 * <TipWithArrow color="example">Example content</TipWithArrow>
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}] - Optional inline style override.
 */
const TipWithArrow = ({
  children,
  icon = 'lightbulb',
  arrowIcon = 'arrow-up-right',
  color,
  iconSize = 16,
  arrowSize = 16,
  className = '',
  style = {},
  ...rest
}) => {
  // Use theme accent if no color specified
  const resolvedColor = color || 'var(--lp-color-accent)'

  // Convert hex to rgba for proper opacity
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px 20px',
        paddingRight: '48px', // Extra space for the arrow
        borderRadius: '16px',
        border: `1px solid ${hexToRgba(resolvedColor, 0.2)}`,
        backgroundColor: hexToRgba(resolvedColor, 0.1),
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div style={{ marginTop: '2px', width: iconSize, flexShrink: 0 }}>
        <Icon icon={icon} size={iconSize} color={resolvedColor} />
      </div>
      <div
        style={{
          fontSize: '0.875rem',
          color: resolvedColor,
          minWidth: 0,
          width: '100%',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          opacity: 0.6,
        }}
      >
        <Icon icon={arrowIcon} size={arrowSize} color={resolvedColor} />
      </div>
    </div>
  )
}

/**
>>>>>>> docs-v2-dev
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

