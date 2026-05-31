import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookMarked, Code2, FileQuestion, ListChecks } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MarkdownContent } from "@/components/markdown-content";
import { ModuleDashboard } from "@/components/module-dashboard";
import { ProgressToggle } from "@/components/progress-toggle";
import { StatusBadge } from "@/components/status-badge";
import { allModules } from "@/lib/course-data";
import { parseMarkdown, readLabMarkdown, slugify } from "@/lib/content";
import { requireCourseAccess } from "@/server/auth/access-control";
import { getCourseModuleForStudy, getModuleBlocks, getModuleProgress } from "@/server/courses/course-service";
import { getProgress } from "@/server/progress/progress-repository";

const supportedCourseSlug = "ai-engineer-guide";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return allModules.map((module) => ({ courseSlug: supportedCourseSlug, moduleSlug: module.slug }));
}

export default async function CourseModuleDetailPage({ params }: { params: Promise<{ courseSlug: string; moduleSlug: string }> }) {
  const { courseSlug, moduleSlug } = await params;

  if (courseSlug !== supportedCourseSlug) {
    notFound();
  }

  const { user } = await requireCourseAccess(courseSlug);
  const result = await getCourseModuleForStudy(courseSlug, moduleSlug);

  if (!result) {
    notFound();
  }

  const { module } = result;
  const progress = await getProgress(courseSlug, user.id);
  const completedLectureKeys = new Set(
    progress.lectures
      .filter((lecture) => lecture.status === "done")
      .map((lecture) => `${lecture.moduleSlug}:${lecture.lectureId}`)
  );
  const moduleProgress = getModuleProgress(module, completedLectureKeys);
  const blocks = getModuleBlocks(module);
  const labMarkdown = module.labSlug ? readLabMarkdown(module.labSlug) : null;
  const lectureAnchors = new Map(
    blocks
      .filter((block) => block.type === "heading")
      .flatMap((block) =>
        module.lectures
          .filter((lecture) => block.text.toLowerCase().startsWith(`${lecture.id} `))
          .map((lecture) => [lecture.id, block.id] as const)
      )
  );
  const moduleHref = `/courses/${courseSlug}/modules/${module.slug}`;
  const interviewHeading = blocks.find((block) => block.type === "heading" && block.text.toLowerCase() === "interview questions");
  const interviewAnchor = interviewHeading?.type === "heading" ? interviewHeading.id : undefined;

  return (
    <AppShell
      moduleLinks={{
        labHref: labMarkdown ? `${moduleHref}#module-lab` : "/labs",
        interviewHref: interviewAnchor ? `${moduleHref}#${interviewAnchor}` : "/interview"
      }}
    >
      <Link href={`/courses/${courseSlug}/modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-brand">
        <ArrowLeft size={18} /> Back to modules
      </Link>

      <div className="mt-5 rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-brand">Module {module.id}</p>
              <StatusBadge status={module.status} />
            </div>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{module.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{module.purpose}</p>
          </div>
          <ProgressToggle moduleSlug={`${courseSlug}:${module.slug}`} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <InfoTile icon={<BookMarked size={20} />} label="Lectures" value={module.lectures.length ? module.lectures.length.toString() : "Outline"} />
          <InfoTile icon={<ListChecks size={20} />} label="Outcome" value={module.status === "complete" ? "Ready" : "Draft"} />
          <InfoTile icon={<Code2 size={20} />} label="Lab" value={module.labSlug ? "Included" : "Planned"} />
          <InfoTile icon={<FileQuestion size={20} />} label="Quiz" value={module.status === "complete" ? "Included" : "Planned"} />
        </div>
      </div>

      {module.lectures.length ? (
        <details className="mt-6 rounded-md border border-line bg-surface p-4 shadow-sm xl:hidden">
          <summary className="cursor-pointer text-base font-semibold text-ink">Lectures in this module</summary>
          <div className="mt-4 grid gap-2">
            {module.lectures.map((lecture) => (
              <Link
                key={lecture.id}
                href={`/courses/${courseSlug}/modules/${module.slug}/lectures/${lecture.id}`}
                className="block min-h-12 rounded-md border border-line bg-panel px-3 py-3 text-sm leading-6 text-slate-300 transition hover:border-brand hover:bg-cyan-400/10"
              >
                <span className="font-semibold text-brand">{lecture.id}</span> {lecture.title}
              </Link>
            ))}
          </div>
        </details>
      ) : null}

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden h-fit rounded-md border border-line bg-surface p-5 shadow-sm xl:sticky xl:top-6 xl:block">
          <h3 className="font-semibold text-ink">Lecture Map</h3>
          <div className="mt-4 grid gap-2">
            {module.lectures.length ? (
              module.lectures.map((lecture) => (
                <Link key={lecture.id} href={`/courses/${courseSlug}/modules/${module.slug}/lectures/${lecture.id}`} className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 transition hover:border-brand hover:bg-cyan-400/10">
                  <span className="font-semibold text-brand">{lecture.id}</span> {lecture.title}
                </Link>
              ))
            ) : (
              <p className="text-sm leading-6 text-muted">This module has its outline ready. Full lecture expansion will be added in sequence.</p>
            )}
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <ModuleDashboard
            courseSlug={courseSlug}
            module={module}
            completed={moduleProgress.completed}
            pending={moduleProgress.pending}
            percent={moduleProgress.percent}
            progress={progress}
          />

          <section className="min-w-0 overflow-hidden rounded-md border border-line bg-surface p-6 shadow-sm sm:p-8">
            <MarkdownContent blocks={blocks} />
          </section>

          {labMarkdown ? (
            <section id="module-lab" className="min-w-0 scroll-mt-24 overflow-hidden rounded-md border border-line bg-surface p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Lab</p>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">{module.labSlug}</h3>
                </div>
              </div>
              <MarkdownContent blocks={parseMarkdown(labMarkdown)} />
            </section>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-panel p-4">
      <div className="flex items-center gap-2 text-brand">{icon}<span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</span></div>
      <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
