import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocaleDocument from "@/components/LocaleDocument";
import RegistrationInterestForm from "@/components/RegistrationInterestForm";
import JoinFaqAccordion from "@/components/JoinFaqAccordion";
import { withBasePath } from "@/lib/site";
import Image from "next/image";
import {
  getDirection,
  getJoinUsPath,
  getLocalePath,
  getMessages,
  type Locale,
} from "@/messages";

function SectionHeading({
  title,
  description,
  align = "center",
  isRtl = false,
  delay = 0,
}: {
  title: string;
  description?: string;
  align?: "center" | "start";
  isRtl?: boolean;
  delay?: number;
}) {
  const alignment =
    align === "start" ? (isRtl ? "text-right" : "text-left") : "text-center";
  const maxWidth = align === "start" ? "max-w-2xl" : "mx-auto max-w-3xl";
  const headingClassName = isRtl
    ? "text-[2rem] leading-[1.24] text-[#36463C] sm:text-[2.58rem]"
    : "text-[2rem] leading-[1.08] text-[#36463C] sm:text-[2.55rem]";
  const descriptionClassName = isRtl
    ? "mt-5 text-base leading-[2.02] text-[#5A554C]/76 sm:text-[1.05rem]"
    : "mt-5 text-base leading-[1.9] text-[#5A554C]/76 sm:text-[1.04rem]";

  return (
    <div
      className={`join-reveal ${maxWidth} ${alignment}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className={headingClassName}>{title}</h2>
      {description ? (
        <p className={descriptionClassName}>{description}</p>
      ) : null}
    </div>
  );
}

function EditorialDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px rounded-full bg-gradient-to-r from-transparent via-[#D3B88A]/70 to-transparent ${className}`}
    />
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.05rem] w-[1.05rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function StepIcon({ index }: { index: number }) {
  const iconClass = "h-5 w-5";

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 10c0 5-9 11-9 11S3 15 3 10a9 9 0 1 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v5h5" />
        <path d="M9 15h6" />
        <path d="M9 11h3" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M20 8v6" />
        <path d="M23 11h-6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16v16H4z" />
      <path d="m8 12 2.4 2.4L16.5 8" />
      <path d="M8 18h8" />
    </svg>
  );
}

function OverviewIcon({ index }: { index: number }) {
  const iconClass = "h-4 w-4";

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3h12v18H6z" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h3" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3 4 7l8 4 8-4-8-4Z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 17 8 4 8-4" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 10c0 5-9 11-9 11S3 15 3 10a9 9 0 1 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16v16H4z" />
      <path d="m8 12 2.4 2.4L16.5 8" />
    </svg>
  );
}

function AudienceIcon({ index }: { index: number }) {
  const iconClass = "h-5 w-5";

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v18" />
        <path d="M7 8c3 0 5 2 5 5-3 0-5-2-5-5Z" />
        <path d="M17 8c-3 0-5 2-5 5 3 0 5-2 5-5Z" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 3 7l9 5 9-5-9-5Z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M20 8v6" />
      <path d="M23 11h-6" />
    </svg>
  );
}

function ContactIcon({ index }: { index: number }) {
  const iconClass = "h-4 w-4";

  if (index === 0) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.28-1.28a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16v16H4z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClass}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

