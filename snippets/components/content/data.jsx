/**
 * BlogCard - A card component specifically designed for blog posts
 *
 * @description
 * Similar to PostCard but optimized for blog content with reading time and excerpt support.
 * Includes automatic scroll detection for long content.
 *
 * @param {string} title - The title of the blog post
 * @param {string} content - HTML content to display
 * @param {string} href - Link URL for the blog post
 * @param {string} [author="Livepeer Team"] - Author name
 * @param {string} [datePosted=null] - Publication date
 * @param {string} [excerpt=null] - Short excerpt (use if linking to external blog)
 * @param {number} [readingTime=null] - Estimated reading time in minutes
 * @param {string} [icon="book-open"] - Icon for the card
 * @param {string} [authorIcon="user-pen"] - Icon for author section (currently commented out)
 * @param {string} [dateIcon="calendar"] - Icon for date section
 * @param {string} [cta="Read More"] - Call-to-action button text
 * @param {string} [img=null] - Optional image URL
 *
 * @example
 * <BlogCard
 *   title="Livepeer 2024 Roadmap"
 *   content="<p>Exciting updates coming...</p>"
 *   href="/blog/2024-roadmap"
 *   datePosted="2024-01-15"
 *   readingTime={5}
 * />
 *
 * @author Livepeer Documentation Team
 */
export const BlogCard = ({
  title,
  content,
  href,
  author = "Livepeer Team",
  datePosted = null,
  excerpt = null, //use if we prefer people to go to the actual blog site
  readingTime = null,
  icon = "book-open",
  authorIcon = "user-pen",
  dateIcon = "calendar",
  cta = "Read More",
  img = null,
}) => {
  console.log("item", title, content, href, img);
  // Show hint if content is likely to overflow (>500 chars as proxy)
  const showScrollHint = content && content.length > 500;

  const titleStyle = {
    alignItems: "center",
    color: "var(--accent)",
    fontSize: "1.25rem",
    marginLeft: "-2px",
    marginBottom: "0.5rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const authorStyle = {
    display: "flex",
    fontSize: 13,
    color: "var(--hero-text)",
    gap: 6,
  };

  const dateStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    color: "var(--hero-text)",
    gap: 6,
  };

  const readTimeStyle = {
    display: "flex",
    marginTop: 0,
    alignItems: "center",
    fontSize: 12,
    color: "var(--hero-text)",
    gap: 6,
  };

  const contentBgStyle = {
    height: 1,
    backgroundColor: "var(--border)",
    margin: "12px 0",
  };

  const contentContainerStyle = {
    maxHeight: 300,
    overflowY: "auto",
  };

  const scrollHintStyle = {
    fontSize: 11,
    color: "var(--muted-text)",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 0,
  };

  const iconStyle = { position: "relative", top: "-2px" };

  return (
    <Card
      title={
        <span style={titleStyle}>
          <span style={{ alignSelf: "top" }}>
            <Icon icon={icon} size={20} color="var(--accent)" />
          </span>
          <span style={{ marginLeft: "0.5rem" }}>{title}</span>
        </span>
      }
      href={href}
      cta={cta}
      img={img}
      arrow
    >
      {/* <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}> */}
      <div style={{ flex: 1 }}>
        {/* {author && (
        <div
          style={authorStyle}
        >
          <span>
            <Icon icon={authorIcon} size={20} />
          </span>
          <span>{author}</span>
        </div>
      )} */}
        {datePosted && (
          <div style={dateStyle}>
            <span>
              <Icon icon={dateIcon} size={14} />
            </span>
            <span>{datePosted}</span>
          </div>
        )}
        {readingTime && (
          <div style={readTimeStyle}>
            <span>
              <Icon icon="clock" size={14} />
            </span>
            <span>Read Time: {readingTime} minutes</span>
          </div>
        )}
      </div>
      {/* <img
          src={img}
          style={{
            width: "30%",
            height: "auto",
            objectFit: "contain",
            alignSelf: "flex-start",
            justifySelf: "flex-end",
          }}
          alt="Blog Header Image"
        />
      </div> */}
      <div style={contentBgStyle} />
      <div
        style={contentContainerStyle}
        onScroll={(e) => {
          const el = e.target;
          const atBottom =
            el.scrollHeight - el.scrollTop <= el.clientHeight + 10;
          const hint = el.nextSibling;
          if (hint) hint.style.display = atBottom ? "none" : "block";
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {showScrollHint && <div style={scrollHintStyle}>Scroll for more ↓</div>}
    </Card>
  );
};

/**
 * CardBlogDataLayout - Layout component for displaying multiple BlogCards
 *
 * @description
 * Renders an array of blog items as BlogCard components in a vertical layout.
 *
 * @param {Array<Object>} [items=[]] - Array of BlogCard props objects
 *
 * @example
 * const blogPosts = [
 *   { title: "Blog 1", content: "...", href: "/blog/post-1", readingTime: 5 },
 *   { title: "Blog 2", content: "...", href: "/blog/post-2", readingTime: 3 }
 * ];
 * <CardBlogDataLayout items={blogPosts} />
 *
 * @author Livepeer Documentation Team
 */
export const CardBlogDataLayout = ({ items = [], limit }) => {
  //   console.log("items", items);
  const displayItems = limit ? items.slice(0, limit) : items;
  return (
    <div>
      {displayItems.map((props, idx) => (
        <BlogCard key={props.href || idx} {...props} />
      ))}
    </div>
  );
};

export const ColumnsBlogCardLayout = ({ items = [], cols = 2, limit }) => {
  console.log("items", items);
  const displayItems = limit ? items.slice(0, limit) : items;
  return (
    <Columns cols={cols}>
      {displayItems.map((props, idx) => (
        <BlogCard key={props.href || idx} {...props} />
      ))}
    </Columns>
  );
};
