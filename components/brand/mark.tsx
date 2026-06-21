import { cn } from "@/lib/utils";

/**
 * The Resolved Mark — Advisory Office, Iraqi Programmers Syndicate.
 *
 * Construction (Brand Identity System Vol. 01): a hexagon inscribed in the
 * construction circle (the Round City of Baghdad, 762 CE) with a central 60°
 * slash — the code "/". Chevron interval 90°, slash angle 60°, aspect 1:1
 * locked, stroke = 6.25% of width (4 / 64). Single-tone: the slash always
 * matches the mark and is never recoloured. No gradients, no shadows, no
 * rotation, no distortion. Server-Component-safe (no hooks, no "use client").
 *
 * Variants follow the brand's monochrome set (guideline /23).
 */
export type MarkVariant =
  | "primary" // green on white
  | "reversed" // white on green
  | "black" // one-colour print
  | "white" // knockout on dark
  | "silver" // emboss / deboss
  | "mono"; // inherit currentColor from the caller

const variantTone: Record<MarkVariant, string> = {
  primary: "text-ips-green",
  reversed: "text-ips-white",
  black: "text-ips-ink",
  white: "text-ips-white",
  silver: "text-ips-silver",
  mono: "",
};

export function Mark({
  className,
  variant = "primary",
  title,
  decorative = false,
  viewTransitionName,
}: {
  className?: string;
  variant?: MarkVariant;
  title?: string;
  /** When true, hidden from assistive tech (use when a sibling label exists). */
  decorative?: boolean;
  /** Opt-in shared-element name for cross-route view transitions. */
  viewTransitionName?: string;
}) {
  const labelled = !decorative;
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("size-8 shrink-0", variantTone[variant], className)}
      style={viewTransitionName ? { viewTransitionName } : undefined}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? (title ?? "نقابة المبرمجين العراقيين") : undefined}
      aria-hidden={decorative || undefined}
    >
      {labelled && title ? <title>{title}</title> : null}
      {/* Hexagon — the Round City field */}
      <path
        d="M32 3.5 L56.7 17.75 V46.25 L32 60.5 L7.3 46.25 V17.75 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Central 60° slash — the code "/" (never recoloured) */}
      <path
        d="M39 20 L25 44"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
