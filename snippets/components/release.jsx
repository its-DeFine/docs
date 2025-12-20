import { useState, useEffect } from "react";

/**
 * LatestRelease - Fetches and displays the latest release version from GitHub
 * Usage:
 *   import { LatestRelease, LatestReleaseUrl } from '/snippets/components/release.jsx'
 *
 *   Latest version: <LatestRelease />
 *   <LatestReleaseUrl>Download here</LatestReleaseUrl>
 */

export const LatestRelease = ({
  repo = "livepeer/go-livepeer",
  fallback = "latest",
}) => {
  const [version, setVersion] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tag_name) {
          setVersion(data.tag_name);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [repo]);

  return version;
};

export const LatestReleaseUrl = ({
  repo = "livepeer/go-livepeer",
  asset = "livepeer-linux-amd64.tar.gz",
  children,
}) => {
  const [url, setUrl] = useState(`https://github.com/${repo}/releases/latest`);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tag_name) {
          setUrl(
            `https://github.com/${repo}/releases/download/${data.tag_name}/${asset}`
          );
        }
      })
      .catch(() => {});
  }, [repo, asset]);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children || url}
    </a>
  );
};
