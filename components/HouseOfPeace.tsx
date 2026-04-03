import Image from "next/image";
import { withBasePath } from "@/lib/site";

// Keep the section assets and right-side media tuning together
// so the component body is easier to scan and adjust.
const houseOfPeaceConfig = {
  assets: {
    panel: withBasePath("/house-of-peace/color-container-palette.svg"),
    wash: withBasePath("/house-of-peace/soft-background-wash.svg"),
    frame: withBasePath("/house-of-peace/video-container.png"),
    foliage: withBasePath("/house-of-peace/dense-foliage.svg"),
    pigeonThree: withBasePath("/hero/pigeon 3.png"),
    scenery: withBasePath("/house-of-peace/green-scenery-castle.svg"),
    mountain: withBasePath("/house-of-peace/taourirt-mountain.svg"),
    branchOne: withBasePath("/house-of-peace/olive-branch-1.svg"),
    branchTwo: withBasePath("/house-of-peace/olive-branch-2.svg"),
  },
  media: {
    canvasClasses: "relative aspect-[11/9]",
    outerContainerClasses: "absolute inset-0 z-20",
    insetClasses:
      "top-[2.8%] right-[0.8%] bottom-[4.2%] left-[6%] sm:top-[2.5%] sm:right-[0.6%] sm:bottom-[4%] sm:left-[5.2%] lg:top-[2.2%] lg:right-[0.4%] lg:bottom-[3.8%] lg:left-[4.6%]",
    roundedClasses: "rounded-[18px] sm:rounded-[24px]",
    bottomFoliageLayerClasses:
      "pointer-events-none absolute inset-0 z-[6]",
    bottomFoliageLeftClasses:
      "absolute bottom-[-6%] left-[-16%] hidden h-[88%] w-[88%] opacity-85 sm:block lg:bottom-[-7%] lg:left-[-20%] lg:h-[108%] lg:w-[108%]",
    bottomFoliageRightClasses:
      "absolute bottom-[-6%] right-[-6%] hidden h-[88%] w-[88%] opacity-85 sm:block lg:bottom-[-7%] lg:right-[-8%] lg:h-[108%] lg:w-[108%]",
    frameWrapperClasses: "absolute z-20 overflow-hidden",
    placeholderClasses: "absolute inset-0 ring-1 ring-inset ring-[#264D3B]/12",
    frameLayerClasses: "pointer-events-none absolute inset-0 z-10",
    branchesLayerClasses: "pointer-events-none absolute inset-0 z-30",
    branchOneClasses:
      "absolute bottom-[-4%] right-[1%] hidden h-[46%] w-[46%] opacity-88 sm:block lg:bottom-[-5%] lg:right-[1.5%] lg:h-[50%] lg:w-[50%]",
    branchTwoClasses:
      "absolute bottom-[-2.5%] right-[-7%] hidden h-[46%] w-[46%] opacity-88 sm:block lg:bottom-[-3.5%] lg:right-[-7.5%] lg:h-[50%] lg:w-[50%]",
    pigeonThreeClasses:
      "absolute bottom-[-10%] right-[18%] z-50 hidden h-[12%] w-[12%] opacity-85 md:block lg:bottom-[-11%] lg:right-[20%] lg:h-[11.5%] lg:w-[11.5%]",
  },
} as const;

const houseOfPeaceTags = [
  "Coexistence",
  "Belonging",
  "Growth",
] as const;

const featuredIntroClasses =
  "mx-auto max-w-[30.25rem] text-[1.08rem] font-medium italic leading-[1.75] tracking-[0.006em] text-[#364136] sm:text-[1.17rem] lg:mx-0 lg:max-w-[31rem]";

const supportingParagraphClasses =
  "mx-auto max-w-[31rem] text-[1rem] leading-[1.78] text-[#453D36] sm:text-[1.04rem] lg:mx-0";

