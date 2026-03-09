import { H1, H2, H3 } from "./frame-mode.jsx";
import { CustomDivider } from "../primitives/divider.jsx";

/*
 * Portal Components
 *
 * @description
 * These Components are used on the Portal pages.
 * Portal pages use mode: frame which is not correctly supported by Mintlify
 * They do this to remove the frontmatter metadata from the page in order to customise the layout.
 * mode: frame also strips all styling except for Mintlify components.
 * Use display/frame-mode.jsx components for headings in frame mode pages.
 *
 * @imports: REQUIRED - These components require imports on the MDX page to function.
 *
 * Note: Components use CSS globals defined in style.css - no imports needed.
 *
 * PortalHeroContent uses CustomDivider which needs to be imported on the MDX page:
 * import { CustomDivider } from "/snippets/components/primitives/divider.jsx";
 *
 * If not imported, components will not render correctly.
 *
 * @author Alison Haire
 */

/*
 * Background Image Container
 *
 * @description
 * A container component for adding a background image to a portal page hero section.
 * It uses className="frame-mode-hero-full" to fill the full width of the page.
 * The image sits behind the hero header.
 *
 * @param {React.ReactNode} children:
 * Should be:
 * <ImageComponent />
 * <HeroContainer />
 * <IntroContent />
 *
 * @author Alison Haire
 */
/**
 * @component HeroSectionContainer
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Wraps the full-width portal hero section and applies the shared frame-mode hero
 *   container styling.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx,
 *   v2/gateways/gateways-portal.mdx, v2/home/mission-control.mdx, v2/lpt/token-portal.mdx,
 *   v2/orchestrators/orchestrators-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [minHeight="fit-content"] - Min Height used by the component.
 *
 * @example
 * <HeroSectionContainer>Example</HeroSectionContainer>
 */
const HeroSectionContainer = ({ children, minHeight = "fit-content" }) => {
  if (children == null) {
    console.warn("[HeroSectionContainer] Missing children");
    return null;
  }

  return (
    <div
      className="frame-mode-hero-full"
      style={{ minHeight: minHeight, marginBottom: "0.5rem" }}
    >
      {children}
      {/* <HeroImageBackgroundComponent /> */}
      {/* <HeroContainer/> */}
    </div>
  );
};

/*
 * Hero Image Background Component
 *
 * @description
 * A container component for the background of a portal page hero section.
 * The background sits behind the hero header.
 * The background is fixed and will not scroll with the page.
 * Currently a gif is generated looking like a starfield using HeroGif.jsx
 * This component should sit in a className="frame-mode-hero-full" element.
 *
 * @param {React.ReactNode} children:
 * The background image component. Defaults to <Starfield />
 * <Starfield /> is created in components/domain/SHARED/HeroGif.jsx
 *
 * @author Alison Haire
 */
/**
 * @component HeroImageBackgroundComponent
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Positions portal hero background content behind the hero header within the
 *   full-width hero shell.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx,
 *   v2/gateways/gateways-portal.mdx, v2/home/mission-control.mdx, v2/lpt/token-portal.mdx,
 *   v2/orchestrators/orchestrators-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <HeroImageBackgroundComponent>Example</HeroImageBackgroundComponent>
 */
const HeroImageBackgroundComponent = ({ children }) => {
  if (children == null) {
    console.warn("[HeroImageBackgroundComponent] Missing children");
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {children}
      {/* <Starfield /> */}
    </div>
  );
};

/*
 * Hero Container
 *
 * @description
 * A container component for the hero content of a portal page.
 * Uses className="frame-mode-container" for centering and margins.
 * The content is centered & has margins and gap set.
 *
 * @param {React.ReactNode} children:
 * The content of the hero section.
 * Should be:
 * <PortalHeroHeader />
 * <IntroContent />
 *
 * @author Alison Haire
 */
/**
 * @component HeroContentContainer
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Centers and constrains portal hero content inside the shared frame-mode container.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx,
 *   v2/gateways/gateways-portal.mdx, v2/home/mission-control.mdx, v2/lpt/token-portal.mdx,
 *   v2/orchestrators/orchestrators-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <HeroContentContainer>Example</HeroContentContainer>
 */
