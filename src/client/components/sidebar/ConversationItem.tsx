"use client";

import { useState } from "react";
import Link from "next/link";
import type { ConversationDto } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";

interface ConversationItemProps {
  conversation: ConversationDto;
  isActive: boolean;
  onDelete: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onDelete,
}: ConversationItemProps) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/chat/${conversation.id}`}
        className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-sm text-[13px] transition-all duration-150 ${
          isActive
            ? "nav-active font-medium"
            : "text-(--text-secondary) border border-transparent hover:text-(--text) hover:bg-(--bg-hover)"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            isActive ? "bg-[var(--accent)]" : "bg-[var(--text-muted)]"
          }`}
          aria-hidden
        />
        <span className="flex-1 truncate">{conversation.title}</span>
      </Link>

      {hovered && !isActive && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onDelete(conversation.id);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title={t.common.deleteConversation}
          aria-label={t.common.deleteConversation}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          </svg>
        </button>
      )}
    </div>
  );
}