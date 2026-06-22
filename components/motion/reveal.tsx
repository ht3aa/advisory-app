"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Brand "settle" curve from globals.css (--ease-ips) — one confident curve, never bounce.
const EASE_IPS = [0.2, 0.8, 0.2, 1] as const;

type RevealTag = "div" | "section" | "ol" | "ul" | "li" | "dl" | "span" | "p";

type RevealProps = {
  children: ReactNode;
  /** Element rendered as the motion node — keeps semantics (e.g. "li" inside an "ol"). */
  as?: RevealTag;
  /** Stagger offset in seconds, typically index * step. */
  delay?: number;
  /** Vertical travel distance in px. Matches the brand ips-build pattern (~14px). */
  y?: number;
  className?: string;
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 16,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: EASE_IPS, delay }}
    >
      {children}
    </MotionTag>
  );
}
