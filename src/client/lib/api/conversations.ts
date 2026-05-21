import { api } from "./client";
import type {
  ApiResponse,
  ConversationDto,
  CreateConversationRequest,
} from "../types";

export async function getConversations(): Promise<ConversationDto[]> {
  const res = await api.get<ApiResponse<ConversationDto[]>>(
    "/api/v1/conversation",
  );
  return res.data ?? [];
}

export async function createConversation(
  data: CreateConversationRequest,
): Promise<ConversationDto> {
  const res = await api.post<ApiResponse<ConversationDto>>(
    "/api/v1/conversation",
    data,
  );
  return res.data!;
}

export async function deleteConversation(id: string): Promise<void> {
  await api.delete(`/api/v1/conversation/${id}`);
}