import { NextResponse } from "next/server";
import { listCourses } from "@/server/courses/course-repository";
import { jsonError } from "@/server/api/responses";

export async function GET() {
  try {
    const courses = await listCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to list courses", 500);
  }
}
