import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { PrimaryCta, SecondaryCta, SectionIntro } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for AI Engineer Guide courses, interview practice, project tracks, and guided learning."
};

const plans = [
  {
    name: "Free",
    price: "$0",
    subtitle: "Start learning and preview the platform.",
    cta: "Start free",
    href: "/courses/ai-engineer-guide",
    features: [
      "Access free lessons and course previews",
      "View public roadmap and course outcomes",
      "Basic progress stored locally",
      "Limited interview practice previews",
      "Community-ready project overview"
    ]
  },
  {
    name: "Pro",
    price: "$19/mo",
    subtitle: "For developers actively building portfolio projects.",
    cta: "Choose Pro",
    href: "/sign-in",
    highlighted: true,
    features: [
      "Full access to all current courses",
      "Course progress synced to your account",
      "Capstone build trackers",
      "Interview answer practice with AI review limits",
      "Downloadable checklists and templates",
      "Future course updates included"
    ]
  },
  {
    name: "Career",
    price: "$49/mo",
    subtitle: "For learners preparing for interviews and job switch.",
    cta: "Choose Career",
    href: "/sign-in",
    features: [
      "Everything in Pro",
      "Expanded mock interview practice limits",
      "Resume and LinkedIn review workflows",
      "Portfolio case study builder",
      "Weekly job strategy tracker",
      "Priority access to new career modules"
    ]
  }
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionIntro
          eyebrow="Pricing"
          title="Start free. Upgrade when you want guided progress and AI practice."
          description="The platform is designed to support multiple courses, course-specific projects, progress tracking, and careful AI-powered interview practice without encouraging wasteful usage."
          align="center"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-md border p-6 shadow-sm ${plan.highlighted ? "border-brand bg-cyan-400/10 shadow-soft" : "border-line bg-surface"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-ink">{plan.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{plan.subtitle}</p>
                </div>
                {plan.highlighted ? <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-slate-950">Best value</span> : null}
              </div>
              <p className="mt-6 text-4xl font-semibold text-ink">{plan.price}</p>
              <div className="mt-6">
                {plan.highlighted ? <PrimaryCta href={plan.href}>{plan.cta}</PrimaryCta> : <SecondaryCta href={plan.href}>{plan.cta}</SecondaryCta>}
              </div>
              <div className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={17} />
                    <p className="text-sm leading-6 text-slate-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
