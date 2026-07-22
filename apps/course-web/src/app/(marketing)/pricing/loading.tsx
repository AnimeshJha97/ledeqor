import { MarketingPageLoading } from "@/components/loading-state";

export default function Loading() {
  return (
    <>
      <MarketingPageLoading label="Loading pricing" centered cards={1} />
    </>
  );
}