function HouseOfPeaceEyebrow() {
  return (
    <div className="inline-flex flex-col items-center lg:items-start">
      <p className="eyebrow-text text-[0.78rem] font-medium uppercase leading-none tracking-[0.34em] text-[#4A5E4A] sm:text-[0.82rem]">
        THE HOUSE OF PEACE
      </p>
      <div
        aria-hidden="true"
        className="mt-3 h-px w-[14.75rem] rounded-full bg-gradient-to-r from-[#E4D6BC]/40 via-[#CFAE79]/86 to-[#E4D6BC]/40 sm:w-[15.75rem]"
      />
    </div>
  );
}

function EditorialDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto w-[80%] max-w-[22.5rem] sm:w-[82%] sm:max-w-[24rem] lg:mx-0 lg:w-[84%] lg:max-w-none ${className}`}
    >
      <div className="h-[0.5px] rounded-full bg-gradient-to-r from-transparent via-[#D6C1A0]/55 to-transparent" />
    </div>
  );
}

function HeadlineDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto mb-5 mt-6 w-[82%] max-w-[23rem] sm:mb-6 sm:mt-7 sm:w-[84%] sm:max-w-[24.5rem] lg:mx-0 lg:w-[85%] lg:max-w-none"
    >
      <div className="h-px rounded-full bg-gradient-to-r from-transparent via-[#D3B88A]/68 to-transparent" />
    </div>
  );
}

export default function HouseOfPeace() {
  const { assets, media } = houseOfPeaceConfig;
  const sharedFrameWrapperClasses = `${media.frameWrapperClasses} ${media.insetClasses} ${media.roundedClasses}`;

  return (
    <section
      id="house-of-peace"
      className="overflow-hidden bg-[linear-gradient(180deg,#FAF6EE_0%,#F0E5D7_100%)] px-6 py-[6rem] sm:px-8 sm:py-[7rem]"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* The wash needs to sit outside the palette stack, otherwise the
            largely opaque panel art hides it almost completely. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-12%] top-[26%] bottom-[-40%] z-0 hidden opacity-95 mix-blend-multiply sm:block lg:inset-x-[-14%] lg:top-[28%] lg:bottom-[-44%]"
        >
          <Image
            src={assets.wash}
            alt=""
            fill
            unoptimized
            className="object-cover object-bottom"
            sizes="100vw"
          />
        </div>

        <div className="relative isolate z-10">
          {/* Main cream panel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-1.5%] inset-y-[-1.5%] z-[1] opacity-[0.98] sm:inset-x-[-2%] sm:inset-y-[-2%] lg:inset-x-[-2.5%] lg:inset-y-[-2.5%]"
          >
            <Image
              src={assets.panel}
              alt=""
              fill
              unoptimized
              className="object-contain object-center scale-[1.3] sm:scale-[1.32] lg:scale-[1.34] drop-shadow-[0_24px_52px_rgba(38,77,59,0.09)]"
              sizes="100vw"
            />
          </div>

          {/* Front olive branches frame the panel from both sides. */}
          <div className={media.branchesLayerClasses}>
            <div aria-hidden="true" className={media.branchOneClasses}>
              <Image
                src={assets.branchTwo}
                alt=""
                fill
                unoptimized
                className="object-contain object-bottom scale-x-[-1]"
                sizes="(min-width: 1024px) 18vw, 0vw"
              />
            </div>

            <div aria-hidden="true" className={media.branchTwoClasses}>
              <Image
                src={assets.branchOne}
                alt=""
                fill
                unoptimized
                className="object-contain object-bottom"
                sizes="(min-width: 1024px) 18vw, 0vw"
              />
            </div>
          </div>

          {/* Bottom-left scenery with castle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-22%] left-[-58%] z-10 hidden h-[74%] w-[108%] opacity-85 md:block lg:bottom-[-24%] lg:left-[-62%] lg:h-[80%] lg:w-[114%] lg:opacity-90"
          >
            <Image
              src={assets.scenery}
              alt=""
              fill
              unoptimized
              className="object-contain object-left-bottom scale-x-[-1]"
              sizes="100vw"
            />
          </div>

          {/* Bottom-right Taourirt mountain */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-30%] right-[-18%] z-10 hidden h-[40%] w-[52%] opacity-100 md:block lg:bottom-[-34%] lg:right-[-20%] lg:h-[46%] lg:w-[54%] lg:opacity-100"
          >
            <Image
              src={assets.mountain}
              alt=""
              fill
              unoptimized
              className="object-contain object-bottom"
              sizes="(min-width: 1024px) 15vw, 0vw"
            />
          </div>

          {/* Pigeon 3 sits just above the mountain and above the scarf layer. */}
          <div aria-hidden="true" className={media.pigeonThreeClasses}>
            <Image
              src={assets.pigeonThree}
              alt=""
              fill
              unoptimized
              className="object-contain blur-[0.5px]"
              sizes="44px"
            />
          </div>

          <div className="relative z-20 grid gap-14 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:px-16 lg:py-[5.4rem] xl:px-[4.75rem]">
            <div className="relative mx-auto max-w-[33rem] -translate-y-3 pt-1 text-center sm:-translate-y-4 sm:pt-2 lg:mx-0 lg:-translate-y-5 lg:pr-6 lg:pt-4 lg:text-left">
              <HouseOfPeaceEyebrow />

              <h2 className="mt-4 text-[1.95rem] leading-[1.08] tracking-[-0.02em] text-[#090088] sm:mt-5 sm:text-[2.05rem] lg:text-[2.22rem]">
                <span className="block sm:whitespace-nowrap color-[#090088]">Where young people learn,</span>
                <span className="mt-1.5 block sm:whitespace-nowrap color-[#090088]">serve, and grow together.</span>
              </h2>

              <HeadlineDivider />

              <p className={featuredIntroClasses}>
                Maison de La Paix is a <span className="italic">place of belonging</span>, where
                scouting, education, and service help turn peace into
                something lived each day.
              </p>

              <EditorialDivider className="my-3 sm:my-4 md:my-5" />

              <p className={supportingParagraphClasses}>
                Rooted in community and open to the wider world, it nurtures
                responsibility, mutual respect, and the ability to live well across
                differences.
              </p>

              <EditorialDivider className="mb-3 mt-4 sm:mb-4 sm:mt-5 md:mb-5 md:mt-6" />

              <ul className="-mt-2 flex flex-wrap items-center justify-center gap-4 sm:-mt-3 sm:gap-5 lg:flex-nowrap lg:justify-start">
                {houseOfPeaceTags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#D6C1A0]/75 bg-[#FBF6EB]/92 px-5 py-3 text-[0.94rem] font-medium tracking-[0.01em] text-[#4A5E4A] shadow-[0_8px_20px_rgba(92,78,57,0.06)] sm:px-6">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-full max-w-[56rem]">
                <div className="relative aspect-[11/9]">
                  <div className="absolute left-[28%] right-[-15%] top-[-2%] bottom-[4%]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-[4%] z-0 translate-y-[4%] rounded-[28px] bg-[#2A2A2A]/26 blur-[30px]"
                    />
                    {/* Bottom foliage is split into left and right controls
                        so we can fine-tune each side independently. */}
                    <div className={media.bottomFoliageLayerClasses}>
                      <div
                        aria-hidden="true"
                        className={media.bottomFoliageLeftClasses}
                      >
                        <Image
                          src={assets.foliage}
                          alt=""
                          fill
                          unoptimized
                          className="object-contain object-bottom scale-x-[-1]"
                          sizes="(min-width: 1024px) 14vw, 0vw"
                        />
                      </div>

                      <div
                        aria-hidden="true"
                        className={media.bottomFoliageRightClasses}
                      >
                        <Image
                          src={assets.foliage}
                          alt=""
                          fill
                          unoptimized
                          className="object-contain object-bottom"
                          sizes="(min-width: 1024px) 14vw, 0vw"
                        />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-10">
                      <Image
                        src={assets.frame}
                        alt=""
                        fill
                        unoptimized
                        className="object-fill"
                        sizes="(min-width: 1024px) 36vw, 100vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
