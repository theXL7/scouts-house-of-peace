import type { CSSProperties } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/site";

export default function Hero() {
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
      className="relative isolate overflow-hidden bg-[#D8C8B2]"
      style={heroArtVars}
    >
      {/* This image layer can later be swapped to a background video without changing the text layout. */}
      <div className="absolute inset-0">
        <Image
          src={withBasePath("/hero/hero-bg.png")}
          alt="Scouts gathered outdoors in warm golden light."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center blur-[0.25px] saturate-[0.98] contrast-[0.96] brightness-[0.99]"
          style={{ transform: "scaleX(-1) scale(1.02)" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(254,248,239,0.28)_0%,rgba(247,224,180,0.24)_36%,rgba(189,140,76,0.18)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,28,48,0.84)_0%,rgba(15,32,55,0.72)_24%,rgba(18,41,68,0.38)_50%,rgba(18,41,68,0.14)_72%,rgba(18,41,68,0.05)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_6%,rgba(255,249,239,0.84),transparent_24%),radial-gradient(circle_at_18%_11%,rgba(255,244,228,0.46),transparent_27%),radial-gradient(circle_at_4%_18%,rgba(255,252,247,0.3),transparent_23%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,239,206,0.34),transparent_17%),radial-gradient(circle_at_56%_24%,rgba(255,222,164,0.16),transparent_22%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.1),transparent_16%),radial-gradient(circle_at_61%_74%,rgba(255,231,188,0.12),transparent_19%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-screen [background-image:radial-gradient(circle_at_66%_20%,rgba(255,245,225,0.92)_0,rgba(255,245,225,0)_2.4px),radial-gradient(circle_at_74%_30%,rgba(255,233,198,0.82)_0,rgba(255,233,198,0)_2.1px),radial-gradient(circle_at_48%_66%,rgba(255,246,232,0.76)_0,rgba(255,246,232,0)_1.9px),radial-gradient(circle_at_84%_58%,rgba(255,240,211,0.74)_0,rgba(255,240,211,0)_2px)] [background-size:240px_240px,290px_290px,320px_320px,300px_300px]" />

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
        <div className="absolute bottom-[-10%] left-[-6%] h-[118%] w-[112%] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.08)_14%,rgba(0,0,0,0.44)_32%,rgba(0,0,0,0.82)_52%,black_100%)] sm:bottom-[-12%] sm:left-[-4%] sm:h-[122%] sm:w-[108%] lg:bottom-[-14%] lg:left-[-2%] lg:h-[128%] lg:w-[104%]">
          <Image
            src={withBasePath("/hero/trees-2.png")}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_bottom] opacity-[0.72] blur-[0.38px] saturate-[0.9] contrast-[0.98] brightness-[1.02]"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,231,0)_0%,rgba(247,241,231,0.01)_42%,rgba(247,241,231,0.03)_100%)] mix-blend-screen" />
      </div>

      {/* The lower scenic band keeps the landscape assets contained near the bottom of the hero. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[46%] overflow-visible sm:h-[48%] lg:h-[52%]"
        aria-hidden="true"
      >
        <div
          className="absolute w-[108%] h-[130%] sm:w-[104%] sm:h-[136%] lg:w-[var(--hero-scenic-width-lg)] lg:h-[var(--hero-scenic-height-lg)]"
          style={{
            left: scenicComposite.left,
            bottom: scenicComposite.bottom,
          }}
        >
          <Image
            src={withBasePath("/hero/Untitled design.png")}
            alt=""
            fill
            sizes="(min-width: 1024px) 92vw, 108vw"
            className="object-contain object-left-bottom"
            style={{ opacity: scenicComposite.opacity }}
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

      <div className="pointer-events-none absolute inset-0 z-[16]" aria-hidden="true">
        <div
          className="absolute h-[var(--hero-pigeon-upper-left-size-sm)] w-[var(--hero-pigeon-upper-left-size-sm)] lg:h-[var(--hero-pigeon-upper-left-size-lg)] lg:w-[var(--hero-pigeon-upper-left-size-lg)]"
          style={{
            left: pigeons.upperLeft.left,
            top: pigeons.upperLeft.top,
          }}
        >
          <Image
            src={withBasePath("/hero/pigeon 2.png")}
            alt=""
            fill
            sizes="96px"
            className="object-contain blur-[0.45px]"
            style={{ opacity: pigeons.upperLeft.opacity }}
          />
        </div>

        <div
          className="absolute h-[var(--hero-pigeon-upper-right-size-sm)] w-[var(--hero-pigeon-upper-right-size-sm)] lg:h-[var(--hero-pigeon-upper-right-size-lg)] lg:w-[var(--hero-pigeon-upper-right-size-lg)]"
          style={{
            right: pigeons.upperRight.right,
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
              transform: "scaleX(-1)",
            }}
          />
        </div>

        <div
          className="absolute lg:w-[var(--hero-pigeon-lower-size-lg)] lg:h-[var(--hero-pigeon-lower-size-lg)]"
          style={{
            right: pigeons.lowerSmall.right,
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

      <div className="relative z-20 mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:py-32">
        <div className="max-w-[700px] text-center lg:text-left">
          <div className="flex flex-col items-center gap-5 lg:items-start">
            <div className="relative translate-x-19">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,249,240,0.62)_0%,rgba(255,243,225,0.28)_44%,rgba(255,243,225,0)_74%)] blur-2xl sm:h-44 sm:w-44 lg:h-48 lg:w-48" />
              <Image
                src={withBasePath("/scouts-house-of-peace-logo.png")}
                alt="Scouts of the House of Peace logo"
                width={140}
                height={140}
                className="relative h-[144px] w-[144px] object-contain sm:h-[156px] sm:w-[156px] lg:h-[172px] lg:w-[172px]"
                priority
              />
            </div>
            <p className="eyebrow-text text-xs font-semibold text-[#C6A56B] sm:text-sm">
              Scouts of the House of Peace
            </p>
          </div>

          <h1 className="mt-8 max-w-[16ch] text-4xl leading-[1.02] !text-[#F7F1E7] sm:text-5xl lg:text-[3.95rem]">
            <span className="block">Building a</span>
            <span className="block">Culture of Peace</span>
            <span className="block">Through Scouting</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.95] text-[#C6A56B] sm:text-[1.08rem] lg:mx-0">
            Empowering young people and communities through service, education,
            and global connection.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#join-us"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D4AF37] bg-[#264D3B] px-6 py-3 text-sm font-semibold text-[#F7F3EC] shadow-[0_10px_28px_rgba(24,51,39,0.24),0_0_0_1px_rgba(212,175,55,0.24)] transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-px hover:text-[#F1D58E]"
            >
              Join the Movement
            </a>
            <a
              href="#house-of-peace"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D4AF37] bg-[#F7F3EC] px-6 py-3 text-sm font-semibold text-[#264D3B] shadow-[0_10px_24px_rgba(17,28,41,0.12),0_0_0_1px_rgba(212,175,55,0.24)] transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-px hover:text-[#B86A4A]"
            >
              Discover Our Mission
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
