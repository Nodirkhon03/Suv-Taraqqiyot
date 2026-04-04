"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "equipment", href: "/equipment" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
];

const localeData = [
  { code: "en", flag: "\u{1F1EC}\u{1F1E7}", label: "EN" },
  { code: "ru", flag: "\u{1F1F7}\u{1F1FA}", label: "RU" },
  { code: "uz", flag: "\u{1F1FA}\u{1F1FF}", label: "UZ" },
  { code: "tr", flag: "\u{1F1F9}\u{1F1F7}", label: "TR" },
];

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus trap for mobile menu
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!mobileOpen) return;
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || !mobileMenuRef.current) return;
      const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setMobileOpen(false);
    setLangOpen(false);
  };

  const currentLocale = localeData.find((l) => l.code === locale) || localeData[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm"
            : "bg-white/60 backdrop-blur-sm"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2 rounded-lg"
            >
              <Image
                src="/images/logo-full.png"
                alt="SUV-TARAQQIYOT LLC"
                width={160}
                height={56}
                className="h-10 lg:h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => {
                const href = `/${locale}${link.href}`;
                const isActive =
                  pathname === href ||
                  (link.href !== "" && pathname.startsWith(href));
                return (
                  <Link
                    key={link.key}
                    href={href}
                    className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2 rounded px-1 ${
                      isActive
                        ? "text-engineering"
                        : "text-gray-600 hover:text-navy"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop language dropdown */}
            <div className="hidden lg:block relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
              >
                <span aria-hidden="true">{currentLocale.flag}</span>
                <span>{currentLocale.label}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[140px] z-50"
                    role="listbox"
                    aria-label="Language options"
                  >
                    {localeData.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:bg-gray-50 ${
                          locale === loc.code
                            ? "bg-gray-50 font-medium text-navy"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        role="option"
                        aria-selected={locale === loc.code}
                      >
                        <span aria-hidden="true">{loc.flag}</span>
                        <span>{loc.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col h-full pt-20 px-6 pb-8">
              <nav className="flex flex-col gap-2 flex-1" aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const href = `/${locale}${link.href}`;
                  const isActive =
                    pathname === href ||
                    (link.href !== "" && pathname.startsWith(href));
                  return (
                    <Link
                      key={link.key}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-xl font-medium py-3 border-b border-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering rounded ${
                        isActive ? "text-engineering" : "text-navy"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {t(link.key)}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile language switcher */}
              <div className="flex items-center gap-2 pt-6 border-t border-gray-100">
                {localeData.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => switchLocale(loc.code)}
                    className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering ${
                      locale === loc.code
                        ? "bg-navy text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span aria-hidden="true">{loc.flag}</span> {loc.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
