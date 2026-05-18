import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md rounded-md border border-line bg-surface p-8 text-center shadow-soft">
        <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
        <p className="mt-3 text-muted">This course page does not exist yet.</p>
        <Link href="/" className="mt-6 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
