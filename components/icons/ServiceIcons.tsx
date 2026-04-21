interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

const base = (size = 40, color = "#0B2B43") => ({
  width: size,
  height: size,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: color,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function WellDrillingIcon({ size, className, color }: IconProps) {
  return (
    <svg {...base(size, color)} className={className}>
      <path d="M20 4v20" />
      <path d="M14 10l6-6 6 6" />
      <path d="M16 24h8" />
      <path d="M17 24l-1 4h8l-1-4" />
      <path d="M18 32l-1 4M22 32l1 4" />
      {/* rotation lines */}
      <path d="M9 12c1.5-1 3-1 4-.5" opacity="0.5" />
      <path d="M31 12c-1.5-1-3-1-4-.5" opacity="0.5" />
    </svg>
  );
}

export function PipelineIcon({ size, className, color }: IconProps) {
  return (
    <svg {...base(size, color)} className={className}>
      <circle cx="12" cy="20" r="6" />
      <circle cx="12" cy="20" r="3" />
      <circle cx="28" cy="20" r="6" />
      <circle cx="28" cy="20" r="3" />
      <path d="M18 20h4" />
      <path d="M20 17l2 3-2 3" />
    </svg>
  );
}

export function WaterDistributionIcon({ size, className, color }: IconProps) {
  return (
    <svg {...base(size, color)} className={className}>
      <circle cx="20" cy="20" r="3" />
      <path d="M20 17V8" />
      <path d="M20 23v9" />
      <path d="M17 20H8" />
      <path d="M23 20h9" />
      <circle cx="8" cy="8" r="2" />
      <circle cx="32" cy="8" r="2" />
      <circle cx="8" cy="32" r="2" />
      <circle cx="32" cy="32" r="2" />
      <path d="M10 10l8 8M30 10l-8 8M10 30l8-8M30 30l-8-8" opacity="0.5" />
    </svg>
  );
}

export function WaterTowerIcon({ size, className, color }: IconProps) {
  return (
    <svg {...base(size, color)} className={className}>
      <rect x="14" y="8" width="12" height="10" rx="1" />
      <path d="M16 18v14M24 18v14" />
      <path d="M12 32h16" />
      <path d="M16 24h8" />
      <path d="M20 8V5" />
    </svg>
  );
}

export function CivilEngineeringIcon({ size, className, color }: IconProps) {
  return (
    <svg {...base(size, color)} className={className}>
      <path d="M4 24h32" />
      <path d="M8 24v-4c0-2 2-4 4-4h16c2 0 4 2 4 4v4" />
      <path d="M12 16v-3M28 16v-3" />
      <path d="M4 30h32" />
      <path d="M10 24v6M30 24v6" />
    </svg>
  );
}

export function SitePreparationIcon({ size, className, color }: IconProps) {
  return (
    <svg {...base(size, color)} className={className}>
      <path d="M4 30h32" />
      <path d="M8 30v-6h12v6" />
      <path d="M20 24l6-6 8 4v8H20" />
      <circle cx="12" cy="32" r="2" />
      <circle cx="28" cy="32" r="2" />
      <path d="M20 24l-4-4" />
    </svg>
  );
}
