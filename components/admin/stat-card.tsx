import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { HexField } from "@/components/brand/hex-field";

/**
 * Data card — the brand workhorse (guideline /21). Big mono numeral, small
 * label, optional trend. `accent` switches to the dark-green feature variant.
 *
 * Bilingual note: the value is always mono (numerals are universal). Arabic
 * labels render in clean sans — the mono-uppercase treatment is for Latin/data
 * and would mangle Arabic shaping. Pass `labelEn` for an optional mono caption.
 */
export function StatCard({
  label,
  labelEn,
  value,
  icon: Icon,
  hint,
  trend,
  accent = false,
  className,
}: {
  label: string;
  labelEn?: string;
  value: string | number;
  icon?: LucideIcon;
  hint?: string;
  trend?: { value: string; direction: "up" | "down" };
  accent?: boolean;
  className?: string;
}) {
  const TrendIcon = trend?.direction === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div
      className={cn(
        "relative isolate flex flex-col gap-0 overflow-hidden rounded-[var(--radius-ips)] border p-6",
        accent
          ? "border-transparent bg-ips-green text-ips-white"
          : "border-border bg-card text-card-foreground",
        className
      )}
    >
      {accent && <HexField opacity={0.06} />}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p
            className={cn(
              "text-sm font-medium",
              accent ? "text-ips-white/70" : "text-muted-foreground"
            )}
          >
            {label}
          </p>
          {labelEn && (
            <span
              className={cn(
                "label-mono",
                accent ? "text-ips-white/45" : "text-muted-foreground/55"
              )}
            >
              {labelEn}
            </span>
          )}
        </div>

        {Icon && (
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-ips)]",
              accent
                ? "bg-ips-white/10 text-ips-emerald"
                : "bg-ips-green/8 text-ips-green"
            )}
          >
            <Icon className="size-5" strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="relative mt-4 flex items-end justify-between gap-3">
        <span
          className={cn(
            "numeral text-4xl leading-none tracking-tight",
            accent ? "text-ips-white" : "text-foreground"
          )}
        >
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "mb-0.5 inline-flex items-center gap-1 text-xs font-medium",
              trend.direction === "down"
                ? "text-destructive"
                : accent
                  ? "text-ips-emerald"
                  : "text-ips-green"
            )}
          >
            <TrendIcon className="size-3.5" strokeWidth={2.4} />
            <span className="numeral">{trend.value}</span>
          </span>
        )}
      </div>

      {hint && (
        <p
          className={cn(
            "relative mt-3 text-xs",
            accent ? "text-ips-white/55" : "text-muted-foreground"
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
