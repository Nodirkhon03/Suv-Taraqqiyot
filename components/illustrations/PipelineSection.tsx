export default function PipelineSection({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      role="img"
    >
      {/* Sky */}
      <rect width="400" height="80" fill="#F1F5F9" />
      {/* Surface line */}
      <line x1="0" y1="80" x2="400" y2="80" stroke="#0B2B43" strokeWidth="2" />
      {/* Surface texture dots */}
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={i} cx={i * 14 + 5} cy="75" r="1" fill="#0B2B43" />
      ))}

      {/* Trench — backfill */}
      <path d="M120 80 L150 260 L250 260 L280 80 Z" fill="#D8C7A2" opacity="0.6" />

      {/* Sand bedding */}
      <path d="M170 230 L230 230 L250 260 L150 260 Z" fill="#D8C7A2" />

      {/* Surrounding earth */}
      <rect y="80" width="120" height="220" fill="#94A3B8" />
      <rect x="280" y="80" width="120" height="220" fill="#94A3B8" />

      {/* Pipe cross-section */}
      <circle cx="200" cy="200" r="40" fill="#24B5C6" />
      <circle cx="200" cy="200" r="40" stroke="#0B2B43" strokeWidth="2" fill="none" />
      <circle cx="200" cy="200" r="34" stroke="#0B2B43" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Flow arrow */}
      <path
        d="M190 200 L210 200 M204 194 L210 200 L204 206"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Diameter dimension */}
      <g stroke="#0B2B43" strokeWidth="1" fill="none">
        <line x1="200" y1="155" x2="200" y2="245" strokeDasharray="3 2" />
        <line x1="195" y1="160" x2="205" y2="160" />
        <line x1="195" y1="240" x2="205" y2="240" />
      </g>
      <text
        x="215"
        y="203"
        fontSize="11"
        fontFamily="Inter, sans-serif"
        fill="#0B2B43"
        fontWeight="600"
      >
        DN1200
      </text>

      {/* Depth dimension */}
      <g stroke="#0B2B43" strokeWidth="1" fill="none">
        <line x1="70" y1="80" x2="70" y2="260" strokeDasharray="3 2" />
        <line x1="65" y1="80" x2="75" y2="80" />
        <line x1="65" y1="260" x2="75" y2="260" />
      </g>
      <text
        x="10"
        y="175"
        fontSize="11"
        fontFamily="Inter, sans-serif"
        fill="#0B2B43"
        fontWeight="600"
      >
        2.0 m
      </text>

      {/* Labels */}
      <text x="20" y="100" fontSize="9" fill="#0B2B43" fontFamily="Inter, sans-serif">
        Backfill
      </text>
      <text x="178" y="290" fontSize="9" fill="#0B2B43" fontFamily="Inter, sans-serif">
        Sand bedding
      </text>
    </svg>
  );
}
