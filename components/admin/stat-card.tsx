import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = false,
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "gap-0 p-6",
        accent && "border-primary/20 bg-primary/5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-md",
            accent
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
      {hint && <p className="mt-3 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}
