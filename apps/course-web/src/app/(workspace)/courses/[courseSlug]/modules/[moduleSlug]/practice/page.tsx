import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PracticeModeClient } from "@/components/practice-mode-client";
import { buildPracticePack } from "@/lib/study-tools";
import { requireCourseAccess } from "@/server/auth/access-control";
import { getCourseModuleForStudy } from "@/server/courses/course-service";

const supportedCourseSlug = "ai-engineer-guide";

export const dynamic = "force-dynamic";

export default async function PracticePage({ params }: { params: Promise<{ courseSlug: string; moduleSlug: string }> }) {
  const { courseSlug, moduleSlug } = await params;

  if (courseSlug !== supportedCourseSlug) {
    notFound();
  }

  await requireCourseAccess(courseSlug);
  const result = await getCourseModuleForStudy(courseSlug, moduleSlug);

  if (!result) {
    notFound();
  }

  const { module } = result;
  const pack = buildPracticePack(module);

  return (
    <>
      <Link href={`/courses/${courseSlug}/modules/${moduleSlug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-brand">
        <ArrowLeft size={18} /> Back to module
      </Link>

      <div className="mt-5 rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Practice Mode</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{module.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          Use flashcards, quizzes, short answers, and coding tasks to turn reading into recall and implementation.
        </p>
      </div>

      <div className="mt-6">
        <PracticeModeClient courseSlug={courseSlug} moduleSlug={moduleSlug} pack={pack} />
      </div>
    </>
  );
}
