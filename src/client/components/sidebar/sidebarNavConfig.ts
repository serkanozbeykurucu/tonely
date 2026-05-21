import type { ComponentType } from "react";
import {
  CreditCard,
  Settings,
  HelpCircle
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";

export type FooterNavId = "plans" | "settings" | "help";

export interface FooterNavEntry {
  id: FooterNavId;
  label: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  href?: string;
}

export function getFooterNavItems(t: Dictionary): FooterNavEntry[] {
  const entries: { id: FooterNavId; label: string; Icon: FooterNavEntry["Icon"]; href?: string }[] = [
    { id: "plans", label: t.sidebar.plans, Icon: CreditCard, href: "/plans" },
    { id: "settings", label: t.sidebar.settings, Icon: Settings, href: "/settings" },
    { id: "help", label: t.sidebar.help, Icon: HelpCircle, href: "/help" },
  ];
  return entries;
}