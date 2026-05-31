"use server";

import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { FOUNDER_FREE_CAMPAIGN, getFounderFreeExpiryDate, getFounderFreeMaxRedemptions } from "@/lib/founder-free";
import { countActiveCampaignRedemptions, getCourseEntitlement, grantFounderFreeEntitlement } from "@/server/entitlements/course-entitlement-repository";

export async function claimFounderFreeAccess(courseSlug: string) {
  const session = await auth();

  if (!session?.user?.id) {
    await signIn("google", { redirectTo: `/courses/${courseSlug}?claim=founder-free` });
    return;
  }

  const existing = await getCourseEntitlement(session.user.id, courseSlug);

  if (existing) {
    redirect("/my-learning");
  }

  if (courseSlug !== FOUNDER_FREE_CAMPAIGN.courseSlug) {
    redirect(`/courses/${courseSlug}?claim=unavailable`);
  }

  const redeemedCount = await countActiveCampaignRedemptions(FOUNDER_FREE_CAMPAIGN.id);

  if (redeemedCount >= getFounderFreeMaxRedemptions()) {
    redirect(`/courses/${courseSlug}?claim=full`);
  }

  const startsAt = new Date();
  const expiresAt = getFounderFreeExpiryDate(startsAt);

  await grantFounderFreeEntitlement({
    userId: session.user.id,
    courseSlug,
    campaignId: FOUNDER_FREE_CAMPAIGN.id,
    startsAt,
    expiresAt
  });

  redirect("/my-learning?claim=success");
}
