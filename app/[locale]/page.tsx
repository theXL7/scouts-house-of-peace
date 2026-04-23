import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import {
  getOrganizationStructuredData,
  getPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import { type Locale } from "@/messages";

export const dynamicParams = false;

const localizedPages: Locale[] = ["fr", "ar"];

export function generateStaticParams() {
  return localizedPages.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return getPageMetadata("home", locale);
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getOrganizationStructuredData(locale)),
        }}
      />
      <HomePage locale={locale} />
    </>
  );
}
