/**
 * Frame Mode Headers - Custom heading components for Mintlify frame mode
 *
 * @description
 * These components provide styled headings (H1-H6) that work properly in Mintlify's
 * frame mode where default markdown headings may not render correctly.
 *
 * All components support optional icons at the beginning of the heading.
 *
 * @note Icon is a Mintlify global component - no import needed
 *
 * @author Alison Haire
 */

/**
 * H1 - Custom H1 heading component for frame mode
 *
 * @param {string} children - The heading text
 * @param {string} icon - Optional icon name (e.g., "rocket", "signs-post")
 * @param {number} iconSize - Size of the icon (default: 32)
 * @param {string} iconColor - Color of the icon (default: "#2b9a66")
 * @param {string} align - Text alignment: "left", "center", "right" (default: "left")
 * @param {string} gap - Gap between icon and text (default: "0.75rem")
 *
 * @example
 * <H1>Simple Heading</H1>
 * <H1 icon="rocket" iconColor="#ff0000">Heading with Icon</H1>
 * <H1 icon="signs-post" align="center">Centered with Icon</H1>
 */

const PageHeader = ({
  title,
  subtitle,
  description,
  children,
  titleColor,
  subtitleColor,
  descriptionColor,
}) => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "2rem", marginBottom: "3rem" }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          lineHeight: "1.2",
          marginBottom: "1rem",
          opacity: 1,
          color:
            titleColor ||
            `var(--page-header-title-color, ${themeColor.light.heroText})`,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "500",
            opacity: 1,
            color:
              subtitleColor ||
              `var(--page-header-subtitle-color, ${themeColor.light.accent})`,
          }}
        >
          {subtitle}
        </h2>
      )}
      {description && (
        <h5
          style={{
            fontSize: "1.1rem",
            marginTop: "1.5rem",
            // maxWidth: "800px",
            // margin: "1.5rem auto 0",
            opacity: 1,
            color: descriptionColor || null,
          }}
        >
          {description}
        </h5>
      )}
      <style>{`
        :root {
          --page-header-title-color: ${themeColor.light.heroText};
          --page-header-subtitle-color: ${themeColor.light.accent};
          --page-header-description-color: ${themeColor.light.text};
        }
        .dark {
          --page-header-title-color: ${themeColor.dark.heroText};
          --page-header-subtitle-color: ${themeColor.dark.accent};
          --page-header-description-color: ${themeColor.dark.text};
        }
      `}</style>
      {children}
      <div style={{ width: "80%", margin: "0 auto" }}>
        <CustomDivider />
      </div>
    </div>
  );
};

const H1 = ({
  children,
  icon,
  iconSize = 32,
  iconColor = "#2b9a66",
  align = "left",
  gap = "0.75rem",
}) => {
  const containerStyle = {
    display: icon ? "flex" : "block",
    alignItems: "center",
    gap: icon ? gap : 0,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
          ? "flex-end"
          : "flex-start",
    textAlign: align,
    marginBottom: "1rem",
  };

  const headingStyle = {
    margin: 0,
    fontSize: "2.5rem",
    fontWeight: "bold",
    lineHeight: "1.2",
    color: "var(--text-primary, #fff)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
      <h1 style={headingStyle}>{children}</h1>
    </div>
  );
};

/**
 * H2 - Custom H2 heading component for frame mode
 *
 * @param {string} children - The heading text
 * @param {string} icon - Optional icon name
 * @param {number} iconSize - Size of the icon (default: 28)
 * @param {string} iconColor - Color of the icon (default: "#2b9a66")
 * @param {string} align - Text alignment: "left", "center", "right" (default: "left")
 * @param {string} gap - Gap between icon and text (default: "0.75rem")
 */
const H2 = ({
  children,
  icon,
  iconSize = 28,
  iconColor = "#2b9a66",
  align = "left",
  gap = "0.75rem",
}) => {
  const containerStyle = {
    display: icon ? "flex" : "block",
    alignItems: "center",
    gap: icon ? gap : 0,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
          ? "flex-end"
          : "flex-start",
    textAlign: align,
    marginBottom: "1rem",
  };

  const headingStyle = {
    margin: 0,
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "var(--text-primary, #fff)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
      <h2 style={headingStyle}>{children}</h2>
    </div>
  );
};

/**
 * H3 - Custom H3 heading component for frame mode
 *
 * @param {string} children - The heading text
 * @param {string} icon - Optional icon name
 * @param {number} iconSize - Size of the icon (default: 24)
 * @param {string} iconColor - Color of the icon (default: "#2b9a66")
 * @param {string} align - Text alignment: "left", "center", "right" (default: "left")
 * @param {string} gap - Gap between icon and text (default: "0.5rem")
 */
const H3 = ({
  children,
  icon,
  iconSize = 24,
  iconColor = "#2b9a66",
  align = "left",
  gap = "0.5rem",
}) => {
  const containerStyle = {
    display: icon ? "flex" : "block",
    alignItems: "center",
    gap: icon ? gap : 0,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
          ? "flex-end"
          : "flex-start",
    textAlign: align,
    marginBottom: "0.75rem",
  };

  const headingStyle = {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "var(--text-primary, #fff)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
      <h3 style={headingStyle}>{children}</h3>
    </div>
  );
};

