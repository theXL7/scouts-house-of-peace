import Image from "next/image";
import { withBasePath } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="hero"
      className="overflow-hidden bg-[linear-gradient(180deg,#F8F4EC_0%,#EFE3D2_100%)] px-6 py-24 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:items-start lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-16">
        <div className="max-w-[700px] text-center lg:text-left">
          <div className="flex flex-col items-center gap-5 lg:items-start">
            <Image
              src={withBasePath("/scouts-house-of-peace-logo.png")}
              alt="Scouts of the House of Peace logo"
              width={140}
              height={140}
              className="h-[128px] w-[128px] object-contain sm:h-[140px] sm:w-[140px] lg:h-[152px] lg:w-[152px]"
              priority
            />
            <p className="eyebrow-text text-xs font-semibold text-[#123B6D]/74 sm:text-sm">
              Scouts of the House of Peace
            </p>
          </div>

          <h1 className="mt-8 text-4xl leading-[1.04] text-[#2A2A2A] sm:text-5xl lg:max-w-[11ch] lg:text-[3.55rem]">
            Building a Culture of Peace Through Scouting
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.95] text-[#2A2A2A]/66 sm:text-[1.08rem] lg:mx-0">
            Empowering young people and communities through service, education,
            and global connection.
          </p>

          {/* The CTA row stays intentionally simple so the brand and message lead the composition. */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#join-us"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#123B6D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0E2F59]"
            >
              Join the Movement
            </a>
            <a
              href="#house-of-peace"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#123B6D]/20 bg-white/70 px-6 py-3 text-sm font-semibold text-[#123B6D] transition-colors hover:border-[#123B6D]/35 hover:bg-white"
            >
              Discover Our Mission
            </a>
          </div>
        </div>

        {/* The image column stays aligned to the top so the logo feels placed within one shared composition. */}
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-[#123B6D]/12 bg-[#E7DCCB] shadow-[0_24px_60px_rgba(18,59,109,0.07)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(18,59,109,0.08))]" />
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/50 blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-[#123B6D]/14 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
              <div className="inline-flex w-fit items-center rounded-full border border-[#123B6D]/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#123B6D]/70">
                Image area
              </div>

              <div className="max-w-sm">
                <p className="text-3xl leading-[1.15] text-[#2A2A2A]">
                  A warm image of scouts in action can live here.
                </p>
                <p className="mt-4 text-base leading-8 text-[#2A2A2A]/64">
                  Choose a real photo that shows service, learning, and
                  belonging in the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
