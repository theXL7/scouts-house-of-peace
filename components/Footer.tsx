import Link from "next/link";

import type { Messages } from "@/messages/en";

type NavigationItem = Messages["navigation"][number];

const PHONE_NUMBER = "+212 6571 71003";
const PHONE_HREF = "tel:+212657171003";
const EMAIL_ADDRESS = "contact@scoutsmaisonpaix.org";
const EMAIL_HREF = "mailto:contact@scoutsmaisonpaix.org";
const FACEBOOK_LABEL = "كشافة دار السلام المغربية";
const FACEBOOK_HREF = "https://www.facebook.com/profile.php?id=100067192446286";
const INSTAGRAM_LABEL = "scoutsmaisondelapaix";
const INSTAGRAM_HREF = "https://www.instagram.com/scoutsmaisondelapaix/";

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
  const footerLinks = [...navigation, { label: copy.joinLabel, href: joinHref }];
  const currentYear = new Date().getFullYear();
  const desktopDividerClass = isRtl
    ? "lg:border-r lg:pr-8 xl:pr-10"
    : "lg:border-l lg:pl-8 xl:pl-10";
  const sectionAlignmentClass = isRtl ? "text-right" : "text-left";
  const sectionHeadingClassName = isRtl
    ? "text-sm font-semibold tracking-[0.08em] text-[#123B6D]/64"
    : "eyebrow-text text-[0.7rem] font-semibold text-[#123B6D]/64";
  const contactLabelClassName = isRtl
    ? "text-[0.8rem] font-semibold tracking-[0.06em] text-[#123B6D]/58"
    : "text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#123B6D]/58";
  const identityHeadingClassName = isRtl
    ? "ar-display-heading text-[1.72rem] leading-[1.46] text-[#2A2A2A] sm:text-[1.96rem]"
    : "text-[1.52rem] leading-[1.12] text-[#2A2A2A] sm:text-[1.82rem]";
  const layoutClassName = isRtl
    ? "relative grid grid-cols-1 gap-0 lg:grid-cols-[1.2fr_0.8fr_1.2fr] lg:items-start"
    : "relative flex flex-col gap-0 lg:flex-row";
  const identitySectionClassName = isRtl
    ? "order-1 lg:order-3 lg:col-start-3 lg:border-l lg:border-[#123B6D]/8 lg:pl-8 xl:pl-10"
    : "lg:basis-[42%] lg:flex-none";
  const linksSectionClassName = isRtl
    ? "order-3 border-t border-[#123B6D]/8 pt-7 lg:order-2 lg:col-start-2 lg:border-t-0 lg:border-l lg:border-[#123B6D]/8 lg:px-8 lg:pt-0 xl:px-10"
    : `border-t border-[#123B6D]/8 pt-7 lg:basis-[24%] lg:flex-none lg:border-t-0 lg:pt-0 ${desktopDividerClass}`;
  const contactSectionClassName = isRtl
    ? "order-2 border-t border-[#123B6D]/8 pt-7 lg:order-1 lg:col-start-1 lg:border-t-0 lg:pt-0 lg:pr-6 xl:pr-8"
    : `border-t border-[#123B6D]/8 pt-7 lg:basis-[34%] lg:flex-none lg:border-t-0 lg:pt-0 ${desktopDividerClass}`;
  const identityDescriptionClassName = isRtl
    ? "mt-4 max-w-md text-[0.98rem] leading-7 text-[#2A2A2A]/68 sm:text-[1.02rem] lg:ml-auto lg:max-w-[28rem]"
    : "mt-4 max-w-md text-[0.98rem] leading-7 text-[#2A2A2A]/68 sm:text-[1.02rem]";
  const linksListClassName = isRtl
    ? "mt-4 flex flex-col items-end gap-3.5 text-right text-[0.97rem] text-[#2A2A2A]/72"
    : "mt-4 flex flex-col gap-3 text-[0.97rem] text-[#2A2A2A]/72 items-start";
  const contactListClassName = isRtl ? "space-y-5" : "space-y-4";
  const contactLinkClassName = isRtl
    ? "mt-1.5 block w-full break-words text-right text-[1rem] font-semibold leading-[1.7] text-[#264D3B] underline decoration-[#123B6D]/18 underline-offset-4 transition-colors hover:text-[#B86A4A] hover:decoration-[#B86A4A]/40"
    : "mt-1.5 inline-flex max-w-full break-words text-[1rem] font-semibold leading-[1.5] text-[#264D3B] underline decoration-[#123B6D]/18 underline-offset-4 transition-colors hover:text-[#B86A4A] hover:decoration-[#B86A4A]/40";
  const contactHelperClassName = isRtl
    ? "mt-1.5 max-w-sm text-right text-sm leading-7 text-[#5B554D]/72 lg:ml-auto"
    : "mt-1.5 max-w-sm text-sm leading-6 text-[#5B554D]/72";
  const copyrightClassName = isRtl
    ? "border-t border-[#123B6D]/10 px-6 py-4 text-right text-[0.8rem] leading-6 text-[#2A2A2A]/50 sm:px-8 lg:px-10"
    : "border-t border-[#123B6D]/10 px-6 py-4 text-center text-[0.8rem] leading-6 text-[#2A2A2A]/50 sm:px-8 lg:px-10 lg:text-left";
  const linkItemClassName = isRtl ? "w-full text-right" : "";
  const linkClassName = isRtl
    ? "inline-flex w-full justify-end text-right underline decoration-[#123B6D]/14 underline-offset-4 transition-colors hover:text-[#123B6D] hover:decoration-[#123B6D]/38"
    : "inline-flex underline decoration-[#123B6D]/14 underline-offset-4 transition-colors hover:text-[#123B6D] hover:decoration-[#123B6D]/38";
  const contactItems = [
    {
      label: copy.phoneLabel,
      value: PHONE_NUMBER,
      href: PHONE_HREF,
      valueDirection: "ltr" as const,
    },
    {
      label: copy.emailLabel,
      value: EMAIL_ADDRESS,
      href: EMAIL_HREF,
      helper: copy.emailHelper,
      valueDirection: "ltr" as const,
    },
    {
      label: copy.facebookPlatform,
      value: FACEBOOK_LABEL,
      href: FACEBOOK_HREF,
      external: true,
    },
    {
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
      className="bg-[linear-gradient(180deg,#E7DED0_0%,#F1E8DB_24%,#F7F3EC_100%)] px-6 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.8rem] border border-[#123B6D]/10 bg-[#FBF8F2]/92 shadow-[0_22px_55px_rgba(18,59,109,0.05)]">
        <div
          className={`relative p-6 sm:p-8 lg:p-10 ${sectionAlignmentClass}`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(18,59,109,0.08),transparent_72%)]" />

          <div className={layoutClassName}>
            <section className={identitySectionClassName}>
              <h2 className={identityHeadingClassName}>{copy.title}</h2>
              <p className={identityDescriptionClassName}>
                {copy.description}
              </p>
            </section>

            <nav
              aria-label={copy.navAriaLabel}
              dir={isRtl ? "rtl" : "ltr"}
              className={linksSectionClassName}
            >
              <h3 className={sectionHeadingClassName}>{copy.quickLinksTitle}</h3>
              <ul className={linksListClassName}>
                {footerLinks.map((link) => (
                  <li key={link.label} className={linkItemClassName}>
                    <Link
                      href={link.href}
                      className={linkClassName}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section
              className={contactSectionClassName}
            >
              <h3 className={sectionHeadingClassName}>{copy.contactTitle}</h3>
              <address className={`mt-4 not-italic ${isRtl ? "text-right" : ""}`}>
                <ul className={contactListClassName}>
                  {contactItems.map((item) => (
                    <li key={item.label}>
                      <p className={contactLabelClassName}>
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        dir={item.valueDirection}
                        className={contactLinkClassName}
                      >
                        {item.value}
                      </a>
                      {item.helper ? (
                        <p className={contactHelperClassName}>
                          {item.helper}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </address>
            </section>
          </div>
        </div>

        <div className={copyrightClassName}>
          <p>{copy.copyright.replace("{year}", String(currentYear))}</p>
        </div>
      </div>
    </footer>
  );
}
