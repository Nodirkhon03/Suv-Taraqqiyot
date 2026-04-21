interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({
  color = "#F8FAFC",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      width="100%"
      height="60"
      aria-hidden="true"
      className={`block ${className}`}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
        fill={color}
      />
    </svg>
  );
}
