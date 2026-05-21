export interface ConversationDto {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MessageDto {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ApiResponse<T = void> {
  responseCode: number;
  message: string;
  data?: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TokenResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface CreateConversationRequest {
  title: string;
}

export type Tone =
  | "Professional"
  | "Friendly"
  | "Formal"
  | "Casual"
  | "Confident"
  | "Conversational";

export const TONES: Tone[] = [
  "Professional",
  "Friendly",
  "Formal",
  "Casual",
  "Confident",
  "Conversational"
];

export interface GenerateMessageRequest {
  conversationId: string;
  positionTitle: string;
  positionDescription: string;
  tone: Tone;
  additionalContext?: string;
}