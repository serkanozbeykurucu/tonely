"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { getMessages } from "../api/messages";
import { getAccessToken } from "../utils/token";
import type { MessageDto } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function isQuotaError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return msg.includes("maximum") || msg.includes("too many requests");
}

export function useChat() {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [connectionReady, setConnectionReady] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const optimisticIdRef = useRef<string | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/hubs/messages`, {
        accessTokenFactory: () => getAccessToken() ?? "",
      })
      .configureLogging(signalR.LogLevel.None)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.on("ReceiveChunk", (chunk: string) => {
      setStreamingText((prev) => (prev ?? "") + chunk);
    });

    connection.on("ChatCompleted", (dto: MessageDto) => {
      setMessages((prev) => {
        const without = optimisticIdRef.current
          ? prev.filter((m) => m.id !== optimisticIdRef.current)
          : prev;
        return [...without, dto];
      });
      setStreamingText(null);
      setSending(false);
      optimisticIdRef.current = null;
    });

    connection.onreconnected(() => setConnectionReady(true));

    connection.onclose(() => {
      setConnectionReady(false);
      setSending(false);
      setStreamingText(null);
      optimisticIdRef.current = null;
    });

    connection.start()
      .then(() => {
        if (connectionRef.current === connection) setConnectionReady(true);
      })
      .catch((err) => {
        if (connectionRef.current === connection) {
          console.warn("SignalR connection failed:", err);
        }
      });

    return () => {
      if (connectionRef.current === connection) {
        connectionRef.current = null;
      }
      connection.stop().catch(() => {});
    };
  }, []);

  const load = useCallback(async (conversationId: string) => {
    setLoading(true);
    setMessages([]);
    setQuotaExceeded(false);
    try {
      const data = await getMessages(conversationId);
      setMessages(
        data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const send = useCallback(async (conversationId: string, content: string) => {
    let conn = connectionRef.current;
    if (!conn) throw new Error("SignalR not initialized");

    if (conn.state === signalR.HubConnectionState.Disconnected) {
      await conn.start();
    }

    if (conn.state !== signalR.HubConnectionState.Connected) {
      throw new Error("Connection is not ready, please try again.");
    }

    const optimisticId = crypto.randomUUID();
    optimisticIdRef.current = optimisticId;

    const optimisticUser: MessageDto = {
      id: optimisticId,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticUser]);
    setSending(true);
    setStreamingText(null);

    try {
      await conn.invoke("SendMessage", conversationId, content);
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setSending(false);
      setStreamingText(null);
      optimisticIdRef.current = null;
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
        return;
      }
      throw err;
    }
  }, []);

  return { messages, loading, sending, streamingText, quotaExceeded, connectionReady, load, send };
}