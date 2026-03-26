/**
 * @component SolutionItem
 * @type wrappers
 * @subniche custom
 * @status stable
 * @description Renders a solution entry with link, icon badges, and description. Designed for solution listing pages.
 * @accepts style, className
 * @aiDiscoverability props-extracted
 * @param {React.ReactNode} link - Link element (e.g. <LinkArrow />), rendered as the heading
 * @param {React.ReactNode} [iconWrapper=null] - Icon badges element (e.g. <IconBadgeWrapper />)
 * @param {React.ReactNode} [description=null] - Description text or element
 * @param {boolean} [divider=true] - Show bottom border divider
 * @param {string} [className=""] - CSS class name
 * @param {object} [style={}] - Inline style overrides
 * @example
 * <SolutionItem
 *   link={<LinkArrow href="https://daydream.live" label="Daydream" />}
 *   iconWrapper={<IconBadgeWrapper items={daydreamInfra} iconColor="var(--accent)" size={12} />}
 *   description="Real-time AI video, world models"
 *   divider={true}
 * />
 */
export const SolutionItem = ({
  link,
  iconWrapper = null,
  description = null,
  divider = true,
  className = "",
  style = {},
  ...rest
}) => {
  return (
    <div
      className={className}
      style={{
        paddingBottom: divider ? "0.75rem" : "0.25rem",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        {link}
        {iconWrapper}
      </div>
      {description && (
        <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
          {description}
        </div>
      )}
      {divider && (
        <div style={{ marginTop: "0.75rem", borderBottom: "1px solid var(--border)" }} />
      )}
    </div>
  );
};
