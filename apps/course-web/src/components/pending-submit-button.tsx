"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type PendingSubmitButtonProps = {
  children: React.ReactNode;
  className: string;
  pendingLabel: string;
};

export function PendingSubmitButton({ children, className, pendingLabel }: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={`${className} disabled:cursor-wait disabled:opacity-70`}>
      {pending ? (
        <>
          <LoaderCircle aria-hidden="true" className="animate-spin" size={17} />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
