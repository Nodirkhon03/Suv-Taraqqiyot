"use client";

import { useEffect } from "react";

/**
 * Pauses CSS drawing loops while a drawing is off-screen (saves CPU on long scrolls): sets `data-paused` on each
 * target that is out of view; the CSS rule `[data-paused] * { animation-play-state: paused }` does the rest.
 * Targets: one element by `targetId` (home hero) or every element matching `selector` (services drawings, home
 * service glyphs). Renders nothing; the drawings stay server-rendered SVG and are complete without this.
 */
export default function DrawingMotion({ targetId, selector }: { targetId?: string; selector?: string }) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els: Element[] = selector
      ? Array.from(document.querySelectorAll(selector))
      : targetId
        ? [document.getElementById(targetId)].filter((e): e is HTMLElement => e !== null)
        : [];
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [targetId, selector]);
  return null;
}
