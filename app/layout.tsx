import type { Metadata } from "next";
import { Amiri, Fraunces, Manrope, Tajawal } from "next/font/google";
import { getAbsoluteUrl } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-ar-display",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "700"],
});

const tajawal = Tajawal({
  variable: "--font-ar-body",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getAbsoluteUrl("/")),
  applicationName: "Scouts Maison de La Paix",
  creator: "Scouts Maison de La Paix",
  publisher: "Scouts Maison de La Paix",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} ${amiri.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
