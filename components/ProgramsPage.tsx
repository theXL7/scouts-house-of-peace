import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocaleDocument from "@/components/LocaleDocument";
import ProgramsActivityExplorer from "@/components/ProgramsActivityExplorer";
import { getUpcomingEventStructuredData } from "@/lib/activities";
import { getSocialProfileUrls, serializeJsonLd } from "@/lib/seo";
import { withBasePath } from "@/lib/site";
import {
  getDirection,
  getJoinUsPath,
  getLocalePath,
  getMessages,
  type Locale,
} from "@/messages";

function getPageNavigation(locale: Locale) {
  const homePath = getLocalePath(locale);

  return getMessages(locale).navigation.map((item) => {
    if (item.href.startsWith("#")) {
      return { ...item, href: `${homePath}${item.href}` };
    }

    return item;
  });
}

const archiveCtaByLocale: Record<Locale, string> = {
  en: "Open full archive",
  fr: "Voir l'archive complète",
  ar: "افتح الأرشيف الكامل",
};

export default function ProgramsPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const copy = messages.programsPage;
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const socials = getSocialProfileUrls();
  const eventJsonLd = getUpcomingEventStructuredData(locale);

  return (
    <div lang={locale} dir={direction} className="locale-root">
      <LocaleDocument locale={locale} />
      {eventJsonLd.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(eventJsonLd),
          }}
        />
      ) : null}
      <Header
        locale={locale}
        navigation={getPageNavigation(locale)}
        languageLabels={messages.languageLabels}
        copy={messages.header}
        brandHref={getLocalePath(locale)}
        joinHref={getJoinUsPath(locale)}
      />
      <main className="min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#2A2A2A]">
        <section className="relative isolate overflow-hidden bg-[#264D3B] px-6 pb-24 pt-36 text-[#F7F3EC] sm:px-8 sm:pb-28 sm:pt-40">
          <Image
            src={withBasePath(
              "/activities/programme/programs-header-background.png",
            )}
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover opacity-85"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(38,77,59,0.72),rgba(38,77,59,0.46)_44%,rgba(38,77,59,0.2)),linear-gradient(180deg,rgba(38,77,59,0.34),rgba(38,77,59,0.62))]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgba(233,223,207,0.24),transparent_22rem),radial-gradient(circle_at_82%_22%,rgba(184,106,74,0.22),transparent_24rem),linear-gradient(135deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:auto,auto,28px_28px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 z-0 h-48 w-[72%] -translate-x-1/2 rounded-[100%] bg-[#F7F3EC]/12 blur-3xl"
          />

          <div
            className={`relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.75fr] lg:items-end ${
              isRtl ? "text-right" : ""
            }`}
          >
            <div>
              <p className="eyebrow-text text-xs font-bold text-[#E9DFCF]/78">
                {copy.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-[3.35rem] leading-[0.95] !text-[#F7F3EC] sm:text-[5rem]">
                {copy.hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-9 text-[#F7F3EC]/76">
                {copy.hero.subtitle}
              </p>
              <div
                className={`mt-8 flex flex-wrap gap-3 ${
                  isRtl ? "justify-end" : ""
                }`}
              >
                <Link
                  href="#activity-highlights"
                  className="rounded-full bg-[#F7F3EC] px-5 py-3 text-sm font-bold text-[#264D3B] shadow-[0_14px_30px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
                >
                  {copy.hero.primaryCta}
                </Link>
                <Link
                  href="#activity-archive"
                  className="rounded-full border border-[#F7F3EC]/34 bg-[#F7F3EC]/10 px-5 py-3 text-sm font-bold text-[#F7F3EC] transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {archiveCtaByLocale[locale]}
                </Link>
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#F7F3EC]/34 px-5 py-3 text-sm font-bold text-[#F7F3EC] transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {copy.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#F7F3EC]/16 bg-[#F7F3EC]/10 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E9DFCF]/80">
                {copy.hero.posterKicker}
              </p>
              <h2 className="mt-6 max-w-[10ch] text-[2.5rem] leading-[1.02] !text-[#F7F3EC]">
                {copy.hero.posterTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#F7F3EC]/72">
                {copy.hero.posterText}
              </p>
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <ProgramsActivityExplorer
            copy={copy}
            locale={locale}
            isRtl={isRtl}
          />
        </Suspense>

        <section className="bg-[#F7F3EC] px-6 py-20 sm:px-8">
          <div
            className={`mx-auto max-w-5xl rounded-[28px] bg-[#264D3B] p-8 text-[#F7F3EC] shadow-[0_24px_70px_rgba(38,77,59,0.18)] sm:p-10 ${
              isRtl ? "text-right" : "text-center"
            }`}
          >
            <p className="eyebrow-text text-xs font-bold text-[#E9DFCF]/76">
              {copy.finalCta.eyebrow}
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-[1.12] !text-[#F7F3EC] sm:text-[2.65rem]">
              {copy.finalCta.title}
            </h2>
            <div
              className={`mt-8 flex flex-wrap gap-3 ${
                isRtl ? "justify-end" : "justify-center"
              }`}
            >
              <Link
                href={getJoinUsPath(locale)}
                className="rounded-full bg-[#F7F3EC] px-5 py-3 text-sm font-bold text-[#264D3B] transition hover:-translate-y-0.5"
              >
                {copy.finalCta.joinLabel}
              </Link>
              <Link
                href={`${getLocalePath(locale)}#contact`}
                className="rounded-full border border-[#F7F3EC]/34 px-5 py-3 text-sm font-bold text-[#F7F3EC] transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                {copy.finalCta.contactLabel}
              </Link>
            </div>
          </div>
        </section>

        <Footer
          copy={messages.footer}
          navigation={getPageNavigation(locale)}
          isRtl={isRtl}
          joinHref={getJoinUsPath(locale)}
        />
      </main>
    </div>
  );
}
