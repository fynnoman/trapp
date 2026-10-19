"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE } from "../_lib/site";

const links = [
  { href: "#leistungen", id: "leistungen", label: "Leistungen" },
  { href: "#handwerk", id: "handwerk", label: "Handwerk" },
  { href: "#betrieb", id: "betrieb", label: "Betrieb" },
  { href: "#kontakt", id: "kontakt", label: "Kontakt" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-1.25rem)] max-w-6xl sm:top-4 sm:w-[calc(100%-2rem)]"
      >
        <div
          className={`glass relative flex items-center justify-between rounded-full pl-2 pr-2 transition-all duration-500 sm:pl-3 ${
            scrolled ? "py-1.5" : "py-2"
          } sm:py-2`}
        >
          {/* LEFT: nav links (desktop) / hamburger (mobile) */}
          <div className="flex items-center">
            <nav className="hidden md:flex items-center relative">
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                      isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 280, damping: 28 }}
                        className="absolute inset-0 -z-10 rounded-full bg-ink/[0.08]"
                      />
                    )}
                    {l.label}
                  </a>
                );
              })}
            </nav>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden rounded-full border border-ink/15 bg-surface/70 p-2.5 text-ink"
              aria-label="Menü öffnen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* CENTER: logo */}
          <Link
            href="/"
            aria-label={SITE.name}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/img/logo.png"
              alt={SITE.name}
              width={2172}
              height={724}
              priority
              className={`block w-auto transition-all duration-500 ${
                scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"
              }`}
            />
          </Link>

          {/* RIGHT: CTA desktop / phone mobile */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE.phoneHref}`}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-surface transition-transform hover:scale-[1.02]"
            >
              <PhoneGlyph />
              Anrufen
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="md:hidden rounded-full bg-ink p-2.5 text-surface"
              aria-label="Anrufen"
            >
              <PhoneGlyph />
            </a>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative m-4 glass rounded-3xl p-6"
            >
              <div className="flex items-center justify-between pb-4">
                <Image
                  src="/img/logo.png"
                  alt={SITE.name}
                  width={2172}
                  height={724}
                  className="h-9 w-auto"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-ink/10 p-2"
                  aria-label="Menü schließen"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col gap-1 pt-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 font-display text-2xl text-ink transition-colors hover:bg-black/[0.04]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-surface"
              >
                <PhoneGlyph /> {SITE.phoneDisplay}
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PhoneGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5c0-.6.4-1 1-1h2.5c.5 0 .9.3 1 .8l.8 3.2c.1.4 0 .9-.4 1.1l-1.6 1.2c1.2 2.4 3.3 4.5 5.7 5.7l1.2-1.6c.3-.3.7-.5 1.1-.4l3.2.8c.5.1.8.5.8 1V18c0 .6-.4 1-1 1-8.3 0-15-6.7-15-15z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
