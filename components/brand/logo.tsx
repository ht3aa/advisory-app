import { cn } from "@/lib/utils";

/**
 * The Resolved Mark — Advisory Office.
 * Construction: hexagon (round-city chevron field) + 60° slash (the code "/").
 * Aspect ratio locked 1:1.
 */
export function LogoMark({
  className,
  title = "المكتب الاستشاري",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("size-8", className)}
      fill="none"
    >
      <path
        d="M32 3.5 L56.7 17.75 V46.25 L32 60.5 L7.3 46.25 V17.75 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M39 20 L25 44"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
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
          <span className="text-[15px] font-bold tracking-tight text-foreground">
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
