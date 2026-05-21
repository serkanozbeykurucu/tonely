"use client";

import { useState } from "react";
import { SUPPORTED_LOCALES } from "@/lib/i18n";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import type { Locale } from "@/lib/i18n/types";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

function getFullLabel(t: ReturnType<typeof useTranslation>["t"], code: Locale): string {
  return t.locale[code];
}

function getShortLabel(code: Locale): string {
  return code.toUpperCase();
}

export function LocaleSwitcher() {
  const { t, locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-surface)]/80 backdrop-blur-sm border border-[var(--border)] shadow-sm hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] transition-all group"
        aria-label={t.locale.label}
        aria-expanded={isOpen}
      >
        <Globe size={14} className="text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors" />
        <span className="text-[12px] font-semibold text-[var(--text)]">{getShortLabel(locale)}</span>
        <ChevronDown size={14} className={`text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-40 glass rounded-[var(--radius-lg)] p-1.5 shadow-xl border border-[var(--border)] z-50 overflow-hidden"
          >
            {SUPPORTED_LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-[var(--radius-md)] transition-colors ${
                  locale === code
                    ? "bg-[var(--accent-muted)] text-[var(--accent)] font-medium"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
                }`}
              >
                <span>{getFullLabel(t, code)}</span>
                {locale === code && <Check size={14} className="text-[var(--accent)]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}