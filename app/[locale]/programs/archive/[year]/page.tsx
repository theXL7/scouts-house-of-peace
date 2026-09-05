import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramsArchivePage from "@/components/ProgramsArchivePage";
import { activityArchiveYears } from "@/lib/activity-archive";
import { getArchiveYearMetadata } from "@/lib/program-seo";
import { type Locale } from "@/messages";

export const dynamicParams = false;
type Params = { year: string; locale: Locale; };
export function generateStaticParams() {
  return (["fr", "ar"] as const).flatMap((locale) => activityArchiveYears.map((year) => ({ locale, year })));
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year, locale } = await params;
  if (!(activityArchiveYears as readonly string[]).includes(year)) notFound();
  return getArchiveYearMetadata(year, locale);
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { year, locale } = await params;
  if (!(activityArchiveYears as readonly string[]).includes(year)) notFound();
  return <ProgramsArchivePage locale={locale} year={year} />;
}
