"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { useChat } from "@/lib/hooks/useMessages";
import { ChatWindow } from "./ChatWindow";
import { ChatComposer } from "./ChatComposer";

const PENDING_KEY = (id: string) => `tonely_pending_${id}`;

interface GuidedChatViewProps {
  conversationId: string;
}

export function GuidedChatView({ conversationId }: GuidedChatViewProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { messages, loading, sending, streamingText, quotaExceeded, connectionReady, load, send } = useChat();
  const initialSent = useRef(false);

  useEffect(() => {
    load(conversationId).catch(() => toast.error(t.toast.messageLoadFailed));
  }, [conversationId, load, t.toast.messageLoadFailed]);

  useEffect(() => {
    if (loading || !connectionReady || initialSent.current) return;

    const initial = sessionStorage.getItem(PENDING_KEY(conversationId));
    if (!initial) return;

    sessionStorage.removeItem(PENDING_KEY(conversationId));
    initialSent.current = true;

    send(conversationId, initial).catch((err) => {
      if ((err as { message?: string })?.message === "Unauthorized.") return;
      toast.error(err instanceof Error ? err.message : t.toast.messageLoadFailed);
    });
  }, [loading, connectionReady, conversationId, send, t]);

  const handleSubmit = useCallback(
    async (text: string) => {
      try {
        await send(conversationId, text);
      } catch (err) {
        if ((err as { message?: string })?.message === "Unauthorized.") {
          router.push("/login");
          return;
        }
      }
    },
    [conversationId, send, router],
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ChatWindow
        messages={messages}
        loading={loading}
        sending={sending}
        streamingText={streamingText}
      />
      <ChatComposer
        placeholder={quotaExceeded ? t.quota.exceeded : t.prompt.message}
        disabled={sending || loading || quotaExceeded}
        quotaExceeded={quotaExceeded}
        onSubmit={handleSubmit}
      />
    </div>
  );
}