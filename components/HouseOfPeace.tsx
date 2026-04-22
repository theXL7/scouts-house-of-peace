import Image from "next/image";

import type { Locale } from "@/messages";
import type { Messages } from "@/messages/en";
import { withBasePath } from "@/lib/site";

const houseOfPeaceMontageImages = Array.from({ length: 8 }, (_, index) =>
  withBasePath(
    `/media/house-of-peace/house-of-peace-${String(index + 1).padStart(2, "0")}.webp`,
  ),
);

const houseOfPeaceMontageDisplaySeconds = 5;
const houseOfPeaceMontageCrossfadeSeconds = 1.2;
const houseOfPeaceMontageCycleSeconds =
  houseOfPeaceMontageImages.length * houseOfPeaceMontageDisplaySeconds;

// Keep the section art-direction close to the component so the outer
// environment and the inner mirrored composition stay easy to reason about.
const houseOfPeaceConfig = {
  assets: {
    panel: withBasePath("/house-of-peace/color-container-palette.svg"),
    wash: withBasePath("/house-of-peace/soft-background-wash.svg"),
    foliage: withBasePath("/house-of-peace/dense-foliage.svg"),
    pigeonThree: withBasePath("/hero/pigeon 3.png"),
    scenery: withBasePath("/house-of-peace/green-scenery-castle.svg"),
    mountain: withBasePath("/house-of-peace/taourirt-mountain.svg"),
    branchOne: withBasePath("/house-of-peace/olive-branch-1.svg"),
    branchTwo: withBasePath("/house-of-peace/olive-branch-2.svg"),
  },
  media: {
    textColumnBaseClasses:
      "relative mx-auto max-w-[33rem] pt-1 text-center md:mx-0 md:pt-4",
    mediaColumnClasses: "relative min-w-0 mt-2 md:mt-0",
    mediaShellClasses: "relative mx-auto w-full max-w-[56rem] lg:max-w-none",
    mediaCanvasClasses: "relative",
    panelClusterClasses:
      "relative mx-auto mt-8 aspect-[4/5] w-[74vw] max-w-[284px] md:mt-0 md:ml-auto md:mr-0 md:w-full md:max-w-[396px] md:translate-x-[10%] lg:translate-x-[14%]",
    panelClusterRtlClasses:
      "relative mx-auto mt-8 aspect-[4/5] w-[74vw] max-w-[284px] md:mt-0 md:ml-0 md:mr-auto md:w-full md:max-w-[396px] md:-translate-x-[10%] lg:-translate-x-[14%]",
    frameShellClasses: "absolute inset-0 z-20",
    viewportClasses:
      "absolute inset-[12px] overflow-hidden rounded-[21px] bg-[#FBF7EF] md:inset-[13px] md:rounded-[22px] lg:inset-[14px] lg:rounded-[23px]",
    montageSlideClasses: "house-of-peace-montage-slide absolute inset-0",
    montageImageClasses: "h-full w-full object-cover",
    frameLayerClasses:
      "absolute inset-0 rounded-[30px] border border-[#DCCFB6] bg-[#F7F2E8] shadow-[0_20px_45px_rgba(80,60,30,0.12)]",
    bottomFoliageLayerClasses:
      "pointer-events-none absolute inset-0 z-[6] hidden md:block",
    bottomFoliageLeftClasses:
      "absolute bottom-[-80%] left-[-42%] h-[204%] w-[144%] opacity-90 lg:bottom-[-88%] lg:left-[-46%] lg:h-[236%] lg:w-[154%]",
    bottomFoliageRightClasses:
      "absolute bottom-[-80%] right-[-28%] h-[204%] w-[144%] opacity-90 lg:bottom-[-88%] lg:right-[-32%] lg:h-[236%] lg:w-[154%]",
    branchesLayerClasses:
      "pointer-events-none absolute inset-x-[-24%] bottom-[-24%] z-30 h-[76%] md:inset-x-[-20%] md:bottom-[-28%] md:h-[86%] lg:inset-x-[-22%] lg:bottom-[-31%] lg:h-[96%]",
    branchOneClasses:
      "absolute bottom-0 right-[-8%] h-full w-[96%] md:right-[-4%]",
    branchTwoClasses:
      "absolute bottom-0 left-[-20%] h-full w-[96%] md:left-[-14%]",
    outerSceneryClasses:
      "pointer-events-none absolute bottom-[-22%] left-[-66%] z-10 hidden h-[74%] w-[108%] opacity-85 md:block lg:bottom-[-24%] lg:left-[-72%] lg:h-[80%] lg:w-[114%] lg:opacity-90",
    pigeonThreeClasses:
      "absolute bottom-[-11%] right-[16%] z-[100] hidden h-[14.5%] w-[14.5%] opacity-95 md:block lg:bottom-[-12%] lg:right-[18%] lg:h-[14%] lg:w-[14%]",
  },
} as const;

