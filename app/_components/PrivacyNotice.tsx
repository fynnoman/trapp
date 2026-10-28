"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

const STORAGE_KEY = "gdh-privacy-notice-dismissed-v1";

export function PrivacyNotice() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const dismissed = window.localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="region"
          aria-label="Datenschutzhinweis"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:right-5 sm:mx-auto sm:max-w-[720px]"
        >
          <div className="relative overflow-hidden rounded-[16px] border border-anthracite/15 bg-cream/95 shadow-[0_30px_60px_-24px_rgba(37,36,33,0.35)] backdrop-blur-md sm:rounded-[18px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_15%,rgba(180,154,114,0.18),transparent_65%)]" />
            <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
              <div className="flex-1 text-anthracite">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
                    Datenschutz
                  </span>
                </div>
                <p className="mt-3 text-pretty text-[14px] leading-[1.65] text-anthracite-soft">
                  Diese Website setzt keine Cookies und nutzt keine Tracking- oder
                  Analyse-Werkzeuge. Es werden nur die Daten verarbeitet, die Sie
                  uns aktiv über das Kontaktformular oder per Telefon mitteilen.{" "}
                  <Link
                    href="/datenschutz"
                    className="whitespace-nowrap underline decoration-anthracite/30 underline-offset-[3px] transition-colors hover:text-champagne hover:decoration-champagne"
                  >
                    Mehr erfahren
                  </Link>
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center sm:self-center">
                <button
                  type="button"
                  onClick={dismiss}
                  className="inline-flex items-center justify-center rounded-full bg-anthracite px-5 py-2.5 text-[12px] font-medium tracking-[0.02em] text-cream transition-opacity hover:opacity-90"
                >
                  Verstanden
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
