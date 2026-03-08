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
