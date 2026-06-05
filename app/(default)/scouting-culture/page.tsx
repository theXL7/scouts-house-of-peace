import type { Metadata } from "next";
import ScoutingCulturePage from "@/components/ScoutingCulturePage";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getPageMetadata("scouting-culture", "en"),
};

export default function EnglishScoutingCulturePage() {
  return <ScoutingCulturePage locale="en" />;
}
