export default function HeroBackground() {
  const rows = 20;
  const gridSize = 20;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroBgBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2B43" />
          <stop offset="100%" stopColor="#071924" />
        </linearGradient>
        <pattern id="heroDotGrid" x="0" y="0" width="72" height="45" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="white" fillOpacity="0.03" />
        </pattern>
      </defs>

      <rect width="1440" height="900" fill="url(#heroBgBase)" />
      <rect width="1440" height="900" fill="url(#heroDotGrid)" />

      {Array.from({ length: rows }).map((_, i) => (
        <line
          key={`line-${i}`}
          x1="0"
          y1={(i + 1) * (900 / (rows + 1))}
          x2="1440"
          y2={(i + 1) * (900 / (rows + 1))}
          stroke="white"
          strokeOpacity="0.04"
          strokeWidth="1"
        />
      ))}

      <line x1="0" y1="0" x2="1440" y2="900" stroke="#2C86C7" strokeOpacity="0.06" strokeWidth="1" />
      <line x1="200" y1="0" x2="1640" y2="900" stroke="#2C86C7" strokeOpacity="0.05" strokeWidth="1" />
      <line x1="-200" y1="0" x2="1240" y2="900" stroke="#2C86C7" strokeOpacity="0.05" strokeWidth="1" />

      <circle cx="1200" cy="450" r="400" stroke="#24B5C6" strokeOpacity="0.05" strokeWidth="1" fill="none" />
      <circle cx="1200" cy="450" r="280" stroke="#24B5C6" strokeOpacity="0.06" strokeWidth="1" fill="none" />
      <circle cx="1200" cy="450" r="160" stroke="#24B5C6" strokeOpacity="0.08" strokeWidth="1" fill="none" />

      {/* subtle dot grid accent */}
      {Array.from({ length: gridSize }).map((_, i) =>
        Array.from({ length: 6 }).map((__, j) => (
          <circle
            key={`dot-${i}-${j}`}
            cx={120 + i * 60}
            cy={100 + j * 120}
            r="1"
            fill="white"
            fillOpacity="0.04"
          />
        ))
      )}
    </svg>
  );
}
