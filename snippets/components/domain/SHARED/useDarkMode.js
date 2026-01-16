// Utility to detect dark mode in Mintlify Palm frame mode
export function isDarkMode() {
  if (typeof window !== "undefined") {
    const classList = document.documentElement.className;
    const isDark = document.documentElement.classList.contains("dark");
    console.log("[useDarkMode] document.documentElement.className:", classList);
    console.log("[useDarkMode] .dark present:", isDark);
    return isDark;
  }
  console.log("[useDarkMode] window is undefined (SSR?)");
  return false;
}

// Utility: Returns the correct color based on theme and overrides
function getDynamicThemeColor(override, light, dark, debugLabel = "") {
  // If an override is provided, use it
  if (override) return override;
  // Check for dark mode by inspecting the document or class
  if (
    typeof window !== "undefined" &&
    document?.documentElement?.classList.contains("dark")
  ) {
    return dark;
  }
  return light;
}
