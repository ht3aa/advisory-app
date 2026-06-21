import { cn } from "@/lib/utils";

export type RequestStatus = "NEW" | "IN_REVIEW" | "ANSWERED" | "CLOSED";

/**
 * Status chips on a restrained brand ladder — no default-palette hues.
 *   NEW       → emerald accent (the one emerald moment: "needs attention")
 *   IN_REVIEW → green tonal ("in progress")
 *   ANSWERED  → green filled ("resolved")
 *   CLOSED    → neutral silver outline ("archived")
 */
export const REQUEST_STATUS_META: Record<
  RequestStatus,
  { label: string; className: string; dot: string }
> = {
  NEW: {
    label: "جديد",
    className:
      "border-transparent bg-ips-emerald/15 text-ips-green-deep dark:text-ips-emerald",
    dot: "bg-ips-emerald",
  },
  IN_REVIEW: {
    label: "قيد المراجعة",
    className: "border-ips-green/20 bg-ips-green/8 text-ips-green",
    dot: "bg-ips-green",
  },
  ANSWERED: {
    label: "تمت الإجابة",
    className: "border-transparent bg-ips-green text-ips-white",
    dot: "bg-ips-white/80",
  },
  CLOSED: {
    label: "مغلق",
    className: "border-border bg-muted text-muted-foreground",
    dot: "bg-ips-gray",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: RequestStatus;
  className?: string;
}) {
  const meta = REQUEST_STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
        meta.className,
        className
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}
