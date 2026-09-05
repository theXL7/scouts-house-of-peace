"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import ArchiveStoryText from "@/components/ArchiveStoryText";

import {
  activityCategories,
  activityFilters,
  activityItems,
  getActivityStatus,
  getActivityUrl,
  getProgramCategoryUrl,
  getLocalizedText,
  programFamilies,
  type ActivityCategory,
  type ActivityFilter,
  type ActivityItem,
} from "@/lib/activities";
import {
  activityArchiveEntries,
  activityArchiveFacebookSourceMap,
  activityArchiveGalleryMap,
  activityArchiveImageMap,
  activityArchiveNotes,
  activityArchiveYears,
  getActivityArchiveCategory,
  getLocalizedActivityArchiveEntry,
  type ActivityArchiveEntry,
} from "@/lib/activity-archive";
import { getSocialProfileUrls } from "@/lib/seo";
import { withBasePath } from "@/lib/site";
import { getLocalePath, type Locale } from "@/messages";
import type { Messages } from "@/messages/en";

function isActivityFilter(value: string | null): value is ActivityFilter {
  return Boolean(value && activityFilters.includes(value as ActivityFilter));
}

// Browser query state enhances static HTML; it must never suspend the content.
function subscribeToFilters(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("activity-filter-change", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("activity-filter-change", onChange);
  };
}
const getFilterSnapshot = () => window.location.search;
const getServerFilterSnapshot = () => "";

function isVideoMedia(src?: string) {
  return Boolean(src?.match(/\.(mp4|webm|mov)$/i));
}

const videoPosterMap: Record<string, string> = {
  "/activities/programme/videos/15-mar-2025.mp4":
    "/activities/programme/videos/posters/15-mar-2025.png",
  "/activities/programme/videos/21-dec-2024.mp4":
    "/activities/programme/videos/posters/21-dec-2024.png",
  "/activities/programme/videos/late-nov-2024.mp4":
    "/activities/programme/videos/posters/late-nov-2024.png",
};

function getVideoPoster(src?: string) {
  return src ? videoPosterMap[src] : undefined;
}

function getFirstImageMedia(media?: string[]) {
  return media?.find((item) => !isVideoMedia(item));
}

function getArchiveCoverImage(media?: string[]) {
  const firstImage = getFirstImageMedia(media);
  const firstVideo = media?.find((item) => isVideoMedia(item));

  return firstImage ?? getVideoPoster(firstVideo);
}

const archiveCopy = {
  en: {
    eyebrow: "Timeline highlights",
    title: "Curated activity highlights, newest to oldest.",
    description:
      "This is not the entire archive. It is a guided timeline of the strongest documented moments, with filters, source links, and richer photo stories where local albums are available.",
    entryCount: "highlighted moments",
    notesTitle: "Pattern notes from the highlights",
    sourceAvailable: "Source link",
    openDetails: "Open story",
    close: "Close",
    viewSource: "Open source",
    viewSourceNumbered: "Source",
    navigatorTitle: "Jump through highlights",
    navigatorHint: "Filter by family or skip by year.",
    filtersTitle: "Story families",
    allFamilies: "All families",
    yearsTitle: "Years",
    activeYearLabel: "Now viewing",
    previewTitle: "Year preview",
    galleryTitle: "Story photos",
  },
  fr: {
    eyebrow: "Temps forts chronologiques",
    title: "Temps forts choisis, du plus récent au plus ancien.",
    description:
      "Ce n'est pas l'archive complète. C'est une chronologie guidée des moments documentés les plus forts, avec filtres, sources et récits photo plus riches quand des albums locaux sont disponibles.",
    entryCount: "moments mis en avant",
    notesTitle: "Repères tirés des temps forts",
    sourceAvailable: "Lien source",
    openDetails: "Ouvrir le récit",
    close: "Fermer",
    viewSource: "Ouvrir la source",
    viewSourceNumbered: "Source",
    navigatorTitle: "Parcourir les temps forts",
    navigatorHint: "Filtrer par famille ou aller à une année.",
    filtersTitle: "Familles de récits",
    allFamilies: "Toutes les familles",
    yearsTitle: "Années",
    activeYearLabel: "En cours",
    previewTitle: "Aperçu de l'année",
    galleryTitle: "Photos du récit",
  },
  ar: {
    eyebrow: "محطات زمنية مختارة",
    title: "أبرز المحطات المختارة من الأحدث إلى الأقدم.",
    description:
      "هذا ليس الأرشيف الكامل، بل مسار موجه لأقوى المحطات الموثقة، مع تصفية حسب العائلات وروابط المصادر وحكايات مصورة أغنى عندما تتوفر ألبومات محلية.",
    entryCount: "محطة بارزة",
    notesTitle: "ملاحظات مستخلصة من المحطات",
    sourceAvailable: "رابط المصدر",
    openDetails: "عرض التفاصيل",
    close: "إغلاق",
    viewSource: "فتح المصدر",
    viewSourceNumbered: "مصدر",
    navigatorTitle: "تصفح المحطات",
    navigatorHint: "صف حسب العائلة أو انتقل إلى سنة محددة.",
    filtersTitle: "عائلات الحكايات",
    allFamilies: "كل العائلات",
    yearsTitle: "السنوات",
    activeYearLabel: "تشاهد الآن",
    previewTitle: "لمحة عن السنة",
    galleryTitle: "صور الحكاية",
  },
} as const;

