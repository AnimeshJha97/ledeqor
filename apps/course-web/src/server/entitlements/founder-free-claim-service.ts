import { FOUNDER_FREE_CAMPAIGN, getFounderFreeExpiryDate, getFounderFreeMaxRedemptions } from "@/lib/founder-free";
import {
  countActiveCampaignRedemptions,
  getCourseEntitlement,
  grantFounderFreeEntitlement,
  hasMinimumAccess
} from "@/server/entitlements/course-entitlement-repository";

export async function completeFounderFreeClaimForUser(userId: string, courseSlug: string) {
  if (courseSlug !== FOUNDER_FREE_CAMPAIGN.courseSlug) {
    return `/courses/${courseSlug}?claim=unavailable`;
  }

  const existing = await getCourseEntitlement(userId, courseSlug);

  if (hasMinimumAccess(existing, "pro")) {
    return "/my-learning";
  }

  const redeemedCount = await countActiveCampaignRedemptions(FOUNDER_FREE_CAMPAIGN.id);

  if (redeemedCount >= getFounderFreeMaxRedemptions()) {
    return `/courses/${courseSlug}?claim=full`;
  }

  const startsAt = new Date();
  const expiresAt = getFounderFreeExpiryDate(startsAt);

  await grantFounderFreeEntitlement({
    userId,
    courseSlug,
    campaignId: FOUNDER_FREE_CAMPAIGN.id,
    startsAt,
    expiresAt
  });

  return "/my-learning?claim=success";
}
