import type { Metadata } from "next";

import ProgramsPage from "@/components/ProgramsPage";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getPageMetadata("programs", "en"),
};

export default function EnglishProgramsPage() {
  return <ProgramsPage locale="en" />;
}
