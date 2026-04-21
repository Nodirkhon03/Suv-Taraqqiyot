export default function DrillingRig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      role="img"
    >
      {/* Sky */}
      <rect width="300" height="200" fill="#F1F5F9" />
      {/* Ground */}
      <rect y="200" width="300" height="200" fill="#E2E8F0" />

      {/* Underground layers */}
      <rect y="230" width="300" height="40" fill="#CBD5E1" />
      <rect y="270" width="300" height="50" fill="#94A3B8" />
      <rect y="320" width="300" height="40" fill="#64748B" />
      <rect y="360" width="300" height="40" fill="#475569" />

      {/* Surface line */}
      <line x1="0" y1="200" x2="300" y2="200" stroke="#0B2B43" strokeWidth="2" />

      {/* Water table */}
      <line
        x1="0"
        y1="300"
        x2="300"
        y2="300"
        stroke="#2C86C7"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <text x="10" y="296" fontSize="10" fill="#2C86C7" fontFamily="Inter, sans-serif">
        ~ water table
      </text>

      {/* Drill tower */}
      <g stroke="#0B2B43" strokeWidth="2" fill="none" strokeLinecap="round">
        <line x1="130" y1="40" x2="130" y2="200" />
        <line x1="170" y1="40" x2="170" y2="200" />
        <line x1="125" y1="40" x2="175" y2="40" />
        {/* Cross bracing */}
        <line x1="130" y1="70" x2="170" y2="100" />
        <line x1="170" y1="70" x2="130" y2="100" />
        <line x1="130" y1="110" x2="170" y2="140" />
        <line x1="170" y1="110" x2="130" y2="140" />
        <line x1="130" y1="150" x2="170" y2="180" />
        <line x1="170" y1="150" x2="130" y2="180" />
      </g>

      {/* Top sheave */}
      <circle cx="150" cy="48" r="8" fill="#24B5C6" stroke="#0B2B43" strokeWidth="1.5" />

      {/* Drill string */}
      <line
        x1="150"
        y1="56"
        x2="150"
        y2="380"
        stroke="#0B2B43"
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* Drill bit */}
      <polygon
        points="146,380 154,380 150,392"
        fill="#0B2B43"
      />

      {/* Depth markers */}
      <g fontFamily="Inter, sans-serif" fontSize="9" fill="#0B2B43">
        <line x1="220" y1="230" x2="230" y2="230" stroke="#0B2B43" strokeWidth="1" />
        <text x="236" y="233">100m</text>
        <line x1="220" y1="270" x2="230" y2="270" stroke="#0B2B43" strokeWidth="1" />
        <text x="236" y="273">300m</text>
        <line x1="220" y1="320" x2="230" y2="320" stroke="#0B2B43" strokeWidth="1" />
        <text x="236" y="323">600m</text>
        <line x1="220" y1="370" x2="230" y2="370" stroke="#0B2B43" strokeWidth="1" />
        <text x="236" y="373">1200m</text>
      </g>

      {/* Equipment cabin */}
      <rect x="60" y="170" width="50" height="30" fill="#D8C7A2" stroke="#0B2B43" strokeWidth="1.5" />
      <line x1="70" y1="175" x2="70" y2="195" stroke="#0B2B43" strokeWidth="1" />
      <line x1="100" y1="175" x2="100" y2="195" stroke="#0B2B43" strokeWidth="1" />
    </svg>
  );
}
