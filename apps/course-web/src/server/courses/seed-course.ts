import { allModules } from "@/lib/course-data";
import { getHydratedModules } from "@/lib/course-content";
import { parseMarkdown, readCourseMarkdown, slugify } from "@/lib/content";
import type { CourseRecord } from "@/server/courses/types";
import { upsertCourse } from "@/server/courses/course-repository";

export const AI_ENGINEER_GUIDE_SLUG = "ai-engineer-guide";

export function buildAiEngineerGuideCourse(): CourseRecord {
  const hydratedModules = getHydratedModules();
  const now = new Date();
  const modules = hydratedModules.map((module) => {
    const markdown = readCourseMarkdown(module.sourceFile);
    const blocks = parseMarkdown(markdown);
    const lectures = module.lectures.map((lecture) => {
      const heading = blocks.find((block) => block.type === "heading" && block.text.toLowerCase().startsWith(`${lecture.id} `));

      return {
        id: lecture.id,
        title: lecture.title,
        anchor: heading?.type === "heading" ? heading.id : slugify(`${lecture.id} ${lecture.title}`),
        kind: lecture.kind
      };
    });

    return {
      id: module.id,
      slug: module.slug,
      title: module.title,
      purpose: module.purpose,
      outcome: module.outcome,
      status: module.status,
      sourceFile: module.sourceFile,
      labSlug: module.labSlug,
      lectures,
      markdown
    };
  });

  return {
    slug: AI_ENGINEER_GUIDE_SLUG,
    title: "AI Engineer Guide",
    subtitle: "Applied AI engineering through Orvion DocIntel",
    description: "A full-stack learning path for moving from MERN experience into applied AI engineering with Python, FastAPI, LLMs, embeddings, RAG, workflows, evals, security, deployment, and career strategy.",
    status: "published",
    version: 1,
    modules,
    stats: {
      moduleCount: allModules.length,
      lectureCount: modules.reduce((total, module) => total + module.lectures.length, 0),
      completedModuleCount: modules.filter((module) => module.status === "complete").length
    },
    createdAt: now,
    updatedAt: now
  };
}

export async function seedAiEngineerGuideCourse() {
  return upsertCourse(buildAiEngineerGuideCourse());
}
