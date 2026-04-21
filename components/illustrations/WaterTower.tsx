export default function WaterTower({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      role="img"
    >
      {/* Tank */}
      <rect x="90" y="60" width="120" height="120" rx="6" fill="white" stroke="#0B2B43" strokeWidth="2.5" />
      {/* Water level inside tank */}
      <rect x="96" y="100" width="108" height="76" rx="3" fill="#24B5C6" opacity="0.85" />
      {/* Water surface wiggle */}
      <path d="M96 102 Q116 98 136 102 T176 102 T204 102" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Tank top cap */}
      <ellipse cx="150" cy="60" rx="60" ry="8" fill="#0B2B43" />

      {/* Ladder */}
      <g stroke="#0B2B43" strokeWidth="1.5">
        <line x1="215" y1="60" x2="215" y2="180" />
        <line x1="222" y1="60" x2="222" y2="180" />
        <line x1="215" y1="78" x2="222" y2="78" />
        <line x1="215" y1="96" x2="222" y2="96" />
        <line x1="215" y1="114" x2="222" y2="114" />
        <line x1="215" y1="132" x2="222" y2="132" />
        <line x1="215" y1="150" x2="222" y2="150" />
        <line x1="215" y1="168" x2="222" y2="168" />
      </g>

      {/* Legs */}
      <g stroke="#0B2B43" strokeWidth="2.5" fill="none">
        <line x1="100" y1="180" x2="80" y2="340" />
        <line x1="200" y1="180" x2="220" y2="340" />
        <line x1="125" y1="180" x2="115" y2="340" />
        <line x1="175" y1="180" x2="185" y2="340" />
      </g>

      {/* Cross-bracing */}
      <g stroke="#0B2B43" strokeWidth="1.5" fill="none">
        <line x1="80" y1="340" x2="220" y2="340" />
        <line x1="85" y1="300" x2="215" y2="300" />
        <line x1="85" y1="300" x2="215" y2="260" />
        <line x1="215" y1="300" x2="85" y2="260" />
      </g>

      {/* Ground line */}
      <line x1="40" y1="340" x2="260" y2="340" stroke="#0B2B43" strokeWidth="2" />
      {/* Grass dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <circle key={i} cx={40 + i * 11} cy="336" r="1" fill="#0B2B43" />
      ))}

      {/* Pipeline at base */}
      <line x1="140" y1="340" x2="140" y2="365" stroke="#0B2B43" strokeWidth="3" />
      <rect x="130" y="365" width="40" height="10" fill="#24B5C6" stroke="#0B2B43" strokeWidth="1.5" />
      <line x1="170" y1="370" x2="260" y2="370" stroke="#24B5C6" strokeWidth="4" />
      <line x1="170" y1="370" x2="260" y2="370" stroke="#0B2B43" strokeWidth="1" />

      {/* Valve */}
      <circle cx="200" cy="370" r="6" fill="white" stroke="#0B2B43" strokeWidth="1.5" />
      <line x1="200" y1="360" x2="200" y2="380" stroke="#0B2B43" strokeWidth="1.5" />
    </svg>
  );
}
