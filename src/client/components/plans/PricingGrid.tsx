"use client";

import { PricingCard } from "./PricingCard";
import type { PricingPlan } from "./types";

interface PricingGridProps {
  plans: PricingPlan[];
  currentPlanBadgeText: string;
}

export function PricingGrid({ plans, currentPlanBadgeText }: PricingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full items-start">
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} currentPlanBadgeText={currentPlanBadgeText} />
      ))}
    </div>
  );
}