const featuredIntroClasses =
  "mx-auto max-w-[30.25rem] text-[1.08rem] font-medium leading-[1.75] tracking-[0.006em] text-[#364136] sm:text-[1.17rem] md:mx-0 md:max-w-[31rem]";

const supportingParagraphClasses =
  "mx-auto max-w-[31rem] text-[1rem] leading-[1.78] text-[#453D36] sm:text-[1.04rem] md:mx-0";

const arabicHouseOfPeaceEyebrow = "دار الســــــــــــــــلام";

function HouseOfPeaceEyebrow({
  label,
  isRtl,
}: {
  label: string;
  isRtl: boolean;
}) {
  return (
    <div className="inline-flex flex-col items-center md:items-start">
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
      className={`mx-auto hidden w-[80%] max-w-[22.5rem] sm:w-[82%] sm:max-w-[24rem] md:block md:[margin-inline-end:auto] md:[margin-inline-start:0] md:w-[84%] md:max-w-none ${className}`}
    >
      <div className="h-[0.5px] rounded-full bg-gradient-to-r from-transparent via-[#D6C1A0]/55 to-transparent" />
    </div>
  );
}

function HeadlineDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto mb-5 mt-6 hidden w-[82%] max-w-[23rem] sm:mb-6 sm:mt-7 sm:w-[84%] sm:max-w-[24.5rem] md:block md:[margin-inline-end:auto] md:[margin-inline-start:0] md:w-[85%] md:max-w-none"
    >
      <div className="h-px rounded-full bg-gradient-to-r from-transparent via-[#D3B88A]/68 to-transparent" />
    </div>
  );
}

