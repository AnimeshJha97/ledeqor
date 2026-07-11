import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { completeFounderFreeClaimForUser } from "@/server/entitlements/founder-free-claim-service";

export const dynamic = "force-dynamic";

export default async function ClaimFounderFreePage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  const session = await auth();
  const claimPath = `/courses/${courseSlug}/claim`;

  if (!session?.user?.id) {
    redirect(`/sign-in?next=${encodeURIComponent(claimPath)}`);
  }

  const redirectTo = await completeFounderFreeClaimForUser(session.user.id, courseSlug);
  redirect(redirectTo);
}
