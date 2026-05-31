export const FOUNDER_FREE_CAMPAIGN = {
  id: "founder-free-access",
  name: "Founder Free Access",
  courseSlug: "ai-engineer-guide",
  accessLevel: "pro" as const,
  discountPercentage: 100,
  durationDays: 30,
  defaultMaxRedemptions: 25
};

export function getFounderFreeMaxRedemptions() {
  const configured = Number(process.env.FOUNDER_FREE_MAX_REDEMPTIONS);

  if (Number.isInteger(configured) && configured > 0) {
    return configured;
  }

  return FOUNDER_FREE_CAMPAIGN.defaultMaxRedemptions;
}

export function getFounderFreeExpiryDate(startDate: Date) {
  const expiry = new Date(startDate);
  expiry.setDate(expiry.getDate() + FOUNDER_FREE_CAMPAIGN.durationDays);
  return expiry;
}
