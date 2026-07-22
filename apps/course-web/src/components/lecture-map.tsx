"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export type LectureMapItem = {
  id: string;
  title: string;
  anchor: string;
  done: boolean;
};

export function LectureMap({ items }: { items: LectureMapItem[] }) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.anchor))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!headings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px" }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="grid gap-2">
      {items.map((item) => {
        const active = item.anchor === activeAnchor;

        return (
          <a
            key={item.id}
            href={`#${item.anchor}`}
            onClick={() => setActiveAnchor(item.anchor)}
            aria-current={active ? "location" : undefined}
            className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm leading-6 transition ${
              active
                ? "border-brand bg-cyan-400/10 text-brand"
                : "border-line text-slate-300 hover:border-brand hover:bg-cyan-400/10"
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className={`font-semibold ${active ? "text-brand" : "text-brand"}`}>{item.id}</span> {item.title}
            </span>
            {item.done ? <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" size={15} aria-label="Done" /> : null}
          </a>
        );
      })}
    </div>
  );
}
