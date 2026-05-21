"use client";

import { useEffect, useRef, KeyboardEvent } from "react";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { Sparkles, Send } from "lucide-react";

interface PromptInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  large?: boolean;
}

export function PromptInputBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled = false,
  large = false,
}: PromptInputBarProps) {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${newHeight}px`;
  }, [value]);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (disabled || !value.trim()) return;
      onSubmit();
    }
  }

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div
      className={`w-full relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-input)] shadow-lg backdrop-blur-xl transition-[border-color,box-shadow] duration-200 focus-within:border-[var(--border-accent)] focus-within:shadow-[0_0_25px_-5px_var(--accent-glow)] p-3 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          window.scrollTo(0, 0);
          if (document.body) document.body.scrollTop = 0;
          if (document.documentElement) document.documentElement.scrollTop = 0;
        }}
        placeholder={placeholder ?? t.prompt.default}
        disabled={disabled}
        className={`w-full bg-transparent border-none outline-none text-[var(--text)] placeholder-[var(--text-muted)] resize-none min-h-[40px] max-h-[180px] py-1 px-2 leading-relaxed ${
          large ? "text-[16px]" : "text-[15px]"
        }`}
      />

      <div className="flex items-center justify-between mt-3 px-2 pt-2 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-light)] bg-[var(--accent-muted)] border border-[var(--border-accent)] animate-pulse">
            <Sparkles size={10} className="text-[var(--accent)]" />
            AI Generator
          </span>
        </div>

        <Button
          variant={canSend ? "accent" : "ghost"}
          onClick={onSubmit}
          disabled={!canSend}
          className={`!h-9 !w-9 !p-0 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            !canSend ? "bg-[var(--bg-hover)] text-[var(--text-muted)] opacity-40 border-none" : ""
          }`}
          aria-label={t.common.send}
        >
          <Send size={15} className={canSend ? "animate-pulse" : ""} />
        </Button>
      </div>
    </div>
  );
}