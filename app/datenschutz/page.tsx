import type { Metadata } from "next";
import { SITE } from "../_lib/site";

export const metadata: Metadata = {
  title: `Datenschutz · ${SITE.name}`,
};

export default function Datenschutz() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-40">
      <div className="text-xs uppercase tracking-[0.22em] text-ink-mute">
        Rechtliches
      </div>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl">
        Datenschutz
      </h1>

      <div className="mt-12 space-y-10 text-ink-soft">
        <Block title="Verantwortlicher">
          <p>
            Verantwortlich im Sinne der Datenschutzgesetze ist:
            <br />
            {SITE.name}, {SITE.inhaber}
            <br />
            {SITE.street}, {SITE.zip} {SITE.city}
            <br />
            Telefon:{" "}
            <a href={`tel:${SITE.phoneHref}`} className="text-ink hover:text-clay">
              {SITE.phoneDisplay}
            </a>
            <br />
            E-Mail:{" "}
            <a href={`mailto:${SITE.email}`} className="text-ink hover:text-clay">
              {SITE.email}
            </a>
          </p>
        </Block>

        <Block title="Erhebung und Verarbeitung von Daten">
          <p>
            Diese Website verzichtet bewusst auf Tracking, Analyse-Werkzeuge und
            Cookies, die nicht technisch notwendig sind. Es werden keine
            personenbezogenen Daten erhoben, es sei denn, Sie teilen sie uns
            aktiv per Telefon, E-Mail oder über das Kontaktformular mit.
          </p>
        </Block>

        <Block title="Kontaktaufnahme">
          <p>
            Nehmen Sie per Mail oder Telefon Kontakt zu uns auf, werden die
            übermittelten Angaben ausschließlich zur Bearbeitung Ihrer Anfrage
            verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
            (Anbahnung oder Erfüllung eines Vertrags) oder, bei allgemeinen
            Anfragen, Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
          </p>
        </Block>

        <Block title="Hosting">
          <p>
            Diese Seite wird bei einem Dienstleister gehostet. Beim Aufruf
            werden technisch notwendige Serverdaten verarbeitet, etwa IP-Adresse,
            Datum und Uhrzeit, aufgerufene Seite. Diese Daten werden nicht mit
            weiteren Datenquellen zusammengeführt.
          </p>
        </Block>

        <Block title="Ihre Rechte">
          <p>
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
            Zudem besteht ein Beschwerderecht bei einer Aufsichtsbehörde.
          </p>
        </Block>

        <Block title="Änderungen dieser Erklärung">
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
            sie stets den aktuellen rechtlichen Anforderungen entspricht.
          </p>
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
