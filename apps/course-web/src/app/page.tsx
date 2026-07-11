import type { Metadata } from "next";
import { BarChart3, BrainCircuit, FileSearch, GitBranch, LockKeyhole, Rocket, SearchCheck, ShieldCheck, Workflow } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { FounderFreeClaimButton } from "@/components/founder-free-claim-button";
import { FeatureCard, SecondaryCta, SectionIntro, StatPill } from "@/components/marketing";
import { MarketingShell } from "@/components/marketing-shell";
import { getCourseForStudy } from "@/server/courses/course-service";

export const metadata: Metadata = {
  title: "Ledeqor | Learn Future-Ready Technology By Building",
  description:
    "Ledeqor is a project-driven learning platform from Arkion Labs for developers upgrading into AI engineering and other future-ready technologies.",
  keywords: [
    "AI engineering course",
    "full stack AI engineer",
    "applied AI engineering",
    "RAG course",
    "LLM engineering course",
    "AI portfolio project",
    "Python FastAPI AI course",
    "AI courses for developers"
  ]
};

export const revalidate = 60;

const solutionFeatures = [
  {
    icon: BrainCircuit,
    title: "LLM API engineering",
    description: "Use model APIs with prompts, structured outputs, validation, retries, streaming, and cost tracking."
  },
  {
    icon: FileSearch,
    title: "Document intelligence",
    description: "Parse PDFs, understand scanned document limits, classify documents, and extract business fields."
  },
  {
    icon: SearchCheck,
    title: "Vector search and RAG",
    description: "Build embeddings, semantic search, grounded Q&A, citations, and unknown-answer handling."
  },
  {
    icon: Workflow,
    title: "AI workflows",
    description: "Design controlled agents for contract review, invoice summaries, comparisons, and checklists."
  },
  {
    icon: BarChart3,
    title: "Evaluation and observability",
    description: "Measure extraction accuracy, retrieval quality, citation correctness, latency, and token cost."
  },
  {
    icon: ShieldCheck,
    title: "Security and deployment",
    description: "Handle private documents with tenant isolation, RBAC, safe logging, Docker, queues, and production readiness."
  }
];

const roadmapGroups = [
  ["Foundation", "Product Direction", "Python for AI Engineering", "AI / ML / LLM Foundations"],
  ["Document Intelligence", "Document AI Fundamentals", "LLM API Engineering", "Structured Extraction"],
  ["Retrieval and Architecture", "Embeddings and Vector Search", "RAG for Business Documents", "Full Stack AI SaaS Architecture"],
  ["Production Readiness", "Agentic Workflows", "Evaluation and Observability", "Security and Privacy", "Deployment and LLMOps"],
  ["Project Launch", "Capstone Build", "Demo Readiness", "Documentation and Polish"]
];

export default async function LandingPage() {
  const course = await getCourseForStudy("ai-engineer-guide");
  const modules = course?.modules ?? [];
  const lectureCount = modules.reduce((total, module) => total + module.lectures.length, 0);

  return (
    <MarketingShell>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Founder Free Access by Arkion Labs</p>
            <h1 className="mt-4 max-w-4xl break-words text-3xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Master AI engineering by building a real AI SaaS product.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              Ledeqor helps developers learn concepts, build Arkion DocIntel, and turn the project into credible proof of skill.
            </p>
            <div className="mt-5 max-w-2xl break-words rounded-md border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold leading-6 text-emerald-100">
              Founder Free Access: early developers get Pro access free. Limited to the first 25 users.
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <FounderFreeClaimButton
                label="Claim Founder Free Access"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-300 sm:w-auto"
              />
              <SecondaryCta href="/courses">Explore courses</SecondaryCta>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatPill value={`${modules.length}`} label="Modules" />
              <StatPill value={`${lectureCount}+`} label="Lectures" />
              <StatPill value="Projects" label="Each course" />
              <StatPill value="8 wk" label="Roadmap" />
            </div>
          </div>

          <div className="min-w-0 rounded-md border border-line bg-surface p-4 shadow-soft sm:p-5">
            <div className="rounded-md border border-line bg-panel p-4">
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand">Project-based courses</p>
                  <h2 className="mt-1 text-xl font-semibold text-ink">Learn by building complete AI applications</h2>
                </div>
                <span className="w-fit shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                  Portfolio-ready
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {["Choose a course by level", "Study concepts in sequence", "Build the course project", "Practice with quizzes and labs", "Track progress and readiness"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-md border border-line bg-surface px-3 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/10 text-sm font-semibold text-brand ring-1 ring-brand/20">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-line bg-panel p-4">
                <LockKeyhole className="text-brand" size={20} />
                <p className="mt-3 text-sm font-semibold text-ink">Private workspace model</p>
                <p className="mt-1 text-xs leading-5 text-muted">Course-specific content, learner progress, practice history, and future tracks.</p>
              </div>
              <div className="rounded-md border border-line bg-panel p-4">
                <GitBranch className="text-accent" size={20} />
                <p className="mt-3 text-sm font-semibold text-ink">Real system design story</p>
                <p className="mt-1 text-xs leading-5 text-muted">Every course ends with a serious project and a clear product narrative.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Why this exists"
          title="Most AI tutorials stop where real engineering begins."
          description="You learn prompts, build a chatbot, and still cannot show architecture, retrieval, evaluation, security, cost, or deployment depth. This platform is built around product proof."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["No production architecture", "No RAG evaluation", "No project depth", "No document processing", "No security model", "No deployment proof"].map((item) => (
            <div key={item} className="rounded-md border border-line bg-surface p-4 text-sm font-semibold text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Solution"
            title="Learn AI engineering the way products are actually built."
            description="Ledeqor combines structured learning with course-specific projects, practice, and product outcomes. Each course is designed for a different level of experience and a different product build."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Capstone"
          title="Every course comes with a real project, not just lessons."
          description="The flagship AI Engineer Guide uses a document intelligence SaaS project. Future courses can use different builds and skill levels while sharing the same learning platform."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Beginner-to-advanced tracks", "Course-specific capstones", "Practice and lab loops", "Progress saved per course", "Guided project checklists", "Launch-ready project assets"].map((item) => (
            <div key={item} className="rounded-md border border-line bg-surface p-5">
              <Rocket className="text-brand" size={20} />
              <p className="mt-3 text-sm font-semibold text-ink">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Roadmap" title="A complete path from full-stack developer to applied AI engineer." />
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {roadmapGroups.map(([group, ...items]) => (
              <div key={group} className="rounded-md border border-line bg-surface p-5">
                <h3 className="font-semibold text-brand">{group}</h3>
                <div className="mt-4 grid gap-2">
                  {items.map((item) => (
                    <p key={item} className="text-sm leading-6 text-slate-300">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="Available now" title="Start with the AI Engineer Guide. More tracks can plug into the same platform." />
        <div className="mt-8 max-w-xl">
          <CourseCard
            href="/courses/ai-engineer-guide"
            title="AI Engineer Guide"
            description="Build Arkion DocIntel, a full-stack AI document intelligence SaaS, while learning applied AI engineering through a real product."
            stats={[`${modules.length} modules`, `${lectureCount}+ lectures`, "Capstone project", "Practice mode"]}
          />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Build the AI portfolio project your profile is missing.</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Learn the concepts, build the product, explain the architecture, and publish a project you can stand behind.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <FounderFreeClaimButton
              label="Claim Founder Free Access"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-300 sm:w-auto"
            />
            <SecondaryCta href="/about">Learn about the platform</SecondaryCta>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
