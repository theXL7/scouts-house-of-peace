import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import type { Messages } from "@/messages/en";
import { arabicDisplayOverrides } from "@/lib/arabicDisplay";
import { withBasePath } from "@/lib/site";

type ScenePosition = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  width?: string;
  height?: string;
};

type CultureCardData = {
  id: "traditions" | "levels" | "symbols" | "patrol";
  title: string;
  anchor: ScenePosition;
  zIndex?: number;
  className?: string;
  titleClassName?: string;
  artwork?: {
    src: string;
    alt: string;
    wrapperClassName: string;
    imageClassName?: string;
    glowClassName?: string;
    fadeClassName?: string;
    coverClassName?: string;
  };
};

type NarrativeInsertData = {
  label: string;
  description?: string;
  src?: string;
  alt?: string;
  anchor: ScenePosition;
  layer?: "behind_cards" | "above_mist";
  zIndex?: number;
  rotationClassName?: string;
  imageClassName?: string;
};

const cultureSceneAssets = {
  cloudsBase: withBasePath("/scouting-culture-v2/clouds-base.png"),
  grainAndMist: withBasePath("/scouting-culture-v2/grain-and-mist.png"),
  moroccoTopography: withBasePath("/scouting-culture-v2/morocco-topography.png"),
  airyMist: withBasePath("/scouting-culture-v2/airy-mist.png"),
  levelsGear: withBasePath("/scouting-culture-v2/levels-gear.png"),
  scoutSaluteEmblem: withBasePath(
    "/scouting-culture-v2/Scout%20in%20salute%20with%20emblem.png",
  ),
  symbolsAndSongs: withBasePath("/scouting-culture-v2/symbols-and-songs.png"),
  patrolCampfire: withBasePath("/scouting-culture-v2/patrol-campfire.png"),
  scoutsOnPath: withBasePath("/scouting-culture-v2/scouts-on-path.png"),
} as const;

function isDetachedArtworkCardId(
  id: CultureCardData["id"],
): id is "levels" {
  return id === "levels";
}

// Desktop anchors are relative to the card cluster wrapper, not the full scene.
const cultureClusterCards: CultureCardData[] = [
  {
    id: "traditions",
    title: "Traditions & Collective Memory",
    anchor: { left: "13%", top: "6%", width: "28%" },
    zIndex: 3,
    className: "min-h-[11.75rem]",
    titleClassName: "max-w-[10.25rem]",
  },
  {
    id: "levels",
    title: "Levels & Growth",
    anchor: { left: "3%", top: "63%", width: "31.5%" },
    zIndex: 2,
    className: "min-h-[12.25rem] overflow-visible pb-4",
    titleClassName: "max-w-[11rem]",
    artwork: {
      src: cultureSceneAssets.levelsGear,
      alt: "",
      wrapperClassName:
        "pointer-events-none absolute bottom-[-36%] right-[-18%] hidden h-[214%] w-[104%] md:block",
      imageClassName:
        "object-contain object-right-bottom drop-shadow-[0_24px_34px_rgba(87,67,47,0.18)]",
      glowClassName:
        "absolute bottom-[-8%] right-[0%] hidden h-[58%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(245,237,226,0.66)_0%,rgba(245,237,226,0.18)_54%,transparent_84%)] blur-[22px] md:block",
    },
  },
  {
    id: "patrol",
    title: "Patrol Life & Shared Responsibility",
    anchor: { left: "31%", top: "36%", width: "43.5%" },
    zIndex: 5,
    className: "min-h-[14.5rem] overflow-visible pb-5",
    titleClassName: "ml-auto max-w-[12.5rem] text-right",
    artwork: {
      src: cultureSceneAssets.patrolCampfire,
      alt: "",
      wrapperClassName:
        "pointer-events-none absolute bottom-[-1%] left-[5%] hidden h-[100%] w-[52%] md:block",
      imageClassName:
        "object-contain object-[34%_100%] drop-shadow-[0_18px_28px_rgba(87,67,47,0.16)]",
      glowClassName:
        "absolute bottom-[4%] left-[10%] hidden h-[28%] w-[35%] rounded-full bg-[radial-gradient(circle,rgba(245,237,226,0.68)_0%,rgba(245,237,226,0.22)_52%,transparent_84%)] blur-[20px] md:block",
    },
  },
  {
    id: "symbols",
    title: "Symbols, Songs & Shared Identity",
    anchor: { right: "2%", top: "8%", width: "27%" },
    zIndex: 4,
    className: "min-h-[14.5rem] overflow-visible pb-4",
    titleClassName: "max-w-[10.5rem]",
    artwork: {
      src: cultureSceneAssets.scoutSaluteEmblem,
      alt: "",
      wrapperClassName:
        "pointer-events-none absolute bottom-[-16%] right-[-40%] hidden h-[212%] w-[170%] [mask-image:linear-gradient(180deg,black_0%,black_58%,rgba(0,0,0,0.92)_68%,rgba(0,0,0,0.45)_82%,transparent_100%),radial-gradient(circle_at_50%_78%,black_0%,black_42%,rgba(0,0,0,0.5)_68%,transparent_100%)] [-webkit-mask-image:linear-gradient(180deg,black_0%,black_58%,rgba(0,0,0,0.92)_68%,rgba(0,0,0,0.45)_82%,transparent_100%),radial-gradient(circle_at_50%_78%,black_0%,black_42%,rgba(0,0,0,0.5)_68%,transparent_100%)] md:block",
      imageClassName:
        "object-contain object-right-bottom opacity-[0.95] drop-shadow-[0_22px_34px_rgba(87,67,47,0.16)]",
      fadeClassName:
        "pointer-events-none absolute bottom-[-8%] right-[-6%] hidden h-[42%] w-[74%] rounded-[48%] bg-[radial-gradient(circle_at_50%_26%,rgba(247,243,236,0.86)_0%,rgba(247,243,236,0.62)_28%,rgba(247,243,236,0.28)_58%,transparent_88%)] blur-[18px] md:block",
      coverClassName:
        "pointer-events-none absolute bottom-[-6%] right-[-2%] hidden h-[28%] w-[88%] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(248,244,237,0.98)_0%,rgba(248,244,237,0.92)_28%,rgba(248,244,237,0.68)_54%,rgba(248,244,237,0.24)_76%,transparent_100%)] blur-[18px] md:block",
    },
  },
] as const;

