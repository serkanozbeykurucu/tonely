"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PricingPlan } from "./types";

interface PricingCardProps {
  plan: PricingPlan;
  currentPlanBadgeText: string;
}

export function PricingCard({ plan, currentPlanBadgeText }: PricingCardProps) {
  const {
    name,
    price,
    period,
    description,
    features,
    isCurrent,
    buttonText,
    buttonVariant,
  } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative flex flex-col justify-between p-8 rounded-[var(--radius-xl)] glass overflow-hidden transition-all duration-300 ${
        isCurrent ? "border-[var(--border-accent)] bg-gradient-to-b from-[rgba(226,184,131,0.05)] to-transparent" : ""
      }`}
    >
      {isCurrent && (
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent blur-[30px]" />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[var(--text)] flex items-center gap-2">
            {name}
            {isCurrent && <Sparkles size={16} className="text-[var(--accent)]" />}
          </h3>
          {isCurrent && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--border-accent)]">
              {currentPlanBadgeText}
            </span>
          )}
        </div>

        <p className="text-sm text-[var(--text-secondary)] min-h-[40px] leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-4xl font-display font-medium text-[var(--text)]">{price}</span>
          <span className="text-sm text-[var(--text-muted)]">/ {period}</span>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <Check size={12} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={buttonVariant}
        size="lg"
        disabled={isCurrent}
        className="w-full justify-center select-none active:scale-[0.98]"
      >
        {buttonText}
      </Button>
    </motion.div>
  );
}