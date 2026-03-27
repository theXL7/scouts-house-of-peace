type ValueIconType =
  | "coexistence"
  | "community-impact"
  | "peace-education"
  | "personal-growth";

function ValueIcon({ type }: { type: ValueIconType }) {
  const iconClassName = "h-6 w-6 text-[#123B6D]/84";

  switch (type) {
    case "coexistence":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClassName}
          aria-hidden="true"
        >
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M4.5 17c.8-2.1 2.4-3.2 3.5-3.2S10.7 14.9 11.5 17" />
          <path d="M12.5 17c.8-2.1 2.4-3.2 3.5-3.2s2.7 1.1 3.5 3.2" />
        </svg>
      );

    case "community-impact":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClassName}
          aria-hidden="true"
        >
          <path d="M8 12.5l2 2 6-6" />
          <path d="M12 3.5 4.8 6.8v4.8c0 4.3 2.7 7.3 7.2 8.9 4.5-1.6 7.2-4.6 7.2-8.9V6.8L12 3.5Z" />
        </svg>
      );

    case "peace-education":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClassName}
          aria-hidden="true"
        >
          <path d="M5 6.5h8.5a3 3 0 0 1 3 3V19H8a3 3 0 0 0-3 3V6.5Z" />
          <path d="M19 6.5h-2.5" />
          <path d="M8 10h5" />
          <path d="M8 13h5" />
        </svg>
      );

    case "personal-growth":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClassName}
          aria-hidden="true"
        >
          <path d="M12 19V8.5" />
          <path d="M8.5 12 12 8.5 15.5 12" />
          <path d="M5 19h14" />
          <path d="M7 5.5c1.1-.8 2.6-1.3 5-1.3s3.9.5 5 1.3" />
        </svg>
      );
  }
}

export default function Values() {
  const values = [
    {
      title: "Coexistence",
      description:
        "We bring people together across differences with respect, dialogue, and shared responsibility.",
      icon: "coexistence" as const,
      tone: "bg-[#FBF7EF]/92",
      iconTone: "bg-white/82 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:translate-y-0",
    },
    {
      title: "Community Impact",
      description:
        "We serve our communities through action that strengthens care, solidarity, and belonging.",
      icon: "community-impact" as const,
      tone: "bg-[#F6EFE3]/94",
      iconTone:
        "bg-[#FFF9F0]/86 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:translate-y-6",
    },
    {
      title: "Peace Education",
      description:
        "We teach peace as a practice through learning, leadership, and lived experience.",
      icon: "peace-education" as const,
      tone: "bg-[#FCF8F1]/92",
      iconTone: "bg-white/84 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:translate-y-2",
    },
    {
      title: "Personal Growth",
      description:
        "We help young people grow in character, confidence, purpose, and service.",
      icon: "personal-growth" as const,
      tone: "bg-[#F7F1E7]/94",
      iconTone:
        "bg-[#FFF7EC]/86 shadow-[inset_0_0_0_1px_rgba(18,59,109,0.05)]",
      offset: "xl:-translate-y-5",
    },
  ];

  return (
    <section id="values" className="bg-[#EFE5D7] px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-text text-[0.72rem] font-medium text-[#123B6D]/64">
            OUR VALUES
          </p>
          <h2 className="mt-4 text-3xl leading-[1.16] sm:text-[2.45rem]">
            Values that guide how we learn, serve, and grow together.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-8 text-[#2A2A2A]/58">
            They are the quiet principles that help this community learn,
            serve, and grow in peace together.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <button
              key={value.title}
              type="button"
              aria-label={`Explore ${value.title}`}
              className={`${value.tone} ${value.offset} group relative w-full cursor-pointer rounded-[18px] p-7 text-left shadow-[0_12px_24px_rgba(18,59,109,0.035)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_22px_36px_rgba(18,59,109,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B6D]/20 sm:p-8`}
            >
              {/* These can be swapped to real Links later without changing the card structure much. */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-[16px] ${value.iconTone}`}
              >
                <ValueIcon type={value.icon} />
              </div>

              <h3 className="mt-4 font-serif text-[1.8rem] leading-[1.14] text-[#2A2A2A]">
                {value.title}
              </h3>

              <p className="mt-4 text-base leading-8 text-[#2A2A2A]/56">
                {value.description}
              </p>

              <div className="mt-6 flex justify-end">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/64 text-[#123B6D]/54 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
    </section>
  );
}
