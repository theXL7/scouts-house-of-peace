import {
  activityArchiveFacebookSourceMap,
  getLocalizedActivityArchiveEntry,
  type ActivityArchiveEntry,
} from "@/lib/activity-archive";
import type { Locale } from "@/messages";

export default function ArchiveStoryText({ entry, locale }: { entry: ActivityArchiveEntry; locale: Locale }) {
  const copy = getLocalizedActivityArchiveEntry(entry, locale);
  const sources = activityArchiveFacebookSourceMap[entry.id] ?? [];

  return (
    <>
      {copy.details.map((detail, index) => <p key={index} className="text-base leading-8 text-[#2A2A2A]/76">{detail}</p>)}
      {locale !== "ar" ? (
        <div>
          <p className="mb-3 text-sm font-bold text-[#264D3B]">{locale === "fr" ? "Compte rendu original (arabe)" : "Original report (Arabic)"}</p>
          <div lang="ar" dir="rtl" className="space-y-3">
            {entry.details.map((detail, index) => <p key={index} className="text-base leading-8 text-[#2A2A2A]/76">{detail}</p>)}
          </div>
        </div>
      ) : null}
      {sources.length ? (
        <ul className="flex flex-wrap gap-3">
          {sources.map((url, index) => (
            <li key={url}><a href={url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#264D3B] underline underline-offset-4">
              {locale === "ar" ? "المصدر" : "Source"} {index + 1}
            </a></li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
