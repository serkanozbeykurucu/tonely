import { api } from "./client";
import type { ApiResponse, MessageDto } from "../types";

export async function getMessages(conversationId: string): Promise<MessageDto[]> {
  const res = await api.get<ApiResponse<MessageDto[]>>(
    `/api/v1/message/conversation/${conversationId}`,
  );
  return res.data ?? [];
}
