import Image from "next/image";
import { withBasePath } from "@/lib/site";

export default function HouseOfPeace() {
  return (
    <section
      id="house-of-peace"
      className="bg-[linear-gradient(180deg,#FAF6EE_0%,#F3E7D8_100%)] px-6 py-[6rem] sm:px-8 sm:py-[7rem]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-[4.5rem]">
        <div className="text-center lg:text-left">
          <p className="eyebrow-text text-[0.72rem] font-medium text-[#123B6D]/58">
            The House of Peace
          </p>

          <h2 className="mt-5 text-3xl leading-[1.14] sm:text-[2.55rem]">
            Where coexistence, belonging, and growth come to life.
          </h2>

          <p className="mt-7 text-base leading-[1.95] text-[#2A2A2A]/66 sm:text-[1.05rem]">
            The House of Peace brings young people and communities together
            through scouting, learning, and service. It is a place where
            peacebuilding is not only discussed, but practiced through everyday
            relationships, responsibility, and shared experience.
          </p>

          <p className="mt-5 text-base leading-[1.95] text-[#2A2A2A]/60 sm:text-[1.02rem]">
            It holds both a welcoming local spirit and a wider vision: helping
            people grow with dignity, live together across differences, and
            build a stronger culture of peace in community life.
          </p>
        </div>

        <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] border border-[#123B6D]/12 shadow-[0_24px_55px_rgba(18,59,109,0.06)]">
          <Image
            src={withBasePath("/scouts-house-of-peace-logo.png")}
            alt="Scouts of the House of Peace visual"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,238,0.08),rgba(18,59,109,0.12))]" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/12" />
        </div>
      </div>
    </section>
  );
}
