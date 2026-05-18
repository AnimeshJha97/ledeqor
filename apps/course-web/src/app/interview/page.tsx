import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { allModules } from "@/lib/course-data";

export default function InterviewPage() {
  return (
    <AppShell>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Interview prep</p>
      <h2 className="mt-2 text-3xl font-semibold text-ink">Turn learning into answers</h2>
      <p className="mt-2 max-w-2xl text-muted">Each completed module includes interview questions and a project story angle.</p>

      <div className="mt-6 rounded-md border border-line bg-surface p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-ink">Core Pitch</h3>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
          I am a senior full-stack engineer with strong React, Node.js, TypeScript, backend, and product delivery experience. I expanded into applied AI engineering by building Orvion DocIntel, a document intelligence platform that processes business documents using Python, FastAPI, LLMs, embeddings, vector search, RAG, structured extraction, AI workflows, evaluation, and production deployment.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {allModules.filter((module) => module.status === "complete").map((module) => (
          <Link key={module.slug} href={`/modules/${module.slug}#interview-questions`} className="rounded-md border border-line bg-surface p-5 shadow-sm transition hover:border-brand hover:bg-panel">
            <p className="text-sm font-semibold text-brand">Module {module.id}</p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{module.title}</h3>
            <p className="mt-2 text-sm text-muted">Open the module and review its interview section.</p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
