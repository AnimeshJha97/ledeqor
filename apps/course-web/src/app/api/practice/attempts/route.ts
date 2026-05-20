import { NextResponse } from "next/server";
import { isValidSlug, jsonError } from "@/server/api/responses";
import { upsertPracticeAttempt } from "@/server/practice/practice-repository";

const DEFAULT_LEARNER_ID = "local-learner";

export async function POST(request: Request) {
  let body: {
    courseSlug?: string;
    moduleSlug?: string;
    learnerId?: string;
    prompt?: string;
    answer?: string;
    kind?: "short_answer" | "interview";
  };

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const courseSlug = body.courseSlug ?? "ai-engineer-guide";
  const learnerId = body.learnerId ?? DEFAULT_LEARNER_ID;

  if (!isValidSlug(courseSlug) || !body.moduleSlug || !isValidSlug(body.moduleSlug)) {
    return jsonError("Invalid course or module slug", 400);
  }

  if (!body.prompt || body.prompt.trim().length < 5) {
    return jsonError("Prompt is required", 400);
  }

  if (!body.answer || body.answer.trim().length < 5) {
    return jsonError("Answer is required", 400);
  }

  const attempt = await upsertPracticeAttempt({
    courseSlug,
    moduleSlug: body.moduleSlug,
    learnerId,
    prompt: body.prompt,
    answer: body.answer,
    kind: body.kind ?? "short_answer"
  });

  return NextResponse.json({ attempt });
}
