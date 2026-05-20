import { NextResponse } from "next/server";
import { isValidSlug, jsonError } from "@/server/api/responses";
import { getProgress, updateLectureProgress, updateQuizScore, updateSelfRating } from "@/server/progress/progress-repository";

const DEFAULT_LEARNER_ID = "local-learner";
const validStatuses = new Set(["not_started", "reading", "done", "needs_revision"]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const courseSlug = url.searchParams.get("courseSlug") ?? "ai-engineer-guide";
  const learnerId = url.searchParams.get("learnerId") ?? DEFAULT_LEARNER_ID;

  if (!isValidSlug(courseSlug)) {
    return jsonError("Invalid course slug", 400);
  }

  try {
    const progress = await getProgress(courseSlug, learnerId);
    return NextResponse.json({ progress });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load progress", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      courseSlug?: string;
      learnerId?: string;
      moduleSlug?: string;
      lectureId?: string;
      status?: string;
      action?: "lecture" | "quiz" | "self_rating";
      score?: number;
      total?: number;
      rating?: number;
    };

    const courseSlug = body.courseSlug ?? "ai-engineer-guide";
    const learnerId = body.learnerId ?? DEFAULT_LEARNER_ID;

    const action = body.action ?? "lecture";

    if (!isValidSlug(courseSlug) || !body.moduleSlug || !isValidSlug(body.moduleSlug)) {
      return jsonError("Invalid course or module slug", 400);
    }

    if (action === "quiz") {
      if (typeof body.score !== "number" || typeof body.total !== "number" || body.score < 0 || body.total < 1 || body.score > body.total) {
        return jsonError("Invalid quiz score", 400);
      }

      const progress = await updateQuizScore(courseSlug, learnerId, {
        moduleSlug: body.moduleSlug,
        score: body.score,
        total: body.total
      });

      return NextResponse.json({ progress });
    }

    if (!body.lectureId || !/^\d+\.\d+$/.test(body.lectureId)) {
      return jsonError("Invalid lecture id", 400);
    }

    if (action === "self_rating") {
      if (![1, 2, 3, 4, 5].includes(body.rating ?? 0)) {
        return jsonError("Invalid self rating", 400);
      }

      const progress = await updateSelfRating(courseSlug, learnerId, {
        moduleSlug: body.moduleSlug,
        lectureId: body.lectureId,
        rating: body.rating as 1 | 2 | 3 | 4 | 5
      });

      return NextResponse.json({ progress });
    }

    if (!body.status || !validStatuses.has(body.status)) {
      return jsonError("Invalid progress status", 400);
    }

    const progress = await updateLectureProgress(courseSlug, learnerId, {
      moduleSlug: body.moduleSlug,
      lectureId: body.lectureId,
      status: body.status as "not_started" | "reading" | "done" | "needs_revision"
    });

    return NextResponse.json({ progress });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to update progress", 500);
  }
}
