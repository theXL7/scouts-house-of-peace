import type { Metadata } from "next";

import LocalizedHomePage from "@/components/HomePage";
import {
  getOrganizationStructuredData,
  getWebSiteStructuredData,
  getPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("home", "en");

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([getOrganizationStructuredData("en"), getWebSiteStructuredData()]),
        }}
      />
      <LocalizedHomePage locale="en" />
    </>
  );
}
