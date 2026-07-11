import { MarketingPageLoading } from "@/components/loading-state";
import { MarketingShell } from "@/components/marketing-shell";

export default function Loading() {
  return (
    <MarketingShell>
      <MarketingPageLoading label="Loading course" />
    </MarketingShell>
  );
}
