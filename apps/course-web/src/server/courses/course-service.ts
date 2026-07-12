import { parseMarkdown, readCourseMarkdown, slugify, type MarkdownBlock } from "@/lib/content";
import { AI_ENGINEER_GUIDE_SLUG, buildAiEngineerGuideCourse } from "@/server/courses/seed-course";
import type { CourseLectureRecord, CourseModuleRecord, CourseRecord } from "@/server/courses/types";

// The study workspace always reads course content from the repository source files.
// MongoDB stores learner state and catalog metadata; it must never decide what a
// module or lecture contains, otherwise a stale seed silently shadows local content.
export async function getCourseForStudy(courseSlug: string): Promise<CourseRecord | null> {
  if (courseSlug !== AI_ENGINEER_GUIDE_SLUG) {
    return null;
  }

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

export type ModuleLectureSection = {
  lecture: CourseLectureRecord;
  anchor: string;
  blocks: MarkdownBlock[];
};

export type ModuleSections = {
  intro: MarkdownBlock[];
  lectures: ModuleLectureSection[];
  tail: MarkdownBlock[];
};

// Splits a module's markdown into the intro (purpose, outcomes), one section per
// lecture (a `## X.Y` heading up to the next lecture heading), and the module tail
// (revision questions, answer key, interview questions, source links).
export function getModuleSections(module: CourseModuleRecord): ModuleSections {
  const blocks = getModuleBlocks(module);
  const markers = module.lectures
    .map((lecture) => ({
      lecture,
      index: blocks.findIndex((block) => block.type === "heading" && block.text.toLowerCase().startsWith(`${lecture.id} `))
    }))
    .filter((marker) => marker.index !== -1)
    .sort((a, b) => a.index - b.index);

  if (!markers.length) {
    return { intro: blocks, lectures: [], tail: [] };
  }

  const lastMarker = markers[markers.length - 1];
  let tailStart = blocks.length;
  for (let index = lastMarker.index + 1; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.type === "heading" && block.level <= 2) {
      tailStart = index;
      break;
    }
  }

  const lectures = markers.map((marker, order) => {
    const heading = blocks[marker.index];
    const end = order + 1 < markers.length ? markers[order + 1].index : tailStart;

    return {
      lecture: marker.lecture,
      anchor: heading.type === "heading" ? heading.id : slugify(`${marker.lecture.id} ${marker.lecture.title}`),
      blocks: blocks.slice(marker.index, end)
    };
  });

  return {
    intro: blocks.slice(0, markers[0].index),
    lectures,
    tail: blocks.slice(tailStart)
  };
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
