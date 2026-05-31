import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { AuthActions } from "@/components/auth-actions";
import { MobileMarketingMenu } from "@/components/mobile-marketing-menu";

type MarketingShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/courses/ai-engineer-guide", label: "AI Engineer Guide" },
  { href: "/about", label: "About" }
];

const mobileNavItems = [
  { href: "/", label: "Home", description: "Return to the Ledeqor landing page" },
  { href: "/courses", label: "Courses", description: "Browse available learning tracks" },
  { href: "/pricing", label: "Pricing", description: "View free launch access and paid tiers" },
  { href: "/courses/ai-engineer-guide", label: "AI Engineer Guide", description: "Open the flagship course overview" },
  { href: "/about", label: "About", description: "Learn about Ledeqor and Arkion Labs" },
  { href: "/my-learning", label: "My Learning", description: "Continue your enrolled courses" }
];

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Ledeqor home">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-brand/30 bg-brand/10 text-brand">
              <GraduationCap size={22} />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold text-ink">Ledeqor</span>
              <span className="hidden text-xs font-medium text-muted sm:block">Learn. Develop. Conquer.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-surface hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <AuthActions />
            <Link href="/my-learning" className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
              My Learning <BookOpen size={16} />
            </Link>
            <Link href="/courses/ai-engineer-guide?claim=founder-free" className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Claim Founder Free <ArrowRight size={16} />
            </Link>
          </div>

          <MobileMarketingMenu
            links={mobileNavItems}
            action={
              <>
                <AuthActions />
                <Link href="/my-learning" className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
                  My Learning <BookOpen size={16} />
                </Link>
                <Link href="/courses/ai-engineer-guide?claim=founder-free" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Claim Founder Free <ArrowRight size={16} />
                </Link>
              </>
            }
          />
        </div>
      </header>

      <main className="min-w-0 overflow-x-hidden">{children}</main>

      <footer className="border-t border-line bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-base font-semibold text-ink">Ledeqor</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Project-driven technology education for developers who want portfolio-grade proof, not shallow demos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </Link>
            ))}
            <Link href="/pricing" className="hover:text-brand">Pricing</Link>
            <Link href="/my-learning" className="hover:text-brand">My Learning</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
