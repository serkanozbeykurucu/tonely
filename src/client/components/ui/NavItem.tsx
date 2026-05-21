"use client";

import type { ReactNode } from "react";
import Link from "next/link";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  trailing?: ReactNode;
  active?: boolean;
  className?: string;
  href?: string;
}

export function NavItem({
  icon,
  label,
  onClick,
  trailing,
  active = false,
  className = "",
  href,
}: NavItemProps) {
  const baseClasses = `group flex items-center justify-between w-full px-3 py-2.5 rounded-[var(--radius-md)] text-[13px] font-medium transition-all duration-200 ${
    active
      ? "nav-active shadow-sm"
      : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]"
  } ${className}`;

  const content = (
    <>
      <span className="flex items-center gap-3">
        <span className={`shrink-0 transition-colors ${active ? "text-[var(--accent)]" : "group-hover:text-[var(--text)]"}`}>
          {icon}
        </span>
        {label}
      </span>
      {trailing}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
}