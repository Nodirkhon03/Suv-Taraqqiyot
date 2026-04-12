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
          <section key={cat.key} className="py-16 lg:py-24 border-t border-gray-100 bg-white">
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
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {items.map((item) => (
                  <motion.div
                    key={item.name}
                    className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
                    variants={cardFade}
                  >
                    {/* Equipment image — white background, centered, object-contain */}
                    <div className="relative aspect-[4/3] w-full bg-white rounded-t-2xl overflow-hidden flex items-center justify-center p-6">
                      <Image
                        src={item.imagePath}
                        alt={item.name}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        loading="lazy"
                      />

                      {/* Quantity badge */}
                      {item.quantity > 1 && (
                        <span className="absolute top-3 right-3 bg-white text-navy text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
                          &times;{item.quantity}
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100" />

                    {/* Content */}
                    <div className="flex flex-col items-center text-center px-5 py-5">
                      <p className="font-bold text-navy leading-tight">
                        {item.name}
                      </p>
                      {item.spec && (
                        <p className="mt-1.5 text-sm text-gray-500 leading-snug">
                          {item.spec}
                        </p>
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
