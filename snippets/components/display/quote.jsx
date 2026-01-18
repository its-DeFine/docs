export const Quote = ({ children }) => {
  const quoteStyle = {
    fontSize: "1rem",
    textAlign: "center",
    opacity: 1,
    fontStyle: "italic",
    color: "var(--accent)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "1rem",
    margin: "1rem 0",
  };
  return <div style={quoteStyle}>{children}</div>;
};
