import type { Tone } from "@/lib/types";
import type { Locale } from "./types";

const ALIASES: Record<Locale, Record<string, Tone>> = {
  en: {
    professional: "Professional",
    friendly: "Friendly",
    formal: "Formal",
    casual: "Casual",
    confident: "Confident",
    conversational: "Conversational",
  },
  tr: {
    professional: "Professional",
    profesyonel: "Professional",
    friendly: "Friendly",
    samimi: "Friendly",
    formal: "Formal",
    resmi: "Formal",
    casual: "Casual",
    rahat: "Casual",
    confident: "Confident",
    conversational: "Conversational",
    sohbet: "Conversational",
  },
  de: {
    professional: "Professional",
    professionell: "Professional",
    friendly: "Friendly",
    freundlich: "Friendly",
    formal: "Formal",
    formell: "Formal",
    casual: "Casual",
    locker: "Casual",
    confident: "Confident",
    selbstbewusst: "Confident",
    conversational: "Conversational",
    unterhaltend: "Conversational",
  },
  it: {
    professional: "Professional",
    professionale: "Professional",
    friendly: "Friendly",
    amichevole: "Friendly",
    formal: "Formal",
    formale: "Formal",
    casual: "Casual",
    informale: "Casual",
    confident: "Confident",
    sicuro: "Confident",
    conversational: "Conversational",
    colloquiale: "Conversational",
  },
};

export function normalizeTone(input: string, locale: Locale): Tone | null {
  const key = input.trim().toLowerCase();
  const alias = ALIASES[locale][key];
  if (alias) return alias;

  const tones = Object.values(ALIASES.en);
  return tones.find((t) => t.toLowerCase() === key) ?? null;
}