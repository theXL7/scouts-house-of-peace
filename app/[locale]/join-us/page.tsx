import type { Metadata } from "next";

import JoinUsPage from "@/components/JoinUsPage";
import { getMessages, type Locale } from "@/messages";

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
  const messages = getMessages(locale);

  return {
    title: messages.joinPage.metaTitle,
    description: messages.joinPage.metaDescription,
  };
}

export default async function LocaleJoinUsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <JoinUsPage locale={locale} />;
}
