import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, ShieldCheck, Target, Workflow } from "lucide-react";
import { CourseAccessCta } from "@/components/course-access-cta";
import { MarketingShell } from "@/components/marketing-shell";
import { SecondaryCta, SectionIntro, StatPill } from "@/components/marketing";
import { getHydratedModules } from "@/lib/course-content";

export const metadata: Metadata = {
  title: "AI Engineer Guide Course | Build Orvion DocIntel",
  description:
    "Build Orvion DocIntel, a production-style AI document intelligence SaaS, while learning Python, FastAPI, LLMs, vector search, RAG, workflows, evaluation, security, deployment, and interview strategy."
};

const outcomes = [
  "Explain AI systems clearly in interviews",
  "Build Python and FastAPI AI services",
  "Implement semantic search and RAG",
  "Extract structured fields from documents",
  "Evaluate hallucination, retrieval, citations, cost, and latency",
  "Present a portfolio-ready AI SaaS project"
];

export default async function AiEngineerGuidePage({ searchParams }: { searchParams?: Promise<{ access?: string }> }) {
  const params = await searchParams;
  const modules = getHydratedModules();
  const lectureCount = modules.reduce((total, module) => total + module.lectures.length, 0);

  return (
    <MarketingShell>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.75fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Available now</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              AI Engineer Guide: build Orvion DocIntel end to end.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              A complete applied AI engineering path for full-stack developers. Learn by building a business document intelligence SaaS with upload, extraction, embeddings, RAG, workflows, evaluation, security, and deployment.
            </p>
            {params?.access === "required" ? (
              <div className="mt-5 max-w-2xl rounded-md border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
                Sign in and enroll to open the study workspace. Course detail and curriculum preview stay public.
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
        <SectionIntro eyebrow="Outcomes" title="You finish with interview stories, not just notes." />
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
            title="The complete path from career strategy to launch readiness."
            description="Every module maps to a product capability, an interview story, or a career asset."
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
          Open the dashboard, start from Module 0, and work through the capstone path with the product beside you.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <CourseAccessCta courseSlug="ai-engineer-guide" />
          <SecondaryCta href="/courses/ai-engineer-guide/visuals">View diagrams</SecondaryCta>
        </div>
      </section>
    </MarketingShell>
  );
}
