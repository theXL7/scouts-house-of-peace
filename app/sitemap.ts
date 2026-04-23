import type { MetadataRoute } from "next";

import { type Locale } from "@/messages";
import { getPageUrl, type SeoPageKey } from "@/lib/seo";

export const dynamic = "force-static";

const locales: Locale[] = ["en", "fr", "ar"];
const pages: SeoPageKey[] = ["home", "join-us"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: getPageUrl(page, locale),
      lastModified,
      changeFrequency: page === "home" ? "weekly" : "monthly",
      priority: page === "home" ? 1 : 0.8,
    })),
  );
}
