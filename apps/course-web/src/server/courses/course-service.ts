import { getHydratedModules } from "@/lib/course-content";
import { parseMarkdown, readCourseMarkdown, slugify } from "@/lib/content";
import { AI_ENGINEER_GUIDE_SLUG, buildAiEngineerGuideCourse } from "@/server/courses/seed-course";
import type { CourseModuleRecord, CourseRecord } from "@/server/courses/types";

export async function getCourseForStudy(courseSlug: string): Promise<CourseRecord | null> {
  if (courseSlug !== AI_ENGINEER_GUIDE_SLUG) {
    return null;
  }

  // Course content is versioned with the app. MongoDB stores learner-specific
  // state, but study routes should not depend on a previously seeded course
  // document that may be stale after a content deploy.
  return buildAiEngineerGuideCourse();
}

export async function getCourseModuleForStudy(courseSlug: string, moduleSlug: string) {
  const course = await getCourseForStudy(courseSlug);

  if (!course) {
    return null;
  }

  const module = course.modules.find((item) => item.slug === moduleSlug);

  if (!module) {
    return null;
  }

  return { course, module };
}

export function getModuleBlocks(module: CourseModuleRecord) {
  return parseMarkdown(module.markdown || readCourseMarkdown(module.sourceFile));
}

export function getLectureBlocks(module: CourseModuleRecord, lectureId: string) {
  const blocks = getModuleBlocks(module);
  const startIndex = blocks.findIndex((block) => block.type === "heading" && block.text.toLowerCase().startsWith(`${lectureId} `));

  if (startIndex === -1) {
    return [];
  }

  const endIndex = blocks.findIndex((block, index) => index > startIndex && block.type === "heading" && block.level === 2 && /^\d+\.\d+\s+/.test(block.text));
  return blocks.slice(startIndex, endIndex === -1 ? blocks.length : endIndex);
}

export function getLectureAnchor(module: CourseModuleRecord, lectureId: string) {
  const lecture = module.lectures.find((item) => item.id === lectureId);
  return lecture?.anchor ?? slugify(`${lectureId} ${lecture?.title ?? ""}`);
}

export function getNextLecture(course: CourseRecord, progressLectureKeys: Set<string>) {
  for (const module of course.modules) {
    for (const lecture of module.lectures) {
      const key = `${module.slug}:${lecture.id}`;
      if (!progressLectureKeys.has(key)) {
        return { module, lecture };
      }
    }
  }

  return null;
}

export function getModuleProgress(module: CourseModuleRecord, progressLectureKeys: Set<string>) {
  const completed = module.lectures.filter((lecture) => progressLectureKeys.has(`${module.slug}:${lecture.id}`)).length;
  return {
    completed,
    pending: Math.max(module.lectures.length - completed, 0),
    total: module.lectures.length,
    percent: module.lectures.length ? Math.round((completed / module.lectures.length) * 100) : 0
  };
}
