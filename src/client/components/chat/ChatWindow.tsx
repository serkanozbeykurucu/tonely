"use client";

import { useEffect, useRef } from "react";
import type { MessageDto } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { MessageBubble } from "./MessageBubble";
import { MessageContent } from "./MessageContent";

interface ChatWindowProps {
  messages: MessageDto[];
  loading: boolean;
  sending: boolean;
  streamingText: string | null;
}

export function ChatWindow({ messages, loading, sending, streamingText }: ChatWindowProps) {
  const { t } = useTranslation();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending, streamingText]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] animate-spin" />
      </div>
    );
  }

  if (messages.length === 0 && !sending) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-[4vh]">
        <p className="font-display text-2xl text-[var(--text-secondary)] tracking-tight text-center max-w-md leading-relaxed animate-fade-up">
          {t.hero.title}
        </p>
      </div>
    );
  }

  const avatarIcon = (
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
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 md:px-8 py-8 space-y-8 max-w-3xl mx-auto w-full">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {sending && streamingText === null && (
          <div className="flex justify-start gap-4 w-full py-1">
            <div
              className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0ea5e9] to-[#10b981] shadow-[0_2px_12px_rgba(14,165,233,0.25)] border border-[rgba(255,255,255,0.1)] text-[#060911] text-xs font-bold select-none"
              aria-hidden
            >
              {avatarIcon}
            </div>
            <div className="bg-[var(--bg-elevated)]/40 border border-[var(--border)] rounded-2xl flex items-center gap-1.5 px-5 py-4 shadow-sm animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {streamingText !== null && (
          <div className="flex justify-start gap-4 w-full py-1">
            <div
              className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0ea5e9] to-[#10b981] shadow-[0_2px_12px_rgba(14,165,233,0.25)] border border-[rgba(255,255,255,0.1)] text-[#060911] text-xs font-bold select-none"
              aria-hidden
            >
              {avatarIcon}
            </div>
            <div className="flex-1 max-w-full min-w-0 bg-[var(--bg-elevated)]/40 border border-[var(--border)] rounded-2xl px-5 py-4 shadow-sm">
              <MessageContent
                content={streamingText}
                className="text-[15px] text-[var(--text)] leading-relaxed select-text"
              />
              <span className="inline-block w-1.5 h-4 bg-[var(--accent)] animate-pulse ml-1 align-middle rounded-sm" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}