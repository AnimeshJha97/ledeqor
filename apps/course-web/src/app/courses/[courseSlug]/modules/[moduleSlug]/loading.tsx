import { AppShell } from "@/components/app-shell";
import { ModuleDetailLoading } from "@/components/loading-state";

export default function Loading() {
  return (
    <AppShell>
      <ModuleDetailLoading />
    </AppShell>
  );
}
