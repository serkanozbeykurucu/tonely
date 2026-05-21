"use client";

import { useMemo } from "react";
import { getDictionary } from "../locales";
import { useLocaleStore } from "../stores/localeStore";
import type { Dictionary, Locale } from "../types";

export function useTranslation(): {
  t: Dictionary;
  locale: Locale;
  setLocale: (locale: Locale) => void;
} {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const t = useMemo(() => getDictionary(locale), [locale]);

  return { t, locale, setLocale };
}