import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, GitBranch, Network } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { visualDiagrams } from "@/lib/visual-learning-data";
import { requireCourseAccess } from "@/server/auth/access-control";

const supportedCourseSlug = "ai-engineer-guide";

export default async function VisualLearningPage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;

  if (courseSlug !== supportedCourseSlug) {
    notFound();
  }

  await requireCourseAccess(courseSlug);

  return (
    <AppShell>
      <section className="rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Visual Learning</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Diagrams for the systems you are learning to build
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              Use these diagrams before lectures, during revision, and while explaining the capstone in interviews.
              Each one maps a course concept to the Arkion DocIntel product architecture.
            </p>
          </div>

          <div className="rounded-md border border-line bg-panel p-5">
            <div className="flex items-center gap-3 text-brand">
              <Network size={22} />
              <p className="font-semibold text-ink">{visualDiagrams.length} core diagrams</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">AI foundations, ingestion, extraction, embeddings, RAG, SaaS architecture, workflows, evals, and deployment.</p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryTile icon={<Boxes size={20} />} label="Foundation" value="AI terms and document processing" />
        <SummaryTile icon={<GitBranch size={20} />} label="Pipelines" value="Extraction, search, RAG, workflows" />
        <SummaryTile icon={<Network size={20} />} label="Architecture" value="SaaS, evaluation, deployment" />
      </div>

      <div className="mt-6 grid gap-6">
        {visualDiagrams.map((diagram) => (
          <section key={diagram.id} id={diagram.id} className="scroll-mt-24 rounded-md border border-line bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {diagram.moduleIds.map((moduleId) => (
                    <Link
                      key={moduleId}
                      href={`/courses/${courseSlug}/modules`}
                      className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-brand transition hover:bg-cyan-400/20"
                    >
                      Module {moduleId}
                    </Link>
                  ))}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-ink">{diagram.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{diagram.description}</p>
              </div>
              <Link href={`/courses/${courseSlug}/capstone`} className="inline-flex w-fit items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
                Capstone tracker <ArrowRight size={16} />
              </Link>
            </div>
            <MermaidDiagram chart={diagram.chart} />
          </section>
        ))}
      </div>
    </AppShell>
  );
}

function SummaryTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-brand">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      </div>
      <p className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</p>
    </div>
  );
}
