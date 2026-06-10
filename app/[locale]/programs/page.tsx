import type { Metadata } from "next";

import ProgramsPage from "@/components/ProgramsPage";
import { getPageMetadata } from "@/lib/seo";
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

  return getPageMetadata("programs", locale);
}

export default async function LocaleProgramsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <ProgramsPage locale={locale} />;
}
