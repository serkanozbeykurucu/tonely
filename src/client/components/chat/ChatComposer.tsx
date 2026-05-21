"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { PromptInputBar } from "./PromptInputBar";

interface ChatComposerProps {
  placeholder: string;
  disabled?: boolean;
  quotaExceeded?: boolean;
  onSubmit: (text: string) => void;
}

export function ChatComposer({ placeholder, disabled, quotaExceeded, onSubmit }: ChatComposerProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim() || disabled) return;
    const text = value.trim();
    setValue("");
    onSubmit(text);
  }

  return (
    <div className="shrink-0 px-4 md:px-8 pb-5 pt-3 border-t border-(--border) bg-(--bg-base)/90 backdrop-blur-md">
      <div className="max-w-3xl mx-auto w-full">
        <PromptInputBar
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {quotaExceeded ? (
        <p className="text-center text-[11px] text-amber-400 mt-3 px-4 max-w-3xl mx-auto">
          {t.quota.exceeded}{" "}
          <Link href="/plans" className="underline font-medium">
            {t.quota.upgradeCta}
          </Link>
        </p>
      ) : (
        <p className="text-center text-[11px] text-(--text-muted) mt-3 px-4 max-w-3xl mx-auto">
          {t.composer.disclaimer}
        </p>
      )}
    </div>
  );
}