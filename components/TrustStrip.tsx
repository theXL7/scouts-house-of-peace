import Image from "next/image";

import type { Messages } from "@/messages/en";
import { withBasePath } from "@/lib/site";

type TrustItem =
  | {
      type: "text";
      label: string;
    }
  | {
      type: "logo";
      label: string;
      src: string;
      width: number;
      height: number;
      className?: string;
      frameClassName?: string;
    };

type LogoLabelKey = keyof Messages["trustStrip"]["logos"];

type LogoConfig = {
  key: LogoLabelKey;
  src: string;
  width: number;
  height: number;
  className?: string;
  frameClassName?: string;
};

const officialLogoConfigs: LogoConfig[] = [
  {
    key: "ministryEducation",
    src: "/logos/partners/ministry-of-education-ar.png",
    width: 944,
    height: 775,
    className: "h-10 sm:h-11",
  },
  {
    key: "regionalAcademyOriental",
    src: "/logos/partners/regional-academy-oriental.png",
    width: 512,
    height: 181,
    className: "h-8 sm:h-9",
  },
  {
    key: "communeTaourirt",
    src: "/logos/partners/commune-of-taourirt.png",
    width: 709,
    height: 352,
  },
  {
    key: "ministryYouthSports",
    src: "/logos/partners/ministry-of-youth-and-sports.png",
    width: 2000,
    height: 2000,
    className: "h-[3.6rem] sm:h-[4.1rem]",
  },
  { key: "anef", src: "/logos/partners/anef.png", width: 2000, height: 2000 },
  {
    key: "anouarSalam",
    src: "/logos/partners/anouar-salam.png",
    width: 2000,
    height: 2000,
  },
  {
    key: "fncv",
    src: "/logos/partners/fncv.png",
    width: 3000,
    height: 2963,
    className: "h-[3.6rem] sm:h-[4.1rem]",
  },
  {
    key: "partnerOrganization",
    src: "/logos/partners/partner-organization.png",
    width: 1849,
    height: 1428,
  },
  {
    key: "moroccanRedCrescent",
    src: "/logos/partners/moroccan-red-crescent.png",
    width: 2822,
    height: 2777,
  },
  {
    key: "anaMawhoob",
    src: "/logos/partners/ana-mawhoob.png",
    width: 2000,
    height: 2000,
  },
  {
    key: "arabicCalligraphy",
    src: "/logos/partners/arabic-calligraphy.png",
    width: 2000,
    height: 2000,
  },
];

const networkLogoConfigs: LogoConfig[] = [
  {
    key: "moroccanScoutingLeague",
    src: "/logos/partners/ligue-du-scoutisme-marocain.png",
    width: 2000,
    height: 2000,
    className: "h-[4.2rem] scale-[1.18] sm:h-[4.8rem]",
    frameClassName:
      "h-[4.6rem] min-w-[12rem] px-6 sm:h-[5.1rem] sm:min-w-[13.5rem] sm:px-7",
  },
  {
    key: "nationalFederationMoroccanScouting",
    src: "/logos/partners/federation-nationale-du-scoutisme-marocain.png",
    width: 2000,
    height: 2000,
    className: "h-[3.6rem] sm:h-[4.1rem]",
  },
  {
    key: "worldOrganizationScoutMovement",
    src: "/logos/partners/wosm-logo-2024.svg",
    width: 335,
    height: 129,
    className: "h-9 sm:h-10",
  },
  {
    key: "scoutsMusulmansFrance",
    src: "/logos/partners/logo-smf.png",
    width: 250,
    height: 250,
  },
  { key: "onsg", src: "/logos/partners/onsg-logo.png", width: 2000, height: 2000 },
  {
    key: "shm",
    src: "/logos/partners/shm.png",
    width: 2000,
    height: 2000,
    className: "h-[3.6rem] sm:h-[4.1rem]",
  },
  {
    key: "aisaOng",
    src: "/logos/partners/aids-ong.png",
    width: 3000,
    height: 2963,
  },
  {
    key: "may16LivingTogetherPeace",
    src: "/logos/partners/logo-16-may-blue.png",
    width: 251,
    height: 293,
    className: "h-9 sm:h-10",
  },
  {
    key: "huisVanVrede",
    src: "/logos/partners/huis-van-vrede-logo.png",
    width: 3000,
    height: 2963,
  },
  {
    key: "scoutsMusulmansEspagne",
    src: "/logos/partners/sme-logo.png",
    width: 3000,
    height: 2963,
  },
  {
    key: "may16",
    src: "/logos/partners/16-mai.png",
    width: 3000,
    height: 2963,
  },
];

