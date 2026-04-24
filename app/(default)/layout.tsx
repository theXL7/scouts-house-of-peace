import "../globals.css";

import { baseMetadata, RootDocument } from "@/app/root-shell";

export const metadata = baseMetadata;

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
