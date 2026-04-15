import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocaleDocument from "@/components/LocaleDocument";
import RegistrationInterestForm from "@/components/RegistrationInterestForm";
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
}: {
  title: string;
  description?: string;
  align?: "center" | "start";
  isRtl?: boolean;
}) {
  const alignment =
    align === "start" ? (isRtl ? "text-right" : "text-left") : "text-center";
  const maxWidth = align === "start" ? "max-w-2xl" : "mx-auto max-w-3xl";
  const headingClassName = isRtl
    ? "text-[2rem] leading-[1.24] text-[#264D3B] sm:text-[2.58rem]"
    : "text-[2rem] leading-[1.08] text-[#264D3B] sm:text-[2.55rem]";
  const descriptionClassName = isRtl
    ? "mt-5 text-base leading-[2.02] text-[#4B4A45]/72 sm:text-[1.05rem]"
    : "mt-5 text-base leading-[1.9] text-[#4B4A45]/72 sm:text-[1.04rem]";

  return (
    <div className={`${maxWidth} ${alignment}`}>
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

export default function JoinUsPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const copy = messages.joinPage;
  const homePath = getLocalePath(locale);
  const joinPath = getJoinUsPath(locale);
  const sectionAlignment = isRtl ? "lg:text-right" : "lg:text-left";
  const itemAlignment = isRtl ? "lg:items-end" : "lg:items-start";
  const cardTextAlignment = isRtl ? "text-right" : "text-left";
  const heroTitleClassName = isRtl
    ? "mt-4 max-w-[18ch] text-[2.45rem] leading-[1.16] text-[#264D3B] sm:text-[3.05rem] lg:text-[3.75rem]"
    : "mt-4 max-w-[14ch] text-[2.45rem] leading-[1.02] text-[#264D3B] sm:text-[3.1rem] lg:text-[3.85rem]";
  const heroParagraphClassName = isRtl
    ? "text-base leading-[2.05] text-[#4B4A45]/78 sm:text-[1.05rem]"
    : "text-base leading-[1.95] text-[#4B4A45]/78 sm:text-[1.05rem]";
  const sectionIntroClassName = isRtl
    ? "text-base leading-[2] text-[#4B4A45]/74 sm:text-[1.03rem]"
    : "text-base leading-[1.9] text-[#4B4A45]/74 sm:text-[1.02rem]";

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

      <main className="min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#2A2A2A]">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F9F5EE_0%,#F1E6D8_52%,#EEE2D4_100%)] px-6 pb-[4.5rem] pt-28 sm:px-8 sm:pb-[5.5rem] sm:pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(184,106,74,0.12),transparent_22%),radial-gradient(circle_at_72%_84%,rgba(38,77,59,0.08),transparent_26%)]"
          />

          <div className="relative mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#DCCEBB] bg-[linear-gradient(180deg,rgba(251,247,240,0.96)_0%,rgba(247,243,236,0.98)_100%)] shadow-[0_28px_70px_rgba(60,52,42,0.08)]">
              <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

              <div className="grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12 lg:px-12 lg:py-14">
                <div className={`flex flex-col ${itemAlignment} text-center ${sectionAlignment}`}>
                  <p className="eyebrow-text text-xs font-semibold text-[#B86A4A] sm:text-[0.8rem]">
                    {messages.header.joinLabel}
                  </p>
                  <h1 className={heroTitleClassName}>{copy.hero.title}</h1>

                  <EditorialDivider className="mt-7 w-full max-w-[20rem] sm:max-w-[24rem]" />

                  <div className="mt-7 space-y-4 max-w-2xl">
                    {copy.hero.paragraphs.map((paragraph) => (
                      <p key={paragraph} className={heroParagraphClassName}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                    <a
                      href="#how-registration-works"
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CBAE84] bg-[#264D3B] px-6 py-3 text-sm font-semibold text-[#F7F3EC] shadow-[0_12px_28px_rgba(38,77,59,0.18)] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#315B47]"
                    >
                      {copy.hero.primaryCta}
                    </a>
                    <a
                      href="#request-information"
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D9CCB8] bg-[#FBF7F0] px-6 py-3 text-sm font-semibold text-[#264D3B] shadow-[0_10px_22px_rgba(60,52,42,0.06)] transition-[transform,border-color,color] duration-200 hover:-translate-y-px hover:border-[#C9B08A] hover:text-[#B86A4A]"
                    >
                      {copy.hero.secondaryCta}
                    </a>
                  </div>
                </div>

                <aside
                  className={`rounded-[1.75rem] border border-[#E2D6C5] bg-[#FFFDFC]/82 p-6 shadow-[0_18px_36px_rgba(71,61,48,0.05)] sm:p-7 ${cardTextAlignment}`}
                >
                  <p className="eyebrow-text text-[0.72rem] font-semibold text-[#264D3B]/58">
                    {copy.hero.overviewEyebrow}
                  </p>
                  <h2 className="mt-4 text-[1.55rem] leading-[1.15] text-[#264D3B] sm:text-[1.8rem]">
                    {copy.hero.overviewTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#4B4A45]/70">
                    {copy.hero.overviewDescription}
                  </p>

                  <div className="mt-6 space-y-3">
                    {copy.hero.overviewItems.map((item, index) => (
                      <div
                        key={item}
                        className={`flex items-start gap-3 rounded-[1.2rem] border border-[#EEE3D5] bg-[#F9F5EE] px-4 py-3 ${cardTextAlignment}`}
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#264D3B] text-sm font-semibold text-[#F7F3EC]">
                          {index + 1}
                        </span>
                        <p className="pt-0.5 text-sm leading-7 text-[#3E3A35]/78">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section
          id="registration-fees"
          className="bg-[linear-gradient(180deg,#F7F3EC_0%,#FBF7F0_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
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

            <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_0.95fr_1.1fr]">
              {copy.fees.items.map((item) => (
                <article
                  key={item.title}
                  className={`flex h-full flex-col rounded-[1.7rem] border border-[#E0D3C0] bg-[#FFFCF8] p-6 shadow-[0_16px_34px_rgba(60,52,42,0.05)] sm:p-7 ${cardTextAlignment}`}
                >
                  <p className="eyebrow-text text-[0.7rem] font-semibold text-[#264D3B]/52">
                    {copy.fees.cardEyebrow}
                  </p>
                  <h3 className="mt-4 text-[1.45rem] leading-[1.18] text-[#264D3B] sm:text-[1.62rem]">
                    {item.title}
                  </h3>
                  <p className="mt-6 text-[2rem] font-semibold leading-none text-[#264D3B]">
                    {item.amount}
                  </p>
                  <p className="mt-5 flex-1 text-base leading-[1.9] text-[#4B4A45]/72">
                    {item.description}
                  </p>

                  {"details" in item ? (
                    <div className="mt-6 rounded-[1.25rem] border border-[#E8DDD0] bg-[#F8F3EB] px-4 py-4">
                      {item.details.map((detail) => (
                        <p
                          key={detail}
                          className="text-sm leading-7 text-[#4B4A45]/72"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}

              <aside
                className={`rounded-[1.85rem] border border-[#D8C7B2] bg-[linear-gradient(180deg,#FFF8EF_0%,#F3E6D7_100%)] p-6 shadow-[0_18px_36px_rgba(60,52,42,0.06)] sm:p-7 ${cardTextAlignment}`}
              >
                <p className="eyebrow-text text-[0.72rem] font-semibold text-[#B86A4A]">
                  {copy.fees.summaryTitle}
                </p>
                <h3 className="mt-4 text-[1.55rem] leading-[1.15] text-[#264D3B]">
                  {copy.fees.summaryHeading}
                </h3>

                <div className="mt-6 space-y-4">
                  {copy.fees.summary.map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-[1.35rem] border border-[#E6D6C5] bg-[#FFFDFC] px-4 py-4 ${cardTextAlignment}`}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="text-[1.05rem] font-semibold text-[#264D3B]">
                          {item.title}
                        </h4>
                        <p className="text-[1.35rem] font-semibold text-[#264D3B]">
                          {item.amount}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#4B4A45]/72">
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
          id="how-registration-works"
          className="bg-[linear-gradient(180deg,#FBF7F0_0%,#F5EEE4_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading title={copy.process.title} isRtl={isRtl} />

            <div className="mx-auto mt-6 max-w-3xl space-y-3 text-center">
              {copy.process.paragraphs.map((paragraph) => (
                <p key={paragraph} className={sectionIntroClassName}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {copy.process.steps.map((step) => (
                <article
                  key={step.title}
                  className={`rounded-[1.65rem] border border-[#E1D5C5] bg-[#FFFDFC] p-6 shadow-[0_16px_34px_rgba(60,52,42,0.05)] sm:p-7 ${cardTextAlignment}`}
                >
                  <h3 className="text-[1.25rem] leading-[1.18] text-[#264D3B]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.9] text-[#4B4A45]/74">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="required-documents"
          className="bg-[linear-gradient(180deg,#F7F3EC_0%,#FBF8F2_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
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
                  className={`mt-8 rounded-[1.85rem] border border-[#E1D5C4] bg-[#FFFDFC] p-6 shadow-[0_18px_36px_rgba(60,52,42,0.05)] sm:p-7 ${cardTextAlignment}`}
                >
                  <ul className="space-y-3">
                    {copy.documents.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-3 rounded-[1.2rem] border border-[#EFE4D7] bg-[#F9F5EE] px-4 py-4 ${cardTextAlignment}`}
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#264D3B] text-[#F7F3EC]">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-[1.125rem] w-[1.125rem]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m5 13 4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm leading-7 text-[#3E3A35]/78 sm:text-[0.96rem]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside
                className={`rounded-[1.85rem] border border-[#DCCFBE] bg-[linear-gradient(180deg,#FFF9F0_0%,#F6ECDF_100%)] p-6 shadow-[0_18px_36px_rgba(60,52,42,0.05)] sm:p-7 ${cardTextAlignment}`}
              >
                <p className="eyebrow-text text-[0.72rem] font-semibold text-[#B86A4A]">
                  {copy.documents.minorsTitle}
                </p>
                <h3 className="mt-4 text-[1.55rem] leading-[1.15] text-[#264D3B]">
                  {copy.documents.minorsHeading}
                </h3>
                <p className="mt-4 text-base leading-[1.9] text-[#4B4A45]/74">
                  {copy.documents.minorsNote}
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="new-and-returning-scouts"
          className="bg-[linear-gradient(180deg,#F6EEE3_0%,#F1E5D8_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.25rem]"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading title={copy.scouts.title} isRtl={isRtl} />

            <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
              {copy.scouts.paragraphs.map((paragraph, index) => (
                <article
                  key={paragraph}
                  className={`rounded-[1.65rem] border p-6 shadow-[0_16px_34px_rgba(60,52,42,0.05)] sm:p-7 ${
                    index === 1
                      ? "border-[#D7BE9B] bg-[linear-gradient(180deg,#FFF8EF_0%,#F5E8D8_100%)]"
                      : "border-[#E1D5C5] bg-[#FFFDFC]"
                  } ${cardTextAlignment}`}
                >
                  <p className="text-base leading-[1.95] text-[#4B4A45]/76 sm:text-[1.02rem]">
                    {paragraph}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="bg-[linear-gradient(180deg,#FBF8F2_0%,#F6EEE3_100%)] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading title={copy.faq.title} isRtl={isRtl} />

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {copy.faq.items.map((item) => (
                <article
                  key={item.question}
                  className={`rounded-[1.6rem] border border-[#E1D6C6] bg-[#FFFDFC] p-6 shadow-[0_16px_32px_rgba(60,52,42,0.05)] sm:p-7 ${cardTextAlignment}`}
                >
                  <h3 className="text-[1.28rem] leading-[1.2] text-[#264D3B]">
                    {item.question}
                  </h3>
                  <p className="mt-4 text-base leading-[1.9] text-[#4B4A45]/74">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
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

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {copy.contact.methods.map((method) => {
                const opensExternally = method.href.startsWith("http");

                return (
                  <article
                    key={method.label}
                    className={`rounded-[1.65rem] border border-[#E1D5C5] bg-[#FFFDFC] p-6 shadow-[0_16px_32px_rgba(60,52,42,0.05)] sm:p-7 ${cardTextAlignment}`}
                  >
                    <p className="eyebrow-text text-[0.68rem] font-semibold text-[#264D3B]/54">
                      {method.label}
                    </p>
                    <a
                      href={method.href}
                      target={opensExternally ? "_blank" : undefined}
                      rel={opensExternally ? "noreferrer" : undefined}
                      dir={
                        /[A-Za-z@+]/.test(method.value) ? "ltr" : undefined
                      }
                      className={`mt-4 block text-[1.08rem] font-semibold leading-[1.4] text-[#264D3B] transition-colors hover:text-[#B86A4A] ${
                        /[A-Za-z@+]/.test(method.value) ? "text-left" : ""
                      }`}
                    >
                      {method.value}
                    </a>
                    <p className="mt-4 text-sm leading-7 text-[#4B4A45]/72">
                      {method.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#F5EEE4_0%,#EEDFCF_100%)] px-6 pb-10 pt-4 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-6xl">
            <div
              className={`rounded-[1.9rem] border border-[#D9CCB8] bg-[linear-gradient(180deg,#FFF9F2_0%,#F7EBDD_100%)] px-6 py-8 shadow-[0_18px_36px_rgba(60,52,42,0.05)] sm:px-8 sm:py-9 ${cardTextAlignment}`}
            >
              <p className="eyebrow-text text-[0.72rem] font-semibold text-[#B86A4A]">
                {copy.downloads.title}
              </p>
              <h2 className="mt-4 text-[1.85rem] leading-[1.1] text-[#264D3B] sm:text-[2.2rem]">
                {copy.downloads.heading}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-[1.9] text-[#4B4A45]/74 sm:text-[1.02rem]">
                {copy.downloads.description}
              </p>
              <p className="mt-5 inline-flex rounded-full border border-[#D7BE9B]/80 bg-[#FFFDFC] px-4 py-2 text-sm font-medium text-[#264D3B]">
                {copy.downloads.status}
              </p>
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