/**
 * H4 - Custom H4 heading component for frame mode
 *
 * @param {string} children - The heading text
 * @param {string} icon - Optional icon name
 * @param {number} iconSize - Size of the icon (default: 20)
 * @param {string} iconColor - Color of the icon (default: "#2b9a66")
 * @param {string} align - Text alignment: "left", "center", "right" (default: "left")
 * @param {string} gap - Gap between icon and text (default: "0.5rem")
 */
const H4 = ({
  children,
  icon,
  iconSize = 20,
  iconColor = "#2b9a66",
  align = "left",
  gap = "0.5rem",
}) => {
  const containerStyle = {
    display: icon ? "flex" : "block",
    alignItems: "center",
    gap: icon ? gap : 0,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
          ? "flex-end"
          : "flex-start",
    textAlign: align,
    marginBottom: "0.75rem",
  };

  const headingStyle = {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "var(--text-primary, #fff)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
      <h4 style={headingStyle}>{children}</h4>
    </div>
  );
};

/**
 * H5 - Custom H5 heading component for frame mode
 *
 * @param {string} children - The heading text
 * @param {string} icon - Optional icon name
 * @param {number} iconSize - Size of the icon (default: 18)
 * @param {string} iconColor - Color of the icon (default: "#2b9a66")
 * @param {string} align - Text alignment: "left", "center", "right" (default: "left")
 * @param {string} gap - Gap between icon and text (default: "0.5rem")
 */
const H5 = ({
  children,
  icon,
  iconSize = 18,
  iconColor = "#2b9a66",
  align = "left",
  gap = "0.5rem",
}) => {
  const containerStyle = {
    display: icon ? "flex" : "block",
    alignItems: "center",
    gap: icon ? gap : 0,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
          ? "flex-end"
          : "flex-start",
    textAlign: align,
    marginBottom: "0.5rem",
  };

  const headingStyle = {
    margin: 0,
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "var(--text-primary, #fff)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
      <h5 style={headingStyle}>{children}</h5>
    </div>
  );
};

/**
 * H6 - Custom H6 heading component for frame mode
 *
 * @param {string} children - The heading text
 * @param {string} icon - Optional icon name
 * @param {number} iconSize - Size of the icon (default: 16)
 * @param {string} iconColor - Color of the icon (default: "#2b9a66")
 * @param {string} align - Text alignment: "left", "center", "right" (default: "left")
 * @param {string} gap - Gap between icon and text (default: "0.5rem")
 */
const H6 = ({
  children,
  icon,
  iconSize = 16,
  iconColor = "#2b9a66",
  align = "left",
  gap = "0.5rem",
}) => {
  const containerStyle = {
    display: icon ? "flex" : "block",
    alignItems: "center",
    gap: icon ? gap : 0,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
          ? "flex-end"
          : "flex-start",
    textAlign: align,
    marginBottom: "0.5rem",
  };

  const headingStyle = {
    margin: 0,
    fontSize: "1rem",
    fontWeight: "bold",
    color: "var(--text-primary, #fff)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
      <h6 style={headingStyle}>{children}</h6>
    </div>
  );
};

/**
 * P - Custom paragraph component for frame mode
 *
 * @param {string} children - The paragraph text
 * @param {string} icon - Optional icon name
 * @param {number} iconSize - Size of the icon (default: 16)
 * @param {string} iconColor - Color of the icon (default: "#2b9a66")
 * @param {string} align - Text alignment: "left", "center", "right" (default: "left")
 * @param {string} gap - Gap between icon and text (default: "0.5rem")
 *
 * @example
 * <P>Simple paragraph</P>
 * <P icon="info-circle">Paragraph with icon</P>
 * <P icon="check" iconColor="#00ff00" align="center">Centered with icon</P>
 */
const P = ({
  children,
  icon,
  iconSize = 16,
  iconColor = "#2b9a66",
  align = "left",
  gap = "0.5rem",
}) => {
  const containerStyle = {
    display: icon ? "flex" : "block",
    alignItems: "center",
    gap: icon ? gap : 0,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
          ? "flex-end"
          : "flex-start",
    textAlign: align,
  };

  const paragraphStyle = {
    margin: 0,
    color: "var(--text-primary, #fff)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
      <p style={paragraphStyle}>{children}</p>
    </div>
  );
};

/**
 * Divider - Horizontal divider line for frame mode
 *
 * @description
 * Renders a horizontal rule (---) with proper styling for frame mode.
 * Uses the default border color that works in both light and dark themes.
 *
 * @param {string} color - Custom color for the divider (optional)
 * @param {string} margin - Vertical margin (default: "1.5rem 0")
 * @param {string} opacity - Opacity of the divider (default: 0.2)
 *
 * @example
 * <Divider />
 * <Divider color="#2b9a66" />
 * <Divider margin="2rem 0" opacity={0.5} />
 */
const Divider = ({ color, margin = "1.5rem 0", opacity = 0.2 }) => {
  return (
    <hr
      style={{
        border: "none",
        borderTop: `1px solid ${color || "var(--border-color, #e5e7eb)"}`,
        margin: margin,
        opacity: opacity,
      }}
    />
  );
};

export { PageHeader, H1, H2, H3, H4, H5, H6, P, Divider };
