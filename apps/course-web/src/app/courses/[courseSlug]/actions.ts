"use server";

import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { completeFounderFreeClaimForUser } from "@/server/entitlements/founder-free-claim-service";

export async function claimFounderFreeAccess(courseSlug: string) {
  const session = await auth();

  if (!session?.user?.id) {
    await signIn("google", { redirectTo: `/courses/${courseSlug}/claim` });
    return;
  }

  const redirectTo = await completeFounderFreeClaimForUser(session.user.id, courseSlug);
  redirect(redirectTo);
}
