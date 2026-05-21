"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { PromptInputBar } from "./PromptInputBar";
import { LegalFooter } from "@/components/layout/LegalFooter";

interface HeroSectionProps {
  onSubmit: (message: string) => void | Promise<void>;
}

export function HeroSection({ onSubmit }: HeroSectionProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");

  async function handleSubmit() {
    if (!input.trim()) return;
    await onSubmit(input.trim());
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative min-h-0 w-full py-6">
      <div className="w-full max-w-2xl px-6 flex flex-col items-center -mt-[4vh] md:-mt-[8vh]">
        <span className="animate-fade-up mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)] bg-[var(--accent-muted)] border border-[var(--border-accent)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          {t.common.badge}
        </span>

        <h1 className="animate-fade-up-delay font-display text-[2.5rem] md:text-[2.75rem] font-medium text-center leading-[1.15] tracking-tight mb-4">
          <span className="text-gradient">{t.hero.title}</span>
        </h1>

        <p className="animate-fade-up-delay text-[15px] text-[var(--text-secondary)] mb-10 text-center max-w-md leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="animate-fade-up-delay w-full" style={{ animationDelay: "0.2s" }}>
          <PromptInputBar
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            placeholder={t.hero.placeholder}
            large
          />
        </div>
      </div>
      <LegalFooter />
    </div>
  );
}