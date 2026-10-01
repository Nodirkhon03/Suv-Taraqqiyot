/**
 * Shared parts for the five services-page drawings (light drafting grid, see app/globals.css "service drawings").
 * Line language: navy = structure, blue = dimensions and leaders, cyan = water only, sand = ground and fill,
 * light grey stipple = concrete, navy = rebar. Text is IBM Plex Mono at 14 user units (≥ 12 px at 1440 and on phones).
 * Every id is prefixed per drawing so five SVGs can share one page.
 */
import type { ReactNode } from "react";

export type DwgText = Record<string, string>;

/** Rounds a computed coordinate so the server HTML stays short and stable. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Patterns and markers, ids prefixed with `p`. */
export function Defs({ p, children }: { p: string; children?: ReactNode }) {
  return (
    <defs>
      {/* dimension arrow (blue, open) */}
      <marker id={`${p}-ar`} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 L10 5 L0 9" className="sd-mk" />
      </marker>
      {/* flow arrow (cyan, filled) */}
      <marker id={`${p}-fa`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" className="sd-mkw" />
      </marker>
      {/* natural ground: 45° hatch */}
      <pattern id={`${p}-earth`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="7" className="sd-hatch" />
      </pattern>
      {/* sand: fine stipple */}
      <pattern id={`${p}-sand`} width="9" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r=".85" className="sd-dot" />
        <circle cx="6.5" cy="6" r=".75" className="sd-dot" />
      </pattern>
      {/* excavated soil used as backfill: dots and short strokes */}
      <pattern id={`${p}-soil`} width="16" height="12" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1" className="sd-dot" />
        <path d="M9 8 l4 -2" className="sd-hatch" />
        <circle cx="12" cy="11" r=".7" className="sd-dot" />
      </pattern>
      {/* gravel / crushed stone: open circles */}
      <pattern id={`${p}-grav`} width="12" height="10" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.9" className="sd-gv" />
        <circle cx="9" cy="7.5" r="1.4" className="sd-gv" />
      </pattern>
      {/* concrete: grey stipple with small aggregate triangles */}
      <pattern id={`${p}-conc`} width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="3" r=".8" className="sd-cdot" />
        <circle cx="9" cy="2" r=".6" className="sd-cdot" />
        <circle cx="5" cy="10" r=".7" className="sd-cdot" />
        <path d="M10 9 l2.4 3.6 h-4.2 Z" className="sd-ctri" />
      </pattern>
      {/* clay: short horizontal dashes */}
      <pattern id={`${p}-clay`} width="14" height="7" patternUnits="userSpaceOnUse">
        <line x1="0" y1="2" x2="8" y2="2" className="sd-hatch" />
        <line x1="7" y1="5.5" x2="14" y2="5.5" className="sd-hatch" />
      </pattern>
      {/* loam: sparse hatch with dots */}
      <pattern id={`${p}-loam`} width="14" height="12" patternUnits="userSpaceOnUse">
        <path d="M1 11 L7 5" className="sd-hatch" />
        <circle cx="11" cy="4" r=".9" className="sd-dot" />
      </pattern>
      {children}
    </defs>
  );
}

/** Leader: polyline from the object (dot) to the label. */
export function Leader({ d, x, y }: { d: string; x: number; y: number }) {
  return (
    <g className="sd-ld">
      <path d={d} />
      <circle cx={x} cy={y} r="1.9" />
    </g>
  );
}

/** Text that may wrap onto a second line at "\n". */
export function Txt({
  x,
  y,
  children,
  anchor,
  className,
  lh = 17,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  className?: string;
  lh?: number;
}) {
  const lines = (children ?? "").split("\n");
  if (lines.length === 1)
    return (
      <text x={x} y={y} textAnchor={anchor} className={className}>
        {children}
      </text>
    );
  return (
    <text x={x} y={y} textAnchor={anchor} className={className}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i ? lh : 0}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

/** Item balloon (circled number) as on a general-arrangement drawing. */
export function Balloon({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g className="sd-bal">
      <circle cx={x} cy={y} r="10" />
      <text x={x} y={y + 5} textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

/** Pipe in elevation: navy walls, white bore. Water is drawn separately. */
export function Pipe({ d, w }: { d: string; w: number }) {
  return (
    <>
      <path className="sd-pipe" d={d} strokeWidth={w} />
      <path className="sd-bore" d={d} strokeWidth={w - 3} />
    </>
  );
}

/** Water inside a pipe: cyan core (static) + white dashes that move in the drawn direction (motion only). */
export function Water({ d, w = 3, flow }: { d: string; w?: number; flow?: string }) {
  return (
    <>
      <path className="sd-wc" d={d} strokeWidth={w} />
      {flow && <path className={`sd-fl ${flow}`} d={d} strokeWidth={w} />}
    </>
  );
}

/** Gate valve (bow-tie, stem, handwheel) on a horizontal pipe. */
export function GateValve({ x, y, s = 8 }: { x: number; y: number; s?: number }) {
  return (
    <g className="sd-vv">
      <path d={`M${x - s} ${y - s * 0.8} L${x + s} ${y + s * 0.8} V${y - s * 0.8} L${x - s} ${y + s * 0.8} Z`} />
      <path className="sd-stem" d={`M${x} ${y} V${y - s * 1.9} M${x - s * 0.8} ${y - s * 1.9} H${x + s * 0.8}`} />
    </g>
  );
}

/** Level marker ∇ with its apex on the level line. */
export function LevelMark({ x, y }: { x: number; y: number }) {
  return <path className="sd-tri" d={`M${x - 5} ${y - 8} H${x + 5} L${x} ${y} Z`} />;
}
