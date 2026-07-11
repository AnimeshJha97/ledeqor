import { AppShell } from "@/components/app-shell";
import { ModuleListLoading } from "@/components/loading-state";

export default function Loading() {
  return (
    <AppShell>
      <ModuleListLoading />
    </AppShell>
  );
}
