"use client";

import { useEffect, useState, type ReactNode } from "react";

type Token = {
  text: string;
  emerald?: boolean;
};

const LINE_1 = "المرجع الفني المستقل";
const LINE_2_TOKENS: Token[] = [
  { text: "لصناعة البرمجيات", emerald: true },
  { text: " في العراق" },
];

const FULL_TEXT =
  LINE_1 + LINE_2_TOKENS.map((token) => token.text).join("");

const BASE_SPEED = 52;
const VARIANCE = 0.35;

function randomDelay(base: number) {
  const spread = base * VARIANCE;
  return base + (Math.random() * 2 - 1) * spread;
}

function TypewriterCursor() {
  return (
    <span
      aria-hidden
      className="hero-typewriter-cursor ms-1 inline-block h-[0.85em] w-0.5 translate-y-px bg-ips-emerald align-middle"
    />
  );
}

function renderLine2(visibleCount: number): ReactNode[] {
  let remaining = Math.max(0, visibleCount - LINE_1.length);
  const nodes: ReactNode[] = [];

  for (const [index, token] of LINE_2_TOKENS.entries()) {
    if (remaining <= 0) break;

    const slice = token.text.slice(0, remaining);
    remaining -= slice.length;

    if (!slice) continue;

    nodes.push(
      <span
        key={index}
        className={token.emerald ? "text-ips-emerald" : undefined}
      >
        {slice}
      </span>
    );
  }

  return nodes;
}

export function HeroTypewriter() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setVisibleCount(FULL_TEXT.length);
      setShowCursor(false);
      return;
    }

    let index = 0;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (cancelled) return;

      index += 1;
      setVisibleCount(index);

      if (index >= FULL_TEXT.length) return;

      timeout = setTimeout(typeNext, randomDelay(BASE_SPEED));
    };

    timeout = setTimeout(typeNext, 280);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  const line1 = LINE_1.slice(0, Math.min(visibleCount, LINE_1.length));
  const line2Nodes = renderLine2(visibleCount);
  const cursorOnLine1 = showCursor && visibleCount < LINE_1.length;

  return (
    <h1
      className="mt-7 min-h-[2.6em] text-balance text-h1 font-semibold lg:min-h-[2.2em]"
      aria-label={FULL_TEXT}
    >
      <span className="block" aria-hidden>
        {line1}
        {cursorOnLine1 ? <TypewriterCursor /> : null}
      </span>
      <span className="mt-1 block" aria-hidden>
        {line2Nodes}
        {showCursor && !cursorOnLine1 ? <TypewriterCursor /> : null}
      </span>
    </h1>
  );
}
