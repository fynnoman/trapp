"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SITE } from "../_lib/site";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  const [copied, setCopied] = useState<"phone" | "mail" | null>(null);

  const copy = async (val: string, k: "phone" | "mail") => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(k);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  return (
    <section id="kontakt" className="relative mx-auto mt-20 max-w-6xl px-5 sm:mt-40 sm:px-6">
      <div className="relative overflow-hidden rounded-[22px] bg-cream-deep sm:rounded-[28px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_15%,rgba(180,154,114,0.22),transparent_65%),radial-gradient(50%_50%_at_10%_90%,rgba(37,36,33,0.08),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-4 ring-1 ring-inset ring-anthracite/10 rounded-[18px] sm:inset-6 sm:rounded-[22px] md:inset-10" />

        <div className="relative grid gap-12 p-7 sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-20 md:p-16 lg:p-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="rule-gold" />
              <span className="eyebrow">Ihr Projekt</span>
            </div>
            <h2 className="font-display mt-6 text-anthracite" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.012em", fontWeight: 400 }}>
              Lassen Sie uns gemeinsam Qualität schaffen.
            </h2>
            <p className="measure-prose mt-7 text-pretty text-[17px] leading-[1.7] text-anthracite-soft sm:text-[19px]">
              Ob Renovierung, Neugestaltung oder handwerkliches Detail. Wir
              beraten Sie persönlich und finden die passende Lösung für Ihr
              Vorhaben.
            </p>

            <div className="mt-10 space-y-3">
              <ContactRow
                label="Telefon"
                value={SITE.phoneDisplay}
                href={`tel:${SITE.phoneHref}`}
                onCopy={() => copy(SITE.phoneDisplay, "phone")}
                copied={copied === "phone"}
              />
              <ContactRow
                label="E-Mail"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
                onCopy={() => copy(SITE.email, "mail")}
                copied={copied === "mail"}
              />
              <div className="rounded-[14px] border border-anthracite/10 bg-cream/80 px-5 py-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
                  Werkstatt
                </div>
                <div className="mt-1 text-[15px] text-anthracite">
                  {SITE.street}, {SITE.zip} {SITE.city}
                </div>
              </div>
              <div className="rounded-[14px] border border-anthracite/10 bg-cream/80 px-5 py-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
                  Erreichbarkeit
                </div>
                <div className="mt-1 text-[15px] text-anthracite">{SITE.hours}</div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  href: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[14px] border border-anthracite/10 bg-cream/80 px-5 py-4">
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
          {label}
        </div>
        <a
          href={href}
          className="font-display mt-1 block truncate text-anthracite transition-colors hover:text-champagne"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", fontWeight: 400 }}
        >
          {value}
        </a>
      </div>
      <button
        onClick={onCopy}
        className="flex-shrink-0 rounded-full border border-anthracite/15 bg-cream px-4 py-2 text-[10px] font-medium uppercase tracking-[0.26em] text-anthracite-soft transition-colors hover:bg-anthracite hover:text-cream"
      >
        {copied ? "Kopiert" : "Kopieren"}
      </button>
    </div>
  );
}

function ContactForm() {
  const [state, setState] = useState<"idle" | "sent">("idle");
  const [data, setData] = useState({ name: "", kontakt: "", vorhaben: "" });

  const mailto = () => {
    const subject = encodeURIComponent(`Projektanfrage von ${data.name || "Ohne Name"}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nKontakt: ${data.kontakt}\n\nVorhaben:\n${data.vorhaben}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setState("sent");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={(e) => {
        e.preventDefault();
        mailto();
      }}
      className="rounded-[18px] border border-anthracite/10 bg-cream/90 p-6 shadow-[0_30px_60px_-32px_rgba(37,36,33,0.3)] sm:rounded-[22px] sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="rule-gold" />
        <span className="eyebrow">Projektanfrage</span>
      </div>
      <h3 className="font-display mt-5 text-anthracite" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", fontWeight: 400 }}>
        In drei Zeilen.
      </h3>

      <div className="mt-7 space-y-4">
        <Field
          label="Name"
          value={data.name}
          onChange={(v) => setData((d) => ({ ...d, name: v }))}
        />
        <Field
          label="Telefon oder E-Mail"
          value={data.kontakt}
          onChange={(v) => setData((d) => ({ ...d, kontakt: v }))}
        />
        <Field
          label="Worum geht es?"
          value={data.vorhaben}
          onChange={(v) => setData((d) => ({ ...d, vorhaben: v }))}
          as="textarea"
        />
      </div>

      <MagneticButton
        as="button"
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-anthracite px-6 py-3.5 text-[14px] font-medium tracking-[0.02em] text-cream"
      >
        {state === "sent" ? "Mail wird geöffnet" : "Projekt anfragen"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </MagneticButton>

      <p className="mt-3 text-center text-[11px] text-anthracite-mute">
        Öffnet Ihr Mailprogramm. Es werden keine Daten gespeichert.
      </p>
    </motion.form>
  );
}

function Field({
  label,
  value,
  onChange,
  as = "input",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  as?: "input" | "textarea";
}) {
  const base =
    "mt-1 w-full rounded-[12px] border border-anthracite/15 bg-cream px-4 py-3 text-[16px] text-anthracite placeholder:text-anthracite-mute focus:border-champagne/60 focus:outline-none focus:ring-2 focus:ring-champagne/25";
  return (
    <label className="block">
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
        {label}
      </span>
      {as === "input" ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
          type="text"
          autoComplete="off"
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} min-h-[120px] resize-none`}
          rows={4}
        />
      )}
    </label>
  );
}
