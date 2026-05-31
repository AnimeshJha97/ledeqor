import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { auth, signIn } from "@/auth";
import { claimFounderFreeAccess } from "@/app/courses/[courseSlug]/actions";
import { getCourseEntitlement, hasMinimumAccess } from "@/server/entitlements/course-entitlement-repository";

export async function CourseAccessCta({ courseSlug }: { courseSlug: string }) {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: `/courses/${courseSlug}?claim=founder-free` });
        }}
      >
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto">
          Claim Founder Free Access <ArrowRight size={17} />
        </button>
      </form>
    );
  }

  const entitlement = await getCourseEntitlement(session.user.id, courseSlug);

  if (hasMinimumAccess(entitlement, "free")) {
    return (
      <Link href="/my-learning" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto">
        Open My Learning <ArrowRight size={17} />
      </Link>
    );
  }

  return (
    <form action={claimFounderFreeAccess.bind(null, courseSlug)}>
      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto">
        Claim Founder Free Access <LockKeyhole size={17} />
      </button>
    </form>
  );
}
