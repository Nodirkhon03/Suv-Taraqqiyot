"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  cardFade,
  cardHover,
  stagger,
  viewportOnce,
} from "@/lib/animations";
import DrillingRig from "@/components/illustrations/DrillingRig";
import PipelineSection from "@/components/illustrations/PipelineSection";
import WaterTower from "@/components/illustrations/WaterTower";
import {
  WellDrillingIcon,
  PipelineIcon,
  WaterDistributionIcon,
  WaterTowerIcon,
  CivilEngineeringIcon,
  SitePreparationIcon,
} from "@/components/icons/ServiceIcons";

const services = [
  {
    key: "drilling",
    stats: ["30–1200m depth", "~120 wells/year", "6 drilling rigs"],
    Icon: WellDrillingIcon,
    Illustration: DrillingRig,
  },
  {
    key: "pipelines",
    stats: ["Up to 200 km/year", "Dia 32–1200mm", "HDPE & steel"],
    Icon: PipelineIcon,
    Illustration: PipelineSection,
  },
  {
    key: "distribution",
    stats: ["300–30,000 m³/day", "Up to 50 units/year"],
    Icon: WaterDistributionIcon,
    Illustration: null,
  },
  {
    key: "towers",
    stats: ["10–75 m³ capacity", "Up to 50 towers/year", "5,000+ m³ intake"],
    Icon: WaterTowerIcon,
    Illustration: WaterTower,
  },
] as const;

const extraCapabilities = [
  { key: "civil", Icon: CivilEngineeringIcon },
  { key: "site", Icon: SitePreparationIcon },
] as const;

export default function ServicesPage() {
  const t = useTranslations("servicesOverview");
  const locale = useLocale();

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-xs uppercase tracking-widest text-engineering font-medium"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("label")}
        </motion.p>
        <motion.h1
          className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tighter"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {t("title")}
        </motion.h1>

        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {services.map((s) => (
            <motion.div
              key={s.key}
              className="rounded-2xl border border-gray-100 shadow-sm bg-white p-8 card-accent hover:border-engineering overflow-hidden"
              variants={cardFade}
              whileHover={cardHover}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <s.Icon size={40} color="#0B2B43" />
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
                </div>
                {s.Illustration && (
                  <div className="hidden md:block w-32 shrink-0 opacity-90">
                    <s.Illustration className="w-full h-auto" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra capabilities strip */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {extraCapabilities.map((c) => (
            <motion.div
              key={c.key}
              variants={cardFade}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex items-center gap-4"
            >
              <c.Icon size={36} color="#2C86C7" />
              <div>
                <p className="font-bold text-navy">
                  {c.key === "civil"
                    ? "Civil engineering & structural works"
                    : "Site preparation & earthworks"}
                </p>
                <p className="text-sm text-gray-600">
                  {c.key === "civil"
                    ? "Concrete structures, pump houses, intake chambers."
                    : "Excavation, access roads, drilling pads."}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
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
