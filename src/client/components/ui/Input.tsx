"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, ReactNode } from "react";

const inputBase =
  "w-full rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] text-sm transition-all duration-200 focus:outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_1px_var(--accent-glow)] focus:bg-[rgba(30,30,34,0.7)]";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[13px] font-semibold text-[var(--text-secondary)] tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`${inputBase} h-12 ${icon ? 'pl-10' : 'px-4'} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
  ),
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[13px] font-semibold text-[var(--text-secondary)] tracking-wide uppercase">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`${inputBase} px-4 py-3 resize-y min-h-[100px] ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
  ),
);

Textarea.displayName = "Textarea";