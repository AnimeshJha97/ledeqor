import { NextResponse } from "next/server";
import { jsonError } from "@/server/api/responses";
import { isValidSlug } from "@/server/api/responses";
import { requireApiCourseAccess } from "@/server/auth/access-control";

type AnalyzeRequest = {
  question?: string;
  answer?: string;
  courseSlug?: string;
  moduleSlug?: string;
};

export async function POST(request: Request) {
  const provider = process.env.AI_PROVIDER ?? "openai";
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-nano";

  if (!apiKey) {
    return jsonError("OpenAI API key is not configured", 500);
  }

  if (provider !== "openai") {
    return jsonError("Configured AI provider is not supported for interview practice", 400);
  }

  let body: AnalyzeRequest;

  try {
    body = (await request.json()) as AnalyzeRequest;
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  if (!body.question || body.question.trim().length < 10) {
    return jsonError("Question is required", 400);
  }

  if (!body.answer || body.answer.trim().length < 20) {
    return jsonError("Answer must be at least 20 characters", 400);
  }

  if (body.answer.length > 4000) {
    return jsonError("Answer is too long for one-at-a-time practice", 400);
  }

  const courseSlug = body.courseSlug ?? "ai-engineer-guide";

  if (!isValidSlug(courseSlug)) {
    return jsonError("Invalid course slug", 400);
  }

  const access = await requireApiCourseAccess(courseSlug);

  if (!access.ok) {
    return access.response;
  }

  const prompt = `
You are an AI engineering interview coach.

Evaluate the candidate's answer for one interview question.

Rules:
- Be direct and practical.
- Do not rewrite the entire answer.
- Score from 1 to 10.
- Return valid JSON only.
- Keep feedback concise.

Context:
Course: ${courseSlug}
Module: ${body.moduleSlug ?? "unknown"}

Question:
${body.question}

Candidate answer:
${body.answer}

Return JSON with this shape:
{
  "score": number,
  "strengths": string[],
  "gaps": string[],
  "improved_answer_outline": string[],
  "next_practice_tip": string
}
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 900,
      text: {
        format: {
          type: "json_schema",
          name: "interview_answer_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              score: { type: "number", minimum: 1, maximum: 10 },
              strengths: {
                type: "array",
                items: { type: "string" }
              },
              gaps: {
                type: "array",
                items: { type: "string" }
              },
              improved_answer_outline: {
                type: "array",
                items: { type: "string" }
              },
              next_practice_tip: { type: "string" }
            },
            required: ["score", "strengths", "gaps", "improved_answer_outline", "next_practice_tip"]
          }
        }
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return jsonError(`OpenAI request failed: ${errorText}`, 502);
  }

  const payload = await response.json() as {
    output_text?: string;
    output?: {
      content?: {
        text?: string;
      }[];
    }[];
  };
  const text = payload.output_text ?? payload.output?.flatMap((item) => item.content ?? []).find((item) => item.text)?.text;

  if (!text) {
    return jsonError("OpenAI returned an empty response", 502);
  }

  try {
    return NextResponse.json({ analysis: JSON.parse(text) });
  } catch {
    return NextResponse.json({ analysis: { raw: text } });
  }
}
