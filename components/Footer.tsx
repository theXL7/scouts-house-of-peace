import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/site";
import type { Messages } from "@/messages/en";

type NavigationItem = Messages["navigation"][number];
type ContactIconName = "phone" | "mail" | "facebook" | "instagram";

const COPYRIGHT_YEAR = 2026;
const LOGO_SRC = "/logos/scouts-maison-paix-green-logo.png";
const PHONE_NUMBER = "+212 6571 71003";
const PHONE_HREF = "tel:+212657171003";
const EMAIL_ADDRESS = "contact@scoutsmaisonpaix.org";
const EMAIL_HREF = "mailto:contact@scoutsmaisonpaix.org";
const FACEBOOK_LABEL = "كشافة دار السلام المغربية";
const FACEBOOK_HREF = "https://www.facebook.com/profile.php?id=100067192446286";
const INSTAGRAM_LABEL = "scoutsmaisondelapaix";
const INSTAGRAM_HREF = "https://www.instagram.com/scoutsmaisondelapaix/";

function ContactIcon({ name }: { name: ContactIconName }) {
  const iconClassName = "h-3.5 w-3.5";

  if (name === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.28-1.28a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16v16H4z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="16" height="16" x="4" y="4" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.7 7.3h.01" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.7h2.58l.39-3H13.5V8.4c0-.87.24-1.46 1.49-1.46h1.59V4.25A21.4 21.4 0 0 0 14.26 4c-2.3 0-3.88 1.4-3.88 3.98v2.32H7.77v3h2.61V21h3.12Z" />
    </svg>
  );
}

function DividerMark() {
  return (
    <div className="relative mt-3 flex items-center justify-center" aria-hidden="true">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#DCCFB6]/85 to-transparent" />
      <span className="absolute inline-flex h-10 w-16 items-center justify-center bg-[#F8F2E8] text-[#3E6B57]/80">
        <svg
          viewBox="0 0 48 20"
          className="h-6 w-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 13c9.5-8.5 22.5-8.5 32 0" />
          <path d="M18 8.5c-4.4.4-6.7-1.8-7.9-5.2 3.4.4 6.1 1.9 7.9 5.2Z" />
          <path d="M24 7c-3.8-1-5.4-3.5-4.8-6.6 3.1 1.2 4.6 3.3 4.8 6.6Z" />
          <path d="M30 8.5c4.4.4 6.7-1.8 7.9-5.2-3.4.4-6.1 1.9-7.9 5.2Z" />
        </svg>
      </span>
    </div>
  );
}

