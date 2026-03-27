import Image from "next/image";

type ProgramCard = {
  title: string;
  description: string;
  kicker: string;
  featured?: boolean;
  tone: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
};

export default function Activities() {
  const activities: ProgramCard[] = [
    {
      title: "Camps and Adventures",
      description: "Night skies, shared fires, and confidence built outdoors.",
      kicker: "Outdoor life",
      featured: true,
      tone: "bg-[#F8F2E8]/92",
      imageSrc:
        "https://images.unsplash.com/photo-1658186302078-eb0ef2bb84c8?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
      imageAlt: "People gathered around a campfire outdoors at night.",
      imagePosition: "object-center",
    },
    {
      title: "Workshops and Learning",
      description: "Hands-on moments that turn ideas into skills and action.",
      kicker: "Learning",
      tone: "bg-[#FBF7EF]/92",
      imageSrc:
        "https://images.unsplash.com/photo-1766932901295-d4185660341b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1400",
      imageAlt: "Children and an adult working together during a crafts workshop.",
      imagePosition: "object-center",
    },
    {
      title: "Community Service",
      description: "Practical care for people, place, and everyday belonging.",
      kicker: "Service",
      tone: "bg-[#F6EFE4]/94",
      imageSrc:
        "https://images.unsplash.com/photo-1758599668280-317754ffe1aa?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1400",
      imageAlt:
        "Volunteers checking a clipboard during a community cleanup in a park.",
      imagePosition: "object-center",
    },
    {
      title: "International Events",
      description: "Encounters that open horizons and connect local to global.",
      kicker: "Exchange",
      tone: "bg-[#FCF8F1]/92",
      imageSrc:
        "https://images.unsplash.com/photo-1768244016479-756ee49fe26c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1400",
      imageAlt: "Young people gathering and enjoying an outdoor event together.",
      imagePosition: "object-center",
    },
  ];

  return (
    <section
      id="activities"
      className="bg-[#FBF8F2] px-6 py-[4.5rem] sm:px-8 sm:py-[5.5rem]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-text text-xs font-semibold text-[#123B6D]/70">
            Programs
          </p>
          <h2 className="mt-4 text-3xl leading-[1.16] sm:text-[2.45rem]">
            Experiences that turn values into lived adventure.
          </h2>
          <p className="mt-5 text-base leading-[1.92] text-[#2A2A2A]/62 sm:text-[1.04rem]">
            A glimpse of the moments where community, challenge, and peace come
            to life.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity) => (
            <article
              key={activity.title}
              className={`${activity.tone} group overflow-hidden rounded-[20px] shadow-[0_14px_28px_rgba(18,59,109,0.04)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_22px_40px_rgba(18,59,109,0.09)] ${
                activity.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Swapping to real program photos later only requires replacing imageSrc and imageAlt in the data above. */}
              <div
                className={`relative overflow-hidden ${
                  activity.featured ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={activity.imageSrc}
                  alt={activity.imageAlt}
                  fill
                  sizes={
                    activity.featured
                      ? "(min-width: 1280px) 66vw, (min-width: 768px) 66vw, 100vw"
                      : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${activity.imagePosition ?? "object-center"}`}
                />

                {/* A darker lower overlay helps the image feel cinematic and ready for future text overlays if needed. */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,244,236,0.04)_0%,rgba(42,42,42,0.12)_50%,rgba(42,42,42,0.42)_100%)]" />
                <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-white/14 blur-3xl" />
                <div className="absolute -right-6 bottom-4 h-24 w-24 rounded-full bg-[#123B6D]/14 blur-2xl" />

                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/16 px-3 py-1.5 backdrop-blur-sm">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/90">
                    {activity.kicker}
                  </p>
                </div>
              </div>

              <div className={activity.featured ? "p-7 sm:p-8" : "p-6 sm:p-7"}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[1.8rem] leading-[1.12] text-[#2A2A2A]">
                      {activity.title}
                    </h3>
                  </div>

                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/64 text-[#123B6D]/54 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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

                <p className="mt-4 max-w-xl text-base leading-8 text-[#2A2A2A]/58">
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
