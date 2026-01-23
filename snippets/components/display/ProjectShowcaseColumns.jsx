import React from "react";

/**
 * ProjectShowcaseColumns
 *
 * Displays a columnar card layout grouped by the first tag in each project's tags array.
 *
 * @param {Array} data - Array of project objects with at least { name, description, url, tags }
 * @example
 * <ProjectShowcaseColumns data={showcaseData} />
 */
export const ProjectShowcaseColumns = ({ data }) => {
  // Group projects by their first tag
  const groups = {};
  data.forEach((project) => {
    const mainTag =
      project.tags && project.tags.length > 0 ? project.tags[0] : "Other";
    if (!groups[mainTag]) groups[mainTag] = [];
    groups[mainTag].push(project);
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {Object.entries(groups).map(([group, projects]) => (
        <div key={group} style={{ minWidth: 280, flex: 1 }}>
          <h3 style={{ textTransform: "capitalize", marginBottom: 12 }}>
            {group}
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--accent, #eaeaea)",
                  borderRadius: 10,
                  padding: 18,
                  background: "var(--card-bg, #fff)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s",
                  display: "block",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>
                  {project.name}
                </div>
                <div style={{ fontSize: 15, color: "#666", marginBottom: 8 }}>
                  {project.description}
                </div>
                <div style={{ fontSize: 13, color: "#aaa" }}>
                  {project.tags &&
                    project.tags.length > 0 &&
                    project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "var(--accent, #eaeaea)",
                          color: "#333",
                          borderRadius: 6,
                          padding: "2px 8px",
                          marginRight: 6,
                          fontSize: 12,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
