interface BrandMarkProps {
  size?: "sm" | "md";
  showWordmark?: boolean;
}

export function BrandMark({ size = "md", showWordmark = true }: BrandMarkProps) {
  const iconSize = size === "sm" ? 28 : 32;
  const textClass = size === "sm" ? "text-base" : "text-lg";

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="flex items-center justify-center rounded-[10px] bg-gradient-to-br from-[#0ea5e9] to-[#10b981] shadow-[0_2px_12px_rgba(14,165,233,0.3)]"
        style={{ width: iconSize, height: iconSize }}
        aria-hidden
      >
        <svg
          width={size === "sm" ? 14 : 16}
          height={size === "sm" ? 14 : 16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#060911"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </span>
      {showWordmark && (
        <span className={`font-display font-semibold tracking-tight text-[var(--text)] ${textClass}`}>
          Tonely
        </span>
      )}
    </span>
  );
}