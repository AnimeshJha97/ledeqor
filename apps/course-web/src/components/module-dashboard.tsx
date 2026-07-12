import Link from "next/link";
import { ArrowRight, BookOpenCheck, ClipboardCheck, FlaskConical, HelpCircle } from "lucide-react";
import type { CourseModuleRecord, LearnerCourseProgress } from "@/server/courses/types";

export function ModuleDashboard({
  courseSlug,
  module,
  completed,
  pending,
  percent,
  progress
}: {
  courseSlug: string;
  module: CourseModuleRecord;
  completed: number;
  pending: number;
  percent: number;
  progress: LearnerCourseProgress;
}) {
  const quizScore = progress.quizScores.find((score) => score.moduleSlug === module.slug);

  return (
    <section className="rounded-md border border-line bg-surface p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Module dashboard</p>
          <h3 className="mt-2 text-2xl font-semibold text-ink">{module.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{module.outcome}</p>
        </div>
        <Link href={`/courses/${courseSlug}/modules/${module.slug}/practice`} className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
          Practice mode <ArrowRight size={17} />
        </Link>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-panel">
        <div className="h-full rounded-full bg-brand" style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile icon={<BookOpenCheck size={19} />} label="Completed lectures" value={`${completed}`} />
        <Tile icon={<HelpCircle size={19} />} label="Pending lectures" value={`${pending}`} />
        <Tile icon={<ClipboardCheck size={19} />} label="Quiz score" value={quizScore ? `${quizScore.score}/${quizScore.total}` : "Not taken"} />
        <Tile icon={<FlaskConical size={19} />} label="Lab status" value={module.labSlug ? "Included" : "Planned"} />
      </div>
    </section>
  );
}

function Tile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-panel p-4">
      <div className="flex items-center gap-2 text-brand">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
