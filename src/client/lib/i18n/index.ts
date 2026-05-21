export type { Dictionary, Locale } from "./types";
export {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  LOCALE_STORAGE_KEY,
  isLocale,
  resolveBrowserLocale,
} from "./config";
export { getDictionary } from "./locales";
export { normalizeTone } from "./toneAliases";
export { useLocaleStore } from "./stores/localeStore";
export { useTranslation } from "./hooks/useTranslation";
export { I18nProvider } from "./provider/I18nProvider";