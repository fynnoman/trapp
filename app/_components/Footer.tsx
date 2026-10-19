import Link from "next/link";
import { SITE } from "../_lib/site";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-ink text-surface sm:mt-24">
      <div className="pointer-events-none absolute inset-0 opacity-30 material-concrete" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
              {SITE.name}
            </div>
            <p className="mt-4 max-w-sm text-sm text-surface/70">
              Stuckateurmeisterbetrieb aus Bous für Putz, Trockenbau, Spanndecken,
              Malerarbeiten, Böden und Gerüst. Persönlich geführt von {SITE.inhaber}.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-surface/15 px-3 py-1.5 text-xs text-surface/60">
              <span className="h-1.5 w-1.5 rounded-full bg-ochre" />
              Saarland · Rheinland-Pfalz
            </div>
          </div>

          <div className="text-sm">
            <div className="mb-3 text-[11px] uppercase tracking-widest text-surface/50 sm:mb-4 sm:text-xs">
              Kontakt
            </div>
            <ul className="space-y-2 text-surface/85">
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="hover:text-ochre">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-ochre break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="pt-2 text-surface/60">
                {SITE.street}
                <br />
                {SITE.zip} {SITE.city}
              </li>
              <li className="pt-2 text-surface/60">{SITE.hours}</li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="mb-3 text-[11px] uppercase tracking-widest text-surface/50 sm:mb-4 sm:text-xs">
              Rechtliches
            </div>
            <ul className="space-y-2 text-surface/85">
              <li>
                <Link href="/impressum" className="hover:text-ochre">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-ochre">
                  Datenschutz
                </Link>
              </li>
              <li className="pt-2 text-xs text-surface/50">
                USt-IdNr. {SITE.ustid}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-surface/10 pt-6 text-xs text-surface/50 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <div>© <Year /> {SITE.name}</div>
          <div className="font-mono tracking-widest">
            BOUS · 66359 · DE
          </div>
        </div>
      </div>
    </footer>
  );
}
