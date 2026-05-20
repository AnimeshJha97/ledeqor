import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export function CourseCard({
  href,
  title,
  description,
  stats,
  status = "Available now"
}: {
  href: string;
  title: string;
  description: string;
  stats: string[];
  status?: string;
}) {
  return (
    <Link href={href} className="group block rounded-md border border-line bg-surface p-5 shadow-sm transition hover:border-brand hover:bg-panel hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand ring-1 ring-brand/20">
          <BookOpen size={22} />
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
          <CheckCircle2 size={13} /> {status}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {stats.map((stat) => (
          <span key={stat} className="rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-semibold text-slate-300 ring-1 ring-line">
            {stat}
          </span>
        ))}
      </div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
        Open course <ArrowRight size={17} className="transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
