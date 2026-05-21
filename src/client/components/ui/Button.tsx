"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "accent" | "ghost" | "danger" | "glass";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  accent: "btn-accent rounded-full",
  ghost: "btn-ghost",
  danger:
    "text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-[var(--radius-md)]",
  glass: "glass hover:bg-[rgba(255,255,255,0.1)] rounded-[var(--radius-md)] transition-all",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-14 px-8 text-base gap-3 rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "accent",
      size = "md",
      loading,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";