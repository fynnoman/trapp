export function ImagePlaceholder({ label = "PLATZHALTER" }: { label?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-anthracite/55"
    >
      <span
        className="font-display text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.65)]"
        style={{
          fontSize: "clamp(1.6rem, 6vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "0.18em",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
