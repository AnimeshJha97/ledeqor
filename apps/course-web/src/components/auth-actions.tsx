import { auth, signIn, signOut } from "@/auth";

export async function AuthActions() {
  const session = await auth();

  if (session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit" className="w-full rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
          Sign out
        </button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/courses" });
      }}
    >
      <button type="submit" className="w-full rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand">
        Sign in
      </button>
    </form>
  );
}
