"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

type StageShowcaseItem = {
  key: string;
  title: string;
  age: string;
  summary: string;
  unit: string;
  smallGroup: string;
  leader: string;
  scarf: string;
  extraNote?: string;
  goals: string[];
  methods: string[];
  outcomes: string[];
  notes: Array<{
    title: string;
    description: string;
  }>;
  accent: string;
  borderColor: string;
  background: string;
  iconSrc: string;
};

type ScoutStagesShowcaseProps = {
  copy: {
    phases: string[];
    stageBadge: string;
    unitLabel: string;
    smallGroupLabel: string;
    leaderLabel: string;
    scarfLabel: string;
    goalsTitle: string;
    methodsTitle: string;
    outcomesTitle: string;
    detailsLabel: string;
  };
  items: StageShowcaseItem[];
  isRtl: boolean;
};

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.replace("#", "");
  const value = Number.parseInt(cleanHex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const subscribeToEnhancement = () => () => {};
const enhancedSnapshot = () => true;
const staticSnapshot = () => false;

export default function ScoutStagesShowcase({
  copy,
  items,
  isRtl,
}: ScoutStagesShowcaseProps) {
  const enhanced = useSyncExternalStore(subscribeToEnhancement, enhancedSnapshot, staticSnapshot);
  // Keep one stage active so the row of cards behaves like a visual selector.
  const [activeStageKey, setActiveStageKey] = useState(items[0]?.key ?? "");
  const activeStage =
    items.find((item) => item.key === activeStageKey) ?? items[0];

  if (!activeStage) {
    return null;
  }

  return (
    <div className="mt-10 grid gap-8">
      <div className="rounded-[1.8rem] border border-[#DCCFBE] bg-[linear-gradient(180deg,#FFFDF8_0%,#F6EEE2_100%)] p-6 shadow-[0_16px_32px_rgba(63,51,39,0.04)]">
        <div
          className={`flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${
            isRtl ? "text-right" : ""
          }`}
        >
          {copy.phases.map((phase, index) => (
            <div
              key={phase}
              className={`flex items-center gap-3 lg:flex-1 ${
                isRtl ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#CDB89C] bg-[#F8F2E8] text-sm font-semibold text-[#264D3B]">
                {index + 1}
              </div>
              <p className="text-[1rem] font-semibold text-[#264D3B]">{phase}</p>
              {index < copy.phases.length - 1 ? (
                <div
                  className={`hidden h-px flex-1 bg-gradient-to-r from-[#C6AF8A] via-[#264D3B]/30 to-transparent lg:block ${
                    isRtl ? "bg-gradient-to-l" : ""
                  }`}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      >
        {items.map((stage, index) => {
          const isActive = stage.key === activeStage.key;

          return (
            <a
              key={stage.key}
              href={`#stage-${stage.key}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(event) => { event.preventDefault(); setActiveStageKey(stage.key); }}
              className={`group flex h-full flex-col rounded-[2rem] border p-5 text-start transition-all duration-300 sm:p-6 ${
                isRtl ? "text-right" : ""
              }`}
              style={{
                borderColor: isActive ? stage.borderColor : "#E8DCCC",
                background: isActive
                  ? stage.background
                  : "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,245,238,0.98) 100%)",
                boxShadow: isActive
                  ? `0 24px 48px ${hexToRgba(stage.accent, 0.18)}`
                  : "0 14px 30px rgba(63,51,39,0.06)",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              <div
                className={`flex items-start justify-between gap-3 ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <span className="rounded-full border border-white/85 bg-white/88 px-3 py-1.5 text-[0.78rem] font-semibold text-[#5D5148] shadow-[0_8px_20px_rgba(63,51,39,0.05)]">
                  {stage.age}
                </span>
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-300"
                  style={{
                    borderColor: isActive
                      ? hexToRgba(stage.accent, 0.18)
                      : "#E6DACB",
                    backgroundColor: isActive ? stage.accent : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : stage.accent,
                  }}
                >
                  {index + 1}
                </span>
              </div>

              <div className="relative mx-auto mt-6 h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]">
                <Image
                  src={stage.iconSrc}
                  alt=""
                  fill
                  unoptimized
                  sizes="72px"
                  className="object-contain drop-shadow-[0_10px_18px_rgba(63,51,39,0.12)]"
                />
              </div>

              <h3
                className={`mt-5 text-[1.35rem] leading-[1.45] text-[#2E2A27] ${
                  isRtl ? "ar-display-heading" : ""
                }`}
              >
                {stage.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-8 text-[#5B534C]">
                {stage.summary}
              </p>

              <span
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: stage.accent }}
              >
                <span>{copy.detailsLabel}</span>
                <span aria-hidden="true">{isRtl ? "\u2190" : "\u2192"}</span>
              </span>
            </a>
          );
        })}
      </div>

      {items.map((stage) => (
        <section key={stage.key} id={`stage-${stage.key}`} hidden={enhanced && stage.key !== activeStageKey} className="scroll-mt-32">
          <StageDetails activeStage={stage} copy={copy} isRtl={isRtl} />
        </section>
      ))}
    </div>
  );
}

function StageDetails({ activeStage, copy, isRtl }: { activeStage: StageShowcaseItem; copy: ScoutStagesShowcaseProps["copy"]; isRtl: boolean }) {
  const infoCards = [
    { label: copy.unitLabel, value: activeStage.unit },
    { label: copy.smallGroupLabel, value: activeStage.smallGroup },
    { label: copy.leaderLabel, value: activeStage.leader },
    { label: copy.scarfLabel, value: activeStage.scarf },
  ];

  const detailGroups = [
    { title: copy.goalsTitle, items: activeStage.goals },
    { title: copy.methodsTitle, items: activeStage.methods },
    { title: copy.outcomesTitle, items: activeStage.outcomes },
  ];

  return (
      <div
        className={`rounded-[2.2rem] border p-6 shadow-[0_28px_60px_rgba(63,51,39,0.08)] sm:p-7 lg:p-8 ${
          isRtl ? "text-right" : ""
        }`}
        style={{
          borderColor: activeStage.borderColor,
          background: activeStage.background,
          boxShadow: `0 28px 60px ${hexToRgba(activeStage.accent, 0.14)}`,
        }}
      >
        <div
          className={`flex flex-col gap-6 lg:items-start lg:justify-between ${
            isRtl ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/85 bg-white/84 px-3 py-1.5 text-sm font-semibold text-[#8A6A55] shadow-[0_8px_18px_rgba(63,51,39,0.05)]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: activeStage.accent }}
              />
              <span>{copy.stageBadge}</span>
            </div>

            <h3
              className={`mt-4 text-[1.8rem] leading-[1.35] text-[#264D3B] sm:text-[2rem] ${
                isRtl ? "ar-display-heading" : ""
              }`}
            >
              {activeStage.title}
            </h3>

            <p className="mt-4 text-[1rem] leading-[2] text-[#524C45]">
              {activeStage.summary}
            </p>
          </div>

          <div
            className={`flex items-center gap-4 ${
              isRtl ? "justify-end" : ""
            }`}
          >
            <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
              <Image
                src={activeStage.iconSrc}
                alt=""
                fill
                unoptimized
                sizes="80px"
                className="object-contain drop-shadow-[0_12px_22px_rgba(63,51,39,0.12)]"
              />
            </div>

            <span className="rounded-full border border-white/85 bg-white/88 px-4 py-2 text-sm font-semibold text-[#3B312A] shadow-[0_8px_18px_rgba(63,51,39,0.05)]">
              {activeStage.age}
            </span>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {infoCards.map((detail) => (
            <div
              key={detail.label}
              className={`rounded-[1.15rem] border border-white/78 bg-white/75 p-4 shadow-[0_10px_22px_rgba(63,51,39,0.04)] ${
                isRtl ? "text-right" : ""
              }`}
            >
              <p className="text-xs font-semibold text-[#8A6A55]">
                {detail.label}
              </p>
              <p
                className="mt-2 text-sm leading-7"
                style={{ color: activeStage.accent }}
              >
                {detail.value}
              </p>
            </div>
          ))}
        </div>

        {activeStage.extraNote ? (
          <p className="mt-5 text-sm leading-8 text-[#635A51]">
            {activeStage.extraNote}
          </p>
        ) : null}

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {detailGroups.map((group) => (
            <div
              key={group.title}
              className={`rounded-[1.3rem] border border-white/78 bg-white/75 p-5 shadow-[0_10px_22px_rgba(63,51,39,0.04)] ${
                isRtl ? "text-right" : ""
              }`}
            >
              <h4 className="text-[1rem] font-semibold text-[#264D3B]">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm leading-7 text-[#524C45]">
                {group.items.map((entry) => (
                  <li
                    key={entry}
                    className={`flex items-start gap-2.5 ${
                      isRtl ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span
                      className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: activeStage.accent }}
                    />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-4 xl:grid-cols-3">
          {activeStage.notes.map((note) => (
            <article
              key={note.title}
              className={`rounded-[1.3rem] border border-white/78 bg-[#FFFCF7]/82 p-5 shadow-[0_10px_22px_rgba(63,51,39,0.04)] ${
                isRtl ? "text-right" : ""
              }`}
            >
              <h4 className="text-[1rem] font-semibold text-[#264D3B]">
                {note.title}
              </h4>
              <p className="mt-3 text-sm leading-8 text-[#524C45]">
                {note.description}
              </p>
            </article>
          ))}
        </div>
      </div>
  );
}
