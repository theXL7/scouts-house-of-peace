import Image from "next/image";

import type { Messages } from "@/messages/en";
import { withBasePath } from "@/lib/site";

// Keep the section art-direction close to the component so the outer
// environment and the inner mirrored composition stay easy to reason about.
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
    innerCompositionClasses:
      "relative z-20 grid gap-14 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16 lg:px-16 lg:py-[5.4rem] xl:px-[4.75rem]",
    textColumnBaseClasses:
      "relative mx-auto max-w-[33rem] -translate-y-3 pt-1 text-center sm:-translate-y-4 sm:pt-2 lg:mx-0 lg:-translate-y-5 lg:pt-4",
    mediaColumnClasses: "relative min-w-0",
    mediaShellClasses: "relative mx-auto w-full max-w-[56rem] lg:max-w-none",
    mediaCanvasClasses: "relative aspect-[11/9]",
    panelClusterClasses:
      "absolute left-[28%] right-[-15%] top-[-2%] bottom-[4%]",
    shadowClasses:
      "absolute inset-[4%] z-0 translate-y-[4%] rounded-[28px] bg-[#2A2A2A]/26 blur-[30px]",
    bottomFoliageLayerClasses: "pointer-events-none absolute inset-0 z-[6]",
    bottomFoliageLeftClasses:
      "absolute bottom-[-6%] left-[-16%] hidden h-[88%] w-[88%] opacity-85 sm:block lg:bottom-[-7%] lg:left-[-20%] lg:h-[108%] lg:w-[108%]",
    bottomFoliageRightClasses:
      "absolute bottom-[-6%] right-[-6%] hidden h-[88%] w-[88%] opacity-85 sm:block lg:bottom-[-7%] lg:right-[-8%] lg:h-[108%] lg:w-[108%]",
    frameLayerClasses: "pointer-events-none absolute inset-0 z-10",
    branchesLayerClasses: "pointer-events-none absolute inset-0 z-30",
    branchOneClasses:
      "absolute bottom-[-4%] right-[1%] hidden h-[46%] w-[46%] opacity-88 sm:block lg:bottom-[-5%] lg:right-[1.5%] lg:h-[50%] lg:w-[50%]",
    branchTwoClasses:
      "absolute bottom-[-2.5%] right-[-7%] hidden h-[46%] w-[46%] opacity-88 sm:block lg:bottom-[-3.5%] lg:right-[-7.5%] lg:h-[50%] lg:w-[50%]",
    outerSceneryClasses:
      "pointer-events-none absolute bottom-[-22%] left-[-66%] z-10 hidden h-[74%] w-[108%] opacity-85 md:block lg:bottom-[-24%] lg:left-[-72%] lg:h-[80%] lg:w-[114%] lg:opacity-90",
    pigeonThreeClasses:
      "absolute bottom-[-11%] right-[16%] z-[100] hidden h-[14.5%] w-[14.5%] opacity-95 md:block lg:bottom-[-12%] lg:right-[18%] lg:h-[14%] lg:w-[14%]",
  },
} as const;

const featuredIntroClasses =
  "mx-auto max-w-[30.25rem] text-[1.08rem] font-medium leading-[1.75] tracking-[0.006em] text-[#364136] sm:text-[1.17rem] lg:mx-0 lg:max-w-[31rem]";

const supportingParagraphClasses =
  "mx-auto max-w-[31rem] text-[1rem] leading-[1.78] text-[#453D36] sm:text-[1.04rem] lg:mx-0";

const arabicHouseOfPeaceEyebrow = "دار الســــــــــــــــلام";

function HouseOfPeaceEyebrow({
  label,
  isRtl,
}: {
  label: string;
  isRtl: boolean;
}) {
  return (
    <div className="inline-flex flex-col items-center lg:items-start">
      <p
        className={`eyebrow-text text-[0.78rem] font-medium uppercase leading-none tracking-[0.34em] text-[#4A5E4A] sm:text-[0.82rem] ${
          isRtl ? "ar-display-label text-[0.94rem] sm:text-[1rem]" : ""
        }`}
      >
        {label}
      </p>
      <div
        aria-hidden="true"
        className="mt-3 h-px w-[14.75rem] rounded-full bg-gradient-to-r from-[#E4D6BC]/40 via-[#CFAE79]/86 to-[#E4D6BC]/40 sm:w-[15.75rem]"
      />
    </div>
  );
}

function EditorialDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto w-[80%] max-w-[22.5rem] sm:w-[82%] sm:max-w-[24rem] lg:[margin-inline-end:auto] lg:[margin-inline-start:0] lg:w-[84%] lg:max-w-none ${className}`}
    >
      <div className="h-[0.5px] rounded-full bg-gradient-to-r from-transparent via-[#D6C1A0]/55 to-transparent" />
    </div>
  );
}

function HeadlineDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto mb-5 mt-6 w-[82%] max-w-[23rem] sm:mb-6 sm:mt-7 sm:w-[84%] sm:max-w-[24.5rem] lg:[margin-inline-end:auto] lg:[margin-inline-start:0] lg:w-[85%] lg:max-w-none"
    >
      <div className="h-px rounded-full bg-gradient-to-r from-transparent via-[#D3B88A]/68 to-transparent" />
    </div>
  );
}

export default function HouseOfPeace({
  copy,
  isRtl = false,
}: {
  copy: Messages["houseOfPeace"];
  isRtl?: boolean;
}) {
  const { assets, media } = houseOfPeaceConfig;
  const displayEyebrow = isRtl ? arabicHouseOfPeaceEyebrow : copy.eyebrow;
  const displayTitleLines = copy.titleLines;
  const innerCompositionClassName = `relative z-20 grid gap-14 px-6 py-10 sm:px-10 sm:py-14 lg:items-center lg:gap-16 lg:px-16 lg:py-[5.4rem] xl:px-[4.75rem] ${
    isRtl
      ? "lg:[direction:ltr] lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]"
      : "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
  }`;
  const textColumnClassName = `${media.textColumnBaseClasses} ${
    isRtl
      ? "lg:order-2 lg:pl-6 lg:text-right lg:[direction:rtl]"
      : "lg:order-1 lg:pr-6 lg:text-left"
  }`;
  const mediaColumnClassName = `${media.mediaColumnClasses} ${
    isRtl ? "lg:order-1" : "lg:order-2"
  }`;
  const panelClusterClassName = isRtl
    ? "absolute left-[-15%] right-[28%] top-[-2%] bottom-[4%]"
    : media.panelClusterClasses;
  const tagsClassName =
    "-mt-2 flex flex-wrap items-center justify-center gap-4 sm:-mt-3 sm:gap-5 lg:flex-nowrap lg:justify-start";
  const introClassName = isRtl
    ? `${featuredIntroClasses} leading-[2.02] lg:max-w-[34rem]`
    : featuredIntroClasses;
  const bodyClassName = isRtl
    ? `${supportingParagraphClasses} leading-[2] lg:max-w-[34rem]`
    : supportingParagraphClasses;

  return (
    <section
      id="house-of-peace"
      className="overflow-hidden bg-[linear-gradient(180deg,#FAF6EE_0%,#F0E5D7_100%)] px-6 py-[6rem] sm:px-8 sm:py-[7rem]"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* The wash stays outside the inner composition so every locale shares
            the same outer atmosphere. */}
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
          {/* Main cream panel remains identical across locales. */}
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

          {/* Outer scenery stays fixed; only the inner composition mirrors. */}
          <div aria-hidden="true" className={media.outerSceneryClasses}>
            <Image
              src={assets.scenery}
              alt=""
              fill
              unoptimized
              className="object-contain object-left-bottom scale-x-[-1]"
              sizes="100vw"
            />
          </div>

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

          <div aria-hidden="true" className={media.pigeonThreeClasses}>
            <Image
              src={assets.pigeonThree}
              alt=""
              fill
              unoptimized
              className="object-contain drop-shadow-[0_10px_18px_rgba(18,59,109,0.14)]"
              sizes="44px"
            />
          </div>

          {/* The inner grid is the only part that mirrors for Arabic. */}
          <div className={innerCompositionClassName}>
            <div className={textColumnClassName}>
              <HouseOfPeaceEyebrow label={displayEyebrow} isRtl={isRtl} />

              <h2
                className={`mt-4 text-[#090088] sm:mt-5 ${
                  isRtl
                    ? "ar-display-heading text-[2.08rem] leading-[1.26] tracking-normal sm:text-[2.22rem] lg:text-[2.46rem]"
                    : "text-[1.95rem] leading-[1.08] tracking-[-0.02em] sm:text-[2.05rem] lg:text-[2.22rem]"
                }`}
              >
                {displayTitleLines.map((line, index) => (
                  <span
                    key={line}
                    className={`block color-[#090088] ${
                      isRtl ? "" : "sm:whitespace-nowrap"
                    } ${index === 1 ? "mt-1.5" : ""}`}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              <HeadlineDivider />

              <p className={introClassName}>{copy.intro}</p>

              <EditorialDivider className="my-3 sm:my-4 md:my-5" />

              <p className={bodyClassName}>{copy.body}</p>

              <EditorialDivider className="mb-3 mt-4 sm:mb-4 sm:mt-5 md:mb-5 md:mt-6" />

              <ul className={tagsClassName}>
                {copy.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#D6C1A0]/75 bg-[#FBF6EB]/92 px-5 py-3 text-[0.94rem] font-medium tracking-[0.01em] text-[#4A5E4A] shadow-[0_8px_20px_rgba(92,78,57,0.06)] sm:px-6">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={mediaColumnClassName}>
              <div className={media.mediaShellClasses}>
                <div className={media.mediaCanvasClasses}>
                  <div className={panelClusterClassName}>
                    <div aria-hidden="true" className={media.shadowClasses} />

                    {/* Keep the placeholder, foliage, and branch art in one
                        shared cluster so Arabic mirrors the English media
                        composition instead of overriding each ornament. */}
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

                    <div className={media.frameLayerClasses}>
                      <Image
                        src={assets.frame}
                        alt=""
                        fill
                        unoptimized
                        className="object-fill"
                        sizes="(min-width: 1024px) 36vw, 100vw"
                      />
                    </div>

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
