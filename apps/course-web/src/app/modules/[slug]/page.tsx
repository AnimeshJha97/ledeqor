import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookMarked, Code2, FileQuestion, ListChecks } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MarkdownContent } from "@/components/markdown-content";
import { ProgressToggle } from "@/components/progress-toggle";
import { StatusBadge } from "@/components/status-badge";
import { allModules } from "@/lib/course-data";
import { getHydratedModule } from "@/lib/course-content";
import { parseMarkdown, readCourseMarkdown, readLabMarkdown, slugify } from "@/lib/content";

export function generateStaticParams() {
  return allModules.map((module) => ({ slug: module.slug }));
}

export default async function ModuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = getHydratedModule(slug);

  if (!module) {
    notFound();
  }

  const markdown = readCourseMarkdown(module.sourceFile);
  const blocks = parseMarkdown(markdown);
  const labMarkdown = module.labSlug ? readLabMarkdown(module.labSlug) : null;
  const lectureAnchors = new Map(
    blocks
      .filter((block) => block.type === "heading")
      .flatMap((block) =>
        module.lectures
          .filter((lecture) => block.text.toLowerCase().startsWith(`${lecture.id} `))
          .map((lecture) => [lecture.id, block.id] as const)
      )
  );
  const moduleHref = `/modules/${module.slug}`;
  const interviewHeading = blocks.find((block) => block.type === "heading" && block.text.toLowerCase() === "interview questions");
  const interviewAnchor = interviewHeading?.type === "heading" ? interviewHeading.id : undefined;

  return (
    <AppShell
      moduleLinks={{
        labHref: labMarkdown ? `${moduleHref}#module-lab` : "/labs",
        interviewHref: interviewAnchor ? `${moduleHref}#${interviewAnchor}` : "/interview"
      }}
    >
      <Link href="/modules" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-brand">
        <ArrowLeft size={18} /> Back to modules
      </Link>

      <div className="mt-5 rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-brand">Module {module.id}</p>
              <StatusBadge status={module.status} />
            </div>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{module.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{module.purpose}</p>
          </div>
          <ProgressToggle moduleSlug={module.slug} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <InfoTile icon={<BookMarked size={20} />} label="Lectures" value={module.lectures.length ? module.lectures.length.toString() : "Outline"} />
          <InfoTile icon={<ListChecks size={20} />} label="Outcome" value={module.status === "complete" ? "Ready" : "Draft"} />
          <InfoTile icon={<Code2 size={20} />} label="Lab" value={module.labSlug ? "Included" : "Planned"} />
          <InfoTile icon={<FileQuestion size={20} />} label="Quiz" value={module.status === "complete" ? "Included" : "Planned"} />
        </div>
      </div>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="h-fit rounded-md border border-line bg-surface p-5 shadow-sm xl:sticky xl:top-6">
          <h3 className="font-semibold text-ink">Lecture Map</h3>
          <div className="mt-4 grid gap-2">
            {module.lectures.length ? (
              module.lectures.map((lecture) => (
                <a key={lecture.id} href={`#${lectureAnchors.get(lecture.id) ?? slugify(`${lecture.id} ${lecture.title}`)}`} className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 transition hover:border-brand hover:bg-cyan-400/10">
                  <span className="font-semibold text-brand">{lecture.id}</span> {lecture.title}
                </a>
              ))
            ) : (
              <p className="text-sm leading-6 text-muted">This module has its outline ready. Full lecture expansion will be added in sequence.</p>
            )}
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <section className="min-w-0 overflow-hidden rounded-md border border-line bg-surface p-6 shadow-sm sm:p-8">
            <MarkdownContent blocks={blocks} />
          </section>

          {labMarkdown ? (
            <section id="module-lab" className="min-w-0 scroll-mt-24 overflow-hidden rounded-md border border-line bg-surface p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Lab</p>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">{module.labSlug}</h3>
                </div>
              </div>
              <MarkdownContent blocks={parseMarkdown(labMarkdown)} />
            </section>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-panel p-4">
      <div className="flex items-center gap-2 text-brand">{icon}<span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</span></div>
      <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
