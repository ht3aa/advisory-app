import { cn } from "@/lib/utils";
import { Mark } from "@/components/brand/mark";

/**
 * Back-compat wrapper around <Mark>. Existing call sites pass color via
 * className (e.g. text-primary / text-ips-emerald), so we use the `mono`
 * tone and let the caller drive currentColor.
 */
export function LogoMark({
  className,
  title = "المكتب الاستشاري",
}: {
  className?: string;
  title?: string;
}) {
  return <Mark variant="mono" className={cn("size-8", className)} title={title} />;
}

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-9 text-primary" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            المكتب الاستشاري
          </span>
          <span className="label-mono mt-1 text-muted-foreground">
            IRAQI PROGRAMMERS SYNDICATE
          </span>
        </span>
      )}
    </span>
  );
}
