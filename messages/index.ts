import ar from "./ar";
import en, { type Messages } from "./en";
import fr from "./fr";
import type { DeepPartial } from "./shared";

export const locales = ["en", "fr", "ar"] as const;

export type Locale = (typeof locales)[number];

const localeOverrides: Record<Locale, DeepPartial<Messages>> = {
  en,
  fr,
  ar,
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeMessages<T>(base: T, override?: DeepPartial<T>): T {
  if (!override) {
    return base;
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(override)) {
      return base;
    }

    return base.map((item, index) => {
      const overrideItem = override[index];

      return overrideItem === undefined
        ? item
        : mergeMessages(item, overrideItem as DeepPartial<typeof item>);
    }) as T;
  }

  if (!isObject(base) || !isObject(override)) {
    return (override as T) ?? base;
  }

  const mergedEntries = Object.keys(base).map((key) => {
    const baseValue = base[key as keyof T];
    const overrideValue = override[key as keyof T];

    return [
      key,
      overrideValue === undefined
        ? baseValue
        : mergeMessages(baseValue, overrideValue as DeepPartial<typeof baseValue>),
    ];
  });

  return Object.fromEntries(mergedEntries) as T;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return mergeMessages(en, localeOverrides[locale]);
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocalePath(locale: Locale, path = "") {
  const normalizedPath =
    !path || path === "/"
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;

  if (locale === "en") {
    return normalizedPath || "/";
  }

  return `/${locale}${normalizedPath}`;
}

export function getJoinUsPath(locale: Locale) {
  return getLocalePath(locale, "/join-us");
}

export function getLocalizedPathname(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  const pathSegments =
    segments[0] && isLocale(segments[0]) ? segments.slice(1) : segments;

  return getLocalePath(locale, `/${pathSegments.join("/")}`);
}
