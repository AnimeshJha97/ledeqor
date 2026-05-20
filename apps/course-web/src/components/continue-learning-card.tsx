import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import type { CourseLectureRecord, CourseModuleRecord } from "@/server/courses/types";

export function ContinueLearningCard({
  courseSlug,
  next
}: {
  courseSlug: string;
  next: { module: CourseModuleRecord; lecture: CourseLectureRecord } | null;
}) {
  if (!next) {
    return (
      <div className="rounded-md border border-emerald-400/25 bg-emerald-400/10 p-5">
        <p className="text-sm font-semibold text-emerald-300">Course complete</p>
        <h3 className="mt-2 text-xl font-semibold text-ink">Every lecture is marked done.</h3>
        <p className="mt-2 text-sm leading-6 text-muted">Move into practice mode, capstone build tracking, or revision passes.</p>
      </div>
    );
  }

  return (
    <Link href={`/courses/${courseSlug}/modules/${next.module.slug}/lectures/${next.lecture.id}`} className="group block rounded-md border border-brand/30 bg-cyan-400/10 p-5 shadow-sm transition hover:border-brand hover:bg-cyan-400/15">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <PlayCircle size={17} /> Continue learning
          </p>
          <h3 className="mt-2 text-xl font-semibold text-ink">{next.lecture.id} {next.lecture.title}</h3>
          <p className="mt-1 text-sm text-muted">Module {next.module.id}: {next.module.title}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
          Open <ArrowRight size={17} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
