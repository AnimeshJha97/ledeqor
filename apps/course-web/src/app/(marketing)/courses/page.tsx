import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { SectionIntro } from "@/components/marketing";
import { getCourseForStudy } from "@/server/courses/course-service";

export const metadata: Metadata = {
  title: "Courses | Ledeqor",
  description: "Explore project-driven technology courses on Ledeqor, starting with the AI Engineer Guide capstone path."
};

export const revalidate = 60;

export default async function CoursesPage() {
  const course = await getCourseForStudy("ai-engineer-guide");
  const modules = course?.modules ?? [];
  const lectureCount = modules.reduce((total, module) => total + module.lectures.length, 0);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionIntro
          eyebrow="Course catalog"
          title="Technology courses built around real product outcomes."
          description="Start with one complete course today. Ledeqor is ready for more course tracks without mixing content, progress, or learning paths together."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <CourseCard
            href="/courses/ai-engineer-guide"
            title="AI Engineer Guide"
            description="Move from full-stack MERN experience into applied AI engineering by building Arkion DocIntel, a production-style document intelligence SaaS."
            stats={[`${modules.length} modules`, `${lectureCount}+ lectures`, "Available now", "Capstone"]}
          />

          {[
            ["RAG Systems Mastery", "A future deep dive into retrieval, reranking, citations, evals, and production RAG reliability."],
            ["AI SaaS Builder", "A future course focused on monetizable AI SaaS architecture, onboarding, billing, and customer-ready workflows."]
          ].map(([title, description]) => (
            <div key={title} className="rounded-md border border-dashed border-line bg-surface/60 p-5">
              <span className="rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-semibold text-slate-300 ring-1 ring-line">Coming soon</span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
