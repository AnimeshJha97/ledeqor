import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Menu } from "lucide-react";
import { AuthActions } from "@/components/auth-actions";

type MarketingShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/courses/ai-engineer-guide", label: "AI Engineer Guide" },
  { href: "/about", label: "About" }
];

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="AI Engineer Guide home">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-brand/30 bg-brand/10 text-brand">
              <GraduationCap size={22} />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold text-ink">AI Engineer Guide</span>
              <span className="hidden text-xs font-medium text-muted sm:block">Applied AI courses for full-stack developers</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-surface hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <AuthActions />
            <Link href="/courses/ai-engineer-guide/modules" className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
              Study app <BookOpen size={16} />
            </Link>
            <Link href="/courses/ai-engineer-guide" className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Start <ArrowRight size={16} />
            </Link>
          </div>

          <Link href="/courses" className="inline-flex rounded-md border border-line p-2 text-slate-200 transition hover:border-brand hover:text-brand md:hidden" aria-label="Open courses">
            <Menu size={20} />
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-line bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-base font-semibold text-ink">AI Engineer Guide</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Project-driven AI engineering education for developers who want portfolio-grade proof, not shallow demos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </Link>
            ))}
            <Link href="/pricing" className="hover:text-brand">Pricing</Link>
            <Link href="/courses/ai-engineer-guide/modules" className="hover:text-brand">Study</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
