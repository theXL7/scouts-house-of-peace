import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramsPage from "@/components/ProgramsPage";
import { activityCategories, type ActivityCategory } from "@/lib/activities";
import { getProgramCategoryMetadata } from "@/lib/program-seo";
import { type Locale } from "@/messages";

export const dynamicParams = false;
type Params = { category: ActivityCategory; locale: Locale; };
export function generateStaticParams() {
  return (["fr", "ar"] as const).flatMap((locale) => activityCategories.map((category) => ({ locale, category })));
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, locale } = await params;
  if (!(activityCategories as readonly string[]).includes(category)) notFound();
  return getProgramCategoryMetadata(category, locale);
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { category, locale } = await params;
  if (!(activityCategories as readonly string[]).includes(category)) notFound();
  return <ProgramsPage locale={locale} category={category} />;
}
