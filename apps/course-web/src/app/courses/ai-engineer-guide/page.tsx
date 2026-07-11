import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, ShieldCheck, Target, Workflow } from "lucide-react";
import { CourseAccessCta } from "@/components/course-access-cta";
import { MarketingShell } from "@/components/marketing-shell";
import { SecondaryCta, SectionIntro, StatPill } from "@/components/marketing";
import { getCourseForStudy } from "@/server/courses/course-service";

export const metadata: Metadata = {
  title: "AI Engineer Guide Course | Build Arkion DocIntel",
  description:
    "Build Arkion DocIntel, a production-style AI document intelligence SaaS, while learning Python, FastAPI, LLMs, vector search, RAG, workflows, evaluation, security, and deployment."
};

const outcomes = [
  "Explain AI systems through a real product",
  "Build Python and FastAPI AI services",
  "Implement semantic search and RAG",
  "Extract structured fields from documents",
  "Evaluate hallucination, retrieval, citations, cost, and latency",
  "Present a portfolio-ready AI SaaS project"
];

export default async function AiEngineerGuidePage({ searchParams }: { searchParams?: Promise<{ access?: string; claim?: string }> }) {
  const params = await searchParams;
  const course = await getCourseForStudy("ai-engineer-guide");
  const modules = course?.modules ?? [];
  const lectureCount = modules.reduce((total, module) => total + module.lectures.length, 0);

  return (
    <MarketingShell>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.75fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Founder Free Access available now</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Master AI engineering by building Arkion DocIntel end to end.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              Learn concepts, build a real AI SaaS product, and turn the project into credible proof of skill.
            </p>
            <div className="mt-5 max-w-2xl rounded-md border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100">
              Founder Free Access: early developers get Pro access free. Limited to the first 25 users.
            </div>
            {params?.access === "required" ? (
              <div className="mt-5 max-w-2xl rounded-md border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
                Sign in and enroll to open the study workspace. Course detail and curriculum preview stay public.
              </div>
            ) : null}
            {params?.claim === "full" ? (
              <div className="mt-5 max-w-2xl rounded-md border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
                Founder Free Access is full for now. You can still review the course preview.
              </div>
            ) : null}
            {params?.claim === "unavailable" ? (
              <div className="mt-5 max-w-2xl rounded-md border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
                Founder Free Access is only available for the AI Engineer Guide course.
              </div>
            ) : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CourseAccessCta courseSlug="ai-engineer-guide" />
              <SecondaryCta href="/courses/ai-engineer-guide/capstone">View capstone tracker</SecondaryCta>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatPill value={`${modules.length}`} label="Modules" />
              <StatPill value={`${lectureCount}+`} label="Lectures" />
              <StatPill value="10" label="Build phases" />
              <StatPill value="8 wk" label="Plan" />
            </div>
          </div>

          <div className="rounded-md border border-line bg-surface p-5 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">What you build</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Document upload and processing", Layers3],
                ["Structured extraction and exports", Target],
                ["RAG Q&A with citations", Workflow],
                ["Security, evals, and deployment", ShieldCheck]
              ].map(([label, Icon]) => {
                const LucideIcon = Icon as typeof Layers3;
                return (
                  <div key={label as string} className="flex items-center gap-3 rounded-md border border-line bg-panel px-3 py-3">
                    <LucideIcon className="text-brand" size={20} />
                    <span className="text-sm font-semibold text-slate-300">{label as string}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="Outcomes" title="You finish with product proof, not just notes." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome) => (
            <div key={outcome} className="flex gap-3 rounded-md border border-line bg-surface p-4">
              <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={18} />
              <p className="text-sm leading-6 text-slate-300">{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="curriculum" className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Curriculum"
            title="The complete path from foundations to launch readiness."
            description="Every module maps to a product capability, implementation skill, or capstone milestone."
          />
          <div className="mt-8 grid gap-3">
            {modules.map((module) => (
              <Link key={module.slug} href={`/courses/ai-engineer-guide/modules/${module.slug}`} className="group rounded-md border border-line bg-surface p-4 transition hover:border-brand hover:bg-panel">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand">Module {module.id}</p>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{module.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{module.outcome}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Study <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Ready to study and build?</h2>
        <p className="mt-4 text-base leading-7 text-muted">
          Open the dashboard, start with the first available module, and work through the capstone path with the product beside you.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <CourseAccessCta courseSlug="ai-engineer-guide" />
          <SecondaryCta href="/courses/ai-engineer-guide/visuals">View diagrams</SecondaryCta>
        </div>
      </section>
    </MarketingShell>
  );
}
