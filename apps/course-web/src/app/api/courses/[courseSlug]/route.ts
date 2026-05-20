import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCourseBySlug } from "@/server/courses/course-repository";
import type { CourseRecord } from "@/server/courses/types";
import { getCourseEntitlement, hasMinimumAccess } from "@/server/entitlements/course-entitlement-repository";
import { isValidSlug, jsonError } from "@/server/api/responses";

function toPublicCourse(course: CourseRecord) {
  return {
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    status: course.status,
    version: course.version,
    stats: course.stats,
    modules: course.modules.map((module) => ({
      id: module.id,
      slug: module.slug,
      title: module.title,
      purpose: module.purpose,
      outcome: module.outcome,
      status: module.status,
      lectureCount: module.lectures.length,
      lectures: module.lectures.map((lecture) => ({
        id: lecture.id,
        title: lecture.title,
        kind: lecture.kind
      }))
    }))
  };
}

export async function GET(_request: Request, { params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;

  if (!isValidSlug(courseSlug)) {
    return jsonError("Invalid course slug", 400);
  }

  try {
    const course = await getCourseBySlug(courseSlug);

    if (!course) {
      return jsonError("Course not found", 404);
    }

    const session = await auth();
    const userId = session?.user?.id;

    if (userId) {
      const entitlement = await getCourseEntitlement(userId, courseSlug);

      if (hasMinimumAccess(entitlement, "free")) {
        return NextResponse.json({ course });
      }
    }

    return NextResponse.json({ course: toPublicCourse(course) });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load course", 500);
  }
}
