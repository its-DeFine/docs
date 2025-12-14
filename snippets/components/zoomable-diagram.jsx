export const ZoomableDiagram = ({
  children,
  title = "",
  maxHeight = "500px",
}) => {
  const containerStyle = {
    overflow: "auto",
    maxHeight: maxHeight,
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "1rem",
    background: "#0d0d0d",
    cursor: "grab",
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      {title && (
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: "#888",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {title}
        </p>
      )}
      <div style={containerStyle}>
        <div
          style={{
            minWidth: "fit-content",
            transform: "scale(1)",
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "#666",
          }}
        >
          Scroll to pan
        </span>
      </div>
    </div>
  );
};
