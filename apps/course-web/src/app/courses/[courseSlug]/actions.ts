"use server";

import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { grantFreeCourseEntitlement } from "@/server/entitlements/course-entitlement-repository";

export async function enrollInCourse(courseSlug: string) {
  const session = await auth();

  if (!session?.user?.id) {
    await signIn("google", { redirectTo: `/courses/${courseSlug}` });
    return;
  }

  await grantFreeCourseEntitlement(session.user.id, courseSlug);
  redirect(`/courses/${courseSlug}/modules`);
}
