/**
 * @component Subtitle
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Renders the subtitle component
 * @contentAffinity concept
 * @owner @livepeer/docs-team
 * @dependencies CopyText
 * @usedIn v2/about/mental-model.mdx, v2/about/resources/blockchain-contracts.mdx
 *   v2/home/solutions/showcase.mdx, v2/home/solutions/verticals.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {object} [style={}] - Style used by the component.
 * @param {React.ReactNode} text - Primary content rendered by the component.
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <Subtitle text="Example" />
 */
export const Subtitle = ({ style = {}, text, children }) => {
  if (text == null && children == null) {
    console.warn("[Subtitle] Missing required prop: text");
    return null;
  }

  return (
    <>
      <span
        style={{
          fontSize: style.fontSize ? style.fontSize : "1rem",
          fontStyle: style.fontStyle ? style.fontStyle : "italic",
          color: style.color ? style.color : "var(--accent)",
          marginBottom: style.marginBottom ? style.marginBottom : 0,
          ...style,
        }}
      >
        {text}
        {children}
      </span>
    </>
  );
};

/**
 * CopyText - Inline code with copy button
 * @param {string} text - The text to display and copy
 * @param {string} [label] - Optional label before the text
 */
/**
 * @component CopyText
 * @category primitives
 * @tier primitive
 * @status stable
 * @description CopyText - Inline code with copy button
 * @contentAffinity concept
 * @owner @livepeer/docs-team
 * @dependencies AccordionTitleWithArrow, CardTitleTextWithArrow
 * @usedIn v2/about/resources/blockchain-contracts.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} text - Primary content rendered by the component.
 * @param {React.ReactNode} label - Label text rendered by the component.
 *
 * @example
 * <CopyText text="Example" label="Example" />
 */
export const CopyText = ({ text, label }) => {
  if (typeof text !== "string" || text.length === 0) {
    console.warn("[CopyText] Missing required prop: text");
    return null;
  }

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
    >
      {label && <strong>{label}</strong>}
      <code
        style={{
          padding: "0.2rem 0.4rem",
          borderRadius: "4px",
          fontSize: "0.85rem",
          fontFamily: "monospace",
          backgroundColor: "var(--card-background)",
          border: "1px solid var(--border)",
        }}
      >
        {text}
      </code>
      <button
        onClick={handleCopy}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.25rem",
          display: "inline-flex",
          alignItems: "center",
          color: "var(--text)",
        }}
        title="Copy to clipboard"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </span>
  );
};

/**
 * @component CardTitleTextWithArrow
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Renders the card title text with arrow component
 * @contentAffinity concept
 * @owner @livepeer/docs-team
 * @dependencies AccordionTitleWithArrow
 * @usedIn v2/about/livepeer-protocol/core-mechanisms.mdx
 *   v2/about/livepeer-protocol/governance-model.mdx, v2/about/livepeer-protocol/livepeer-token.mdx
 *   v2/about/livepeer-protocol/overview.mdx, v2/about/livepeer-protocol/technical-architecture.mdx
 *   v2/about/livepeer-protocol/treasury.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} children - Content rendered inside the component.
 *
 * @example
 * <CardTitleTextWithArrow>Example</CardTitleTextWithArrow>
 */
export const CardTitleTextWithArrow = ({ children, ...cardProps }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "fit-content",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "-1rem",
      }}
    >
      <Card
        arrow={false}
        title={
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            {children}{" "}
            <span style={{ margin: "0 -1rem 0.2rem 0.75rem" }}>
              <Icon icon="arrow-up-right" size={16} color="var(--text)" />
            </span>
          </span>
        }
        {...cardProps}
      />
    </div>
  );
  // return (
  //   <span
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     {" "}
  //     {children}{" "}
  //     <span style={{ margin: "0 -1rem 0.2rem 0.75rem" }}>
  //       <Icon icon="arrow-up-right" size={16} color="var(--text)" />
  //     </span>
  //   </span>
  // );
};

/**
 * @component AccordionTitleWithArrow
 * @category primitives
 * @tier primitive
 * @status stable
 * @description Renders the accordion title with arrow component
 * @contentAffinity concept
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/about/livepeer-protocol/core-mechanisms.mdx
 *   v2/about/livepeer-protocol/governance-model.mdx, v2/about/livepeer-protocol/livepeer-token.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/component-library/primitives.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {React.ReactNode} text - Primary content rendered by the component.
 * @param {React.ReactNode} children - Content rendered inside the component.
 * @param {string} [color="var(--text)"] - Color used by the component.
 *
 * @example
 * <AccordionTitleWithArrow text="Example" />
 */
export const AccordionTitleWithArrow = ({
  text,
  children,
  color = "var(--text)",
}) => {
  const label = text ?? children;
  if (label == null) {
    console.warn("[AccordionTitleWithArrow] Missing required prop: text");
    return null;
  }

  return (
    <span
      style={{
        justifyContent: "center",
        alignContent: "center",
        color: color,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.25rem 0",
        minHeight: 44,
      }}
    >
      {label}
      <span style={{ alignSelf: "flex-end" }}>
        <Icon icon="arrow-up-right" size={14} color="var(--text)" />
      </span>
    </span>
  );
};
