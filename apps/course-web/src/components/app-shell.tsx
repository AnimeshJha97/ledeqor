"use client";

import Link from "next/link";
import { BookOpen, Code2, Compass, FolderKanban, Menu, Network, PanelLeftClose, PanelLeftOpen, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/mobile-menu";

type NavItem = {
  href: string;
  label: string;
  icon: typeof BookOpen;
  description: string;
  match?: "exact" | "prefix";
};

type AppShellProps = {
  children: React.ReactNode;
};

const DEFAULT_COURSE_SLUG = "ai-engineer-guide";

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const courseSlug = pathname.match(/^\/courses\/([^/]+)/)?.[1] ?? DEFAULT_COURSE_SLUG;
  const navItems: NavItem[] = [
    { href: "/my-learning", label: "My Learning", icon: UserRound, description: "Your dashboard and next step", match: "exact" },
    { href: `/courses/${courseSlug}/modules`, label: "Course Content", icon: BookOpen, description: "Modules, lectures, and readings", match: "prefix" },
    { href: "/labs", label: "Practice Labs", icon: Code2, description: "Hands-on lab workspace", match: "exact" },
    { href: `/courses/${courseSlug}/visuals`, label: "Visual Library", icon: Network, description: "Diagrams and system maps", match: "exact" },
    { href: `/courses/${courseSlug}/capstone`, label: "Capstone Tracker", icon: FolderKanban, description: "Track the Arkion DocIntel build", match: "exact" }
  ];
  const exitItems: NavItem[] = [
    { href: "/courses", label: "Course Catalog", icon: Compass, description: "Leave the workspace and browse courses", match: "exact" }
  ];
  const mobileLinks = [...navItems, ...exitItems].map((item) => ({
    href: item.href,
    label: item.label,
    description: item.description
  }));

  function isActive(item: NavItem) {
    if (item.match === "prefix") {
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }

    return pathname === item.href;
  }

  useEffect(() => {
    const saved = window.localStorage.getItem("ledeqor-course-sidebar");
    if (saved === "closed") {
      setSidebarOpen(false);
    }
  }, []);

  function toggleSidebar() {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    window.localStorage.setItem("ledeqor-course-sidebar", next ? "open" : "closed");
  }

  function renderNavLink(item: NavItem) {
    const Icon = item.icon;
    const active = isActive(item);

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex items-start gap-3 rounded-md border px-3 py-2 text-sm transition ${
          active
            ? "border-brand bg-cyan-400/10 text-brand shadow-sm"
            : "border-transparent text-slate-300 hover:border-line hover:bg-panel hover:text-ink"
        }`}
      >
        <Icon className="mt-0.5 shrink-0" size={18} />
        <span className="min-w-0">
          <span className="block font-semibold">{item.label}</span>
          <span className={`mt-0.5 block text-xs leading-5 ${active ? "text-cyan-100/80" : "text-muted"}`}>{item.description}</span>
        </span>
      </Link>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-line bg-surface px-5 py-6 shadow-[18px_0_60px_rgba(0,0,0,0.55)] transition-transform duration-200 lg:flex ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <Link href="/my-learning" className="block min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Ledeqor</p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">AI Engineer Guide</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Study applied AI engineering through courses, practice, diagrams, and capstone builds.</p>
          </Link>

          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-md border border-line p-2 text-slate-300 transition hover:border-brand hover:text-brand"
            aria-label="Hide side menu"
            title="Hide side menu"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <nav className="mt-10 space-y-2" aria-label="Course navigation">
          {navItems.map(renderNavLink)}
        </nav>

        <nav className="mt-auto border-t border-line pt-4" aria-label="Platform navigation">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Platform</p>
          {exitItems.map(renderNavLink)}
        </nav>
      </aside>

      {!sidebarOpen ? (
        <button
          type="button"
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-30 hidden rounded-md border border-line bg-surface p-2 text-slate-200 shadow-soft transition hover:border-brand hover:text-brand lg:inline-flex"
          aria-label="Open side menu"
          title="Open side menu"
        >
          <PanelLeftOpen size={20} />
        </button>
      ) : null}

      <header className="sticky top-0 z-30 border-b border-line bg-surface px-4 py-3 shadow-soft lg:hidden">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md border border-line p-2 text-slate-200 transition hover:border-brand hover:text-brand"
            aria-label="Open study menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={20} />
          </button>
          <Link href="/my-learning" className="min-w-0 flex-1" aria-label="Ledeqor My Learning">
            <span className="block truncate text-base font-semibold text-ink">Ledeqor</span>
            <span className="block truncate text-xs font-medium text-muted">AI Engineer Guide</span>
          </Link>
          <Link href={`/courses/${courseSlug}/modules`} className="shrink-0 rounded-md border border-line px-3 py-2 text-sm font-medium text-slate-200">
            Modules
          </Link>
        </div>
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        hideAt="lg"
        title="AI Engineer Guide"
        subtitle="Navigate lessons, practice, diagrams, and the capstone workspace."
        links={mobileLinks}
        action={
          <Link href="/my-learning" onClick={() => setMobileMenuOpen(false)} className="inline-flex w-full items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Continue Learning
          </Link>
        }
      />

      <main className={`min-w-0 overflow-x-hidden ${sidebarOpen ? "lg:pl-72" : "lg:pl-0"}`}>
        <div className="mx-auto max-w-7xl min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
