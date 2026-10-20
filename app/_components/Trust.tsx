"use client";

const items = [
  "Innen- und Außenputz",
  "Trockenbau",
  "Clipso Spanndecken",
  "Malerarbeiten",
  "Bodenbelagsarbeiten",
  "Gerüstbau",
  "Dachschrägen",
  "Akustikdecken",
  "Fassaden",
  "Lasuren",
];

export function Trust() {
  return (
    <section
      aria-label="Gewerke"
      className="relative mt-20 overflow-hidden border-y border-line bg-cream-deep/40 py-7 sm:mt-32 sm:py-10"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent z-10" />

      <div className="font-display flex gap-10 marquee whitespace-nowrap text-anthracite/70 will-change-transform sm:gap-14"
        style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.2rem)", letterSpacing: "-0.008em" }}>
        {[0, 1].map((loop) => (
          <div key={loop} className="flex gap-10 sm:gap-14">
            {items.map((it, i) => (
              <span key={`${loop}-${i}`} className="flex items-center gap-10 sm:gap-14">
                <span>{it}</span>
                <span className="h-1 w-1 rounded-full bg-champagne sm:h-1.5 sm:w-1.5" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
