"use client";

/*
 * Starts the credit's signing moment once, the first time the credit is fully in view, so phones
 * (which never hover) see it too. Sets data-play on the credit's root for the length of the
 * moment, then removes it so the next hover can replay it. Does nothing under reduced motion.
 */
import { useEffect, useRef } from "react";

const MOMENT_MS = 4400; // the strike, the signature and the new star, then back to rest

export function SignOnView() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        root.setAttribute("data-play", "");
        timer = window.setTimeout(() => root.removeAttribute("data-play"), MOMENT_MS);
      },
      { threshold: 0.9 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return <span ref={ref} hidden />;
}