const HeroContentContainer = ({ children }) => {
  if (children == null) {
    console.warn("[HeroContentContainer] Missing children");
    return null;
  }

  return (
    <div
      className="frame-mode-container"
      style={{
        position: "relative",
        zIndex: 1,
        height: "100%",
        marginBottom: 0,
      }}
    >
      <div style={{ position: "relative", height: "100%" }}>{children}</div>
    </div>
  );
};

//unused
/**
 * @component HeroOverviewContent
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Displays centered portal overview content with the shared divider treatment.
 * @contentAffinity reference
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <HeroOverviewContent>Example</HeroOverviewContent>
 */
const HeroOverviewContent = ({ children }) => {
  if (children == null) {
    console.warn("[HeroOverviewContent] Missing children");
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem 0",
        width: "80%",
        margin: "0 auto",
        fontSize: "1.1rem",
        color: "var(--page-header-description-color)",
      }}
    >
          {children}
          <div style={{ paddingBottom: "2.5rem" }}> 
              <CustomDivider />
         </div>
    </div>
  );
};

/*
 * Portal Content Container
 *
 * @description
 * A container component for the portal page content.
 * Provides margins and centering for the page content.
 *
 * @param {React.ReactNode} children:
 * The content of the page.
 *
 * @author Alison Haire
 */
/**
 * @component PortalContentContainer
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Wraps portal page body content in the shared frame-mode container and vertical
 *   stack.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx,
 *   v2/gateways/gateways-portal.mdx, v2/home/mission-control.mdx, v2/lpt/token-portal.mdx,
 *   v2/orchestrators/orchestrators-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <PortalContentContainer>Example</PortalContentContainer>
 */
const PortalContentContainer = ({ children }) => {
    if (children == null) {
        console.warn("[PortalContentContainer] Missing children");
        return null;
    }

    return (
        <div className="frame-mode-container">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>   
                {children}
            </div>
        </div>
    );
};

/*
 * Portal Hero Content Component
 *
 * @description
 * A custom header component for portal pages that supports theming and optional
 * subheadings/descriptions.
 * Wraps the content in a z-index container to sit on top of the
 * background image by default - can be toggled off with zIndex=false
 *
 * @param {string} title: The title of the hero section.
 * @param {string} subtitle: The subtitle of the hero section.
 * @param {string} description: The description of the hero section.
 * @param {React.ReactNode} children: Any additional content to include in the hero section.
 * @param {string} titleColor: The color of the title text.
 * @param {string} subtitleColor: The color of the subtitle text.
 * @param {string} descriptionColor: The color of the description text.
 *
 * @author Alison Haire
 */
/**
 * @component PortalHeroContent
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Renders portal hero headings, optional subtitle icon, overview, callout, and divider
 *   content.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx,
 *   v2/gateways/gateways-portal.mdx, v2/home/mission-control.mdx, v2/lpt/token-portal.mdx,
 *   v2/orchestrators/orchestrators-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {boolean} [zIndex=true] - Z Index used by the component.
 * @param {string} [title="Portal Page"] - Title text rendered by the component.
 * @param {string} [subtitle="Build - Explore - Create"] - Subtitle text rendered by the component.
 * @param {string} [subtitleIcon="/snippets/assets/logos/Livepeer-Logo-Symbol-Green-Theme.svg"] - Icon configuration used by the component.
 * @param {React.ReactNode} description - Primary content rendered by the component.
 * @param {React.ReactNode} refCardLink - Reference card content rendered by the component.
 * @param {React.ReactNode} overview - Overview content rendered by the component.
 * @param {boolean} [divider=true] - Divider used by the component.
 * @param {string} [callout=null] - Callout used by the component.
 * @param {string} titleColor - Title color used by the component.
 * @param {string} subtitleColor - Subtitle color used by the component.
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <PortalHeroContent description="Example" refCardLink={<span>Example</span>} overview="Example" />
 */
