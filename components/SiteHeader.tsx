"use client";

import { useState } from "react";

const navigationItems = [
  { label: "About", href: "#house-of-peace" },
  { label: "Programs", href: "#activities" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

const languages = ["EN", "FR", "AR"];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(247,241,230,0.78)_0%,rgba(247,241,230,0.44)_58%,rgba(247,241,230,0)_100%)] backdrop-blur-md"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10 overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 90"
            className="absolute inset-x-0 top-[-30px] h-auto w-full text-[#FFF9EF]/34"
          >
            <path
              d="M0 54c118-10 234-6 360 10 145 18 262 28 394 22 126-5 235-22 352-31 110-8 221-6 334 8v81H0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-4 sm:px-8">
          <div className="relative rounded-[2rem] border border-[#D9CCB7]/80 bg-[#F8F2E8]/82 shadow-[0_10px_28px_rgba(18,36,61,0.06)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-6">
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#123B6D]/10 bg-white/65 text-[#123B6D] transition-colors hover:bg-white lg:hidden"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    {isMenuOpen ? (
                      <path d="M6 6l12 12M18 6L6 18" />
                    ) : (
                      <path d="M4 7h16M4 12h16M4 17h16" />
                    )}
                  </svg>
                </button>

                <div className="hidden rounded-full border border-[#E4D8C5] bg-white/42 px-4 py-2 text-sm text-[#2A2A2A]/62 sm:block">
                  Scouts Maison de La Paix
                </div>

                <nav aria-label="Primary navigation" className="hidden lg:block">
                  <ul className="flex items-center gap-8 text-sm text-[#2A2A2A]/62">
                    {navigationItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="transition-colors hover:text-[#123B6D]"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="flex items-center rounded-full border border-[#123B6D]/10 bg-white/58 p-1 shadow-[0_4px_12px_rgba(18,36,61,0.04)]">
                {languages.map((language, index) => (
                  <span
                    key={language}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      index === 0
                        ? "bg-[#123B6D] text-white shadow-[0_6px_14px_rgba(18,59,109,0.22)]"
                        : "text-[#123B6D]/68"
                    }`}
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {isMenuOpen ? (
              <div className="px-5 pb-4 pt-1 lg:hidden">
                <nav aria-label="Mobile navigation">
                  <ul className="flex flex-col gap-3 text-sm text-[#2A2A2A]/72">
                    {navigationItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-2xl border border-[#123B6D]/8 bg-white/60 px-4 py-3 transition-colors hover:bg-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ) : null}
          </div>

          <div
            className="pointer-events-none absolute inset-x-6 bottom-[-14px] h-10 sm:inset-x-8"
            aria-hidden="true"
          >
            <div className="absolute left-[4%] top-0 h-8 w-[24%] rounded-full bg-[#FFF8EE]/58 blur-2xl" />
            <div className="absolute right-[8%] top-1 h-7 w-[18%] rounded-full bg-[#FFF4E7]/30 blur-2xl" />

            <svg
              viewBox="0 0 1440 80"
              className="absolute inset-x-0 bottom-0 h-auto w-full text-[#FAF2E6]/66"
            >
              <path
                d="M0 34c109 11 220 13 343 4 145-11 272-27 403-24 124 3 231 20 347 24 114 4 225-6 347-24v46H0Z"
                fill="currentColor"
              />
            </svg>

            <svg
              viewBox="0 0 1440 80"
              className="absolute inset-x-0 bottom-[-2px] h-auto w-full text-[#FFF8EE]/34 blur-[0.7px]"
            >
              <path
                d="M0 44c108 10 221 11 346 1 143-12 270-28 401-25 124 3 230 19 347 23 114 4 225-6 346-23v44H0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
