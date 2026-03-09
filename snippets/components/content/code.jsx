
/**
 * @component CustomCodeBlock
 * @category content
 * @tier composite
 * @status stable
 * @description Displays a code block with support for placeholder replacement, pre/post notes, and
 *   expandable expected output section
 * @contentAffinity universal
 * @owner @livepeer/docs-team
 * @dependencies CodeComponent, ComplexCodeBlock
 * @usedIn v2/gateways/quickstart/gateway-setup.mdx
 *   v2/gateways/run-a-gateway/install/linux-install.mdx
 *   v2/gateways/run-a-gateway/install/windows-install.mdx
 *   v2/orchestrators/orchestrators-portal.mdx, v2/orchestrators/quickstart/orchestrator-setup.mdx
 *   v2/orchestrators/setting-up-an-orchestrator/connect-to-arbitrum.mdx
 *   v2/orchestrators/setting-up-an-orchestrator/install-go-livepeer.mdx
 *   v2/orchestrators/setting-up-an-orchestrator/orch-config.mdx
 *   v2/orchestrators/setting-up-an-orchestrator/orchestrator-stats.mdx
 *   v2/orchestrators/setting-up-an-orchestrator/setting-up-an-orchestrator/quickstart-add-your-gpu-to-livepeer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/content.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 * @breakingChangeRisk medium
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} filename - Filename used by the component.
 * @param {string} icon - Icon configuration used by the component.
 * @param {string} language - Language used by the component.
 * @param {string} highlight - Highlight used by the component.
 * @param {string} [codeString=""] - Code string used by the component.
 * @param {string} [placeholderValue=""] - Placeholder value used by the component.
 * @param {boolean} [wrap=true] - Boolean flag that controls component behaviour.
 * @param {boolean} [lines=true] - Boolean flag that controls component behaviour.
 * @param {string} [preNote=""] - Pre note used by the component.
 * @param {string} [postNote=""] - Post note used by the component.
 * @param {string} [output=""] - Output used by the component.
 *
 * @example
 * <CustomCodeBlock filename="value" icon="sparkles" language="value" />
 */
export const CustomCodeBlock = ({
  filename,
  icon,
  language,
  highlight,
  codeString = "",
  placeholderValue = "",
  wrap = true,
  lines = true,
  preNote = "",
  postNote = "",
  output = "",
}) => {
  // Return null if no codeString is provided
  if (!codeString || codeString.trim() === "") {
    return null;
  }

  const renderedCode = codeString.replace(/\{PLACEHOLDER\}/g, placeholderValue);
  // const CalloutComponent = callout?.type ? callout.type : Note;

  return (
    <>
      {preNote && (
        <div
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--muted-text)",
          }}
        >
          {preNote}
        </div>
      )}
      <CodeBlock
        filename={filename}
        icon={icon}
        language={language}
        lines
        highlight={highlight}
        wrap={wrap}
        line={lines}
      >
        {renderedCode}
      </CodeBlock>
      {postNote && (
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--muted-text)",
            fontStyle: "italic",
          }}
        >
          {postNote}
        </div>
      )}
      {output?.codeString && (
        <>
          <Expandable
            title={
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                Expected Output
              </span>
            }
          >
            <CodeBlock
              filename={output.filename || "Output Example"}
              icon={output.icon || "terminal"}
              language={output.language || "bash"}
              highlight={output.highlight}
              wrap={output.wrap || false}
              line={output.lines || false}
            >
              {output.codeString}
            </CodeBlock>
          </Expandable>
          <br />
        </>
      )}
    </>
  );
};

/**
 * CodeComponent - Simple code display with {PLACEHOLDER} replacement
 *
 * Props:
 *   - codeString: string with {PLACEHOLDER} to replace
 *   - placeholderValue: string value to insert in place of {PLACEHOLDER}
 */
/**
 * @component CodeComponent
 * @category content
 * @tier composite
 * @status stable
 * @description CodeComponent - Simple code display with {PLACEHOLDER} replacement
 * @contentAffinity how_to
 * @owner @livepeer/docs-team
 * @dependencies CodeSection, ComplexCodeBlock
 * @usedIn v2/gateways/run-a-gateway/install/linux-install.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/content.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} [filename=""] - Filename used by the component.
 * @param {string} [icon="terminal"] - Icon configuration used by the component.
 * @param {string} [language=""] - Language used by the component.
 * @param {string} [highlight=""] - Highlight used by the component.
 * @param {boolean} [expandable=false] - Boolean flag that controls component behaviour.
 * @param {boolean} [wrap=true] - Boolean flag that controls component behaviour.
 * @param {boolean} [lines=true] - Boolean flag that controls component behaviour.
 * @param {string} [codeString=""] - Code string used by the component.
 * @param {string} [placeholderValue=""] - Placeholder value used by the component.
 *
 * @example
 * <CodeComponent />
 */
