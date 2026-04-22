"use client";

import { useId, useState } from "react";

import type { Messages } from "@/messages/en";

type FaqItem = Messages["joinPage"]["faq"]["items"][number];

export default function JoinFaqAccordion({
  items,
  isRtl = false,
}: {
  items: readonly FaqItem[];
  isRtl?: boolean;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);
  const textAlignment = isRtl ? "text-right" : "text-left";
  const rowDirection = isRtl ? "flex-row-reverse" : "";

  return (
    <div className="mt-12 space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;

        return (
          <div
            key={item.question}
            className={`join-reveal overflow-hidden rounded-[1.05rem] border shadow-[0_12px_26px_rgba(60,52,42,0.035)] transition-[background-color,border-color,box-shadow] duration-300 ${
              isOpen
                ? "border-[#D2BEA1] bg-[#FFF8EF]"
                : "border-[#DED2C1]/86 bg-[#FFFDFC]/82"
            } ${textAlignment}`}
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className={`flex w-full items-center justify-between gap-5 px-5 py-[1.125rem] text-[#36463C] transition-colors hover:text-[#A96545] sm:px-6 ${
                isOpen ? "text-[#3E5A4A]" : ""
              } ${rowDirection}`}
            >
              <span className="text-[1.05rem] font-semibold leading-[1.65]">
                {item.question}
              </span>
              <span
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-300 ${
                  isOpen
                    ? "border-[#C9D2C3] bg-[#E8EFE4] text-[#4E6B59]"
                    : "border-[#E1D5C5] bg-[#F7F3EC] text-[#617766]"
                } ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-[#E6D9C9]/74 px-5 pb-5 pt-4 text-base leading-[1.95] text-[#5B554D]/76 sm:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
