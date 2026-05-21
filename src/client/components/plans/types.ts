export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isCurrent: boolean;
  buttonText: string;
  buttonVariant: "accent" | "glass" | "ghost";
}