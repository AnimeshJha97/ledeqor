"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import type { CapstoneProgressItem } from "@/server/capstone/capstone-progress-repository";

type ChecklistItem = {
  id: string;
  label: string;
};

type CapstoneChecklistClientProps = {
  courseSlug: string;
  phaseId: string;
  items: ChecklistItem[];
  completedItems: CapstoneProgressItem[];
};

export function CapstoneChecklistClient({ courseSlug, phaseId, items, completedItems }: CapstoneChecklistClientProps) {
  const initialCompleted = useMemo(
    () =>
      new Set(
        completedItems
          .filter((item) => item.phaseId === phaseId)
          .map((item) => item.itemId)
      ),
    [completedItems, phaseId]
  );
  const [completed, setCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  function toggleItem(itemId: string) {
    const nextCompleted = !completed.has(itemId);
    const next = new Set(completed);

    if (nextCompleted) {
      next.add(itemId);
    } else {
      next.delete(itemId);
    }

    setCompleted(next);

    startTransition(async () => {
      const response = await fetch("/api/capstone/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          phaseId,
          itemId,
          completed: nextCompleted
        })
      });

      if (!response.ok) {
        setCompleted(completed);
      }
    });
  }

  return (
    <div className="grid gap-2">
      {items.map((item) => {
        const checked = completed.has(item.id);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleItem(item.id)}
            disabled={isPending}
            className={`flex min-h-12 items-start gap-3 rounded-md border px-3 py-3 text-left text-sm transition ${
              checked
                ? "border-brand/60 bg-cyan-400/10 text-ink"
                : "border-line bg-panel text-slate-300 hover:border-brand hover:bg-cyan-400/5"
            }`}
          >
            {checked ? <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={18} /> : <Circle className="mt-0.5 shrink-0 text-slate-500" size={18} />}
            <span className={checked ? "font-medium" : ""}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
