/*
 * Portal Components
 *
 * @description
 * These Components are used on the Portal pages.
 * Portal pages use mode: frame which is not correctly supported by Mintlify
 * They do this to remove the frontmatter metadata from the page in order to customise the layout.
 * mode: frame also strips all styling except for Mintlify components.
 * Use display/frameMode.jsx components for headings in frame mode pages.
 *
 * @imports: Some components require imports on the MDX page to function.
 * Example:
 * PortalHeroContent uses CustomDivider which needs to be imported on the MDX page.
 * If not imported, divider will not render.
 * import { CustomDivider } from "/snippets/components/primitives/divider.jsx";
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
const HeroSectionContainer = ({ children }) => {
  return (
    <div
      className="frame-mode-hero-full"
      style={{ height: "60vh", overflow: "hidden" }}
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
const HeroImageBackgroundComponent = ({ children = <Starfield /> }) => {
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
const HeroContentContainer = ({ children }) => {
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
const PortalContentContainer = ({ children }) => {
  return <div className="frame-mode-container">{children}</div>;
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
const PortalHeroContent = ({
  zIndex = true, //Not working currently
  title = "Portal Page",
  subtitle = "Build - Explore - Create",
  subtitleIcon = "/snippets/assets/logos/Livepeer-Logo-Symbol-Green.svg",
  description,
  refCardLink,
  titleColor = `${themeColor.dark.heroText}`, //defaults to dark mode styles
  subtitleColor = `${themeColor.dark.accent}`, //defaults to dark mode styles
  descriptionColor = `${themeColor.dark.text}`, //defaults to dark mode styles
  divider,
  children,
}) => {
  return (
    // zIndex &&
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "3rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            lineHeight: "1.2",
            margin: "2rem 0 1rem 0",
            opacity: 1,
            color:
              titleColor ||
              `var(--page-header-title-color, ${themeColor.light.heroText})`,
          }}
        >
          {title}
        </h1>
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
            {subtitleIcon && <Icon icon={subtitleIcon} size={20} />}
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
              {/* flipped icon */}
              {subtitleIcon && (
                <span
                  style={{
                    display: "inline-block",
                    transform: "scaleX(-1)",
                  }}
                >
                  <Icon icon={subtitleIcon} size={20} />
                </span>
              )}
            </h2>
          </div>
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
        <br />
        {refCardLink && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              //   width: "30%",
              //   minWidth: "200px",
              //   maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            {/* <Card /> Component */}
            {refCardLink}
          </div>
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
          {divider ? divider : <CustomDivider /> ? <CustomDivider /> : null}
          {/* <CustomDivider /> */}
        </div>
      </div>
      {/* zIndex && */}
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
const LogoHeroContainer = ({
  src = "/snippets/assets/logos/Livepeer-Logo-Full-Theme.svg",
  alt = "Livepeer Logo",
  height = "100px",
  width = "100%",
  margin = "2rem auto",
  imgHeight = "100%",
  imgWidth = "auto",
  objectFit = "contain",
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height,
        margin: margin,
        width: width,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ height: imgHeight, width: imgWidth, objectFit: objectFit }}
      />
    </div>
  );
};

const RefCardContainer = ({ children }) => {
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

// import { Starfield as HeroStarfield } from "/snippets/components/domain/SHARED/HeroGif.jsx";
// const PageHeader2 = ({
//   title,
//   subtitle,
//   description,
//   children,
//   titleColor,
//   subtitleColor,
//   descriptionColor,
// }) => {
//   return (
//     <div
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         textAlign: "center",
//         marginTop: "2rem",
//         marginBottom: "3rem",
//       }}
//     >
//       {/* Background */}
//       <HeroStarfield />

//       {/* Content */}
//       <div style={{ position: "relative", zIndex: 1 }}>
//         <h1
//           style={{
//             fontSize: "2.5rem",
//             fontWeight: "bold",
//             lineHeight: "1.2",
//             marginBottom: "1rem",
//             color: titleColor ?? themeColor.light.heroText,
//           }}
//         >
//           {title}
//         </h1>

//         {subtitle && (
//           <h2
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: "500",
//               color: subtitleColor ?? themeColor.light.accent,
//             }}
//           >
//             {subtitle}
//           </h2>
//         )}

//         {description && (
//           <h5
//             style={{
//               fontSize: "1.1rem",
//               marginTop: "1.5rem",
//               color: descriptionColor ?? themeColor.light.text,
//             }}
//           >
//             {description}
//           </h5>
//         )}

//         {children}

//         <div style={{ width: "80%", margin: "0 auto" }}>
//           <CustomDivider />
//         </div>
//       </div>
//     </div>
//   );
// };

export {
  HeroImageBackgroundComponent,
  HeroContentContainer,
  PortalContentContainer,
  PortalHeroContent,
  LogoHeroContainer,
};
