"use client";

import Link from "next/link";
import { BookOpen, FolderKanban, GraduationCap, LayoutDashboard, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

type AppShellProps = {
  children: React.ReactNode;
  moduleLinks?: {
    labHref?: string;
    interviewHref?: string;
  };
};

export function AppShell({ children, moduleLinks }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navItems: NavItem[] = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/modules", label: "Modules", icon: BookOpen },
    { href: moduleLinks?.labHref ?? "/labs", label: "Labs", icon: FolderKanban },
    { href: moduleLinks?.interviewHref ?? "/interview", label: "Interview", icon: GraduationCap }
  ];

  useEffect(() => {
    const saved = window.localStorage.getItem("orvion-course-sidebar");
    if (saved === "closed") {
      setSidebarOpen(false);
    }
  }, []);

  function toggleSidebar() {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    window.localStorage.setItem("orvion-course-sidebar", next ? "open" : "closed");
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-line bg-surface/92 px-5 py-6 shadow-soft backdrop-blur transition-transform duration-200 lg:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <Link href="/" className="block min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Orvion Labs</p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">DocIntel Course</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Applied AI engineering for senior full-stack builders.</p>
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

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-panel hover:text-ink"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
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

      <header className="sticky top-0 z-10 border-b border-line bg-surface/90 px-4 py-4 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold text-ink">Orvion DocIntel</Link>
          <Link href={moduleLinks?.labHref ?? "/modules"} className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-slate-200">
            {moduleLinks?.labHref ? "Lab" : "Modules"}
          </Link>
        </div>
      </header>

      <main className={sidebarOpen ? "lg:pl-72" : "lg:pl-0"}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
