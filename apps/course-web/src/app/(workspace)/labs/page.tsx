import Link from "next/link";
import { requireCourseAccess } from "@/server/auth/access-control";
import { getCourseForStudy } from "@/server/courses/course-service";

export default async function LabsPage() {
  await requireCourseAccess("ai-engineer-guide");
  const course = await getCourseForStudy("ai-engineer-guide");
  const labs = (course?.modules ?? []).filter((module) => module.labSlug);

  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Hands-on</p>
      <h2 className="mt-2 text-3xl font-semibold text-ink">Labs</h2>
      <p className="mt-2 max-w-2xl text-muted">Labs turn each module into product progress inside Arkion DocIntel.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {labs.map((module) => (
          <Link key={module.slug} href={`/courses/ai-engineer-guide/modules/${module.slug}#module-lab`} className="rounded-md border border-line bg-surface p-5 shadow-sm transition hover:border-brand hover:bg-panel hover:shadow-soft">
            <p className="text-sm font-semibold text-brand">Module {module.id}</p>
            <h3 className="mt-2 text-xl font-semibold text-ink">{module.labSlug}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{module.outcome}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
