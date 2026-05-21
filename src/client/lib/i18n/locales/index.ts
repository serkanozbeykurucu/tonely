import type { Dictionary, Locale } from "../types";
import { en } from "./en";
import { tr } from "./tr";
import { de } from "./de";
import { it } from "./it";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  tr,
  de,
  it
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}