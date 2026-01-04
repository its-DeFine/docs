import { useState, useEffect } from "react";

/**
 * LatestRelease - Fetches and displays the latest release version from GitHub
 * Usage:
 *   import { LatestRelease, LatestReleaseUrl } from '/snippets/components/release.jsx'
 *
 *   Latest version: <LatestRelease />
 *   <LatestReleaseUrl>Download here</LatestReleaseUrl>
 */

// Cache for last successful fetch to handle rate limiting
let cachedVersion = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const LatestRelease = ({
  repo = "livepeer/go-livepeer",
  fallback = "v0.8.8",
}) => {
  const [version, setVersion] = useState(cachedVersion || fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use cache if it's fresh
    const now = Date.now();
    if (
      cachedVersion &&
      cacheTimestamp &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      setVersion(cachedVersion);
      setLoading(false);
      return;
    }

    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tag_name) {
          setVersion(data.tag_name);
          // Update cache on success
          cachedVersion = data.tag_name;
          cacheTimestamp = Date.now();
        }
        setLoading(false);
      })
      .catch(() => {
        // On error, use cached version if available, otherwise use fallback
        if (cachedVersion) {
          setVersion(cachedVersion);
        }
        setLoading(false);
      });
  }, [repo]);

  return version;
};

// Cache for URL component
let cachedUrlVersion = null;
let urlCacheTimestamp = null;

export const LatestReleaseUrl = ({
  repo = "livepeer/go-livepeer",
  asset = "livepeer-linux-amd64.tar.gz",
  children,
}) => {
  const fallbackUrl = `https://github.com/${repo}/releases/latest`;
  const [url, setUrl] = useState(
    cachedUrlVersion
      ? `https://github.com/${repo}/releases/download/${cachedUrlVersion}/${asset}`
      : fallbackUrl
  );

  useEffect(() => {
    // Use cache if it's fresh
    const now = Date.now();
    if (
      cachedUrlVersion &&
      urlCacheTimestamp &&
      now - urlCacheTimestamp < CACHE_DURATION
    ) {
      setUrl(
        `https://github.com/${repo}/releases/download/${cachedUrlVersion}/${asset}`
      );
      return;
    }

    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tag_name) {
          setUrl(
            `https://github.com/${repo}/releases/download/${data.tag_name}/${asset}`
          );
          // Update cache on success
          cachedUrlVersion = data.tag_name;
          urlCacheTimestamp = Date.now();
        }
      })
      .catch(() => {
        // On error, use cached version if available
        if (cachedUrlVersion) {
          setUrl(
            `https://github.com/${repo}/releases/download/${cachedUrlVersion}/${asset}`
          );
        }
      });
  }, [repo, asset]);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children || url}
    </a>
  );
};
