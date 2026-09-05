import type { MetadataRoute } from "next";

import { getAbsoluteUrl, isSearchIndexingEnabled } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexingEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    // Search/retrieval is allowed; retain the production opt-out from GPT training.
    // There are no admin, login or API routes in this static export.
    rules: [
      { userAgent: ["*", "Googlebot", "OAI-SearchBot", "Google-Extended"], allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
