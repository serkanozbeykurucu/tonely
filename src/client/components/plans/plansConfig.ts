import type { Dictionary } from "@/lib/i18n/types";
import type { PricingPlan } from "./types";

export function getPricingPlans(t: Dictionary, currentPlanId: string = "free"): PricingPlan[] {
  return [
    {
      id: "free",
      name: t.plans.free.name,
      price: t.plans.free.price,
      period: t.plans.free.period,
      description: t.plans.free.description,
      features: t.plans.free.features,
      isCurrent: currentPlanId === "free",
      buttonText: t.plans.free.buttonText,
      buttonVariant: "accent"
    }
  ];
}