const narrativeInsertSlots: NarrativeInsertData[] = [
  {
    label: "Symbols and songs insert",
    src: cultureSceneAssets.symbolsAndSongs,
    alt: "",
    anchor: { left: "8%", bottom: "10%", width: "19%", height: "19%" },
    layer: "behind_cards",
    zIndex: 1,
    imageClassName:
      "object-contain opacity-[0.94] drop-shadow-[0_20px_30px_rgba(87,67,47,0.12)] [mask-image:radial-gradient(ellipse_at_center,black_0%,black_56%,transparent_82%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_0%,black_56%,transparent_82%)]",
  },
  {
    label: "Path group insert",
    src: cultureSceneAssets.scoutsOnPath,
    alt: "",
    anchor: { left: "29%", bottom: "11%", width: "12%", height: "15%" },
    layer: "above_mist",
    zIndex: 3,
    rotationClassName: "-rotate-[1.5deg]",
    imageClassName: "object-contain opacity-[0.9]",
  },
] as const;

const sceneSlots = {
  cloudsBase: {
    left: "-16%",
    top: "-12%",
    width: "128%",
    height: "118%",
  },
  bridgeTerrain: {
    left: "-24%",
    top: "12%",
    width: "54%",
    height: "74%",
  },
  moroccoTerrain: {
    left: "-9%",
    top: "-8%",
    width: "114%",
    height: "104%",
  },
  groundingFog: {
    left: "-10%",
    top: "60%",
    width: "108%",
    height: "20%",
  },
  distantEmbellishments: {
    left: "74%",
    top: "12%",
    width: "14%",
    height: "12%",
  },
  frontMist: {
    left: "-4%",
    bottom: "5%",
    width: "98%",
    height: "15%",
  },
  cardCluster: {
    left: "16%",
    top: "18%",
    width: "71%",
    height: "61%",
  },
  grainAndMist: {
    left: "-12%",
    bottom: "-8%",
    width: "118%",
    height: "46%",
  },
} as const;

function positionStyle(position: ScenePosition): CSSProperties {
  return {
    left: position.left,
    right: position.right,
    top: position.top,
    bottom: position.bottom,
    width: position.width,
    height: position.height,
  };
}

function CultureSceneLayer({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {children}
    </div>
  );
}

