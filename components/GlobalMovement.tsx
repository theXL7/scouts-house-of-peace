import Image from "next/image";

import GlobalConnectionMap from "@/components/GlobalConnectionMap";
import type { Messages } from "@/messages/en";
import { withBasePath } from "@/lib/site";

const backgroundLayers = [
  {
    src: withBasePath("/global-movement/soft-peachy-watercolor-texture.png"),
    className: "opacity-100",
  },
  {
    src: withBasePath("/global-movement/faded-world-map-layer.png"),
    className: "opacity-[0.95]",
  },
  {
    src: withBasePath("/global-movement/golden-glow-over-morocco-heart.png"),
    className: "mix-blend-multiply opacity-[0.78]",
  },
  {
    src: withBasePath("/global-movement/dreamy-sparkle-soft-canvas.png"),
    className: "mix-blend-multiply opacity-[0.68]",
  },
] as const;

const mediaCanvasClasses =
  "absolute inset-y-[-6%] left-[-18%] right-[-2%] sm:inset-y-[-8%] sm:left-[-15%] sm:right-[-5%] lg:left-[-4%] lg:right-[-8%] lg:inset-y-[-10%]";

export default function GlobalMovement({
  copy,
  isRtl = false,
}: {
  copy: Messages["globalMovement"];
  isRtl?: boolean;
}) {
  const textAlignment = isRtl ? "text-right" : "text-left";
  const contentEdgeAlignment = isRtl ? "ml-auto" : "mr-auto";
  const ctaDirection = isRtl ? "\u2190" : "\u2192";

  return (
    <section
      id="global-movement"
      className="relative overflow-hidden bg-[#F7F3EC] px-6 py-[5.75rem] sm:px-8 sm:py-[6.5rem]"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-14">
          <div
            className={`order-2 w-full max-w-[38rem] ${contentEdgeAlignment} ${textAlignment} lg:order-1`}
          >
            <p className="eyebrow-text text-[0.78rem] font-medium tracking-[0.28em] text-[#6C8BA0] sm:text-[0.82rem]">
              {copy.eyebrow}
            </p>

            <h2
              className={`mt-5 max-w-[33rem] text-[#3A3937] ${
                isRtl
                  ? "ar-display-heading ml-auto text-[2rem] leading-[1.34] sm:text-[2.38rem] lg:text-[2.74rem]"
                  : "text-[2rem] leading-[1.16] sm:text-[2.35rem] lg:text-[2.6rem]"
              }`}
            >
              {copy.title}
            </h2>

            <p
              className={`mt-7 max-w-[34rem] text-[1.03rem] text-[#5A534C] sm:text-[1.06rem] ${
                isRtl ? "ml-auto leading-[2.02]" : "leading-[1.88]"
              }`}
            >
              {copy.paragraphs[0]}
            </p>

            <p
              className={`mt-5 max-w-[34rem] text-[1rem] text-[#5A534C] sm:text-[1.02rem] ${
                isRtl ? "ml-auto leading-[1.98]" : "leading-[1.84]"
              }`}
            >
              {copy.paragraphs[1]}
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-[18px] border border-[#E2D3C0] bg-white/76 px-6 py-3 text-[1rem] font-medium text-[#4C4944] shadow-[0_14px_32px_rgba(42,42,42,0.07)] backdrop-blur-sm transition-all hover:border-[#D9C3A5] hover:bg-white/84 sm:mt-9"
            >
              {copy.cta}
              <span aria-hidden="true">{ctaDirection}</span>
            </a>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-[40rem]">
              <div className={mediaCanvasClasses}>
                <div className="pointer-events-none absolute inset-0">
                  {backgroundLayers.map((layer) => (
                    <div key={layer.src} className="absolute inset-0">
                      <Image
                        src={layer.src}
                        alt=""
                        fill
                        unoptimized
                        className={`object-cover object-center ${layer.className}`}
                        sizes="100vw"
                      />
                    </div>
                  ))}

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,236,0.28)_0%,rgba(247,243,236,0.04)_18%,rgba(247,243,236,0.05)_82%,rgba(247,243,236,0.38)_100%)] lg:bg-[linear-gradient(90deg,rgba(247,243,236,0.28)_0%,rgba(247,243,236,0.08)_18%,rgba(247,243,236,0.03)_44%,rgba(247,243,236,0.04)_100%)]" />
                </div>

                <div className="absolute inset-0 z-10 opacity-[0.94] sm:opacity-100">
                  <GlobalConnectionMap copy={copy} isRtl={isRtl} />
                </div>

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F7F3EC] via-[#F7F3EC]/70 to-transparent sm:h-20 lg:h-24" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F7F3EC] via-[#F7F3EC]/72 to-transparent sm:h-20 lg:h-24" />
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F7F3EC] via-[#F7F3EC]/74 to-transparent sm:w-20 lg:w-24" />
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F7F3EC] via-[#F7F3EC]/74 to-transparent sm:w-20 lg:w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
