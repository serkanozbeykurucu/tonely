"use client";

import { useState } from "react";
import type { MessageDto } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { MessageContent } from "./MessageContent";
import { Copy, Check } from "lucide-react";

interface MessageBubbleProps {
  message: MessageDto;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { t } = useTranslation();
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (isUser) {
    return (
      <div className="flex justify-end w-full">
        <div className="max-w-[80%] md:max-w-[70%] rounded-2xl rounded-tr-sm px-4.5 py-3.5 bg-[var(--bg-input)] border border-[var(--border)] shadow-md text-[var(--text)] transition-all hover:border-[var(--border-accent)]">
          <MessageContent
            content={message.content}
            className="text-[15px] text-[var(--text)] leading-relaxed select-text"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-4 w-full group py-1">
      <div
        className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0ea5e9] to-[#10b981] shadow-[0_2px_12px_rgba(14,165,233,0.25)] border border-[rgba(255,255,255,0.1)] text-[#060911] text-xs font-bold select-none select-none"
        aria-hidden
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </div>

      <div className="flex-1 max-w-full min-w-0 flex flex-col items-start">
        <div className="w-full bg-[var(--bg-elevated)]/40 border border-[var(--border)] rounded-2xl px-5 py-4 shadow-sm hover:border-[rgba(14,165,233,0.15)] transition-all">
          <MessageContent
            content={message.content}
            className="text-[15px] text-[var(--text)] leading-relaxed select-text"
          />
        </div>
        
        <div className="mt-2.5 h-6 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-1.5 !h-7 !px-2.5 rounded-md text-[11px] font-medium text-[var(--text-muted)] bg-[var(--bg-hover)] hover:bg-[var(--accent-muted)] border border-transparent hover:border-[var(--border-accent)] hover:text-[var(--accent-light)] transition-all duration-200 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={11} className="text-[var(--accent-emerald)]" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>Kopyala</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}