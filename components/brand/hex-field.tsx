import { cn } from "@/lib/utils";

/**
 * Hex-network motif — the brand's secondary pattern for dark-green hero / cover
 * surfaces. Renders a hexagonal lattice (white hairlines) with a few emerald
 * "active nodes".
 *
 * Hard rule: the field never exceeds 8% opacity behind text. `opacity` is
 * clamped to ≤ 0.08. Server-Component-safe.
 */
const LATTICE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z'/%3E%3Cpath d='M28 66 L56 82 L56 116 L28 132 L0 116 L0 82 Z'/%3E%3C/g%3E%3C/svg%3E\")";

// Deterministic scatter of active nodes (top / inline-start in %, size in px).
const NODES = [
  { top: "14%", start: "9%", size: 5 },
  { top: "27%", start: "81%", size: 4 },
  { top: "51%", start: "21%", size: 6 },
  { top: "43%", start: "61%", size: 4 },
  { top: "71%", start: "45%", size: 5 },
  { top: "82%", start: "87%", size: 4 },
  { top: "63%", start: "13%", size: 4 },
] as const;

export function HexField({
  className,
  opacity = 0.06,
  nodes = true,
}: {
  className?: string;
  /** Lattice opacity; clamped to the ≤8% brand rule. */
  opacity?: number;
  nodes?: boolean;
}) {
  const safe = Math.min(Math.max(opacity, 0), 0.08);
  const nodeOpacity = Math.min(safe * 1.5, 0.08);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: LATTICE,
          backgroundSize: "56px 100px",
          opacity: safe,
        }}
      />
      {nodes && (
        <div className="absolute inset-0" style={{ opacity: nodeOpacity }}>
          {NODES.map((n, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-ips-emerald"
              style={{
                top: n.top,
                insetInlineStart: n.start,
                width: n.size,
                height: n.size,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