function CultureSceneAsset({
  src,
  alt,
  style,
  className = "",
  imageClassName = "",
  sizes,
}: {
  src: string;
  alt: string;
  style: CSSProperties;
  className?: string;
  imageClassName?: string;
  sizes: string;
}) {
  return (
    <div aria-hidden style={style} className={`absolute ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes={sizes}
        className={`object-contain ${imageClassName}`}
      />
    </div>
  );
}

function CultureCardArtwork({
  card,
  showGlow = true,
  showFade = true,
}: {
  card: CultureCardData;
  showGlow?: boolean;
  showFade?: boolean;
}) {
  if (!card.artwork) {
    return null;
  }

  return (
    <>
      {showGlow ? (
        <div
          aria-hidden
          className={
            card.artwork.glowClassName ??
            "absolute bottom-[-4%] right-[-18%] hidden h-[76%] w-[108%] rounded-full bg-[radial-gradient(circle,rgba(245,237,226,0.84)_0%,rgba(245,237,226,0.4)_48%,transparent_84%)] blur-[36px] md:block"
          }
        />
      ) : null}
      <div aria-hidden className={card.artwork.wrapperClassName}>
        <Image
          src={card.artwork.src}
          alt={card.artwork.alt}
          fill
          unoptimized
          sizes="(min-width: 768px) 18vw, 0vw"
          className={card.artwork.imageClassName ?? "object-contain"}
        />
      </div>
      {showFade && card.artwork.fadeClassName ? (
        <div aria-hidden className={card.artwork.fadeClassName} />
      ) : null}
      {card.artwork.coverClassName ? (
        <div aria-hidden className={card.artwork.coverClassName} />
      ) : null}
    </>
  );
}

function CultureCard({
  card,
  actionLabel,
  className = "",
  style,
  hideArtwork = false,
  artworkOnly = false,
  isRtl = false,
}: {
  card: CultureCardData;
  actionLabel: string;
  className?: string;
  style?: CSSProperties;
  hideArtwork?: boolean;
  artworkOnly?: boolean;
  isRtl?: boolean;
}) {
  if (artworkOnly) {
    return (
      <div aria-hidden style={style} className={`pointer-events-none absolute ${className}`}>
        <div className={`relative min-h-[11.25rem] w-full overflow-visible ${card.className ?? ""}`}>
          <CultureCardArtwork card={card} showGlow={false} showFade={false} />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`${actionLabel} ${card.title}`}
      style={style}
      className={`group relative flex min-h-[11.25rem] w-full transform-gpu flex-col justify-between overflow-hidden rounded-[24px] border border-white/44 bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(247,243,236,0.16)_38%,rgba(233,223,207,0.14)_100%)] p-5 shadow-[0_22px_44px_rgba(105,84,58,0.12)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03] hover:border-white/72 hover:shadow-[0_40px_82px_rgba(105,84,58,0.24)] ${
        isRtl ? "text-right" : "text-left"
      } ${card.className ?? ""} ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.14)_22%,rgba(247,243,236,0.1)_52%,rgba(184,106,74,0.1)_100%)] transition-opacity duration-300 group-hover:opacity-[0.94]"
      />
      <div
        aria-hidden
        className="absolute inset-[-8%] rounded-[30px] bg-[radial-gradient(circle_at_center,rgba(255,244,229,0.3)_0%,rgba(255,244,229,0.12)_46%,transparent_78%)] opacity-0 blur-[22px] transition-all duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="absolute inset-[1px] rounded-[23px] border border-white/18 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.62),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(233,223,207,0.06)_100%)] transition-all duration-300 group-hover:border-white/28 group-hover:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.76),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(233,223,207,0.08)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-[10%] top-0 h-[34%] rounded-b-[40%] bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.08)_62%,transparent_100%)] blur-[12px] transition-all duration-300 group-hover:inset-x-[6%] group-hover:h-[40%] group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="absolute inset-x-[18%] bottom-[-18%] h-[26%] rounded-full bg-[radial-gradient(circle,rgba(255,244,229,0.34)_0%,rgba(255,244,229,0.12)_46%,transparent_82%)] opacity-0 blur-[20px] transition-all duration-300 group-hover:bottom-[-10%] group-hover:opacity-100"
      />

      {card.artwork && !hideArtwork ? <CultureCardArtwork card={card} /> : null}

      <div
        className={`relative z-[2] ${
          card.titleClassName ??
          (card.artwork ? "max-w-[11.5rem]" : isRtl ? "pl-4" : "pr-4")
        } transition-transform duration-300 group-hover:-translate-y-1`}
      >
        <h3
          className={`max-w-[15rem] text-[#3B312A] ${
            isRtl ? "text-[1.38rem] leading-[1.3]" : "text-[1.45rem] leading-[1.08]"
          }`}
        >
          {card.title}
        </h3>
      </div>

      <div className="relative z-[2] mt-8 flex items-center justify-between border-t border-white/24 pt-3 transition-colors duration-300 group-hover:border-white/36">
        <span
          className={`text-[0.76rem] font-medium text-[#8B705E] ${
            isRtl ? "tracking-[0.04em]" : "uppercase tracking-[0.16em]"
          }`}
        >
          {actionLabel}
        </span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/34 bg-white/22 text-[#977460] backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:border-white/54 group-hover:bg-white/34">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M8 16 16 8" />
            <path d="M9.5 8H16v6.5" />
          </svg>
        </span>
      </div>
    </button>
  );
}

