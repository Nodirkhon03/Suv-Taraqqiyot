"use client";

import { useTranslations } from "next-intl";
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

/* ─── SECTION 1: HERO BANNER ─── */
function HeroBanner() {
  const t = useTranslations("aboutPage.hero");

  return (
    <section className="bg-navy py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-3xl"
          style={{ letterSpacing: "-0.02em" }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {t("title")}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
        >
          {t("subtitle")}
        </motion.p>
      </div>
    </section>
  );
}

/* ─── SECTION 2: COMPANY STORY ─── */
function CompanyStory() {
  const t = useTranslations("aboutPage.story");

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-xs uppercase tracking-widest text-engineering font-medium"
            variants={fadeUp}
            custom={0}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
            variants={fadeUp}
            custom={0.1}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="mt-6 text-gray-600 leading-relaxed"
            style={{ lineHeight: 1.7 }}
            variants={fadeUp}
            custom={0.2}
          >
            {t("p1")}
          </motion.p>
          <motion.p
            className="mt-4 text-gray-600 leading-relaxed"
            style={{ lineHeight: 1.7 }}
            variants={fadeUp}
            custom={0.3}
          >
            {t("p2")}
          </motion.p>
          <motion.p
            className="mt-4 text-gray-600 leading-relaxed"
            style={{ lineHeight: 1.7 }}
            variants={fadeUp}
            custom={0.4}
          >
            {t("p3")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: KEY FIGURES ─── */
function KeyFigures() {
  const t = useTranslations("aboutPage.figures");

  const stats = [
    { key: "years" },
    { key: "depth" },
    { key: "value" },
    { key: "iso" },
  ] as const;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
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
              <p className="text-3xl sm:text-4xl font-bold text-navy">
                {t(`${s.key}.value`)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {t(`${s.key}.label`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 4: TEAM ─── */
function TeamGrid() {
  const t = useTranslations("aboutPage.team");

  const members = [
    "projectManager",
    "siteManager",
    "hseManager",
    "envManager",
    "civilEng",
    "electricalEng",
    "instrumentEng",
    "mechanicalEng",
    "waterSpecialist",
    "surveyor",
  ] as const;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-xs uppercase tracking-widest text-engineering font-medium"
            variants={fadeUp}
            custom={0}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
            variants={fadeUp}
            custom={0.1}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="mt-2 text-gray-600 max-w-2xl"
            variants={fadeUp}
            custom={0.15}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {members.map((key) => (
            <motion.div
              key={key}
              className="rounded-2xl border border-gray-100 shadow-sm bg-white p-5"
              variants={cardFade}
            >
              <p className="font-bold text-navy">{t(`members.${key}.role`)}</p>
              <p className="mt-1 text-xs text-gray-400 italic">
                {t(`members.${key}.credentials`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 5: CERTIFICATIONS ─── */
function Certifications() {
  const t = useTranslations("aboutPage.certifications");

  const isoCards = [
    {
      key: "iso9001",
      borderColor: "#D8C7A2",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 2L20 10L29 11.5L22.5 18L24 27L16 23L8 27L9.5 18L3 11.5L12 10L16 2Z" stroke="#D8C7A2" strokeWidth="2" fill="#D8C7A2" fillOpacity="0.15" />
          <path d="M12 28V32M20 28V32" stroke="#D8C7A2" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "iso14001",
      borderColor: "#22C55E",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 28C16 28 6 20 6 12C6 6 10 2 16 2C22 2 26 8 16 18" stroke="#22C55E" strokeWidth="2" fill="#22C55E" fillOpacity="0.15" />
          <path d="M16 28C16 28 26 22 22 14" stroke="#22C55E" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      key: "iso45001",
      borderColor: "#2C86C7",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 3L4 9V16C4 23 9 28.5 16 30C23 28.5 28 23 28 16V9L16 3Z" stroke="#2C86C7" strokeWidth="2" fill="#2C86C7" fillOpacity="0.15" />
          <path d="M11 16L14.5 19.5L21 13" stroke="#2C86C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ] as const;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-xs uppercase tracking-widest text-engineering font-medium"
            variants={fadeUp}
            custom={0}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
            variants={fadeUp}
            custom={0.1}
          >
            {t("title")}
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {isoCards.map(({ key, borderColor, icon }) => (
            <motion.div
              key={key}
              className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm"
              style={{ borderLeftWidth: "4px", borderLeftColor: borderColor }}
              variants={cardFade}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-lg font-bold text-navy">{t(`${key}Title`)}</h3>
              <p className="mt-1 text-sm text-gray-600">{t(`${key}Desc`)}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  {t("issuer")}: AVVISO CERT LLC
                </p>
                <p className="text-xs text-gray-400">
                  {t("validUntil")}: 2028
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 6: LEGAL INFORMATION ─── */
function LegalInfo() {
  const t = useTranslations("aboutPage.legal");

  const rows = [
    { key: "fullName" },
    { key: "sti" },
    { key: "regNumber" },
    { key: "regDate" },
    { key: "registrar" },
    { key: "address" },
    { key: "phone" },
    { key: "contactManager" },
  ] as const;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-xs uppercase tracking-widest text-engineering font-medium"
            variants={fadeUp}
            custom={0}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
            variants={fadeUp}
            custom={0.1}
          >
            {t("title")}
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-10 max-w-2xl rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <table className="w-full text-sm">
            <tbody>
              {rows.map(({ key }, i) => (
                <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="py-3 px-5 text-gray-500 font-medium whitespace-nowrap align-top w-1/3">
                    {t(`rows.${key}.label`)}
                  </td>
                  <td className="py-3 px-5 text-navy font-medium">
                    {t(`rows.${key}.value`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 7: GOVERNMENT ACKNOWLEDGMENTS ─── */
function Acknowledgments() {
  const t = useTranslations("aboutPage.recognition");

  const cards = [
    { key: "rmm" },
    { key: "education" },
    { key: "yunusobod" },
  ] as const;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-xs uppercase tracking-widest text-engineering font-medium"
            variants={fadeUp}
            custom={0}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
            variants={fadeUp}
            custom={0.1}
          >
            {t("title")}
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {cards.map(({ key }) => (
            <motion.div
              key={key}
              className="rounded-2xl border-2 border-navy/20 bg-gradient-to-b from-white to-gray-50 p-8 text-center"
              variants={cardFade}
            >
              <div className="border border-navy/10 rounded-xl p-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                  {t(`${key}.authority`)}
                </p>
                <p className="mt-4 text-lg font-bold text-navy">
                  {t("tahakkurnoma")}
                </p>
                <p className="mt-2 font-medium text-engineering">
                  {t("suvTaraqqiyot")}
                </p>
                <p className="mt-4 text-sm text-gray-600 italic">
                  {t(`${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ABOUT PAGE ─── */
export default function AboutPage() {
  return (
    <>
      <HeroBanner />
      <CompanyStory />
      <KeyFigures />
      <TeamGrid />
      <Certifications />
      <LegalInfo />
      <Acknowledgments />
    </>
  );
}
