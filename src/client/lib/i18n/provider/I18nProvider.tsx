"use client";

import { useEffect } from "react";
import { useLocaleStore } from "../stores/localeStore";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useLocaleStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return children;
}