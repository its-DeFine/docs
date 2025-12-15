export const BlinkingIcon = ({
  icon = "terminal",
  size = 16,
  color = "#2d9a67",
}) => {
  return (
    <span
      style={{
        display: "inline-flex",
        animation: "blink 3s ease-in-out infinite",
      }}
    >
      <Icon icon={icon} size={size} color={color} />
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </span>
  );
};

// Alias for backwards compatibility
export const BlinkingTerminal = BlinkingIcon;

export const DoubleIconLink = ({
  label = "",
  href = "#",
  text = "",
  iconLeft = "github",
  iconRight = "arrow-up-right",
}) => {
  return (
    <span
      style={{
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        marginLeft: "0.3rem",
      }}
    >
      {text && <span style={{ marginRight: 8 }}>{text}</span>}
      <Icon icon={iconLeft} />
      <a href={href}>{label}</a>
      <Icon icon={iconRight} size={12} color="#2d9a67" />
    </span>
  );
};

export const GotoLink = ({
  label,
  relativePath,
  text = "",
  icon = "arrow-turn-down-right",
}) => {
  return (
    <span>
      <p style={{ marginRight: 8 }}>{text}</p>
      <Icon icon={icon} />
      <a href={relativePath} style={{ marginLeft: 6 }}>
        {label}
      </a>
    </span>
  );
};

export const GotoCard = ({ label, relativePath, icon, text, cta = "" }) => {
  icon = icon ? icon : "arrow-turn-down-right";
  return (
    <Card title={label} icon={icon} href={relativePath} arrow cta={cta}>
      {text}
    </Card>
  );
};

export const DownloadLink = ({
  label = "Download Transcript",
  icon = "download",
  downloadLink,
  rightIcon = false,
}) => {
  console.log("dllink", downloadLink);
  downloadLink = downloadLink ? downloadLink : "https://Livepeer.org";
  console.log("dllink2", downloadLink);
  return (
    <span>
      {!rightIcon && <Icon icon={icon} />}
      <a
        href={downloadLink}
        style={{
          marginRight: rightIcon ? 8 : 0,
          marginLeft: rightIcon ? 0 : 8,
        }}
      >
        {label}
      </a>
      {rightIcon && <Icon icon={icon} style={{ marginLeft: 8 }} />}
    </span>
  );
};
