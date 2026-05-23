import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Database, FileCode2, ListChecks, Route, ShieldCheck, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CapstoneChecklistClient } from "@/components/capstone-checklist-client";
import { capstonePhases } from "@/lib/capstone-data";
import { requireCourseAccess } from "@/server/auth/access-control";
import { getCapstoneProgress } from "@/server/capstone/capstone-progress-repository";

const supportedCourseSlug = "ai-engineer-guide";

export const dynamic = "force-dynamic";

export default async function CapstonePage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;

  if (courseSlug !== supportedCourseSlug) {
    notFound();
  }

  const { user } = await requireCourseAccess(courseSlug);
  const progress = await getCapstoneProgress(courseSlug, user.id);
  const totalItems = capstonePhases.reduce((sum, phase) => sum + phase.implementationChecklist.length, 0);
  const completedItems = progress.completedItems.length;
  const completionPercent = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <AppShell>
      <section className="rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Capstone Build Tracker</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Build Arkion DocIntel in production phases
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              This workspace converts the course into a product build plan: theory to learn, files to create, APIs to ship,
              data models to design, acceptance criteria to prove, and the interview story each phase unlocks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/courses/${courseSlug}/modules`} className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Study modules <ArrowRight size={17} />
              </Link>
              <Link href={`/courses/${courseSlug}/visuals`} className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
                Open visual library
              </Link>
            </div>
          </div>

          <div className="rounded-md border border-line bg-panel p-5">
            <p className="text-sm font-semibold text-slate-300">Overall build progress</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="text-4xl font-semibold text-ink">{completionPercent}%</p>
              <p className="text-sm font-medium text-muted">{completedItems}/{totalItems} tasks done</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-brand" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5">
        {capstonePhases.map((phase) => {
          const phaseCompleted = progress.completedItems.filter((item) => item.phaseId === phase.id).length;
          const phasePercent = Math.round((phaseCompleted / phase.implementationChecklist.length) * 100);

          return (
            <section key={phase.id} className="overflow-hidden rounded-md border border-line bg-surface shadow-sm">
              <div className="border-b border-line bg-panel/60 p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand">Phase {phase.number}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-ink">{phase.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{phase.summary}</p>
                  </div>
                  <div className="min-w-44 rounded-md border border-line bg-surface p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Checklist</p>
                    <p className="mt-2 text-xl font-semibold text-ink">{phaseCompleted}/{phase.implementationChecklist.length}</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-panel">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${phasePercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-ink">
                    <ListChecks size={18} className="text-brand" /> Implementation checklist
                  </h4>
                  <div className="mt-4">
                    <CapstoneChecklistClient
                      courseSlug={courseSlug}
                      phaseId={phase.id}
                      items={phase.implementationChecklist}
                      completedItems={progress.completedItems}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InfoPanel title="Theory Needed" icon={<Sparkles size={17} />} items={phase.theoryNeeded} />
                  <InfoPanel title="Files To Create" icon={<FileCode2 size={17} />} items={phase.filesToCreate} code />
                  <InfoPanel title="API Routes" icon={<Route size={17} />} items={phase.apiRoutes} code />
                  <InfoPanel title="Database Tables" icon={<Database size={17} />} items={phase.databaseTables} code />
                  <InfoPanel title="Acceptance Criteria" icon={<ShieldCheck size={17} />} items={phase.acceptanceCriteria} />
                  <div className="rounded-md border border-brand/40 bg-cyan-400/10 p-4">
                    <p className="text-sm font-semibold text-brand">Interview story unlocked</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{phase.interviewStoryUnlocked}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}

function InfoPanel({ title, icon, items, code = false }: { title: string; icon: React.ReactNode; items: string[]; code?: boolean }) {
  return (
    <div className="rounded-md border border-line bg-panel p-4">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="text-brand">{icon}</span>
        {title}
      </h4>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-slate-950/35 px-3 py-2">
            {code ? <code className="text-slate-200">{item}</code> : item}
          </li>
        ))}
      </ul>
    </div>
  );
}
