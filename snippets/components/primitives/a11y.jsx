/**
 * @component FocusableScrollRegions
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Some Mintlify-rendered containers (tab panels, KaTeX spans) use overflow scrolling
 *   but are not keyboard-focusable by default. This helper adds tabindex=0 so the scrollable region
 *   can be accessed via keyboard, satisfying WCAG expectations
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 *   v2/resources/documentation-guide/style-guide.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-03
 *
 * @param {string} selectors - Selectors used by the component.
 *
 * @example
 * <FocusableScrollRegions selectors="value" />
 */
export const FocusableScrollRegions = ({ selectors }) => {
  useEffect(() => {
    const fallbackSelectors = [
      '[data-component-part="tab-content"]',
      '.katex',
    ];
    const list =
      Array.isArray(selectors) && selectors.length > 0
        ? selectors
        : fallbackSelectors;
    list.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '0');
        }
      });
    });
  }, [selectors]);

  return null;
};
