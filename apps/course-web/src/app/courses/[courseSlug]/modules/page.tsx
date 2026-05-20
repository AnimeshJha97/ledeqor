import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ContinueLearningCard } from "@/components/continue-learning-card";
import { StatusBadge } from "@/components/status-badge";
import { requireCourseAccess } from "@/server/auth/access-control";
import { getCourseForStudy, getModuleProgress, getNextLecture } from "@/server/courses/course-service";
import { getProgress } from "@/server/progress/progress-repository";

const supportedCourseSlug = "ai-engineer-guide";

export const dynamic = "force-dynamic";

export default async function CourseModulesPage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;

  if (courseSlug !== supportedCourseSlug) {
    notFound();
  }

  const { user } = await requireCourseAccess(courseSlug);
  const course = await getCourseForStudy(courseSlug);

  if (!course) {
    notFound();
  }

  const progress = await getProgress(courseSlug, user.id);
  const completedLectureKeys = new Set(
    progress.lectures
      .filter((lecture) => lecture.status === "done")
      .map((lecture) => `${lecture.moduleSlug}:${lecture.lectureId}`)
  );
  const next = getNextLecture(course, completedLectureKeys);

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">AI Engineer Guide</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Modules, sections, and lectures</h2>
          <p className="mt-2 max-w-2xl text-muted">Study the course through a scoped route so future courses can have their own modules, labs, progress, and projects.</p>
        </div>
      </div>

      <div className="mt-6">
        <ContinueLearningCard courseSlug={courseSlug} next={next} />
      </div>

      <div className="mt-6 grid gap-4">
        {course.modules.map((module) => {
          const moduleProgress = getModuleProgress(module, completedLectureKeys);

          return (
          <Link key={module.slug} href={`/courses/${courseSlug}/modules/${module.slug}`} className="group rounded-md border border-line bg-surface p-5 shadow-sm transition hover:border-brand hover:bg-panel hover:shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-brand">Module {module.id}</p>
                  <StatusBadge status={module.status} />
                  <span className="rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-semibold text-slate-300">
                    {module.lectures.length || "outline"} lectures
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-ink">{module.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{module.purpose}</p>
                <div className="mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-panel">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${moduleProgress.percent}%` }} />
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-400">
                  {moduleProgress.completed}/{moduleProgress.total} lectures done
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Open <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