function PosterFallback({
  title,
  label,
  detail,
  tone = "poster",
}: {
  title: string;
  label: string;
  detail?: string;
  tone?: "photo" | "poster" | "pattern";
}) {
  const accent =
    tone === "pattern"
      ? "from-[#264D3B] via-[#3D6C56] to-[#B86A4A]"
      : "from-[#B86A4A] via-[#D3A176] to-[#264D3B]";

  return (
    <div
      className={`relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden bg-gradient-to-br ${accent} p-6 text-[#F7F3EC]`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.42),transparent_11rem),linear-gradient(135deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:auto,22px_22px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -right-12 h-44 w-44 rounded-full border border-white/22"
      />
      <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-white/78">
        {label}
      </p>
      <div className="relative">
        <h3 className="max-w-[12ch] text-[2.1rem] leading-[1.04] !text-[#F7F3EC]">
          {title}
        </h3>
        {detail ? (
          <p className="mt-4 max-w-xs text-sm font-semibold leading-6 text-white/78">
            {detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ArchiveVisualFallback({
  entry,
  locale,
  sourceLabel,
}: {
  entry: ActivityArchiveEntry;
  locale: Locale;
  sourceLabel: string;
}) {
  const entryCopy = getLocalizedActivityArchiveEntry(entry, locale);
  const isRtl = locale === "ar";

  return (
    <div className="relative flex h-full min-h-[13rem] flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(247,243,236,0.34),transparent_9rem),linear-gradient(135deg,#264D3B,#385F4D_46%,#B86A4A)] p-5 text-[#F7F3EC]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-14 -left-10 h-36 w-36 rounded-full border border-white/20"
      />
      <div className="relative flex items-start justify-between gap-4">
        <p className="rounded-full border border-white/18 bg-white/12 px-3 py-1 text-xs font-black text-white/86 backdrop-blur-sm">
          {entry.year}
        </p>
        <p className="max-w-[9rem] text-right text-[0.72rem] font-black uppercase tracking-[0.18em] text-white/66">
          {sourceLabel}
        </p>
      </div>
      <div className={`relative ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
        <p className="text-sm font-black text-white/74">{entryCopy.date}</p>
        <h3 className="mt-2 text-[1.55rem] leading-[1.12] !text-[#F7F3EC]">
          {entryCopy.title}
        </h3>
      </div>
    </div>
  );
}

function ShareButton({
  activity,
  locale,
  label,
  copiedLabel,
}: {
  activity: ActivityItem;
  locale: Locale;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const relativeUrl = getActivityUrl(activity, locale);
    const shareUrl = new URL(withBasePath(relativeUrl), window.location.origin).toString();
    const shareText =
      activity.shareText?.[locale] ??
      `${getLocalizedText(activity.title, locale)} - Scouts Maison de La Paix`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: getLocalizedText(activity.title, locale),
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-[#264D3B]/12 bg-white/58 px-3 py-2 text-xs font-bold text-[#264D3B] transition hover:-translate-y-0.5 hover:bg-white"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
        <path d="m16 6-4-4-4 4" />
        <path d="M12 2v14" />
      </svg>
      {copied ? copiedLabel : label}
    </button>
  );
}

export default function ProgramsActivityExplorer({
  copy,
  locale,
  isRtl = false,
  initialFilter = "all",
  referenceDate,
}: {
  copy: Messages["programsPage"];
  locale: Locale;
  isRtl?: boolean;
  initialFilter?: ActivityFilter;
  referenceDate: string;
}) {
  const search = useSyncExternalStore(subscribeToFilters, getFilterSnapshot, getServerFilterSnapshot);
  const queryCategory = new URLSearchParams(search).get("category");
  const selectedFilter: ActivityFilter = isActivityFilter(queryCategory)
    ? queryCategory
    : initialFilter;
  const socials = getSocialProfileUrls();
  const [selectedArchiveEntry, setSelectedArchiveEntry] =
    useState<ActivityArchiveEntry | null>(null);
  const [archiveCategoryFilter, setArchiveCategoryFilter] = useState<
    ActivityCategory | "all"
  >(initialFilter === "upcoming" ? "all" : initialFilter);
  const [activeArchiveYear, setActiveArchiveYear] = useState<string>(
    activityArchiveYears[0],
  );
  const [previewArchiveYear, setPreviewArchiveYear] = useState<string | null>(
    null,
  );

  const upcomingActivities = useMemo(
    () =>
      activityItems.filter((activity) => {
        const status = getActivityStatus(activity, referenceDate);
        return status === "upcoming" || status === "happening";
      }),
    [referenceDate],
  );
  const visibleActivities = useMemo(() => {
    if (selectedFilter === "all") return activityItems;
    if (selectedFilter === "upcoming") return upcomingActivities;
    return activityItems.filter((activity) => activity.category === selectedFilter);
  }, [selectedFilter, upcomingActivities]);
  const availableActivityFilters = useMemo(
    () =>
      activityFilters.filter(
        (filter) => filter !== "upcoming" || upcomingActivities.length > 0,
      ),
    [upcomingActivities.length],
  );
  const archiveCategoryCounts = useMemo(
    () =>
      activityCategories.map((category) => ({
        category,
        count: activityArchiveEntries.filter(
          (entry) => getActivityArchiveCategory(entry) === category,
        ).length,
      })),
    [],
  );
  const visibleArchiveTotal = useMemo(
    () =>
      activityArchiveEntries.filter(
        (entry) =>
          archiveCategoryFilter === "all" ||
          getActivityArchiveCategory(entry) === archiveCategoryFilter,
      ).length,
    [archiveCategoryFilter],
  );
  const displayedArchiveTotal = visibleArchiveTotal;
  const archiveYearSummaries = useMemo(() => {
    const summaries = activityArchiveYears
      .map((year) => {
        const entries = activityArchiveEntries
          .filter(
            (entry) =>
              entry.year === year &&
              (archiveCategoryFilter === "all" ||
                getActivityArchiveCategory(entry) === archiveCategoryFilter),
          )
          .reverse();

        return {
          year,
          entries,
          count: entries.length,
          previewEntry: entries[0],
        };
      })
      .filter((summary) => summary.count > 0);
    const maxCount = Math.max(1, ...summaries.map((summary) => summary.count));

    return { summaries, maxCount };
  }, [archiveCategoryFilter]);
  const previewYearSummary = useMemo(
    () =>
      archiveYearSummaries.summaries.find(
        (summary) =>
          summary.year === (previewArchiveYear ?? activeArchiveYear),
      ) ?? archiveYearSummaries.summaries[0],
    [activeArchiveYear, archiveYearSummaries.summaries, previewArchiveYear],
  );

  function setFilter(filter: ActivityFilter) {
    const params = new URLSearchParams(window.location.search);

    if (filter === initialFilter) {
      params.delete("category");
    } else {
      params.set("category", filter);
    }

    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
    window.dispatchEvent(new Event("activity-filter-change"));
  }

  function jumpToArchiveYear(year: string) {
    const target = document.getElementById(`archive-year-${year}`);

    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#archive-year-${year}`);
  }

  function selectArchiveCategory(category: ActivityCategory | "all") {
    const firstYear =
      activityArchiveYears.find((year) =>
        activityArchiveEntries.some(
          (entry) =>
            entry.year === year &&
            (category === "all" ||
              getActivityArchiveCategory(entry) === category),
        ),
      ) ?? activityArchiveYears[0];

    setArchiveCategoryFilter(category);
    setActiveArchiveYear(firstYear);
    setPreviewArchiveYear(null);
  }

  useEffect(() => {
    if (!selectedArchiveEntry) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedArchiveEntry(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArchiveEntry]);

  useEffect(() => {
    const years = archiveYearSummaries.summaries.map((summary) => summary.year);

    if (!years.length) return;

    let frameId = 0;

    function updateActiveYear() {
      const activationLine = window.innerHeight * 0.34;
      let closestYear = years[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      years.forEach((year) => {
        const element = document.getElementById(`archive-year-${year}`);

        if (!element) return;

        const { top } = element.getBoundingClientRect();
        const distance = Math.abs(top - activationLine);

        if (top <= activationLine + 120 && distance < closestDistance) {
          closestDistance = distance;
          closestYear = year;
        }
      });

      setActiveArchiveYear(closestYear);
    }

    function handleScroll() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveYear);
    }

    frameId = window.requestAnimationFrame(updateActiveYear);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [archiveYearSummaries.summaries]);

  const previewEntry = previewYearSummary?.previewEntry;
  const previewImage = previewEntry
    ? (previewEntry.imageSrc ??
      activityArchiveImageMap[previewEntry.id] ??
      getArchiveCoverImage(activityArchiveGalleryMap[previewEntry.id]))
    : undefined;
  const previewEntryCopy = previewEntry
    ? getLocalizedActivityArchiveEntry(previewEntry, locale)
    : undefined;

  return (
    <>
      <section
        id="program-families"
        className="relative bg-[#F7F3EC] px-6 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className={`max-w-3xl ${isRtl ? "mr-auto text-right" : ""}`}>
            <p className="eyebrow-text text-xs font-bold text-[#B86A4A]">
              {copy.families.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl leading-[1.12] text-[#264D3B] sm:text-[2.6rem]">
              {copy.families.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[#2A2A2A]/68 sm:text-[1.04rem]">
              {copy.families.description}
            </p>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {programFamilies.map((family) => {
              const title = getLocalizedText(family.title, locale);
              const label = getLocalizedText(family.label, locale);

              return (
                <article
                  key={family.category}
                  className="group overflow-hidden rounded-[20px] border border-[#E1D4BF]/80 bg-[#FBF8F1] shadow-[0_18px_44px_rgba(38,77,59,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(38,77,59,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {family.imageSrc ? (
                      <Image
                        src={withBasePath(family.imageSrc)}
                        alt={getLocalizedText(family.imageAlt, locale)}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <PosterFallback
                        title={title}
                        label={label}
                        tone={family.fallbackStyle}
                      />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,77,59,0.02),rgba(38,77,59,0.46))]" />
                    <span
                      className={`absolute top-4 rounded-full border border-white/24 bg-white/18 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm ${
                        isRtl ? "right-4" : "left-4"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  <div className={`${isRtl ? "text-right" : ""} p-6`}>
                    <h3 className="text-[1.72rem] leading-[1.1] text-[#264D3B]">
                      {title}
                    </h3>
                    <p className="mt-4 text-[0.98rem] leading-7 text-[#2A2A2A]/66">
                      {getLocalizedText(family.description, locale)}
                    </p>
                    <Link
                      href={getProgramCategoryUrl(family.category, locale)}
                      onClick={(event) => {
                        if (initialFilter === "all" && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
                          event.preventDefault();
                          setFilter(family.category);
                        }
                      }}
                      className="mt-6 inline-flex items-center rounded-full bg-[#264D3B] px-4 py-2.5 text-sm font-bold text-[#F7F3EC] transition hover:-translate-y-0.5 hover:bg-[#315B47]"
                    >
                      {copy.families.filterLabel}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#264D3B] px-6 py-20 text-[#F7F3EC] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div
            className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${
              isRtl ? "text-right" : ""
            }`}
          >
            <div className="max-w-3xl">
              <p className="eyebrow-text text-xs font-bold text-[#E9DFCF]/80">
                {copy.upcoming.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl leading-[1.12] !text-[#F7F3EC] sm:text-[2.55rem]">
                {copy.upcoming.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#F7F3EC]/72">
                {copy.upcoming.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFilter("upcoming")}
              className="inline-flex w-fit rounded-full border border-[#E9DFCF]/42 px-4 py-2.5 text-sm font-bold text-[#F7F3EC] transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              {copy.upcoming.viewAllLabel}
            </button>
          </div>

          {upcomingActivities.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {upcomingActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  copy={copy}
                  locale={locale}
                  isRtl={isRtl}
                  dark
                  referenceDate={referenceDate}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[20px] border border-[#E9DFCF]/24 bg-white/8 p-8 text-[#F7F3EC]/82">
              {copy.upcoming.emptyState}
            </div>
          )}
        </div>
      </section>

      <section
        id="activity-highlights"
        className="bg-[#F7F3EC] px-6 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className={`max-w-3xl ${isRtl ? "mr-auto text-right" : ""}`}>
            <p className="eyebrow-text text-xs font-bold text-[#B86A4A]">
              {copy.highlights.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl leading-[1.12] text-[#264D3B] sm:text-[2.6rem]">
              {copy.highlights.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[#2A2A2A]/68 sm:text-[1.04rem]">
              {copy.highlights.description}
            </p>
          </div>

          <div
            className={`mt-8 flex flex-wrap gap-2.5 ${
              isRtl ? "justify-end" : ""
            }`}
          >
            {availableActivityFilters.map((filter) => {
              const isActive = selectedFilter === filter;

              return (
                <Link
                  key={filter}
                  href={filter === "all" ? getLocalePath(locale, "/programs/") : filter === "upcoming" ? `${getLocalePath(locale, "/programs/")}?category=upcoming#activity-highlights` : getProgramCategoryUrl(filter, locale)}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => {
                    if (initialFilter === "all" && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
                      event.preventDefault();
                      setFilter(filter);
                    }
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "border-[#264D3B] bg-[#264D3B] text-[#F7F3EC] shadow-[0_12px_24px_rgba(38,77,59,0.16)]"
                      : "border-[#D8C9AE] bg-[#FBF8F1] text-[#264D3B]/72 hover:-translate-y-0.5 hover:text-[#264D3B]"
                  }`}
                >
                  {copy.filters[filter]}
                </Link>
              );
            })}
          </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {activityItems.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  copy={copy}
                  locale={locale}
                  isRtl={isRtl}
                  referenceDate={referenceDate}
                  hidden={!visibleActivities.includes(activity)}
                />
              ))}
            </div>
          {!visibleActivities.length ? (
            <div className="mt-10 rounded-[20px] border border-[#D8C9AE] bg-[#FBF8F1] p-7 text-[#2A2A2A]/72">
              {copy.upcoming.emptyState}
            </div>
          ) : null}
        </div>
      </section>

      <section
        id="activity-archive"
        className="relative overflow-visible bg-[#F2E9DC] px-6 py-20 sm:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(255,255,255,0.78),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(184,106,74,0.12),transparent_24%),radial-gradient(circle_at_54%_78%,rgba(38,77,59,0.1),transparent_28%)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <div
            className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
              isRtl ? "text-right" : ""
            }`}
          >
            <div className="max-w-3xl">
              <p className="eyebrow-text text-xs font-bold text-[#B86A4A]">
                {archiveCopy[locale].eyebrow}
              </p>
              <h2 className="mt-4 text-3xl leading-[1.12] text-[#264D3B] sm:text-[2.6rem]">
                {archiveCopy[locale].title}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#2A2A2A]/70 sm:text-[1.04rem]">
                {archiveCopy[locale].description}
              </p>
            </div>
            <div className="rounded-[20px] border border-[#D8C9AE] bg-[#FBF8F1]/78 px-6 py-5 text-[#264D3B] shadow-[0_18px_40px_rgba(38,77,59,0.08)]">
              <p className="text-4xl font-black leading-none">
                {displayedArchiveTotal}
              </p>
              <p className="mt-1 text-sm font-bold">
                {archiveCopy[locale].entryCount}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[15.5rem_1fr] lg:items-start">
            <aside className="self-start">
              <div className="space-y-4">
                <div
                  className={`rounded-[24px] border border-[#D8C9AE]/80 bg-[#FBF8F1]/92 p-5 shadow-[0_18px_42px_rgba(38,77,59,0.08)] ${
                    isRtl ? "text-right" : ""
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B86A4A]">
                    {archiveCopy[locale].filtersTitle}
                  </p>
                  <div className="mt-4 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => selectArchiveCategory("all")}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-black transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B86A4A]/20 ${
                        archiveCategoryFilter === "all"
                          ? "bg-[#264D3B] text-[#F7F3EC] shadow-[0_12px_24px_rgba(38,77,59,0.16)]"
                          : "text-[#264D3B]/76 hover:bg-white/62 hover:text-[#264D3B]"
                      }`}
                    >
                      <span>{archiveCopy[locale].allFamilies}</span>
                      <span className="rounded-full bg-current/10 px-2 py-0.5 text-[0.72rem]">
                        {activityArchiveEntries.length}
                      </span>
                    </button>
                    {archiveCategoryCounts.map(({ category, count }) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => selectArchiveCategory(category)}
                        className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-black transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B86A4A]/20 ${
                          archiveCategoryFilter === category
                            ? "bg-[#264D3B] text-[#F7F3EC] shadow-[0_12px_24px_rgba(38,77,59,0.16)]"
                            : "text-[#264D3B]/76 hover:bg-white/62 hover:text-[#264D3B]"
                        }`}
                      >
                        <span>{copy.filters[category]}</span>
                        <span className="rounded-full bg-current/10 px-2 py-0.5 text-[0.72rem]">
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <nav
                  aria-label={archiveCopy[locale].navigatorTitle}
                  className={`rounded-[26px] border border-[#D8C9AE]/84 bg-[#FBF8F1]/94 p-5 shadow-[0_24px_54px_rgba(38,77,59,0.1)] ${
                    isRtl ? "text-right" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-black leading-tight text-[#264D3B]">
                        {archiveCopy[locale].navigatorTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#2A2A2A]/62">
                        {archiveCopy[locale].navigatorHint}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#264D3B]/8 px-2.5 py-1 text-xs font-black text-[#264D3B]">
                      {displayedArchiveTotal}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#B86A4A]">
                    {archiveCopy[locale].yearsTitle}
                  </p>
                  <div className="relative mt-4 space-y-1.5 before:absolute before:bottom-2 before:left-[0.58rem] before:top-2 before:w-px before:bg-[#D8C9AE]">
                    {activityArchiveYears.map((year) => {
                      const summary = archiveYearSummaries.summaries.find(
                        (item) => item.year === year,
                      );
                      const count = summary?.count ?? 0;
                      const isActive = activeArchiveYear === year && count > 0;
                      const progress =
                        (count / archiveYearSummaries.maxCount) * 100;

                      return (
                        <button
                          key={year}
                          type="button"
                          disabled={!count}
                          onMouseEnter={() => setPreviewArchiveYear(year)}
                          onMouseLeave={() => setPreviewArchiveYear(null)}
                          onFocus={() => setPreviewArchiveYear(year)}
                          onBlur={() => setPreviewArchiveYear(null)}
                          onClick={() => jumpToArchiveYear(year)}
                          className={`group relative flex w-full items-center gap-3 rounded-2xl py-2 pl-7 pr-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B86A4A]/20 ${
                            isActive
                              ? "bg-[#264D3B] text-[#F7F3EC] shadow-[0_14px_28px_rgba(38,77,59,0.16)]"
                              : count
                                ? "text-[#264D3B]/78 hover:bg-white/70 hover:text-[#264D3B]"
                                : "cursor-not-allowed text-[#2A2A2A]/28"
                          }`}
                          aria-current={isActive ? "location" : undefined}
                        >
                          <span
                            className={`absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border transition ${
                              isActive
                                ? "border-[#F7F3EC] bg-[#F7F3EC]"
                                : count
                                  ? "border-[#264D3B] bg-[#FBF8F1] group-hover:bg-[#264D3B]"
                                  : "border-[#D8C9AE] bg-[#F2E9DC]"
                            }`}
                            aria-hidden="true"
                          />
                          <span className="flex min-w-0 flex-1 flex-col gap-1">
                            <span className="flex items-center justify-between gap-3">
                              <span className="text-sm font-black">{year}</span>
                              <span className="text-[0.72rem] font-black opacity-70">
                                {count}
                              </span>
                            </span>
                            <span
                              className={`h-1 overflow-hidden rounded-full ${
                                isActive ? "bg-white/18" : "bg-[#E1D4BF]/72"
                              }`}
                              aria-hidden="true"
                            >
                              <span
                                className={`block h-full rounded-full transition-all duration-300 ${
                                  isActive ? "bg-[#F7F3EC]" : "bg-[#B86A4A]/70"
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {previewEntry ? (
                    <div className="mt-5 overflow-hidden rounded-[20px] border border-[#E1D4BF]/84 bg-white/52">
                      {previewImage ? (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={withBasePath(previewImage)}
                            alt={previewEntryCopy?.title ?? previewEntry.title}
                            fill
                            sizes="240px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,77,59,0.02),rgba(38,77,59,0.34))]" />
                        </div>
                      ) : null}
                      <div
                        className={`p-4 ${isRtl ? "text-right" : "text-left"}`}
                        dir={isRtl ? "rtl" : "ltr"}
                      >
                        <p className="text-[0.7rem] font-black uppercase tracking-[0.16em] text-[#B86A4A]">
                          {archiveCopy[locale].previewTitle} ·{" "}
                          {previewYearSummary?.year}
                        </p>
                        <p className="mt-2 text-sm font-black leading-5 text-[#264D3B]">
                          {previewEntryCopy?.title}
                        </p>
                        <p className="mt-1 text-xs font-bold text-[#2A2A2A]/52">
                          {previewEntryCopy?.date}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </nav>
              </div>
            </aside>

            <div className="space-y-12">
              {archiveYearSummaries.summaries.map(({ year, entries: yearEntries }) => {
                const isActiveYear = activeArchiveYear === year;

              return (
                <div
                  key={year}
                  id={`archive-year-${year}`}
                  data-archive-year={year}
                  className="relative grid scroll-mt-28 gap-5 lg:grid-cols-[8rem_1fr]"
                >
                  <div>
                    <div
                      className={`sticky top-24 rounded-[18px] border px-5 py-4 shadow-[0_16px_34px_rgba(38,77,59,0.12)] transition duration-300 ${
                        isActiveYear
                          ? "border-[#264D3B] bg-[#264D3B] text-[#F7F3EC] shadow-[0_18px_42px_rgba(38,77,59,0.18)]"
                          : "border-[#D8C9AE] bg-[#FBF8F1]/88 text-[#264D3B]"
                      }`}
                    >
                      <h3 className="text-3xl font-black leading-none !text-inherit">
                        <Link href={getLocalePath(locale, `/programs/archive/${year}/`)} className="hover:underline">{year}</Link>
                      </h3>
                      <p
                        className={`mt-2 text-xs font-bold ${
                          isActiveYear ? "text-[#F7F3EC]/68" : "text-[#2A2A2A]/52"
                        }`}
                      >
                        {yearEntries.length} {archiveCopy[locale].entryCount}
                      </p>
                      {isActiveYear ? (
                        <p className="mt-3 rounded-full bg-white/12 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#F7F3EC]/78">
                          {archiveCopy[locale].activeYearLabel}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {yearEntries.map((entry) => {
                      const archiveGallery =
                        activityArchiveGalleryMap[entry.id] ?? [];
                      const archiveImage =
                        entry.imageSrc ??
                        activityArchiveImageMap[entry.id] ??
                        getArchiveCoverImage(archiveGallery);
                      const facebookSources =
                        activityArchiveFacebookSourceMap[entry.id] ?? [];
                      const archiveCategory = getActivityArchiveCategory(entry);
                      const entryCopy = getLocalizedActivityArchiveEntry(
                        entry,
                        locale,
                      );

                      return (
                        <article
                          key={entry.id}
                          id={`archive-story-${entry.id}`}
                          data-category={archiveCategory}
                          className={`group overflow-hidden rounded-[22px] border border-[#D8C9AE]/86 bg-[#FBF8F1]/88 shadow-[0_16px_34px_rgba(38,77,59,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_54px_rgba(38,77,59,0.16)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B86A4A]/26 ${
                            isRtl ? "text-right" : "text-left"
                          }`}
                          dir={isRtl ? "rtl" : "ltr"}
                        >
                          <details>
                          <summary className="block cursor-pointer list-none [&::-webkit-details-marker]:hidden"
                            onClick={(event) => { event.preventDefault(); setSelectedArchiveEntry(entry); }}>
                          <div className="relative aspect-[16/10] overflow-hidden">
                            {archiveImage ? (
                              <Image
                                src={withBasePath(archiveImage)}
                                alt={entryCopy.title}
                                fill
                                sizes="(min-width: 1024px) 42vw, 100vw"
                                className="object-cover transition duration-700 group-hover:scale-[1.06]"
                              />
                            ) : (
                              <ArchiveVisualFallback
                                entry={entry}
                                locale={locale}
                                sourceLabel={archiveCopy[locale].sourceAvailable}
                              />
                            )}
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,77,59,0.02),rgba(38,77,59,0.5))]" />
                            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                              <span className="rounded-full border border-white/24 bg-white/18 px-3 py-1.5 text-xs font-black text-white backdrop-blur-sm">
                                {copy.filters[archiveCategory]}
                              </span>
                              {facebookSources.length ? (
                                <span className="rounded-full bg-[#F7F3EC] px-3 py-1.5 text-xs font-black text-[#264D3B] shadow-[0_10px_22px_rgba(42,42,42,0.16)]">
                                  {archiveCopy[locale].sourceAvailable}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B86A4A]">
                              {entryCopy.date}
                            </p>
                            <h4 className="mt-3 text-[1.35rem] leading-[1.22] text-[#264D3B]">
                              {entryCopy.title}
                            </h4>
                            <p className="mt-4 text-[0.94rem] leading-7 text-[#2A2A2A]/70">
                              {entryCopy.details[0]}
                            </p>
                            <span className="mt-5 inline-flex items-center rounded-full bg-[#264D3B] px-4 py-2 text-xs font-black text-[#F7F3EC] transition group-hover:bg-[#315B47]">
                              {archiveCopy[locale].openDetails}
                            </span>
                          </div>
                          </summary>
                          <div className="space-y-4 p-5"><ArchiveStoryText entry={entry} locale={locale} /></div>
                          </details>
                          <Link href={`${getLocalePath(locale, `/programs/archive/${year}/`)}#${entry.id}`} className="block px-5 pb-5 text-sm font-bold text-[#264D3B] hover:underline">
                            {archiveCopy[locale].openDetails} →
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          <div
            className={`mt-12 rounded-[24px] border border-[#D8C9AE] bg-[#FBF8F1]/82 p-7 shadow-[0_18px_42px_rgba(38,77,59,0.08)] ${
              isRtl ? "text-right" : ""
            }`}
          >
            <h3 className="text-2xl leading-tight text-[#264D3B]">
              {archiveCopy[locale].notesTitle}
            </h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2" dir="rtl" lang="ar">
              {activityArchiveNotes.map((note) => (
                <p
                  key={note}
                  className="rounded-2xl border border-[#E1D4BF]/80 bg-white/48 p-4 text-right text-[0.95rem] leading-7 text-[#2A2A2A]/72"
                >
                  {note}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedArchiveEntry ? (
        <ArchiveEntryModal
          entry={selectedArchiveEntry}
          locale={locale}
          galleryImages={
            activityArchiveGalleryMap[selectedArchiveEntry.id] ??
            [
              selectedArchiveEntry.imageSrc ??
                activityArchiveImageMap[selectedArchiveEntry.id],
            ].filter((image): image is string => Boolean(image))
          }
          facebookSources={
            activityArchiveFacebookSourceMap[selectedArchiveEntry.id] ?? []
          }
          copy={archiveCopy[locale]}
          onClose={() => setSelectedArchiveEntry(null)}
        />
      ) : null}

      <section className="bg-[#EFE4D2] px-6 py-20 sm:px-8">
        <div
          className={`mx-auto grid max-w-6xl gap-8 rounded-[24px] border border-[#D8C9AE] bg-[#FBF8F1]/72 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10 ${
            isRtl ? "text-right" : ""
          }`}
        >
          <div>
            <p className="eyebrow-text text-xs font-bold text-[#B86A4A]">
              {copy.social.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl leading-[1.1] text-[#264D3B]">
              {copy.social.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#2A2A2A]/70">
              {copy.social.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#264D3B] px-5 py-3 text-sm font-bold text-[#F7F3EC] transition hover:-translate-y-0.5 hover:bg-[#315B47]"
            >
              Instagram
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#264D3B]/18 bg-white/58 px-5 py-3 text-sm font-bold text-[#264D3B] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ArchiveEntryModal({
  entry,
  locale,
  galleryImages,
  facebookSources,
  copy,
  onClose,
}: {
  entry: ActivityArchiveEntry;
  locale: Locale;
  galleryImages: string[];
  facebookSources: string[];
  copy: {
    close: string;
    galleryTitle: string;
    sourceAvailable: string;
    viewSource: string;
    viewSourceNumbered: string;
  };
  onClose: () => void;
}) {
  const [activeMedia, setActiveMedia] = useState(galleryImages[0]);
  const activeMediaIsVideo = isVideoMedia(activeMedia);
  const activeVideoPoster = getVideoPoster(activeMedia);
  const entryCopy = getLocalizedActivityArchiveEntry(entry, locale);
  const isRtl = locale === "ar";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={copy.close}
        onClick={onClose}
        className="absolute inset-0 bg-[#17251F]/68 backdrop-blur-sm"
      />
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby={`archive-modal-title-${entry.id}`}
        className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-[#E9DFCF]/70 bg-[#FBF8F1] shadow-[0_34px_90px_rgba(10,22,17,0.34)] [animation:scoutArchivePop_220ms_ease-out]"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#264D3B]/10 bg-[#F7F3EC]/88 text-lg font-black text-[#264D3B] shadow-[0_14px_28px_rgba(42,42,42,0.16)] transition hover:-translate-y-0.5 hover:bg-white"
          aria-label={copy.close}
        >
          ×
        </button>
        <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.08fr_0.92fr]">
          <div className="bg-[#264D3B] p-3 sm:p-4">
            <div className="relative min-h-[18rem] overflow-hidden rounded-[22px] bg-[#264D3B] lg:min-h-[28rem]">
              {activeMedia ? (
                activeMediaIsVideo ? (
                  <video
                    src={withBasePath(activeMedia)}
                    poster={
                      activeVideoPoster ? withBasePath(activeVideoPoster) : undefined
                    }
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full bg-[#17251F] object-contain"
                  />
                ) : (
                  <Image
                    src={withBasePath(activeMedia)}
                    alt={entryCopy.title}
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover"
                    priority
                  />
                )
              ) : (
                <ArchiveVisualFallback
                  entry={entry}
                  locale={locale}
                  sourceLabel={copy.sourceAvailable}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,77,59,0.02),rgba(38,77,59,0.38))]" />
              <div className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-white/22 bg-white/16 px-4 py-2 text-xs font-black text-white backdrop-blur-sm">
                {entry.year}
              </div>
            </div>

            {galleryImages.length > 1 ? (
              <div className="mt-3 rounded-[20px] border border-white/12 bg-white/10 p-3">
                <p
                  className={`mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#F7F3EC]/72 ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                >
                  {copy.galleryTitle}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
                  {galleryImages.map((image, index) => {
                    const videoPoster = getVideoPoster(image);

                    return (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveMedia(image)}
                        className={`relative aspect-square overflow-hidden rounded-2xl border transition hover:-translate-y-0.5 ${
                          image === activeMedia
                            ? "border-[#F7F3EC] ring-2 ring-[#F7F3EC]/40"
                            : "border-white/16 opacity-72 hover:opacity-100"
                        }`}
                        aria-label={`${copy.galleryTitle} ${index + 1}`}
                      >
                        {isVideoMedia(image) ? (
                          <>
                            {videoPoster ? (
                              <Image
                                src={withBasePath(videoPoster)}
                                alt={`${entryCopy.title} video ${index + 1}`}
                                fill
                                sizes="96px"
                                className="object-cover"
                              />
                            ) : (
                              <video
                                src={withBasePath(image)}
                                muted
                                playsInline
                                preload="metadata"
                                className="h-full w-full object-cover"
                              />
                            )}
                            <span className="absolute inset-0 bg-[#17251F]/16" />
                            <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F7F3EC]/92 shadow-[0_10px_20px_rgba(23,37,31,0.24)]">
                              <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-[#264D3B]" />
                            </span>
                            <span className="absolute inset-x-2 bottom-2 rounded-full bg-[#264D3B]/82 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#F7F3EC]">
                              Video
                            </span>
                          </>
                        ) : (
                          <Image
                            src={withBasePath(image)}
                            alt={`${entryCopy.title} ${index + 1}`}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={`p-6 sm:p-8 lg:p-10 ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`flex flex-wrap items-center gap-2 ${
                isRtl ? "justify-end" : "justify-start"
              }`}
            >
              {facebookSources.length ? (
                <span className="rounded-full bg-[#264D3B] px-3 py-1.5 text-xs font-black text-[#F7F3EC]">
                  {copy.sourceAvailable}
                </span>
              ) : null}
              <span className="rounded-full border border-[#D8C9AE] bg-white/58 px-3 py-1.5 text-xs font-black text-[#B86A4A]">
                {entryCopy.date}
              </span>
            </div>
            <h2
              id={`archive-modal-title-${entry.id}`}
              className="mt-5 text-[2rem] leading-[1.08] text-[#264D3B] sm:text-[2.45rem]"
            >
              {entryCopy.title}
            </h2>
            <div className="mt-6 space-y-3.5">
              {entryCopy.details.map((detail, index) => (
                <p
                  key={`${entry.id}-${index}`}
                  className="rounded-2xl border border-[#E1D4BF]/72 bg-white/48 p-4 text-[0.98rem] leading-8 text-[#2A2A2A]/76"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  {detail}
                </p>
              ))}
            </div>

            {facebookSources.length ? (
              <div
                className={`mt-7 flex flex-wrap gap-2.5 ${
                  isRtl ? "justify-end" : "justify-start"
                }`}
              >
                {facebookSources.map((sourceUrl, index) => (
                  <a
                    key={sourceUrl}
                    href={sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#B86A4A] px-4 py-2.5 text-sm font-black text-[#F7F3EC] shadow-[0_14px_28px_rgba(184,106,74,0.18)] transition hover:-translate-y-0.5 hover:bg-[#A85E40]"
                  >
                    {facebookSources.length === 1
                      ? copy.viewSource
                      : `${copy.viewSourceNumbered} ${index + 1}`}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}

function ActivityCard({
  activity,
  copy,
  locale,
  isRtl,
  dark = false,
  referenceDate,
  hidden = false,
}: {
  activity: ActivityItem;
  copy: Messages["programsPage"];
  locale: Locale;
  isRtl?: boolean;
  dark?: boolean;
  referenceDate: string;
  hidden?: boolean;
}) {
  const status = getActivityStatus(activity, referenceDate);
  const categoryFamily = programFamilies.find(
    (family) => family.category === activity.category,
  );
  const title = getLocalizedText(activity.title, locale);
  const categoryLabel = categoryFamily
    ? getLocalizedText(categoryFamily.title, locale)
    : copy.filters[activity.category];
  const location = activity.location
    ? getLocalizedText(activity.location, locale)
    : undefined;
  const cardBase = dark
    ? "border-white/12 bg-[#F7F3EC] text-[#2A2A2A]"
    : "border-[#E1D4BF]/80 bg-[#FBF8F1] text-[#2A2A2A]";

  return (
    <article
      id={dark ? `upcoming-${activity.id}` : activity.id}
      data-activity-id={activity.id}
      data-category={activity.category}
      hidden={hidden}
      className={`${cardBase} group overflow-hidden rounded-[20px] border shadow-[0_18px_42px_rgba(38,77,59,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(38,77,59,0.13)]`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {activity.coverImage ? (
          <Image
            src={withBasePath(activity.coverImage)}
            alt={
              activity.coverAlt
                ? getLocalizedText(activity.coverAlt, locale)
                : title
            }
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <PosterFallback
            title={title}
            label={categoryLabel}
            detail={getLocalizedText(activity.dateLabel, locale)}
            tone={activity.fallbackStyle}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,77,59,0.03),rgba(38,77,59,0.46))]" />
        <div
          className={`absolute top-4 flex flex-wrap gap-2 ${
            isRtl ? "right-4 justify-end" : "left-4"
          }`}
        >
          <span className="rounded-full border border-white/24 bg-white/18 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            {categoryLabel}
          </span>
          {status !== "completed" ? (
            <span className="rounded-full bg-[#F7F3EC] px-3 py-1.5 text-xs font-bold text-[#264D3B]">
              {copy.status[status]}
            </span>
          ) : null}
        </div>
      </div>

      <div className={`${isRtl ? "text-right" : ""} p-6`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B86A4A]">
          <time dateTime={activity.startDate}>{getLocalizedText(activity.dateLabel, locale)}</time>
        </p>
        <h3 className="mt-3 text-[1.72rem] leading-[1.1] text-[#264D3B]">
          <a href={getActivityUrl(activity, locale)} style={{ fontFamily: "inherit" }} className="hover:underline">{title}</a>
        </h3>
        {location ? (
          <p className="mt-2 text-sm font-bold text-[#2A2A2A]/54">{location}</p>
        ) : null}
        <p className="mt-4 text-[0.98rem] leading-7 text-[#2A2A2A]/68">
          {getLocalizedText(activity.shortDescription, locale)}
        </p>
        <div
          className={`mt-6 flex flex-wrap items-center gap-2.5 ${
            isRtl ? "justify-end" : ""
          }`}
        >
          <ShareButton
            activity={activity}
            locale={locale}
            label={copy.actions.share}
            copiedLabel={copy.actions.copied}
          />
          {activity.instagramUrl ? (
            <a
              href={activity.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#264D3B]/12 bg-white/58 px-3 py-2 text-xs font-bold text-[#264D3B] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Instagram
            </a>
          ) : null}
          {activity.facebookUrl ? (
            <a
              href={activity.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#264D3B]/12 bg-white/58 px-3 py-2 text-xs font-bold text-[#264D3B] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Facebook
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
