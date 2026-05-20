import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCourseEntitlement, hasMinimumAccess, type CourseAccessLevel } from "@/server/entitlements/course-entitlement-repository";

export type AuthenticatedUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
};

function getSessionUser(session: unknown): AuthenticatedUser | null {
  const user = (session as { user?: AuthenticatedUser } | null)?.user;

  if (!user?.id) {
    return null;
  }

  return user;
}

export async function requireAuth() {
  const session = await auth();
  const user = getSessionUser(session);

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

export async function requireCourseAccess(courseSlug: string, options: { minimumAccess?: CourseAccessLevel } = {}) {
  const minimumAccess = options.minimumAccess ?? "free";
  const user = await requireAuth();
  const entitlement = await getCourseEntitlement(user.id, courseSlug);

  if (!hasMinimumAccess(entitlement, minimumAccess)) {
    redirect(`/courses/${courseSlug}?access=required`);
  }

  return { user, entitlement };
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== "admin") {
    redirect("/");
  }

  return user;
}

export async function requireApiAuth() {
  const session = await auth();
  const user = getSessionUser(session);

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    };
  }

  return { ok: true as const, user };
}

export async function requireApiCourseAccess(courseSlug: string, options: { minimumAccess?: CourseAccessLevel } = {}) {
  const authResult = await requireApiAuth();

  if (!authResult.ok) {
    return authResult;
  }

  const minimumAccess = options.minimumAccess ?? "free";
  const entitlement = await getCourseEntitlement(authResult.user.id, courseSlug);

  if (!hasMinimumAccess(entitlement, minimumAccess)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Course access required" }, { status: 403 })
    };
  }

  return {
    ok: true as const,
    user: authResult.user,
    entitlement
  };
}
