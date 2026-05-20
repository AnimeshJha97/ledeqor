import { NextResponse } from "next/server";
import { seedAiEngineerGuideCourse } from "@/server/courses/seed-course";
import { jsonError } from "@/server/api/responses";

export async function POST(request: Request) {
  const seedSecret = process.env.COURSE_SEED_SECRET;

  if (seedSecret) {
    const providedSecret = request.headers.get("x-seed-secret");
    if (providedSecret !== seedSecret) {
      return jsonError("Invalid seed secret", 401);
    }
  }

  try {
    const course = await seedAiEngineerGuideCourse();
    return NextResponse.json({ course });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to seed course", 500);
  }
}
