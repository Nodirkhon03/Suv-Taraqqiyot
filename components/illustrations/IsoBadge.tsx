interface IsoBadgeProps {
  standard: "9001" | "14001" | "45001";
  year: string;
  className?: string;
}

const accent = {
  "9001": "#2C86C7",
  "14001": "#22C55E",
  "45001": "#D8C7A2",
};

export default function IsoBadge({ standard, year, className = "" }: IsoBadgeProps) {
  const color = accent[standard];
  const arcText = `O'Z DST ISO ${standard}:${year} · AVVISO CERT · CERTIFIED`;

  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`ISO ${standard} certified`}
      className={className}
      role="img"
    >
      <defs>
        <path
          id={`iso-arc-${standard}`}
          d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
        />
      </defs>

      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" stroke="#0B2B43" strokeWidth="2" fill="white" />
      <circle cx="60" cy="60" r="52" stroke="#0B2B43" strokeWidth="0.5" fill="none" />

      {/* Arc text */}
      <text
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fill="#0B2B43"
        letterSpacing="1"
      >
        <textPath href={`#iso-arc-${standard}`} startOffset="2%">
          {arcText}
        </textPath>
      </text>

      {/* Inner ring */}
      <circle cx="60" cy="60" r="36" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" />

      {/* Gear */}
      <g transform="translate(60,60)" stroke={color} strokeWidth="1.5" fill="none">
        <circle r="14" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          const x1 = Math.cos(angle) * 14;
          const y1 = Math.sin(angle) * 14;
          const x2 = Math.cos(angle) * 20;
          const y2 = Math.sin(angle) * 20;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Center text */}
      <text
        x="60"
        y="56"
        fontSize="13"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fill="#0B2B43"
      >
        ISO
      </text>
      <text
        x="60"
        y="72"
        fontSize="9"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fill={color}
        fontWeight="600"
      >
        {standard}
      </text>
      <text
        x="60"
        y="84"
        fontSize="7"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fill="#64748B"
      >
        {year}
      </text>
    </svg>
  );
}
