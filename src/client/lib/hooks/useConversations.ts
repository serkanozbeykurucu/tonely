"use client";

import { create } from "zustand";
import {
  getConversations,
  createConversation,
  deleteConversation,
} from "../api/conversations";
import type { ConversationDto } from "../types";

interface ConversationsState {
  conversations: ConversationDto[];
  loading: boolean;
  load: () => Promise<void>;
  create: (title: string) => Promise<ConversationDto>;
  remove: (id: string) => Promise<void>;
}

export const useConversations = create<ConversationsState>((set, get) => ({
  conversations: [],
  loading: false,

  load: async () => {
    set({ loading: true });
    try {
      const data = await getConversations();
      const sorted = [...data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      set({ conversations: sorted });
    } finally {
      set({ loading: false });
    }
  },

  create: async (title: string) => {
    const conv = await createConversation({ title });
    set((state) => ({
      conversations: [conv, ...state.conversations],
    }));
    return conv;
  },

  remove: async (id: string) => {
    await deleteConversation(id);
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
    }));
  },
}));