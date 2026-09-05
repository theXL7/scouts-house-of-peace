import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArchiveStoryText from "@/components/ArchiveStoryText";
import { activityArchiveEntries, activityArchiveYears, activityArchiveImageMap, activityArchiveGalleryMap, getActivityArchiveCategory, getLocalizedActivityArchiveEntry } from "@/lib/activity-archive";
import { getProgramCategoryUrl } from "@/lib/activities";
import { getArchiveYearCopy, getProgramsBreadcrumbs } from "@/lib/program-seo";
import { serializeJsonLd } from "@/lib/seo";
import { withBasePath } from "@/lib/site";
import { getDirection, getJoinUsPath, getLocalePath, getMessages, type Locale } from "@/messages";

export default function ProgramsArchivePage({ locale, year }: { locale: Locale; year: string }) {
  const messages = getMessages(locale);
  const copy = getArchiveYearCopy(year, locale);
  const entries = activityArchiveEntries.filter((entry) => entry.year === year).toReversed();
  const navigation = messages.navigation.map((item) => ({ ...item, href: item.href.startsWith("#") ? `${getLocalePath(locale)}${item.href}` : item.href }));
  return (
    <div lang={locale} dir={getDirection(locale)} className="locale-root bg-[#F7F3EC] text-[#2A2A2A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getProgramsBreadcrumbs(locale, undefined, year)) }} />
      <Header locale={locale} navigation={navigation} languageLabels={messages.languageLabels} copy={messages.header} brandHref={getLocalePath(locale)} joinHref={getJoinUsPath(locale)} />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-36 sm:px-8">
        <nav aria-label={locale === "ar" ? "مسار الصفحة" : "Breadcrumb"} className="mb-8 text-sm font-bold text-[#264D3B]">
          <Link href={getLocalePath(locale)}>Scouts Maison de La Paix</Link> / <Link href={getLocalePath(locale, "/programs/")}>{messages.programsPage.hero.title}</Link> / {year}
        </nav>
        <h1 className="text-4xl sm:text-5xl">{copy.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9">{copy.description}</p>
        <nav aria-label={locale === "ar" ? "سنوات الأرشيف" : locale === "fr" ? "Années des archives" : "Archive years"} className="my-8 flex flex-wrap gap-3">
          {activityArchiveYears.map((item) => <Link key={item} href={getLocalePath(locale, `/programs/archive/${item}/`)} aria-current={item === year ? "page" : undefined} className="rounded-full border border-[#D8C9AE] px-4 py-2 text-sm font-bold text-[#264D3B] hover:underline">{item}</Link>)}
        </nav>
        <div className="space-y-10">
          {entries.map((entry) => {
            const story = getLocalizedActivityArchiveEntry(entry, locale);
            const category = getActivityArchiveCategory(entry);
            const image = entry.imageSrc ?? activityArchiveImageMap[entry.id] ?? activityArchiveGalleryMap[entry.id]?.find((src) => /\.(jpg|jpeg|png|webp)$/i.test(src));
            return (
              <article key={entry.id} id={entry.id} data-archive-id={entry.id} className="scroll-mt-32 rounded-[24px] border border-[#D8C9AE] bg-[#FBF8F1] p-6 shadow-[0_18px_42px_rgba(38,77,59,0.08)] sm:p-8">
                <div className="flex flex-wrap gap-4 text-sm font-bold text-[#B86A4A]">
                  <p>{story.date}</p><Link href={getProgramCategoryUrl(category, locale)} className="underline underline-offset-4">{messages.programsPage.filters[category]}</Link>
                </div>
                <h2 className="mt-4 text-3xl"><a href={`#${entry.id}`} style={{ fontFamily: "inherit" }}>{story.title}</a></h2>
                {image ? <div className="relative mt-6 aspect-[16/9] max-w-2xl overflow-hidden rounded-[20px]"><Image src={withBasePath(image)} alt={story.title} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" /></div> : null}
                <div className="mt-6 space-y-4"><ArchiveStoryText entry={entry} locale={locale} /></div>
                <Link href={`${getLocalePath(locale, "/programs/")}#archive-story-${entry.id}`} className="mt-6 inline-block text-sm font-bold text-[#264D3B] underline underline-offset-4">{messages.programsPage.hero.title}</Link>
              </article>
            );
          })}
        </div>
      </main>
      <Footer copy={messages.footer} navigation={navigation} isRtl={locale === "ar"} joinHref={getJoinUsPath(locale)} />
    </div>
  );
}
