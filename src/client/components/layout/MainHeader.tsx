"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, MessageSquare, PanelLeftOpen } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { useConversations } from "@/lib/hooks/useConversations";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface MainHeaderProps {
  isAuthenticated: boolean;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function MainHeader({ isAuthenticated, isSidebarOpen = true, onToggleSidebar }: MainHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const conversations = useConversations((s) => s.conversations);

  const activeId = pathname?.startsWith("/chat/") ? (pathname.split("/")[2] ?? "") : "";
  const isChatPage = activeId && activeId !== "settings" && activeId !== "help";
  const activeConversation = isChatPage ? conversations.find(c => c.id === activeId) : null;

  return (
    <header className="relative z-[2] flex items-center justify-between px-6 py-4 shrink-0 gap-4 border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg-base)] to-[var(--bg-base)]/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 shrink-0">
        {!isSidebarOpen && onToggleSidebar && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="!p-1.5 !h-8 !w-8 hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text)] cursor-pointer mr-1 rounded-lg flex items-center justify-center"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={18} />
          </Button>
        )}
        <Link href="/chat" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2">
          {activeConversation ? (
            <>
              <MessageSquare size={18} className="text-[var(--accent)]" />
              <h1 className="text-base font-medium text-[var(--text)] line-clamp-1 max-w-[200px] sm:max-w-[300px]">
                {activeConversation.title}
              </h1>
            </>
          ) : (
            <BrandMark size="sm" />
          )}
        </Link>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <LocaleSwitcher />

        <div className="w-[1px] h-6 bg-[var(--border)] hidden sm:block"></div>

        {!isAuthenticated ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              {t.auth.logIn}
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="btn-accent px-5 py-2 text-[13px] rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
            >
              {t.auth.signUpFree}
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/settings")}
            className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] shadow-sm hover:shadow-md hover:border-[var(--border-hover)] transition-all group"
            aria-label={t.common.userMenu}
          >
            <User size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors" />
          </button>
        )}
      </div>
    </header>
  );
}