import { LoaderCircle } from "lucide-react";

type SkeletonProps = {
  className?: string;
};

type MarketingPageLoadingProps = {
  label?: string;
  centered?: boolean;
  cards?: number;
};

type CourseLoadingProps = {
  label?: string;
};

function Skeleton({ className = "" }: SkeletonProps) {
  return <div aria-hidden="true" className={`animate-pulse rounded-md bg-slate-800/80 ${className}`} />;
}

function LoadingMarker({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-xs font-semibold uppercase text-brand">
      <LoaderCircle aria-hidden="true" className="animate-spin" size={14} />
      <span>{label}</span>
    </div>
  );
}

export function RootLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 text-ink" aria-busy="true" aria-live="polite">
      <div className="w-full max-w-md rounded-md border border-line bg-surface p-6 shadow-soft">
        <LoadingMarker label="Loading" />
        <Skeleton className="mt-6 h-7 w-3/4" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
        <div className="mt-6 grid gap-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export function MarketingPageLoading({ label = "Loading page", centered = false, cards = 3 }: MarketingPageLoadingProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-busy="true" aria-live="polite">
      <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
        <LoadingMarker label={label} />
        <Skeleton className={centered ? "mx-auto mt-6 h-10 w-5/6 sm:h-12" : "mt-6 h-10 w-5/6 sm:h-12"} />
        <Skeleton className={centered ? "mx-auto mt-4 h-4 w-full max-w-2xl" : "mt-4 h-4 w-full max-w-2xl"} />
        <Skeleton className={centered ? "mx-auto mt-2 h-4 w-4/5 max-w-xl" : "mt-2 h-4 w-4/5 max-w-xl"} />
      </div>

      <div className={`mt-9 grid gap-4 ${cards > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {Array.from({ length: cards }, (_, index) => (
          <div key={index} className="rounded-md border border-line bg-surface p-5 shadow-sm">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="mt-5 h-5 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CourseWorkspaceLoading({ label = "Loading workspace" }: CourseLoadingProps) {
  return (
    <div aria-busy="true" aria-live="polite">
      <LoadingMarker label={label} />
      <section className="mt-5 rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <Skeleton className="h-4 w-44" />
            <Skeleton className="mt-4 h-9 w-full max-w-2xl" />
            <Skeleton className="mt-3 h-4 w-full max-w-3xl" />
            <Skeleton className="mt-2 h-4 w-4/5 max-w-2xl" />
          </div>
          <div className="rounded-md border border-line bg-panel p-5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-5 h-8 w-24" />
            <Skeleton className="mt-4 h-2 w-full rounded-full" />
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-md border border-line bg-surface p-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="mt-4 h-4 w-4/5" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ModuleListLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <LoadingMarker label="Loading modules" />
      <div className="mt-5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="mt-4 h-9 w-full max-w-2xl" />
        <Skeleton className="mt-3 h-4 w-full max-w-3xl" />
      </div>

      <div className="mt-6 rounded-md border border-line bg-surface p-5 shadow-sm">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="mt-4 h-4 w-full max-w-xl" />
        <Skeleton className="mt-5 h-10 w-40" />
      </div>

      <div className="mt-6 grid gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="rounded-md border border-line bg-surface p-5 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-3 h-6 w-full max-w-lg" />
                <Skeleton className="mt-3 h-4 w-full max-w-3xl" />
                <Skeleton className="mt-2 h-4 w-4/5 max-w-2xl" />
                <Skeleton className="mt-4 h-2 w-full max-w-sm rounded-full" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ModuleDetailLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <LoadingMarker label="Loading module" />
      <Skeleton className="mt-5 h-5 w-36" />
      <section className="mt-5 rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-4 h-9 w-full max-w-2xl" />
        <Skeleton className="mt-4 h-4 w-full max-w-3xl" />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="rounded-md border border-line bg-panel p-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="mt-3 h-5 w-20" />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden h-fit rounded-md border border-line bg-surface p-5 shadow-sm xl:block">
          <Skeleton className="h-5 w-32" />
          <div className="mt-4 grid gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        </aside>
        <div className="grid min-w-0 gap-6">
          <Skeleton className="h-32 w-full" />
          <ArticleSkeleton />
        </div>
      </div>
    </div>
  );
}

export function LectureLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <LoadingMarker label="Loading lecture" />
      <Skeleton className="mt-5 h-5 w-36" />
      <section className="mt-5 rounded-md border border-line bg-surface p-5 shadow-soft sm:p-8">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="mt-4 h-10 w-full max-w-3xl" />
        <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
        <div className="mt-6 grid gap-2 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-11 w-full" />
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <ArticleSkeleton />
        <aside className="grid h-fit gap-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="rounded-md border border-line bg-surface p-4">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

export function PracticeLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <LoadingMarker label="Loading practice" />
      <Skeleton className="mt-5 h-5 w-36" />
      <section className="mt-5 rounded-md border border-line bg-surface p-6 shadow-soft sm:p-8">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="mt-4 h-9 w-full max-w-2xl" />
        <Skeleton className="mt-4 h-4 w-full max-w-3xl" />
      </section>
      <div className="mt-6 grid gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="rounded-md border border-line bg-surface p-5 shadow-sm">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-4 h-7 w-64 max-w-full" />
            <Skeleton className="mt-5 h-24 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CapstoneLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <CourseWorkspaceLoading label="Loading capstone" />
      <div className="mt-6 grid gap-5">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="rounded-md border border-line bg-surface p-5 shadow-sm">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-7 w-full max-w-lg" />
            <Skeleton className="mt-4 h-4 w-full max-w-3xl" />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VisualsLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <CourseWorkspaceLoading label="Loading visuals" />
      <div className="mt-6 grid gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <section key={index} className="rounded-md border border-line bg-surface p-5 shadow-sm sm:p-6">
            <Skeleton className="h-5 w-52" />
            <Skeleton className="mt-4 h-7 w-full max-w-xl" />
            <Skeleton className="mt-4 h-64 w-full" />
          </section>
        ))}
      </div>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <section className="min-w-0 overflow-hidden rounded-md border border-line bg-surface p-5 shadow-sm sm:p-8">
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="mt-6 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-5/6" />
      <Skeleton className="mt-8 h-6 w-1/2" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-11/12" />
      <Skeleton className="mt-3 h-4 w-3/4" />
      <Skeleton className="mt-8 h-32 w-full" />
    </section>
  );
}