export default function Footer({
  copy,
  navigation,
  isRtl = false,
  joinHref,
}: {
  copy: Messages["footer"];
  navigation: readonly NavigationItem[];
  isRtl?: boolean;
  joinHref: string;
}) {
  const footerLinks = [
    ...navigation.filter((link) => !link.href.includes("#contact")).slice(0, 3),
    { label: copy.joinLabel, href: joinHref },
  ];
  const copyright = copy.copyright.replace("{year}", String(COPYRIGHT_YEAR));
  const sectionTextAlign = isRtl ? "text-right" : "text-left";
  const identityAlign = isRtl
    ? "items-center md:items-end"
    : "items-center md:items-start";
  const linkAlign = isRtl ? "items-start text-right" : "items-start text-left";
  const contactAlign = isRtl
    ? "items-start text-right"
    : "items-start text-left";
  const columnDivider = isRtl
    ? "md:border-r md:border-[#DCCFB6]/60 md:pr-7 lg:pr-9"
    : "md:border-l md:border-[#DCCFB6]/60 md:pl-7 lg:pl-9";
  const sectionHeadingClassName = isRtl
    ? "text-[0.88rem] font-semibold leading-7 text-[#1F2A24]/82"
    : "text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1F2A24]/86";
  const contactLabelClassName = isRtl
    ? "block text-[0.82rem] font-semibold leading-7 text-[#6F7C70]"
    : "block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#6F7C70]";
  const titleLineClassName = isRtl
    ? "mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-[#CDAE7B]/85 to-[#CDAE7B]/30 sm:ml-auto sm:mr-0"
    : "mx-auto mt-4 h-px w-28 bg-gradient-to-r from-[#CDAE7B]/85 via-[#CDAE7B]/55 to-transparent sm:ml-0 sm:mr-auto";
  const identityTitleClassName = isRtl
    ? "max-w-[13ch] text-[2.12rem] leading-[1.48] text-[#1F2A24] sm:text-[2.42rem] lg:text-[2.55rem]"
    : "max-w-[15ch] text-[2.08rem] leading-[1.03] text-[#1F2A24] sm:text-[2.42rem] lg:text-[2.62rem]";
  const descriptionClassName = isRtl
    ? "mt-6 max-w-xl text-[1rem] leading-[2.15] text-[#6F7C70] md:max-w-[30rem]"
    : "mt-6 max-w-xl text-[1rem] leading-[2] text-[#6F7C70] md:max-w-[31rem]";
  const contactItems = [
    {
      icon: "phone" as const,
      label: copy.phoneLabel,
      value: PHONE_NUMBER,
      href: PHONE_HREF,
      valueDirection: "ltr" as const,
    },
    {
      icon: "mail" as const,
      label: copy.emailLabel,
      value: EMAIL_ADDRESS,
      href: EMAIL_HREF,
      valueDirection: "ltr" as const,
    },
    {
      icon: "facebook" as const,
      label: copy.facebookPlatform,
      value: FACEBOOK_LABEL,
      href: FACEBOOK_HREF,
      external: true,
      valueDirection: "rtl" as const,
    },
    {
      icon: "instagram" as const,
      label: copy.instagramPlatform,
      value: INSTAGRAM_LABEL,
      href: INSTAGRAM_HREF,
      external: true,
      valueDirection: "ltr" as const,
    },
  ];

  return (
    <footer
      id="contact"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative mt-24 overflow-hidden bg-[linear-gradient(180deg,#FBF8F1_0%,#F6F1E6_52%,#EEE5D6_100%)] px-4 pb-10 pt-2 sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(233,223,207,0.42),transparent_38%),radial-gradient(circle_at_12%_22%,rgba(62,107,87,0.11),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(184,106,74,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.48),rgba(246,241,230,0))]"
      />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#DCCFB6]/55 bg-[#FBF8F1] shadow-[0_24px_80px_rgba(31,42,36,0.11)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(251,248,241,0.93)_38%,rgba(246,241,230,0.96)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[58%] -translate-x-1/2 rounded-full bg-[#E9DFCF]/38 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-[#3E6B57]/9 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 bottom-0 h-64 w-64 rounded-full bg-[#E9DFCF]/48 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-10 h-56 w-44 rounded-full bg-[#B86A4A]/8 blur-3xl"
        />

        <div className="relative grid gap-9 px-8 pb-8 pt-12 md:grid-cols-[1.55fr_0.72fr_1fr] md:gap-8 md:px-12 md:pb-6 md:pt-12 lg:px-16">
          <section className={`flex flex-col ${identityAlign} ${sectionTextAlign}`}>
            <div className="flex max-w-lg flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="relative h-[6.6rem] w-[6.6rem] shrink-0 -translate-y-2 sm:h-[7.25rem] sm:w-[7.25rem] sm:-translate-y-3">
                <Image
                  src={withBasePath(LOGO_SRC)}
                  alt=""
                  aria-hidden="true"
                  width={128}
                  height={128}
                  sizes="(min-width: 640px) 116px, 106px"
                  className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(31,42,36,0.08)]"
                />
              </div>

              <div className={isRtl ? "text-center sm:text-right" : "text-center sm:text-left"}>
                <h2 className={identityTitleClassName}>{copy.title}</h2>
                <div className={titleLineClassName} aria-hidden="true" />
              </div>
            </div>

            <p className={descriptionClassName}>{copy.description}</p>
          </section>

          <nav
            aria-label={copy.navAriaLabel}
            className={`border-t border-[#DCCFB6]/60 pt-8 md:border-t-0 md:pt-0 ${columnDivider} ${sectionTextAlign}`}
          >
            <h3 className={sectionHeadingClassName}>{copy.quickLinksTitle}</h3>
            <ul
              className={`mt-5 flex flex-col ${isRtl ? "gap-[1.125rem]" : "gap-3.5"} ${linkAlign}`}
            >
              {footerLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    className={`group inline-flex items-center gap-2.5 text-[0.98rem] font-medium text-[#1F2A24]/74 transition-colors duration-300 hover:text-[#3E6B57] ${
                      isRtl ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className={isRtl ? "leading-8" : "leading-7"}>
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-4 w-4 items-center justify-center text-[#3E6B57] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                        isRtl ? "translate-x-1" : "-translate-x-1"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={isRtl ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section
            className={`border-t border-[#DCCFB6]/60 pt-8 md:border-t-0 md:pt-0 ${columnDivider} ${sectionTextAlign}`}
          >
            <h3 className={sectionHeadingClassName}>{copy.contactTitle}</h3>
            <address className="mt-5 not-italic">
              <ul className={`flex flex-col gap-3.5 ${contactAlign}`}>
                {contactItems.map((item) => (
                  <li
                    key={item.label}
                    className={`flex w-full max-w-md items-start gap-3 ${
                      isRtl ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DCCFB6]/58 bg-[#FBF8F1]/88 text-[#3E6B57] shadow-[0_6px_14px_rgba(31,42,36,0.04)]">
                      <ContactIcon name={item.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={contactLabelClassName}>{item.label}</span>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        dir={item.valueDirection}
                        className={`mt-0.5 block break-words text-[0.98rem] font-semibold text-[#1F2A24] transition-colors duration-300 hover:text-[#3E6B57] ${
                          isRtl ? "text-right" : "text-left"
                        } ${isRtl ? "leading-8" : "leading-7"}`}
                      >
                        {item.value}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </address>
          </section>
        </div>

        <div className="relative px-8 pb-7 md:px-16">
          <DividerMark />
          <p
            className="mt-5 text-center text-[0.78rem] leading-6 text-[#8A948C]/88"
          >
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
