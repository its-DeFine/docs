/**
 * @component AccordionLayout
 * @category layout
 * @tier pattern
 * @status stable
 * @description Renders the accordion layout component
 * @contentAffinity concept
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/mental-model.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <AccordionLayout>Example</AccordionLayout>
 */
export const AccordionLayout = ({ children }) => {
  if (children == null) {
    console.warn("[AccordionLayout] Missing children");
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        marginTop: "0.25rem",
      }}
    >
      {children}
    </div>
  );
};
