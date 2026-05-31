import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, MessageSquareText, Network, PanelsTopLeft, PenLine } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CourseAccessCta } from "@/components/course-access-cta";
import { FOUNDER_FREE_CAMPAIGN } from "@/lib/founder-free";
import { requireAuth } from "@/server/auth/access-control";
import { getCourseForStudy, getNextLecture } from "@/server/courses/course-service";
import { getCourseEntitlement, hasMinimumAccess } from "@/server/entitlements/course-entitlement-repository";
import { getProgress } from "@/server/progress/progress-repository";

const courseSlug = "ai-engineer-guide";

export const dynamic = "force-dynamic";

export default async function MyLearningPage({ searchParams }: { searchParams?: Promise<{ claim?: string }> }) {
  const user = await requireAuth();
  const params = await searchParams;
  const [course, entitlement] = await Promise.all([
    getCourseForStudy(courseSlug),
    getCourseEntitlement(user.id, courseSlug)
  ]);
  const hasAccess = hasMinimumAccess(entitlement, "free");

  if (!course) {
    return null;
  }

  if (!hasAccess) {
    return (
      <AppShell>
        <section className="rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">My Learning</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">No active course access yet.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Claim Founder Free Access to unlock the AI Engineer Guide, build Arkion DocIntel, and start tracking progress.
          </p>
          <div className="mt-6">
            <CourseAccessCta courseSlug={courseSlug} />
          </div>
        </section>
      </AppShell>
    );
  }

  const progress = await getProgress(courseSlug, user.id);
  const completedLectureKeys = new Set(
    progress.lectures
      .filter((lecture) => lecture.status === "done")
      .map((lecture) => `${lecture.moduleSlug}:${lecture.lectureId}`)
  );
  const totalLectures = course.modules.reduce((sum, module) => sum + module.lectures.length, 0);
  const completedLectures = completedLectureKeys.size;
  const progressPercent = totalLectures ? Math.round((completedLectures / totalLectures) * 100) : 0;
  const next = getNextLecture(course, completedLectureKeys);
  const firstModule = course.modules[0];
  const practiceModule = course.modules.find((module) => module.lectures.length) ?? firstModule;
  const nextHref = next
    ? `/courses/${courseSlug}/modules/${next.module.slug}/lectures/${next.lecture.id}`
    : `/courses/${courseSlug}/modules`;
  const feedbackUrl = process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL;
  const isFounderFree = entitlement?.source === "founder_free";

  return (
    <AppShell>
      {params?.claim === "success" ? (
        <div className="mb-5 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100">
          Founder Free Access activated. Your AI Engineer Guide workspace is ready.
        </div>
      ) : null}

      <section className="rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">My Learning</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Continue AI Engineer Guide.</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              Founder Free gives you Pro-style access to the flagship course, capstone workspace, practice mode, and visual library.
            </p>
          </div>
          <div className="rounded-md border border-line bg-panel p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-300">Course progress</p>
              <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-brand">{progressPercent}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-brand" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted">{completedLectures}/{totalLectures} lectures done</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-md border border-line bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                {isFounderFree ? "Founder Free" : entitlement?.accessLevel ?? "Enrolled"}
              </span>
              {entitlement?.expiresAt ? (
                <span className="rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-semibold text-slate-300">
                  Expires {new Date(entitlement.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              ) : null}
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-ink">{course.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{course.description}</p>
          </div>
          <Link href={nextHref} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto">
            Continue Learning <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ActionLink icon={<PanelsTopLeft size={18} />} href={`/courses/${courseSlug}/capstone`} label="Capstone Workspace" />
          <ActionLink icon={<PenLine size={18} />} href={`/courses/${courseSlug}/modules/${practiceModule.slug}/practice`} label="Practice Mode" />
          <ActionLink icon={<Network size={18} />} href={`/courses/${courseSlug}/visuals`} label="Visual Library" />
          <ActionLink icon={<BookOpen size={18} />} href={`/courses/${courseSlug}/modules`} label="All Modules" />
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <InfoTile icon={<CheckCircle2 size={18} />} label="Access" value={isFounderFree ? FOUNDER_FREE_CAMPAIGN.name : "Active entitlement"} />
        <InfoTile icon={<Clock size={18} />} label="Next step" value={next ? `${next.module.title}: ${next.lecture.title}` : "Review completed modules"} />
        <InfoTile icon={<MessageSquareText size={18} />} label="Feedback" value={feedbackUrl ? "Share launch feedback" : "Feedback form not configured"} href={feedbackUrl} />
      </div>
    </AppShell>
  );
}

function ActionLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <Link href={href} className="flex min-h-12 items-center gap-3 rounded-md border border-line bg-panel px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
      <span className="text-brand">{icon}</span>
      {label}
    </Link>
  );
}

function InfoTile({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="rounded-md border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-brand">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      </div>
      <p className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</p>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="block transition hover:opacity-90">
      {content}
    </a>
  );
}