const PortalHeroContent = ({
  zIndex = true, //Not working currently
  title = "Portal Page",
  subtitle = "Build - Explore - Create",
  subtitleIcon = "/snippets/assets/logos/Livepeer-Logo-Symbol-Green-Theme.svg",
  description,
  refCardLink,
  overview,
  divider = true,
  callout=null,
  titleColor,
  subtitleColor,
  children,
}) => {
  return (
    // zIndex &&
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <H1 align="center"
        >
          {title}
        </H1>
        {subtitle && (
          //   wrapper for icons
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {subtitleIcon && (
              <span
                style={{
                  marginRight: "0.5rem",
                }}
              >
                <Icon icon={subtitleIcon} size={20} />
              </span>
            )}
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                opacity: 1,
                color: subtitleColor || "var(--accent)",
              }}
            >
              {subtitle} {/* flipped icon */}
              {subtitleIcon && (
                <span
                  style={{
                    display: "inline-block",
                    transform: "scaleX(-1)",
                    marginLeft: "0.5rem",
                  }}
                >
                  <Icon icon={subtitleIcon} size={20} />
                </span>
              )}
            </h2>
          </div>
        )}
        {description && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem 0",
              width: "80%",
              margin: "0 auto",
              fontSize: "1.1rem",
              color: "var(--text)",
              paddingTop: "3rem",
            }}
          >
            {description}
          </div>
        )}
        {refCardLink && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content",
              margin: "0 auto",
              marginTop: "1rem",
            }}
           >
            {refCardLink}
          </div>
              )}
         <div style={{ width: "80%", margin: "0 auto", paddingBottom: "1rem" }}>
          {callout && callout}
          {divider ? <CustomDivider /> : null }
          {/* <CustomDivider /> */}
        </div>
        {overview && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem 0",
              width: "80%",
              margin: "0 auto",
              fontSize: "1.1rem",
              color: "var(--text)",
            }}
          >
            {overview}
          </div>
              )}
        <div style={{ width: "80%", margin: "0 auto", paddingTop: "1.5rem", paddingBottom: "0.1rem" }}>
          {children ? <>{children}<CustomDivider /></> :  <CustomDivider />}
        </div>
        </div>
      {/* zIndex && */}
    </div>
  );
};

/**
 * @component PortalCardsHeader
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Renders the heading block above portal card grids.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx,
 *   v2/gateways/gateways-portal.mdx, v2/home/mission-control.mdx, v2/lpt/token-portal.mdx,
 *   v2/orchestrators/orchestrators-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} title - Title text rendered by the component.
 *
 * @example
 * <PortalCardsHeader title="Example" />
 */
const PortalCardsHeader = ({ children, title }) => {
    if (!title && children == null) {
        console.warn("[PortalCardsHeader] Missing required prop: title");
        return null;
    }

    return (
    <div style={{ alignContent: "center", justifyContent: "center" }}>
        <H2 icon="signs-post" iconSize={32} >
            {title}
        </H2>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.1rem" }}>
                <span style={{ lineHeight: "1", color: "var(--text-primary)", opacity: 1, fontStyle: "italic", fontSize: "1.2rem" }}>
                    Choose Your Mission:
                </span>
                {children}
        </div>
    </div>
  );
};

/**
 * @component PortalSectionHeader
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Renders a portal section heading with an optional icon and child content.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/community/community-portal.mdx, v2/lpt/token-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} title - Title text rendered by the component.
 * @param {string} icon - Icon configuration used by the component.
 *
 * @example
 * <PortalSectionHeader title="Example" icon="sparkles" />
 */
const PortalSectionHeader = ({ children, title, icon }) => {
    if (!title && children == null) {
        console.warn("[PortalSectionHeader] Missing required prop: title");
        return null;
    }

    return (
    <div style={{ alignContent: "center", justifyContent: "center", gap: "1rem 0" }}>
        <H3 icon={icon} iconSize={32} >
            {title}
        </H3>
        {children}
    </div>
  );
};

