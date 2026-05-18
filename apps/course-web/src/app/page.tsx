import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, FileText, SearchCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { allModules, getCourseStats } from "@/lib/course-data";

export default function DashboardPage() {
  const stats = getCourseStats();
  const completedModules = allModules.filter((module) => module.status === "complete");

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">AI Engineering Path</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Become a full-stack AI engineer by building Orvion DocIntel.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Study the modules, complete the labs, and turn each concept into a feature inside a production-style document intelligence SaaS.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/modules" className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-300">
              Start modules <ArrowRight size={18} />
            </Link>
            <Link href="/labs" className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-slate-300 shadow-sm transition hover:border-brand hover:text-brand">
              View labs
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <StatCard label="Modules" value={stats.moduleCount.toString()} icon={<BookOpen size={22} />} />
          <StatCard label="Expanded" value={stats.completed.toString()} icon={<SearchCheck size={22} />} />
          <StatCard label="Tracked Lectures" value={`${stats.lectureCount}+`} icon={<BrainCircuit size={22} />} />
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-md border border-line bg-surface p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-ink">Learning Flow</h3>
          <div className="mt-5 grid gap-3">
            {["Career Strategy", "Python + FastAPI", "AI Foundations", "Document AI", "LLM APIs", "Extraction", "Vector Search", "RAG", "SaaS Architecture"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-md border border-line bg-panel px-3 py-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-surface text-sm font-semibold text-brand ring-1 ring-line">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-line bg-surface p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-ink">Ready Now</h3>
              <p className="mt-1 text-sm text-muted">These modules are fully written and ready to study.</p>
            </div>
            <FileText className="text-brand" size={24} />
          </div>
          <div className="mt-5 grid gap-4">
            {completedModules.map((module) => (
              <Link key={module.slug} href={`/modules/${module.slug}`} className="rounded-md border border-line p-4 transition hover:border-brand hover:bg-cyan-400/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-brand">Module {module.id}</p>
                    <h4 className="mt-1 text-lg font-semibold text-ink">{module.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">{module.outcome}</p>
                  </div>
                  <StatusBadge status={module.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-md border border-line bg-surface p-5 shadow-soft">
      <div className="flex items-center justify-between text-brand">
        <span className="text-sm font-semibold text-slate-400">{label}</span>
        {icon}
      </div>
      <p className="mt-4 text-4xl font-semibold text-ink">{value}</p>
    </div>
  );
}

