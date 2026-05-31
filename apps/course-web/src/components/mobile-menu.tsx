"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

export type MobileMenuLink = {
  href: string;
  label: string;
  description?: string;
};

type MobileMenuProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  links: MobileMenuLink[];
  action?: React.ReactNode;
  footer?: React.ReactNode;
  hideAt?: "md" | "lg";
  onClose: () => void;
};

export function MobileMenu({ open, title, subtitle, links, action, footer, hideAt = "md", onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 ${hideAt === "lg" ? "lg:hidden" : "md:hidden"}`} role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-[min(92vw,380px)] max-w-full flex-col border-l border-line bg-surface shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-4">
          <div className="min-w-0">
            <p className="text-base font-semibold text-ink">{title}</p>
            {subtitle ? <p className="mt-1 text-sm leading-5 text-muted">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line p-2 text-slate-200 transition hover:border-brand hover:text-brand"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="grid gap-2 overflow-y-auto px-4 py-4">
          {links.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={onClose}
              className="rounded-md border border-line bg-panel px-4 py-3 text-left transition hover:border-brand hover:bg-cyan-400/10"
            >
              <span className="block text-sm font-semibold text-slate-100">{item.label}</span>
              {item.description ? <span className="mt-1 block text-xs leading-5 text-muted">{item.description}</span> : null}
            </Link>
          ))}
        </nav>

        {(action || footer) ? (
          <div className="mt-auto border-t border-line px-4 py-4">
            {action ? <div className="grid gap-3">{action}</div> : null}
            {footer ? <div className="mt-4 text-sm text-muted">{footer}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
