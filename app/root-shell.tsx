import type { Metadata } from "next";
import { Amiri, Fraunces, Manrope, Tajawal } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { getDirection, type Locale } from "@/messages";
import { getAbsoluteUrl, getRobotsMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";

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

function getVerificationTokens() {
  const googleVerification =
    process.env.GOOGLE_SITE_VERIFICATION ??
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification =
    process.env.BING_SITE_VERIFICATION ??
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  return {
    google: googleVerification,
    bing: bingVerification,
  };
}

function getVerificationMetadata(): Metadata["verification"] | undefined {
  const verification = getVerificationTokens();

  if (!verification.google && !verification.bing) {
    return undefined;
  }

  return {
    ...(verification.google ? { google: verification.google } : {}),
    ...(verification.bing
      ? {
          other: {
            "msvalidate.01": verification.bing,
          },
        }
      : {}),
  };
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(getAbsoluteUrl("/")),
  applicationName: "Scouts Maison de La Paix",
  creator: "Scouts Maison de La Paix",
  publisher: "Scouts Maison de La Paix",
  icons: {
    icon: [
      { url: withBasePath("/favicon.ico"), sizes: "any" },
      {
        url: withBasePath("/logos/association-tab-logo.png"),
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: withBasePath("/favicon.ico"),
    apple: {
      url: withBasePath("/logos/association-tab-logo.png"),
      type: "image/png",
      sizes: "512x512",
    },
  },
  referrer: "origin-when-cross-origin",
  verification: getVerificationMetadata(),
  robots: getRobotsMetadata(),
};

export function RootDocument({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  const verification = getVerificationTokens();

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} ${amiri.variable} ${tajawal.variable} h-full antialiased`}
    >
      <head>
        {verification.google ? (
          <meta
            name="google-site-verification"
            content={verification.google}
          />
        ) : null}
        {verification.bing ? (
          <meta name="msvalidate.01" content={verification.bing} />
        ) : null}
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
