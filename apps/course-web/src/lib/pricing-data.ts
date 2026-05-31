export type PricingPlan = {
  id: "pro" | "career";
  name: string;
  amountInr: number;
  billingPeriod: "month";
  subtitle: string;
  cta: string;
  href: string;
  highlighted?: boolean;
  features: string[];
};

export type OfferCampaign = {
  id: string;
  name: string;
  planIds: PricingPlan["id"][];
  discountPercentage: number;
  status: "active" | "scheduled" | "expired" | "paused";
  label: string;
  startsAt: string;
  endsAt?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "pro",
    name: "Pro",
    amountInr: 499,
    billingPeriod: "month",
    subtitle: "For developers actively building portfolio projects.",
    cta: "Claim Founder Free Access",
    href: "/sign-in",
    highlighted: true,
    features: [
      "Full access to all current courses",
      "Course progress synced to your account",
      "Capstone build trackers",
      "Interview answer practice with AI review limits",
      "Downloadable checklists and templates",
      "Future course updates included"
    ]
  },
  {
    id: "career",
    name: "Career",
    amountInr: 799,
    billingPeriod: "month",
    subtitle: "For learners preparing for interviews and job switch.",
    cta: "Choose Career",
    href: "/sign-in",
    features: [
      "Everything in Pro",
      "Expanded mock interview practice limits",
      "Resume and LinkedIn review workflows",
      "Portfolio case study builder",
      "Weekly job strategy tracker",
      "Priority access to new career modules"
    ]
  }
];

export const offerCampaigns: OfferCampaign[] = [
  {
    id: "early-bird-pro-free",
    name: "Early Bird Pro Launch",
    planIds: ["pro"],
    discountPercentage: 100,
    status: "active",
    label: "Early bird: free right now",
    startsAt: "2026-05-24"
  }
];

export function getActiveCampaignForPlan(planId: PricingPlan["id"]) {
  return offerCampaigns.find((campaign) => campaign.status === "active" && campaign.planIds.includes(planId));
}

export function getDiscountedAmount(plan: PricingPlan, campaign?: OfferCampaign) {
  if (!campaign) {
    return plan.amountInr;
  }

  return Math.max(0, Math.round(plan.amountInr * (1 - campaign.discountPercentage / 100)));
}

export function formatInr(amount: number) {
  if (amount === 0) {
    return "Free";
  }

  return `Rs. ${amount}`;
}
