"use client";

import { create } from "zustand";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  resolveBrowserLocale,
} from "../config";
import type { Locale } from "../types";

interface LocaleState {
  locale: Locale;
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  hydrate: () => void;
}

function persistLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.documentElement.lang = locale;
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale: DEFAULT_LOCALE,
  hydrated: false,

  setLocale: (locale) => {
    persistLocale(locale);
    set({ locale });
  },

  hydrate: () => {
    if (get().hydrated) return;

    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(LOCALE_STORAGE_KEY)
        : null;

    const locale = stored && isLocale(stored) ? stored : resolveBrowserLocale();
    persistLocale(locale);
    set({ locale, hydrated: true });
  },
}));