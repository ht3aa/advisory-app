import { cn } from "@/lib/utils";

export type RequestStatus = "NEW" | "IN_REVIEW" | "ANSWERED" | "CLOSED";

export const REQUEST_STATUS_META: Record<
  RequestStatus,
  { label: string; className: string }
> = {
  NEW: {
    label: "جديد",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  IN_REVIEW: {
    label: "قيد المراجعة",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  ANSWERED: {
    label: "تمت الإجابة",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  CLOSED: {
    label: "مغلق",
    className: "bg-muted text-muted-foreground border-border",
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
        "inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        meta.className,
        className
      )}
    >
      {meta.label}
    </span>
  );
}
