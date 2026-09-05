import type { MetadataRoute } from "next";

import { type Locale } from "@/messages";
import { activityCategories, getProgramCategoryUrl } from "@/lib/activities";
import { activityArchiveYears } from "@/lib/activity-archive";
import { getLocalePath } from "@/messages";
import {
  getPageUrl,
  getAbsoluteUrl,
  isSearchIndexingEnabled,
  type SeoPageKey,
} from "@/lib/seo";

export const dynamic = "force-static";

const locales: Locale[] = ["en", "fr", "ar"];
const pages: SeoPageKey[] = ["home", "join-us", "programs", "scouting-culture"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSearchIndexingEnabled()) {
    return [];
  }

  const families = [
    ...pages.map((page) => (locale: Locale) => getPageUrl(page, locale)),
    ...activityCategories.map((category) => (locale: Locale) => getAbsoluteUrl(getProgramCategoryUrl(category, locale))),
    ...activityArchiveYears.map((year) => (locale: Locale) => getAbsoluteUrl(getLocalePath(locale, `/programs/archive/${year}/`))),
  ];
  // Omit lastModified until actual editorial timestamps exist; build time is not one.
  return families.flatMap((getUrl) => locales.map((locale) => ({
    url: getUrl(locale),
    alternates: { languages: { en: getUrl("en"), fr: getUrl("fr"), ar: getUrl("ar"), "x-default": getUrl("ar") } },
  })));
}
