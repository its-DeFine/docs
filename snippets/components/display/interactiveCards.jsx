// used in project showcase

export const InteractiveCard = ({
  mediaSrc = "",
  logo = "",
  title = "",
  subtitle = "",
  description = "",
  href = "#",
  categoryTags = [],
  productTags = [],
  cta = "",
  links = [],
  contact = [],
  style = {},
  arrow = false,
  ...cardProps
}) => {
  //     < Badge color = "blue" > Social Media</Badge>
  // <Badge color="green">Video Streaming</Badge>
  // <Badge color="purple">Creative Industry</Badge>
  // <Badge color="yellow">Events & Communication</Badge>
  // <Badge color="orange">TBD</Badge>
  // <Badge color="red">TBD</Badge>

  // Product Used:
  // <Badge color="surface">PRODUCT_NAME</Badge>
  const categoryBadgeKeys = {
    "Social Media": "blue",
    "Video Streaming": "green",
    "Creative Industry": "purple",
    "Events & Communication": "yellow",
    Other: "red",
    TBD: "orange",
  };
  const productTagHrefKeys = {
    Daydream: [
      "../../../10_products/products/daydream/overview.mdx",
      "https://daydream.live/",
    ],
    "Stream.place": [
      "../../../10_products/products/streamplace/streamplace.mdx",
      "https://stream.place/",
    ],
    "Livepeer Studio": [
      "../../../10_products/products/livepeer-studio/livepeer-studio.mdx",
      "https://livepeer.studio/",
    ],
    Frameworks: [
      "../../../10_products/products/frameworks/frameworks.mdx",
      "https://frameworks.network/",
    ],
    other: ["../../../10_products/products/ecosystem-products.mdx", ""],
  };
  const mediaContainerStyle = {
    position: "relative",
    display: "block",
    overflow: "hidden",
    isolation: "isolate",
    marginLeft: "-1.5rem",
    marginRight: "-2.5rem",
    marginTop: "-1.5rem",
    borderRadius: 0,
    maxHeight: "300px",
    width: "calc(100% + 4rem)",
    ...style,
  };
  const mediaStyle = {
    display: "block",
    width: "100%",
    height: "300px",
    margin: "0",
    padding: "0",
    borderRadius: 0,
    objectFit: "cover",
  };
  const titleContainerStyle = {
    // position: "absolute",
    // top: "0",
    // left: "0",
    // right: "0",
    // bottom: "0",
    display: "flex",
    // alignItems: "flex-start",
    justifyContent: "center",
    zIndex: "10",
    pointerEvents: "none",
  };
  const titleStyle = {
    position: "absolute",
    top: "0",
    marginTop: "0.5rem",
    background: "rgba(0, 0, 0, 0.5)",
    color: "white",
    fontSize: "18px",
    fontWeight: "800",
    padding: "6px 16px",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  };
  const logoStyle = {
    position: "absolute",
    bottom: "0",
    width: "60%",
    height: "auto",
    objectFit: "contain",
    alignSelf: "flex-end",
    opacity: 0.8,
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    margin: 0,
    padding: 0,
    marginBottom: "0.5rem",
  };
  const arrowStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    paddingTop: "0.5rem",
    paddingRight: "0.5rem",
    alignItems: "flex-start",
    justifyContent: "right",
    zIndex: "10",
    pointerEvents: "none",
  };
  const subtitleContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    margin: "1rem 0",
    width: "calc(100% + 1.5rem)",
    marginRight: "-1.5rem",
  };
  const subtitleArrowStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  };
  const subtitleStyle = {
    color: "var(--hero-text)",
    width: "100%",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "1rem",
  };
  const scrollBoxStyle = {
    color: "var(--text)",
    fontStyle: "italic",
    maxHeight: "250px",
  };

  // Check if mediaSrc is a video or image based on extension
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".mp4?raw=true"];
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".svg",
    ".gif",
    ".gif?raw=true",
  ];
  const isVideo =
    mediaSrc &&
    videoExtensions.some((ext) => mediaSrc.toLowerCase().endsWith(ext));
  const isImage =
    mediaSrc &&
    imageExtensions.some((ext) => mediaSrc.toLowerCase().endsWith(ext));

  // Check file size - useState/useEffect provided globally by Mintlify
  const MAX_VIDEO_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
  const [mediaStatus, setMediaStatus] = useState("loading"); // "loading" | "ok" | "too-large" | "error"

  useEffect(() => {
    if (!mediaSrc) {
      setMediaStatus("error");
      return;
    }
    // Fetch file size using HEAD request
    fetch(mediaSrc, { method: "HEAD" })
      .then((res) => {
        const size = parseInt(res.headers.get("content-length") || "0", 10);
        const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
        if (size > maxSize) {
          console.warn(
            `Media too large: ${(size / 1024 / 1024).toFixed(2)}MB - ${mediaSrc}`,
          );
          setMediaStatus("too-large");
        } else {
          setMediaStatus("ok");
        }
      })
      .catch(() => setMediaStatus("ok")); // If HEAD fails, try to render anyway
  }, [mediaSrc, isVideo]);

  const mediaCard = (
    <div style={mediaContainerStyle}>
      {/* VIDEO OR IMAGE */}
      {mediaStatus === "too-large" && (
        <div
          style={{
            ...mediaStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--background-dark)",
            color: "var(--text-muted)",
          }}
        >
          <span>⚠️ Media file too large</span>
        </div>
      )}
      {mediaStatus === "ok" && isVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={mediaSrc}
          style={mediaStyle}
        />
      )}
      {mediaStatus === "ok" && isImage && (
        <img src={mediaSrc} alt={title} style={mediaStyle} />
      )}
      {/* END MEDIA */}
      {/* TITLE */}
      <div style={titleContainerStyle}>
        {logo && <img src={logo} alt={title} style={logoStyle} />}
        <span style={titleStyle}>{title}</span>
      </div>
      {/* END TITLE */}
    </div>
  );

  return (
    <Card href={href} arrow={false} {...cardProps}>
      {mediaCard}
      {/* SUBTITLE & ARROW */}
      <div style={subtitleContainerStyle}>
        <div style={subtitleArrowStyle}>
          <Subtitle text={subtitle} style={subtitleStyle} />
          <Icon
            icon="arrow-up-right"
            iconType="solid"
            size={14}
            style={{ flexShrink: 0 }}
            color="rgba(255,255,255,0.4)"
          />
        </div>
        {/* RENDER CATEGORY TAGS */}
        {categoryTags.map((tag) => (
          <Badge key={tag} color={categoryBadgeKeys[tag]}>
            {tag}
          </Badge>
        ))}
      </div>
      <ScrollBox
        height={350}
        style={{
          color: "var(--text)",
          fontStyle: "italic",
        }}
      >
        {description}
      </ScrollBox>
      {/* <div style={{ width: "100%" }}> */}
      {productTags && (
        <>
          <CustomDivider
            style={{
              margin: 0,
              marginBottom: "-1rem",
              padding: 0,
              fontSize: "10px",
              minWidth: "70%",
              maxWidth: "85%",
              alignSelf: "center",
              justifySelf: "center",
              width: "90%",
            }}
          />
          {
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                justifySelf: "center",
                fontSize: "10px",
                //   margin: "1rem 0 0",
                margin: 0,
                padding: 0,
                //   borderTop: "1px solid var(--border)",
                //   minWidth: "70%",
                //   maxWidth: "90%",
              }}
            >
              Powered by
              {productTags.map((tag) => (
                <a
                  href={productTagHrefKeys[tag][1]}
                  target="_blank"
                  key={tag}
                  style={{
                    borderBottom: "none",
                    color: "var(--accent)",
                    fontWeight: "bold",
                    // fontStyle: "italic",
                    fontSize: "11px",
                    marginLeft: "0.25rem",
                  }}
                >
                  {tag}{" "}
                  <Icon
                    icon="arrow-up-right"
                    iconType="solid"
                    size={10}
                    color="var(--hero-text)"
                  />
                </a>
              ))}
            </div>
          }
        </>
      )}
      {/* </div> */}
    </Card>
  );
};

//take a list of data objects and return a list of InteractiveCards
export const InteractiveCards = () => {
  return (
    <Columns cols={2}>
      <InteractiveCard />
      <InteractiveCard />
    </Columns>
  );
};
