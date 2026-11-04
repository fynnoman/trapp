import { SITE } from "../_lib/site";

export function MapSection() {
  const query = encodeURIComponent(
    `${SITE.street}, ${SITE.zip} ${SITE.city}, ${SITE.region}`,
  );
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed&z=14`;

  return (
    <section
      id="anfahrt"
      aria-label="Standort und Anfahrt"
      className="relative mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Anfahrt</span>
          </div>
          <h2
            className="font-display mt-6 text-anthracite"
            style={{
              fontSize: "clamp(1.8rem, 4.2vw, 2.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.012em",
              fontWeight: 400,
            }}
          >
            Werkstatt in {SITE.city}.
          </h2>
          <p className="mt-4 text-[15px] text-anthracite-soft">
            {SITE.street}, {SITE.zip} {SITE.city} · {SITE.region}
          </p>
        </div>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-anthracite/15 bg-cream px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.26em] text-anthracite-soft transition-colors hover:bg-anthracite hover:text-cream"
        >
          In Google Maps öffnen
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className="mt-8 overflow-hidden rounded-[22px] border border-anthracite/10 bg-cream shadow-[0_30px_60px_-32px_rgba(37,36,33,0.22)] sm:rounded-[28px]">
        <iframe
          title={`Karte: Standort ${SITE.name} in ${SITE.city}`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-[360px] w-full border-0 sm:h-[460px]"
        />
      </div>

      <div className="mt-6 sm:hidden">
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-anthracite/15 bg-cream px-5 py-3 text-[12px] font-medium uppercase tracking-[0.26em] text-anthracite-soft"
        >
          In Google Maps öffnen
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
