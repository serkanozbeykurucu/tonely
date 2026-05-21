"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GuidedChatView } from "@/components/chat/GuidedChatView";

interface ConversationPageProps {
  params: Promise<{ conversationId: string }>;
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = use(params);
  const router = useRouter();

  useEffect(() => {
    if (conversationId === "settings") {
      router.replace("/settings");
    } else if (conversationId === "help") {
      router.replace("/help");
    }
  }, [conversationId, router]);

  if (conversationId === "settings" || conversationId === "help") {
    return null;
  }

  return <GuidedChatView conversationId={conversationId} />;
}