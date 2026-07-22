import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isValidSlug, jsonError } from "@/server/api/responses";
import { getCourseEntitlement, hasMinimumAccess } from "@/server/entitlements/course-entitlement-repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseSlug = searchParams.get("courseSlug") ?? "";

  if (!isValidSlug(courseSlug)) {
    return jsonError("Invalid course slug", 400);
  }

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({
      authenticated: false,
      hasProAccess: false
    });
  }

  const entitlement = await getCourseEntitlement(userId, courseSlug);

  return NextResponse.json({
    authenticated: true,
    hasProAccess: hasMinimumAccess(entitlement, "pro"),
    hasCourseAccess: hasMinimumAccess(entitlement, "free"),
    source: entitlement?.source ?? null,
    status: entitlement?.status ?? null
  });
}