function CultureCardCluster({
  cards,
  actionLabel,
  isRtl,
}: {
  cards: CultureCardData[];
  actionLabel: string;
  isRtl: boolean;
}) {
  return (
    <div className="absolute inset-0 z-[105] hidden md:block">
      <div
        style={positionStyle(sceneSlots.cardCluster)}
        className="absolute overflow-visible"
      >
        <div
          aria-hidden
          className="absolute inset-x-[-4%] inset-y-[3%] rounded-[42%] bg-[radial-gradient(circle_at_50%_42%,rgba(248,243,235,0.66)_0%,rgba(248,243,235,0.26)_48%,transparent_78%)] blur-[26px]"
        />
        <div
          aria-hidden
          className="absolute left-[8%] top-[8%] h-[24%] w-[26%] rounded-[38%] bg-[radial-gradient(circle_at_72%_50%,rgba(255,251,246,0.42)_0%,transparent_76%)] blur-[18px]"
        />
        <div
          aria-hidden
          className="absolute left-[14%] right-[8%] bottom-[6%] h-[15%] rounded-full bg-[radial-gradient(circle,rgba(232,218,197,0.26)_0%,rgba(232,218,197,0.1)_54%,transparent_82%)] blur-[20px]"
        />

        {cards.map((card) => (
          <CultureCard
            key={card.id}
            card={card}
            actionLabel={actionLabel}
            isRtl={isRtl}
            hideArtwork={isDetachedArtworkCardId(card.id)}
            style={{
              position: "absolute",
              ...positionStyle(card.anchor),
              zIndex: card.zIndex,
            }}
          />
        ))}

        {cards
          .filter((card) => isDetachedArtworkCardId(card.id))
          .map((card) => (
            <CultureCard
              key={`${card.id}-artwork`}
              card={card}
              actionLabel={actionLabel}
              artworkOnly
              style={{
                position: "absolute",
                ...positionStyle(card.anchor),
                zIndex: (card.zIndex ?? 1) + 4,
              }}
            />
          ))}
      </div>
    </div>
  );
}

