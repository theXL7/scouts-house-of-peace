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
  const fieldClasses = `w-full rounded-[1.15rem] border border-[#E4D8C8] bg-[#FFFCF8] px-4 py-3 text-sm text-[#2A2A2A] shadow-[0_6px_16px_rgba(60,52,42,0.04)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#7B756B]/55 focus:border-[#C9B08A] focus:shadow-[0_0_0_3px_rgba(201,176,138,0.16)] ${
    isRtl ? "text-right leading-7" : ""
  }`;
  const ltrFieldClasses = `${fieldClasses} text-left`;
  const submitAlignment = isRtl ? "items-end text-right" : "items-start text-left";

  return (
    <div
      className={`rounded-[2rem] border border-[#DED2C1] bg-[#FFFDFC] p-6 shadow-[0_22px_44px_rgba(60,52,42,0.06)] sm:p-8 ${containerAlignment}`}
    >
      <p
        className={`text-sm text-[#4B4A45]/72 ${
          isRtl ? "leading-[2]" : "leading-7"
        }`}
      >
        {copy.note}
      </p>

      <form
        dir={isRtl ? "rtl" : "ltr"}
        className="mt-6 grid gap-4 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
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
          <span className="mb-2 block text-sm font-medium text-[#264D3B]">
            {copy.fields.message}
          </span>
          <textarea
            required
            name="message"
            rows={5}
            className={`${fieldClasses} resize-y`}
            placeholder={copy.messagePlaceholder}
          />
        </label>

        <div className={`sm:col-span-2 flex flex-col ${submitAlignment}`}>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CBAE84] bg-[#264D3B] px-6 py-3 text-sm font-semibold text-[#F7F3EC] shadow-[0_12px_28px_rgba(38,77,59,0.16)] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#315B47]"
          >
            {copy.submitLabel}
          </button>

          {submitted ? (
            <p
              className={`mt-4 text-sm text-[#264D3B] ${
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
