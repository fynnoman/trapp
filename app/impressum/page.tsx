import type { Metadata } from "next";
import { SITE } from "../_lib/site";

export const metadata: Metadata = {
  title: `Impressum · ${SITE.name}`,
};

export default function Impressum() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-40">
      <div className="text-xs uppercase tracking-[0.22em] text-ink-mute">
        Rechtliches
      </div>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl">
        Impressum
      </h1>

      <div className="mt-12 space-y-10 text-ink-soft">
        <Block title="Angaben gemäß § 5 DDG">
          <p>
            {SITE.name}
            <br />
            Inhaber: {SITE.inhaber}
            <br />
            {SITE.street}
            <br />
            {SITE.zip} {SITE.city}
          </p>
        </Block>

        <Block title="Kontakt">
          <p>
            Telefon:{" "}
            <a href={`tel:${SITE.phoneHref}`} className="text-ink hover:text-clay">
              {SITE.phoneDisplay}
            </a>
            <br />
            E-Mail: {SITE.email}
          </p>
        </Block>

        <Block title="Umsatzsteuer-ID">
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: {SITE.ustid}</p>
        </Block>

        <Block title="Verantwortlich für den Inhalt">
          <p>
            {SITE.inhaber}, {SITE.street}, {SITE.zip} {SITE.city}
          </p>
        </Block>

        <Block title="Streitschlichtung">
          <p>Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p>
        </Block>


      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <div className="mt-3 text-pretty leading-relaxed">{children}</div>
    </div>
  );
}
