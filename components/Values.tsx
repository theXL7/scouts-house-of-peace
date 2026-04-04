import Image from "next/image";
import { withBasePath } from "@/lib/site";

export default function Values() {
  const values = [
    {
      title: "Coexistence",
      description:
        "We bring people together across differences with respect, dialogue, and shared responsibility.",
      iconSrc: "/values/coexistence.png",
      tone: "bg-[#FBF7EF]/92",
      iconTone: "bg-white/82 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:translate-y-0",
    },
    {
      title: "Service",
      description:
        "We serve our communities through action that strengthens care, solidarity, and belonging.",
      iconSrc: "/values/community-impact.png",
      tone: "bg-[#F6EFE3]/94",
      iconTone:
        "bg-[#FFF9F0]/86 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:translate-y-6",
    },
    {
      title: "Peace Education",
      description:
        "We teach peace as a practice through learning, leadership, and lived experience.",
      iconSrc: "/values/peace-education.png",
      tone: "bg-[#FCF8F1]/92",
      iconTone: "bg-white/84 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:translate-y-2",
    },
    {
      title: "Personal Growth",
      description:
        "We help young people grow in character, confidence, purpose, and service.",
      iconSrc: "/values/personal-growth.png",
      tone: "bg-[#F7F1E7]/94",
      iconTone:
        "bg-[#FFF7EC]/86 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:-translate-y-5",
    },
  ];

  return (
    <section
      id="values"
      className="relative overflow-hidden bg-[#EFE5D7] px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={withBasePath("/values/camping-background.png")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-75"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(239,229,215,0.5),rgba(239,229,215,0.08)_36%,rgba(239,229,215,0.58))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-text text-[0.72rem] font-medium text-[#123B6D]/64">
            OUR VALUES
          </p>
          <h2 className="mt-4 text-3xl leading-[1.16] !text-[#010048] sm:text-[2.45rem]">
            Values that guide how we learn, serve, and grow together.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-8 text-[#2A2A2A]/58">
            They are the quiet principles that help this community learn,
            serve, and grow in peace together.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <button
                key={value.title}
                type="button"
                aria-label={`Explore ${value.title}`}
                className={`${value.tone} ${value.offset} group relative w-full cursor-pointer rounded-[18px] p-7 text-left shadow-[0_12px_24px_rgba(18,59,109,0.035)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:bg-[#6D7755] hover:shadow-[0_22px_36px_rgba(18,59,109,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B6D]/20 sm:p-8`}
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

                <h3 className="mt-4 min-h-[2.2rem] whitespace-nowrap text-center font-serif text-[1.55rem] leading-[1.1] !text-[#010048] transition-colors duration-300 group-hover:!text-[#C9F2FF] sm:text-[1.7rem] xl:text-[1.45rem]">
                  {value.title}
                </h3>

                <p className="mt-4 text-base leading-8 text-[#2A2A2A]/56 transition-colors duration-300 group-hover:text-[#C9F2FF]">
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
