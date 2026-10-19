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
      className="relative mt-24 overflow-hidden border-y border-line bg-surface/60 py-7 sm:mt-32 sm:py-10 isolate [content-visibility:auto] [contain-intrinsic-size:160px]"
    >
      <div className="flex gap-6 marquee whitespace-nowrap font-display text-3xl tracking-tight text-ink/80 will-change-transform sm:gap-10 sm:text-4xl md:text-6xl">
        {[0, 1].map((loop) => (
          <div key={loop} className="flex gap-6 sm:gap-10">
            {items.map((it, i) => (
              <span key={`${loop}-${i}`} className="flex items-center gap-6 sm:gap-10">
                <span>{it}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-clay sm:h-2 sm:w-2" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