/*
 * Logo Hero Container Component
 *
 * @description
 * A component for displaying a logo in the hero section of a portal page.
 * Has:
 * - A wrapper container for centering & constraining the image size
 * - A Centered Image with objectFit: "contain" to resize the logo.
 *
 * @param {string} src: The source of the logo image. Defaults to theme mode aware Livepeer Logo in "/snippets/assets/logos/Livepeer-Logo-Full-Theme.svg"
 * @param {string} alt: The alt text for the logo image. Defaults to "Livepeer Logo"
 * @param {string} height: The height of the logo image. Defaults to "100px".
 * @param {string} width: The width of the logo image. Defaults to "100%".
 * @param {string} margin: The margin around the logo image. Defaults to "2rem auto".
 * @param {string} imgHeight: The height of the logo image. Defaults to "100%".
 * @param {string} imgWidth: The width of the logo image. Defaults to "auto".
 * @param {string} objectFit: The object-fit property of the logo image. Defaults to "contain".
 *
 * @author Alison Haire
 */
/**
 * @component LogoHeroContainer
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Centers a portal logo image and can render child content as an anchored overlay.
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/portal.mdx, v2/community/community-portal.mdx, v2/developers/portal.mdx,
 *   v2/gateways/gateways-portal.mdx, v2/home/mission-control.mdx, v2/lpt/token-portal.mdx,
 *   v2/orchestrators/orchestrators-portal.mdx,
 *   v2/resources/documentation-guide/component-library/overview.mdx, v2/solutions/portal.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} [src="/snippets/assets/logos/Livepeer-Logo-Full-Theme.svg"] - Asset source used by the component.
 * @param {string} [alt="Livepeer Logo"] - Accessible alt text for the logo image.
 * @param {string} [width="100%"] - Width used by the component.
 * @param {string} [margin="1rem auto 0 auto"] - Margin used by the component.
 * @param {string} [imgHeight="20px"] - Img Height used by the component.
 * @param {string} [imgWidth="auto"] - Img Width used by the component.
 * @param {string} [objectFit="contain"] - Object Fit used by the component.
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <LogoHeroContainer>Example</LogoHeroContainer>
 */
const LogoHeroContainer = ({
  src = "/snippets/assets/logos/Livepeer-Logo-Full-Theme.svg",
  alt = "Livepeer Logo",
  width = "100%",
  margin = "1rem auto 0 auto",
  imgHeight = "20px",
  imgWidth = "auto",
  objectFit = "contain",
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: margin,
        width: width,
        paddingBottom: children ? "3.5rem" : "0",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={src}
          alt={alt}
          style={{ height: imgHeight, width: imgWidth, objectFit: objectFit, display: "block" }}
        />
        {children &&
          <div style={{
            position: "absolute",
            top: "100%",
            right: "0",
            fontSize: "2rem",
            color: "var(--accent)",
            fontWeight: "500",
            lineHeight: "1",
            paddingTop:"0.5rem"
          }}>
            {children}
          </div>
        }
      </div>
    </div>
  );
};

/**
 * @component RefCardContainer
 * @category page-structure
 * @tier pattern
 * @status stable
 * @description Centers vertically stacked reference card content for portal pages.
 * @contentAffinity reference
 * @owner @livepeer/docs-team
 * @dependencies HeroSectionContainer, HeroImageBackgroundComponent, HeroContentContainer,
 *   HeroOverviewContent, PortalContentContainer, PortalHeroContent, PortalCardsHeader,
 *   PortalSectionHeader, LogoHeroContainer
 * @usedIn v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <RefCardContainer>Example</RefCardContainer>
 */
const RefCardContainer = ({ children }) => {
  if (children == null) {
    console.warn("[RefCardContainer] Missing children");
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
};

export {
    HeroImageBackgroundComponent,
    HeroContentContainer,
    PortalContentContainer,
    PortalHeroContent,
    LogoHeroContainer,
    RefCardContainer,
    HeroOverviewContent,
    HeroSectionContainer,
    PortalCardsHeader,
    PortalSectionHeader
};
