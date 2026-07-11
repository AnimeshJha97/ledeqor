import type { Metadata } from "next";
import { BookOpenCheck, BriefcaseBusiness, Code2, Compass, Database, ShieldCheck } from "lucide-react";
import { FeatureCard, PrimaryCta, SecondaryCta, SectionIntro } from "@/components/marketing";
import { MarketingShell } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "About | Ledeqor",
  description: "Ledeqor is a project-driven learning platform from Arkion Labs for developers upgrading into future-ready technologies."
};

const principles = [
  {
    icon: Code2,
    title: "Build real systems",
    description: "Courses are organized around product capabilities, architecture, APIs, data, reliability, and deployment."
  },
  {
    icon: BookOpenCheck,
    title: "Learn in sequence",
    description: "The path moves from fundamentals to document AI, retrieval, workflows, evals, security, and launch readiness."
  },
  {
    icon: Database,
    title: "Keep data meaningful",
    description: "Course content, learner progress, and future courses are structured separately so the platform can grow cleanly."
  },
  {
    icon: BriefcaseBusiness,
    title: "Create project proof",
    description: "Every major concept connects to a product capability, system design decision, or implementation note."
  },
  {
    icon: ShieldCheck,
    title: "Think production first",
    description: "Security, privacy, evaluation, observability, and cost tracking are part of the learning path."
  },
  {
    icon: Compass,
    title: "Launch with proof",
    description: "The final output is a portfolio project, architecture explanation, and demo-ready product narrative."
  }
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">About the platform</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Ledeqor helps developers learn, develop, and conquer future-ready technology.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
            Built by Arkion Labs, the platform is designed for developers who already know how to build software and now want structured upgrade paths into applied AI engineering, modern SaaS architecture, and future high-demand skills.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="Principles" title="Built for understanding, practice, and proof." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <FeatureCard key={principle.title} {...principle} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro
            eyebrow="Who it is for"
            title="Developers who want AI skills that show up in real products."
            description="The first course is tuned for MERN and full-stack engineers with product experience who want to move into applied AI roles without pretending to be ML researchers overnight."
          />
          <div className="rounded-md border border-line bg-surface p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">The promise</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              You should be able to explain what you built, why the architecture works, where AI can fail, how you evaluate it, how you protect private data, and how the product could become a real SaaS.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Start with the AI Engineer Guide.</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            The current flagship course uses Arkion DocIntel as the capstone product and sets up Ledeqor for future technology tracks.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCta href="/courses/ai-engineer-guide">View course</PrimaryCta>
            <SecondaryCta href="/courses">Browse courses</SecondaryCta>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
