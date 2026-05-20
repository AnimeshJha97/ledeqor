import { NextResponse } from "next/server";
import { listCourses } from "@/server/courses/course-repository";
import { jsonError } from "@/server/api/responses";
import type { CourseRecord } from "@/server/courses/types";

function toPublicCourseSummary(course: CourseRecord) {
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
      lectureCount: module.lectures.length
    }))
  };
}

export async function GET() {
  try {
    const courses = (await listCourses()).map(toPublicCourseSummary);
    return NextResponse.json({ courses });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to list courses", 500);
  }
}
