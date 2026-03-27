import GlobalConnectionMap from "@/components/GlobalConnectionMap";

export default function GlobalMovement() {
  return (
    <section
      id="global-movement"
      className="border-y border-[#123B6D]/10 bg-[linear-gradient(180deg,#F0E5D5_0%,#F8F4EC_100%)] px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="eyebrow-text text-xs font-semibold text-[#123B6D]/70">
            A Global Movement for Peace
          </p>
          <h2 className="mt-4 text-3xl leading-[1.16] sm:text-[2.45rem]">
            Local scouting work connected to a wider international vision.
          </h2>
          <p className="mt-6 text-base leading-[1.92] text-[#2A2A2A]/64 sm:text-[1.04rem]">
            The spirit of the House of Peace begins in everyday community life,
            but it does not end there. Each act of service, learning, and
            coexistence becomes part of a wider story shared with people who
            believe that peace is built together.
          </p>
          <p className="mt-4 text-base leading-[1.92] text-[#2A2A2A]/58">
            Through international encounters, May 16, and relationships across
            borders, local action grows into a living connection with a broader
            movement for dignity, dialogue, and belonging.
          </p>

          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#123B6D] transition-colors hover:text-[#0E2F59]"
          >
            Explore our global connections
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <GlobalConnectionMap />
      </div>
    </section>
  );
}
