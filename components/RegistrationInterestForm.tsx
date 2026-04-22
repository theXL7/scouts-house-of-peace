"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import type { Messages } from "@/messages/en";

function getFieldValue(formData: FormData, fieldName: string) {
  return String(formData.get(fieldName) ?? "").trim();
}

export default function RegistrationInterestForm({
  copy,
  isRtl = false,
}: {
  copy: Messages["joinPage"]["form"];
  isRtl?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const lines = [
      `${copy.fields.fullName}: ${getFieldValue(formData, "fullName")}`,
      `${copy.fields.guardianName}: ${getFieldValue(formData, "guardianName")}`,
      `${copy.fields.phone}: ${getFieldValue(formData, "phone")}`,
      `${copy.fields.email}: ${getFieldValue(formData, "email")}`,
      `${copy.fields.age}: ${getFieldValue(formData, "age")}`,
      `${copy.fields.status}: ${getFieldValue(formData, "status")}`,
      `${copy.fields.hasUniform}: ${getFieldValue(formData, "hasUniform")}`,
      `${copy.fields.size}: ${getFieldValue(formData, "size")}`,
      `${copy.fields.message}:`,
      getFieldValue(formData, "message"),
    ];

    const subject = copy.emailSubject;
    const body = encodeURIComponent(lines.join("\n"));

    setSubmitted(true);
    form.reset();
    window.location.href = `mailto:${copy.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  const containerAlignment = isRtl ? "text-right" : "text-left";
  const fieldClasses = `w-full rounded-[0.95rem] border border-[#E1D6C7] bg-[#FBF8F2] px-4 py-3 text-sm text-[#403D37] outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-[#7B756B]/48 focus:border-[#C4B08E] focus:bg-[#FFFDFC] focus:shadow-[0_0_0_3px_rgba(201,176,138,0.14)] ${
    isRtl ? "text-right leading-7" : ""
  }`;
  const ltrFieldClasses = `${fieldClasses} text-left`;
  const submitAlignment = isRtl ? "items-end text-right" : "items-start text-left";

  return (
    <div
      className={`join-reveal rounded-[1.35rem] border border-[#DED2C1]/90 bg-[#FFFDFC]/88 p-6 shadow-[0_20px_42px_rgba(60,52,42,0.055)] backdrop-blur-sm sm:p-8 ${containerAlignment}`}
      style={{ animationDelay: "120ms" }}
    >
      <div className="rounded-[1rem] border border-[#E7DCCB]/85 bg-[#F8F2E9]/78 px-4 py-4">
        <p
          className={`text-sm font-semibold text-[#415B4C] ${
            isRtl ? "leading-[2]" : "leading-7"
          }`}
        >
          {copy.note}
        </p>
      </div>

      <form
        dir={isRtl ? "rtl" : "ltr"}
        className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.fullName}
          </span>
          <input
            required
            type="text"
            name="fullName"
            className={fieldClasses}
            autoComplete="name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.guardianName}
          </span>
          <input
            type="text"
            name="guardianName"
            className={fieldClasses}
            autoComplete="name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.phone}
          </span>
          <input
            required
            type="tel"
            name="phone"
            dir="ltr"
            className={ltrFieldClasses}
            autoComplete="tel"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.email}
          </span>
          <input
            required
            type="email"
            name="email"
            dir="ltr"
            className={ltrFieldClasses}
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.age}
          </span>
          <input
            type="text"
            name="age"
            dir="ltr"
            className={ltrFieldClasses}
            inputMode="numeric"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.status}
          </span>
          <select name="status" className={fieldClasses} defaultValue={copy.statusOptions[0]}>
            {copy.statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.hasUniform}
          </span>
          <select
            name="hasUniform"
            className={fieldClasses}
            defaultValue={copy.uniformOptions[0]}
          >
            {copy.uniformOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.size}
          </span>
          <select name="size" className={fieldClasses} defaultValue={copy.sizeOptions[4]}>
            {copy.sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-[#415B4C]">
            {copy.fields.message}
          </span>
          <textarea
            required
            name="message"
            rows={5}
            className={`${fieldClasses} resize-y`}
            placeholder={copy.messagePlaceholder}
          />
          <span
            className={`mt-2 block text-xs text-[#4B4A45]/62 ${
              isRtl ? "leading-6" : "leading-5"
            }`}
          >
            {copy.messageHelper}
          </span>
        </label>

        <div className={`sm:col-span-2 flex flex-col ${submitAlignment}`}>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CDB98E] bg-[#2E4D3F] px-6 py-3 text-sm font-semibold text-[#F8F2E8] shadow-[0_14px_30px_rgba(46,77,63,0.18)] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#365946]"
          >
            {copy.submitLabel}
          </button>

          {submitted ? (
            <p
              className={`mt-4 text-sm text-[#415B4C] ${
                isRtl ? "leading-[1.95]" : "leading-7"
              }`}
            >
              {copy.successMessage}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
