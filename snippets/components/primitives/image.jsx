/**
 * @component Image
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays an image within a Frame component with optional caption and hint. Supports
 *   full-width or auto-width display
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies LinkImage
 * @usedIn v2/about/livepeer-protocol/technical-architecture.mdx
 *   v2/about/resources/blockchain-contracts.mdx
 *   v2/community/livepeer-community/community-guidelines.mdx, v2/home/about-livepeer/benefits.mdx
 *   v2/home/about-livepeer/evolution.mdx, v2/home/about-livepeer/vision.mdx, v2/home/primer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/display.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/x-deprecated/about-livepeer/moved/livepeer-overview.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} src - Asset or embed source used by the component.
 * @param {string} alt - Alt used by the component.
 * @param {React.ReactNode} caption - Caption text rendered by the component.
 * @param {string} icon - Icon configuration used by the component.
 * @param {string} hint - Hint used by the component.
 * @param {boolean} [fullwidth=true] - Boolean flag that controls component behaviour.
 *
 * @example
 * <Image src="https://example.com" alt="value" caption="Example" />
 */
export const Image = ({ src, alt, caption, icon, hint, fullwidth = true }) => {
  icon = icon ? icon : "arrow-turn-down-right";
  return (
    <Frame caption={caption} hint={hint}>
      <img
        src={src}
        alt={alt}
        style={{ width: fullwidth ? "100%" : undefined }}
      />
    </Frame>
  );
};

/**
 * LinkImage - Clickable image that opens in a new tab
 *
 * @description
 * Displays an image within a Frame component that links to a URL.
 * Opens the link in a new tab when clicked.
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} [caption] - Optional caption to display below the image
 * @param {string} [icon] - Icon name (currently unused in implementation)
 * @param {string} [hint] - Optional hint text
 * @param {string} href - URL to navigate to when image is clicked
 *
 * @example
 * <LinkImage
 *   src="/images/preview.png"
 *   alt="Full diagram"
 *   href="/images/full-diagram.png"
 *   caption="Click to view full size"
 * />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component LinkImage
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Displays an image within a Frame component that links to a URL. Opens the link in a
 *   new tab when clicked
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/display.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} src - Asset or embed source used by the component.
 * @param {string} alt - Alt used by the component.
 * @param {React.ReactNode} caption - Caption text rendered by the component.
 * @param {string} icon - Icon configuration used by the component.
 * @param {string} hint - Hint used by the component.
 * @param {string} href - Destination URL used by the component.
 *
 * @example
 * <LinkImage src="https://example.com" alt="value" caption="Example" />
 */
export const LinkImage = ({ src, alt, caption, icon, hint, href }) => {
  icon = icon ? icon : "arrow-turn-down-right";
  return (
    <a href={href} target="_blank">
      <Frame caption={caption} hint={hint}>
        <img src={src} alt={alt} style={{ width: "100%" }} />
      </Frame>
    </a>
  );
};

// <Frame>
//   <img
//     src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjgxanlyczB0NW05M2xlYWEwdDg1N20zanowNGxmdzNnbWZ2bHQwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ae7SI3LoPYj8Q/giphy.gif"
//     alt="Livepeer Community GIF"
//   />
// </Frame>
