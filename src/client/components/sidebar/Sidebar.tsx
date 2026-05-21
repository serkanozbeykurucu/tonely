"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { useConversations } from "@/lib/hooks/useConversations";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { BrandMark } from "@/components/ui/BrandMark";
import { NavItem } from "@/components/ui/NavItem";
import { Button } from "@/components/ui/Button";
import { Plus, Clock, LogOut, PanelLeftClose } from "lucide-react";
import { getFooterNavItems } from "./sidebarNavConfig";
import { SidebarAuthCta } from "./SidebarAuthCta";
import { ConversationItem } from "./ConversationItem";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { conversations, loading, load, create, remove } = useConversations();
  const { logout, isAuthenticated } = useAuth();
  const creating = useRef(false);
  const [historyOpen, setHistoryOpen] = useState(true);

  const footerNavItems = useMemo(() => getFooterNavItems(t), [t]);

  const handleLoadError = useCallback(() => {
    toast.error(t.toast.conversationLoadFailed);
  }, [t.toast.conversationLoadFailed]);

  useEffect(() => {
    if (isAuthenticated) load().catch(handleLoadError);
  }, [load, isAuthenticated, handleLoadError]);

  useEffect(() => {
    if (isAuthenticated) setHistoryOpen(true);
  }, [isAuthenticated]);

  const activeId = pathname?.startsWith("/chat/") ? (pathname.split("/")[2] ?? "") : "";

  async function handleNew() {
    if (!isAuthenticated) {
      router.push("/chat");
      return;
    }

    if (creating.current) return;
    creating.current = true;
    try {
      const conv = await create(t.sidebar.newConversation);
      router.push(`/chat/${conv.id}`);
    } catch {
      toast.error(t.toast.conversationCreateFailed);
    } finally {
      creating.current = false;
    }
  }

  function handleHistory() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setHistoryOpen((open) => !open);
  }

  async function handleDelete(id: string) {
    try {
      await remove(id);
      if (activeId === id) router.push("/chat");
    } catch {
      toast.error(t.toast.conversationDeleteFailed);
    }
  }

  function handleLogout() {
    logout();
    router.push("/chat");
  }

  return (
    <aside className={`flex flex-col h-full surface-sidebar shrink-0 transition-all duration-300 ease-in-out overflow-hidden z-30 ${
      isOpen
        ? "w-[272px] min-w-[272px] absolute md:relative left-0 top-0 bottom-0 shadow-2xl md:shadow-none"
        : "w-0 min-w-0 max-w-0 border-r-0"
    }`}>
      <div className="px-4 pt-5 pb-4 border-b border-[var(--border)] flex items-center justify-between min-w-[272px]">
        <BrandMark size="sm" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="!p-1.5 !h-8 !w-8 hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text)] cursor-pointer mr-1 rounded-lg flex items-center justify-center"
          title="Collapse sidebar"
        >
          <PanelLeftClose size={18} />
        </Button>
      </div>

      <div className="flex flex-col flex-1 min-w-[272px] min-h-0">
        <div className="px-3 pt-4 pb-2 space-y-1">
          <NavItem
            icon={<Plus size={18} />}
            label={t.sidebar.newChat}
            onClick={handleNew}
          />
          <NavItem
            icon={<Clock size={18} />}
            label={t.sidebar.history}
            onClick={handleHistory}
            active={historyOpen && isAuthenticated}
          />
        </div>

        {isAuthenticated && historyOpen && (
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 min-h-0 mx-1">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <div className="w-5 h-5 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] animate-spin" />
              </div>
            ) : conversations.length === 0 ? (
              <p className="px-3 py-5 text-[12px] text-[var(--text-muted)] leading-relaxed text-center mt-2">
                {t.sidebar.noChats}
              </p>
            ) : (
              conversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isActive={activeId === conv.id}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}

        {(!isAuthenticated || !historyOpen) && <div className="flex-1" />}

        <div className="px-3 pb-4 pt-2 space-y-1 mt-auto border-t border-[var(--border)]">
          <nav aria-label="Footer" className="pt-2 space-y-0.5">
            {footerNavItems.map(({ id, label, Icon, href }) => (
              <NavItem
                key={id}
                icon={<Icon size={18} />}
                label={label}
                href={href}
                active={pathname === href}
              />
            ))}
          </nav>

          {!isAuthenticated && <SidebarAuthCta />}

          {isAuthenticated && (
            <NavItem
              icon={<LogOut size={18} />}
              label={t.auth.signOut}
              onClick={handleLogout}
              className="mt-1 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            />
          )}
        </div>
      </div>
    </aside>
  );
}