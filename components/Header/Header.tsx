"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/site";

const navigationItems = [
  { label: "About", href: "#house-of-peace" },
  { label: "Programs", href: "#activities" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

const languages = ["EN", "FR", "AR"] as const;
type Language = (typeof languages)[number];
const mobileMenuId = "floating-site-menu";
const scrollRange = 240;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getNavbarStyles(progress: number): CSSProperties {
  const easedProgress = 1 - Math.pow(1 - progress, 3);

  return {
    "--nav-blur": `${8 + easedProgress * 16}px`,
    "--nav-offset": `${16 - easedProgress * 7}px`,
    "--nav-scale": `${1 - easedProgress * 0.014}`,
    "--nav-background": `rgba(247, 243, 236, ${0.56 + easedProgress * 0.2})`,
    "--nav-border": `rgba(233, 223, 207, ${0.66 + easedProgress * 0.18})`,
    "--nav-shadow": `0 ${18 + easedProgress * 8}px ${34 + easedProgress * 22}px rgba(24, 34, 29, ${
      0.08 + easedProgress * 0.09
    }), inset 0 1px 0 rgba(255, 255, 255, ${0.32 + easedProgress * 0.18})`,
  } as CSSProperties;
}

function LanguageToggle({
  activeLanguage,
  compact = false,
  onSelect,
}: {
  activeLanguage: Language;
  compact?: boolean;
  onSelect: (language: Language) => void;
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/45 bg-white/34 p-1 shadow-[0_10px_22px_rgba(38,77,59,0.08)] ${
        compact ? "gap-0.5" : "gap-1"
      }`}
      aria-label="Language switcher"
      role="group"
    >
      {languages.map((language) => {
        const isActive = language === activeLanguage;

        return (
          <button
            key={language}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(language)}
            className={`rounded-full font-semibold transition-colors ${
              compact
                ? "min-w-[2rem] px-2.5 py-1.5 text-[0.68rem]"
                : "min-w-[2.3rem] px-3 py-1.5 text-[0.72rem]"
            } ${
              isActive
                ? "bg-[#264D3B] !text-[#F7F3EC] shadow-[0_8px_20px_rgba(38,77,59,0.2)]"
                : "text-[#264D3B]/62 hover:text-[#264D3B]"
            }`}
          >
            {language}
          </button>
        );
      })}
    </div>
  );
}

export default function Header() {
  const [activeLanguage, setActiveLanguage] = useState<Language>("EN");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    // requestAnimationFrame keeps scroll state updates smooth without firing a React update on every event tick.
    const updateScrollProgress = () => {
      animationFrame = 0;
      const nextProgress = clamp(window.scrollY / scrollRange, 0, 1);

      setScrollProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) < 0.01 ? currentProgress : nextProgress,
      );
    };

    const handleScroll = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const navbarStyles = getNavbarStyles(scrollProgress);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-[1200px] justify-center px-2 sm:px-4 lg:px-6">
        <nav
          aria-label="Primary navigation"
          style={navbarStyles}
          className="pointer-events-auto relative w-full overflow-hidden rounded-[1.75rem] border [background-color:var(--nav-background)] [border-color:var(--nav-border)] [box-shadow:var(--nav-shadow)] [backdrop-filter:saturate(135%)_blur(var(--nav-blur))] [transform:translateY(var(--nav-offset))_scale(var(--nav-scale))] transition-[transform,box-shadow,background-color,border-color] duration-500 ease-out"
        >
          <div
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent"
            aria-hidden="true"
          />

          <div className="relative flex items-center gap-3 px-4 py-3 sm:px-5 lg:px-6">
            <Link
              href="#hero"
              className="group flex min-w-0 items-center gap-3 rounded-full pr-2 text-[#264D3B]"
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/45 bg-white/45 shadow-[0_8px_20px_rgba(38,77,59,0.08)]">
                <Image
                  src={withBasePath("/scouts-house-of-peace-logo.png")}
                  alt="Scouts Maison de La Paix logo"
                  fill
                  sizes="40px"
                  className="object-contain p-1.5"
                />
              </span>

              <span className="min-w-0">
                <span className="block truncate font-serif text-[1.02rem] font-normal leading-none tracking-[-0.035em] text-[#264D3B] sm:text-[1.12rem]">
                  Maison de La Paix
                </span>
              </span>
            </Link>

            <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-[0.94rem] font-medium text-[#264D3B]/72 lg:flex">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-full px-1 py-2 transition-[color,transform] duration-200 hover:-translate-y-px hover:text-[#264D3B]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
              <div className="hidden sm:block">
                <LanguageToggle
                  activeLanguage={activeLanguage}
                  onSelect={setActiveLanguage}
                />
              </div>

              <button
                type="button"
                aria-controls={mobileMenuId}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-white/42 text-[#264D3B] shadow-[0_8px_18px_rgba(38,77,59,0.08)] transition-colors hover:bg-white/58 lg:hidden"
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
            </div>
          </div>

          <div
            id={mobileMenuId}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
              isMenuOpen
                ? "grid-rows-[1fr] opacity-100"
                : "pointer-events-none grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-[#D9CCB8]/70 px-4 pb-4 pt-2 sm:px-5">
                <ul className="flex flex-col gap-2.5 text-sm text-[#264D3B]/78">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-2xl border border-white/50 bg-white/28 px-4 py-3 transition-colors hover:bg-white/42"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 sm:hidden">
                  <LanguageToggle
                    activeLanguage={activeLanguage}
                    compact
                    onSelect={setActiveLanguage}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
