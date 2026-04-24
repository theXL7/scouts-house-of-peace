import "../globals.css";

import { notFound } from "next/navigation";

import { baseMetadata, RootDocument } from "@/app/root-shell";
import { isLocale } from "@/messages";

export const metadata = baseMetadata;

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  return <RootDocument locale={locale}>{children}</RootDocument>;
}
