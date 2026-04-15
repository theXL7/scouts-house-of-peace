import HomePage from "@/components/HomePage";
import { type Locale } from "@/messages";

export const dynamicParams = false;

const localizedPages: Locale[] = ["fr", "ar"];

export function generateStaticParams() {
  return localizedPages.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <HomePage locale={locale} />;
}
