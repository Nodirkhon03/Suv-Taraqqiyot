"use client";

import { useEffect } from "react";
import { useCountUp, useInViewOnce } from "@/lib/animations";

interface AnimatedStatProps {
  value: string;
  label: string;
  desc?: string;
  className?: string;
}

function parseStat(value: string): { prefix: string; number: number; suffix: string } | null {
  const match = value.match(/^([^\d]*)([\d,.\s]+)(.*)$/);
  if (!match) return null;
  const prefix = match[1];
  const numberStr = match[2].replace(/[,\s]/g, "");
  const number = parseFloat(numberStr);
  if (Number.isNaN(number)) return null;
  return { prefix, number, suffix: match[3] };
}

function formatNumber(n: number, original: string): string {
  if (original.includes(",")) return n.toLocaleString("en-US");
  if (original.includes(" ")) return n.toLocaleString("ru-RU");
  return String(n);
}

export default function AnimatedStat({ value, label, desc, className }: AnimatedStatProps) {
  const parsed = parseStat(value);
  const target = parsed ? parsed.number : 0;
  const { count, setStarted } = useCountUp(target, 1600);
  const { ref, inView } = useInViewOnce();

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView, setStarted]);

  const rendered = parsed
    ? `${parsed.prefix}${formatNumber(count, parsed.number.toString())}${parsed.suffix}`
    : value;

  return (
    <div ref={ref} className={className}>
      <p className="text-3xl sm:text-4xl font-bold text-navy">{rendered}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">{label}</p>
      {desc && <p className="mt-0.5 text-sm text-gray-500">{desc}</p>}
    </div>
  );
}
