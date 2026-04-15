import Image from "next/image";

import type { Messages } from "@/messages/en";
import { withBasePath } from "@/lib/site";

const valueCards = [
  {
    iconSrc: "/values/coexistence.png",
    tone: "bg-[#FBF7EF]/92",
    iconTone: "bg-white/82 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
    offset: "xl:translate-y-0",
  },
  {
    iconSrc: "/values/community-impact.png",
    tone: "bg-[#F6EFE3]/94",
    iconTone:
      "bg-[#FFF9F0]/86 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
    offset: "xl:translate-y-6",
  },
  {
    iconSrc: "/values/peace-education.png",
    tone: "bg-[#FCF8F1]/92",
    iconTone: "bg-white/84 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
    offset: "xl:translate-y-2",
  },
  {
    iconSrc: "/values/personal-growth.png",
    tone: "bg-[#F7F1E7]/94",
    iconTone:
      "bg-[#FFF7EC]/86 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
    offset: "xl:-translate-y-5",
  },
] as const;

export default function Values({
  copy,
  actionLabel,
  isRtl = false,
}: {
  copy: Messages["values"];
  actionLabel: string;
  isRtl?: boolean;
}) {
  const values = valueCards.map((card, index) => ({
    ...card,
    ...copy.cards[index],
  }));

  return (
    <section
      id="values"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#EFE5D7_0%,#ECE2D2_56%,#DCE7EE_100%)] px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={withBasePath("/values/camping-background.png")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-75 [mask-image:linear-gradient(to_bottom,black_0%,black_62%,rgba(0,0,0,0.4)_82%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(239,229,215,0.5)_0%,rgba(239,229,215,0.12)_36%,rgba(235,228,217,0.12)_62%,rgba(220,231,238,0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(220,231,238,0)_0%,rgba(220,231,238,0.82)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-text text-[0.72rem] font-medium text-[#123B6D]/64">
            {copy.eyebrow}
          </p>
          <h2
            className={`mt-4 !text-[#010048] ${
              isRtl
                ? "ar-display-heading text-[2.14rem] leading-[1.24] sm:text-[2.62rem]"
                : "text-3xl leading-[1.16] sm:text-[2.45rem]"
            }`}
          >
            {copy.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-8 text-[#2A2A2A]/58">
            {copy.description}
          </p>
        </div>

        <div className="relative mt-12">
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <button
                key={value.title}
                type="button"
                aria-label={`${actionLabel} ${value.title}`}
                className={`${value.tone} ${value.offset} group relative w-full cursor-pointer rounded-[18px] p-7 shadow-[0_12px_24px_rgba(18,59,109,0.035)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:bg-[#6D7755] hover:shadow-[0_22px_36px_rgba(18,59,109,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B6D]/20 sm:p-8 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {/* These can be swapped to real Links later without changing the card structure much. */}
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[16px] ${value.iconTone} transition-colors duration-300 group-hover:bg-white/18`}
                >
                  <div className="relative h-11 w-11">
                    <Image
                      src={withBasePath(value.iconSrc)}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3
                  className={`mt-4 min-h-[2.2rem] text-center font-serif !text-[#010048] transition-colors duration-300 group-hover:!text-[#C9F2FF] sm:text-[1.7rem] xl:text-[1.45rem] ${
                    isRtl
                      ? "text-[1.48rem] leading-[1.32] whitespace-normal"
                      : "text-[1.55rem] leading-[1.1] whitespace-nowrap"
                  }`}
                >
                  {value.title}
                </h3>

                <p
                  className={`mt-4 text-base text-[#2A2A2A]/56 transition-colors duration-300 group-hover:text-[#C9F2FF] ${
                    isRtl ? "leading-[2.05]" : "leading-8"
                  }`}
                >
                  {value.description}
                </p>

                <div className="mt-6 flex justify-end">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/64 text-[#123B6D]/54 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-white/18 group-hover:text-[#C9F2FF]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
