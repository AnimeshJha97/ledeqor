"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { claimFounderFreeAccess } from "@/app/courses/[courseSlug]/actions";
import { PendingSubmitButton } from "@/components/pending-submit-button";

type FounderFreeClaimButtonProps = {
  courseSlug?: string;
  className?: string;
  label?: string;
  claimedLabel?: string;
};

const defaultClassName =
  "inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto";

const accessStateRequests = new Map<string, Promise<boolean>>();

function loadProAccessState(courseSlug: string) {
  const cached = accessStateRequests.get(courseSlug);

  if (cached) {
    return cached;
  }

  const request = fetch(`/api/me/course-access?courseSlug=${encodeURIComponent(courseSlug)}`, {
    cache: "no-store"
  })
    .then(async (response) => {
      if (!response.ok) {
        return false;
      }

      const data = (await response.json()) as { hasProAccess?: boolean };
      return Boolean(data.hasProAccess);
    })
    .catch(() => false);

  accessStateRequests.set(courseSlug, request);
  return request;
}

export function FounderFreeClaimButton({
  courseSlug = "ai-engineer-guide",
  className = defaultClassName,
  label = "Claim Founder Free",
  claimedLabel = "Open My Learning"
}: FounderFreeClaimButtonProps) {
  const [hasProAccess, setHasProAccess] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadAccessState() {
      const hasAccess = await loadProAccessState(courseSlug);

      if (active) {
        setHasProAccess(hasAccess);
      }
    }

    loadAccessState();

    return () => {
      active = false;
    };
  }, [courseSlug]);

  if (hasProAccess) {
    return (
      <Link href="/my-learning" className={className}>
        {claimedLabel} <ArrowRight size={16} />
      </Link>
    );
  }

  return (
    <form action={claimFounderFreeAccess.bind(null, courseSlug)}>
      <PendingSubmitButton pendingLabel="Activating access" className={className}>
        {label} <ArrowRight size={16} />
      </PendingSubmitButton>
    </form>
  );
}
