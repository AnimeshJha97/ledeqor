"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useEffect, useState } from "react";

export function ProgressToggle({ moduleSlug }: { moduleSlug: string }) {
  const storageKey = `ledeqor-course-progress:${moduleSlug}`;
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(window.localStorage.getItem(storageKey) === "done");
  }, [storageKey]);

  function toggle() {
    const next = !done;
    setDone(next);
    if (next) {
      window.localStorage.setItem(storageKey, "done");
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-brand hover:text-brand"
    >
      {done ? <CheckCircle2 size={18} className="text-success" /> : <Circle size={18} />}
      {done ? "Completed" : "Mark complete"}
    </button>
  );
}
