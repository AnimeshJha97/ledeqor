"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Status = "not_started" | "reading" | "done" | "needs_revision";

export function LectureCompleteBar({
  courseSlug,
  moduleSlug,
  lectureId,
  initialStatus = "not_started",
  initialRating
}: {
  courseSlug: string;
  moduleSlug: string;
  lectureId: string;
  initialStatus?: Status;
  initialRating?: number;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [rating, setRating] = useState(initialRating ?? 0);
  const [isPending, startTransition] = useTransition();
  const done = status === "done";

  function toggleDone() {
    const nextStatus: Status = done ? "not_started" : "done";
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

  function rate(value: number) {
    setRating(value);
    startTransition(async () => {
      await fetch("/api/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "self_rating",
          courseSlug,
          moduleSlug,
          lectureId,
          rating: value
        })
      });
    });
  }

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-md border border-line bg-panel px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        disabled={isPending}
        onClick={toggleDone}
        className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition ${
          done
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
            : "border-line bg-surface text-slate-300 hover:border-brand hover:text-brand"
        }`}
      >
        {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
        {done ? `Lecture ${lectureId} done` : `Mark lecture ${lectureId} done`}
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Confidence</span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              disabled={isPending}
              onClick={() => rate(value)}
              aria-label={`Rate confidence ${value} of 5`}
              className={`h-8 w-8 rounded-md border text-xs font-semibold transition ${
                rating === value
                  ? "border-brand bg-brand text-slate-950"
                  : "border-line bg-surface text-slate-300 hover:border-brand hover:text-brand"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
