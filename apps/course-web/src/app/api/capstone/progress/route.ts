import { NextResponse } from "next/server";
import { requireApiCourseAccess } from "@/server/auth/access-control";
import { getCapstoneProgress, updateCapstoneChecklistItem } from "@/server/capstone/capstone-progress-repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseSlug = searchParams.get("courseSlug");

  if (!courseSlug) {
    return NextResponse.json({ error: "courseSlug is required" }, { status: 400 });
  }

  const access = await requireApiCourseAccess(courseSlug);

  if (!access.ok) {
    return access.response;
  }

  const progress = await getCapstoneProgress(courseSlug, access.user.id);

  return NextResponse.json({ progress });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.courseSlug || !body?.phaseId || !body?.itemId || typeof body.completed !== "boolean") {
    return NextResponse.json({ error: "courseSlug, phaseId, itemId, and completed are required" }, { status: 400 });
  }

  const access = await requireApiCourseAccess(body.courseSlug);

  if (!access.ok) {
    return access.response;
  }

  const progress = await updateCapstoneChecklistItem({
    courseSlug: body.courseSlug,
    learnerId: access.user.id,
    phaseId: body.phaseId,
    itemId: body.itemId,
    completed: body.completed
  });

  return NextResponse.json({ progress });
}
