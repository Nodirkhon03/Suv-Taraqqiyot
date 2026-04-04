"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] lg:h-[420px] w-full rounded-2xl bg-gray-50 animate-pulse" />
  ),
});

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

/* ─── HERO ─── */
function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-navy to-[#071924]">
      {/* Geological lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={`${(i + 1) * 5.2}%`}
            x2="100%"
            y2={`${(i + 1) * 5.2}%`}
            stroke="white"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Concentric rings */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2">
        {[0.06, 0.04, 0.03].map((opacity, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              borderColor: `rgba(44, 134, 199, ${opacity})`,
              width: `${(i + 1) * 320}px`,
              height: `${(i + 1) * 320}px`,
              top: `${-(i + 1) * 160}px`,
              left: `${-(i + 1) * 160}px`,
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-tight max-w-4xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <Link
            href={`/${locale}/projects`}
            className="bg-navy text-white px-6 py-3 rounded-xl border border-white/20 hover:bg-engineering transition font-medium"
          >
            {t("cta")}
          </Link>
          <Link
            href={`/${locale}/services`}
            className="border border-white/40 text-white px-6 py-3 rounded-xl hover:border-white hover:bg-white/5 transition font-medium"
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>

        <motion.p
          className="mt-6 text-xs text-blue-200/80"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
        >
          {t("credibility")}
        </motion.p>
      </div>
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
        <motion.span
          className="text-xs uppercase tracking-widest text-engineering font-medium"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {t("label")}
        </motion.span>
        <motion.h2
          className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {metrics.map((m) => (
            <motion.div
              key={m.key}
              className="border-l-4 border-engineering pl-6 py-4"
              variants={cardFade}
            >
              <p className="text-3xl sm:text-4xl font-bold text-navy">
                {t(`${m.key}.value`)}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {t(`${m.key}.label`)}
              </p>
              <p className="mt-0.5 text-sm text-gray-500">
                {t(`${m.key}.desc`)}
              </p>
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
            <motion.span
              className="text-xs uppercase tracking-widest text-engineering font-medium"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              {t("label")}
            </motion.span>
            <motion.h2
              className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
            >
              {t("title")}
            </motion.h2>
            <motion.p
              className="mt-6 text-gray-600 leading-relaxed"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
            >
              {t("description")}
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.key}
                className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 text-center"
                variants={cardFade}
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

/* ─── SERVICE ICONS ─── */
function DrillIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 4v24M14 12l6-8 6 8M16 28h8v4a4 4 0 01-8 0v-4z"
        stroke="#24B5C6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PipeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M4 16h12v8H4zM24 16h12v8H24zM16 18h8M16 22h8"
        stroke="#24B5C6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function DistributionIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 6v8M12 14h16v6H12zM12 20l-4 14M28 20l4 14M20 20v14"
        stroke="#24B5C6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function TowerIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M14 8h12v8H14zM16 16v18M24 16v18M12 34h16M20 8V4"
        stroke="#24B5C6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── SERVICES OVERVIEW ─── */
function ServicesOverview() {
  const t = useTranslations("servicesOverview");
  const locale = useLocale();

  const services = [
    { key: "drilling", Icon: DrillIcon },
    { key: "pipelines", Icon: PipeIcon },
    { key: "distribution", Icon: DistributionIcon },
    { key: "towers", Icon: TowerIcon },
  ] as const;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.span
          className="text-xs uppercase tracking-widest text-engineering font-medium"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {t("label")}
        </motion.span>
        <motion.h2
          className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6"
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
              <s.Icon />
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
        <motion.span
          className="text-xs uppercase tracking-widest text-engineering font-medium"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {t("label")}
        </motion.span>
        <motion.h2
          className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          {t("title")}
        </motion.h2>

        {/* Domestic */}
        <motion.div
          className="mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
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

        {/* International */}
        <motion.div
          className="mt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
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

  const certs = ["iso9001", "iso14001", "iso45001"] as const;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certs.map((cert) => (
            <motion.div
              key={cert}
              className="flex flex-col items-center text-center"
              variants={cardFade}
            >
              <div className="w-20 h-20 rounded-full border-2 border-navy flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M12 16l3 3 5-6M16 4l2.5 1.5L21 4l1 2.5L24.5 8l-1 2.5L25 13l-2.5 1L21 16.5l-2.5-1L16 17l-2.5-1.5L11 16.5l-1-2.5L7.5 13l1-2.5L7 8l2.5-1.5L11 4l2.5 1.5z"
                    stroke="#0B2B43"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 22l-2 6 4-2 4 2-2-6M22 22l2 6-4-2-4 2 2-6"
                    stroke="#0B2B43"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-3 text-sm font-bold text-navy">
                {t(`${cert}.title`)}
              </p>
              <p className="text-xs text-gray-500">{t(`${cert}.desc`)}</p>
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
        <motion.span
          className="text-xs uppercase tracking-widest text-engineering font-medium"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {t("label")}
        </motion.span>
        <motion.h2
          className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          {t("title")}
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((p) => (
            <motion.div
              key={p.key}
              className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6"
              variants={cardFade}
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
        <motion.span
          className="text-xs uppercase tracking-widest text-engineering font-medium"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {t("label")}
        </motion.span>
        <motion.h2
          className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-2 text-gray-600"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
        >
          {t("subtitle")}
        </motion.p>

        {/* Stat pills */}
        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
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

        {/* Map */}
        <motion.div
          className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm min-h-[300px] bg-gray-50"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.25}
        >
          <ProjectMap mode="embed" />
        </motion.div>

        {/* Full map link */}
        <motion.div
          className="mt-5 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
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
    <section className="bg-navy py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white tracking-tighter"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-300 text-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
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
      <CtaSection />
    </>
  );
}
