import { allModules, type CourseModule } from "@/lib/course-data";
import { parseMarkdown, readCourseMarkdown } from "@/lib/content";

let hydratedModulesCache: CourseModule[] | null = null;

export function getHydratedModules(): CourseModule[] {
  if (!hydratedModulesCache) {
    hydratedModulesCache = allModules.map((module) => hydrateModule(module));
  }

  return hydratedModulesCache;
}

export function getHydratedModule(slug: string) {
  return getHydratedModules().find((module) => module.slug === slug);
}

function hydrateModule(module: CourseModule): CourseModule {
  const markdown = readCourseMarkdown(module.sourceFile);
  const blocks = parseMarkdown(markdown);
  const lectureHeadings = blocks
    .filter((block) => block.type === "heading")
    .filter((block) => new RegExp(`^${module.id}\\.\\d+\\s+`).test(block.text));

  if (!lectureHeadings.length) {
    return module;
  }

  const lectures = lectureHeadings.map((heading) => {
    if (heading.type !== "heading") {
      throw new Error("Unexpected non-heading block");
    }

    const [id, ...titleParts] = heading.text.split(" ");
    return {
      id,
      title: titleParts.join(" ")
    };
  });

  const isExpanded = markdown.length > 3000 && markdown.includes("## Learning Outcomes");

  return {
    ...module,
    status: isExpanded ? "complete" : module.status,
    lectures
  };
}
