import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramsArchivePage from "@/components/ProgramsArchivePage";
import { activityArchiveYears } from "@/lib/activity-archive";
import { getArchiveYearMetadata } from "@/lib/program-seo";

export const dynamicParams = false;
type Params = { year: string;  };
export function generateStaticParams() {
  return activityArchiveYears.map((year) => ({ year }));
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year } = await params;
  if (!(activityArchiveYears as readonly string[]).includes(year)) notFound();
  return getArchiveYearMetadata(year, "en");
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { year } = await params;
  if (!(activityArchiveYears as readonly string[]).includes(year)) notFound();
  return <ProgramsArchivePage locale={"en"} year={year} />;
}
