import type { Metadata } from "next";

import JoinUsPage from "@/components/JoinUsPage";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getPageMetadata("join-us", "en"),
};

export default function EnglishJoinUsPage() {
  return <JoinUsPage locale="en" />;
}
