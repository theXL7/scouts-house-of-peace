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
    // Compile synthetic-only test UI into this one Vercel preview branch.
    NEXT_PUBLIC_REGISTRATION_TEST_PREVIEW:
      process.env.VERCEL_ENV === "preview" &&
      process.env.VERCEL_GIT_COMMIT_REF ===
        "preview/registration-sheets-test-2026-11-21"
        ? "true"
        : "false",
  },
  ...(deploymentBasePath ? { basePath: deploymentBasePath } : {}),
};

export default nextConfig;
