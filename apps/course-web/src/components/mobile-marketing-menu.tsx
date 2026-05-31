"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileMenu, type MobileMenuLink } from "@/components/mobile-menu";

export function MobileMarketingMenu({ links, action }: { links: MobileMenuLink[]; action: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex rounded-md border border-line p-2 text-slate-200 transition hover:border-brand hover:text-brand lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu size={20} />
      </button>
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        title="Ledeqor"
        subtitle="Learn. Develop. Conquer."
        links={links}
        action={action}
        footer="Project-driven learning for current and future technology roles."
        hideAt="lg"
      />
    </>
  );
}
