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
    <header className="sticky top-0 z-50 bg-[#FAF6EE]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4 border-b border-[#123B6D]/10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#123B6D]/10 bg-white/70 text-[#123B6D] transition-colors hover:bg-white lg:hidden"
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

            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-7 text-sm text-[#2A2A2A]/68">
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

          {/* The language switcher stays simple for now and can later connect to real routing. */}
          <div className="flex items-center rounded-full border border-[#123B6D]/10 bg-white/70 p-1">
            {languages.map((language, index) => (
              <span
                key={language}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  index === 0 ? "bg-[#123B6D] text-white" : "text-[#123B6D]/70"
                }`}
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-[#123B6D]/10 py-5 lg:hidden">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-3 text-sm text-[#2A2A2A]/72">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-2xl bg-white/55 px-4 py-3 transition-colors hover:bg-white"
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
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-8 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 90"
          className="absolute inset-x-0 bottom-0 h-auto w-full text-[#FBF4E8]/88"
        >
          <path
            d="M0 30c113 18 232 20 368 9 135-11 260-28 392-25 133 3 243 28 362 34 118 6 224-6 318-28v70H0Z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 1440 88"
          className="absolute inset-x-0 bottom-0 h-auto w-full text-[#FFF9EF]/64 blur-[0.65px]"
        >
          <path
            d="M0 42c106 15 217 16 341 4 141-13 269-33 403-30 129 3 242 24 361 28 114 4 225-8 335-29v73H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </header>
  );
}