export const CodeComponent = ({
  filename = "",
  icon = "terminal",
  language = "",
  highlight = "",
  expandable = false,
  wrap = true,
  lines = true,
  codeString = "",
  placeholderValue = "",
}) => {
  const renderedCode = codeString.replace(/\{PLACEHOLDER\}/g, placeholderValue);
  return (
    <CodeBlock
      filename={filename}
      icon={icon}
      language={language}
      highlight={highlight}
      expandable={expandable}
      wrap={wrap}
      lines={lines}
    >
      {renderedCode}
    </CodeBlock>
  );
};

/**
 * ComplexCodeBlock - Code block with placeholder replacement and pre/post notes
 *
 * @description
 * Similar to CustomCodeBlock but without the output section.
 * Supports placeholder replacement and optional notes before/after the code.
 *
 * @param {string} filename - Name of the file to display
 * @param {string} icon - Icon for the code block header
 * @param {string} language - Programming language for syntax highlighting
 * @param {string} highlight - Line numbers to highlight
 * @param {string} [codeString=""] - The code content
 * @param {string} [placeholderValue=""] - Value to replace {PLACEHOLDER} with
 * @param {boolean} [wrap=true] - Whether to wrap long lines
 * @param {boolean} [lines=true] - Whether to show line numbers
 * @param {React.ReactNode} [preNote=null] - Note to display before the code
 * @param {React.ReactNode} [postNote=null] - Note to display after the code
 *
 * @example
 * <ComplexCodeBlock
 *   filename="setup.sh"
 *   language="bash"
 *   codeString="export API_KEY={PLACEHOLDER}"
 *   placeholderValue="abc123"
 *   preNote="Run this command in your terminal"
 * />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component ComplexCodeBlock
 * @category content
 * @tier composite
 * @status stable
 * @description Similar to CustomCodeBlock but without the output section. Supports placeholder
 *   replacement and optional notes before/after the code
 * @contentAffinity how_to
 * @owner @livepeer/docs-team
 * @dependencies CodeSection
 * @usedIn v2/gateways/quickstart/gateway-setup.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/content.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {string} filename - Filename used by the component.
 * @param {string} icon - Icon configuration used by the component.
 * @param {string} language - Language used by the component.
 * @param {string} highlight - Highlight used by the component.
 * @param {string} [codeString=""] - Code string used by the component.
 * @param {string} [placeholderValue=""] - Placeholder value used by the component.
 * @param {boolean} [wrap=true] - Boolean flag that controls component behaviour.
 * @param {boolean} [lines=true] - Boolean flag that controls component behaviour.
 * @param {string} [preNote=null] - Pre note used by the component.
 * @param {string} [postNote=null] - Post note used by the component.
 *
 * @example
 * <ComplexCodeBlock filename="value" icon="sparkles" language="value" />
 */
export const ComplexCodeBlock = ({
  filename,
  icon,
  language,
  highlight,
  codeString = "",
  placeholderValue = "",
  wrap = true,
  lines = true,
  preNote = null,
  postNote = null,
}) => {
  // Return null if no codeString is provided
  if (!codeString || codeString.trim() === "") {
    return null;
  }

  const renderedCode = codeString.replace(/\{PLACEHOLDER\}/g, placeholderValue);

  return (
    <>
      {preNote && (
        <div
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--muted-text)",
          }}
        >
          {preNote}
        </div>
      )}
      <CodeBlock
        filename={filename}
        icon={icon}
        language={language}
        lines
        highlight={highlight}
        wrap={wrap}
        line={lines}
      >
        {renderedCode}
      </CodeBlock>
      {postNote && (
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--muted-text)",
          }}
        >
          {postNote}
        </div>
      )}
    </>
  );
};

/**
 * CodeSection - Wrapper component for ComplexCodeBlock
 *
 * @description
 * Convenience wrapper that accepts a fields object and spreads it to ComplexCodeBlock.
 * Useful for passing configuration objects.
 *
 * @param {Object} [fields={}] - Object containing all ComplexCodeBlock props
 *
 * @example
 * const codeConfig = {
 *   filename: "app.js",
 *   language: "javascript",
 *   codeString: "console.log('Hello');"
 * };
 * <CodeSection fields={codeConfig} />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component CodeSection
 * @category content
 * @tier pattern
 * @status stable
 * @description Convenience wrapper that accepts a fields object and spreads it to ComplexCodeBlock.
 *   Useful for passing configuration objects
 * @contentAffinity how_to
 * @owner @livepeer/docs-team
 * @dependencies ComplexCodeBlock
 * @usedIn v2/gateways/quickstart/gateway-setup.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/content.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {object} [fields={}] - Fields used by the component.
 *
 * @example
 * <CodeSection />
 */
export const CodeSection = ({ fields = {} }) => {
  return <ComplexCodeBlock {...fields} />;
};
