"use client";

import { motion } from "framer-motion";

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

export function PricingHeader({ title, subtitle }: PricingHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 text-center max-w-3xl mx-auto"
    >
      <h1 className="text-4xl font-display font-medium text-[var(--text)] mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-base text-[var(--text-secondary)] leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}