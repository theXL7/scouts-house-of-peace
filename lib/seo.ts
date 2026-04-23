import type { Metadata } from "next";

import { getJoinUsPath, getLocalePath, type Locale } from "@/messages";
import { withBasePath } from "@/lib/site";

export type SeoPageKey = "home" | "join-us";

const DEFAULT_SITE_URL = "https://scoutsmaisonpaix.org";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
const X_DEFAULT_LOCALE: Locale = "ar";
const SITE_NAME = "Scouts Maison de La Paix";
const SITE_LOGO_PATH = "/scouts-house-of-peace-logo.png";
const OPEN_GRAPH_IMAGE_PATH = "/hero/hero-bg.png";
const FACEBOOK_PROFILE_URL =
  "https://www.facebook.com/profile.php?id=100067192446286";
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/scoutsmaisondelapaix/";

const openGraphLocaleByLocale: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_MA",
};

const pageSeoByLocale: Record<
  Locale,
  Record<SeoPageKey, { title: string; description: string }>
> = {
  en: {
    home: {
      title:
        "Scouts Maison de La Paix | Official Association Website | Taourirt, Morocco",
      description:
        "Official website of Scouts Maison de La Paix in Taourirt, Morocco. Discover the association, peace-centered scouting programs, community impact, and contact information.",
    },
    "join-us": {
      title:
        "Join Scouts Maison de La Paix | Registration in Taourirt, Morocco",
      description:
        "Official registration and contact page for Scouts Maison de La Paix in Taourirt, Morocco. Review fees, required documents, contact details, and the pre-registration request form.",
    },
  },
  fr: {
    home: {
      title:
        "Scouts Maison de La Paix | Site officiel de l'association | Taourirt, Maroc",
      description:
        "Site officiel des Scouts Maison de La Paix à Taourirt, au Maroc. Découvrez l'association, les programmes scouts pour la paix, l'impact communautaire et les informations de contact.",
    },
    "join-us": {
      title:
        "Rejoindre Scouts Maison de La Paix | Inscription à Taourirt, Maroc",
      description:
        "Page officielle d'inscription et de contact des Scouts Maison de La Paix à Taourirt, au Maroc. Consultez les frais, les documents demandés et les moyens de contact.",
    },
  },
  ar: {
    home: {
      title:
        "Scouts Maison de La Paix | الموقع الرسمي للجمعية | تاوريرت، المغرب",
      description:
        "الموقع الرسمي لجمعية Scouts Maison de La Paix في تاوريرت بالمغرب. تعرف على الجمعية وبرامجها الكشفية من أجل السلام وأثرها المجتمعي ووسائل التواصل الرسمية.",
    },
    "join-us": {
      title:
        "الانخراط في Scouts Maison de La Paix | التسجيل في تاوريرت، المغرب",
      description:
        "الصفحة الرسمية للتسجيل والتواصل الخاصة بـ Scouts Maison de La Paix في تاوريرت بالمغرب. اطلع على الرسوم والوثائق المطلوبة ووسائل التواصل ونموذج طلب المعلومات.",
    },
  },
};

const keywordsByPage: Record<SeoPageKey, string[]> = {
  home: [
    "Scouts Maison de La Paix",
    "Scouts Maison de la Paix",
    "Scouts of the House of Peace",
    "كشافة دار السلام المغربية",
    "Taourirt scouts",
    "Taourirt Morocco association",
    "peace education Morocco",
    "scouting association Taourirt",
  ],
  "join-us": [
    "Join Scouts Maison de La Paix",
    "Scouts Maison de La Paix registration",
    "Taourirt scouting registration",
    "Scouts Maison de La Paix contact",
    "كشافة دار السلام المغربية",
  ],
};

const organizationDescriptionByLocale: Record<Locale, string> = {
  en: "Peace-centered scouting association in Taourirt, Morocco.",
  fr: "Association scoute engagée pour la paix à Taourirt, au Maroc.",
  ar: "جمعية كشفية تعمل من أجل السلام في تاوريرت بالمغرب.",
};

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
}

function getPagePath(page: SeoPageKey, locale: Locale) {
  return page === "home" ? getLocalePath(locale) : getJoinUsPath(locale);
}

function withTrailingSlash(path: string) {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path : `${path}/`;
}

export function getAbsoluteUrl(path: string) {
  return new URL(withBasePath(path), normalizeSiteUrl(SITE_URL)).toString();
}

export function getPageUrl(page: SeoPageKey, locale: Locale) {
  return getAbsoluteUrl(withTrailingSlash(getPagePath(page, locale)));
}

function getLanguageAlternates(page: SeoPageKey) {
  return {
    en: getPageUrl(page, "en"),
    fr: getPageUrl(page, "fr"),
    ar: getPageUrl(page, "ar"),
    "x-default": getPageUrl(page, X_DEFAULT_LOCALE),
  };
}

export function getPageMetadata(page: SeoPageKey, locale: Locale): Metadata {
  const seo = pageSeoByLocale[locale][page];
  const canonicalUrl = getPageUrl(page, locale);
  const openGraphImageUrl = getAbsoluteUrl(OPEN_GRAPH_IMAGE_PATH);

  return {
    title: seo.title,
    description: seo.description,
    keywords: keywordsByPage[page],
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(page),
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: seo.title,
      description: seo.description,
      siteName: SITE_NAME,
      locale: openGraphLocaleByLocale[locale],
      images: [
        {
          url: openGraphImageUrl,
          alt: `${SITE_NAME} official website`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [openGraphImageUrl],
    },
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
}

export function getOrganizationStructuredData(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": getAbsoluteUrl("/#organization"),
    name: SITE_NAME,
    alternateName: [
      "Scouts Maison de la Paix",
      "كشافة دار السلام المغربية",
    ],
    description: organizationDescriptionByLocale[locale],
    url: getAbsoluteUrl("/"),
    logo: getAbsoluteUrl(SITE_LOGO_PATH),
    image: getAbsoluteUrl(SITE_LOGO_PATH),
    email: "contact@scoutsmaisonpaix.org",
    telephone: "+212657171003",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Taourirt",
      addressRegion: "Oriental",
      addressCountry: "MA",
    },
    sameAs: [INSTAGRAM_PROFILE_URL, FACEBOOK_PROFILE_URL],
  };
}

export function getSocialProfileUrls() {
  return {
    facebook: FACEBOOK_PROFILE_URL,
    instagram: INSTAGRAM_PROFILE_URL,
  };
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data);
}

export function getSiteOrigin() {
  return new URL(normalizeSiteUrl(SITE_URL)).origin;
}
