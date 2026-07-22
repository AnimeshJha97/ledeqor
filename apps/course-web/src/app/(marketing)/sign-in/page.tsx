import type { Metadata } from "next";
import { AuthActions } from "@/components/auth-actions";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Ledeqor with Google."
};

function getSafeRedirectPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/courses";
  }

  return value;
}

export default async function SignInPage({ searchParams }: { searchParams?: Promise<{ next?: string }> }) {
  const params = await searchParams;
  const redirectTo = getSafeRedirectPath(params?.next);

  return (
    <>
      <section className="mx-auto flex min-h-[60vh] max-w-xl items-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="w-full rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Welcome back</p>
          <h1 className="mt-3 text-3xl font-semibold text-ink">Sign in to continue learning.</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Google sign-in will power course progress, practice history, and future personalized learning.
          </p>
          <div className="mt-6">
            <AuthActions redirectTo={redirectTo} />
          </div>
        </div>
      </section>
    </>
  );
}
