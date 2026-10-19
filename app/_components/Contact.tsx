"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SITE } from "../_lib/site";
import { SplitWords } from "./SplitWords";
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
    <section id="kontakt" className="relative mx-auto mt-24 max-w-6xl px-5 sm:mt-40 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px]">
        <div className="absolute inset-0 material-clay" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/50 via-transparent to-ink/55" />
        <div className="pointer-events-none absolute inset-4 ring-1 ring-inset ring-white/15 rounded-[20px] sm:inset-6 sm:rounded-[30px] md:inset-10" />

        <div className="relative grid gap-10 p-6 sm:p-10 sm:gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20 md:p-20">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-surface/80 sm:text-[11px] sm:tracking-[0.26em]">
              Kontakt
            </div>
            <h2 className="mt-4 font-display leading-[0.92] tracking-[-0.03em] text-surface md:text-[88px] md:leading-[0.9]"
              style={{ fontSize: "clamp(2.4rem, 10vw, 5.5rem)" }}>
              <SplitWords text="Reden" />
              <br />
              <SplitWords
                text="statt rätseln."
                stagger={0.06}
                decorate={(w, i) =>
                  i === 1 ? <span className="italic text-ochre">{w}</span> : w
                }
              />
            </h2>
            <p className="mt-6 max-w-md text-pretty text-sm text-surface/85 sm:mt-7 sm:text-base">
              Beschreiben Sie Ihr Vorhaben kurz am Telefon oder per Mail. Bei
              passenden Projekten folgt zügig ein Termin vor Ort. Beratung und
              Aufmaß sind unverbindlich.
            </p>

            <div className="mt-8 space-y-3 sm:mt-10">
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
              <div className="glass-dark rounded-2xl px-5 py-4 text-sm text-surface/85">
                <div className="text-[10px] uppercase tracking-[0.26em] text-surface/60">
                  Werkstatt
                </div>
                <div className="mt-1">
                  {SITE.street}, {SITE.zip} {SITE.city}
                </div>
              </div>
              <div className="glass-dark rounded-2xl px-5 py-4 text-sm text-surface/85">
                <div className="text-[10px] uppercase tracking-[0.26em] text-surface/60">
                  Erreichbarkeit
                </div>
                <div className="mt-1">{SITE.hours}</div>
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
    <div className="glass-dark flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4">
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.24em] text-surface/60 sm:tracking-[0.26em]">
          {label}
        </div>
        <a
          href={href}
          className="mt-1 block truncate font-display text-lg text-surface hover:text-ochre sm:text-xl"
        >
          {value}
        </a>
      </div>
      <button
        onClick={onCopy}
        className="flex-shrink-0 rounded-full border border-surface/20 bg-surface/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-surface/85 hover:bg-surface/20"
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
    const subject = encodeURIComponent(`Anfrage von ${data.name || "Ohne Name"}`);
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
      className="glass rounded-[24px] p-5 sm:rounded-[28px] sm:p-6 md:p-8"
    >
      <div className="text-[10px] uppercase tracking-[0.24em] text-ink-mute sm:tracking-[0.26em]">
        Kurzanfrage
      </div>
      <h3 className="mt-2 font-display text-xl text-ink sm:text-2xl">In drei Zeilen.</h3>

      <div className="mt-5 space-y-4 sm:mt-6">
        <Field
          label="Name"
          value={data.name}
          onChange={(v) => setData((d) => ({ ...d, name: v }))}
        />
        <Field
          label="Telefon oder Mail"
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-surface"
      >
        {state === "sent" ? "Mail wird geöffnet" : "Anfrage senden"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </MagneticButton>

      <p className="mt-3 text-center text-[11px] text-ink-mute">
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
    "mt-1 w-full rounded-xl border border-ink/15 bg-white/60 px-4 py-3 text-ink placeholder:text-ink-mute focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-clay/30";
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.26em] text-ink-mute">
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
