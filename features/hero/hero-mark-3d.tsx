"use client";

import dynamic from "next/dynamic";

import { Mark } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

/**
 * Loading / no-WebGL fallback — the flat knockout mark with the card's glow.
 */
function MarkFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Mark
        variant="white"
        decorative
        className="hero-mark-glow__mark size-44 opacity-90"
      />
    </div>
  );
}

const Scene = dynamic(() => import("@/features/hero/hero-mark-3d-scene"), {
  ssr: false,
  loading: () => <MarkFallback />,
});

export function HeroMark3D({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0", className)}>
      <Scene />
    </div>
  );
}
