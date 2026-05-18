import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { getHydratedModules } from "@/lib/course-content";

export default function ModulesPage() {
  const modules = getHydratedModules();

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Curriculum</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Modules, sections, and lectures</h2>
          <p className="mt-2 max-w-2xl text-muted">Keep the source Markdown structure, but study through a more deliberate course UI.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {modules.map((module) => (
          <Link key={module.slug} href={`/modules/${module.slug}`} className="group rounded-md border border-line bg-surface p-5 shadow-sm transition hover:border-brand hover:bg-panel hover:shadow-soft">
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
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Open <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