function CultureIntroBlock({
  copy,
  isRtl,
}: {
  copy: Messages["scoutingCulture"];
  isRtl: boolean;
}) {
  const displayTitle = isRtl
    ? arabicDisplayOverrides.scoutingCulture.title
    : copy.title;

  return (
    <div
      className={`max-w-[30.5rem] md:max-w-[28.75rem] ${
        isRtl ? "text-right" : ""
      }`}
    >
      <p className="eyebrow-text text-[0.76rem] font-semibold text-[#8A6A55] sm:text-[0.8rem]">
        {copy.eyebrow}
      </p>

      <h2
        className={`mt-3.5 max-w-[25.75rem] text-[#342B24] sm:max-w-[26rem] ${
          isRtl
            ? "ar-display-heading text-[2.28rem] leading-[1.22] sm:text-[2.68rem] lg:text-[2.98rem]"
            : "text-[2.2rem] leading-[1.06] sm:text-[2.55rem] lg:text-[2.85rem]"
        }`}
      >
        {displayTitle}
      </h2>

      <p
        className={`mt-5 max-w-[27rem] text-[1rem] text-[#5A5048] sm:text-[1.03rem] ${
          isRtl ? "leading-[2.02] md:max-w-[31rem]" : "leading-[1.88]"
        }`}
      >
        {copy.description}
      </p>

      <div
        className={`mt-6 flex max-w-[25rem] flex-wrap gap-2.5 ${
          isRtl ? "justify-start" : ""
        }`}
      >
        {copy.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex min-h-11 items-center rounded-full border border-[#D9C9B4]/72 bg-white/62 px-4 py-2 text-[0.82rem] font-medium text-[#61574F] shadow-[0_8px_18px_rgba(105,84,58,0.04)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href="#contact"
        className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full border border-[#D5C0A2] bg-[#F8EFE2] px-6 py-3 text-[0.98rem] font-medium text-[#5F4C3E] shadow-[0_12px_28px_rgba(105,84,58,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CFA984] hover:bg-[#FBF4E9]"
      >
        {copy.cta}
        <span aria-hidden="true">{isRtl ? "\u2190" : "\u2192"}</span>
      </a>
    </div>
  );
}

function CultureScenePanel({
  copy,
  cards,
  actionLabel,
  isRtl,
}: {
  copy: Messages["scoutingCulture"];
  cards: CultureCardData[];
  actionLabel: string;
  isRtl: boolean;
}) {
  return (
    <div className="group relative isolate overflow-hidden rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(252,248,241,0.98)_0%,rgba(245,238,228,0.96)_100%)] shadow-[0_26px_54px_rgba(105,84,58,0.08)]">
      <CultureSceneLayer className="z-10">
        <div className="absolute inset-0 rounded-[34px] border border-white/60" />
        <div className="absolute inset-[14px] rounded-[26px] border border-[#D9CBB8]/56" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.8),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(255,248,239,0.74),transparent_28%)]" />
      </CultureSceneLayer>

      <CultureSceneLayer className="z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.84),transparent_24%),radial-gradient(circle_at_68%_18%,rgba(242,229,211,0.58),transparent_28%),radial-gradient(circle_at_58%_72%,rgba(233,223,207,0.3),transparent_32%)]" />
        <div className="absolute left-[-1%] top-[14%] hidden h-[47%] w-[32%] rounded-[40%] bg-[radial-gradient(circle_at_82%_42%,rgba(248,243,235,0.58)_0%,rgba(248,243,235,0.2)_48%,transparent_82%)] blur-[24px] md:block" />
        <div className="absolute inset-x-[-4%] bottom-[-10%] h-[34%] bg-[radial-gradient(circle_at_center,rgba(239,228,212,0.46),transparent_64%)] blur-3xl" />
      </CultureSceneLayer>

      <div className="relative px-6 py-8 sm:px-8 sm:py-10 md:aspect-[43/25] md:min-h-0">
        <div className="relative z-[60] md:absolute md:left-[5.75%] md:top-[11.5%] md:w-[30%]">
          <CultureIntroBlock copy={copy} isRtl={isRtl} />
        </div>

        <div className="relative mt-10 min-h-[24rem] sm:min-h-[28rem] md:absolute md:bottom-[6%] md:left-[26%] md:right-[1%] md:top-[6%] md:mt-0">
          <CultureSceneLayer className="z-30">
            <CultureSceneAsset
              src={cultureSceneAssets.cloudsBase}
              alt=""
              style={sceneSlots.cloudsBase}
              className="[mask-image:linear-gradient(180deg,black_0%,black_54%,rgba(0,0,0,0.74)_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(180deg,black_0%,black_54%,rgba(0,0,0,0.74)_78%,transparent_100%)]"
              sizes="(min-width: 768px) 54vw, 94vw"
              imageClassName="object-cover object-[52%_38%] opacity-[0.74] mix-blend-multiply"
            />
            <div
              aria-hidden
              className="absolute left-[-14%] top-[12%] h-[70%] w-[108%] rounded-full bg-[radial-gradient(circle,rgba(237,220,189,0.28)_0%,rgba(237,220,189,0.08)_50%,transparent_82%)] blur-[40px]"
            />
          </CultureSceneLayer>

          <CultureSceneLayer className="z-[34]">
            <CultureSceneAsset
              src={cultureSceneAssets.moroccoTopography}
              alt=""
              style={sceneSlots.bridgeTerrain}
              className="[mask-image:linear-gradient(90deg,transparent_0%,black_18%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_18%,black_78%,transparent_100%)]"
              sizes="(min-width: 768px) 24vw, 0vw"
              imageClassName="object-left-center opacity-[0.28]"
            />
            <div
              aria-hidden
              className="absolute left-[-11%] top-[22%] h-[44%] w-[35%] rounded-[44%] bg-[radial-gradient(circle_at_82%_50%,rgba(247,243,236,0.82)_0%,rgba(247,243,236,0.4)_30%,rgba(235,223,205,0.12)_58%,transparent_82%)] blur-[24px]"
            />
            <div
              aria-hidden
              className="absolute left-[8%] bottom-[22%] h-[14%] w-[24%] rounded-full bg-[radial-gradient(circle,rgba(231,219,201,0.22)_0%,transparent_74%)] blur-[22px]"
            />
          </CultureSceneLayer>

          <CultureSceneLayer className="z-40">
            <CultureSceneAsset
              src={cultureSceneAssets.moroccoTopography}
              alt=""
              style={sceneSlots.moroccoTerrain}
              sizes="(min-width: 768px) 92vw, 124vw"
              imageClassName="object-right-center opacity-[0.98] drop-shadow-[0_24px_28px_rgba(126,98,61,0.14)]"
            />
            <div
              aria-hidden
              className="absolute bottom-[-3%] left-[-2%] h-[40%] w-[36%] rounded-[40%] bg-[radial-gradient(circle_at_76%_20%,rgba(247,243,236,0.8)_0%,rgba(247,243,236,0.38)_44%,transparent_80%)] blur-[24px]"
            />
            <div
              aria-hidden
              className="absolute bottom-[10%] left-[18%] h-[14%] w-[32%] rounded-full bg-[radial-gradient(circle,rgba(232,220,202,0.28)_0%,transparent_74%)] blur-[26px]"
            />
          </CultureSceneLayer>

          <CultureSceneLayer className="z-[46]">
            <CultureSceneAsset
              src={cultureSceneAssets.airyMist}
              alt=""
              style={sceneSlots.groundingFog}
              sizes="(min-width: 768px) 38vw, 72vw"
              imageClassName="object-cover opacity-[0.08] mix-blend-screen"
            />
            <div
              aria-hidden
              style={sceneSlots.groundingFog}
              className="absolute rounded-full bg-[radial-gradient(circle,rgba(248,243,235,0.48)_0%,rgba(248,243,235,0.18)_48%,transparent_80%)] blur-[24px]"
            />
          </CultureSceneLayer>

          <CultureSceneLayer className="z-50">
            <div
              aria-hidden
              style={sceneSlots.distantEmbellishments}
              className="absolute rounded-full bg-[radial-gradient(circle,rgba(251,248,242,0.52)_0%,rgba(251,248,242,0.16)_48%,transparent_80%)] blur-[20px]"
            />
            <div className="absolute right-[13%] top-[16%] h-2.5 w-2.5 rounded-full bg-[#E5D7C4]/72 shadow-[0_0_0_8px_rgba(245,237,227,0.16)]" />
            <div className="absolute right-[18%] top-[19%] h-1.5 w-1.5 rounded-full bg-[#DFCDB5]/72" />
            <div className="absolute right-[14.5%] top-[21%] h-1.5 w-1.5 rounded-full bg-[#DFCDB5]/62" />
          </CultureSceneLayer>

          <CultureSceneLayer className="z-[79] hidden md:block">
            {narrativeInsertSlots
              .filter((insert) => insert.layer === "behind_cards")
              .map((insert) => (
                <div
                  key={`${insert.label}-support`}
                  aria-hidden
                  style={{ ...positionStyle(insert.anchor), zIndex: insert.zIndex }}
                  className={`absolute rounded-full bg-[radial-gradient(circle,rgba(248,242,233,0.34)_0%,rgba(248,242,233,0.14)_42%,transparent_72%)] blur-[16px] ${
                    insert.rotationClassName ?? ""
                  }`}
                />
              ))}
            {narrativeInsertSlots
              .filter((insert) => insert.layer === "behind_cards")
              .map((insert) =>
                insert.src ? (
                  <CultureSceneAsset
                    key={insert.label}
                    src={insert.src}
                    alt={insert.alt ?? ""}
                    style={{ ...positionStyle(insert.anchor), zIndex: insert.zIndex }}
                    className={insert.rotationClassName ?? ""}
                    sizes="(min-width: 768px) 14vw, 30vw"
                    imageClassName={insert.imageClassName ?? "object-contain"}
                  />
                ) : null,
              )}
          </CultureSceneLayer>

          <CultureSceneLayer className="z-[100]">
            <CultureSceneAsset
              src={cultureSceneAssets.airyMist}
              alt=""
              style={sceneSlots.frontMist}
              sizes="(min-width: 768px) 40vw, 74vw"
              imageClassName="object-cover opacity-[0.05]"
            />
            <div
              aria-hidden
              style={sceneSlots.frontMist}
              className="absolute rounded-full bg-[radial-gradient(circle,rgba(247,243,236,0.34)_0%,rgba(247,243,236,0.12)_44%,transparent_82%)] blur-[24px]"
            />
            <div className="absolute bottom-[-1%] left-[16%] right-[28%] h-[12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(247,243,236,0.46)_0%,rgba(247,243,236,0.16)_40%,transparent_84%)] blur-[18px]" />
          </CultureSceneLayer>

          <CultureSceneLayer className="z-[102] hidden md:block">
            {narrativeInsertSlots
              .filter((insert) => insert.layer !== "behind_cards")
              .map((insert) => (
                <div
                  key={`${insert.label}-support`}
                  aria-hidden
                  style={{ ...positionStyle(insert.anchor), zIndex: insert.zIndex }}
                  className={`absolute rounded-full bg-[radial-gradient(circle,rgba(248,242,233,0.34)_0%,rgba(248,242,233,0.14)_42%,transparent_72%)] blur-[16px] ${
                    insert.rotationClassName ?? ""
                  }`}
                />
              ))}
            {narrativeInsertSlots
              .filter((insert) => insert.layer !== "behind_cards")
              .map((insert) =>
                insert.src ? (
                  <CultureSceneAsset
                    key={insert.label}
                    src={insert.src}
                    alt={insert.alt ?? ""}
                    style={{ ...positionStyle(insert.anchor), zIndex: insert.zIndex }}
                    className={insert.rotationClassName ?? ""}
                    sizes="(min-width: 768px) 14vw, 30vw"
                    imageClassName={insert.imageClassName ?? "object-contain"}
                  />
                ) : null,
              )}
          </CultureSceneLayer>

          <CultureCardCluster
            cards={cards}
            actionLabel={actionLabel}
            isRtl={isRtl}
          />

          <CultureSceneLayer className="z-[112] hidden md:block">
            <CultureSceneAsset
              src={cultureSceneAssets.grainAndMist}
              alt=""
              style={sceneSlots.grainAndMist}
              className="[transform:scaleX(-1)] [mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_100%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_100%)]"
              sizes="(min-width: 768px) 54vw, 94vw"
              imageClassName="object-cover object-top opacity-[0.92]"
            />
          </CultureSceneLayer>
        </div>

        <div className="relative z-[80] mt-6 grid gap-4 sm:grid-cols-2 md:hidden">
          {cards.map((card) => (
            <CultureCard
              key={card.id}
              card={card}
              actionLabel={actionLabel}
              isRtl={isRtl}
            />
          ))}
        </div>
      </div>

      <CultureSceneLayer className="z-[110]">
        <div className="absolute inset-0 rounded-[34px] ring-1 ring-inset ring-white/0 transition-all duration-300 group-hover:ring-white/46" />
        <div className="absolute inset-[14px] rounded-[26px] ring-1 ring-inset ring-[#EDE3D6]/0 transition-all duration-300 group-hover:ring-[#EDE3D6]/70" />
      </CultureSceneLayer>
    </div>
  );
}

export default function ScoutingCulture({
  copy,
  actionLabel,
  isRtl = false,
}: {
  copy: Messages["scoutingCulture"];
  actionLabel: string;
  isRtl?: boolean;
}) {
  const cards = cultureClusterCards.map((card, index) => ({
    ...card,
    title: copy.cards[index].title,
  }));

  return (
    <section
      id="scouting-culture"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#DCE7EE_0%,#EFE5D9_16%,#F7F3EC_100%)] px-6 py-[5rem] sm:px-8 sm:py-[6rem]"
    >
      <div className="mx-auto max-w-[88rem]">
        <CultureScenePanel
          copy={copy}
          cards={cards}
          actionLabel={actionLabel}
          isRtl={isRtl}
        />
      </div>
    </section>
  );
}
