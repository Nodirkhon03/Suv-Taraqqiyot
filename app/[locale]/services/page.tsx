"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Stats are technical specifications displayed as-is in all languages
const services = [
  {
    key: "drilling",
    stats: ["30–1200m depth", "~120 wells/year", "6 drilling rigs"],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 4v24M14 12l6-8 6 8M16 28h8v4a4 4 0 01-8 0v-4z" stroke="#24B5C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "pipelines",
    stats: ["Up to 200 km/year", "Dia 32–1200mm", "HDPE & steel"],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M4 16h12v8H4zM24 16h12v8H24zM16 18h8M16 22h8" stroke="#24B5C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "distribution",
    stats: ["300–30,000 m³/day", "Up to 50 units/year"],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 6v8M12 14h16v6H12zM12 20l-4 14M28 20l4 14M20 20v14" stroke="#24B5C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "towers",
    stats: ["10–75 m³ capacity", "Up to 50 towers/year", "5,000+ m³ intake"],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M14 8h12v8H14zM16 16v18M24 16v18M12 34h16M20 8V4" stroke="#24B5C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  const t = useTranslations("servicesOverview");
  const locale = useLocale();

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.span
          className="text-xs uppercase tracking-widest text-engineering font-medium"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {t("label")}
        </motion.span>
        <motion.h1
          className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tighter"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          {t("title")}
        </motion.h1>

        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((s) => (
            <motion.div
              key={s.key}
              className="rounded-2xl border border-gray-100 shadow-sm bg-white p-8"
              variants={cardFade}
            >
              {s.icon}
              <h2 className="mt-4 text-xl font-bold text-navy">
                {t(`items.${s.key}.title`)}
              </h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {t(`items.${s.key}.desc`)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.stats.map((stat) => (
                  <span
                    key={stat}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-navy text-white px-8 py-3.5 rounded-xl font-medium hover:bg-engineering transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2"
          >
            {t("learnMore")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
