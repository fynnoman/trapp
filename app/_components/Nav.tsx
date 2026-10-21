"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE } from "../_lib/site";

const links = [
  { href: "#leistungen", id: "leistungen", label: "Leistungen" },
  { href: "#handwerk", id: "handwerk", label: "Philosophie" },
  { href: "#projekte", id: "projekte", label: "Referenzen" },
  { href: "#betrieb", id: "betrieb", label: "Über uns" },
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
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-cream/92 backdrop-blur-[12px] border-b border-anthracite/8" : "bg-transparent"
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-8 ${scrolled ? "py-2.5 sm:py-3" : "py-3 sm:py-5"}`}>
          {/* LEFT: logo */}
          <Link
            href="/"
            aria-label={SITE.nameLong}
            className="flex items-center gap-3"
          >
            <Image
              src={SITE.logo.src}
              alt={SITE.logo.alt}
              width={SITE.logo.width}
              height={SITE.logo.height}
              priority
              className={`block w-auto transition-all duration-500 ${scrolled ? "h-9 sm:h-11" : "h-10 sm:h-14"}`}
            />
          </Link>

          {/* CENTER: nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium tracking-[0.02em] transition-colors ${
                    isActive ? "text-anthracite" : "text-anthracite-soft hover:text-anthracite"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                      className="absolute inset-0 -z-10 rounded-full bg-anthracite/[0.07]"
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: CTA + mobile menu */}
          <div className="flex items-center gap-2">
            <a
              href="#kontakt"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-anthracite px-5 py-2.5 text-[13px] font-medium tracking-[0.02em] text-cream transition-transform hover:scale-[1.02]"
            >
              Projekt anfragen
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className={`md:hidden rounded-full p-3 transition-colors ${scrolled ? "bg-anthracite text-cream" : "bg-cream/15 text-cream backdrop-blur-md ring-1 ring-cream/30"}`}
              aria-label="Anrufen"
            >
              <PhoneGlyph />
            </a>
            <button
              onClick={() => setOpen(true)}
              className={`md:hidden rounded-full p-3 transition-colors ${scrolled ? "border border-anthracite/15 bg-cream/80 text-anthracite backdrop-blur-sm" : "bg-cream/15 text-cream backdrop-blur-md ring-1 ring-cream/30"}`}
              aria-label="Menü öffnen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
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
              className="absolute inset-0 bg-anthracite/40 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -32, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative m-4 rounded-[20px] border border-anthracite/8 bg-cream p-6 shadow-[0_30px_80px_-30px_rgba(37,36,33,0.4)]"
            >
              <div className="flex items-center justify-between pb-5">
                <Image
                  src={SITE.logo.src}
                  alt={SITE.logo.alt}
                  width={SITE.logo.width}
                  height={SITE.logo.height}
                  className="h-11 w-auto"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-anthracite/8 p-2"
                  aria-label="Menü schließen"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col gap-1 border-t border-line pt-4">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display block rounded-[12px] px-4 py-3 text-2xl text-anthracite transition-colors hover:bg-anthracite/5"
                      style={{ fontWeight: 400 }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-anthracite py-3.5 text-[14px] font-medium text-cream"
              >
                Projekt anfragen
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-anthracite/15 py-3 text-[13px] text-anthracite-soft"
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
