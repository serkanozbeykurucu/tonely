"use client";

import { useTranslation } from "@/lib/i18n/hooks/useTranslation";

export function LegalFooter() {
  const { t } = useTranslation();

  return (
    <footer className="absolute bottom-5 left-0 right-0 text-center text-[11px] text-[var(--text-muted)] px-6">
      {t.legal.prefix}{" "}
      <a
        href="#"
        className="text-[var(--text-secondary)] underline decoration-[var(--border-accent)] hover:text-[var(--accent-light)] transition-colors"
      >
        {t.legal.terms}
      </a>{" "}
      {t.legal.middle}{" "}
      <a
        href="#"
        className="text-[var(--text-secondary)] underline decoration-[var(--border-accent)] hover:text-[var(--accent-light)] transition-colors"
      >
        {t.legal.privacy}
      </a>
      {t.legal.suffix}
    </footer>
  );
}