import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { CourseAccessCta } from "@/components/course-access-cta";
import { MarketingShell } from "@/components/marketing-shell";
import { PrimaryCta, SectionIntro } from "@/components/marketing";
import { formatInr, getActiveCampaignForPlan, getDiscountedAmount, pricingPlans } from "@/lib/pricing-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for Ledeqor courses, project tracks, and guided learning."
};

export default function PricingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionIntro
          eyebrow="Pricing"
          title="One course subscription. Free during the launch offer."
          description="Ledeqor has one Pro plan in INR. During launch, Founder Free Access makes the Rs. 499 Pro plan free for early learners."
          align="center"
        />

        <div className="mx-auto mt-10 grid max-w-2xl gap-5">
          {pricingPlans.map((plan) => {
            const campaign = getActiveCampaignForPlan(plan.id);
            const discountedAmount = getDiscountedAmount(plan, campaign);

            return (
            <div key={plan.name} className={`rounded-md border p-6 shadow-sm ${plan.highlighted ? "border-brand bg-cyan-400/10 shadow-soft" : "border-line bg-surface"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-ink">{plan.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{plan.subtitle}</p>
                </div>
                {plan.highlighted ? <span className="shrink-0 whitespace-nowrap rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-slate-950">Best value</span> : null}
              </div>
              <div className="mt-6">
                {campaign ? (
                  <div className="mb-3 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Founder Free Access: early developers get Pro access free
                  </div>
                ) : null}
                <div className="flex flex-wrap items-end gap-3">
                  <p className="text-4xl font-semibold text-ink">{formatInr(discountedAmount)}</p>
                  <p className="pb-1 text-sm font-medium text-muted">/ {plan.billingPeriod}</p>
                </div>
                {campaign ? (
                  <p className="mt-2 text-sm text-slate-400">
                    Regular price <span className="line-through">{formatInr(plan.amountInr)}</span>. Campaign discount: {campaign.discountPercentage}%.
                  </p>
                ) : null}
              </div>
              <div className="mt-6">
                {campaign ? (
                  <CourseAccessCta courseSlug="ai-engineer-guide" />
                ) : plan.highlighted ? (
                  <PrimaryCta href={plan.href}>{plan.cta}</PrimaryCta>
                ) : (
                  <PrimaryCta href={plan.href}>{plan.cta}</PrimaryCta>
                )}
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
            );
          })}
        </div>
      </section>
    </MarketingShell>
  );
}
