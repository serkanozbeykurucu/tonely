"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConversations } from "@/lib/hooks/useConversations";
import { ApiError } from "@/lib/api/client";
import { HeroSection } from "@/components/chat/HeroSection";

export default function ChatHomePage() {
  const router = useRouter();
  const { create } = useConversations();

  async function handleSubmit(message: string) {
    try {
      const conv = await create(message);
      sessionStorage.setItem(`tonely_pending_${conv.id}`, message);
      router.push(`/chat/${conv.id}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return;
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return <HeroSection onSubmit={handleSubmit} />;
}