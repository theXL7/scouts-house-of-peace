export default function JoinUs() {
  const audienceTags = ["Scouts", "Families", "Volunteers", "Partners"];

  return (
    <section
      id="join-us"
      className="bg-[linear-gradient(180deg,#EDE0D0_0%,#E5D6C3_58%,#DDD0C1_100%)] px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_78%_22%,rgba(233,223,207,0.12),transparent_24%),linear-gradient(138deg,#103762_0%,#153E6C_48%,#1B4C7F_100%)] px-8 py-14 text-white shadow-[0_22px_52px_rgba(18,59,109,0.11)] sm:px-12 sm:py-16 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:px-14 lg:py-[4.5rem]">
        <div className="relative">
          <div className="absolute -left-20 top-2 h-44 w-44 rounded-full bg-white/7 blur-3xl" />
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#E9DFCF]/10 blur-3xl" />

          <div className="relative text-center lg:text-left">
            <p className="eyebrow-text text-xs font-semibold text-white/70">
              JOIN US
            </p>
            <h2 className="mt-4 text-3xl leading-[1.18] !text-[#F7F3EC] sm:text-[2.45rem]">
              There is a place for you in this work of peace.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-[2] text-white/74 sm:text-[1.04rem]">
              Whether you are a young person ready to grow, a family looking
              for belonging, or a partner who shares this vision, you are
              welcome to help shape a more peaceful community with us.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              {audienceTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/66 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <div className="rounded-[18px] border border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,0.065)_0%,rgba(255,255,255,0.04)_100%)] p-6 shadow-[0_12px_28px_rgba(9,27,54,0.05)] backdrop-blur-sm sm:p-7">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/58">
              Ways to take part
            </p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Start with the path that feels closest to you, and we can grow
              from there together.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F2EBDD] px-6 py-3 text-sm font-semibold text-[#123B6D] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F7F3EC]"
              >
                Join as a Scout
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/92 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06]"
              >
                Partner With Us
              </a>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/58">
              We welcome young people, families, volunteers, and institutions
              who want to contribute with care and purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
