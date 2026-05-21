import { setTokens, clearTokens } from "../utils/token";
import type { LoginRequest, RegisterRequest, TokenResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function login(data: LoginRequest): Promise<void> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? "Invalid credentials");
  }

  const token: TokenResponse = await res.json();
  setTokens(token.accessToken, token.refreshToken);
}

export async function register(data: RegisterRequest): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/v1/account/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail =
      body.errors?.DuplicateUserName?.[0] ??
      body.errors?.DuplicateEmail?.[0] ??
      body.detail ??
      "Registration failed";
    throw new Error(detail);
  }
}

export function logout(): void {
  clearTokens();
}