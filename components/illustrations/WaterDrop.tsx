interface WaterDropProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function WaterDrop({
  size = 60,
  className = "",
  animated = false,
}: WaterDropProps) {
  return (
    <svg
      width={size}
      height={(size * 80) / 60}
      viewBox="0 0 60 80"
      fill="none"
      aria-hidden="true"
      className={`${animated ? "drop-fall " : ""}${className}`}
    >
      <defs>
        <linearGradient id="wdGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2C86C7" />
          <stop offset="100%" stopColor="#24B5C6" />
        </linearGradient>
      </defs>
      <path
        d="M30 5 C30 5 8 32 8 50 C8 63 18 75 30 75 C42 75 52 63 52 50 C52 32 30 5 30 5Z"
        fill="url(#wdGradient)"
      />
      <ellipse
        cx="22"
        cy="40"
        rx="5"
        ry="10"
        fill="white"
        fillOpacity="0.25"
        transform="rotate(-20 22 40)"
      />
    </svg>
  );
}
