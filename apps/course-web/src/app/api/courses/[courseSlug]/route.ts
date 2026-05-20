import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/server/courses/course-repository";
import { isValidSlug, jsonError } from "@/server/api/responses";

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

    return NextResponse.json({ course });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load course", 500);
  }
}
