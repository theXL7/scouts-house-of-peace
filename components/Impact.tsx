"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/messages";
import type { Messages } from "@/messages/en";

type ImpactStat = {
  value: number;
  suffix: string;
  label: string;
  tone: string;
};

const statCards = [
  {
    tone: "bg-[#F8F2E8]/92",
  },
  {
    tone: "bg-[#FBF6EE]/94",
  },
  {
    tone: "bg-[#F5EEE2]/94",
  },
  {
    tone: "bg-[#F7F1E6]/92",
  },
];

function formatStatValue(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale).format(value);
}

export default function Impact({
  copy,
  locale,
}: {
  copy: Messages["impact"];
  locale: Locale;
}) {
  const isRtl = locale === "ar";
  const stats: ImpactStat[] = statCards.map((card, index) => ({
    ...card,
    ...copy.stats[index],
  }));
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(() => statCards.map(() => 0));

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return undefined;
    }

    // Start the reveal once the section is comfortably in view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const reducedMotionFrame = requestAnimationFrame(() => {
        setCounts(copy.stats.map((stat) => stat.value));
      });

      return () => cancelAnimationFrame(reducedMotionFrame);
    }

    const animationDuration = 1600;
    let frameId = 0;
    const animationStart = performance.now();

    // A small easing curve keeps the count-up calm instead of mechanical.
    const animateCounts = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - animationStart) / animationDuration,
        1
      );
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(
        copy.stats.map((stat) => Math.round(stat.value * easedProgress))
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animateCounts);
      }
    };

    frameId = requestAnimationFrame(animateCounts);

    return () => cancelAnimationFrame(frameId);
  }, [copy.stats, isVisible]);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="bg-[linear-gradient(180deg,#FBF8F2_0%,#F4ECDF_100%)] px-6 py-[5rem] sm:px-8 sm:py-[6rem]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-text text-xs font-semibold text-[#123B6D]/70">
            {copy.eyebrow}
          </p>
          <h2
            className={`mt-4 ${
              isRtl
                ? "ar-display-heading text-[2.18rem] leading-[1.24] sm:text-[2.58rem]"
                : "text-3xl leading-[1.16] sm:text-[2.45rem]"
            }`}
          >
            {copy.title}
          </h2>
          <p
            className={`mt-6 text-base text-[#2A2A2A]/64 sm:text-[1.04rem] ${
              isRtl ? "leading-[2.04]" : "leading-[1.92]"
            }`}
          >
            {copy.description}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className={`${stat.tone} rounded-[16px] border border-[#123B6D]/[0.035] px-7 py-9 text-center shadow-[0_10px_26px_rgba(18,59,109,0.035)] transition-all duration-700 ease-out sm:px-8 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <p className="tabular-nums text-[2.7rem] font-semibold leading-none tracking-[-0.03em] text-[#123B6D] sm:text-[3.2rem]">
                {formatStatValue(counts[index], locale)}
                <span
                  className={`text-[1.95rem] text-[#123B6D]/76 sm:text-[2.3rem] ${
                    isRtl ? "mr-1" : "ml-1"
                  }`}
                >
                  {stat.suffix}
                </span>
              </p>
              <p className="mx-auto mt-4 max-w-[15rem] text-[0.97rem] leading-7 text-[#2A2A2A]/62">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm leading-7 text-[#2A2A2A]/58 sm:text-[0.98rem]">
            {copy.footnote}
          </p>
          <a
            href="#activities"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#123B6D] transition-colors hover:text-[#0E2F59]"
          >
            {copy.cta}
            <span aria-hidden="true">{isRtl ? "\u2190" : "\u2192"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
