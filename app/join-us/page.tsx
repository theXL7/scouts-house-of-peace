import type { Metadata } from "next";

import JoinUsPage from "@/components/JoinUsPage";
import { getMessages } from "@/messages";

const messages = getMessages("en");

export const metadata: Metadata = {
  title: messages.joinPage.metaTitle,
  description: messages.joinPage.metaDescription,
};

export default function EnglishJoinUsPage() {
  return <JoinUsPage locale="en" />;
}
