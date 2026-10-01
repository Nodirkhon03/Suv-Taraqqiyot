"use client";

import { useEffect } from "react";

/**
 * Pauses the hero drawing's CSS loops while the drawing is off-screen (saves CPU on long scrolls).
 * Renders nothing; the drawing itself stays a server-rendered SVG and is complete without this.
 */
export default function DrawingMotion({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);
  return null;
}
