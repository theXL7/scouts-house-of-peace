"use client";

import { useEffect } from "react";

import { getDirection, type Locale } from "@/messages";

export default function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    const direction = getDirection(locale);

    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [locale]);

  return null;
}
