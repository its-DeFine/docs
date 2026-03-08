/**
 * Spacer - Vertical or horizontal spacing component
 *
 * @description
 * Provides consistent spacing without requiring inline styles or empty divs in MDX files.
 *
 * @param {string} [size="1rem"] - Spacing size (CSS value)
 * @param {string} [direction="vertical"] - Spacing direction: "vertical" | "horizontal"
 *
 * @example
 * <Card>Content 1</Card>
 * <Spacer size="2rem" />
 * <Card>Content 2</Card>
 *
 * @author Livepeer Documentation Team
 */
export const Spacer = ({ size = "1rem", direction = "vertical" }) => {
  return (
    <div
      style={{
        ...(direction === "vertical"
          ? { height: size, width: "100%" }
          : { width: size, height: "100%" }),
      }}
    />
  );
};