function logo(config: LogoConfig, labels: Messages["trustStrip"]["logos"]): TrustItem {
  return {
    type: "logo",
    label: labels[config.key],
    src: config.src,
    width: config.width,
    height: config.height,
    className: config.className,
    frameClassName: config.frameClassName,
  };
}

function TrustSequence({
  items,
  hidden = false,
}: {
  items: TrustItem[];
  hidden?: boolean;
}) {
  return (
    <div
      className={[
        "trust-sequence flex shrink-0 items-center gap-4 px-4 sm:gap-5 sm:px-5",
        hidden ? "trust-sequence-copy" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={hidden}
    >
      {items.map((item, index) => {
        const key = `${item.type}-${item.label}-${index}-${hidden ? "copy" : "main"}`;

        if (item.type === "text") {
          return (
            <div
              key={key}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap text-[0.92rem] text-[#2A2A2A]/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#B86A4A]/45" />
              <span>{item.label}</span>
            </div>
          );
        }

        return (
          <div
            key={key}
            className={`group flex h-[4rem] min-w-[9.5rem] shrink-0 items-center justify-center rounded-full border border-[#264D3B]/10 bg-[#E7E1D8]/90 px-7 shadow-[0_8px_18px_rgba(38,77,59,0.05)] backdrop-blur-[2px] transition-transform duration-300 hover:-translate-y-[1px] sm:h-[4.45rem] sm:min-w-[11rem] sm:px-8 ${item.frameClassName ?? ""}`}
            title={item.label}
          >
            {/* Keep each logo inside the same soft frame so mixed source files feel intentional. */}
            <div className="relative flex items-center justify-center opacity-[0.92] transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src={withBasePath(item.src)}
                alt={item.label}
                width={item.width}
                height={item.height}
                sizes="(min-width: 640px) 192px, 152px"
                className={`h-10 w-auto max-w-none object-contain sm:h-11 ${item.className ?? ""}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  speedClass = "trust-marquee-track--slow",
}: {
  items: TrustItem[];
  reverse?: boolean;
  speedClass?: string;
}) {
  return (
    <div className="trust-marquee">
      {/* Duplicate the sequence so each row can loop without a visible jump. */}
      <div
        className={[
          "trust-marquee-track",
          speedClass,
          reverse ? "trust-marquee-track--reverse" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <TrustSequence items={items} />
        <TrustSequence items={items} hidden />
      </div>
    </div>
  );
}

export default function TrustStrip({ copy }: { copy: Messages["trustStrip"] }) {
  const officialRow: TrustItem[] = [
    { type: "text", label: copy.officialTextStart },
    ...officialLogoConfigs.map((item) => logo(item, copy.logos)),
    { type: "text", label: copy.officialTextEnd },
  ];

  const networkRow: TrustItem[] = [
    { type: "text", label: copy.networkTextStart },
    ...networkLogoConfigs.map((item) => logo(item, copy.logos)),
    { type: "text", label: copy.networkTextEnd },
  ];

  return (
    <section
      id="trust-strip"
      aria-label={copy.ariaLabel}
      dir="ltr"
      className="overflow-hidden border-y border-[#264D3B]/10 bg-[#E9E3D9]"
    >
      <div className="relative py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-[linear-gradient(90deg,#E9E3D9,rgba(233,227,217,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-[linear-gradient(270deg,#E9E3D9,rgba(233,227,217,0))]" />

        <div className="space-y-3">
          <MarqueeRow items={officialRow} speedClass="trust-marquee-track--slow" />
          <MarqueeRow
            items={networkRow}
            reverse
            speedClass="trust-marquee-track--slower"
          />
        </div>
      </div>
    </section>
  );
}
