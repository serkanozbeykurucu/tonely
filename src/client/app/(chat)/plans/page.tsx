"use client";

import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { useSubscription } from "@/lib/hooks/useSubscription";
import { getPricingPlans } from "@/components/plans/plansConfig";
import { PricingHeader } from "@/components/plans/PricingHeader";
import { PricingGrid } from "@/components/plans/PricingGrid";

export default function PlansPage() {
  const { t } = useTranslation();
  const { planId, loading } = useSubscription();

  const plans = getPricingPlans(t, planId);

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-6 py-12 w-full max-w-6xl mx-auto relative z-10">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] opacity-15 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-glow)] to-transparent blur-[120px]" />
      </div>

      <PricingHeader title={t.plans.title} subtitle={t.plans.subtitle} />

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin text-[var(--accent)]" />
        </div>
      ) : (
        <PricingGrid plans={plans} currentPlanBadgeText={t.plans.free.currentPlanBadge} />
      )}
    </div>
  );
}