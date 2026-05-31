"use client";

import { CheckCircle2, Circle, Eye, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const statuses = [
  { value: "not_started", label: "Not started", icon: Circle },
  { value: "reading", label: "Reading", icon: Eye },
  { value: "done", label: "Done", icon: CheckCircle2 },
  { value: "needs_revision", label: "Needs revision", icon: RotateCcw }
] as const;

type Status = typeof statuses[number]["value"];

export function LectureProgressButtons({
  courseSlug,
  moduleSlug,
  lectureId,
  initialStatus = "not_started"
}: {
  courseSlug: string;
  moduleSlug: string;
  lectureId: string;
  initialStatus?: Status;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isPending, startTransition] = useTransition();

  function updateStatus(nextStatus: Status) {
    setStatus(nextStatus);
    startTransition(async () => {
      await fetch("/api/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "lecture",
          courseSlug,
          moduleSlug,
          lectureId,
          status: nextStatus
        })
      });
      router.refresh();
    });
  }

  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {statuses.map((item) => {
        const Icon = item.icon;
        const active = status === item.value;
        return (
          <button
            key={item.value}
            type="button"
            disabled={isPending}
            onClick={() => updateStatus(item.value)}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition ${
              active ? "border-brand bg-cyan-400/10 text-brand" : "border-line bg-panel text-slate-300 hover:border-brand hover:text-brand"
            }`}
          >
            <Icon size={16} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function SelfRating({
  courseSlug,
  moduleSlug,
  lectureId,
  initialRating
}: {
  courseSlug: string;
  moduleSlug: string;
  lectureId: string;
  initialRating?: number;
}) {
  const [rating, setRating] = useState(initialRating ?? 0);
  const [isPending, startTransition] = useTransition();

  function submit(nextRating: number) {
    setRating(nextRating);
    startTransition(async () => {
      await fetch("/api/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "self_rating",
          courseSlug,
          moduleSlug,
          lectureId,
          rating: nextRating
        })
      });
    });
  }

  return (
    <div className="rounded-md border border-line bg-surface p-5">
      <h3 className="text-lg font-semibold text-ink">Self-rating</h3>
      <p className="mt-2 text-sm leading-6 text-muted">How confidently can you explain this lecture right now?</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            disabled={isPending}
            onClick={() => submit(value)}
            className={`h-10 w-10 rounded-md border text-sm font-semibold transition ${
              rating === value ? "border-brand bg-brand text-slate-950" : "border-line bg-panel text-slate-300 hover:border-brand hover:text-brand"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
