import Image from "next/image";
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

function logo(
  label: string,
  src: string,
  width: number,
  height: number,
  className?: string,
  frameClassName?: string
): TrustItem {
  return { type: "logo", label, src, width, height, className, frameClassName };
}

const officialRow: TrustItem[] = [
  { type: "text", label: "Supported by public, civic, and educational institutions" },
  logo(
    "Ministry of Education",
    "/logos/partners/ministry-of-education-ar.png",
    944,
    775,
    "h-10 sm:h-11"
  ),
  logo(
    "Regional Academy of Oriental",
    "/logos/partners/regional-academy-oriental.png",
    512,
    181,
    "h-8 sm:h-9"
  ),
  logo(
    "Commune of Taourirt",
    "/logos/partners/commune-of-taourirt.png",
    709,
    352
  ),
  logo(
    "Ministry of Youth and Sports",
    "/logos/partners/ministry-of-youth-and-sports.png",
    2000,
    2000,
    "h-[3.6rem] sm:h-[4.1rem]"
  ),
  logo("ANEF", "/logos/partners/anef.png", 2000, 2000),
  logo("Anouar Salam", "/logos/partners/anouar-salam.png", 2000, 2000),
  logo(
    "FNCV",
    "/logos/partners/fncv.png",
    3000,
    2963,
    "h-[3.6rem] sm:h-[4.1rem]"
  ),
  logo(
    "Partner Organization",
    "/logos/partners/partner-organization.png",
    1849,
    1428
  ),
  logo(
    "Moroccan Red Crescent",
    "/logos/partners/moroccan-red-crescent.png",
    2822,
    2777
  ),
  logo("Ana Mawhoob", "/logos/partners/ana-mawhoob.png", 2000, 2000),
  logo(
    "Arabic Calligraphy",
    "/logos/partners/arabic-calligraphy.png",
    2000,
    2000
  ),
  { type: "text", label: "Working across youth, culture, and local community life" },
];

const networkRow: TrustItem[] = [
  { type: "text", label: "Connected to scouting, peace, and civil-society networks" },
  logo(
    "Moroccan Scouting League",
    "/logos/partners/ligue-du-scoutisme-marocain.png",
    2000,
    2000,
    "h-[4.2rem] scale-[1.18] sm:h-[4.8rem]",
    "h-[4.6rem] min-w-[12rem] px-6 sm:h-[5.1rem] sm:min-w-[13.5rem] sm:px-7"
  ),
  logo(
    "National Federation of Moroccan Scouting",
    "/logos/partners/federation-nationale-du-scoutisme-marocain.png",
    2000,
    2000,
    "h-[3.6rem] sm:h-[4.1rem]"
  ),
  logo(
    "World Organization of the Scout Movement",
    "/logos/partners/wosm-logo-2024.svg",
    335,
    129,
    "h-9 sm:h-10"
  ),
  logo("Scouts Musulmans de France", "/logos/partners/logo-smf.png", 250, 250),
  logo("ONSG", "/logos/partners/onsg-logo.png", 2000, 2000),
  logo("SHM", "/logos/partners/shm.png", 2000, 2000, "h-[3.6rem] sm:h-[4.1rem]"),
  logo("AISA ONG", "/logos/partners/aids-ong.png", 3000, 2963),
  logo(
    "16 May / Living Together in Peace",
    "/logos/partners/logo-16-may-blue.png",
    251,
    293,
    "h-9 sm:h-10"
  ),
  logo(
    "Huis Van Vrede",
    "/logos/partners/huis-van-vrede-logo.png",
    3000,
    2963
  ),
  logo("Scouts Musulmans d'Espagne", "/logos/partners/sme-logo.png", 3000, 2963),
  logo("16 Mai", "/logos/partners/16-mai.png", 3000, 2963),
  { type: "text", label: "Rooted in service, dialogue, and belonging" },
];

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

export default function TrustStrip() {
  return (
    <section
      id="trust-strip"
      aria-label="Recognition and trust"
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
