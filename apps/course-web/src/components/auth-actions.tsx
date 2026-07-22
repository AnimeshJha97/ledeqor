import { auth, signIn, signOut } from "@/auth";
import { PendingSubmitButton } from "@/components/pending-submit-button";

export async function AuthActions({ redirectTo = "/courses" }: { redirectTo?: string } = {}) {
  const session = await auth();

  if (session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <PendingSubmitButton pendingLabel="Signing out" className="inline-flex min-w-24 w-full items-center justify-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
          Sign out
        </PendingSubmitButton>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo });
      }}
    >
      <PendingSubmitButton pendingLabel="Signing in" className="inline-flex min-w-24 w-full items-center justify-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
        Sign in
      </PendingSubmitButton>
    </form>
  );
}
