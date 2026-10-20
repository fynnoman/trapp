import Link from "next/link";
import Image from "next/image";
import { SITE } from "../_lib/site";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-anthracite text-cream sm:mt-28">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[radial-gradient(80%_60%_at_80%_0%,rgba(180,154,114,0.18),transparent_60%),radial-gradient(60%_50%_at_10%_100%,rgba(255,255,255,0.03),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr] md:gap-16">
          <div>
            <Image
              src={SITE.logo.src}
              alt={SITE.logo.alt}
              width={SITE.logo.width}
              height={SITE.logo.height}
              className="h-16 w-auto sm:h-20"
            />
            <p className="font-display mt-6 max-w-md text-xl text-cream" style={{ fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.008em" }}>
              {SITE.claim}
            </p>
            <p className="mt-5 max-w-md text-[14px] leading-[1.7] text-cream/70">
              Stuckateurmeisterbetrieb aus {SITE.city} für Putz, Trockenbau,
              Spanndecken, Malerarbeiten, Böden und Gerüst. Persönlich geführt
              von {SITE.inhaber}.
            </p>
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-cream/15 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-cream/70">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Saarland · Rheinland-Pfalz
            </div>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-cream/50">
              Kontakt
            </div>
            <ul className="mt-5 space-y-3 text-[14px] text-cream/90">
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="transition-colors hover:text-champagne">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-champagne">
                  {SITE.email}
                </a>
              </li>
              <li className="pt-3 text-cream/60">
                {SITE.street}
                <br />
                {SITE.zip} {SITE.city}
              </li>
              <li className="pt-3 text-cream/60">{SITE.hours}</li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-cream/50">
              Rechtliches
            </div>
            <ul className="mt-5 space-y-3 text-[14px] text-cream/90">
              <li>
                <Link href="/impressum" className="transition-colors hover:text-champagne">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="transition-colors hover:text-champagne">
                  Datenschutz
                </Link>
              </li>
              <li className="pt-3 text-[12px] text-cream/50">
                USt-IdNr. {SITE.ustid}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-7 text-[12px] text-cream/50 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <div>© <Year /> {SITE.nameLong}</div>
          <div className="font-medium uppercase tracking-[0.3em]">
            Bous · 66359 · DE
          </div>
        </div>
      </div>
    </footer>
  );
}
