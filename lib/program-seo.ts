import { programFamilies, type ActivityCategory } from "@/lib/activities";
import { activityArchiveEntries } from "@/lib/activity-archive";
import { getAbsoluteUrl, getCollectionMetadata, getPageUrl } from "@/lib/seo";
import { getLocalePath, getMessages, type Locale } from "@/messages";

export function getProgramCategoryMetadata(category: ActivityCategory, locale: Locale) {
  const family = programFamilies.find((item) => item.category === category)!;
  return getCollectionMetadata(`/programs/${category}/`, locale,
    `${family.title[locale]} | Scouts Maison de La Paix`, family.description[locale]);
}

export function getArchiveYearCopy(year: string, locale: Locale) {
  const count = activityArchiveEntries.filter((entry) => entry.year === year).length;
  return {
    en: { title: `Activity archive · ${year}`, description: `${count} documented scouting activities from ${year}: camps, learning, service and community life at Scouts Maison de La Paix, with original reports and source links.` },
    fr: { title: `Archives des activités · ${year}`, description: `${count} activités scoutes documentées en ${year} : camps, apprentissages, service et vie collective des Scouts Maison de La Paix, avec comptes rendus originaux et sources.` },
    ar: { title: `أرشيف الأنشطة · ${year}`, description: `${count} أنشطة كشفية موثقة خلال ${year} لدى Scouts Maison de La Paix، تشمل المخيمات والتعلم والخدمة والحياة الجماعية، مع التقارير الأصلية وروابط المصادر.` },
  }[locale];
}

export function getArchiveYearMetadata(year: string, locale: Locale) {
  const copy = getArchiveYearCopy(year, locale);
  return getCollectionMetadata(`/programs/archive/${year}/`, locale, `${copy.title} | Scouts Maison de La Paix`, copy.description);
}

export function getProgramsBreadcrumbs(locale: Locale, category?: ActivityCategory, year?: string) {
  const family = programFamilies.find((item) => item.category === category);
  const items = [
    { name: "Scouts Maison de La Paix", item: getPageUrl("home", locale) },
    { name: getMessages(locale).programsPage.hero.title, item: getPageUrl("programs", locale) },
    ...(family ? [{ name: family.title[locale], item: getAbsoluteUrl(getLocalePath(locale, `/programs/${category}/`)) }] : []),
    ...(year ? [{ name: getArchiveYearCopy(year, locale).title, item: getAbsoluteUrl(getLocalePath(locale, `/programs/archive/${year}/`)) }] : []),
  ];
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
  };
}
