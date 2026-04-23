import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/messages";
import { getJoinUsPath } from "@/messages";
import type { Messages } from "@/messages/en";
import { arabicDisplayOverrides } from "@/lib/arabicDisplay";
import { withBasePath } from "@/lib/site";

export default function Hero({
  copy,
  locale,
  isRtl = false,
}: {
  copy: Messages["hero"];
  locale: Locale;
  isRtl?: boolean;
}) {
  const desktopTextAlignment = isRtl ? "lg:text-right" : "lg:text-left";
  const desktopItemsAlignment = isRtl ? "lg:items-end" : "lg:items-start";
  const desktopButtonAlignment = "lg:justify-start";
  const displayEyebrow = isRtl
    ? arabicDisplayOverrides.hero.eyebrow
    : copy.eyebrow;
  const displayTitleLines = isRtl
    ? arabicDisplayOverrides.hero.titleLines
    : copy.titleLines;
  const arabicIdentityPosition = {
    stackRightOffset: "-0.5rem",
    logoTranslateX: "1.2rem",
    logoTranslateY: "2rem",
    titleTranslateX: "3rem",
    titleTranslateY: "2rem",
  } as const;
  const mobileTextBlockClassName = isRtl
    ? "mx-auto w-full max-w-[22rem] text-center sm:max-w-[24rem]"
    : "mx-auto w-full max-w-[22rem] text-center sm:max-w-[24rem]";
  const desktopTextBlockClassName = isRtl
    ? "max-w-[700px] text-center lg:ml-auto lg:mr-[-0.5rem] lg:text-right"
    : "max-w-[700px] text-center lg:text-left";
  const mobileIdentityClusterClass = "flex flex-col items-center gap-3 sm:gap-4";
  const desktopIdentityClusterClass = isRtl
    ? "flex flex-col items-center gap-5 lg:ml-auto lg:w-fit lg:items-end"
    : `flex flex-col items-center gap-5 ${desktopItemsAlignment}`;
  const desktopIdentityClusterStyle = isRtl
    ? ({ marginRight: arabicIdentityPosition.stackRightOffset } as CSSProperties)
    : undefined;
  const mobileHeroHeadingClass = isRtl
    ? "mx-auto max-w-[11ch] text-[2.45rem] leading-[1.18] sm:max-w-[12ch] sm:text-[3rem]"
    : "mx-auto max-w-[10ch] text-[2.65rem] leading-[0.96] sm:max-w-[11ch] sm:text-[3.2rem]";
  const desktopHeroHeadingClass = isRtl
    ? "max-w-[21ch] leading-[1.28] sm:text-[3.5rem] lg:text-[4.45rem]"
    : "max-w-[16ch] leading-[1.02] sm:text-5xl lg:text-[3.95rem]";
  const mobileHeroBodyClass = isRtl
    ? "mx-auto mt-4 max-w-[19.25rem] text-[1rem] leading-[2.02] text-[#E8D3AB] sm:mt-5 sm:max-w-[21rem] sm:text-[1.04rem]"
    : "mx-auto mt-4 max-w-[18.5rem] text-[0.98rem] leading-[1.78] text-[#E8D3AB] sm:mt-5 sm:max-w-[20.5rem] sm:text-[1.04rem]";
  const desktopHeroBodyClass = isRtl
    ? "mx-auto mt-6 max-w-[38rem] text-[1.06rem] leading-[2.16] text-[#C6A56B] lg:mx-0"
    : "mx-auto mt-6 max-w-2xl text-base leading-[1.95] text-[#C6A56B] sm:text-[1.08rem] lg:mx-0";
  const mobileLogoWrapperClass = "relative";
  const desktopLogoWrapperClass = isRtl ? "relative" : "relative translate-x-19";
  const desktopLogoStyle = isRtl
    ? ({
        transform: `translate(${arabicIdentityPosition.logoTranslateX}, ${arabicIdentityPosition.logoTranslateY})`,
      } as CSSProperties)
    : undefined;
  const desktopTitleStyle = isRtl
    ? ({
        transform: `translate(${arabicIdentityPosition.titleTranslateX}, ${arabicIdentityPosition.titleTranslateY})`,
      } as CSSProperties)
    : undefined;
  const heroBackgroundClass = isRtl
    ? "object-cover object-center blur-[0.25px] saturate-[0.9] contrast-[0.94] brightness-[0.78] [transform:scale(1.02)] lg:saturate-[0.98] lg:contrast-[0.96] lg:brightness-[0.99]"
    : "object-cover object-center blur-[0.25px] saturate-[0.9] contrast-[0.94] brightness-[0.78] [transform:scale(1.02)] lg:saturate-[0.98] lg:contrast-[0.96] lg:brightness-[0.99] lg:[transform:scaleX(-1)_scale(1.02)]";
  const atmosphericShadeClass = isRtl
    ? "pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(12,28,48,0.84)_0%,rgba(15,32,55,0.72)_24%,rgba(18,41,68,0.38)_50%,rgba(18,41,68,0.14)_72%,rgba(18,41,68,0.05)_100%)]"
    : "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,28,48,0.84)_0%,rgba(15,32,55,0.72)_24%,rgba(18,41,68,0.38)_50%,rgba(18,41,68,0.14)_72%,rgba(18,41,68,0.05)_100%)]";
  const whiteHighlightClass = isRtl
    ? "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_6%,rgba(255,249,239,0.84),transparent_24%),radial-gradient(circle_at_82%_11%,rgba(255,244,228,0.46),transparent_27%),radial-gradient(circle_at_96%_18%,rgba(255,252,247,0.3),transparent_23%)]"
    : "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_6%,rgba(255,249,239,0.84),transparent_24%),radial-gradient(circle_at_18%_11%,rgba(255,244,228,0.46),transparent_27%),radial-gradient(circle_at_4%_18%,rgba(255,252,247,0.3),transparent_23%)]";
  const warmAtmosphereClass = isRtl
    ? "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,239,206,0.34),transparent_17%),radial-gradient(circle_at_44%_24%,rgba(255,222,164,0.16),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.1),transparent_16%),radial-gradient(circle_at_39%_74%,rgba(255,231,188,0.12),transparent_19%)]"
    : "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,239,206,0.34),transparent_17%),radial-gradient(circle_at_56%_24%,rgba(255,222,164,0.16),transparent_22%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.1),transparent_16%),radial-gradient(circle_at_61%_74%,rgba(255,231,188,0.12),transparent_19%)]";
  const sparkleFieldClass = isRtl
    ? "pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-screen [background-image:radial-gradient(circle_at_34%_20%,rgba(255,245,225,0.92)_0,rgba(255,245,225,0)_2.4px),radial-gradient(circle_at_26%_30%,rgba(255,233,198,0.82)_0,rgba(255,233,198,0)_2.1px),radial-gradient(circle_at_52%_66%,rgba(255,246,232,0.76)_0,rgba(255,246,232,0)_1.9px),radial-gradient(circle_at_16%_58%,rgba(255,240,211,0.74)_0,rgba(255,240,211,0)_2px)] [background-size:240px_240px,290px_290px,320px_320px,300px_300px]"
    : "pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-screen [background-image:radial-gradient(circle_at_66%_20%,rgba(255,245,225,0.92)_0,rgba(255,245,225,0)_2.4px),radial-gradient(circle_at_74%_30%,rgba(255,233,198,0.82)_0,rgba(255,233,198,0)_2.1px),radial-gradient(circle_at_48%_66%,rgba(255,246,232,0.76)_0,rgba(255,246,232,0)_1.9px),radial-gradient(circle_at_84%_58%,rgba(255,240,211,0.74)_0,rgba(255,240,211,0)_2px)] [background-size:240px_240px,290px_290px,320px_320px,300px_300px]";
  const mobileReadabilityOverlayClass =
    "pointer-events-none absolute inset-0 z-[6] bg-[linear-gradient(180deg,rgba(7,15,25,0.18)_0%,rgba(8,18,30,0.22)_18%,rgba(9,20,34,0.44)_45%,rgba(10,24,38,0.74)_73%,rgba(10,24,38,0.9)_100%)] lg:hidden";
  const treeBandWrapperClass = isRtl
    ? "absolute bottom-[-10%] left-[-6%] h-[118%] w-[112%] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.08)_14%,rgba(0,0,0,0.44)_32%,rgba(0,0,0,0.82)_52%,black_100%)] sm:bottom-[-12%] sm:left-[-4%] sm:h-[122%] sm:w-[108%] lg:bottom-[-14%] lg:left-auto lg:right-[-2%] lg:h-[128%] lg:w-[104%]"
    : "absolute bottom-[-10%] left-[-6%] h-[118%] w-[112%] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.08)_14%,rgba(0,0,0,0.44)_32%,rgba(0,0,0,0.82)_52%,black_100%)] sm:bottom-[-12%] sm:left-[-4%] sm:h-[122%] sm:w-[108%] lg:bottom-[-14%] lg:left-[-2%] lg:h-[128%] lg:w-[104%]";
  const treeBandImageClass = isRtl
    ? "object-cover object-[center_bottom] opacity-[0.72] blur-[0.38px] saturate-[0.9] contrast-[0.98] brightness-[1.02] lg:[transform:scaleX(-1)]"
    : "object-cover object-[center_bottom] opacity-[0.72] blur-[0.38px] saturate-[0.9] contrast-[0.98] brightness-[1.02]";

  // Quick tuning values for the final hero art.
  const scenicComposite = {
    left: "0%",
    bottom: "0%",
    widthMobile: "108%",
    widthDesktop: "92%",
    heightMobile: "130%",
    heightDesktop: "148%",
    opacity: 1,
  };
  const scenicWrapperClass = isRtl
    ? "absolute bottom-0 left-0 h-[130%] w-[108%] sm:h-[136%] sm:w-[104%] lg:left-auto lg:right-[-10%] lg:h-[var(--hero-scenic-height-lg)] lg:w-[var(--hero-scenic-width-lg)]"
    : "absolute bottom-0 left-0 h-[130%] w-[108%] sm:h-[136%] sm:w-[104%] lg:h-[var(--hero-scenic-height-lg)] lg:w-[var(--hero-scenic-width-lg)]";
  const scenicImageClass = isRtl
    ? "object-contain object-left-bottom lg:object-right-bottom lg:[transform:scaleX(-1)]"
    : "object-contain object-left-bottom";
  const scenicImageStyle = { opacity: scenicComposite.opacity };
  const mobilePrimaryButtonClass = isRtl ? "flex-row-reverse" : "";
  const mobileEyebrowToneClass = isRtl
    ? "ar-display-label text-[1rem] font-bold leading-none tracking-[0.01em] text-[#E8D3AB] drop-shadow-[0_1px_14px_rgba(12,28,48,0.45)] sm:text-[1.12rem]"
    : "";
  const desktopEyebrowToneClass = isRtl
    ? "ar-display-label text-[1rem] font-bold leading-none tracking-[0.01em] text-[#7A5941] drop-shadow-[0_1px_12px_rgba(255,248,239,0.45)] sm:text-[1.12rem]"
    : "";

  const pigeons = {
    upperLeft: {
      left: "4%",
      top: "74%",
      sizeMobile: "4rem",
      sizeDesktop: "6rem",
      opacity: 0.42,
    },
    upperRight: {
      right: "6%",
      top: "8.5%",
      sizeMobile: "8rem",
      sizeDesktop: "20rem",
      opacity: 0.58,
    },
    lowerSmall: {
      right: "10%",
      bottom: "16%",
      sizeMobile: "2.25rem",
      sizeDesktop: "2.75rem",
      opacity: 0.22,
    },
  };

  // CSS variables let us keep the art-direction values readable
  // without depending on styled-jsx inside a Server Component.
  const heroArtVars = {
    "--hero-scenic-width-lg": scenicComposite.widthDesktop,
    "--hero-scenic-height-lg": scenicComposite.heightDesktop,
    "--hero-pigeon-upper-left-size-sm": pigeons.upperLeft.sizeMobile,
    "--hero-pigeon-upper-left-size-lg": pigeons.upperLeft.sizeDesktop,
    "--hero-pigeon-upper-right-size-sm": pigeons.upperRight.sizeMobile,
    "--hero-pigeon-upper-right-size-lg": pigeons.upperRight.sizeDesktop,
    "--hero-pigeon-lower-size-lg": pigeons.lowerSmall.sizeDesktop,
  } as CSSProperties;

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#D8C8B2] lg:min-h-0"
      style={heroArtVars}
    >
      {/* This image layer can later be swapped to a background video without changing the text layout. */}
      <div className="absolute inset-0">
        <Image
          src={withBasePath("/hero/hero-bg.png")}
          alt={copy.backgroundAlt}
          fill
          priority
          sizes="100vw"
          className={heroBackgroundClass}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(254,248,239,0.28)_0%,rgba(247,224,180,0.24)_36%,rgba(189,140,76,0.18)_100%)]" />
      <div className={atmosphericShadeClass} />
      <div className={mobileReadabilityOverlayClass} />
      <div className={whiteHighlightClass} />
      <div className={warmAtmosphereClass} />
      <div className={sparkleFieldClass} />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[8.75rem] sm:h-[10rem]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 260"
          className="absolute inset-x-0 bottom-[0rem] h-auto w-full text-[rgba(246,236,221,0.68)] blur-[1px]"
        >
          <path
            d="M0 188c154-24 309-26 466-10 164 17 314 48 463 56 152 8 292-5 401-31 48-12 86-28 110-47v104H0Z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 1440 160"
          className="absolute inset-x-0 bottom-[3.75rem] h-auto w-full text-[#FFF8EC]/20 blur-[1.7px]"
        >
          <path
            d="M0 82c111-18 214-16 334 4 154 26 266 39 391 33 112-6 208-28 322-27 128 1 242 29 393 63v5H0Z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 1440 170"
          className="absolute inset-x-0 bottom-[2.7rem] h-auto w-full text-[#FBF4E8]/28 blur-[1.15px]"
        >
          <path
            d="M0 74c102-23 216-28 344-14 144 16 245 43 370 43 121 0 219-25 337-27 116-2 220 17 389 43v51H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[10] h-[27%] overflow-hidden sm:h-[29%] lg:h-[31%]"
        aria-hidden="true"
      >
        <div className={treeBandWrapperClass}>
          <Image
            src={withBasePath("/hero/trees-2.png")}
            alt=""
            fill
            sizes="100vw"
            className={treeBandImageClass}
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,231,0)_0%,rgba(247,241,231,0.01)_42%,rgba(247,241,231,0.03)_100%)] mix-blend-screen" />
      </div>

      {/* The lower scenic band keeps the landscape assets contained near the bottom of the hero. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[46%] overflow-visible sm:h-[48%] lg:h-[52%]"
        aria-hidden="true"
      >
        <div className={scenicWrapperClass}>
          <Image
            src={withBasePath("/hero/Untitled design.png")}
            alt=""
            fill
            sizes="(min-width: 1024px) 92vw, 108vw"
            className={scenicImageClass}
            style={scenicImageStyle}
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[11] h-[8.75rem] sm:h-[10rem]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 180"
          className="absolute inset-x-0 bottom-[1.7rem] h-auto w-full text-[#FBF1E2]/44 blur-[0.95px]"
        >
          <path
            d="M0 92c109-27 220-31 343-15 146 18 253 50 379 50 115 0 211-28 325-30 125-2 231 23 393 54v29H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-[8.75rem] sm:h-[10rem]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 190"
          className="absolute inset-x-0 bottom-[0.9rem] h-auto w-full text-[#F8EEDF]/62"
        >
          <path
            d="M0 110c104-31 214-39 342-21 149 21 257 54 388 54 115 0 208-31 321-36 112-5 214 16 389 46v47H0Z"
            fill="currentColor"
          />
        </svg>

        <svg
          viewBox="0 0 1440 205"
          className="absolute inset-x-0 bottom-0 h-auto w-full text-[#F4E8D7]/86"
        >
          <path
            d="M0 146c98-22 196-23 309-8 153 21 260 52 399 52 109 0 207-27 311-27 131 0 264 35 421 47v-5H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[16] hidden lg:block"
        aria-hidden="true"
      >
        <div
          className="absolute h-[var(--hero-pigeon-upper-left-size-sm)] w-[var(--hero-pigeon-upper-left-size-sm)] lg:h-[var(--hero-pigeon-upper-left-size-lg)] lg:w-[var(--hero-pigeon-upper-left-size-lg)]"
          style={{
            left: isRtl ? undefined : pigeons.upperLeft.left,
            right: isRtl ? pigeons.upperLeft.left : undefined,
            top: pigeons.upperLeft.top,
          }}
        >
          <Image
            src={withBasePath("/hero/pigeon 2.png")}
            alt=""
            fill
            sizes="96px"
            className="object-contain blur-[0.45px]"
            style={{
              opacity: pigeons.upperLeft.opacity,
              transform: isRtl ? "scaleX(-1)" : undefined,
            }}
          />
        </div>

        <div
          className="absolute h-[var(--hero-pigeon-upper-right-size-sm)] w-[var(--hero-pigeon-upper-right-size-sm)] lg:h-[var(--hero-pigeon-upper-right-size-lg)] lg:w-[var(--hero-pigeon-upper-right-size-lg)]"
          style={{
            right: isRtl ? undefined : pigeons.upperRight.right,
            left: isRtl ? pigeons.upperRight.right : undefined,
            top: pigeons.upperRight.top,
          }}
        >
          <Image
            src={withBasePath("/hero/pigeon 1.png")}
            alt=""
            fill
            sizes="96px"
            className="object-contain blur-[0.4px]"
            style={{
              opacity: pigeons.upperRight.opacity,
              transform: isRtl ? undefined : "scaleX(-1)",
            }}
          />
        </div>

        <div
          className="absolute lg:w-[var(--hero-pigeon-lower-size-lg)] lg:h-[var(--hero-pigeon-lower-size-lg)]"
          style={{
            right: isRtl ? undefined : pigeons.lowerSmall.right,
            left: isRtl ? pigeons.lowerSmall.right : undefined,
            bottom: pigeons.lowerSmall.bottom,
          }}
        >
          <Image
            src={withBasePath("/hero/pigeon 3.png")}
            alt=""
            fill
            sizes="44px"
            className="object-contain blur-[0.5px]"
            style={{ opacity: pigeons.lowerSmall.opacity }}
          />
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-6 sm:px-8 lg:hidden">
        {/* Safe-zone spacing keeps the mobile copy readable above the scenic band and browser chrome. */}
        <div className="flex min-h-[100svh] items-center justify-center pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.25rem))] pb-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))]">
          <div className={mobileTextBlockClassName}>
            <div className={mobileIdentityClusterClass}>
              <div className={mobileLogoWrapperClass}>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,249,240,0.62)_0%,rgba(255,243,225,0.28)_44%,rgba(255,243,225,0)_74%)] blur-2xl sm:h-44 sm:w-44 lg:h-48 lg:w-48" />
                <Image
                  src={withBasePath("/scouts-house-of-peace-logo.png")}
                  alt={copy.logoAlt}
                  width={140}
                  height={140}
                  className="relative h-[128px] w-[128px] object-contain sm:h-[148px] sm:w-[148px]"
                  priority
                />
              </div>
              <p
                className={`eyebrow-text text-xs font-semibold text-[#C6A56B] sm:text-sm ${mobileEyebrowToneClass}`}
              >
                {displayEyebrow}
              </p>
            </div>

            <h1
              className={`mt-6 !text-[#F7F1E7] ${mobileHeroHeadingClass} ${
                isRtl ? "ar-display-heading ar-display-hero" : ""
              }`}
            >
              <span className="sr-only">
                {locale === "ar"
                  ? "Scouts Maison de La Paix - كشافة دار السلام المغربية"
                  : "Scouts Maison de La Paix official website"}
              </span>
              {displayTitleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className={mobileHeroBodyClass}>{copy.description}</p>

            <div className="mt-7 flex w-full max-w-[20rem] flex-col items-stretch gap-3 sm:mt-8 sm:max-w-[21rem]">
              <div className="relative">
                <div className="pointer-events-none absolute inset-x-5 inset-y-2 rounded-full bg-[#D4AF37]/24 blur-2xl" />
                <Link
                  href={getJoinUsPath(locale)}
                  className={`relative inline-flex min-h-[3.5rem] w-full items-center justify-center gap-3 rounded-full border border-[#D4AF37] bg-[#264D3B] px-6 py-3 text-sm font-semibold text-[#F7F3EC] shadow-[0_10px_28px_rgba(24,51,39,0.24),0_0_0_1px_rgba(212,175,55,0.24)] transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-px hover:text-[#F1D58E] sm:px-7 ${mobilePrimaryButtonClass}`}
                >
                  {"primaryBadge" in copy ? (
                    <span
                      className={`rounded-full border border-white/18 bg-white/12 px-2.5 py-1 text-[0.62rem] font-semibold text-[#F4DFC0] ${
                        isRtl ? "tracking-[0.04em]" : "uppercase tracking-[0.14em]"
                      }`}
                    >
                      {copy.primaryBadge}
                    </span>
                  ) : null}
                  <span>{copy.primaryCta}</span>
                </Link>
              </div>
              <a
                href="#house-of-peace"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#D4AF37] bg-[#F7F3EC] px-6 py-3 text-sm font-semibold text-[#264D3B] shadow-[0_10px_24px_rgba(17,28,41,0.12),0_0_0_1px_rgba(212,175,55,0.24)] transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-px hover:text-[#B86A4A]"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto hidden max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:block lg:py-32">
        <div className={`${desktopTextBlockClassName} ${desktopTextAlignment}`}>
          <div
            className={desktopIdentityClusterClass}
            style={desktopIdentityClusterStyle}
          >
            <div className={desktopLogoWrapperClass} style={desktopLogoStyle}>
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,249,240,0.62)_0%,rgba(255,243,225,0.28)_44%,rgba(255,243,225,0)_74%)] blur-2xl sm:h-44 sm:w-44 lg:h-48 lg:w-48" />
              <Image
                src={withBasePath("/scouts-house-of-peace-logo.png")}
                alt={copy.logoAlt}
                width={140}
                height={140}
                className="relative h-[144px] w-[144px] object-contain sm:h-[156px] sm:w-[156px] lg:h-[172px] lg:w-[172px]"
                priority
              />
            </div>
            <p
              className={`eyebrow-text text-xs font-semibold text-[#C6A56B] sm:text-sm ${
                desktopEyebrowToneClass
              } ${
                isRtl ? "lg:text-right" : ""
              }`}
              style={desktopTitleStyle}
            >
              {displayEyebrow}
            </p>
          </div>

          <h1
            className={`mt-8 text-4xl !text-[#F7F1E7] ${desktopHeroHeadingClass} ${
              isRtl ? "ar-display-heading ar-display-hero" : ""
            }`}
          >
            <span className="sr-only">
              {locale === "ar"
                ? "Scouts Maison de La Paix - كشافة دار السلام المغربية"
                : "Scouts Maison de La Paix official website"}
            </span>
            {displayTitleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className={desktopHeroBodyClass}>{copy.description}</p>

          <div
            className={`mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center ${desktopButtonAlignment}`}
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-x-5 inset-y-2 rounded-full bg-[#D4AF37]/24 blur-2xl" />
              <Link
                href={getJoinUsPath(locale)}
                className="relative inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full border border-[#D4AF37] bg-[#264D3B] px-6 py-3 text-sm font-semibold text-[#F7F3EC] shadow-[0_10px_28px_rgba(24,51,39,0.24),0_0_0_1px_rgba(212,175,55,0.24)] transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-px hover:text-[#F1D58E] sm:px-7"
              >
                {"primaryBadge" in copy ? (
                  <span
                    className={`rounded-full border border-white/18 bg-white/12 px-2.5 py-1 text-[0.62rem] font-semibold text-[#F4DFC0] ${
                      isRtl ? "tracking-[0.04em]" : "uppercase tracking-[0.14em]"
                    }`}
                  >
                    {copy.primaryBadge}
                  </span>
                ) : null}
                <span>{copy.primaryCta}</span>
              </Link>
            </div>
            <a
              href="#house-of-peace"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D4AF37] bg-[#F7F3EC] px-6 py-3 text-sm font-semibold text-[#264D3B] shadow-[0_10px_24px_rgba(17,28,41,0.12),0_0_0_1px_rgba(212,175,55,0.24)] transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-px hover:text-[#B86A4A]"
            >
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
