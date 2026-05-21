import type { Locale } from "./types";

export const DEFAULT_LOCALE: Locale = "en";

export const SUPPORTED_LOCALES: Locale[] = ["en", "tr", "de", "it"];

export const LOCALE_STORAGE_KEY = "tonely_locale";

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function resolveBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const browser = navigator.language.toLowerCase();
  if (browser.startsWith("tr")) return "tr";
  return DEFAULT_LOCALE;
}