function HouseOfPeaceMediaCluster({
  assets,
  media,
  panelClusterClassName,
}: {
  assets: typeof houseOfPeaceConfig.assets;
  media: typeof houseOfPeaceConfig.media;
  panelClusterClassName: string;
}) {
  return (
    <div className={media.mediaShellClasses}>
      <div className={media.mediaCanvasClasses}>
        <div className={panelClusterClassName}>
          <div className={media.bottomFoliageLayerClasses}>
            <div aria-hidden="true" className={media.bottomFoliageLeftClasses}>
              <Image
                src={assets.foliage}
                alt=""
                fill
                unoptimized
                className="object-contain object-center scale-x-[-1]"
                sizes="(min-width: 1024px) 14vw, 0vw"
              />
            </div>

            <div aria-hidden="true" className={media.bottomFoliageRightClasses}>
              <Image
                src={assets.foliage}
                alt=""
                fill
                unoptimized
                className="object-contain object-center"
                sizes="(min-width: 1024px) 14vw, 0vw"
              />
            </div>
          </div>

          <div className={media.frameShellClasses}>
            <div aria-hidden="true" className={media.frameLayerClasses} />

            <div className={media.viewportClasses}>
              {houseOfPeaceMontageImages.map((src, index) => (
                <div
                  key={src}
                  aria-hidden="true"
                  className={media.montageSlideClasses}
                  style={{
                    animationDelay: `${index * houseOfPeaceMontageDisplaySeconds - houseOfPeaceMontageCrossfadeSeconds}s`,
                    animationDuration: `${houseOfPeaceMontageCycleSeconds}s`,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    unoptimized
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={media.montageImageClasses}
                    sizes="(min-width: 768px) 396px, 74vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={media.branchesLayerClasses}>
            <div aria-hidden="true" className={media.branchTwoClasses}>
              <Image
                src={assets.branchTwo}
                alt=""
                fill
                unoptimized
                className="object-contain object-bottom scale-x-[-1] opacity-95 drop-shadow-[0_18px_28px_rgba(38,77,59,0.18)]"
                sizes="(min-width: 1024px) 18vw, 38vw"
              />
            </div>

            <div aria-hidden="true" className={media.branchOneClasses}>
              <Image
                src={assets.branchOne}
                alt=""
                fill
                unoptimized
                className="object-contain object-bottom opacity-95 drop-shadow-[0_18px_28px_rgba(38,77,59,0.18)]"
                sizes="(min-width: 1024px) 18vw, 38vw"
              />
            </div>
          </div>

          <style>{`
            @keyframes houseOfPeaceMontageFade {
              0% {
                opacity: 0;
                transform: scale(1);
              }

              3% {
                opacity: 1;
                transform: scale(1.008);
              }

              12.5% {
                opacity: 1;
                transform: scale(1.03);
              }

              15.5% {
                opacity: 0;
                transform: scale(1.04);
              }

              100% {
                opacity: 0;
                transform: scale(1.04);
              }
            }

            .house-of-peace-montage-slide {
              animation-iteration-count: infinite;
              animation-name: houseOfPeaceMontageFade;
              animation-timing-function: ease-in-out;
              opacity: 0;
              will-change: opacity, transform;
            }

            @media (prefers-reduced-motion: reduce) {
              .house-of-peace-montage-slide {
                animation: none;
                opacity: 0;
                transform: none;
              }

              .house-of-peace-montage-slide:first-child {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default function HouseOfPeace({
  copy,
  locale,
  isRtl = false,
}: {
  copy: Messages["houseOfPeace"];
  locale: Locale;
  isRtl?: boolean;
}) {
  const { assets, media } = houseOfPeaceConfig;
  const displayEyebrow = isRtl ? arabicHouseOfPeaceEyebrow : copy.eyebrow;
  const displayTitleLines = copy.titleLines;
  const useSmallerBackPanel = locale === "ar" || locale === "fr";
  const backPanelClassName = useSmallerBackPanel
    ? "object-contain object-center scale-[1.18] sm:scale-[1.2] lg:scale-[1.22] drop-shadow-[0_24px_52px_rgba(38,77,59,0.09)]"
    : "object-contain object-center scale-[1.24] sm:scale-[1.26] lg:scale-[1.28] drop-shadow-[0_24px_52px_rgba(38,77,59,0.09)]";
  const innerCompositionClassName = `relative z-20 grid grid-cols-1 gap-8 px-6 py-10 sm:px-10 sm:py-14 md:min-h-[44rem] md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:items-center md:gap-12 lg:min-h-[46rem] lg:gap-16 lg:px-16 lg:py-[5.4rem] xl:px-[4.75rem] ${
    isRtl
      ? "md:[direction:ltr] md:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]"
      : ""
  }`;
  const textColumnClassName = `${media.textColumnBaseClasses} ${
    locale === "ar"
      ? "-translate-y-3 sm:-translate-y-4 md:order-2 md:-translate-y-8 md:pl-6 md:text-right md:[direction:rtl] lg:-translate-y-10"
      : isRtl
        ? "md:order-2 md:pl-6 md:text-right md:[direction:rtl]"
      : "md:order-1 md:pr-6 md:text-left"
  }`;
  const mediaColumnClassName = `${media.mediaColumnClasses} ${
    isRtl ? "md:order-1" : "md:order-2"
  }`;
  const panelClusterClassName = isRtl
    ? media.panelClusterRtlClasses
    : media.panelClusterClasses;
  const tagsClassName = locale === "ar"
    ? "-mt-3 flex w-full flex-nowrap items-center justify-center gap-2 sm:-mt-2 sm:gap-2.5 md:-mt-4 md:justify-start md:gap-4 lg:-mt-3 lg:gap-5"
    : locale === "fr"
      ? "-mt-7 flex w-full flex-nowrap items-center justify-center gap-2 sm:-mt-6 sm:gap-2.5 md:-mt-9 md:justify-start md:gap-4 lg:-mt-8 lg:gap-5"
      : "mt-1 flex w-full flex-nowrap items-center justify-center gap-2 sm:mt-2 sm:gap-2.5 md:mt-0 md:justify-start md:gap-4 lg:mt-1 lg:gap-5";
  const headingBlockClassName =
    locale === "ar"
      ? "translate-y-2 sm:translate-y-3 md:translate-y-4 lg:translate-y-5"
      : "";
  const contentBlockClassName =
    locale === "fr"
      ? "-translate-y-3 sm:-translate-y-4 md:-translate-y-6 lg:-translate-y-7"
      : "";
  const introClassName = isRtl
    ? `${featuredIntroClasses} leading-[2.02] md:max-w-[34rem]`
    : featuredIntroClasses;
  const bodyClassName = isRtl
    ? `${supportingParagraphClasses} leading-[2] md:max-w-[34rem]`
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

        <div className="relative isolate z-10 md:min-h-[44rem] lg:min-h-[46rem]">
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
              className={backPanelClassName}
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
              <div className={headingBlockClassName}>
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
              </div>

              <HeadlineDivider />

              <div className={contentBlockClassName}>
                <p className={introClassName}>{copy.intro}</p>

                <EditorialDivider className="my-3 sm:my-4 md:my-5" />

                <p className={bodyClassName}>{copy.body}</p>

                <EditorialDivider className="mb-3 mt-4 sm:mb-4 sm:mt-5 md:mb-5 md:mt-6" />

                <ul className={tagsClassName}>
                  {copy.tags.map((tag) => (
                    <li key={tag} className="flex-none">
                      <span className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full border border-[#D6C1A0]/75 bg-[#FBF6EB]/92 px-3 py-2 text-[0.76rem] font-medium tracking-[0.01em] text-[#4A5E4A] shadow-[0_8px_20px_rgba(92,78,57,0.06)] sm:px-3.5 sm:text-[0.8rem] md:min-h-12 md:px-5 md:py-3 md:text-[0.94rem] lg:px-6">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={mediaColumnClassName}>
              <HouseOfPeaceMediaCluster
                assets={assets}
                media={media}
                panelClusterClassName={panelClusterClassName}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
