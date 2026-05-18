import type { CourseModule } from "@/lib/course-data";

export function StatusBadge({ status }: { status: CourseModule["status"] }) {
  const styles = {
    complete: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
    outline: "bg-amber-400/10 text-amber-300 ring-amber-400/25",
    planned: "bg-slate-400/10 text-slate-300 ring-slate-400/25"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>
      {status}
    </span>
  );
}
