import type { Messages } from "@/messages/en";

type FaqItem = Messages["joinPage"]["faq"]["items"][number];

export default function JoinFaqAccordion({ items, isRtl = false }: { items: readonly FaqItem[]; isRtl?: boolean }) {
  return (
    <div className="mt-12 space-y-3">
      {items.map((item, index) => (
        // Native disclosure keeps every answer in HTML and works without hydration.
        <details key={item.question} name="join-faq" open={index === 0}
          className={`join-reveal group overflow-hidden rounded-[1.05rem] border border-[#DED2C1]/86 bg-[#FFFDFC]/82 shadow-[0_12px_26px_rgba(60,52,42,0.035)] transition-[background-color,border-color,box-shadow] duration-300 open:border-[#D2BEA1] open:bg-[#FFF8EF] ${isRtl ? "text-right" : "text-left"}`}
          style={{ animationDelay: `${index * 45}ms` }}>
          <summary className={`flex w-full cursor-pointer list-none items-center justify-between gap-5 px-5 py-[1.125rem] text-[#36463C] transition-colors hover:text-[#A96545] sm:px-6 [&::-webkit-details-marker]:hidden ${isRtl ? "flex-row-reverse" : ""}`}>
            <h3 style={{ fontFamily: "inherit" }} className="!text-[1.05rem] !font-semibold leading-[1.65] !tracking-normal !text-inherit">{item.question}</h3>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E1D5C5] bg-[#F7F3EC] text-[#617766] transition duration-300 group-open:rotate-180 group-open:border-[#C9D2C3] group-open:bg-[#E8EFE4] group-open:text-[#4E6B59]" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <p className="border-t border-[#E6D9C9]/74 px-5 pb-5 pt-4 text-base leading-[1.95] text-[#5B554D]/76 sm:px-6">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
