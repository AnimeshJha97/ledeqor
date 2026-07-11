import { AppShell } from "@/components/app-shell";
import { LectureLoading } from "@/components/loading-state";

export default function Loading() {
  return (
    <AppShell>
      <LectureLoading />
    </AppShell>
  );
}
