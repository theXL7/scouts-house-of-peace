type RibbonItem =
  | { type: "text"; label: string }
  | { type: "logo"; label: string };

const ribbonItems: RibbonItem[] = [
  { type: "text", label: "Member of the Moroccan Scouting League" },
  { type: "logo", label: "League" },
  { type: "text", label: "Recognized nationally" },
  { type: "logo", label: "Partners" },
  { type: "text", label: "Rooted in community service" },
  { type: "logo", label: "Institutions" },
];

function RibbonSequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-4 px-4 sm:gap-5 sm:px-5"
      aria-hidden={hidden}
    >
      {ribbonItems.map((item) =>
        item.type === "text" ? (
          <div
            key={`${item.type}-${item.label}-${hidden ? "copy" : "main"}`}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap text-sm text-[#2A2A2A]/58"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#123B6D]/34" />
            <span>{item.label}</span>
          </div>
        ) : (
          <div
            key={`${item.type}-${item.label}-${hidden ? "copy" : "main"}`}
            className="flex h-8 shrink-0 items-center gap-2 rounded-full border border-[#123B6D]/10 bg-white/58 px-3"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#123B6D]/10 bg-[#123B6D]/6 text-[0.45rem] font-semibold uppercase tracking-[0.16em] text-[#123B6D]/56">
              {item.label.charAt(0)}
            </div>
            <span className="whitespace-nowrap text-[0.68rem] uppercase tracking-[0.18em] text-[#123B6D]/46">
              {item.label}
            </span>
          </div>
        )
      )}
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section
      id="trust-strip"
      aria-label="Recognition and trust"
      className="overflow-hidden border-y border-[#123B6D]/10 bg-[#F5EDE0]"
    >
      <div className="relative py-3.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(90deg,#F5EDE0,rgba(245,237,224,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(270deg,#F5EDE0,rgba(245,237,224,0))]" />

        {/* One animated track with the full sequence duplicated creates the seamless loop. */}
        <div className="trust-marquee">
          <div className="trust-marquee-track">
            <RibbonSequence />
            <RibbonSequence hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
