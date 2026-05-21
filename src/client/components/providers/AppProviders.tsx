"use client";

import { Toaster } from "sonner";
import { I18nProvider } from "@/lib/i18n";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#12141a",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#f0eeeb",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </I18nProvider>
  );
}