import Link from "next/link";

import type { Messages } from "@/messages/en";

type NavigationItem = Messages["navigation"][number];

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
  const titleClassName = isRtl
    ? "text-sm font-semibold tracking-[0.06em] text-[#123B6D]/66"
    : "text-sm font-semibold uppercase tracking-[0.18em] text-[#123B6D]/66";

  return (
    <footer
      id="contact"
      className="bg-[linear-gradient(180deg,#DDD0C1_0%,#ECE2D5_26%,#F4ECE1_100%)] px-6 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10"
    >
      <div className="mx-auto max-w-6xl border-t border-[#123B6D]/8 pt-7 sm:pt-8">
        <div
          className={`flex flex-col gap-6 text-center sm:gap-7 lg:flex-row lg:items-end lg:justify-between ${
            isRtl ? "sm:text-right lg:text-right" : "lg:text-left"
          }`}
        >
          <div className="max-w-md">
            <p className={titleClassName}>{copy.title}</p>
            <p className="mt-3 text-[0.98rem] leading-7 text-[#2A2A2A]/58">
              {copy.description}
            </p>
          </div>

          <nav aria-label={copy.navAriaLabel} dir={isRtl ? "rtl" : "ltr"}>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#2A2A2A]/62 lg:justify-end">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#123B6D]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className={`mt-7 flex flex-col gap-3 border-t border-[#123B6D]/7 pt-5 text-center text-[0.82rem] text-[#2A2A2A]/48 sm:mt-8 sm:flex-row sm:items-center sm:justify-between ${
            isRtl ? "sm:text-right" : "sm:text-left"
          }`}
        >
          <p>{copy.tagline}</p>
          <p>{copy.note}</p>
        </div>
      </div>
    </footer>
  );
}
