"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const quickLinks = [
    { key: "home", href: "" },
    { key: "services", href: "/services" },
    { key: "equipment", href: "/equipment" },
    { key: "projects", href: "/projects" },
    { key: "contact", href: "/contact" },
  ];

  const services = [
    "drilling",
    "waterSupply",
    "irrigation",
    "geological",
    "civilEngineering",
  ];

  return (
    <footer className="bg-navy text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo & tagline */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo-full.png"
                alt="SUV-TARAQQIYOT LLC"
                width={160}
                height={56}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cyan font-medium mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cyan font-medium mb-4">
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-2.5">
              {services.map((key) => (
                <li key={key}>
                  <span className="text-sm text-gray-300">
                    {t(`services.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cyan font-medium mb-4">
              {t("contactTitle")}
            </h4>
            <address className="not-italic space-y-2.5 text-sm text-gray-300">
              <p>{t("address")}</p>
              <p>
                <a
                  href="mailto:info@suv-taraqqiyot.com"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
                >
                  info@suv-taraqqiyot.com
                </a>
              </p>
              <p className="text-xs text-gray-400">STI: 203 681 239</p>
            </address>
          </div>
        </div>
      </div>

      {/* ISO Certification strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 7l1.5 1.5L9 5.5M7 1.5l1.2.7L9.5 1.5l.5 1.2L11.5 3.5l-.5 1.2.5 1.3-1.2.5-.5 1.2-1.3-.5-1.2.5-.5-1.2-1.2.5L5 5.9l-.5-1.2L3.3 5l.5-1.2L2.5 2.5l1.2-.5L4.3 1.5 5.5 2z" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span>ISO 9001:2015</span>
            </div>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 7l1.5 1.5L9 5.5M7 1.5l1.2.7L9.5 1.5l.5 1.2L11.5 3.5l-.5 1.2.5 1.3-1.2.5-.5 1.2-1.3-.5-1.2.5-.5-1.2-1.2.5L5 5.9l-.5-1.2L3.3 5l.5-1.2L2.5 2.5l1.2-.5L4.3 1.5 5.5 2z" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span>ISO 14001:2019</span>
            </div>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 7l1.5 1.5L9 5.5M7 1.5l1.2.7L9.5 1.5l.5 1.2L11.5 3.5l-.5 1.2.5 1.3-1.2.5-.5 1.2-1.3-.5-1.2.5-.5-1.2-1.2.5L5 5.9l-.5-1.2L3.3 5l.5-1.2L2.5 2.5l1.2-.5L4.3 1.5 5.5 2z" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span>ISO 45001:2020</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SUV-Taraqqiyot LLC.{" "}
            {t("rights")}
          </p>
          <div className="flex items-center gap-3">
            {["en", "ru", "uz", "tr"].map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={`text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded ${
                  locale === loc
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
