"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  cardFade,
  cardHover,
  fadeUp,
  stagger,
  viewportOnce,
} from "@/lib/animations";
import AnimatedStat from "@/components/AnimatedStat";
import HeroBackground from "@/components/illustrations/HeroBackground";
import WaterDrop from "@/components/illustrations/WaterDrop";
import IsoBadge from "@/components/illustrations/IsoBadge";
import UzbekistanOutline from "@/components/illustrations/UzbekistanOutline";
import SeoKeywords from "@/components/SeoKeywords";
import {
  WellDrillingIcon,
  PipelineIcon,
  WaterDistributionIcon,
  WaterTowerIcon,
} from "@/components/icons/ServiceIcons";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] lg:h-[420px] w-full rounded-2xl bg-gray-50 animate-pulse" />
  ),
});

const PRIMARY_BUTTON =
  "bg-navy text-white px-6 py-3 rounded-xl border border-white/20 hover:bg-engineering transition font-medium";
const SECONDARY_BUTTON =
  "border border-white/40 text-white px-6 py-3 rounded-xl hover:border-white hover:bg-white/5 transition font-medium";
const SECTION_LABEL = "text-xs uppercase tracking-widest text-engineering font-medium";
const SECTION_TITLE = "mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter";

/* ─── HERO ─── */
function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-gradient-to-b from-navy to-[#071924]">
      <HeroBackground />

      {/* Scan lines */}
      <span className="scan-line" />
      <span className="scan-line scan-line-delayed" />

      {/* Sonar rings */}
      <div className="pointer-events-none absolute right-[-80px] top-1/2 -translate-y-1/2 w-[240px] h-[240px]">
        <span className="sonar-ring inset-0" style={{ animationDelay: "0s" }} />
        <span className="sonar-ring inset-0" style={{ animationDelay: "1.5s" }} />
        <span className="sonar-ring inset-0" style={{ animationDelay: "3s" }} />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-start gap-6">
          <div className="hidden sm:block shrink-0">
            <WaterDrop size={72} animated />
          </div>
          <div>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-cyan font-medium">
              Water Infrastructure · Hydrogeological Drilling · Civil Engineering
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-tight max-w-4xl"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${locale}/projects`} className={PRIMARY_BUTTON}>
                {t("cta")}
              </Link>
              <Link href={`/${locale}/services`} className={SECONDARY_BUTTON}>
                {t("ctaSecondary")}
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-xs text-blue-200/80">
              {t("credibility")}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── ANNUAL CAPACITY ─── */
function Capacity() {
  const t = useTranslations("capacity");

  const metrics = [
    { key: "pipelines" },
    { key: "wells" },
    { key: "units" },
    { key: "intake" },
  ] as const;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className={SECTION_LABEL}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          className={SECTION_TITLE}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {metrics.map((m) => (
            <motion.div
              key={m.key}
              className="border-l-4 border-engineering pl-6 py-4"
              variants={cardFade}
            >
              <AnimatedStat
                value={t(`${m.key}.value`)}
                label={t(`${m.key}.label`)}
                desc={t(`${m.key}.desc`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── COMPANY INTRODUCTION ─── */
function About() {
  const t = useTranslations("about");

  const stats = [
    { key: "established" },
    { key: "projects" },
    { key: "value" },
  ] as const;

  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <motion.p
              className={SECTION_LABEL}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              {t("label")}
            </motion.p>
            <motion.h2
              className={SECTION_TITLE}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              {t("title")}
            </motion.h2>
            <motion.p
              className="mt-6 text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t("description")}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {stats.map((s) => (
              <motion.div
                key={s.key}
                className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 text-center card-accent hover:border-engineering"
                variants={cardFade}
                whileHover={cardHover}
              >
                <p className="text-2xl sm:text-3xl font-bold text-navy">
                  {t(`stats.${s.key}`)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t(`stats.${s.key}Label`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES OVERVIEW ─── */
function ServicesOverview() {
  const t = useTranslations("servicesOverview");
  const locale = useLocale();

  const services = [
    { key: "drilling", Icon: WellDrillingIcon },
    { key: "pipelines", Icon: PipelineIcon },
    { key: "distribution", Icon: WaterDistributionIcon },
    { key: "towers", Icon: WaterTowerIcon },
  ] as const;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className={SECTION_LABEL}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          className={SECTION_TITLE}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {services.map((s) => (
            <motion.div
              key={s.key}
              className="rounded-2xl border border-gray-100 shadow-sm bg-white p-8 card-accent hover:border-engineering"
              variants={cardFade}
              whileHover={cardHover}
            >
              <s.Icon size={40} color="#0B2B43" />
              <h3 className="mt-4 text-lg font-bold text-navy">
                {t(`items.${s.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {t(`items.${s.key}.desc`)}
              </p>
              <Link
                href={`/${locale}/services`}
                className="inline-block mt-4 text-sm font-medium text-engineering hover:text-navy transition-colors"
              >
                {t("learnMore")}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CLIENTS ─── */
function Clients() {
  const t = useTranslations("clients");

  const domesticKeys = [
    "ozsuvtaminot",
    "uzauto",
    "uzgazoil",
    "security",
    "sirdaryo",
    "namangan",
    "samarqand",
    "yangiyul",
  ] as const;

  const internationalKeys = [
    "worldbank",
    "adb",
    "ebrd",
    "opec",
    "saudi",
    "orient",
  ] as const;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className={SECTION_LABEL}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          className={SECTION_TITLE}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            {t("domesticLabel")}
          </p>
          <div className="flex flex-wrap gap-2">
            {domesticKeys.map((key) => (
              <span
                key={key}
                className="text-xs font-medium px-4 py-2 rounded-full bg-gray-100 text-gray-700"
              >
                {t(`domestic.${key}`)}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            {t("internationalLabel")}
          </p>
          <div className="flex flex-wrap gap-3">
            {internationalKeys.map((key) => (
              <span
                key={key}
                className="text-sm font-medium px-5 py-2.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
              >
                {t(`international.${key}`)}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CERTIFICATIONS ─── */
function Certifications() {
  const t = useTranslations("certifications");

  const certs = [
    { key: "iso9001", standard: "9001" as const, year: "2015" },
    { key: "iso14001", standard: "14001" as const, year: "2019" },
    { key: "iso45001", standard: "45001" as const, year: "2020" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {certs.map((cert) => (
            <motion.div
              key={cert.key}
              className="flex flex-col items-center text-center"
              variants={cardFade}
              whileHover={cardHover}
            >
              <IsoBadge standard={cert.standard} year={cert.year} className="w-24 h-24" />
              <p className="mt-3 text-sm font-bold text-navy">
                {t(`${cert.key}.title`)}
              </p>
              <p className="text-xs text-gray-500">{t(`${cert.key}.desc`)}</p>
              <p className="mt-1 text-[10px] text-gray-400">{t("issuer")}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FEATURED PROJECTS ─── */
function FeaturedProjects() {
  const t = useTranslations("featuredProjects");

  const projects = [
    { key: "koshrabad", status: "completed" },
    { key: "zhiydakapa", status: "ongoing" },
    { key: "yangiyul", status: "completed" },
  ] as const;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className={SECTION_LABEL}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          className={SECTION_TITLE}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {projects.map((p) => (
            <motion.div
              key={p.key}
              className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 card-accent hover:border-engineering"
              variants={cardFade}
              whileHover={cardHover}
            >
              <span
                className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                  p.status === "completed"
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {t(p.status)}
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">
                {t(`items.${p.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {t(`items.${p.key}.location`)} &middot;{" "}
                {t(`items.${p.key}.period`)}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {t("funder")}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {t(`items.${p.key}.funder`)}
                </p>
              </div>
              <p className="mt-3 text-2xl font-bold text-navy">
                {t(`items.${p.key}.amount`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PROJECT MAP ─── */
function HomeMap() {
  const t = useTranslations("homeMap");
  const locale = useLocale();

  const stats = ["projects", "regions", "years", "value"] as const;

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className={SECTION_LABEL}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          className={SECTION_TITLE}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-2 text-gray-600"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          {stats.map((key) => (
            <span
              key={key}
              className="text-sm font-medium px-4 py-1.5 rounded-full bg-gray-100 text-navy"
            >
              {t(`stats.${key}`)}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 rounded-2xl border border-gray-100 shadow-sm bg-white p-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          <UzbekistanOutline className="w-full h-auto" />
        </motion.div>

        <motion.div
          className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm min-h-[300px] bg-gray-50"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <ProjectMap mode="embed" />
        </motion.div>

        <motion.div
          className="mt-5 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          <Link
            href={`/${locale}/projects/map`}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-6 py-2.5 rounded-xl border border-navy text-navy hover:bg-navy hover:text-white transition-colors"
          >
            {t("openFullMap")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CtaSection() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="bg-navy py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white tracking-tighter"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-300 text-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.16 }}
        >
          <Link
            href={`/${locale}/contact`}
            className="inline-block mt-8 bg-white text-navy px-8 py-3.5 rounded-xl font-medium hover:bg-engineering hover:text-white transition"
          >
            {t("button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Capacity />
      <About />
      <ServicesOverview />
      <Clients />
      <Certifications />
      <FeaturedProjects />
      <HomeMap />
      <SeoKeywords />
      <CtaSection />
    </>
  );
}
