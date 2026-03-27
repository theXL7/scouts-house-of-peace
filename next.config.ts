import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/scouts-house-of-peace",
  assetPrefix: "/scouts-house-of-peace/",
};

export default nextConfig;

