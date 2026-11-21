import type { NextConfig } from "next";

const githubPagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "";

// Default to root-path deployment for Vercel, but keep an optional
// repo subpath when the site is exported for GitHub Pages.
const deploymentBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? githubPagesBasePath;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: deploymentBasePath,
  },
  ...(deploymentBasePath ? { basePath: deploymentBasePath } : {}),
};

export default nextConfig;