export default function JoinUsPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const copy = messages.joinPage;
  const homePath = getLocalePath(locale);
  const joinPath = getJoinUsPath(locale);
  const rowDirection = isRtl ? "flex-row-reverse" : "";
  const sectionAlignment = isRtl ? "lg:text-right" : "lg:text-left";
  const itemAlignment = isRtl ? "lg:items-end" : "lg:items-start";
  const cardTextAlignment = isRtl ? "text-right" : "text-left";
  const heroTitleClassName = isRtl
    ? "mt-4 max-w-[18ch] text-[2.45rem] leading-[1.16] text-[#35463C] sm:text-[3.05rem] lg:text-[3.78rem]"
    : "mt-4 max-w-[14ch] text-[2.45rem] leading-[1.02] text-[#35463C] sm:text-[3.1rem] lg:text-[3.88rem]";
  const heroParagraphClassName = isRtl
    ? "text-base leading-[2.05] text-[#5B554D]/78 sm:text-[1.05rem]"
    : "text-base leading-[1.95] text-[#5B554D]/78 sm:text-[1.05rem]";
  const sectionIntroClassName = isRtl
    ? "text-base leading-[2] text-[#5B554D]/76 sm:text-[1.03rem]"
    : "text-base leading-[1.9] text-[#5B554D]/76 sm:text-[1.02rem]";

  const pageNavigation = messages.navigation.map((item) => ({
    ...item,
    href: item.href === "#contact" ? "#contact-info" : `${homePath}${item.href}`,
  }));

  return (
    <div lang={locale} dir={direction} className="locale-root">
      <LocaleDocument locale={locale} />
      <Header
        locale={locale}
        navigation={pageNavigation}
        languageLabels={messages.languageLabels}
        copy={messages.header}
        brandHref={homePath}
        joinHref={joinPath}
      />

      <main className="join-page min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#403D37]">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FBF7EF_0%,#F2E8DB_58%,#F7F3EC_100%)] px-6 pb-[4.5rem] pt-28 sm:px-8 sm:pb-[5.75rem] sm:pt-32">
          <div
            aria-hidden="true"
            className="join-soft-drift pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.82),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(184,106,74,0.09),transparent_24%),radial-gradient(circle_at_64%_82%,rgba(95,116,91,0.1),transparent_30%)]"
          />

          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div
              className={`join-reveal flex flex-col ${itemAlignment} text-center ${sectionAlignment}`}
            >
              <p className="eyebrow-text text-xs font-semibold text-[#A66E4C] sm:text-[0.8rem]">
                {copy.hero.eyebrow}
              </p>
              <h1 className={heroTitleClassName}>{copy.hero.title}</h1>

              <EditorialDivider className="mt-7 w-full max-w-[20rem] sm:max-w-[24rem]" />

              <div className="mt-7 max-w-2xl space-y-4">
                {copy.hero.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={heroParagraphClassName}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-7 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                {copy.hero.reassuranceItems.map((item, index) => (
                  <div
                    key={item}
                    className={`join-reveal flex items-center gap-3 rounded-[1rem] border border-[#DAD0C0]/80 bg-[#FFFDFC]/66 px-4 py-3 text-sm font-medium text-[#415B4C] shadow-[0_10px_24px_rgba(60,52,42,0.035)] backdrop-blur-sm ${rowDirection}`}
                    style={{ animationDelay: `${120 + index * 80}ms` }}
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[#4E6B59]">
                      <CheckIcon />
                    </span>
                    <span className={isRtl ? "leading-7" : "leading-6"}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#how-registration-works"
                  className="join-cta-glow inline-flex min-h-12 items-center justify-center rounded-full border border-[#CDB98E] bg-[#2E4D3F] px-6 py-3 text-sm font-semibold text-[#F8F2E8] shadow-[0_16px_34px_rgba(46,77,63,0.2)] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#365946]"
                >
                  {copy.hero.primaryCta}
                </a>
                <a
                  href="#request-information"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D9CCB8] bg-[#FBF7F0]/82 px-6 py-3 text-sm font-semibold text-[#415B4C] shadow-[0_10px_22px_rgba(60,52,42,0.045)] transition-[transform,border-color,color] duration-200 hover:-translate-y-px hover:border-[#C9B08A] hover:text-[#A96545]"
                >
                  {copy.hero.secondaryCta}
                </a>
              </div>
            </div>

            <aside
              className={`join-reveal relative overflow-hidden rounded-[2.15rem] border border-[#DFD3C2]/90 bg-[#F8F1E8] p-2 shadow-[0_28px_68px_rgba(73,64,51,0.1)] lg:max-w-[29rem] lg:justify-self-end ${cardTextAlignment}`}
              style={{ animationDelay: "120ms" }}
            >
              <div className="relative aspect-[4/5] min-h-[29rem] overflow-hidden rounded-[1.75rem] sm:min-h-[31rem]">
                <Image
                  src={withBasePath("/join/join-hero-camp-2024.jpg")}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="join-hero-photo object-cover object-[46%_72%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,247,240,0.22)_0%,rgba(238,224,205,0.08)_35%,rgba(61,75,61,0.34)_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 shadow-[inset_0_0_90px_rgba(52,58,45,0.25),inset_0_0_0_1px_rgba(255,255,255,0.28)]"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-[1.25rem] border border-[#F7F0E4]/60 bg-[#F8F0E6]/78 p-4 text-[#35463C] shadow-[0_18px_38px_rgba(58,64,49,0.14)] backdrop-blur-md sm:p-5">
                  <p className="eyebrow-text text-[0.66rem] font-semibold text-[#8D7253]">
                    {copy.hero.mediaEyebrow}
                  </p>
                  <h2 className="mt-2 text-[1.32rem] leading-[1.18] text-[#35463C] sm:text-[1.55rem]">
                    {copy.hero.mediaTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[#5B554D]/78">
                    {copy.hero.mediaDescription}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#F7F3EC] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={copy.overview.title}
              description={copy.overview.description}
              isRtl={isRtl}
            />

            <div className="join-reveal mt-12 rounded-[1.6rem] border border-[#DED4C5]/85 bg-[#FFFDF8]/72 p-2 shadow-[0_18px_42px_rgba(70,61,49,0.055)] backdrop-blur-sm">
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {copy.overview.items.map((item, index) => (
                <article
                  key={item.label}
                  className={`join-reveal rounded-[1.15rem] border border-transparent bg-[#FFFDFC]/62 p-5 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#FFFDFC] ${cardTextAlignment}`}
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E9EFE4] text-[#55705E]">
                    <OverviewIcon index={index} />
                  </span>
                  <p className="mt-5 text-[1.78rem] font-semibold leading-none text-[#3E5A4A]">
                    {item.value}
                  </p>
                  <h3 className="mt-4 text-[1.14rem] leading-[1.2] text-[#36463C]">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5B554D]/72">
                    {item.description}
                  </p>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="registration-fees"
          className="bg-[linear-gradient(180deg,#FBF7F0_0%,#F3E9DC_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading title={copy.fees.title} isRtl={isRtl} />

            <div className="mx-auto mt-6 max-w-3xl space-y-3 text-center">
              {copy.fees.introduction.map((paragraph) => (
                <p key={paragraph} className={sectionIntroClassName}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-5 sm:grid-cols-2">
                {copy.fees.items.map((item, index) => (
                  <article
                    key={item.title}
                  className={`join-reveal flex h-full flex-col rounded-[1.25rem] border border-[#E0D3C0]/85 bg-[#FFFCF8]/86 p-6 shadow-[0_14px_30px_rgba(60,52,42,0.04)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-7 ${cardTextAlignment}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                    <p className="eyebrow-text text-[0.7rem] font-semibold text-[#617766]/68">
                      {copy.fees.cardEyebrow}
                    </p>
                    <h3 className="mt-4 text-[1.45rem] leading-[1.18] text-[#36463C] sm:text-[1.62rem]">
                      {item.title}
                    </h3>
                    <p className="mt-6 text-[2.2rem] font-semibold leading-none text-[#3E5A4A]">
                      {item.amount}
                    </p>
                    <p className="mt-5 flex-1 text-base leading-[1.9] text-[#5B554D]/72">
                      {item.description}
                    </p>

                    {"details" in item ? (
                      <div className="mt-6 border-t border-[#E8DDD0] pt-4">
                        {item.details.map((detail) => (
                          <p
                            key={detail}
                            className="text-sm leading-7 text-[#5B554D]/72"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>

              <aside
                className={`join-reveal rounded-[1.35rem] border border-[#C8D1C0] bg-[linear-gradient(180deg,#EEF3EA_0%,#E5EADA_100%)] p-6 text-[#36463C] shadow-[0_18px_38px_rgba(65,83,61,0.09)] sm:p-7 ${cardTextAlignment}`}
                style={{ animationDelay: "120ms" }}
              >
                <p className="eyebrow-text text-[0.72rem] font-semibold text-[#8D7253]">
                  {copy.fees.summaryTitle}
                </p>
                <h3 className="mt-4 text-[1.8rem] leading-[1.15] text-[#36463C] sm:text-[2.1rem]">
                  {copy.fees.summaryHeading}
                </h3>

                <div className="mt-7 divide-y divide-[#4E6B59]/14">
                  {copy.fees.summary.map((item) => (
                    <div
                      key={item.title}
                      className="grid gap-3 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="text-[1.04rem] font-semibold text-[#3B4E42]">
                          {item.title}
                        </h4>
                        <p className="shrink-0 text-[1.65rem] font-semibold text-[#3E5A4A]">
                          {item.amount}
                        </p>
                      </div>
                      <p className="text-sm leading-7 text-[#5B554D]/74">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="who-registration-is-for"
          className="bg-[linear-gradient(180deg,#F6EEE3_0%,#FBF8F2_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.25rem]"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={copy.audiences.title}
              description={copy.audiences.description}
              isRtl={isRtl}
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {copy.audiences.items.map((item, index) => (
                <article
                  key={item.title}
                  className={`join-reveal rounded-[1.28rem] border p-6 shadow-[0_14px_30px_rgba(60,52,42,0.04)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-7 ${
                    index === 0
                      ? "border-[#D7BE9B]/80 bg-[linear-gradient(180deg,#FFF8EF_0%,#F6EBDD_100%)]"
                      : index === 1
                        ? "border-[#D9CCB8]/90 bg-[#FFFDFC]/88"
                        : "border-[#CDD6C3] bg-[#EEF3EA]"
                  } ${cardTextAlignment}`}
                  style={{ animationDelay: `${index * 85}ms` }}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E3EBDD] text-[#55705E]">
                    <AudienceIcon index={index} />
                  </span>
                  <h3 className="mt-5 text-[1.42rem] leading-[1.18] text-[#36463C]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.95] text-[#5B554D]/76 sm:text-[1.02rem]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="required-documents"
          className="bg-[linear-gradient(180deg,#FBF8F2_0%,#F7F3EC_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <SectionHeading
                  title={copy.documents.title}
                  description={copy.documents.introduction}
                  align="start"
                  isRtl={isRtl}
                />

                <div
                  className={`join-reveal mt-8 rounded-[1.35rem] border border-[#E1D5C4]/90 bg-[#FFFDFC]/84 p-5 shadow-[0_16px_34px_rgba(60,52,42,0.04)] sm:p-6 ${cardTextAlignment}`}
                  style={{ animationDelay: "90ms" }}
                >
                  <ul className="space-y-2">
                    {copy.documents.items.map((item, index) => (
                      <li
                        key={item}
                        className={`join-reveal flex items-start gap-3 rounded-[0.9rem] px-2 py-2.5 transition-colors duration-300 hover:bg-[#F8F2E9]/70 ${rowDirection} ${cardTextAlignment}`}
                        style={{ animationDelay: `${140 + index * 60}ms` }}
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[#4E6B59]">
                          <CheckIcon />
                        </span>
                        <span className="text-sm leading-7 text-[#4F4B43]/78 sm:text-[0.96rem]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside
                className={`join-reveal rounded-[1.35rem] border border-[#D6C3A8]/90 bg-[linear-gradient(180deg,#FFF5EA_0%,#F7EADF_100%)] p-6 shadow-[0_16px_34px_rgba(60,52,42,0.045)] sm:p-7 ${cardTextAlignment}`}
                style={{ animationDelay: "120ms" }}
              >
                <div
                  className={`flex items-start gap-4 ${rowDirection}`}
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0DED0] text-[#A96545]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="eyebrow-text text-[0.72rem] font-semibold text-[#A96545]">
                      {copy.documents.minorsTitle}
                    </p>
                    <h3 className="mt-4 text-[1.55rem] leading-[1.15] text-[#36463C]">
                      {copy.documents.minorsHeading}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 text-base leading-[1.9] text-[#5B554D]/78">
                  {copy.documents.minorsNote}
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="how-registration-works"
          className="bg-[linear-gradient(180deg,#F5EEE4_0%,#EFE2D2_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={copy.process.title}
              description={copy.process.description}
              isRtl={isRtl}
            />

            <div className="relative mt-14">
              <div
                aria-hidden="true"
                className="join-process-line absolute left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] top-8 hidden h-px origin-left bg-gradient-to-r from-[#CBAE84]/20 via-[#A96545]/38 to-[#617766]/30 xl:block"
              />

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {copy.process.steps.map((step, index) => (
                  <article
                    key={step.title}
                    className={`join-reveal relative rounded-[1.28rem] border border-[#E1D5C5]/90 bg-[#FFFDFC]/86 p-6 shadow-[0_14px_30px_rgba(60,52,42,0.04)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-7 ${cardTextAlignment}`}
                    style={{ animationDelay: `${index * 95}ms` }}
                  >
                    {index < copy.process.steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={`absolute top-8 hidden h-px bg-gradient-to-r from-[#CBAE84]/30 via-[#A96545]/35 to-[#617766]/25 xl:block ${
                          isRtl
                            ? "left-[-1.6rem] right-[5.2rem]"
                            : "left-[5.2rem] right-[-1.6rem]"
                        }`}
                      />
                    ) : null}
                    <div
                      className={`flex items-center gap-3 ${rowDirection}`}
                    >
                      <span className="relative z-10 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#C9D2C3] bg-[#EEF3EA] text-[#4E6B59] shadow-[0_12px_24px_rgba(65,83,61,0.075)]">
                        <StepIcon index={index} />
                      </span>
                      <span className="text-sm font-semibold text-[#A96545]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[1.25rem] leading-[1.18] text-[#36463C]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-[1.9] text-[#5B554D]/74">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div
              className={`join-reveal mx-auto mt-9 flex max-w-4xl items-start gap-4 rounded-full border border-[#D8C7B2]/90 bg-[#FFF8EF]/92 px-5 py-4 shadow-[0_14px_30px_rgba(60,52,42,0.055)] backdrop-blur-sm sm:items-center sm:px-6 ${rowDirection} ${cardTextAlignment}`}
              style={{ animationDelay: "280ms" }}
            >
              <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[#4E6B59] sm:mt-0">
                <CheckIcon />
              </span>
              <p className={sectionIntroClassName}>{copy.process.note}</p>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="bg-[linear-gradient(180deg,#FBF8F2_0%,#F6EEE3_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
        >
          <div className="mx-auto max-w-4xl">
            <SectionHeading title={copy.faq.title} isRtl={isRtl} />
            <JoinFaqAccordion items={copy.faq.items} isRtl={isRtl} />
          </div>
        </section>

        <section
          id="request-information"
          className="bg-[linear-gradient(180deg,#F7F3EC_0%,#EEE1D1_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className={sectionAlignment}>
                <SectionHeading
                  title={copy.form.title}
                  description={copy.form.introduction}
                  align="start"
                  isRtl={isRtl}
                />
                <div className="join-reveal mt-8 space-y-3" style={{ animationDelay: "120ms" }}>
                  {copy.form.reassuranceItems.map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-full border border-[#DED2C1]/85 bg-[#FFFDFC]/62 px-4 py-3 text-sm font-medium text-[#415B4C] shadow-[0_10px_22px_rgba(60,52,42,0.035)] ${rowDirection}`}
                      style={{ animationDelay: `${160 + index * 60}ms` }}
                    >
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[#4E6B59]">
                        <CheckIcon />
                      </span>
                      <span className={isRtl ? "leading-7" : "leading-6"}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <RegistrationInterestForm copy={copy.form} isRtl={isRtl} />
            </div>
          </div>
        </section>

        <section
          id="contact-info"
          className="bg-[linear-gradient(180deg,#FBF8F2_0%,#F5EEE4_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.25rem]"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={copy.contact.title}
              description={copy.contact.introduction}
              isRtl={isRtl}
            />
            <p className="join-reveal mx-auto mt-6 max-w-2xl text-center text-base leading-[1.9] text-[#5B554D]/74">
              {copy.contact.closing}
            </p>

            <div className="mx-auto mt-12 grid max-w-[80rem] gap-5 sm:grid-cols-2 xl:gap-6 2xl:grid-cols-4">
              {copy.contact.methods.map((method, index) => {
                const opensExternally = method.href.startsWith("http");
                const valueIsLtr = /[A-Za-z@+]/.test(method.value);

                return (
                  <article
                    key={method.label}
                    className={`join-reveal flex h-full min-h-[16rem] flex-col rounded-[1.18rem] border border-[#E1D5C5]/90 bg-[#FFFDFC]/84 p-6 shadow-[0_14px_30px_rgba(60,52,42,0.04)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-7 xl:min-h-[17rem] xl:p-8 ${cardTextAlignment}`}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className={`flex items-center gap-3 ${rowDirection}`}>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[#4E6B59]">
                        <ContactIcon index={index} />
                      </span>
                      <p className="eyebrow-text text-[0.68rem] font-semibold text-[#617766]/68">
                        {method.label}
                      </p>
                    </div>
                    <a
                      href={method.href}
                      target={opensExternally ? "_blank" : undefined}
                      rel={opensExternally ? "noreferrer" : undefined}
                      dir={valueIsLtr ? "ltr" : undefined}
                      className={`mt-5 block min-h-[3.4rem] break-words text-[1.02rem] font-semibold leading-[1.45] text-[#36463C] transition-colors hover:text-[#A96545] sm:text-[1.08rem] xl:min-h-[4rem] xl:text-[1.12rem] ${
                        valueIsLtr ? "text-left" : ""
                      }`}
                    >
                      {method.value}
                    </a>
                    <p className="mt-auto pt-5 text-sm leading-7 text-[#5B554D]/72">
                      {method.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <Footer
          copy={messages.footer}
          navigation={pageNavigation}
          isRtl={isRtl}
          joinHref={joinPath}
        />
      </main>
    </div>
  );
}
