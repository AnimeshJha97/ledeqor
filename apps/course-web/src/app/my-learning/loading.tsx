import { AppShell } from "@/components/app-shell";
import { CourseWorkspaceLoading } from "@/components/loading-state";

export default function Loading() {
  return (
    <AppShell>
      <CourseWorkspaceLoading label="Loading learning" />
    </AppShell>
  );
}
