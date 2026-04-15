import Image from "next/image";

import type { Messages } from "@/messages/en";
import { withBasePath } from "@/lib/site";

type ProgramCard = {
  title: string;
  description: string;
  kicker: string;
  featured?: boolean;
  wide?: boolean;
  tone: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
};

const activityCards = [
  {
    featured: true,
    tone: "bg-[#F8F2E8]/92",
    imageSrc: withBasePath("/activities/programs/camps-and-adventures.jpg"),
    imageAlt: "Scouts hiking together on a mountain trail during an outdoor trek.",
    imagePosition: "object-[center_72%]",
  },
  {
    tone: "bg-[#FBF7EF]/92",
    imageSrc: withBasePath("/activities/programs/workshops-and-learning.jpg"),
    imageAlt:
      "A scout leader guiding children during a hands-on learning workshop.",
    imagePosition: "object-[center_42%]",
  },
  {
    tone: "bg-[#F6EFE4]/94",
    imageSrc: withBasePath("/activities/programs/community-service.jpg"),
    imageAlt:
      "Scouts gathering outdoors during a volunteering activity in the community.",
    imagePosition: "object-[center_52%]",
  },
  {
    wide: true,
    tone: "bg-[#FCF8F1]/92",
    imageSrc: withBasePath("/activities/programs/international-events.jpg"),
    imageAlt:
      "Young people and scout leaders gathered in a circle during an international exchange event.",
    imagePosition: "object-[center_80%]",
  },
] as const;

export default function Activities({
  copy,
  isRtl = false,
}: {
  copy: Messages["activities"];
  isRtl?: boolean;
}) {
  const activities: ProgramCard[] = copy.cards.map((card, index) => ({
    ...card,
    ...activityCards[index],
  }));

  return (
    <section
      id="activities"
      className="relative overflow-hidden bg-[#DCE7EE] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 [mask-image:linear-gradient(to_top,black_0%,black_62%,rgba(0,0,0,0.42)_82%,transparent_100%)]">
          {/* Keeping the scene in its own layer makes it easy to swap for the final artwork later. */}
          <Image
            src={withBasePath("/activities/programs-background.png")}
            alt=""
            width={1536}
            height={1024}
            sizes="100vw"
            className="h-auto w-full opacity-[0.96] saturate-[0.98] contrast-[1.02]"
          />
        </div>
        {/* A cool top fade helps the artwork disappear into the section color instead of stopping suddenly. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,231,238,0.99)_0%,rgba(220,231,238,0.97)_12%,rgba(220,231,238,0.86)_24%,rgba(220,231,238,0.46)_38%,rgba(242,236,226,0.16)_58%,rgba(244,237,226,0.34)_78%,rgba(244,237,226,0.56)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,251,246,0.44),transparent_24%),radial-gradient(circle_at_18%_38%,rgba(78,98,116,0.08),transparent_23%),radial-gradient(circle_at_84%_36%,rgba(78,98,116,0.07),transparent_22%),radial-gradient(circle_at_50%_74%,rgba(255,250,245,0.18),transparent_28%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-text text-xs font-semibold text-[#123B6D]/70">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl leading-[1.16] sm:text-[2.45rem]">
            {copy.title}
          </h2>
          <p className="mt-5 text-base leading-[1.92] text-[#2A2A2A]/62 sm:text-[1.04rem]">
            {copy.description}
          </p>
        </div>

        <div className="mt-12 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity) => (
            <article
              key={activity.title}
              className={`${activity.tone} group overflow-hidden rounded-[20px] shadow-[0_14px_28px_rgba(18,59,109,0.04)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_22px_40px_rgba(18,59,109,0.09)] ${
                activity.featured
                  ? "md:col-span-2"
                  : activity.wide
                    ? "xl:col-span-2"
                    : ""
              }`}
            >
              {/* Swapping to real program photos later only requires replacing imageSrc and imageAlt in the data above. */}
              <div
                className={`relative overflow-hidden ${
                  activity.featured
                    ? "aspect-[16/9]"
                    : activity.wide
                      ? "aspect-[4/3] xl:aspect-[11/4]"
                      : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={activity.imageSrc}
                  alt={activity.imageAlt}
                  fill
                  sizes={
                    activity.featured
                      ? "(min-width: 1280px) 66vw, (min-width: 768px) 66vw, 100vw"
                      : activity.wide
                        ? "(min-width: 1280px) 66vw, (min-width: 768px) 50vw, 100vw"
                        : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${activity.imagePosition ?? "object-center"}`}
                />

                {/* A darker lower overlay helps the image feel cinematic and ready for future text overlays if needed. */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,244,236,0.04)_0%,rgba(42,42,42,0.12)_50%,rgba(42,42,42,0.42)_100%)]" />
                <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-white/14 blur-3xl" />
                <div className="absolute -right-6 bottom-4 h-24 w-24 rounded-full bg-[#123B6D]/14 blur-2xl" />

                <div
                  className={`absolute top-4 rounded-full border border-white/20 bg-white/16 px-3 py-1.5 backdrop-blur-sm ${
                    isRtl ? "right-4" : "left-4"
                  }`}
                >
                  <p
                    className={`text-[0.68rem] font-medium text-white/90 ${
                      isRtl ? "tracking-[0.04em]" : "uppercase tracking-[0.2em]"
                    }`}
                  >
                    {activity.kicker}
                  </p>
                </div>
              </div>

              <div
                className={`${activity.featured ? "p-7 sm:p-8" : "p-6 sm:p-7"} ${
                  isRtl ? "text-right" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[1.8rem] leading-[1.12] !text-[#2A2A2A] transition-colors duration-300 group-hover:!text-[#264D3B]">
                      {activity.title}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/64 text-[#123B6D]/54 transition-transform duration-300 ${
                      isRtl
                        ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`}
                  >
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

                <p className="mt-4 max-w-xl text-base leading-8 text-[#2A2A2A]/58 transition-colors duration-300 group-hover:text-[#123B6D]">
                  {activity.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
