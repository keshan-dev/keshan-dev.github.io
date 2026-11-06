import type { NextConfig } from "next";

// Static HTML export for GitHub Pages. The site is served from the root of
// keshan-dev.github.io, so no basePath is needed.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
