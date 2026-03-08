import { GotoLink } from "/snippets/components/primitives/links.jsx";

/**
 * @component BasicList
 * @category layout
 * @tier pattern
 * @status stable
 * @description Placeholder component for basic list functionality. Currently returns empty fragment
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies IconList
 * @usedIn v2/home/primer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {Array} listItems - Collection data rendered by the component.
 *
 * @example
 * <BasicList listItems={[]} />
 */
export const BasicList = ({ listItems: array }) => {
  return <></>;
};

/**
 * IconList - A list component with icons (placeholder)
 *
 * @description
 * Placeholder component for icon list functionality. Currently returns empty fragment.
 *
 * @param {Array} listItems - Array of list items with icons
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component IconList
 * @category layout
 * @tier pattern
 * @status stable
 * @description Placeholder component for icon list functionality. Currently returns empty fragment
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies StepLinkList, StepList
 * @usedIn v2/home/primer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {Array} listItems - Collection data rendered by the component.
 *
 * @example
 * <IconList listItems={[]} />
 */
export const IconList = ({ listItems: array }) => {
  return <></>;
};

/**
 * StepList - Renders a list of items as Steps
 *
 * @description
 * Displays an array of items using the Steps/Step components.
 * Each item includes a title, optional icon, and content.
 *
 * @param {Array<Object>} listItems - Array of step objects
 * @param {string} listItems[].title - Step title
 * @param {string} [listItems[].icon] - Optional icon name
 * @param {React.ReactNode} listItems[].content - Step content
 *
 * @example
 * const steps = [
 *   { title: "Install", icon: "download", content: "Run npm install" },
 *   { title: "Configure", icon: "gear", content: "Set up your config" }
 * ];
 * <StepList listItems={steps} />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component StepList
 * @category layout
 * @tier pattern
 * @status stable
 * @description Displays an array of items using the Steps/Step components. Each item includes a
 *   title, optional icon, and content
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies StepLinkList, UpdateList
 * @usedIn v2/home/primer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 *   v2/resources/documentation-guide/snippets-inventory.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {Array} listItems - Collection data rendered by the component.
 *
 * @example
 * <StepList listItems={[]} />
 */
export const StepList = ({ listItems }) => {
  const safeItems = Array.isArray(listItems) ? listItems : [];
  if (safeItems.length === 0) {
    return null;
  }

  return (
    <Steps>
      {safeItems.map(({ title, icon, content }, idx) => (
        <Step key={idx} title={title} icon={icon}>
          {content}
        </Step>
      ))}
    </Steps>
  );
};

/**
 * StepLinkList - Renders a list of steps with navigation links
 *
 * @description
 * Similar to StepList but each step contains a GotoLink component for navigation.
 *
 * @param {Array<Object>} listItems - Array of step objects with links
 * @param {string} listItems[].title - Step title
 * @param {string} [listItems[].icon] - Optional icon name
 * @param {string} listItems[].content - Link label text
 * @param {string} listItems[].link - Relative path for the link
 *
 * @example
 * const steps = [
 *   { title: "Getting Started", icon: "rocket", content: "Start Here", link: "/guides/start" },
 *   { title: "Advanced", icon: "star", content: "Learn More", link: "/guides/advanced" }
 * ];
 * <StepLinkList listItems={steps} />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component StepLinkList
 * @category layout
 * @tier pattern
 * @status stable
 * @description Similar to StepList but each step contains a GotoLink component for navigation
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies UpdateList
 * @usedIn v2/home/primer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {Array} listItems - Collection data rendered by the component.
 *
 * @example
 * <StepLinkList listItems={[]} />
 */
export const StepLinkList = ({ listItems }) => {
  const safeItems = Array.isArray(listItems) ? listItems : [];
  if (safeItems.length === 0) {
    console.warn("[StepLinkList] Missing or invalid listItems");
    return null;
  }

  return (
    <Steps>
      {safeItems.map(({ title, icon, content, link }, idx) => (
        <Step key={idx} title={title} icon={icon}>
          <GotoLink label={content} relativePath={link} />
        </Step>
      ))}
    </Steps>
  );
};

/**
 * UpdateList - Displays an update/announcement list (placeholder)
 *
 * @description
 * Placeholder component for displaying updates. Currently shows hardcoded content.
 *
 * @param {Array} listItems - Array of update items
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component UpdateList
 * @category layout
 * @tier pattern
 * @status stable
 * @description Placeholder component for displaying updates. Currently shows hardcoded content
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies UpdateLinkList
 * @usedIn v2/home/primer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {Array} listItems - Collection data rendered by the component.
 *
 * @example
 * <UpdateList listItems={[]} />
 */
export const UpdateList = ({ listItems: array }) => {
  const safeItems = Array.isArray(array) ? array : [];
  if (safeItems.length === 0) {
    console.warn("[UpdateList] Missing or invalid listItems");
    return null;
  }

  return (
    <>
      {safeItems.map(({ title, content, link, icon }, idx) => (
        <Update key={title || idx} label={title || "Update"}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {content}
            {link ? (
              <GotoLink
                label={title || "Learn more"}
                relativePath={link}
                icon={icon || "arrow-turn-down-right"}
              />
            ) : null}
          </div>
        </Update>
      ))}
    </>
  );
};

/**
 * UpdateLinkList - Renders a list of updates with links
 *
 * @description
 * Displays multiple Update components, each with a title, content, and navigation link.
 *
 * @param {Array<Object>} listItems - Array of update objects
 * @param {string} listItems[].title - Update title/label
 * @param {string} [listItems[].icon] - Optional icon for the link
 * @param {React.ReactNode} listItems[].content - Update content
 * @param {string} listItems[].link - Relative path for the link
 *
 * @example
 * const updates = [
 *   { title: "New Feature", icon: "star", content: "Check out our new feature", link: "/features/new" },
 *   { title: "Bug Fix", icon: "bug", content: "Important bug fix", link: "/changelog" }
 * ];
 * <UpdateLinkList listItems={updates} />
 *
 * @author Livepeer Documentation Team
 */
/**
 * @component UpdateLinkList
 * @category layout
 * @tier pattern
 * @status stable
 * @description Displays multiple Update components, each with a title, content, and navigation link
 * @contentAffinity landing
 * @owner @livepeer/docs-team
 * @dependencies none
 * @usedIn v2/home/primer.mdx
 *   v2/resources/documentation-guide/component-library/component-library.mdx
 *   v2/resources/documentation-guide/component-library/layout.mdx
 *   v2/resources/documentation-guide/component-library/overview.mdx
 * @breakingChangeRisk low
 * @decision KEEP
 * @dataSource none
 * @duplicates none
 * @lastMeaningfulChange 2026-03-08
 *
 * @param {Array} listItems - Collection data rendered by the component.
 *
 * @example
 * <UpdateLinkList listItems={[]} />
 */
export const UpdateLinkList = ({ listItems: array }) => {
  const safeItems = Array.isArray(array) ? array : [];
  if (safeItems.length === 0) {
    return null;
  }

  return (
    <>
      {safeItems.map(({ title, icon, content, link }, idx) => (
        <Update key={idx} label={title}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {content}
            <GotoLink label={title} relativePath={link} icon={icon} />
          </div>
        </Update>
      ))}
    </>
  );
};
