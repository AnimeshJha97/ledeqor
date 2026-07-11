import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CheckSquare, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MarkdownContent } from "@/components/markdown-content";
import { LectureProgressButtons, SelfRating } from "@/components/study-progress-client";
import { requireCourseAccess } from "@/server/auth/access-control";
import { getLectureBlocks, getCourseModuleForStudy } from "@/server/courses/course-service";
import { getProgress } from "@/server/progress/progress-repository";

const supportedCourseSlug = "ai-engineer-guide";

export const dynamic = "force-dynamic";

export default async function LecturePage({ params }: { params: Promise<{ courseSlug: string; moduleSlug: string; lectureId: string }> }) {
  const { courseSlug, moduleSlug, lectureId } = await params;

  if (courseSlug !== supportedCourseSlug) {
    notFound();
  }

  const { user } = await requireCourseAccess(courseSlug);
  const result = await getCourseModuleForStudy(courseSlug, moduleSlug);

  if (!result) {
    notFound();
  }

  const { module } = result;
  const lecture = module.lectures.find((item) => item.id === lectureId);
  const lectureBlocks = getLectureBlocks(module, lectureId);

  if (!lecture || !lectureBlocks.length) {
    notFound();
  }

  const progress = await getProgress(courseSlug, user.id);
  const lectureProgress = progress.lectures.find((item) => item.moduleSlug === moduleSlug && item.lectureId === lectureId);
  const selfRating = progress.selfRatings?.find((item) => item.moduleSlug === moduleSlug && item.lectureId === lectureId);
  const lectureIndex = module.lectures.findIndex((item) => item.id === lectureId);
  const previous = module.lectures[lectureIndex - 1];
  const next = module.lectures[lectureIndex + 1];

  return (
    <AppShell>
      <Link href={`/courses/${courseSlug}/modules/${moduleSlug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-brand">
        <ArrowLeft size={18} /> Back to module
      </Link>

      <div className="mt-5 rounded-md border border-line bg-surface p-5 shadow-soft sm:p-8">
        <p className="text-sm font-semibold text-brand">Module {module.id} / Lecture {lecture.id}</p>
        <h1 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-ink sm:text-4xl">{lecture.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{module.title}</p>
        <div className="mt-6">
          <LectureProgressButtons courseSlug={courseSlug} moduleSlug={moduleSlug} lectureId={lectureId} initialStatus={lectureProgress?.status ?? "not_started"} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 overflow-hidden rounded-md border border-line bg-surface p-5 shadow-sm sm:p-8">
          <MarkdownContent blocks={lectureBlocks} />
        </section>

        <aside className="grid h-fit gap-4 xl:sticky xl:top-6">
          <StudyCue icon={<BookOpen size={18} />} title="Concept" text="Summarize the lecture in one paragraph before moving on." />
          <StudyCue icon={<BriefcaseBusiness size={18} />} title="Product connection" text={`Connect this idea to the ${module.title} part of the course project.`} />
          <StudyCue icon={<FileText size={18} />} title="Build note" text="Write how this idea affects the project architecture, API, data model, or UI." />
          <StudyCue icon={<CheckSquare size={18} />} title="Mini task" text="Write one note, one question, or one implementation step." />
          <SelfRating courseSlug={courseSlug} moduleSlug={moduleSlug} lectureId={lectureId} initialRating={selfRating?.rating} />
        </aside>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        {previous ? (
          <Link href={`/courses/${courseSlug}/modules/${moduleSlug}/lectures/${previous.id}`} className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 hover:border-brand hover:text-brand sm:w-auto">
            <ArrowLeft size={17} /> Previous
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/courses/${courseSlug}/modules/${moduleSlug}/lectures/${next.id}`} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 sm:w-auto">
            Next lecture <ArrowRight size={17} />
          </Link>
        ) : (
          <Link href={`/courses/${courseSlug}/modules/${moduleSlug}/practice`} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 sm:w-auto">
            Practice mode <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </AppShell>
  );
}

function StudyCue({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-md border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-brand">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}
