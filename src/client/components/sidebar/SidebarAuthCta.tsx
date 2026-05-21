"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";

export function SidebarAuthCta() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="mt-3 p-3.5 rounded-[var(--radius-md)] bg-[var(--accent-muted)] border border-[var(--border-accent)]">
      <h3 className="text-[13px] font-semibold text-[var(--text)] leading-snug mb-1">
        {t.sidebar.authCtaTitle}
      </h3>
      <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-3">
        {t.sidebar.authCtaBody}
      </p>
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="w-full py-2 text-[13px] font-semibold btn-accent rounded-full"
      >
        {t.auth.logIn}
      </button>
    </div>
  );
}