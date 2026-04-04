"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { equipment, categories } from "@/lib/equipment";

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
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── PAGE ─── */
export default function EquipmentPage() {
  const t = useTranslations("equipmentPage");

  const stats = [
    { value: "30+", labelKey: "stats.machineLabel" },
    { value: "1200m", labelKey: "stats.depthLabel" },
    { value: "1200mm", labelKey: "stats.diameterLabel" },
    { value: "200km", labelKey: "stats.capacityLabel" },
  ];

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl font-bold text-white tracking-tighter"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-300 max-w-2xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ─── CAPABILITY SUMMARY BAR ─── */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((s) => (
              <motion.div key={s.labelKey} className="text-center" variants={cardFade}>
                <p className="text-3xl font-bold text-navy">{s.value}</p>
                <p className="text-sm text-gray-500">{t(s.labelKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY SECTIONS ─── */}
      {categories.map((cat) => {
        const items = equipment.filter((e) => e.category === cat.key);

        return (
          <section key={cat.key} className="py-16 lg:py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.span
                className="text-xs uppercase tracking-widest text-cyan font-medium"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                {t(`categories.${cat.key}`)}
              </motion.span>
              <motion.h2
                className="mt-3 text-2xl font-bold text-navy tracking-tighter"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
              >
                {t(`categories.${cat.key}`)}
              </motion.h2>

              <motion.div
                className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {items.map((item) => (
                  <motion.div
                    key={item.name}
                    className="group cursor-default relative rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden"
                    variants={cardFade}
                  >
                    {/* Equipment image */}
                    <div className="relative aspect-video rounded-t-xl overflow-hidden bg-gray-100">
                      <Image
                        src={item.imagePath}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Quantity badge */}
                    {item.quantity > 1 && (
                      <span className="absolute top-2 right-2 bg-engineering text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-10">
                        &times;{item.quantity}
                      </span>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      <p className="font-bold text-navy">{item.name}</p>
                      {item.spec && (
                        <p className="mt-1 text-sm text-gray-500">{item.spec}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}
    </>
  );
}
